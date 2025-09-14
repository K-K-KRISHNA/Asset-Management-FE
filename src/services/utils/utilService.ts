/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_URL } from "@/constants";
import { startGlobalLoading, stopGlobalLoading } from "@/services/utils/loadingManager";
import { HttpMethod, IStandardAPIResponse, IToken } from "@/vm";

export function getToken() {
  const res = localStorage.getItem("token");
  if (res === null || res === undefined) {
    return "";
  }
  return res;
}

export const parseJwt = (tokenParsed?: string): IToken | undefined => {
  let token;
  if (!tokenParsed) {
    token = getToken();
  } else {
    token = tokenParsed;
  }
  if (token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const data = JSON.parse(window.atob(base64));
    return data;
  }
  return undefined;
};

export const baseHttpClient = async <T>(
  endPoint: string,
  method: HttpMethod,
  bodyObj: any = undefined,
  apiUrl: string = BASE_URL,
  isPublic: boolean = false
): Promise<IStandardAPIResponse<T>> => {
  startGlobalLoading();
  try {
    if (method === "GET" && bodyObj) {
      const params = new URLSearchParams(bodyObj).toString();
      endPoint += "?" + params;
      bodyObj = undefined;
    }

    const body = bodyObj === undefined ? undefined : JSON.stringify(bodyObj);
    let headers = undefined;

    if (!isPublic) {
      headers = {
        "Content-Type": "application/json; charset=utf-8",
        authorization: "Bearer " + getToken(),
      };
    }

    const url = endPoint.includes("http") ? endPoint : apiUrl + endPoint;
    const res = await fetch(url, { method, body, headers });

    return await res.json();
  } catch (error) {
    console.error(error, "Api Error");
    throw error;
  } finally {
    stopGlobalLoading();
  }
};
