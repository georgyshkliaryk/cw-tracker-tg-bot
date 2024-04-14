import axios from 'axios';

const commonHeaders = {
  accept: 'application/json',
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
      console.error(error);
    }
    return data;
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error.';
    console.error(message);
  }
};
