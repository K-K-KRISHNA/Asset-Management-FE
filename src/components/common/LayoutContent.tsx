import { Box, CssBaseline, Stack, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContext } from "../../providers/SnackBar";
import { RootState } from "../../store";
import { getAccessToken } from "../../store/slices/authSlice";
import { useAppDispatch } from "../../store/thunkHelpers";
import { COLORS } from "../../styles/colors";
import AppLoading from "./AppLoading";
import Sidebar from "./Sidebar";

const unAuthorizedPaths = ["/", "/forgot-password"]; // Add paths that don't require auth

interface LayoutContentProps {
  children: ReactNode;
}

const LayoutContent = ({ children }: LayoutContentProps) => {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const token = useSelector<RootState>((store) => store.auth.token);
  const { showToast } = useContext(ToastContext);
  const dispatch = useAppDispatch();
  console.log(token, "token");

  useEffect(() => {
    const initAuth = async () => {
      if (!token) {
        // Don't run on public routes
        if (unAuthorizedPaths.includes(router.pathname)) {
          setIsCheckingAuth(false);
          return;
        }

        const resultAction = await dispatch(getAccessToken());

        if (getAccessToken.fulfilled.match(resultAction)) {
          setIsCheckingAuth(false);
        } else {
          showToast(resultAction.payload || "Something went wrong", "error");
          router.push("/");
        }
      } else {
        setIsCheckingAuth(false);
      }
    };

    initAuth();
    // 👇 Run only on mount or route change
    // not on token update to avoid infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  // Separate redirect logic after token loads
  useEffect(() => {
    if (!isCheckingAuth && token && unAuthorizedPaths.includes(router.pathname)) {
      router.push("/dashboard");
    }
  }, [token, isCheckingAuth, router.pathname]);

  // Show nothing or a loader while checking auth
  const isBlelowMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  if (isCheckingAuth) return <AppLoading />;

  return (
    <>
      <CssBaseline />
      <Stack
        bgcolor={`${COLORS.primary}20`}
        direction={isBlelowMd ? "column" : "row"}
        height={"100vh"}
      >
        {!unAuthorizedPaths.includes(router.pathname) && <Sidebar />}
        <Box width={"100%"}>{children}</Box>
      </Stack>
    </>
  );
};

export default LayoutContent;
