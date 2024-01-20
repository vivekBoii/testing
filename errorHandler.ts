import { toast } from "../handlers/PluginEventHandler";

export const errorHandler = (error) => {
  const err = error as any;
  const errorMessage =
    err?.response?.data?.error?.message ||
    err.messsage ||
    String(err);
  toast(errorMessage);
};