import { toast } from "react-toastify";
import axiosInstance from "../utils/axios";
import { getErrorMessage } from "../utils/ErrorCatching";
import { API_ADMINS, API_WITHDRAWALS } from "./baseUrl";

export const getWithdrawalInfo = async () => {
  try {
    const response = await axiosInstance.get(`${API_WITHDRAWALS}/info`);
    toast.success(response.data.message);
    return response;
  } catch (error) {
    console.error("Toggle original link error:", error);
    toast.error(getErrorMessage(error));
    return undefined;
  }
};

export const createWithdrawal = async (amount: number, paymentMethod: string) => {
  try {
    const response = await axiosInstance.post(`${API_WITHDRAWALS}`, {
      amount,
      paymentMethod,
    });
    toast.success(response.data.message);
    return response;
  } catch (error) {
    console.error("Toggle original link error:", error);
    toast.error(getErrorMessage(error));
    return undefined;
  }
};

export const getWithdrawals = async () => {
  try {
    const response = await axiosInstance.get(`${API_ADMINS}${API_WITHDRAWALS}`);
    toast.success(response.data.message);
    return response;
  } catch (error) {
    console.error("Toggle original link error:", error);
    toast.error(getErrorMessage(error));
    return undefined;
  }
};

export const updateWithdrawalStatus = async (id: string, status: string, note: string) => {
  try {
    const response = await axiosInstance.put(`${API_ADMINS}${API_WITHDRAWALS}/${id}/status`, {
      status,
      note
    });
    toast.success(response.data.message);
    return response;
  } catch (error) {
    console.error("Toggle original link error:", error);
    toast.error(getErrorMessage(error));
    return undefined;
  }
};