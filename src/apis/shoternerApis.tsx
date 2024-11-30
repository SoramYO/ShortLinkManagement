import { toast } from "react-toastify";
import { ShortenerAPI, ShortenerAPIResponse } from "../types/api";
import axiosInstance from "../utils/axios";
import { getErrorMessage } from "../utils/ErrorCatching";
import { API_SHORTEN_LINK_API } from "./baseUrl";

export const createShortenerAPI = async (api: ShortenerAPI) => {
  try {
    const response = await axiosInstance.post(API_SHORTEN_LINK_API, { api });
    toast.success(response.data.message);
    return response;
  } catch (error) {
    console.error("Quick link error:", error);
    toast.error(getErrorMessage(error));
    return undefined;
  }
};

export const getShortenerAPIs = async () => {
  try {
    const response = await axiosInstance.get(API_SHORTEN_LINK_API);
    toast.success(response?.data.message);
    return response;
  } catch (error) {
    console.error("Get original link error:", error);
    toast.error(getErrorMessage(error));
    return undefined;
  }
};

export const deleteShortenerAPI = async (id: string) => {
  try {
    const response = await axiosInstance.delete(
      `${API_SHORTEN_LINK_API}/${id}`
    );
    toast.success(response.data.message);
    return response;
  } catch (error) {
    console.error("Delete original link error:", error);
    toast.error(getErrorMessage(error));
    return undefined;
  }
};

export const toggleShortenerAPI = async (id: string) => {
  try {
    const response = await axiosInstance.patch(
      `${API_SHORTEN_LINK_API}/${id}/toggle`
    );
    toast.success(response.data.message);
    return response;
  } catch (error) {
    console.error("Toggle original link error:", error);
    toast.error(getErrorMessage(error));
    return undefined;
  }
};

export const updateShortenerAPI = async (api: ShortenerAPIResponse) => {
  try {
    const response = await axiosInstance.put(
      `${API_SHORTEN_LINK_API}/${api._id}`,
      { api }
    );
    toast.success(response.data.message);
    return response;
  } catch (error) {
    console.error("Update original link error:", error);
    toast.error(getErrorMessage(error));
    return undefined;
  }
};
