"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { COLORS } from "@/styles/colors";
import { FormControl, InputBaseComponentProps, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { WarningCircleIcon } from "@phosphor-icons/react";

interface AppTextInputProps {
  type?: string;
  name?: string;
  onChange?: any;
  onBlur?: any;
  onFocus?: any;
  value?: any;
  rows?: any;
  placeholder?: string;
  className?: string;
  label?: string;
  error?: boolean;
  icon?: any;
  multiline?: boolean;
  errorText?: any;
  helperText?: any;
  endIcon?: any;
  mBottom?: any;
  disabled?: boolean;
  shrink?: boolean;
  autoFocus?: boolean;
  margin?: "none" | "normal" | "dense";
  required?: boolean;
  id?: any;
  labelVariant?: any;
  maxlength?: number;
  formClassName?: string;
  sx?: any;
  inputProps?: InputBaseComponentProps;
  grow?: boolean;
  showAsNotDisabled?: boolean;
  autoComplete?: string;
  ref?: any;
}
/**
 * AppTextInput - A reusable wrapper around MUI TextField with
 * support for error states, icons, multiline input, and helper text.
 *
 * @param {string} [type="text"] - Input type (e.g., text, number, password).
 * @param {string} [name] - Name attribute for the input field.
 * @param {function} [onChange] - Callback when the value changes.
 * @param {function} [onBlur] - Callback when the input loses focus.
 * @param {function} [onFocus] - Callback when the input gains focus.
 * @param {any} [value] - Current value of the input.
 * @param {number} [rows] - Number of rows (for multiline input).
 * @param {string} [placeholder] - Placeholder text.
 * @param {string} [className] - Custom class name.
 * @param {string} [label] - Label text.
 * @param {boolean} [error] - Show error state.
 * @param {React.ReactNode} [icon] - Start icon (inside input).
 * @param {boolean} [multiline] - Whether the input is multiline.
 * @param {string} [errorText] - Error message text.
 * @param {string} [helperText] - Helper text below input.
 * @param {React.ReactNode} [endIcon] - End icon (inside input).
 * @param {boolean} [disabled] - Disable the input.
 * @param {boolean} [shrink] - Force label to shrink.
 * @param {boolean} [autoFocus] - Autofocus input on mount.
 * @param {"none" | "normal" | "dense"} [margin="normal"] - Margin of the field.
 * @param {number} [maxlength] - Maximum length of input.
 * @param {boolean} [grow] - Expand height dynamically (for textarea).
 * @param {boolean} [showAsNotDisabled] - Keep styling active even if disabled.
 * @param {string} [autoComplete] - Autocomplete attribute.
 * @param {any} [ref] - Input reference.
 *
 * @example
 * ```tsx
 * import React, { useState } from "react";
 * import { Mail, LockSimple } from "@phosphor-icons/react";
 * import AppTextInput from "./AppTextInput";
 *
 * export default function ExampleUsage() {
 *   const [email, setEmail] = useState("");
 *   const [password, setPassword] = useState("");
 *
 *   return (
 *     <div>
 *       <AppTextInput
 *         label="Email"
 *         name="email"
 *         placeholder="Enter your email"
 *         value={email}
 *         onChange={(e) => setEmail(e.target.value)}
 *         icon={<Mail size={20} />}
 *       />
 *
 *       <AppTextInput
 *         type="password"
 *         label="Password"
 *         name="password"
 *         placeholder="Enter your password"
 *         value={password}
 *         onChange={(e) => setPassword(e.target.value)}
 *         endIcon={<LockSimple size={20} />}
 *       />
 *
 *       <AppTextInput
 *         label="Username"
 *         name="username"
 *         placeholder="Enter username"
 *         value=""
 *         error
 *         errorText="Username is required"
 *       />
 *     </div>
 *   );
 * }
 * ```
 */

function AppTextInput({
  type,
  name,
  onChange,
  onBlur,
  onFocus,
  value,
  rows,
  placeholder,
  label,
  error,
  icon,
  multiline,
  errorText,
  helperText,
  endIcon,
  mBottom,
  disabled,
  shrink,
  autoFocus,
  margin,
  id,
  maxlength,
  formClassName,
  sx,
  inputProps = {},
  grow,
  showAsNotDisabled = false,
  autoComplete,
  ref,
  ...rest
}: AppTextInputProps) {
  return (
    <FormControl
      sx={{
        "& .MuiInputLabel-shrink": {
          background: disabled ? "#f4f4f4" : "#fff",
        },
      }}
      fullWidth
      margin={margin || "normal"}
      className={`custom-input-text ${formClassName || ""} ${grow ? "custom-input-text-area" : ""}`}
    >
      <TextField
        inputRef={ref}
        variant="outlined"
        autoComplete={autoComplete === "noautocomplete" ? undefined : "one-time-code"}
        label={label}
        name={name}
        id={id}
        autoFocus={autoFocus}
        type={type || "text"}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        error={error || errorText ? true : false}
        helperText={errorText || helperText}
        value={type === "number" ? value : value || ""}
        disabled={disabled}
        multiline={multiline || rows ? true : false}
        rows={rows || undefined}
        onWheel={(event: any) => event.target.blur()}
        sx={{
          bgcolor: "background.grid",
          color: "background.grid",

          marginBottom: mBottom,
          "& .MuiInputAdornment-root": {
            height: "auto",
          },
          "&.selectedText": {
            bgcolor: "background.grid",
          },
          "& .MuiInputLabel-outlined": {
            "&.Mui-focused": {
              marginTop: "0px",
            },
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: disabled ? "#e6e6e6" : "background.grid",
            },
            "&:hover fieldset": {
              borderColor: disabled ? "#e6e6e6" : "#b3b3b3",
            },
            "&.Mui-focused fieldset": {
              borderColor:
                disabled && !showAsNotDisabled ? "#e6e6e6" : error ? COLORS.error : COLORS.primary,
            },
            "&.Mui-disabled fieldset": {
              borderColor: disabled ? "#e6e6e6" : "background.grid",
            },
          },
          ...sx,
          "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
            {
              WebkitAppearance: "none",
              margin: 0,
            },
        }}
        {...rest}
        slotProps={{
          inputLabel: {
            shrink: shrink || undefined,
          },
          input: {
            inputProps: {
              maxLength: maxlength || undefined,
              "aria-autocomplete": "list",
              style: {
                padding: multiline || rows ? "initial" : "16.5px 14px",
                textOverflow: "ellipsis",
              },
              className: "input-placeholder",
              ...inputProps,
            },
            startAdornment: icon ? <InputAdornment position="start">{icon}</InputAdornment> : "",
            endAdornment: error ? (
              <InputAdornment position="end">
                {error ? (
                  <>
                    {endIcon || null}{" "}
                    <WarningCircleIcon weight="fill" color={COLORS.error} size={24} />
                  </>
                ) : null}
              </InputAdornment>
            ) : endIcon ? (
              <InputAdornment position="end">{endIcon || ""}</InputAdornment>
            ) : null,
            sx: {
              borderRadius: "8px",
              background: disabled && !showAsNotDisabled ? "#f4f4f4" : "#fff",
              borderColor: disabled ? "#e6e6e6" : "initial",
            },
          },
        }}
      />
    </FormControl>
  );
}

export default AppTextInput;
