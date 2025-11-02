/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ToastContext } from "../providers/SnackBar";
import { useAppDispatch } from "../store";
import { setUser } from "../store/slices/authSlice";
import { LoginResponse } from "../vm";
import { baseHttpClient, setToken } from "./utils/utilService";

export function useLogin() {
  const qc = useQueryClient();
  const dispatch = useAppDispatch();
  const { showToast } = useContext(ToastContext);
  const router = useRouter();
  return useMutation({
    mutationKey: ["auth/login"],
    mutationFn: async (data: { empId: number; password: string }) =>
      baseHttpClient<LoginResponse>("login", "POST", data),
    onSuccess: (res) => {
      showToast(res.message, "success");
      dispatch(setUser(res.data.user));
      setToken(res.data.token);
      router.push("/dashboard");
    },
    onError: (error: any) => {
      showToast(error.message ?? "Something Went Wrong", "error");
    },
  });
}
