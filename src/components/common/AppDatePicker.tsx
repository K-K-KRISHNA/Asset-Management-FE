/* eslint-disable @typescript-eslint/no-explicit-any */

import { Box, FormControl, Theme, Tooltip, Typography, useMediaQuery } from "@mui/material";
import { DatePicker, DateView } from "@mui/x-date-pickers";
import { InfoIcon } from "@phosphor-icons/react";
import moment from "moment";
import React from "react";

interface AppDatePickerProps {
  name?: string;
  value: any;
  className?: string;
  label?: string;
  disabled?: boolean;
  error?: boolean;
  onChange: any;
  onBlur?: any;
  errorText?: any;
  helperText?: any;
  maxDate?: any;
  minDate?: any;
  required?: boolean;
  encrypted?: boolean;
  views?: DateView[] | undefined;
  format?: string;
  disableFuture?: boolean;
  placeholder?: string;
  margin?: "normal" | "dense" | "none";
  fullWidth?: boolean;
  formClassName?: string;
  disableTyping?: boolean;
  openTo?: DateView | undefined;
  sx?: any;
  tooltipContent?: string;
  id?: string;
}

/**
 * `AppDatePicker` is a reusable DatePicker component built with MUI X DatePicker.
 * It supports custom labels, tooltips, validation messages, min/max dates, and disabling future dates.
 *
 * @component
 * @param {object} props - Props for the DatePicker component
 * @param {string} [props.name] - Name of the input field
 * @param {Date | string | null} props.value - Selected value
 * @param {string} [props.label] - Label for the input
 * @param {boolean} [props.disabled=false] - Disable the input
 * @param {boolean} [props.error=false] - Indicates whether the input has an error
 * @param {string} [props.errorText] - Error message text
 * @param {string} [props.helperText] - Helper text
 * @param {Date} [props.maxDate] - Maximum selectable date
 * @param {Date} [props.minDate] - Minimum selectable date
 * @param {boolean} [props.disableFuture=false] - Disable selecting future dates
 * @param {"normal" | "dense" | "none"} [props.margin="normal"] - FormControl margin
 * @param {boolean} [props.fullWidth=true] - Full width input
 * @param {DateView[]} [props.views] - DatePicker views, e.g., ['year', 'month', 'day']
 * @param {DateView} [props.openTo] - Default open view
 * @param {string} [props.format="DD/MM/YYYY"] - Date format
 * @param {boolean} [props.disableTyping=false] - Make input read-only
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} [props.formClassName] - Custom class name for FormControl
 * @param {string} [props.tooltipContent] - Tooltip text displayed near the label
 * @param {string} [props.id] - Input id
 * @param {boolean} [props.required=false] - Mark field as required
 * @param {any} [props.sx] - Additional MUI sx styles
 * @param {function} props.onChange - Function called on date change
 * @param {function} [props.onBlur] - Function called on blur
 *
 * @example
 * ```tsx
 * import React, { useState } from "react";
 * import AppDatePicker from "./AppDatePicker";
 *
 * function ExampleForm() {
 *   const [date, setDate] = useState<Date | null>(null);
 *   const [error, setError] = useState<string>("");
 *
 *   return (
 *     <form>
 *       <AppDatePicker
 *         name="dob"
 *         label="Date of Birth"
 *         value={date}
 *         onChange={(newDate) => {
 *           setDate(newDate);
 *           if (!newDate) setError("Date is required");
 *           else setError("");
 *         }}
 *         onBlur={() => {
 *           if (!date) setError("Date is required");
 *         }}
 *         required
 *         error={!!error}
 *         errorText={error}
 *         tooltipContent="Select your date of birth"
 *         placeholder="DD/MM/YYYY"
 *         maxDate={new Date()}
 *         format="DD/MM/YYYY"
 *         disableFuture
 *         fullWidth
 *       />
 *     </form>
 *   );
 * }
 * export default ExampleForm;
 * ```
 */

function AppDatePicker({
  name,
  value,
  label,
  onChange,
  onBlur,
  disabled,
  error,
  errorText,
  helperText,
  maxDate,
  minDate,
  disableFuture,
  margin,
  views,
  format,
  placeholder,
  fullWidth = true,
  formClassName,
  disableTyping = false,
  openTo,
  sx,
  tooltipContent,
  id,
  required,
  ...rest
}: AppDatePickerProps) {
  const isBelowMD = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const renderLabelWithTooltip = (labelText: string | undefined): React.ReactNode => (
    <Box display="flex" alignItems="center" gap={0.5} component="span">
      <Typography variant="body2" component="span" fontWeight={500}>
        {labelText}
      </Typography>
      {tooltipContent && (
        <Tooltip title={tooltipContent} placement="right">
          <Box sx={{ cursor: "pointer", display: "flex" }}>
            <InfoIcon size={16} />
          </Box>
        </Tooltip>
      )}
    </Box>
  );

  return (
    <FormControl
      fullWidth={fullWidth || false}
      margin={margin || "normal"}
      className={`date-picker ${formClassName || ""}`}
      id={id}
    >
      {label && (
        <Typography
          variant="body2"
          className="line-height-1 letter-spacing-1"
          marginBottom="4px"
          fontWeight={500}
        >
          {label}
          {required ? "*" : ""}
        </Typography>
      )}
      <DatePicker
        // label={""}
        format={format || "DD/MM/YYYY"}
        value={value ? moment(value) : null}
        views={views}
        openTo={openTo}
        onChange={onChange}
        maxDate={maxDate}
        minDate={minDate}
        disableFuture={disableFuture || false}
        disableOpenPicker={disabled}
        slotProps={{
          textField: {
            label: renderLabelWithTooltip(label),
            name: name,
            id: id,
            variant: "outlined",
            onBlur: onBlur,
            error: error || errorText ? true : false,
            helperText: errorText || helperText,
            placeholder: placeholder || format || "DD/MM/YYYY",
            disabled: disabled,
            sx: {
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: disabled ? "#e6e6e6" : "background.grid",
                },
                "&:hover fieldset": {
                  borderColor: disabled ? "#e6e6e6" : "background.grid",
                },
                "&.Mui-focused fieldset": {
                  borderColor: disabled ? "#e6e6e6" : "background.grid",
                },
                "&.Mui-disabled fieldset": {
                  borderColor: disabled ? "#e6e6e6" : "background.grid",
                },
              },
              ...sx,
            },
            InputProps: {
              sx: {
                borderRadius: "8px",
                background: disabled ? "#f4f4f4" : "#fff",
                borderColor: disabled ? "#e6e6e6" : "initial",
              },
            },
            inputProps: {
              style: {
                padding: isBelowMD ? "12.5px 14px" : "16px 14px",
              },
              className: "input-placeholder",
            },
          },
          field: {
            readOnly: disableTyping,
          },
        }}
        {...rest}
      />
    </FormControl>
  );
}

export default AppDatePicker;
