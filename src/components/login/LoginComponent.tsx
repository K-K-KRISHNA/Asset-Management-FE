/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import { EyeClosedIcon, EyeIcon, KeyIcon } from "@phosphor-icons/react";
import { Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { ToastContext } from "../../providers/SnackBar";
import { baseHttpClient } from "../../services/utils/utilService";
import { AppDispatch } from "../../store";
import { setUser } from "../../store/slices/authSlice";
import { COLORS } from "../../styles/colors";
import { LoginResponse } from "../../vm";
import AppButton from "../common/AppButton";
import AppCheckBoxInput from "../common/AppCheckBoxInput";
import AppTextInput from "../common/AppTextInput";
import { loginImage } from "./assets/assets";
import mobileBg from "./assets/mobile_bg.png";

interface Values {
  empId: string;
  password: string;
  pwdType: "text" | "password";
  rememberMe: boolean;
}
// Validation schema
const LoginSchema = Yup.object().shape({
  empId: Yup.number().typeError("Employee ID must be a number").required("Employee ID is required"),
  password: Yup.string().required("Password is required"),
  pwdType: Yup.string().oneOf(["password", "text"]),
});
const LoginComponent = () => {
  const { showToast } = useContext(ToastContext);
  const isBelowMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  return (
    <Grid container boxSizing={"border-box"}>
      <Grid px={{ md: 12 }} size={{ xs: 12, md: 6 }}>
        <Stack
          width={isBelowMd ? "100%" : "50%"}
          py={10}
          justifyContent={"space-around"}
          sx={{ ...styles.bg, ...(isBelowMd ? styles.mobileBg : {}) }}
        >
          <Image width={214} height={50} alt="logo" src={"/AppLogo.png"} />
          <Stack width={"100%"}>
            <Stack>
              <Typography fontSize={28} variant="h2" color={COLORS.text_black} fontWeight={700}>
                {isBelowMd ? "Login" : "Welcome Back"}
              </Typography>
              <Typography variant="body1" color={COLORS.text_gray} fontWeight={500} fontSize={12}>
                Welcome back! please enter your details
              </Typography>
            </Stack>
            <Formik<Values>
              initialValues={{ empId: "", password: "", pwdType: "password", rememberMe: false }}
              validationSchema={LoginSchema}
              onSubmit={async ({ empId, password }) => {
                console.log({ empId, password });
                try {
                  const response = await baseHttpClient<LoginResponse>("login", "POST", {
                    empId: Number(empId),
                    password,
                  });
                  if (response.status) {
                    console.log(response);
                    showToast("Login Success", "success");
                    const loginRes = response.data;
                    dispatch(setUser(loginRes.user));
                    router.replace("/dashboard");
                  } else {
                    showToast(response.message, "error");
                  }
                } catch (error: any) {
                  showToast(error.message ?? "Something Went Wrong", "error");
                }
              }}
            >
              {({ values, handleSubmit, setFieldValue, getFieldProps, touched, errors }) => {
                const togglePassword = () => {
                  setFieldValue("pwdType", values.pwdType === "password" ? "text" : "password");
                };

                return (
                  <Stack width={"100%"} component={"form"} gap={1} onSubmit={handleSubmit}>
                    <AppTextInput
                      label="Employee ID"
                      placeholder="Enter Your Employee ID..."
                      {...getFieldProps("empId")}
                      error={touched.empId && Boolean(errors.empId)}
                      helperText={touched.empId && errors.empId}
                    />
                    <Stack>
                      <AppTextInput
                        label="Password"
                        type={values.pwdType}
                        placeholder="Enter Your Password"
                        {...getFieldProps("password")}
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        endIcon={
                          values.pwdType === "password" ? (
                            <EyeClosedIcon
                              onClick={togglePassword}
                              cursor={"pointer"}
                              weight="bold"
                              fill={
                                touched.password && Boolean(errors.password)
                                  ? COLORS.error
                                  : COLORS.text_gray
                              }
                              size={24}
                            />
                          ) : (
                            <EyeIcon
                              onClick={togglePassword}
                              weight="bold"
                              cursor={"pointer"}
                              fill={
                                touched.password && Boolean(errors.password)
                                  ? COLORS.error
                                  : COLORS.text_gray
                              }
                              size={24}
                            />
                          )
                        }
                      />
                      <Stack
                        direction={"row"}
                        width={"100%"}
                        sx={{
                          marginTop: "-10px",
                          p: { color: COLORS.text_gray },
                        }}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        <AppCheckBoxInput
                          label={"Remember Me"}
                          size="small"
                          sx={{ color: COLORS.text_gray, width: "fit-content" }}
                          {...getFieldProps("rememberMe")}
                          // value={values.rememberMe}
                        />
                        {!isBelowMd && (
                          <Typography
                            width={"1005"}
                            sx={{ textWrap: "nowrap", textDecoration: "none" }}
                            fontSize={14.5}
                            color="primary"
                            fontWeight={500}
                            variant="body1"
                            component={"a"}
                            href="/forgot-password"
                          >
                            Forgot Password?
                          </Typography>
                        )}
                      </Stack>
                    </Stack>
                    <AppButton
                      type="submit"
                      btnText="Login"
                      textColor="white"
                      variant="contained"
                      sx={{ fontSize: 20, borderRadius: 40 }}
                    />
                  </Stack>
                );
              }}
            </Formik>
          </Stack>
          {isBelowMd && (
            <>
              <Stack
                component={"a"}
                href="/forgot-password"
                sx={{ textDecoration: "none" }}
                spacing={1}
                direction={"row"}
                justifySelf={"flex-end"}
                alignItems={"flex-end"}
              >
                <KeyIcon fill={COLORS.primary} weight="bold" size={18} />
                <Typography variant="body2" color={COLORS.text_black} fontWeight={700}>
                  Forgot Password?
                </Typography>
              </Stack>
            </>
          )}
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
            src={loginImage}
            alt="person_with_tech"
            fill
            style={{ objectFit: "cover", padding: "10px" }} // or "cover"
          />
        </Grid>
      )}
    </Grid>
  );
};

export default LoginComponent;

const styles = {
  bg: {
    p: 2,
    pt: 3,
    alignItems: "center",
    height: "100vh",
    width: "100%",
  },
  mobileBg: {
    backgroundImage: `url(${mobileBg.src})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
  },
};
