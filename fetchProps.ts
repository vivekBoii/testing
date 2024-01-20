import axios from "axios";
import { BACKEND_BASE_URL } from "../../../../misc/strings";

export const fetchTaggingProps = async (headers, resource, project?) => {
  return ((await axios.get(`${BACKEND_BASE_URL}/tagging/${resource}`, {
    headers: {
      ...headers
    }
  })).data);
};