/* eslint-disable @typescript-eslint/no-explicit-any */
import { COLORS } from "@/styles/colors";
import { IMenu } from "@/vm";
import { Box, Checkbox, FormControl, Tooltip, Typography } from "@mui/material";
import { InfoIcon } from "@phosphor-icons/react";
import * as React from "react";
import { useTranslation } from "react-i18next";
import Select, {
  MultiValue,
  StylesConfig,
  components as reactSelectComponents,
  components as selectComponents,
} from "react-select";
const { ValueContainer, Placeholder } = selectComponents;
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

interface AppMultiSelectInputProps {
  name?: string;
  values: string[];
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
  size?: any;
  inputProps?: any;
  menuItems: IMenu[];
  children?: any;
  margin?: "normal" | "dense" | "none";
  required?: boolean;
  hasSelectAll?: boolean;
  hideLabelOnValue?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  hideSelectedOptions?: boolean;
  valueKey?: keyof IMenu;
  labelKey?: keyof IMenu;
  tooltipContent?: string;
  id?: string;
}
/**
 * @typedef {Object} AppMultiSelectInputProps
 * @property {string} [name] - Name attribute for the input field.
 * @property {string[]} values - Selected values (array of strings).
 * @property {IMenu[]} menuItems - Options to display in the dropdown.
 * @property {string} [label] - Label for the input field.
 * @property {string} [placeholder] - Custom placeholder text.
 * @property {boolean} [disabled=false] - Whether the input is disabled.
 * @property {boolean} [touched] - Whether the field has been touched (Formik support).
 * @property {boolean} [error=false] - Indicates if there's an error.
 * @property {string} [errorText] - Error message text.
 * @property {string} [helperText] - Helper text when there's no error.
 * @property {"normal" | "dense" | "none"} [margin] - Field margin style.
 * @property {boolean} [required=false] - Marks the field as required.
 * @property {boolean} [hasSelectAll=false] - Enables the "Select All" option.
 * @property {boolean} [hideLabelOnValue=false] - Hides label when a value is selected.
 * @property {boolean} [isClearable=false] - Allows clearing selected values.
 * @property {boolean} [isSearchable=true] - Allows searching inside the dropdown.
 * @property {boolean} [hideSelectedOptions=false] - Hides selected options from the dropdown.
 * @property {keyof IMenu} [valueKey="value"] - The key used for option values.
 * @property {keyof IMenu} [labelKey="label"] - The key used for option labels.
 * @property {string} [tooltipContent] - Optional tooltip message.
 * @property {string} [id] - HTML id for the input.
 * @property {(value: IMenu[]) => void} [onChange] - Callback when values change.
 * @property {(event: React.FocusEvent) => void} [onBlur] - Callback when input loses focus.
 */

/**
 * AppMultiSelectInput - A reusable multi-select input component built on top of `react-select`.
 *
 * Features:
 * - Multi-select with checkboxes
 * - "Select All" functionality
 * - Supports disabled options
 * - Custom placeholder with floating label behaviour
 * - Optional tooltip on dropdown indicator
 * - Error/validation message handling
 * - i18n support (RTL and translations)
 *
 * @component
 * @param {AppMultiSelectInputProps} props - Props for the component.
 *
 * @example
 * ```tsx
 * import React, { useState } from "react";
 * import AppMultiSelectInput from "./AppMultiSelectInput";
 * import { IMenu } from "index/vm";
 *
 * const Example = () => {
 *   const [selectedValues, setSelectedValues] = useState<string[]>([]);
 *
 *   const options: IMenu[] = [
 *     { value: "apple", label: "Apple" },
 *     { value: "banana", label: "Banana" },
 *     { value: "cherry", label: "Cherry" },
 *     { value: "mango", label: "Mango", disabled: true },
 *   ];
 *
 *   return (
 *     <AppMultiSelectInput
 *       name="fruits"
 *       label="Select Fruits"
 *       values={selectedValues}
 *       onChange={(selected: IMenu[]) =>
 *         setSelectedValues(selected.map((item) => item.value))
 *       }
 *       menuItems={options}
 *       required
 *       hasSelectAll
 *       isClearable
 *       tooltipContent="Choose one or more fruits"
 *       error={selectedValues.length === 0}
 *       errorText={selectedValues.length === 0 ? "Please select at least one fruit" : ""}
 *     />
 *   );
 * };
 * ```
 */

