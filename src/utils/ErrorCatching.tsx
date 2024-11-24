import { AxiosError } from "axios";

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    if (error.message === "Network Error") {
      return "Connection failed. Please check your internet connection.";
    }
    if (error.code === "ECONNABORTED") {
      return "Request timed out. Please try again.";
    }
  }
  return "An unexpected error occurred. Please try again later.";
};
