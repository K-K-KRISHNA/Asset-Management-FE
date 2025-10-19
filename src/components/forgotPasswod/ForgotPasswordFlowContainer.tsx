import { FORGOT_PASSWORD_SCREENS } from "@/enums/vm.enums";
import { COLORS } from "@/styles/colors";
import { ForgotPasswordInputs } from "@/vm";
import { Stack, Typography, useMediaQuery } from "@mui/material";
import { ArrowLeftIcon, CheckCircleIcon } from "@phosphor-icons/react";
import { useCallback, useState } from "react";
import CustomDialog from "../common/CustomDialog";
import CreateNewPassword from "./CreateNewPassword";
import SendOTP from "./SendOTP";
import VerifyOTP from "./VerifyOTP";

const ForgotPasswordFlowContainer = () => {
  const [formInputs, setFormInputs] = useState<ForgotPasswordInputs>({
    email: "",
    newPassword: "",
    resetToken: "",
  });
  const [currentScreen, setCurrentScreen] = useState<FORGOT_PASSWORD_SCREENS>(
    FORGOT_PASSWORD_SCREENS.SEND_OTP
  );
  const movetoNextScreen = useCallback(
    (inputs: Partial<ForgotPasswordInputs>, nextScreen: FORGOT_PASSWORD_SCREENS) => {
      setFormInputs((prev) => ({ ...prev, ...inputs }));
      setCurrentScreen(nextScreen);
    },
    []
  );
  const isBelowMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  return (
    <>
      <CustomDialog
        handleOpen={currentScreen === FORGOT_PASSWORD_SCREENS.SUCCESS_SCREEN}
        title={""}
        variant={isBelowMd ? undefined : "md"}
        onClose={() => {}}
      >
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          padding={4}
          px={isBelowMd ? 2 : 20}
          gap={2}
        >
          <CheckCircleIcon color={COLORS.primary} size={80} weight="fill" />
          <Typography textAlign={"center"} fontWeight={700} fontSize={32}>
            Congratulations
          </Typography>
          <Typography textAlign={"center"} fontWeight={500} fontSize={28}>
            Your password has been reset
          </Typography>
          <Typography textAlign={"center"} fontWeight={400} fontSize={20}>
            You can now use your new password to login to your account
          </Typography>
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
      </CustomDialog>
      {(() => {
        if (currentScreen === FORGOT_PASSWORD_SCREENS.SEND_OTP)
          return <SendOTP movetoNextScreen={movetoNextScreen} />;
        if (currentScreen === FORGOT_PASSWORD_SCREENS.VERIFY_OTP)
          return <VerifyOTP formInputs={formInputs} movetoNextScreen={movetoNextScreen} />;
        if (
          currentScreen === FORGOT_PASSWORD_SCREENS.SET_NEW_PASSWORD ||
          currentScreen === FORGOT_PASSWORD_SCREENS.SUCCESS_SCREEN
        )
          return <CreateNewPassword formInputs={formInputs} movetoNextScreen={movetoNextScreen} />;
      })()}
    </>
  );
};

export default ForgotPasswordFlowContainer;
