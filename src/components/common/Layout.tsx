import { ToastProvider } from "@/providers/SnackBar";
import { store } from "@/store";
import { THEME } from "@/styles/styles";
import createCache from "@emotion/cache";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import dynamic from "next/dynamic";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { queryClient } from "../../util/queryClient";
import { LoadingWrapper } from "./LoadingWrapper";
const LayoutContent = dynamic(() => import("@/components/common/LayoutContent"), { ssr: false });
const emotionCache = createCache({ key: "mui", prepend: true });

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <CacheProvider value={emotionCache}>
      <LoadingWrapper>
        <ToastProvider>
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <ThemeProvider theme={THEME}>
                <LayoutContent>{children}</LayoutContent>
              </ThemeProvider>
            </Provider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ToastProvider>
      </LoadingWrapper>
    </CacheProvider>
  );
};

export default Layout;
