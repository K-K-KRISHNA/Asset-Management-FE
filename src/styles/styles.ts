import createCache from "@emotion/cache";
import { createTheme } from "@mui/material/styles";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { COLORS } from "./colors";

export const THEME = createTheme({
  palette: {
    primary: {
      main: COLORS.primary,
    },
    secondary: {
      main: COLORS.secondary,
    },
    action: {
      disabled: COLORS.text_2,
      disabledOpacity: 0.5,
    },
    text: {
      disabled: COLORS.text_dark,
    },
  },
  components: {
    MuiTableContainer: {
      styleOverrides: {
        root: {
          '&:not([data-id="review"])': {
            maxHeight: "calc(100vh - 100px)",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
          },
        },
      },
    },
    MuiTable: {
      defaultProps: {
        stickyHeader: true,
      },
    },
  },
  typography: {
    fontFamily: ["'Montserrat'", "sans-serif"].join(","),
    h1: {
      fontWeight: 500,
      fontSize: "48px",
    },
    h2: {
      fontWeight: 500,
      fontSize: "40px",
    },
    h3: {
      fontWeight: 500,
      fontSize: "32px",
    },
    h4: {
      fontWeight: 500,
      fontSize: "24px",
    },
    h5: {
      fontWeight: 500,
      fontSize: "20px",
    },
    h6: {
      fontWeight: 500,
      fontSize: "18px",
    },
    button: {
      fontWeight: 500,
      fontSize: "16px",
    },
    body1: {
      fontWeight: 400,
      fontSize: "16px",
    },
    body2: {
      fontWeight: 400,
      fontSize: "14px",
    },
    subtitle1: {
      fontSize: "14px",
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: "12px",
      fontWeight: 500,
    },
    caption: {
      fontSize: "10px",
      fontWeight: 400,
    },
    htmlFontSize: 16,
  },
});

export const ltrCache = createCache({
  key: "mui",
});

export const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export const ARABIC_THEME = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: COLORS.primary,
    },
    secondary: {
      main: COLORS.secondary,
    },
  },
  components: {
    MuiTableContainer: {
      styleOverrides: {
        root: {
          '&:not([data-id="review"])': {
            maxHeight: "calc(100vh - 100px)",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
          },
        },
      },
    },
    MuiTable: {
      defaultProps: {
        stickyHeader: true,
      },
    },
  },
  typography: {
    fontFamily: ["Libre Franklin", "Arial", "sans-serif"].join(","),
    h1: {
      fontWeight: 500,
      fontSize: "48px",
    },
    h2: {
      fontWeight: 500,
      fontSize: "40px",
    },
    h3: {
      fontWeight: 500,
      fontSize: "32px",
    },
    h4: {
      fontWeight: 500,
      fontSize: "24px",
    },
    h5: {
      fontWeight: 500,
      fontSize: "20px",
    },
    h6: {
      fontWeight: 500,
      fontSize: "18px",
    },
    button: {
      fontWeight: 500,
      fontSize: "16px",
    },
    body1: {
      fontWeight: 500,
      fontSize: "16px",
    },
    body2: {
      fontWeight: 500,
      fontSize: "14px",
    },
    subtitle1: {
      fontSize: "12px",
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: "10px",
      fontWeight: 500,
    },
    caption: {
      fontSize: "8px",
      fontWeight: 500,
    },
  },
});
