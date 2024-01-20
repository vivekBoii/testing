import axios from "axios";
import axiosRetry, { exponentialDelay } from "axios-retry";

// Post body/data to backend `uri` and invoke callback function
export const postJson = async (uri: string, headers, body, callback: (Response, Error) => void) => {

  axiosRetry(axios, { retries: 3, retryDelay: exponentialDelay });

  try {
    const response = await axios.post(uri, body, {
      headers: {
        "Content-type": "application/json",
        ...headers
      },
    });
    callback(response, undefined);
    return response;
  } catch (err) {
    callback(undefined, err);
  }
};