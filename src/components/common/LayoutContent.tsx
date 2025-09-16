import { CssBaseline } from "@mui/material";
import { ReactNode } from "react";
const LayoutContent = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <CssBaseline />
      {children}
    </>
  );
};

export default LayoutContent;
