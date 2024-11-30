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
    toast.success(response?.data.message);
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
    toast.success(response.data.message);
    return response;
  } catch (error) {
    console.error("Login error:", error);
    toast.error(getErrorMessage(error));
    return undefined;
  }
};

export const logoutAccount = async () => {
  try {
    await axiosInstance.post("/auth/logout");
    return true;
  } catch (error) {
    console.error("Logout error:", error);
    toast.error(getErrorMessage(error));
    return false;
  }
};

export const refreshTokens = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await axiosInstance.post("/auth/refresh-token", {
      refreshToken,
    });
    localStorage.setItem("accessToken", response.data.accessToken);
    return response;
  } catch (error) {
    console.error("Refresh token error:", error);
    toast.error(getErrorMessage(error));
    return undefined;
  }
};
