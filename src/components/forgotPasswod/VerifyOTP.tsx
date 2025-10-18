/* eslint-disable @typescript-eslint/no-explicit-any */
import { enterOtp, forgotPasswordMobileBg } from "@/assets/assets";
import AppButton from "@/components/common/AppButton";
import { FORGOT_PASSWORD_SCREENS } from "@/enums/vm.enums";
import { ToastContext } from "@/providers/SnackBar";
import { baseHttpClient } from "@/services/utils/utilService";
import { COLORS } from "@/styles/colors";
import { Grid, Stack, TextField, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";

interface IProps {
  movetoNextScreen: (inputs: { otp?: string }, nextScreen: FORGOT_PASSWORD_SCREENS) => void;
}

const VerifyOTP: React.FC<IProps> = ({ movetoNextScreen }) => {
  const { showToast } = useContext(ToastContext);
  const isBelowMd = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const [timer, setTimer] = useState(30);
  const [isResendAvailable, setIsResendAvailable] = useState(false);

  // Countdown logic
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setIsResendAvailable(true);
    }
  }, [timer]);

  // Handle OTP input
  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 3) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLDivElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 4) {
      showToast("Please enter 4-digit OTP", "error");
      return;
    }

    try {
      const response = await baseHttpClient<any>("verify-otp", "POST", { otp: enteredOtp });
      if (response?.status) {
        showToast("OTP Verified Successfully!", "success");
        movetoNextScreen({ otp: enteredOtp }, FORGOT_PASSWORD_SCREENS.SET_NEW_PASSWORD);
      } else {
        showToast(response?.message || "Invalid OTP", "error");
      }
    } catch (error: any) {
      showToast(error?.message ?? "Something went wrong", "error");
    }
  };

  const handleResendOtp = async () => {
    try {
      setIsResendAvailable(false);
      setTimer(30);
      const response = await baseHttpClient<any>("resend-otp", "POST", {});
      if (response?.status) {
        showToast(response.message || "OTP resent successfully", "success");
      } else {
        showToast(response?.message || "Failed to resend OTP", "error");
      }
    } catch (error: any) {
      showToast(error?.message ?? "Something went wrong", "error");
    }
  };

  return (
    <Grid container boxSizing={"border-box"}>
      <Grid px={{ md: 12 }} size={{ xs: 12, md: 6 }}>
        <Stack
          width={isBelowMd ? "100%" : "50%"}
          boxSizing={"border-box"}
          gap={20}
          sx={{ ...styles.bg, ...(isBelowMd ? styles.mobileBg : {}) }}
        >
          <Image width={214} height={50} alt="logo" src={"/AppLogo.png"} />

          <Stack width={"100%"} component={"form"} gap={3} onSubmit={handleSubmit}>
            <Stack>
              <Typography fontSize={28} variant="h2" color={COLORS.text_black} fontWeight={700}>
                Enter OTP
              </Typography>
              <Typography variant="body1" color={COLORS.text_gray} fontWeight={500} fontSize={12}>
                Please enter the 4-digit OTP sent to your email.
              </Typography>
            </Stack>

            {/* OTP Input Fields */}
            <Stack direction="row" gap={2} justifyContent="center">
              {otp.map((digit, index) => (
                <TextField
                  key={index}
                  value={digit}
                  inputRef={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  sx={{
                    ".MuiInputBase-root": {
                      borderRadius: "10px",
                      textAlign: "center",
                    },
                  }}
                  slotProps={{
                    htmlInput: {
                      maxLength: 1,
                      style: {
                        textAlign: "center",
                        fontSize: 24,
                        width: "40px",
                        height: "40px",
                      },
                    },
                  }}
                />
              ))}
            </Stack>
            <Stack gap={1}>
              <AppButton
                type="submit"
                btnText="Verify OTP"
                textColor="white"
                variant="contained"
                sx={{ fontSize: 16, borderRadius: 40, mt: 2 }}
              />
              {isResendAvailable ? (
                <Typography
                  align="right"
                  variant="body1"
                  color={COLORS.text_gray}
                  fontWeight={500}
                  fontSize={12}
                  onClick={handleResendOtp}
                >
                  Didn’t recieve OTP?{" "}
                  <Typography
                    sx={{ cursor: "pointer" }}
                    component={"span"}
                    fontWeight={600}
                    color={COLORS.primary}
                  >
                    Resend
                  </Typography>
                </Typography>
              ) : (
                <Typography
                  align="right"
                  variant="body1"
                  color={COLORS.text_gray}
                  fontWeight={500}
                  fontSize={12}
                >
                  Resend OTP will available in{" "}
                  <Typography component={"span"} fontWeight={600} color={COLORS.primary}>
                    {` ${timer}s`}
                  </Typography>{" "}
                </Typography>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Grid>

      {!isBelowMd && (
        <Grid
          size={{ md: 6 }}
          sx={{
            position: "relative",
            width: "100%",
          }}
        >
          <Image
            src={enterOtp}
            alt="illustration"
            fill
            style={{ objectFit: "cover", padding: "10px" }}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default VerifyOTP;

const styles = {
  bg: {
    p: 2,
    pt: 3,
    alignItems: "center",
    height: "100vh",
    width: "100%",
  },
  mobileBg: {
    backgroundImage: `url(${forgotPasswordMobileBg.src})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
  },
};
