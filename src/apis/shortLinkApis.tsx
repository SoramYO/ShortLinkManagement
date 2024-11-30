import { toast } from "react-toastify";
import axiosInstance from "../utils/axios";
import { getErrorMessage } from "../utils/ErrorCatching";
import { API_LINKS } from "./baseUrl";

export const quickLink = async (url: string) => {
  try {
    const response = await axiosInstance.post(API_LINKS, { url });
    toast.success(response?.data.message);
    return response;
  } catch (error) {
    console.error("Quick link error:", error);
    toast.error(getErrorMessage(error));
    return undefined;
  }
};

export const getOriginalUrl = async (shortCode: string) => {
  try {
    const response = await axiosInstance.get(`${API_LINKS}/${shortCode}`);
    toast.success(response?.data.message);
    return response;
  } catch (error) {
    console.error("Get original link error:", error);
    toast.error(getErrorMessage(error));
    return undefined;
  }
};

export const getLinkList = async () => {
  try {
    const response = await axiosInstance.get(API_LINKS);
    return response;
  } catch (error) {
    console.error("Get link list error:", error);
    toast.error(getErrorMessage(error));
    return undefined;
  }
};
