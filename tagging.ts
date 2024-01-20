import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../../misc/strings";
import { errorHandler } from "../../app/errorHandler";
import { toast, registerAsync } from "../../handlers/PluginEventHandler";
const useTagNode = (projectId, nodeId) => {
  const queryClient = useQueryClient();
  const updateNodeTag = async (project: any) => {
    return await registerAsync("setdata", JSON.stringify(project));
  };

  const mutation = useMutation(updateNodeTag, {
    onSuccess: async () => {
      toast("Tagged");
      await queryClient.invalidateQueries(["fetchTag", projectId, nodeId]);
    },
    onError: errorHandler,
  });

  return mutation;
};

const useTag = (projectId: string, nodeId: string) => {

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["fetchTag", projectId, nodeId],
    queryFn: async () => {
      const getid = { key: projectId + ":tagNameData:" + nodeId };
      const resp = await registerAsync("getdata", JSON.stringify(getid));
      return resp;
    },
    onError: errorHandler,
    enabled: !!projectId && !!nodeId,
    cacheTime: 0, // Disable caching
  });
  return { isLoading, error, data, isError };
};
const useSaveProperties = (projectId, nodeId) => {

  const queryClient = useQueryClient();
  const updateNodeProps = async (properties) => {

    return await axios.put(`${BACKEND_BASE_URL}/project/tag/props`, {
      "project_id": projectId,
      "props": properties,
      "figma_node_id": nodeId
    });
  };

  const mutation = useMutation(updateNodeProps, {
    onSuccess: async () => {
      toast("saved properties");
      await queryClient.invalidateQueries(["fetchTags", projectId]);
      await queryClient.invalidateQueries(["fetchTag", projectId, nodeId]);
    },
    onError: errorHandler,
  });

  return mutation;
};

const useSaveStyling = (projectId, nodeId) => {

  const queryClient = useQueryClient();
  const updateNodeStyling = async (styling) => {

    return await axios.put(`${BACKEND_BASE_URL}/project/tag/style`, {
      "project_id": projectId,
      "style": styling,
      "figma_node_id": nodeId
    });
  };

  const mutation = useMutation(updateNodeStyling, {
    onSuccess: async () => {
      toast("saved styling");
      await queryClient.invalidateQueries(["fetchTags", projectId]);
      await queryClient.invalidateQueries(["fetchTag", projectId, nodeId]);
    },
    onError: errorHandler,
  });

  return mutation;
};


const useSaveAction = (projectId, nodeId) => {

  const queryClient = useQueryClient();
  const updateNodeStyling = async (action) => {

    return await axios.put(`${BACKEND_BASE_URL}/project/tag/actions`, {
      "project_id": projectId,
      "actions": action,
      "figma_node_id": nodeId
    });
  };

  const mutation = useMutation(updateNodeStyling, {
    onSuccess: async () => {
      toast("saved action");
      await queryClient.invalidateQueries(["fetchTags", projectId]);
      await queryClient.invalidateQueries(["fetchTag", projectId, nodeId]);
    },
    onError: errorHandler,
  });

  return mutation;
};


export { useTag, useTagNode, useSaveStyling, useSaveAction, useSaveProperties };