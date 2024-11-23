import {
  BarChart3,
  Gift,
  Globe,
  Link2,
  LogOut,
  MessageSquare,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/useAuth";

const AdminLayout = () => {
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
      href: "/admin/dashboard",
    },
    {
      name: "Campaigns",
      icon: Globe,
      children: [
        { name: "Create Campaign", href: "/admin/campaigns/create" },
        { name: "Campaign List", href: "/admin/campaigns" },
      ],
    },
    {
      name: "Users",
      icon: Users,
      href: "/admin/users",
    },
    {
      name: "Withdrawals",
      icon: Gift,
      href: "/admin/withdrawals",
    },
    {
      name: "Pages",
      icon: Globe,
      href: "/admin/pages",
    },
    {
      name: "OTP",
      icon: MessageSquare,
      href: "/admin/otp",
    },
    {
      name: "Notifications",
      icon: MessageSquare,
      href: "/admin/notifications",
    },
    {
      name: "Links",
      icon: Link2,
      href: "/admin/links",
    },
    {
      name: "IP Manager",
      icon: Globe,
      href: "/admin/ip-manager",
    },
    {
      name: "Promo Codes",
      icon: Gift,
      href: "/admin/promo-codes",
    },
    {
      name: "Gift Codes",
      icon: Gift,
      href: "/admin/gift-codes",
    },
    {
      name: "Orders",
      icon: ShoppingCart,
      href: "/admin/orders",
    },
    {
      name: "Support",
      icon: MessageSquare,
      href: "/admin/support",
    },
    {
      name: "Forum",
      icon: MessageSquare,
      children: [
        { name: "Topics", href: "/admin/forum/topics" },
        { name: "Categories", href: "/admin/forum/categories" },
      ],
    },
    {
      name: "Settings",
      icon: Settings,
      href: "/admin/settings",
    },
  ];

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100"
      }`}
    >
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-800 text-white">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 bg-gray-900">
            <Link to="/admin/dashboard" className="text-xl font-bold">
              Admin Panel
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              if (item.children) {
                return (
                  <div key={item.name}>
                    <div className="px-6 py-3 text-sm font-medium text-gray-400">
                      <Icon className="h-5 w-5 inline-block mr-3" />
                      {item.name}
                    </div>
                    <div className="ml-8">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.href}
                          className={`flex items-center px-6 py-2 text-sm font-medium ${
                            location.pathname === child.href
                              ? "text-blue-500"
                              : "text-gray-300 hover:text-white"
                          }`}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-6 py-3 text-sm font-medium ${
                    location.pathname === item.href
                      ? "bg-gray-900 text-blue-500"
                      : "text-gray-300 hover:text-white hover:bg-gray-700"
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
            <div className="h-8 w-8 rounded-full bg-gray-200"></div>
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

export default AdminLayout;
