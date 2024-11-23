import { Eye, EyeOff } from "lucide-react";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const LinkHistory = () => {
  const { theme } = useContext(ThemeContext);
  const [showHidden, setShowHidden] = useState(false);

  return (
    <div>
      <div className="mb-8">
        <h1
          className={`text-2xl font-bold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Link History
        </h1>
        <p
          className={`mt-2 text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          View and manage your shortened links
        </p>
      </div>

      <div className="flex justify-between mb-6">
        <button
          onClick={() => setShowHidden(!showHidden)}
          className={`flex items-center px-4 py-2 rounded-lg ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          } shadow-sm`}
        >
          {showHidden ? (
            <>
              <EyeOff className="h-4 w-4 mr-2" />
              Hide Hidden Links
            </>
          ) : (
            <>
              <Eye className="h-4 w-4 mr-2" />
              Show Hidden Links
            </>
          )}
        </button>
      </div>

      <div
        className={`${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } rounded-lg shadow-sm`}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Short URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Original URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clicks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm" colSpan={5}>
                  No links found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LinkHistory;
