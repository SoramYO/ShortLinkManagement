import { Copy } from "lucide-react";
import { useContext } from "react";
import { API_BASE_URL } from "../../apis/baseUrl";
import { ThemeContext } from "../../context/ThemeContext";

const DeveloperAPI = () => {
  const { theme } = useContext(ThemeContext);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div>
      <div className="mb-8">
        <h1
          className={`text-2xl font-bold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Developer API
        </h1>
        <p
          className={`mt-2 text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Integrate our URL shortening service into your applications
        </p>
      </div>

      <div className="space-y-8">
        {/* API Key Section */}
        <div
          className={`${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          } rounded-lg shadow-sm p-6`}
        >
          <h2 className="text-lg font-semibold mb-4">Your API Key</h2>
          <div className="flex items-center space-x-4">
            <code
              className={`px-4 py-2 rounded-lg ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              {user.apiKey}
            </code>
            <button
              onClick={() => handleCopy(user.apiKey)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* API Documentation */}
        <div
          className={`${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          } rounded-lg shadow-sm p-6`}
        >
          <h2 className="text-lg font-semibold mb-4">API Documentation</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-md font-medium mb-2">Endpoint</h3>
              <code
                className={`block px-4 py-2 rounded-lg ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                POST {API_BASE_URL}/shorten
              </code>
            </div>

            <div>
              <h3 className="text-md font-medium mb-2">Request Format</h3>
              <pre
                className={`p-4 rounded-lg ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                {JSON.stringify(
                  {
                    api_key: user.apiKey,
                    url: "https://example.com",
                  },
                  null,
                  2
                )}
              </pre>
            </div>

            <div>
              <h3 className="text-md font-medium mb-2">Response Format</h3>
              <pre
                className={`p-4 rounded-lg ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                {JSON.stringify(
                  {
                    success: true,
                    short_url: "https://short.url/abc123",
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperAPI;
