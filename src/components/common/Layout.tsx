import { store } from "@/store";
import createCache from "@emotion/cache";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { ToastProvider } from "../../providers/SnackBar";
import { THEME } from "../../styles/styles";
import LayoutContent from "./LayoutContent";
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
