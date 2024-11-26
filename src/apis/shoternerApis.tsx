import { toast } from "react-toastify";
import { ShortenerAPI } from "../types/api";
import axiosInstance from "../utils/axios";
import { getErrorMessage } from "../utils/ErrorCatching";
import { API_SHORTEN_LINK_API } from "./baseUrl";

export const createShortenerAPI = async (api: ShortenerAPI) => {
  try {
    const response = await axiosInstance.post(API_SHORTEN_LINK_API, { api });
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
    return response;
  } catch (error) {
    console.error("Get original link error:", error);
    toast.error(getErrorMessage(error));
    return undefined;
  }
};

export const deleteShortenerAPI = async (id: string) => {
  return axiosInstance.delete(`${API_SHORTEN_LINK_API}/shortener-apis/${id}`);
};

export const toggleShortenerAPI = async (id: string) => {
  return axiosInstance.patch(
    `${API_SHORTEN_LINK_API}/shortener-apis/${id}/toggle`
  );
};
