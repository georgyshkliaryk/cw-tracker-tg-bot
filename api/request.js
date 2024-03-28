import axios from 'axios';
import { COC_AUTH_TOKEN } from './constants.js';

const commonHeaders = {
  accept: 'application/json',
  Authorization: `Bearer ${COC_AUTH_TOKEN}`,
};

export const sendRequest = async (url, headers) => {
  const options = {
    method: 'GET',
    headers: {
      ...commonHeaders,
      ...headers,
    },
  };

  try {
    const response = await axios.get(url, options);
    const data = response.data;
    if (!data) {
      const error = new Error('HTTP status code: ' + response.status);
      throw error;
    }
    return data;
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error.';
    throw Error(message);
  }
};
