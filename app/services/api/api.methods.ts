import { AxiosRequestConfig, AxiosResponse } from "axios";
import httpClient from "./http.client";

export async function fetchWrapper<T>(
  endpoint: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const response: AxiosResponse<T> = await httpClient.request<T>({
    url: endpoint,
    ...config,
  });

  if (config?.method === "DELETE" && response.status === 204) {
    return null as unknown as T;
  }

  return response.data;
}

export async function Get<T>(
  route: string,
  headers?: Record<string, string>
): Promise<T> {
  return await fetchWrapper<T>(route, { method: "GET", headers });
}

export async function Post<T>(
  route: string,
  body?: object,
  headers?: Record<string, string>
): Promise<T> {
  return await fetchWrapper<T>(route, {
    method: "POST",
    data: body,
    headers,
  });
}

export async function Patch<T>(
  route: string,
  body?: object,
  headers?: Record<string, string>
): Promise<T> {
  if (body instanceof FormData) {
    headers = {
      "Content-Type": "multipart/form-data",
    };
  }

  return await fetchWrapper<T>(route, {
    method: "PATCH",
    data: body,
    headers,
  });
}

export async function Delete<T>(
  route: string,
  headers?: Record<string, string>
): Promise<T | null> {
  return await fetchWrapper<T | null>(route, { method: "DELETE", headers });
}
