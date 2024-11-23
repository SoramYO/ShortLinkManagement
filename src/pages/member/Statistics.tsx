import { BarChart3, TrendingUp } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Statistics = () => {
  const { theme } = useContext(ThemeContext);

  const charts = [
    {
      title: "Earnings Overview",
      icon: TrendingUp,
    },
    {
      title: "Traffic Overview",
      icon: BarChart3,
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1
          className={`text-2xl font-bold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Statistics
        </h1>
        <p
          className={`mt-2 text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Detailed analytics and statistics for your account.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {charts.map((chart) => {
          const Icon = chart.icon;
          return (
            <div
              key={chart.title}
              className={`${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              } p-6 rounded-lg shadow-sm`}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">{chart.title}</h2>
                <Icon className="h-5 w-5 text-blue-500" />
              </div>
              <div
                className={`h-64 flex items-center justify-center ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-50"
                } rounded-lg`}
              >
                <p className="text-sm text-gray-500">No data available</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Stats */}
      <div
        className={`mt-8 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } rounded-lg shadow-sm p-6`}
      >
        <h2 className="text-lg font-semibold mb-4">Detailed Statistics</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clicks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Earnings
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  No data available
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">-</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
