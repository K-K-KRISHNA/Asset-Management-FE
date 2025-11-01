/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseHttpClient } from "@/services/utils/utilService";
import type { AppDispatch, RootState } from "@/store";
import { IStandardAPIResponse } from "@/vm";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { setToken } from "./slices/authSlice";

/**
 * Generic helper to create typed async thunks for API calls
 * @param typePrefix - Redux action name (e.g. "auth/login")
 * @param endPoint - API endPoint (e.g. "login")
 * @param method - HTTP method (default "POST")
 */
export function createApiThunk<Req, Res>(
  typePrefix: string,
  endPoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "POST"
) {
  return createAsyncThunk<
    IStandardAPIResponse<Res>,
    Req,
    { rejectValue: string; state: RootState }
  >(typePrefix, async (bodyObj: Req, { getState, dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const token = getState().auth.token; // get token from auth slice
      // if (method === "GET") result = await baseHttpClient<Res>({ endPoint, method, token });
      const result = await baseHttpClient<Res>({
        endPoint,
        method,
        bodyObj,
        token,
        isPublic: ["login"].includes(endPoint),
        onTokenRefresh: (newToken) => dispatch(setToken(newToken)),
        onTokenExpired: () => dispatch(setToken("")),
      });

      if (result.status) {
        return fulfillWithValue(result);
      } else {
        return rejectWithValue(result.message || "Something went wrong");
      }
    } catch (error: any) {
      return rejectWithValue(error?.message || "Network error");
    }
  });
}

/**
 * Typed version of useDispatch for Redux Toolkit.
 * It ensures your dispatch supports async thunks.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Typed version of useSelector with RootState.
 * This ensures you get proper state typings from the store.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
