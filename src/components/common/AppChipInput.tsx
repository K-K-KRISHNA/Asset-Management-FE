/* eslint-disable @typescript-eslint/no-explicit-any */

import { FormControl } from "@mui/material";
import { MuiChipsInput } from "mui-chips-input";

/**
 * AppChipInput is a reusable wrapper around `MuiChipsInput` from `mui-chips-input`.
 * It allows users to enter multiple string values (chips) with optional validation, error handling, and styling.
 *
 * @prop {string} [id] - The unique id for the input.
 * @prop {string} [className] - Custom class name for styling.
 * @prop {string} [label] - Label displayed above the input field.
 * @prop {boolean} [error] - If true, shows error state.
 * @prop {any} [helperText] - Helper text or error message shown below the input.
 * @prop {"none" | "normal" | "dense"} [margin] - Margin option for the form control.
 * @prop {boolean} [required] - Whether the field is required.
 * @prop {string} [formClassName] - Additional class name for wrapping FormControl.
 * @prop {string[]} value - The current chip values.
 * @prop {any} [sx] - Custom styles applied to the input.
 * @prop {(value: string[]) => void} [onChange] - Callback fired when chip values change.
 * @prop {string} [placeholder] - Placeholder text when empty.
 * @prop {any} [mBottom] - Custom bottom margin.
 * @prop {boolean} [disabled] - If true, the input is disabled.
 * @prop {any} [onBlur] - Blur event handler.
 * @prop {(chipValue: string) => boolean | {isError: boolean, textError: string}} [validate]
 *        - Function to validate a chip. Must return either `true/false` or an object with error info.
 *
 * @example
 * // Simple usage with state
 * import { useState } from "react";
 * import AppChipInput from "@/components/AppChipInput";
 *
 * export default function Demo() {
 *   const [tags, setTags] = useState<string[]>(["React", "Next.js"]);
 *
 *   return (
 *     <AppChipInput
 *       label="Tags"
 *       value={tags}
 *       onChange={setTags}
 *       placeholder="Type and press Enter"
 *       required
 *       helperText="Enter at least 3 characters per tag"
 *       validate={(chip) =>
 *         chip.length < 3
 *           ? { isError: true, textError: "Chip must be at least 3 characters" }
 *           : true
 *       }
 *     />
 *   );
 * }
 */

function AppChipInput({
  label,
  id,
  margin,
  formClassName,
  required,
  error,
  helperText,
  sx,
  value,
  onChange,
  placeholder,
  mBottom,
  disabled,
  validate,
  onBlur,
  ...rest
}: {
  id?: string;
  className?: string;
  label?: string;
  error?: boolean;
  helperText?: any;
  margin?: "none" | "normal" | "dense";
  required?: boolean;
  labelVariant?: any;
  formClassName?: string;
  value: string[];
  sx?: any;
  onChange?: any;
  placeholder?: string;
  mBottom?: any;
  disabled?: boolean;
  onBlur?: any;
  validate?:
    | ((chipValue: string) =>
        | boolean
        | {
            isError: boolean;
            textError: string;
          })
    | undefined;
}) {
  return (
    <FormControl
      fullWidth
      margin={margin || "normal"}
      className={`custom-input-text ${formClassName || ""}`}
    >
      <MuiChipsInput
        id={id}
        {...rest}
        variant="outlined"
        size="medium"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        label={`${label || ""}${required ? "*" : ""}`}
        disableEdition
        draggable={false}
        validate={validate}
        sx={{
          bgcolor: "background.grid",
          color: "background.grid",
          marginBottom: mBottom,
          borderRadius: "10px",
          background: disabled ? "#f4f4f4" : "#fff",
          borderColor: disabled ? "#e6e6e6" : "initial",
          "&.selectedText": {
            bgcolor: "background.grid",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: disabled ? "#e6e6e6" : "background.grid",
            },
            "&:hover fieldset": {
              borderColor: disabled ? "#e6e6e6" : "#b3b3b3",
            },
            "&.Mui-focused fieldset": {
              borderColor: disabled ? "#e6e6e6" : "background.grid",
            },
            "&.Mui-disabled fieldset": {
              borderColor: disabled ? "#e6e6e6" : "background.grid",
            },
          },
          ...sx,
        }}
        error={error}
        helperText={helperText}
      />
    </FormControl>
  );
}

export default AppChipInput;
