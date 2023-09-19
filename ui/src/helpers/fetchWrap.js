import { createDockerDesktopClient } from '@docker/extension-api-client';
import process from 'process';
if (process.env.NODE_ENV === 'development') {
  
}

function fetchWrap(url, method, body, headers, data) {
  if (process.env.NODE_ENV === 'development') {
    return fetch(url, {
      method,
      body,
      headers,
      ...data
    });
  } else {
    const ddClient = createDockerDesktopClient();
    ddClient.extension.vm?.service?.request({url, method, headers, })
  }
}