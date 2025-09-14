/* eslint-disable @typescript-eslint/no-explicit-any */
import { COLORS } from "@/styles/colors";
import { IMenu } from "@/vm";
import { Box, FormControl, Tooltip, Typography } from "@mui/material";
import { InfoIcon } from "@phosphor-icons/react";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import Select, {
  StylesConfig,
  components as reactSelectComponents,
  components as selectComponents,
} from "react-select";

const { ValueContainer, Placeholder } = selectComponents;

interface AppSelectInputProps {
  name?: string;
  id?: string;
  value: any | IMenu;
  className?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  touched?: boolean;
  error?: boolean;
  onChange: (value: string) => void;
  onBlur?: any;
  errorText?: any;
  helperText?: any;
  size?: any;
  inputProps?: any;
  menuItems: IMenu[];
  children?: any;
  margin?: "normal" | "dense" | "none";
  required?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  hideSelectedOptions?: boolean;
  valueKey?: keyof IMenu;
  labelKey?: keyof IMenu;
  autoFocus?: boolean;
  isMulti?: boolean;
  tooltipContent?: string;
}

const CustomValueContainer = ({ children, ...props }: any) => {
  return (
    <ValueContainer {...props}>
      <Placeholder {...props} isFocused={props.isFocused}>
        {props.selectProps.placeholder}
      </Placeholder>
      {React.Children.map(children, (child) =>
        child && child.type !== Placeholder ? child : null
      )}
    </ValueContainer>
  );
};
/**
 * AppSelectInput - A reusable select dropdown built with `react-select` and styled for MUI.
 *
 * Features:
 * - Supports single and multi-select
 * - Custom floating label
 * - Error and validation handling
 * - Searchable and clearable options
 * - RTL support for Arabic
 * - Optional tooltip icon for guidance
 *
 * @component
 * @param {AppSelectInputProps} props - Props for the component
 *
 * @example
 * // ✅ Copy and paste into your project
 * import React, { useState } from "react";
 * import AppSelectInput from "./AppSelectInput";
 *
 * const ExampleSelectUsage = () => {
 *   const [selectedValue, setSelectedValue] = useState<string>("");
 *
 *   const options = [
 *     { value: "apple", label: "Apple" },
 *     { value: "banana", label: "Banana" },
 *     { value: "cherry", label: "Cherry", disabled: true },
 *   ];
 *
 *   return (
 *     <div style={{ width: "300px", margin: "2rem auto" }}>
 *       <AppSelectInput
 *         name="fruits"
 *         label="Select Fruit"
 *         value={selectedValue}
 *         onChange={(val) => setSelectedValue(val)}
 *         menuItems={options}
 *         isClearable
 *         isSearchable
 *         required
 *         tooltipContent="Pick your favourite fruit"
 *         error={!selectedValue}
 *         errorText={!selectedValue ? "Please select a fruit" : ""}
 *       />
 *
 *       <div style={{ marginTop: "1rem" }}>
 *         <strong>Selected Value:</strong> {selectedValue || "None"}
 *       </div>
 *     </div>
 *   );
 * };
 *
 * export default ExampleSelectUsage;
 */

