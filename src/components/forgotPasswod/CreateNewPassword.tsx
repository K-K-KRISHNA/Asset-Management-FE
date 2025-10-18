/* eslint-disable @typescript-eslint/no-explicit-any */
import { forgotPasswordMobileBg, newPasswordImg } from "@/assets/assets";
import AppButton from "@/components/common/AppButton";
import AppTextInput from "@/components/common/AppTextInput";
import { FORGOT_PASSWORD_SCREENS } from "@/enums/vm.enums";
import { ToastContext } from "@/providers/SnackBar";
import { baseHttpClient } from "@/services/utils/utilService";
import { COLORS } from "@/styles/colors";
import { Grid, IconButton, Stack, Typography, useMediaQuery } from "@mui/material";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { Formik } from "formik";
import Image from "next/image";
import { useContext, useState } from "react";
import * as Yup from "yup";
import { ForgotPasswordInputs } from "../../vm";

interface Values {
  newPassword: string;
  confirmPassword: string;
}

interface IProps {
  movetoNextScreen: (
    inputs: Partial<ForgotPasswordInputs>,
    nextScreen: FORGOT_PASSWORD_SCREENS
  ) => void;
}

// Validation schema
const CreateNewPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

const CreateNewPassword: React.FC<IProps> = ({ movetoNextScreen }) => {
  const { showToast } = useContext(ToastContext);
  const isBelowMd = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

          <Stack width={"100%"} gap={5}>
            <Stack>
              <Typography fontSize={28} variant="h2" color={COLORS.text_black} fontWeight={700}>
                Create New Password
              </Typography>
              <Typography variant="body1" color={COLORS.text_gray} fontWeight={500} fontSize={12}>
                Enter your new password
              </Typography>
            </Stack>

            <Formik<Values>
              initialValues={{ newPassword: "", confirmPassword: "" }}
              validationSchema={CreateNewPasswordSchema}
              onSubmit={async ({ newPassword }) => {
                try {
                  const response = await baseHttpClient<any>("reset-password", "POST", {
                    newPassword,
                  });

                  if (response?.status) {
                    showToast(response.message || "Password reset successfully", "success");
                    // movetoNextScreen({}, FORGOT_PASSWORD_SCREENS.SUCCESS);
                  } else {
                    showToast(response?.message || "Unable to reset password", "error");
                  }
                } catch (error: any) {
                  showToast(error?.message ?? "Something went wrong", "error");
                }
              }}
            >
              {({ handleSubmit, getFieldProps, touched, errors }) => (
                <Stack width={"100%"} component={"form"} gap={1} onSubmit={handleSubmit}>
                  {/* New Password Field */}
                  <AppTextInput
                    label="New Password"
                    type={showPassword ? "text" : "password"}
                    {...getFieldProps("newPassword")}
                    error={touched.newPassword && Boolean(errors.newPassword)}
                    helperText={touched.newPassword && errors.newPassword}
                    endIcon={
                      <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? (
                          <EyeSlashIcon size={20} color={COLORS.text_gray} />
                        ) : (
                          <EyeIcon size={20} color={COLORS.text_gray} />
                        )}
                      </IconButton>
                    }
                  />

                  {/* Confirm Password Field */}
                  <AppTextInput
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    {...getFieldProps("confirmPassword")}
                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                    endIcon={
                      <IconButton onClick={() => setShowConfirmPassword((prev) => !prev)}>
                        {showConfirmPassword ? (
                          <EyeSlashIcon size={20} color={COLORS.text_gray} />
                        ) : (
                          <EyeIcon size={20} color={COLORS.text_gray} />
                        )}
                      </IconButton>
                    }
                  />

                  <AppButton
                    type="submit"
                    btnText="Reset Password"
                    textColor="white"
                    variant="contained"
                    sx={{ fontSize: 16, borderRadius: 40, mt: 1 }}
                  />
                </Stack>
              )}
            </Formik>
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
            src={newPasswordImg}
            alt="illustration"
            fill
            style={{ objectFit: "cover", padding: "10px" }}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default CreateNewPassword;

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
