import { BarChart3, Gift, Link2, LogOut, Settings, Users } from "lucide-react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/useAuth";

const MemberLayout = () => {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const navigation = [
    {
      name: "Dashboard",
      icon: BarChart3,
      href: "/member/dashboard",
    },
    {
      name: "Statistics",
      icon: BarChart3,
      href: "/member/statistics",
    },
    {
      name: "API Manager",
      icon: Settings,
      href: "/member/api-manager",
    },
    {
      name: "Links",
      icon: Link2,
      href: "/member/links",
    },
    {
      name: "Quick Link",
      icon: Link2,
      href: "/member/quick-link",
    },
    {
      name: "Mass Shrinker",
      icon: Link2,
      href: "/member/mass-shrinker",
    },
    {
      name: "Developer API",
      icon: Settings,
      href: "/member/developer-api",
    },
    {
      name: "Withdraw",
      icon: Gift,
      href: "/member/withdraw",
    },
    {
      name: "Affiliates",
      icon: Users,
      href: "/member/affiliates",
    },
  ];

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100"
      }`}
    >
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-blue-600 text-white">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 bg-blue-700">
            <Link to="/member/dashboard" className="text-xl font-bold">
              LinkShortener
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-6 py-3 text-sm font-medium ${
                    location.pathname === item.href
                      ? "bg-blue-700"
                      : "hover:bg-blue-700"
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        {/* Header */}
        <header
          className={`h-16 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          } shadow-sm flex items-center px-6`}
        >
          <div className="flex-1"></div>
          <div className="flex items-center space-x-4">
            <Link to="/member/profile">
              <div className="h-8 w-8 rounded-full bg-gray-200"></div>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MemberLayout;