function AppMultiSelectInput({
  name,
  values,
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
  hasSelectAll,
  hideLabelOnValue = false,
  isClearable = false,
  isSearchable = true,
  hideSelectedOptions = false,
  valueKey = "value",
  labelKey = "label",
  tooltipContent = "",
  id,
  ...rest
}: AppMultiSelectInputProps) {
  valueKey = valueKey || "value";
  labelKey = labelKey || "label";

  const { t, i18n } = useTranslation();
  const selectRef = React.useRef<any>(null);
  const styles: StylesConfig<IMenu, true> = {
    multiValueLabel: (base, state) => {
      return { ...base, fontSize: "1rem" };
    },
    control: (provided, state) => ({
      ...provided,
      minHeight: "56px",
      boxShadow: state.isFocused ? `0 0 0 1px ${COLORS.primary}` : "none",
      borderColor: state.isFocused ? COLORS.primary : provided.borderColor,
      "&:hover": {
        borderColor: state.isFocused ? COLORS.primary : provided.borderColor,
      },
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isDisabled ? "#cccccc" : "#000",
      backgroundColor: state.isFocused
        ? COLORS.primary
        : state.isSelected
          ? "rgba(25, 137, 250, 0.08)"
          : "inherit",
      "&:hover": {
        backgroundColor: state.isSelected ? "rgba(25, 137, 250, 0.2)" : "rgba(25, 137, 250, 0.2)",
      },
      cursor: state.isDisabled ? "initial" : "pointer",
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      padding: "2px 13px",
      height: "32px",
      display: "flex",
      flexDirection: "column",
      alignContent: "flex-start",
      position: state.hasValue || state.selectProps.inputValue ? "unset" : "relative",
    }),
    input: (provided, state) => ({
      ...provided,
      fontSize: "1rem",
      fontWeight: "400",
      order: "-1",
      maxWidth: "fit-content",
      marginRight: "-4px",
      marginTop: "-2px",
      padding: "0",
    }),
    menu: (provided, state) => ({
      ...provided,
      position: "absolute",
      right: 0,
      zIndex: 9999,
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: error ? COLORS.error : "#000",
      fontWeight: 400,
      // opacity: state.hasValue || state.selectProps.inputValue ? (hideLabelOnValue ? 0 : 1) : 0.4,
      opacity:
        state.hasValue || state.selectProps.inputValue || error ? (hideLabelOnValue ? 0 : 1) : 0.4,
      whiteSpace: "nowrap",
      overflow: "visible",
      textOverflow: "ellipsis",
      maxHeight: "24px",
      position: "absolute",
      left: state.hasValue ? 12 : 12,
      top: state.hasValue || state.selectProps.inputValue ? "-12px" : 2,
      padding: "0 4px",
      paddingTop: "2px",
      marginLeft: "0px",
      background:
        state.hasValue || state.selectProps.inputValue
          ? `linear-gradient(to bottom, transparent 50%, ${disabled ? "#f2f2f2" : "#FFF"} 50%)`
          : "transparent",
      zIndex: state.hasValue || state.selectProps.inputValue ? 9999 : "initial",
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
      let valueToReturn = "";
      if (values) {
        valueToReturn =
          values[values.length - 1][labelKey] === data[labelKey]
            ? data[labelKey]
            : data[labelKey] + ", ";
      } else valueToReturn = "";
      return (
        <span className={selectProps?.isDisabled ? "text-disabled" : ""}>{valueToReturn}</span>
      );
    },
    ValueContainer: CustomValueContainer,
    DropdownIndicator: CustomDropdownIndicator,
  };
  const NoOptionsMessage = (props: any) => {
    return (
      <div {...props}>
        <span className="custom-css-class">{t("noOptionsFound")}</span>
      </div>
    );
  };

  // Helper function to get only enabled options
  const getEnabledOptions = React.useCallback(() => {
    return menuItems.filter((item) => !item.disabled);
  }, [menuItems]);

  const handleChange = (selectedOptions: MultiValue<IMenu>) => {
    if (!onChange) return;

    if (hasSelectAll) {
      const selectedValues = selectedOptions.map((option) => option[valueKey]);
      const isSelectAllChosen = selectedValues.includes("select-all");
      const enabledOptions = getEnabledOptions();
      const allEnabledSelected = selectedOptions.length - 1 === enabledOptions.length;

      if (isSelectAllChosen) {
        // Toggle select all for enabled options only
        const newSelectedOptions = allEnabledSelected ? [] : enabledOptions;
        onChange(newSelectedOptions);
      } else {
        // Regular selection change (filter out the select-all option if present)
        onChange(selectedOptions.filter((option) => option[valueKey] !== "select-all"));
      }
    } else {
      // No select all functionality
      onChange(selectedOptions);
    }
  };

  const formatOptionLabel = ({ [valueKey]: value, [labelKey]: label, disabled }: any) => (
    <div style={{ display: "flex" }}>
      {value === "select-all" ? (
        <Box display="flex" alignItems="center">
          <Checkbox
            size="small"
            disabled={disabled || getEnabledOptions().length === 0}
            sx={{ padding: 0, paddingRight: "8px" }}
            checked={values.length === getEnabledOptions().length && values.length > 0}
            indeterminate={values.length > 0 && values.length < getEnabledOptions().length}
          />
          <Typography>{t(label)}</Typography>
        </Box>
      ) : (
        <Box display="flex" alignItems="center">
          <Checkbox
            size="small"
            disabled={disabled}
            sx={{ padding: 0, paddingRight: "8px" }}
            checked={values.includes(value)}
          />
          <Typography>{t(label) || label || "-"}</Typography>
        </Box>
      )}
    </div>
  );

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      return;
    }
  };

  return (
    <FormControl fullWidth margin={margin || "normal"}>
      <Select
        ref={selectRef}
        isMulti
        getOptionValue={(option: IMenu) => option[valueKey]}
        getOptionLabel={(option: IMenu) => option[labelKey]}
        options={
          hasSelectAll && menuItems.length > 0
            ? [
                {
                  [labelKey]: "selectAll",
                  [valueKey]: "select-all",
                  disabled: getEnabledOptions().length === 0,
                } as IMenu,
                ...menuItems,
              ]
            : menuItems
        }
        value={menuItems.filter((item) => values.includes(item[valueKey]))}
        onChange={handleChange}
        onBlur={onBlur}
        styles={styles}
        name={name || ""}
        id={id}
        className={`react-select react-select-overflow-top react-select-multi ${
          error || errorText ? "react-select-field-error" : ""
        } ${className || ""}`}
        isDisabled={disabled}
        isRtl={i18n.language === "ar" ? true : false}
        isClearable={isClearable}
        isSearchable={isSearchable}
        hideSelectedOptions={hideSelectedOptions}
        components={components}
        formatOptionLabel={formatOptionLabel}
        placeholder={`${label || ""}${required ? "*" : ""}` || ""}
        noOptionsMessage={NoOptionsMessage}
        isOptionDisabled={(option) => option.disabled === true}
        menuPosition="fixed"
        backspaceRemovesValue={false}
        closeMenuOnSelect={false}
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

export default AppMultiSelectInput;
