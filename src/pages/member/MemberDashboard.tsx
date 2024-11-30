import { DollarSign, Link, MousePointer, Users } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getDashBoard } from "../../apis/dashBoardApis";
import { ThemeContext } from "../../context/ThemeContext";

interface Stat {
  name: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  change: string;
  changeType: "positive" | "negative" | "neutral";
}

interface RecentActivity {
  shortCode: string;
  originalUrl: string;
  stats: {
    totalViews: number;
  };
  createdAt: string;
}

interface DashboardData {
  stats: {
    earnings: { value: string; change: string; changeType: string };
    links: { value: number; change: string; changeType: string };
    clicks: { value: number; change: string; changeType: string };
    referrals: { value: number; change: string; changeType: string };
  };
  recentActivity: RecentActivity[];
}

const MemberDashboard = () => {
  const { theme } = useContext(ThemeContext);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await getDashBoard();
      setDashboardData(response?.data);
    } catch (error) {
      toast.error("Failed to fetch dashboard data");
    }
  };

  const stats: Stat[] = dashboardData
    ? [
        {
          name: "Earnings",
          value: `$${dashboardData?.stats.earnings.value}`,
          icon: DollarSign,
          change: dashboardData.stats.earnings.change,
          changeType: dashboardData.stats.earnings.changeType as
            | "positive"
            | "negative"
            | "neutral",
        },
        {
          name: "Links",
          value: dashboardData.stats.links.value,
          icon: Link,
          change: dashboardData.stats.links.change,
          changeType: dashboardData.stats.links.changeType as
            | "positive"
            | "negative"
            | "neutral",
        },
        {
          name: "Clicks",
          value: dashboardData.stats.clicks.value,
          icon: MousePointer,
          change: dashboardData.stats.clicks.change,
          changeType: dashboardData.stats.clicks.changeType as
            | "positive"
            | "negative"
            | "neutral",
        },
        {
          name: "Referrals",
          value: dashboardData.stats.referrals.value,
          icon: Users,
          change: dashboardData.stats.referrals.change,
          changeType: dashboardData.stats.referrals.changeType as
            | "positive"
            | "negative"
            | "neutral",
        },
      ]
    : [];

  return (
    <div>
      <div className="mb-8">
        <h1
          className={`text-2xl font-bold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Dashboard
        </h1>
        <p
          className={`mt-2 text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Welcome back! Here's an overview of your account.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className={`${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              } p-6 rounded-lg shadow-sm`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-sm font-medium ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {stat.name}
                  </p>
                  <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
                </div>
                <div
                  className={`p-3 rounded-full ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <Icon className="h-6 w-6 text-blue-500" />
                </div>
              </div>
              <div className="mt-4">
                <span
                  className={`text-sm font-medium ${
                    stat.changeType === "positive"
                      ? "text-green-500"
                      : stat.changeType === "negative"
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {stat.change}% from last month
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div
        className={`${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } rounded-lg shadow-sm p-6`}
      >
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {dashboardData && dashboardData.recentActivity.length > 0 ? (
            dashboardData.recentActivity.map((activity) => (
              <div
                key={activity.shortCode}
                className={`p-4 rounded-lg ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-50"
                }`}
              >
                <p className="text-sm">
                  <span className="font-medium">Short Code:</span>{" "}
                  {activity.shortCode}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Original URL:</span>{" "}
                  <a
                    href={activity.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {activity.originalUrl}
                  </a>
                </p>
                <p className="text-sm">
                  <span className="font-medium">Total Views:</span>{" "}
                  {activity.stats.totalViews}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Created At:</span>{" "}
                  {new Date(activity.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <div
              className={`p-4 rounded-lg ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-50"
              }`}
            >
              <p className="text-sm">No recent activity</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
