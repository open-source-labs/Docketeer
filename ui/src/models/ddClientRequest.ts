import { RequestConfig } from "@docker/extension-api-client-types/dist/v0";

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
  let ddClient;

  try {
    const { createDockerDesktopClient } = await import("@docker/extension-api-client");
    ddClient = createDockerDesktopClient();
  } catch (error) {
    ddClient = null;
  }

  if (!ddClient || !ddClient.extension?.vm?.service?.request) {
    console.log("Can't Bind ddClient, using Fetch");
    const fetchOptions: RequestInit = {
      method: options.method.toUpperCase(),
    };
    if (fetchOptions.method !== 'GET' && fetchOptions.method !== 'DELETE') {
      fetchOptions.body = JSON.stringify(options.data); 
    }
    if (!options.headers) {
      console.log('ran');
      fetchOptions.headers=options.headers
    }
    console.log(fetchOptions)
    const result = await fetch(options.url, fetchOptions);

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
    console.log(body);
    return await ddClientRequest({ method, url, data: body, headers });
  } catch (error) {
    throw error; 
  }
}