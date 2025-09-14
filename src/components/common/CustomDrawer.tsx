/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppBar, Drawer, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { X } from "@phosphor-icons/react";
import * as React from "react";
import { useTranslation } from "react-i18next";

interface CustomDrawerComponentProps {
  title?: any;
  isOpen?: boolean;
  class?: string;
  variant?: "fullDrawer" | "medium" | "large" | "small" | "x-large";
  children: React.ReactNode;
  onClose: (...args: any[]) => any;
  onSubmit?: (...args: any[]) => any;
  anchor?: "top" | "left" | "bottom" | "right";
}
/**
 * CustomDrawerComponent
 *
 * A reusable drawer component built with MUI Drawer and AppBar.
 *
 * @component
 *
 * @prop {Object} props - Component props
 * @prop {React.ReactNode} props.children - Content to render inside the drawer
 * @prop {any} [props.title] - Title to display in the drawer header
 * @prop {boolean} [props.isOpen=false] - Whether the drawer is open or closed
 * @prop {string} [props.class] - Additional CSS class
 * @prop {"fullDrawer" | "medium" | "large" | "small" | "x-large"} [props.variant] - Drawer size variant
 * @prop {(...args: any[]) => any} props.onClose - Callback function when the drawer is closed
 * @prop {(...args: any[]) => any} [props.onSubmit] - Optional submit callback
 * @prop {"top" | "left" | "bottom" | "right"} [props.anchor="right"] - Drawer anchor direction
 *
 * @example
 * ```tsx
 * import React, { useState } from "react";
 * import { Button, Typography } from "@mui/material";
 * import CustomDrawerComponent from "./CustomDrawerComponent";
 *
 * export default function DrawerExample() {
 *   const [isOpen, setIsOpen] = useState(false);
 *
 *   const handleOpen = () => setIsOpen(true);
 *   const handleClose = () => setIsOpen(false);
 *   const handleSubmit = () => {
 *     console.log("Submit clicked!");
 *     handleClose();
 *   };
 *
 *   return (
 *     <div>
 *       <Button variant="contained" onClick={handleOpen}>
 *         Open Drawer
 *       </Button>
 *
 *       <CustomDrawerComponent
 *         title="My Custom Drawer"
 *         isOpen={isOpen}
 *         onClose={handleClose}
 *         onSubmit={handleSubmit}
 *         variant="medium"
 *         anchor="right"
 *       >
 *         <Typography variant="body1" sx={{ p: 2 }}>
 *           This is the content inside the custom drawer.
 *         </Typography>
 *
 *         <Button
 *           variant="contained"
 *           color="primary"
 *           sx={{ m: 2 }}
 *           onClick={handleSubmit}
 *         >
 *           Submit
 *         </Button>
 *       </CustomDrawerComponent>
 *     </div>
 *   );
 * }
 * ```
 */

const CustomDrawerComponent: React.FunctionComponent<CustomDrawerComponentProps> = (props) => {
  const theme = useTheme();
  const { i18n } = useTranslation();
  return (
    <React.Fragment>
      <Drawer
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        anchor={props?.anchor || "right"}
        variant="temporary"
        className={`drawer ${props.variant ? `${props.variant}` : "small"}`}
        disableEscapeKeyDown={true}
        open={props?.isOpen === false ? false : true}
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
          },
        }}
      >
        {props.title && (
          <AppBar
            component="div"
            color="default"
            position="sticky"
            sx={{ display: "flex" }}
            elevation={0}
          >
            <Toolbar
              variant="dense"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                background: theme.palette.grey[200],
                borderBottom: "0.2px solid",
                borderColor: theme.palette.grey[400],
              }}
            >
              <Typography
                variant="h6"
                fontWeight={700}
                color="inherit"
                noWrap
                className="letter-spacing-1 line-height-3"
              >
                {props.title}
              </Typography>

              <Grid>
                <IconButton onClick={() => props.onClose()}>
                  <X size={24} weight="bold" />
                </IconButton>
              </Grid>
            </Toolbar>
          </AppBar>
        )}
        <React.Fragment>{props.children}</React.Fragment>
      </Drawer>
    </React.Fragment>
  );
};

export default CustomDrawerComponent;
