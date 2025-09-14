/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface AppButtonProps {
  btnText: any;
  variant?: "text" | "outlined" | "contained";
  color?: "primary" | "secondary" | "success" | "warning" | "error";
  type?: any;
  onClick?: any;
  className?: string;
  size?: any;
  startIcon?: any;
  endIcon?: any;
  disabled?: boolean;
  fullWidth?: boolean;
  autoFocus?: boolean;
  textColor?: string;
  href?: string;
  ref?: any;
  sx?: any;
}
/**
 * AppButton is a reusable wrapper around Material-UI's `Button` component.
 * It provides consistent styling and simplifies props usage across the project.
 *
 * @prop {React.ReactNode | string} btnText - The button text or JSX element to display inside the button.
 * @prop {"text" | "outlined" | "contained"} [variant="text"] - The button variant.
 * @prop {"primary" | "secondary" | "success" | "warning" | "error"} [color="primary"] - The color theme of the button.
 * @prop {string} [type="button"] - The button type, e.g., "button", "submit", or "reset".
 * @prop {(event: React.MouseEvent<HTMLButtonElement>) => void} [onClick] - Callback fired when the button is clicked.
 * @prop {string} [className] - Optional custom class name for styling.
 * @prop {"small" | "medium" | "large"} [size="medium"] - Button size.
 * @prop {React.ReactNode} [startIcon] - Icon to display before the text.
 * @prop {React.ReactNode} [endIcon] - Icon to display after the text.
 * @prop {boolean} [disabled=false] - If true, the button is disabled.
 * @prop {boolean} [fullWidth=false] - If true, the button takes the full width of its container.
 * @prop {boolean} [autoFocus=false] - If true, the button is focused on mount.
 * @prop {string} [href] - If provided, renders the button as a link (`<a>`).
 * @prop {any} [sx] - Custom styles passed to the `sx` prop.
 * @prop {any} [ref] - Ref for forwarding to the underlying button element.
 *
 * @example
 * // Basic usage
 * import AppButton from "@/components/AppButton";
 *
 * export default function Demo() {
 *   return (
 *     <AppButton
 *       btnText="Click Me"
 *       variant="contained"
 *       color="primary"
 *       onClick={() => alert("Button clicked!")}
 *     />
 *   );
 * }
 *
 * @example
 * // With icons and disabled state
 * import SaveIcon from "@mui/icons-material/Save";
 * import AppButton from "@/components/AppButton";
 *
 * export default function DemoWithIcon() {
 *   return (
 *     <AppButton
 *       btnText="Save"
 *       variant="outlined"
 *       color="success"
 *       startIcon={<SaveIcon />}
 *       disabled={false}
 *     />
 *   );
 * }
 */

function AppButton({
  btnText,
  variant,
  color,
  type,
  onClick,
  className,
  size,
  startIcon,
  endIcon,
  disabled,
  fullWidth,
  autoFocus,
  ref,
  sx,
  ...rest
}: AppButtonProps) {
  const theme = useTheme();

  return (
    <Button
      size={size || "medium"}
      startIcon={startIcon || ""}
      endIcon={endIcon || ""}
      disabled={disabled}
      type={type || "button"}
      onClick={onClick}
      fullWidth={fullWidth}
      variant={variant || "text"}
      color={color || "primary"}
      className={className}
      autoFocus={autoFocus}
      sx={{
        borderRadius: "8px",
        // paddingX: "40px",
        textTransform: "capitalize",
        // color: textColor || "",
        borderColor:
          variant === "outlined" && color !== "secondary" ? theme.palette.primary.main : "",
        boxShadow: 0,
        paddingX: { xs: "10px", md: "24px" },
        paddingY: { xs: "8px", md: "10px" },
        ...sx,
      }}
      ref={ref}
      {...rest}
    >
      {btnText}
    </Button>
  );
}

export default AppButton;
