import { useContext } from "react";
import APIForm from "../../components/APIForm";
import APIList from "../../components/APIList";
import { ThemeContext } from "../../context/ThemeContext";
import type { ShortenerAPI } from "../../types/api";

const APIManager = () => {
  const { theme } = useContext(ThemeContext);

  const handleAddAPI = (api: ShortenerAPI) => {
    // TODO: Implement API addition
    console.log("Adding API:", api);
  };

  const handleDeleteAPI = (id: string) => {
    // TODO: Implement API deletion
    console.log("Deleting API:", id);
  };

  const handleToggleAPI = (id: string) => {
    // TODO: Implement API toggle
    console.log("Toggling API:", id);
  };

  return (
    <div>
      <div className="mb-8">
        <h1
          className={`text-2xl font-bold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          API Manager
        </h1>
        <p
          className={`mt-2 text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Manage your URL shortener API integrations
        </p>
      </div>

      <div className="space-y-6">
        <APIForm onSubmit={handleAddAPI} />
        <APIList
          apis={[]}
          onDelete={handleDeleteAPI}
          onToggle={handleToggleAPI}
        />
      </div>
    </div>
  );
};

export default APIManager;
