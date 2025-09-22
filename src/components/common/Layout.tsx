import { ToastProvider } from "@/providers/SnackBar";
import { store } from "@/store";
import { THEME } from "@/styles/styles";
import createCache from "@emotion/cache";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";
const LayoutContent = dynamic(() => import("@/components/common/LayoutContent"), { ssr: false });

import dynamic from "next/dynamic";
import { LoadingWrapper } from "./LoadingWrapper";
const emotionCache = createCache({ key: "mui", prepend: true });

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <CacheProvider value={emotionCache}>
      <LoadingWrapper>
        <ToastProvider>
          <Provider store={store}>
            <ThemeProvider theme={THEME}>
              <LayoutContent>{children}</LayoutContent>
            </ThemeProvider>
          </Provider>
        </ToastProvider>
      </LoadingWrapper>
    </CacheProvider>
  );
};

export default Layout;
