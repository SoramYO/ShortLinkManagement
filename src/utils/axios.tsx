import axios from "axios";
import { refreshTokens } from "../apis/authenticateApis";
import { API_BASE_URL } from "../apis/baseUrl";

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000 * 60 * 5, // 5 minutes
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only attempt refresh if status is 401 and we haven't tried refreshing yet
    if (error.response?.status === 410 && !originalRequest._retry) {
      if (isRefreshing) {
        // Wait for token refresh
        return new Promise((resolve) => {
          subscribeTokenRefresh((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await refreshTokens();
        const newToken = response?.data.accessToken;

        if (!newToken) {
          throw new Error("No access token received");
        }

        localStorage.setItem("accessToken", newToken);

        // Notify all subscribers and reset
        onTokenRefreshed(newToken);
        isRefreshing = false;

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        isRefreshing = false;
        // Only redirect to login if refresh token request fails
        localStorage.removeItem("accessToken"); // Clear invalid token
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    // If we get here, either:
    // 1. It's not a 401 error
    // 2. We already tried refreshing and it didn't work
    return Promise.reject(error);
  }
);

export default axiosInstance;
