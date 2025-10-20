import { Box, CssBaseline, Stack, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { getToken } from "../../services/utils/utilService";
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

  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken();

      // If the current path requires auth and token is missing → redirect
      if (!token && !unAuthorizedPaths.includes(router.pathname)) {
        router.push("/"); // redirect to login
        return;
      }

      // Optional: if user is already logged in and is on login page → redirect to home/dashboard
      if (token && unAuthorizedPaths.includes(router.pathname)) {
        router.push("/dashboard"); // change to your app default page
        return;
      }

      setIsCheckingAuth(false); // allow rendering children
    };

    checkAuth();
  }, [router.pathname]);

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
