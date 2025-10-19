/* eslint-disable @typescript-eslint/no-explicit-any */
import { forgotPasswordImage, forgotPasswordMobileBg } from "@/assets/assets";
import AppButton from "@/components/common/AppButton";
import AppTextInput from "@/components/common/AppTextInput";
import { FORGOT_PASSWORD_SCREENS } from "@/enums/vm.enums";
import { ToastContext } from "@/providers/SnackBar";
import { baseHttpClient } from "@/services/utils/utilService";
import { COLORS } from "@/styles/colors";
import { Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import { Formik } from "formik";
import Image from "next/image";
import { useContext } from "react";
import * as Yup from "yup";
import { ForgotPasswordInputs } from "../../vm";

interface Values {
  email: string;
}

interface IProps {
  movetoNextScreen: (
    inputs: Partial<ForgotPasswordInputs>,
    nextScreen: FORGOT_PASSWORD_SCREENS
  ) => void;
}

// Validation schema (email only)
const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Enter a valid email").required("Email is required"),
});

const SendOTP: React.FC<IProps> = ({ movetoNextScreen }) => {
  const { showToast } = useContext(ToastContext);
  const isBelowMd = useMediaQuery((theme) => theme.breakpoints.down("md"));

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
          <Stack width={"100%"}>
            <Stack>
              <Typography fontSize={28} variant="h2" color={COLORS.text_black} fontWeight={700}>
                Forgot Password?
              </Typography>
              <Typography variant="body1" color={COLORS.text_gray} fontWeight={500} fontSize={12}>
                Enter your email and we will send you an OTP.
              </Typography>
            </Stack>

            <Formik<Values>
              initialValues={{ email: "" }}
              validationSchema={ForgotPasswordSchema}
              onSubmit={async ({ email }) => {
                try {
                  const response = await baseHttpClient<any>("sendOtp", "POST", {
                    email,
                  });
                  if (response?.status) {
                    showToast(response.message || "Reset link sent", "success");
                    movetoNextScreen({ email }, FORGOT_PASSWORD_SCREENS.VERIFY_OTP);
                  } else {
                    showToast(response?.message || "Unable to send reset link", "error");
                  }
                } catch (error: any) {
                  showToast(error?.message ?? "Something went wrong", "error");
                }
              }}
            >
              {({ handleSubmit, getFieldProps, touched, errors }) => {
                return (
                  <Stack width={"100%"} component={"form"} gap={1} onSubmit={handleSubmit}>
                    <AppTextInput
                      label="Email"
                      type="email"
                      // placeholder="Enter your email..."
                      {...getFieldProps("email")}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />

                    <AppButton
                      type="submit"
                      btnText="Send OTP"
                      textColor="white"
                      variant="contained"
                      sx={{ fontSize: 16, borderRadius: 40, mt: 1 }}
                    />
                  </Stack>
                );
              }}
            </Formik>
          </Stack>

          <Stack
            component={"a"}
            href="/"
            sx={{ textDecoration: "none" }}
            spacing={1}
            direction={"row"}
            justifySelf={"flex-end"}
            alignItems={"flex-end"}
          >
            <ArrowLeftIcon color={COLORS.primary} />
            <Typography variant="body2" color={COLORS.primary} fontWeight={700}>
              Back to Login
            </Typography>
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
            src={forgotPasswordImage}
            alt="illustration"
            fill
            style={{ objectFit: "cover", padding: "10px" }}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default SendOTP;

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
