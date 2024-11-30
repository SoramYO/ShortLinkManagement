import { toast } from "react-toastify";
import axiosInstance from "../utils/axios";
import { getErrorMessage } from "../utils/ErrorCatching";
import { API_DASHBOARD_URL, API_STATISTICS } from "./baseUrl";

export const getDashBoard = async () => {
  try {
    const response = await axiosInstance.get(API_DASHBOARD_URL);
    toast.success(response?.data.message);
    return response;
  } catch (error) {
    console.error("Quick link error:", error);
    toast.error(getErrorMessage(error));
    return undefined;
  }
};

export const getStatistics = async () => {
  try {
    const response = await axiosInstance.get(API_STATISTICS);
    return response;
  } catch (error) {
    console.error("Quick link error:", error);
    toast.error(getErrorMessage(error));
    return undefined;
  }
};
