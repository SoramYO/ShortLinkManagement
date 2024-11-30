import { toast } from "react-toastify";
import axiosInstance from "../utils/axios";
import { getErrorMessage } from "../utils/ErrorCatching";
import { API_REFERRALS } from "./baseUrl";

export const getReferralList = async () => {
  try {
    const response = await axiosInstance.get(API_REFERRALS);
    return response;
  } catch (error) {
    console.error("Quick link error:", error);
    toast.error(getErrorMessage(error));
    return undefined;
  }
};
