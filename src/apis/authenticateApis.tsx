import { toast } from "react-toastify";
import axiosInstance from "../utils/axios";
import { getErrorMessage } from "../utils/ErrorCatching";
import { API_LOG_IN, API_SIGN_UP } from "./baseUrl";

export const registerAccount = async (
  email: string,
  password: string,
  username: string,
  refCode: string
) => {
  try {
    const response = await axiosInstance.post(API_SIGN_UP, {
      email,
      password,
      username,
      refCode,
    });
    return response;
  } catch (error) {
    console.error("Registration error:", error);
    toast.error(getErrorMessage(error));
    return undefined;
  }
};

export const loginAccount = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post(API_LOG_IN, {
      username,
      password,
    });
    return response;
  } catch (error) {
    console.error("Login error:", error);
    toast.error(getErrorMessage(error));
    return undefined;
  }
};
