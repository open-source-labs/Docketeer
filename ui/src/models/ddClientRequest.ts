// These are needed for fetch. Otherwise the default was being set to plain text
// These values are overwritten by whatever the user supplies using spread operator
// {...DEFAULT_HEADERS, ...userHeaders}
const DEFAULT_HEADERS = {
  "Content-Type": "application/json"
}

/**
 * @abstract Error to match the format the DockerDesktopClient Gives
 */
class DdFetchError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    Object.setPrototypeOf(this, DdFetchError.prototype);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * @abstract Wrapper function for ddClient and fetch. Tests whether the application is running in browser
 *           versus docker desktop and either will use ddClient or fetch. Returns a uniform response across
 *           either instance
 */
export const ddClientRequest = async<T>(url: string, method: 'GET' | 'POST' | 'DELETE' = 'GET', body: any = {}, headers: any = {}): Promise<T> => {
  let ddClient;

  try {
    const { createDockerDesktopClient } = await import("@docker/extension-api-client");
    ddClient = createDockerDesktopClient();
  } catch (error) {
    ddClient = null;
  }

  // If we are debugging in browser, ddClient won't bind so use fetch
  if (!ddClient || !ddClient.extension?.vm?.service?.request) {
    console.log("Can't Bind ddClient, using Fetch");
    const fetchOptions: RequestInit = {
      method: method.toUpperCase(),
    };
    if (fetchOptions.method !== 'GET' && fetchOptions.method !== 'DELETE') {
      fetchOptions.body = JSON.stringify(body); 
    }
   
   
    fetchOptions.headers = {...DEFAULT_HEADERS, ...headers}
    
    const result = await fetch(url, fetchOptions);

    // Handle error message return to format the same as ddClient error messages
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

  // If we are running as docker desktop extension, above is skipped and just routed to ddClient
  return ddClient.extension.vm.service.request({method, url, data:body, headers}) as Promise<T>;
};

/**
 * @abstract Encodes an object into uri string ie. 
 *           {containers: docketeer, uptime: 5 min -> containers=docketeer&uptime=5%20min
 * @param dict key value pair used to construct query.
 * @returns {string} Encoded string for a uri query
 */
export const encodeQuery = (dict: { [key: string]: string }): string => {
  let query = '';
  for (let key in dict) {
    query += `${key}=${encodeURIComponent(dict[key])}&`
  }
  return query.slice(0, -1);
}