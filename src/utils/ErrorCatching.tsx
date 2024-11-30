import { AxiosError } from "axios";

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    console.error(error?.response?.data.error.message);
    if (error?.response?.data.error.message) {
      return error.response.data.error.message;
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
