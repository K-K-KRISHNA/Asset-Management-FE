/* eslint-disable @typescript-eslint/no-explicit-any */

import { IMenu } from "@/vm";
import { FormControl, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { StylesConfig, components as selectComponents } from "react-select";
import CreatableSelect from "react-select/creatable";
import { COLORS } from "../../styles/colors";

const { ValueContainer, Placeholder } = selectComponents;

interface AppCreatableSelectInputProps {
  name?: string;
  value: string | IMenu;
  className?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  touched?: boolean;
  error?: boolean;
  onChange: (value: string) => void;
  onCreateOption: (value: string) => void;
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
 * AppCheckBoxInput
 *
 * A reusable checkbox component with optional label, tooltip, error handling, and MUI styling.
 *
 * @example
 * ```tsx
 * <AppCheckBoxInput
 *   name="agreeTerms"
 *   value={isChecked}
 *   label="I agree to the terms and conditions"
 *   required
 *   onChange={(e) => setIsChecked(e.target.checked)}
 *   error={!!error}
 *   errorText={error}
 *   tooltipContent="Check this box to proceed"
 * />
 * ```
 *
 * @param {string} [name] - Name of the checkbox input.
 * @param {boolean} value - The checked state of the checkbox.
 * @param {string | JSX.Element} [label] - Label to display next to the checkbox.
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} onChange - Change handler function.
 * @param {boolean} [fullWidth=true] - If true, the checkbox container takes full width.
 * @param {boolean} [disabled=false] - If true, disables the checkbox.
 * @param {boolean} [required=false] - If true, marks the checkbox as required.
 * @param {boolean} [error=false] - If true, marks the checkbox in error state.
 * @param {string} [errorText] - Error text to display below the checkbox.
 * @param {string} [helperText] - Helper text to display below the checkbox.
 * @param {"end" | "start" | "top" | "bottom"} [labelPlacement] - Position of the label relative to the checkbox.
 * @param {string} [color] - MUI color of the checkbox.
 * @param {string} [size] - MUI size of the checkbox.
 * @param {string} [labelMarginRight] - Custom margin-right for the label.
 * @param {any} [sx] - Additional MUI sx styling object.
 * @param {string | JSX.Element} [tooltipContent] - Tooltip content for info icon.
 * @param {string} [id] - HTML id attribute for the checkbox.
 */

function AppCreatableSelectInput({
  name,
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
  onCreateOption,
  ...rest
}: AppCreatableSelectInputProps) {
  const { t, i18n } = useTranslation();
  // console.log('menuItems', menuItems);

  if (!valueKey) {
    menuItems = menuItems.map((e) => {
      return { ...e, label: t(e?.label as string), value: e.value, isFixed: e.isFixed };
    });
  }

  valueKey = valueKey || "value";
  labelKey = labelKey || "label";

  const valueString = typeof value === "string" ? value : value[valueKey];

  const styles: StylesConfig<IMenu, true> = {
    multiValueLabel: (base, state) => {
      return { ...base, fontSize: "1rem" };
    },
    option: (provided, state) => ({
      ...provided,
      color: state.isDisabled ? "#cccccc" : "#000",
      backgroundColor: state.isSelected ? "rgba(25, 137, 250, 0.08)" : "inherit",
      "&:hover": {
        backgroundColor: state.isSelected ? "rgba(25, 137, 250, 0.08)" : "rgba(25, 137, 250, 0.12)",
      },
      cursor: state.isDisabled ? "initial" : "pointer",
      fontWeight: 400,
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      padding: "2px 13px",
      overflow: "visible",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: disabled ? COLORS.text_dark : "initial",
    }),
    menu: (provided, state) => ({
      ...provided,
      position: "absolute",
      right: 0,
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: "#000",
      fontWeight: 400,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxHeight: "24px",
      opacity: state.hasValue || state.selectProps.inputValue ? 1 : 0.4,
      position: "absolute",
      top: state.hasValue || state.selectProps.inputValue ? "-18px" : 2,
      padding: "0 4px",
      backgroundColor: state.hasValue || state.selectProps.inputValue ? "white" : "transparent",
      transition: "top 0.1s, font-size 0.1s",
      fontSize: (state.hasValue || state.selectProps.inputValue) && 12,
    }),
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
  };

  // const NoOptionsMessage = (props: any) => {
  //   return (
  //     <div {...props}>
  //       <span className='custom-css-class fw-400'>{t('noOptionsFound')}</span>
  //     </div>
  //   );
  // };

  return (
    <FormControl fullWidth margin={margin || "normal"}>
      <CreatableSelect
        getOptionValue={(option: IMenu) => option[valueKey] as string}
        getOptionLabel={(option: IMenu) => option[labelKey] as string}
        options={menuItems}
        defaultValue={menuItems.find((ele) => ele[valueKey] === valueString) || null}
        value={menuItems.find((ele) => ele[valueKey] === valueString) || null}
        onChange={(e: IMenu) => {
          onChange(e?.[valueKey] || "");
        }}
        onCreateOption={onCreateOption}
        onBlur={onBlur}
        styles={styles}
        name={name || ""}
        className={`react-select react-select-overflow-top ${error || errorText ? "react-select-field-error" : ""} ${
          className || ""
        }`}
        isDisabled={disabled}
        isRtl={i18n.language === "ar" ? true : false}
        isClearable={isClearable}
        isSearchable={isSearchable}
        hideSelectedOptions={hideSelectedOptions}
        components={components}
        placeholder={`${label || ""}${required ? "*" : ""}` || ""}
        // noOptionsMessage={NoOptionsMessage}
        menuPosition="fixed"
        isOptionDisabled={(option) => option.disabled === true}
        autoFocus={autoFocus}
        openMenuOnFocus={autoFocus}
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

export default AppCreatableSelectInput;

/*
export function SelectExamplePage() {
  // options list
  const [menuItems, setMenuItems] = useState<IMenu[]>([
    { label: "React", value: "react" },
    { label: "Next.js", value: "next" },
    { label: "TypeScript", value: "ts" },
  ]);

  // selected value
  const [selected, setSelected] = useState<string>("");

  // handler for creating new option
  const handleCreateOption = (newValue: string) => {
    const newOption: IMenu = { label: newValue, value: newValue };
    setMenuItems((prev) => [...prev, newOption]);
    setSelected(newValue);
  };

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto" }}>
      <AppCreatableSelectInput
        label="Select or Create Technology"
        value={selected}
        menuItems={menuItems}
        onChange={(value: string) => setSelected(value)}
        onCreateOption={handleCreateOption}
        placeholder="Choose or create..."
        required
        isClearable
        helperText="Pick from the list or add your own"
      />

      <div style={{ marginTop: "1rem" }}>
        <strong>Selected Value:</strong> {selected || "None"}
      </div>
    </div>
  );
}
	*/
