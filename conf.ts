import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

import axios from "axios";
import { BACKEND_BASE_URL } from "../../../misc/strings";
import { toast } from "../../handlers/PluginEventHandler";
import { useSelector } from "react-redux";
import { selectCurrentNodeId, selectProjectName } from "./confSlice";
import { errorHandler } from "../../app/errorHandler";





const useCreateProject = () => {
  const queryClient = useQueryClient();
  const createProject = async (project: any) => {
    return await axios.post(`${BACKEND_BASE_URL}/project`, project);
  };

  const mutation = useMutation(createProject, {
    onSuccess: async () => {
      toast("Project Created");
      await queryClient.invalidateQueries(["fetchProjects"]);
    },
    onError: errorHandler,
  });

  return mutation;
};

const useUpdateProjectSettings = (id) => {
  const queryClient = useQueryClient();
  const updateSetting = async (newProject) => {
    const resp = await axios.put(`${BACKEND_BASE_URL}/project`, newProject);
    return resp.data;
  };

  const mutation = useMutation(updateSetting, {
    onSuccess: async (data) => {
      queryClient.setQueryData(["fetchProject", id], data);
      // toast.success("Updated Successfully");
    },
    onError: errorHandler,
  });

  return mutation;
};

export const getAllProjects = async () => {
  const response = await axios.get(`${BACKEND_BASE_URL}/project/all`);
  return response;
};

const useProjects = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["fetchProjects"],
    queryFn: async () => {
      toast("Loading Projects");
      return (await getAllProjects()).data;
    },
    onSuccess(data) {
      console.log("projects ", data);
    },
    onError: errorHandler,
  });
  return { isLoading, error, data, isError };
};

const useProject = (id) => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["fetchProject", id],
    queryFn: async () => {
      const resp = await axios.get(`${BACKEND_BASE_URL}/project/${id}`);
      return resp.data;
    },
    onSuccess(data) {
      console.log("resp.data", data);
    },
    onError: errorHandler,
  });
  return { isLoading, error, data, isError };
};

export { useUpdateProjectSettings, useCreateProject, useProjects, useProject };
