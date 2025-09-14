/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ILanguage<T> {
  [key: string]: { [key: string]: T };
}
export interface IMenu extends Record<string, any> {
  label?: string | JSX.Element;
  value?: string;
  language?: ILanguage;
  disabled?: boolean;
}
