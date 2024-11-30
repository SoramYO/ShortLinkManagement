import { toast } from "react-toastify";
import axiosInstance from "../utils/axios";
import { API_PROFILE } from "./baseUrl";
import { getErrorMessage } from "../utils/ErrorCatching";
interface BankAccount {
    bankName: string;
    accountNumber: string;
    accountName: string;
  }
  
  export const getUserProfile = async () => {
    try {
      const response = await axiosInstance.get(API_PROFILE + "/info");
      return response;
    } catch (error) {
      console.error("Get user profile error:", error);
      toast.error(getErrorMessage(error));
      return undefined;
    }
  };

export const addBank = async (bankAccounts: BankAccount[]) => {
    try {
      const response = await axiosInstance.post(API_PROFILE + "/addbank", bankAccounts);
      return response;
    } catch (error) {
      console.error("Add bank error:", error);
      toast.error(getErrorMessage(error));
      return undefined;
    }
};

export const removeBank = async (bankId: string) => {
    try {
      const response = await axiosInstance.delete(`${API_PROFILE}/removebank/${bankId}`);
      return response;
    } catch (error) {
      console.error("Remove bank error:", error);
      toast.error(getErrorMessage(error));
      return undefined;
    }
};