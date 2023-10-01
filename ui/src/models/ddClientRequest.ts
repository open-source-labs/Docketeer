import { createDockerDesktopClient } from "@docker/extension-api-client";
import { RequestConfig } from "@docker/extension-api-client-types/dist/v0";

const ddClient = createDockerDesktopClient();

class DdFetchError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    Object.setPrototypeOf(this, DdFetchError.prototype);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const ddClientRequest = async<T>(options: RequestConfig): Promise<T> => {
  if (!ddClient.extension?.vm?.service?.request) {
    console.log("Can't Bind ddClient, using Fetch");
    const result = await fetch(options.url, {
      method: options.method.toUpperCase(),
      headers: options.headers,
      body: options.data
    });

    if (!result.ok) {
      let errorMessage;
      try {
        const errorData = await result.json();
        errorMessage = errorData.message || JSON.stringify(errorData);
      } catch (err) {
        errorMessage = result.statusText;
      }
      throw new DdFetchError(errorMessage, result.status);
    }

    return result.json() as Promise<T>;
  }

  return ddClient.extension.vm.service.request(options) as Promise<T>;
};

export const encodeQuery = (dict: { [key: string]: string }): string => {
  let query = '';
  for (let key in dict) {
    query += `${key}=${encodeURIComponent(dict[key])}&`
  }
  return query.slice(0, -1);
}

export const apiRequest = async<T>(url: string, method: 'GET' | 'POST' | 'DELETE' = 'GET', body: any = {}, headers: any = {}): Promise<T> => {
  try {
    return await ddClientRequest({ method, url, data: body, headers });
  } catch (error) {
    console.error(`API ${method} request to ${url} failed`, error);
    throw error;  // Or return a default value if that's preferable
  }
}