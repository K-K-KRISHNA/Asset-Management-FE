/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Tooltip,
  Typography,
  TypographyVariant,
} from "@mui/material";
import { InfoIcon } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

interface AppRadioButtonProps {
  name?: string;
  value: any;
  className?: string;
  label?: string | any;
  row?: boolean;
  required?: boolean;
  disabled?: boolean;
  touched?: boolean;
  error?: boolean;
  onChange?: any;
  onBlur?: any;
  errorText?: any;
  helperText?: any;
  color?: "default" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
  labelPlacement?: "start" | "end" | "top" | "bottom";
  menuItems: { label: string; value?: any; isDisabled?: boolean }[];
  margin?: "normal" | "dense" | "none";
  fullWidth?: boolean;
  size?: "medium" | "small";
  labelWeight?: number;
  isCustomRadio?: boolean;
  tooltipContent?: string;
  variant?: TypographyVariant;
  id?: string;
}

/**
 * @typedef {Object} AppRadioButtonInputProps
 * @property {string} [name] - Name attribute for the radio group.
 * @property {any} value - The currently selected value.
 * @property {string|any} [label] - Label displayed above the radio group.
 * @property {boolean} [row=false] - If `true`, the radio buttons are displayed horizontally.
 * @property {boolean} [required=false] - Marks the field as required.
 * @property {boolean} [disabled=false] - Disables the entire radio group.
 * @property {boolean} [touched] - Indicates whether the field has been touched (Formik support).
 * @property {boolean} [error=false] - Marks the field as having an error.
 * @property {string} [errorText] - Error message text to display.
 * @property {string} [helperText] - Helper text when there is no error.
 * @property {"default"|"primary"|"secondary"|"success"|"error"|"info"|"warning"} [color] - Color of the radio buttons.
 * @property {"start"|"end"|"top"|"bottom"} [labelPlacement="end"] - Position of the label relative to the radio button.
 * @property {{ label: string; value?: any; isDisabled?: boolean }[]} menuItems - List of radio options.
 * @property {"normal"|"dense"|"none"} [margin="normal"] - Margin applied to the field.
 * @property {boolean} [fullWidth=true] - Whether the radio group should take the full width.
 * @property {"medium"|"small"} [size="medium"] - Size of the radio buttons.
 * @property {number} [labelWeight=500] - Font weight for the label text.
 * @property {boolean} [isCustomRadio] - Applies custom CSS classes for custom radio styling.
 * @property {string} [tooltipContent] - Optional tooltip content displayed next to the label.
 * @property {import("@mui/material").TypographyVariant} [variant] - Typography variant for the label text.
 * @property {string} [id] - HTML id for the radio group.
 * @property {(event: React.ChangeEvent<HTMLInputElement>) => void} [onChange] - Callback fired when a radio button is selected.
 * @property {(event: React.FocusEvent<HTMLInputElement>) => void} [onBlur] - Callback fired when the input loses focus.
 */

/**
 * AppRadioButtonInput - A reusable radio button group component based on MUI's `RadioGroup`.
 *
 * Features:
 * - Displays a list of radio options
 * - Supports disabled options
 * - Optional "row" layout for horizontal radios
 * - Label with tooltip support
 * - Error and validation handling
 * - Works with Formik or controlled state
 *
 * @component
 * @param {AppRadioButtonInputProps} props - Props for the radio button group.
 *
 * @example
 * ```tsx
 * import React, { useState } from "react";
 * import AppRadioButtonInput from "./AppRadioButtonInput";
 *
 * const ExampleRadioUsage = () => {
 *   const [selectedValue, setSelectedValue] = useState<string>("");
 *
 *   const options = [
 *     { value: "male", label: "Male" },
 *     { value: "female", label: "Female" },
 *     { value: "other", label: "Other", isDisabled: true },
 *   ];
 *
 *   return (
 *     <div style={{ width: "400px", margin: "2rem auto" }}>
 *       <AppRadioButtonInput
 *         name="gender"
 *         label="Select Gender"
 *         value={selectedValue}
 *         onChange={(e) => setSelectedValue(e.target.value)}
 *         menuItems={options}
 *         row
 *         required
 *         tooltipContent="Choose your gender"
 *         error={!selectedValue}
 *         errorText={!selectedValue ? "Please select a gender" : ""}
 *       />
 *
 *       <div style={{ marginTop: "1rem" }}>
 *         <strong>Selected Value:</strong> {selectedValue || "None"}
 *       </div>
 *     </div>
 *   );
 * };
 *
 * export default ExampleRadioUsage;
 * ```
 */

export default function AppRadioButtonInput({
  name,
  value,
  label,
  onChange,
  onBlur,
  className,
  row,
  disabled,
  required,
  error,
  errorText,
  helperText,
  labelPlacement,
  color,
  menuItems,
  margin,
  fullWidth = true,
  size = "medium",
  labelWeight,
  isCustomRadio,
  tooltipContent,
  variant,
  id,
  ...rest
}: AppRadioButtonProps) {
  const { t } = useTranslation();
  return (
    <FormControl
      fullWidth={fullWidth}
      margin={margin || "normal"}
      className="custom-input-radio"
      disabled={disabled}
    >
      {label && (
        <Box display="inline-flex" alignItems="center" gap="4px">
          <Typography
            variant={variant ? variant : "body2"}
            className="line-height-1 letter-spacing-1"
            fontWeight={labelWeight || 500}
          >
            {label}
            {required ? "*" : ""}
          </Typography>
          {tooltipContent && (
            <Tooltip title={tooltipContent} placement="right">
              <Box sx={{ cursor: "pointer", display: "flex" }}>
                <InfoIcon size={16} />
              </Box>
            </Tooltip>
          )}
        </Box>
      )}
      <RadioGroup
        id={id}
        row={row}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={className}
        color={color}
      >
        {menuItems &&
          menuItems.length > 0 &&
          menuItems.map((item, index) => (
            <FormControlLabel
              {...rest}
              key={index}
              value={item.value}
              control={<Radio size={size} disabled={!!item.isDisabled} />}
              label={
                <Box component="span" display="flex" alignItems="center" gap={0.5}>
                  <Typography variant="body2" fontWeight={500} component="span">
                    {t(item.label)}
                  </Typography>
                </Box>
              }
              labelPlacement={labelPlacement}
              className={
                isCustomRadio
                  ? value === item.value
                    ? "custom-radio-button-label-selected"
                    : "custom-radio-button-label"
                  : ""
              }
              sx={() => ({
                // Conditional styling for small custom radio
                ...(isCustomRadio && size === "small" && { py: "4px" }),
                // Conditional styling based on 'error'
                ...(error && {
                  "& .MuiRadio-root": {
                    // Target the Radio component
                    color: "#d32f2f", // Example: change color to red
                    // ... other error styles
                  },
                }),
              })}
            />
          ))}
      </RadioGroup>
      {(error || errorText) && (
        <Typography variant="caption" color="error">
          {errorText || helperText}
        </Typography>
      )}
    </FormControl>
  );
}
