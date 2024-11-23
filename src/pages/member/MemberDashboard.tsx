import { BarChart3, Link2, TrendingUp, Users } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const MemberDashboard = () => {
  const { theme } = useContext(ThemeContext);

  const stats = [
    {
      name: "Total Earnings",
      value: "$0.00",
      icon: TrendingUp,
      change: "+0%",
      changeType: "positive",
    },
    {
      name: "Total Links",
      value: "0",
      icon: Link2,
      change: "+0",
      changeType: "positive",
    },
    {
      name: "Total Clicks",
      value: "0",
      icon: BarChart3,
      change: "+0",
      changeType: "neutral",
    },
    {
      name: "Referrals",
      value: "0",
      icon: Users,
      change: "+0",
      changeType: "positive",
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
                  {stat.change} from last month
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
          <div
            className={`p-4 rounded-lg ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-50"
            }`}
          >
            <p className="text-sm">No recent activity</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
