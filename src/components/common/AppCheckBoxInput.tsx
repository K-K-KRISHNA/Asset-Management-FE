/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { InfoIcon } from "@phosphor-icons/react";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface AppCheckBoxInputProps {
  name?: string;
  value: boolean;
  className?: string;
  label?: ReactNode | string;
  required?: boolean;
  disabled?: boolean;
  touched?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  onChange?: any;
  onBlur?: any;
  errorText?: any;
  helperText?: any;
  color?: "default" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
  labelPlacement?: "start" | "end" | "top" | "bottom";
  margin?: "normal" | "dense" | "none";
  size?: "small" | "medium";
  labelMarginRight?: string;
  sx?: any;
  tooltipContent?: string;
  id?: string;
}

/**
 * A reusable checkbox component with label, error handling, and optional tooltip.
 *
 * Features:
 * - Built on top of MUI's `<Checkbox>` and `<FormControlLabel>`.
 * - Supports translation for string labels via `react-i18next`.
 * - Optional tooltip with info icon beside the label.
 * - Displays error and helper text when needed.
 *
 * @prop {name} - Unique name for the checkbox (used in forms).
 * @prop {value} - Whether the checkbox is checked.
 * @prop {label} - Label for the checkbox (string or JSX).
 * @prop {onChange} - Handler fired when checkbox state changes.
 * @prop {onBlur} - Handler fired when checkbox loses focus.
 * @prop {fullWidth} - If true, checkbox takes full width.
 * @prop {className} - Additional CSS class.
 * @prop {disabled} - If true, disables the checkbox.
 * @prop {required} - If true, marks the checkbox as required.
 * @prop {error} - If true, shows error state.
 * @prop {errorText} - Error message text.
 * @prop {helperText} - Helper text below the checkbox.
 * @prop {labelPlacement} - Position of label relative to checkbox.
 * @prop {color} - Checkbox color (primary, secondary, success, warning, error).
 * @prop {margin} - MUI margin (none, dense, normal).
 * @prop {size} - Checkbox size (small, medium).
 * @prop {labelMarginRight} - Margin to the right of the label.
 * @prop {sx} - Custom MUI sx styles.
 * @prop {tooltipContent} - Optional tooltip content with info icon.
 * @prop {id} - Checkbox id (for accessibility).
 *
 * @example
 * ```tsx
 * import { useState } from "react";
 * import AppCheckBoxInput from "./AppCheckBoxInput";
 *
 * export default function ExampleForm() {
 *   const [acceptTerms, setAcceptTerms] = useState(false);
 *
 *   return (
 *     <AppCheckBoxInput
 *       name="terms"
 *       id="terms-checkbox"
 *       value={acceptTerms}
 *       label="I agree to the terms and conditions"
 *       required
 *       onChange={(e, checked) => setAcceptTerms(checked)}
 *       tooltipContent="You must accept the terms to proceed"
 *       error={!acceptTerms}
 *       errorText={!acceptTerms ? "You must accept the terms" : ""}
 *     />
 *   );
 * }
 * ```
 */

export default function AppCheckBoxInput({
  name,
  value,
  label,
  onChange,
  fullWidth = true,
  onBlur,
  className,
  disabled,
  required,
  error,
  errorText,
  helperText,
  labelPlacement,
  color,
  margin,
  size,
  labelMarginRight,
  sx,
  tooltipContent,
  id,
  ...rest
}: AppCheckBoxInputProps) {
  const { t } = useTranslation();
  return (
    <FormControl sx={{ minWidth: "24px" }} fullWidth={fullWidth} margin={margin || "normal"}>
      <FormControlLabel
        control={
          <Checkbox
            name={name}
            id={id}
            checked={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            className={className}
            color={color}
            size={size}
            sx={{ ...sx }}
            {...rest}
          />
        }
        label={
          <Box display="flex" alignItems="center" gap={0.5}>
            <Typography variant="body2" fontWeight={500} className="line-height-1 letter-spacing-1">
              {typeof label === "string" ? t(label) : label}
              {required ? "*" : ""}
            </Typography>

            {/* Info icon with tooltip */}
            {tooltipContent && (
              <Tooltip title={tooltipContent}>
                <IconButton size="small" edge="end">
                  <InfoIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        }
        labelPlacement={labelPlacement}
        sx={{ marginRight: labelMarginRight || "initial" }}
      />
      {(error || errorText) && (
        <Typography variant="caption" color="error">
          {errorText || helperText}
        </Typography>
      )}
    </FormControl>
  );
}
