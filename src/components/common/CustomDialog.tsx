/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppBar, Dialog, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { X } from "@phosphor-icons/react";
import { Fragment, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

interface CustomDialogProps {
  title?: any;
  handleOpen?: boolean;
  className?: string;
  onClose: any;
  variant?: "xs" | "sm" | "md" | "lg";
  fullWidth?: boolean;
  fullScreen?: boolean;
  hideCloseBtn?: boolean;
  minWidth?: number;
  children: React.ReactNode;
}
/**
 * CustomDialog Component
 *
 * A reusable dialog component built on top of Material-UI's `Dialog`.
 * It supports custom title, close button handling, minWidth, full screen mode,
 * and RTL/LTR direction based on i18n language.
 *
 * @component
 *
 * @prop {object} props - Props for CustomDialog
 * @prop {React.ReactNode} [props.title] - Optional dialog title displayed in the AppBar
 * @prop {boolean} [props.handleOpen=false] - Controls whether the dialog is open
 * @prop {string} [props.className] - Custom CSS class for the dialog
 * @prop {() => void} props.onClose - Callback function called when dialog is closed
 * @prop {"xs" | "sm" | "md" | "lg"} [props.variant="sm"] - Dialog maxWidth size
 * @prop {boolean} [props.fullWidth] - Whether the dialog should take full width
 * @prop {boolean} [props.fullScreen] - Whether the dialog should render full screen
 * @prop {boolean} [props.hideCloseBtn] - Hides the close button in the title bar
 * @prop {number} [props.minWidth] - Minimum width for the dialog
 * @prop {React.ReactNode} props.children - The dialog content
 *
 * @example
 * ```tsx
 * import React, { useState } from "react";
 * import { Button, Typography } from "@mui/material";
 * import CustomDialog from "./CustomDialog";
 *
 * const ExampleDialogUsage = () => {
 *   const [open, setOpen] = useState(false);
 *
 *   return (
 *     <div>
 *       <Button variant="contained" onClick={() => setOpen(true)}>
 *         Open Dialog
 *       </Button>
 *
 *       <CustomDialog
 *         title="My Custom Dialog"
 *         handleOpen={open}
 *         onClose={() => setOpen(false)}
 *         variant="md"
 *         fullWidth
 *         minWidth={500}
 *       >
 *         <Typography variant="body1" sx={{ p: 2 }}>
 *           This is the content inside the custom dialog.
 *         </Typography>
 *       </CustomDialog>
 *     </div>
 *   );
 * };
 *
 * export default ExampleDialogUsage;
 * ```
 */

const CustomDialog: FunctionComponent<CustomDialogProps> = ({
  title,
  handleOpen,
  className,
  onClose,
  variant,
  fullWidth,
  fullScreen,
  hideCloseBtn,
  minWidth,
  children,
}) => {
  const theme = useTheme();
  const { i18n } = useTranslation();

  return (
    <Dialog
      fullWidth={fullWidth}
      maxWidth={variant ? variant : "sm"}
      disableEscapeKeyDown={true}
      className={className || ""}
      open={handleOpen === false ? false : true}
      onClose={(_event, reason) => {
        if (reason !== "backdropClick") {
          onClose();
        }
      }}
      fullScreen={fullScreen ? true : false}
      PaperProps={{
        sx: minWidth
          ? { minWidth, borderRadius: "8px", display: "block" }
          : { borderRadius: "8px", display: "block" },
      }}
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      {title && (
        <AppBar
          component="div"
          color="default"
          position={"sticky"}
          elevation={0}
          sx={{
            zIndex: theme.zIndex.drawer + 1,
            boxShadow: "none",
            background: theme.palette.common.white,
            borderBottom: "1px solid #ddd",
            paddingY: 1,
            transition: theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }}
        >
          <Toolbar variant="dense">
            <Typography
              variant="h6"
              fontWeight={700}
              color="inherit"
              noWrap
              className="letter-spacing-1 line-height-3"
              sx={{ flexGrow: 1 }}
            >
              {title}
            </Typography>

            <Grid>
              {!hideCloseBtn && (
                <IconButton onClick={() => onClose()}>
                  <X size={24} weight="bold" />
                </IconButton>
              )}
            </Grid>
          </Toolbar>
        </AppBar>
      )}
      <Fragment>{children}</Fragment>
    </Dialog>
  );
};

export default CustomDialog;
