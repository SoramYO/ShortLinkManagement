// src/hooks/useAxiosInterceptors.tsx
import { useEffect } from "react";
import { useLoading } from "../context/LoadingContext";
import axiosInstance from "../utils/axios";

const useAxiosInterceptors = () => {
  const { setLoading } = useLoading();

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        setLoading(true);
        return config;
      },
      (error) => {
        setLoading(false);
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        setLoading(false);
        return response;
      },
      (error) => {
        setLoading(false);
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [setLoading]);
};

export default useAxiosInterceptors;
