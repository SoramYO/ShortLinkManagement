import { useContext, useCallback, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import BankAccounts from "../../components/Profile/BankAccounts";
import PasswordUpdate from "../../components/Profile/PasswordUpdate";
import { FaUser, FaWallet, FaClock, FaKey } from "react-icons/fa";
import { getUserProfile } from "../../apis/profileApis";
import { User } from "../../models/AuthenticateUser";

const UserProfile = () => {
  const { theme } = useContext(ThemeContext);
  const [user, setUser] = useState<User | null>(null);

  const fetchUserInfo = async () => {
    try {
      const response = await getUserProfile();
      setUser(response?.data.user);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"} p-6`}>
      <div className={`max-w-4xl mx-auto ${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-lg shadow-lg`}>
        {/* Header Section */}
        <div className={`p-6 border-b ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-full ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
              <FaUser className={`w-6 h-6 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`} />
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                {user?.username}'s Profile
              </h1>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 p-6 border-b ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
          <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-50"}`}>
            <div className="flex items-center space-x-3">
              <FaWallet className={theme === "dark" ? "text-blue-400" : "text-blue-500"} />
              <div>
                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Balance</p>
                <p className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                  ${user?.balance}
                </p>
              </div>
            </div>
          </div>
          <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-50"}`}>
            <div className="flex items-center space-x-3">
              <FaKey className={theme === "dark" ? "text-green-400" : "text-green-500"} />
              <div>
                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>API Key</p>
                <p className={`text-sm font-mono ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                  {user?.apiKey}
                </p>
              </div>
            </div>
          </div>
          <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-50"}`}>
            <div className="flex items-center space-x-3">
              <FaClock className={theme === "dark" ? "text-purple-400" : "text-purple-500"} />
              <div>
                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Last Login</p>
                <p className={`text-sm ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                  {user?.lastLoginAt ? formatDate(user.lastLoginAt) : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          <section className={`p-6 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-50"}`}>
            <h2 className={`text-xl font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
              Payment Methods
            </h2>
            <BankAccounts accounts={user?.payment || []} onUpdate={fetchUserInfo} />
          </section>

          <section className={`p-6 rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-gray-50"}`}>
            <h2 className={`text-xl font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
              Security
            </h2>
            <PasswordUpdate />
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;