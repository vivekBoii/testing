import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { RECHECK_FOR_AUTH_TIME } from "../../../misc/config";
import { BACKEND_BASE_URL } from "../../../misc/strings";
import { errorHandler } from "../../app/errorHandler";
import { register } from "../../handlers/PluginEventHandler";

const useCheckAuth = (keyPair, rechecks, onError) => {

  const checkForAuth = useQuery({
    queryKey: ["checkAccess", keyPair],
    queryFn: async () => {
      const { read_key } = keyPair;
      const resp = await axios.post(`${BACKEND_BASE_URL}/auth/plugin/figma/checkAccess`, {
        read_key
      });
      return resp.data;
    },
    onSuccess: async (data) => {

      if (data?.data?.error) {

        onError(data.data.error);
        return;
      }

      if (data?.message === "Granted") {
        const token = data.data.token;
        register("setToken", () => {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }, token);
      }

    },
    refetchInterval: () => (rechecks ? RECHECK_FOR_AUTH_TIME : false),
    onError: (error) => {
      errorHandler(error);
      onError(error);
    },
    refetchOnWindowFocus: false,
  });

  return checkForAuth;
};


const useCurrentUser = () => {
  const { isLoading, error, data, isError } = useQuery({
    queryKey: ["fetchCurrentUser"],
    queryFn: async () => {
      const res = await axios.get(`${BACKEND_BASE_URL}/user`);
      return res.data;
    },
    onError: errorHandler,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });
  return { isLoading, error, data, isError };
};

export const logout = async () => {
  register("setToken", () => {
    axios.defaults.headers.common["Authorization"] = null;
  }, null);
};

export { useCurrentUser, useCheckAuth };