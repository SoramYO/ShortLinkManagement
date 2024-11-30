import { useEffect } from "react";
import { useLoading } from "../context/LoadingContext";
import axiosInstance from "../utils/axios";

const useAxiosInterceptors = () => {
  const { setLoading } = useLoading();

  useEffect(() => {
    const requestId = axiosInstance.interceptors.request.use(
      (config) => {
        setLoading(true);
        return config;
      },
      (error) => {
        setLoading(false);
        return Promise.reject(error);
      }
    );

    const responseId = axiosInstance.interceptors.response.use(
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
      axiosInstance.interceptors.request.eject(requestId);
      axiosInstance.interceptors.response.eject(responseId);
    };
  }, [setLoading]);
};

export default useAxiosInterceptors;
