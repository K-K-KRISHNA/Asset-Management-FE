/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControlLabel, Switch, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface AppSwitchInputProps {
  name?: string;
  value: boolean;
  className?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  touched?: boolean;
  error?: boolean;
  onChange?: any;
  onBlur?: any;
  errorText?: any;
  helperText?: any;
  labelPlacement?: "end" | "start" | "top" | "bottom";
  sx?: any;
}
/**
 * A reusable switch (toggle) input component built on top of MUI's `Switch` and `FormControlLabel`.
 *
 * This component supports translations via `react-i18next` and can be used as a controlled component
 * by passing `value` and handling `onChange`.
 *
 * @component
 * @example
 * // Example usage:
 * import React, { useState } from "react";
 * import AppSwitchInput from "./AppSwitchInput";
 *
 * export default function Example() {
 *   const [notificationsEnabled, setNotificationsEnabled] = useState(false);
 *
 *   return (
 *     <div>
 *       <AppSwitchInput
 *         name="notifications"
 *         label="Enable Notifications"
 *         value={notificationsEnabled}
 *         onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
 *           setNotificationsEnabled(event.target.checked)
 *         }
 *       />
 *       <p>Notifications: {notificationsEnabled ? "Enabled" : "Disabled"}</p>
 *     </div>
 *   );
 * }
 *
 * @prop {Object} props - Component props.
 * @prop {string} [props.name] - The name of the switch input.
 * @prop {boolean} props.value - The checked state of the switch.
 * @prop {string} [props.className] - Optional custom class name.
 * @prop {string} [props.label] - The label displayed next to the switch.
 * @prop {string} [props.placeholder] - Optional placeholder (not used directly).
 * @prop {boolean} [props.disabled] - Whether the switch is disabled.
 * @prop {boolean} [props.touched] - Indicates if the field has been touched.
 * @prop {boolean} [props.error] - Indicates if there is a validation error.
 * @prop {(event: React.ChangeEvent<HTMLInputElement>) => void} [props.onChange] - Callback fired when the value changes.
 * @prop {(event: React.FocusEvent<HTMLInputElement>) => void} [props.onBlur] - Callback fired when the input loses focus.
 * @prop {string} [props.errorText] - Error text to display.
 * @prop {string} [props.helperText] - Helper text to display.
 * @prop {"end" | "start" | "top" | "bottom"} [props.labelPlacement="end"] - Placement of the label relative to the switch.
 * @prop {any} [props.sx] - Custom style overrides (MUI `sx` prop).
 */

function AppSwitchInput({
  name,
  onChange,
  onBlur,
  value,
  placeholder,
  className,
  label,
  error,
  errorText,
  helperText,
  disabled,
  labelPlacement,
  sx,
  ...rest
}: AppSwitchInputProps) {
  const { t } = useTranslation();
  return (
    <FormControlLabel
      labelPlacement={labelPlacement || "end"}
      control={
        <Switch
          onChange={(event) => {
            onChange(event);
          }}
          disabled={disabled}
          checked={value ? true : false}
          name={name}
          value={value}
          {...rest}
        />
      }
      label={
        <Typography
          variant="subtitle2"
          className={`line-height-1 letter-spacing-1`}
          marginBottom="4px"
        >
          {label ? t(label) : ""}
        </Typography>
      }
    />
  );
}

export default AppSwitchInput;