function AppSelectInput({
  name,
  id,
  value,
  label,
  onChange,
  onBlur,
  menuItems,
  className,
  disabled,
  touched,
  error,
  errorText,
  helperText,
  size,
  inputProps,
  children,
  margin,
  required,
  placeholder,
  isClearable = false,
  isSearchable = true,
  hideSelectedOptions = false,
  valueKey = "value",
  labelKey = "label",
  autoFocus,
  isMulti = false,
  tooltipContent = "",
  ...rest
}: AppSelectInputProps) {
  const { t, i18n } = useTranslation();
  const selectRef = useRef<any>(null);

  if (!valueKey || valueKey === "value") {
    menuItems = menuItems?.map((e) => {
      return {
        ...e,
        label: typeof e?.label === "string" ? t(e?.label as string) : e?.label,
        value: e.value,
        isFixed: e.isFixed,
      };
    });
  }

  valueKey = valueKey || "value";
  labelKey = labelKey || "label";

  const valueString = value ? (typeof value === "string" ? value : value[valueKey]) : "";

  const styles: StylesConfig<IMenu, true> = {
    multiValueLabel: (base) => {
      return { ...base, fontSize: "1rem" };
    },
    control: (provided, state) => ({
      ...provided,
      minHeight: "56px",
      boxShadow: state.isFocused ? `0 0 0 1px ${COLORS.primary}` : "none",
      borderColor: state.isFocused ? `${COLORS.primary}` : provided.borderColor,
      "&:hover": {
        borderColor: state.isFocused ? "rgba(25, 137, 250, 0.08)" : provided.borderColor,
      },
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isDisabled ? "#cccccc" : "#000",
      backgroundColor: state.isSelected
        ? "rgba(25, 137, 250, 0.08)"
        : state.isFocused
          ? "rgba(25, 137, 250, 0.12)"
          : "inherit",
      "&:hover": {
        backgroundColor: state.isSelected ? "rgba(25, 137, 250, 0.08)" : "rgba(25, 137, 250, 0.12)",
      },
      cursor: state.isDisabled ? "initial" : "pointer",
      fontWeight: 400,
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "2px 13px",
      overflow: "visible",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: disabled ? COLORS.text_dark : "initial",
    }),
    menu: (provided) => ({
      ...provided,
      position: "absolute",
      right: 0,
      zIndex: 9999,
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: error ? COLORS.error : "#000",
      fontWeight: 400,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxHeight: "24px",
      opacity: state.hasValue || state.selectProps.inputValue || error ? 1 : 0.4,
      position: "absolute",
      top: state.hasValue || state.selectProps.inputValue ? "-24px" : 2,
      padding: "0 4px",
      paddingTop: "2px",
      marginLeft: "0px",
      background:
        state.hasValue || state.selectProps.inputValue
          ? `linear-gradient(to bottom, transparent 50%, ${disabled ? "#f2f2f2" : "#FFF"} 50%)`
          : "transparent",
      zIndex: state.hasValue || state.selectProps.inputValue ? 9999 : 99999,
      transition: "top 0.1s, font-size 0.1s",
      fontSize: (state.hasValue || state.selectProps.inputValue) && 12,
      maxWidth: "100%", // or 'calc(100% - somePadding)' if needed
    }),
    menuPortal: (provided) => ({
      ...provided,
      left: "auto",
      zIndex: 9999,
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: error ? COLORS.error : "inherit", // change arrow color
      opacity: state.hasValue || state.selectProps.inputValue || error ? (disabled ? 0.2 : 1) : 0.4,
    }),
  };
  const CustomDropdownIndicator = (props: any) => {
    return (
      <reactSelectComponents.DropdownIndicator {...props}>
        {tooltipContent && (
          <Tooltip title={tooltipContent}>
            <Box sx={{ position: "relative", left: "5px", top: "-10px", cursor: "pointer" }}>
              <InfoIcon size={16} />
            </Box>
          </Tooltip>
        )}
      </reactSelectComponents.DropdownIndicator>
    );
  };
  const components = {
    MultiValueContainer: ({ selectProps, data }: any) => {
      const values = selectProps.value;
      console.log("values", values, "data", data);
      if (values) {
        return values[values.length - 1][labelKey] === data[labelKey]
          ? data[labelKey]
          : data[labelKey] + ", ";
      } else return "";
    },
    ValueContainer: CustomValueContainer,
    DropdownIndicator: CustomDropdownIndicator,
  };

  const NoOptionsMessage = (props: any) => {
    return (
      <div {...props}>
        <span className="custom-css-class fw-400">{t("noOptionsFound")}</span>
      </div>
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      return;
    }
  };

  return (
    <FormControl fullWidth margin={margin || "normal"}>
      <Select
        id={id}
        ref={selectRef}
        getOptionValue={(option: IMenu) => option[valueKey] as string}
        getOptionLabel={(option: IMenu) => option[labelKey] as string}
        options={menuItems}
        defaultValue={menuItems.find((ele) => ele[valueKey] === valueString) || null}
        value={menuItems.find((ele) => ele[valueKey] === valueString) || null}
        onChange={(e: IMenu) => {
          onChange(e?.[valueKey] || "");
        }}
        onBlur={onBlur}
        styles={styles}
        name={name || ""}
        className={`react-select react-select-overflow-top ${error || errorText ? "react-select-field-error" : ""} ${
          className || ""
        }`}
        isMulti={isMulti || undefined}
        isDisabled={disabled}
        isRtl={i18n.language === "ar" ? true : false}
        isClearable={isClearable}
        isSearchable={isSearchable}
        hideSelectedOptions={hideSelectedOptions}
        components={components}
        placeholder={`${label || ""}${required ? "*" : ""}` || ""}
        noOptionsMessage={NoOptionsMessage}
        menuPosition="fixed"
        isOptionDisabled={(option) => option.disabled === true}
        autoFocus={autoFocus}
        onKeyDown={handleKeyDown}
      />
      {(error || errorText) && (
        <Typography
          variant="caption"
          color="error"
          className={`language-${i18n.language}`}
          sx={{
            marginTop: "3px",
            marginRight: "14px",
            marginBottom: 0,
            marginLeft: "14px",
          }}
        >
          {errorText || helperText}
        </Typography>
      )}
    </FormControl>
  );
}
export default AppSelectInput;
