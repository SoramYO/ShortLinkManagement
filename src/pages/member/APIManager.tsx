import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createShortenerAPI,
  deleteShortenerAPI,
  getShortenerAPIs,
  toggleShortenerAPI,
  updateShortenerAPI,
} from "../../apis/shoternerApis";
import APIForm from "../../components/APIForm";
import APIList from "../../components/APIList";
import { ThemeContext } from "../../context/ThemeContext";
import type { ShortenerAPI, ShortenerAPIResponse } from "../../types/api";

const APIManager = () => {
  const { theme } = useContext(ThemeContext);
  const [apis, setApis] = useState<ShortenerAPIResponse[]>([]);

  useEffect(() => {
    fetchAPIs();
  }, []);

  const fetchAPIs = async () => {

    try {
      const response = await getShortenerAPIs();
      setApis(response?.data.shortenerAPIs || []);
    } catch (error) {
      toast.error("Failed to fetch API list");
    }
  };

  const handleAddAPI = async (api: ShortenerAPI) => {
    try {
      const response = await createShortenerAPI(api);
      toast.success(response?.data.message);
      fetchAPIs();
    } catch (error) {
      toast.error("Failed to create API");
    }
  };

  const handleDeleteAPI = async (id: string) => {
    try {
      const response= await deleteShortenerAPI(id);
      toast.success(response?.data.message);
      toast.success("API deleted successfully");
      fetchAPIs();
    } catch (error) {
      toast.error("Failed to delete API");
    }
  };

  const handleToggleAPI = async (id: string) => {
    try {
      const response = await toggleShortenerAPI(id);
      toast.success(response?.data.message);
      fetchAPIs();
    } catch (error) {
      toast.error("Failed to toggle API status");
    }
  };

  const handleEditAPI = async (
    id: string,
    updatedData: Partial<ShortenerAPIResponse>
  ) => {
    try {
      await updateShortenerAPI({
        _id: id,
        name: updatedData.name || "",
        endpoint: updatedData.endpoint || "",
        maxViewsPerIP: updatedData.maxViewsPerIP || 0,
        priority: updatedData.priority || 0,
        content: updatedData.content || "",
        schedule: updatedData.schedule || {
          enabled: false,
          startTime: "00:00",
          endTime: "23:59",
        },
        applicableCountries: updatedData.applicableCountries || [],
        isActive: updatedData.isActive || false,
      });
      toast.success("API updated successfully");
      fetchAPIs();
    } catch (error) {
      toast.error("Failed to update API");
    }
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">API Manager</h1>
            <p
              className={`mt-2 text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Manage your URL shortener API integrations
            </p>
          </div>

          <div className="space-y-8">
            <div
              className={`bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg`}
            >
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
                  Add New API
                </h2>
                <APIForm onSubmit={handleAddAPI} />
              </div>
            </div>

            <div
              className={`bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg`}
            >
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
                  API List
                </h2>
                <APIList
                  apis={apis}
                  onDelete={handleDeleteAPI}
                  onToggle={handleToggleAPI}
                  onEdit={handleEditAPI}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIManager;
