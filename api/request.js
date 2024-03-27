import { COC_AUTH_TOKEN } from './constants.js';

const commonHeaders = {
  accept: 'application/json',
  Authorization: `Bearer ${COC_AUTH_TOKEN}`,
};

export const sendRequest = async (url, method = 'GET', body, headers) => {
  const options = {
    method,
    headers: {
      ...commonHeaders,
      ...headers,
    },
    body,
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const error = new Error('HTTP status code: ' + response.status);
      throw error;
    }
    const json = await response.json();
    return json;
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error.';
    throw Error(message);
  }
};
