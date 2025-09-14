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

export interface IToken {
  userId: string;
}
export interface IStandardAPIResponse<T = any> {
  status: boolean;
  message: string;
  data: T;
  count?: number;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
