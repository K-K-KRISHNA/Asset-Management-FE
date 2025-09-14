import { COLORS } from "@/styles/colors";
import { Box, Button, FormControl, Theme, Tooltip, Typography, useMediaQuery } from "@mui/material";
import { InfoIcon } from "@phosphor-icons/react";
import { CountryCode } from "libphonenumber-js";
import { MuiTelInput } from "mui-tel-input";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface AppMobileNumberInputProps {
  type?: string;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  error?: boolean;
  errorText?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  margin?: "none" | "normal" | "dense";
  country?: CountryCode;
  isDisabled?: boolean; // disables dropdown
  disableCountryCode?: boolean;
  onlyAvailableCountries?: CountryCode[];
  tooltipContent?: string;
}

/**
 * `AppMobileNumberInput` is a reusable component to handle phone numbers.
 * Supports country selection, formatting, validation messages, and tooltips.
 *
 * @component
 * @param {AppMobileNumberInputProps} props - Component props
 *
 * @example
 * ```tsx
 * import React, { useState } from "react";
 * import AppMobileNumberInput from "./AppMobileNumberInput";
 *
 * function Example() {
 *   const [mobile, setMobile] = useState("");
 *   return (
 *     <AppMobileNumberInput
 *       label="Mobile Number"
 *       value={mobile}
 *       onChange={(val) => setMobile(val)}
 *       required
 *       error={mobile.length < 10}
 *       errorText={mobile.length < 10 ? "Invalid mobile number" : ""}
 *       country="IN"
 *       tooltipContent="Enter your mobile number including country code"
 *     />
 *   );
 * }
 * export default Example;
 * ```
 */
export default function AppMobileNumberInput({
  type,
  name,
  value,
  onChange,
  onBlur,
  onFocus,
  placeholder,
  className,
  label,
  error,
  errorText,
  helperText,
  disabled,
  required,
  id,
  margin,
  country = "IN",
  isDisabled,
  disableCountryCode,
  onlyAvailableCountries,
  tooltipContent,
  ...rest
}: AppMobileNumberInputProps) {
  const { i18n } = useTranslation();
  const isBelowMD = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const [telCountry, setTelCountry] = useState<CountryCode>(country);

  useEffect(() => {
    setTelCountry(country);
  }, [country]);

  const availableCountries = onlyAvailableCountries?.includes(telCountry)
    ? onlyAvailableCountries
    : onlyAvailableCountries
      ? [...onlyAvailableCountries, telCountry]
      : undefined;

  const renderLabelWithTooltip = (labelText: string | undefined) => {
    if (!labelText) return null;
    return (
      <Box display="flex" alignItems="center" gap={0.5} component="span">
        <Typography variant="body2" fontWeight={500}>
          {labelText}
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
    );
  };

  return (
    <FormControl fullWidth margin={margin || "normal"}>
      {/* {label && renderLabelWithTooltip(label)} */}
      <MuiTelInput
        defaultCountry={telCountry}
        label={`${label || ""}${required ? "*" : ""}`}
        disableDropdown={isDisabled}
        forceCallingCode
        disabled={disabled}
        autoComplete="off"
        onlyCountries={availableCountries}
        sx={{
          bgcolor: "background.grid",
          color: "background.grid",
          width: "100%",
          "&.selectedText": { bgcolor: "background.grid" },
          "& .MuiOutlinedInput-root": {
            paddingLeft: "8px",
            backgroundColor: COLORS.white,
            borderRadius: "8px",
            "& fieldset": { borderColor: "background.grid", borderRadius: "8px" },
            "&.Mui-focused fieldset": { borderColor: COLORS.primary },
            "&:hover fieldset": { borderColor: COLORS.border },
            "&.Mui-disabled fieldset": { borderColor: "background.grid" },
          },
          "& .MuiTelInput-IconButton img": { width: "22px !important" },
        }}
        value={value || ""}
        onChange={(val?: string) => onChange?.(val?.replaceAll(" ", "") || "")}
        onBlur={onBlur}
        onFocus={onFocus}
        MenuProps={{
          style: {
            maxHeight: "368px",
            maxWidth: "368px",
            direction: i18n.language === "ar" ? "rtl" : "ltr",
          },
          sx: { "& .MuiTelInput-ListItemIcon-flag img": { width: "22px !important" } },
        }}
        error={!!(error || errorText)}
        helperText={errorText || helperText}
        {...rest}
      />
    </FormControl>
  );
}

export function MobileNumberForm() {
  const [mobile, setMobile] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Submitted Mobile Number:", mobile);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: "300px", margin: "50px auto" }}
    >
      <Typography variant="h6" textAlign="center">
        Enter Your Mobile Number
      </Typography>

      <AppMobileNumberInput
        label="Mobile Number"
        value={mobile}
        onChange={(val) => setMobile(val)}
        required
        error={submitted && mobile.length < 10}
        errorText={submitted && mobile.length < 10 ? "Invalid mobile number" : ""}
        country="IN"
        placeholder="Enter mobile number"
        tooltipContent="Include country code. Example: +91 9876543210"
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ borderRadius: "8px", textTransform: "capitalize" }}
      >
        Submit
      </Button>

      {submitted && mobile.length >= 10 && (
        <Typography variant="body2" color="success.main">
          Mobile number submitted: {mobile}
        </Typography>
      )}
    </Box>
  );
}
