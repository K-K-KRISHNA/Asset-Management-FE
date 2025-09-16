/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ILanguage<T> {
  [key: string]: { [key: string]: T };
}
// Common base type for entities with timestamps and soft delete
interface BaseEntity {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

// Root response
export interface LoginResponse {
  user: User;
  token: string;
}

// User entity
export interface User extends BaseEntity {
  password: string;
  personalInfo: PersonalInfo;
  employmentInfo: EmploymentInfo;
  fullName: string;
}

// Personal Information
export interface PersonalInfo extends BaseEntity {
  firstName: string;
  lastName: string;
  mobile: string;
  dateOfBirth?: string | null;
  email?: string | null;
  bloodGroup?: string | null;
  address?: string | null;
}

// Employment Information
export interface EmploymentInfo extends BaseEntity {
  designation: Designation;
  empId: number;
  email: string;
  joiningDate?: string | null;
  expYears?: number | null;
  expMonths?: number | null;
  expDays?: number | null;
  noticePeriod: number;
}

// Designation
export interface Designation extends BaseEntity {
  name: string;
  description?: string | null;
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
