import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axios';
import { API_LOG_IN, API_SIGN_UP } from './baseUrl';

export const registerAccount = async (email: string, password: string, username: string, refCode : string) => {
  try {
    const response = await axiosInstance.post(API_SIGN_UP, { email, password,username, refCode}, { withCredentials: true });
    return response;
  } catch (error) {
    console.error('Registration error:', error);
    toast.error(getErrorMessage(error));
    return undefined;
  }
}

export const loginAccount = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post(API_LOG_IN, { username, password });
    return response;
  } catch (error) {
    console.error('Login error:', error);
    toast.error(getErrorMessage(error));
    return undefined;
  }
}

const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    // Handle API error responses
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    // Handle network errors
    if (error.message === 'Network Error') {
      return 'Connection failed. Please check your internet connection.';
    }
    // Handle timeout errors
    if (error.code === 'ECONNABORTED') {
      return 'Request timed out. Please try again.';
    }
  }
  // Generic fallback error message
  return 'An unexpected error occurred. Please try again later.';
};


