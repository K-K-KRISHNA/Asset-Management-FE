/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_URL } from "@/constants";
import { startGlobalLoading, stopGlobalLoading } from "@/services/utils/loadingManager";
import { HttpMethod, IStandardAPIResponse } from "@/vm";

export const baseHttpClient = async <T>({
  method,
  endPoint,
  bodyObj = undefined,
  apiUrl = BASE_URL,
  token,
  isPublic = false,
  retry = true,
  onTokenRefresh, // callback to update token in store
  onTokenExpired,
}: {
  endPoint: string;
  method: HttpMethod;
  bodyObj?: any;
  apiUrl?: string;
  token?: string;
  isPublic?: boolean;
  retry?: boolean;
  onTokenRefresh?: (newToken: string) => void;
  onTokenExpired?: () => void;
}): Promise<IStandardAPIResponse<T>> => {
  startGlobalLoading();
  try {
    // Handle GET params
    if (method === "GET" && bodyObj) {
      const params = new URLSearchParams(bodyObj).toString();
      endPoint += "?" + params;
      bodyObj = undefined;
    }

    const body = bodyObj ? JSON.stringify(bodyObj) : undefined;

    const headers: Record<string, string> | undefined = {
      "Content-Type": "application/json; charset=utf-8",
      ...(token && !isPublic ? { Authorization: `Bearer ${token}` } : {}),
    };

    const url = endPoint.includes("http") ? endPoint : apiUrl + endPoint;

    const res = await fetch(url, { method, body, headers, credentials: "include" });

    // Retry once if 401
    if (res.status === 401 && retry && !isPublic) {
      console.log("Token expired. Refreshing token...");

      const refreshRes = await fetch(apiUrl + "get-access-token", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const refreshData: IStandardAPIResponse<{ token: string }> = await refreshRes.json();

      if (refreshData.status && refreshData.data?.token) {
        const newToken = refreshData.data.token;

        // Use callback to update Redux store or local state
        onTokenRefresh?.(newToken);

        // Retry original request with new token
        return baseHttpClient<T>({
          method,
          endPoint,
          bodyObj,
          apiUrl,
          token: newToken,
          isPublic,
          retry: false,
          onTokenRefresh,
        });
      } else {
        onTokenExpired?.();
        window.location.href = "/";
        throw new Error(refreshData.message);
      }
    }

    return await res.json();
  } catch (error) {
    console.error(error, "Api Error");
    throw error;
  } finally {
    stopGlobalLoading();
  }
};
