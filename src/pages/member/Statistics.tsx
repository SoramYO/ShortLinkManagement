import { BarChart3, TrendingUp } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ThemeContext } from "../../context/ThemeContext";
import { getStatistics } from "../../apis/dashBoardApis";

interface StatisticsData {
  overview: {
    dates: string[];
    clicks: number[];
    earnings: number[];
  };
  demographics: {
    countries: [string, number][];
    devices: [string, number][];
    browsers: [string, number][];
  };
  totals: {
    clicks: number;
    earnings: string;
  };
}

const Statistics = () => {
  const { theme } = useContext(ThemeContext);
  const [statisticsData, setStatisticsData] = useState<StatisticsData | null>(
    null
  );

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await getStatistics();
      setStatisticsData(response?.data.data);
    } catch (error) {
      toast.error("Failed to fetch Statistics data");
    }
  };

  const charts = [
    {
      title: "Earnings Overview",
      icon: TrendingUp,
      data: statisticsData?.overview.earnings.map((earning, index) => ({
        date: statisticsData.overview.dates[index],
        earnings: earning,
      })),
      dataKey: "earnings",
    },
    {
      title: "Traffic Overview",
      icon: BarChart3,
      data: statisticsData?.overview.clicks.map((click, index) => ({
        date: statisticsData.overview.dates[index],
        clicks: click,
      })),
      dataKey: "clicks",
    },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

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
              <div className="h-64">
                {chart.data ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chart.data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey={chart.dataKey} fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div
                    className={`h-full flex items-center justify-center ${
                      theme === "dark" ? "bg-gray-700" : "bg-gray-50"
                    } rounded-lg`}
                  >
                    <p className="text-sm text-gray-500">Loading data...</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {statisticsData &&
          ["countries", "devices", "browsers"].map((demographic) => (
            <div
              key={demographic}
              className={`${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              } p-6 rounded-lg shadow-sm`}
            >
              <h2 className="text-lg font-semibold mb-4 capitalize">
                {demographic}
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={
                        statisticsData.demographics[
                          demographic as keyof typeof statisticsData.demographics
                        ]
                      }
                      dataKey="1"
                      nameKey="0"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {statisticsData.demographics[
                        demographic as keyof typeof statisticsData.demographics
                      ].map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
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
              {statisticsData ? (
                statisticsData.overview.dates.map((date, index) => (
                  <tr key={date}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {statisticsData.overview.clicks[index]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      ${statisticsData.overview.earnings[index].toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm"
                    colSpan={3}
                  >
                    Loading data...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Totals */}
      <div
        className={`mt-8 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } rounded-lg shadow-sm p-6`}
      >
        <h2 className="text-lg font-semibold mb-4">Totals</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Total Clicks</p>
            <p className="text-2xl font-bold">
              {statisticsData?.totals.clicks}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Earnings</p>
            <p className="text-2xl font-bold">
              ${statisticsData?.totals.earnings}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
