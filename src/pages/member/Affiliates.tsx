import { Copy, TrendingUp, Users } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getReferralList } from "../../apis/referralsApis";
import { ThemeContext } from "../../context/ThemeContext";

interface Referral {
  user: {
    username: string;
    email: string;
  };
  joinedAt: string;
  earnings: {
    total: string;
    period: string;
  };
}

interface ReferralResponse {
  success: boolean;
  referrals: Referral[];
  stats: {
    totalCount: number;
    activeCount: number;
    totalEarnings: string;
    periodEarnings: string;
  };
  pagination: {
    total: number;
    page: number;
    totalPages: number;
  };
}

const Affiliates = () => {
  const { theme } = useContext(ThemeContext);
  const [referralData, setReferralData] = useState<ReferralResponse | null>(
    null
  );
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const referralLink = `${window.location.origin}/register/?ref=${user.username}`;

  useEffect(() => {
    fetchReferrals();
  }, []);

  const fetchReferrals = async () => {
    try {
      const response = await getReferralList();
      setReferralData(response?.data);
    } catch (error) {
      toast.error("Failed to fetch referral data");
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Referral link copied to clipboard");
  };

  return (
    <div>
      <div className="mb-8">
        <h1
          className={`text-2xl font-bold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Affiliate Program
        </h1>
        <p
          className={`mt-2 text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Earn 20% of your referrals' earnings for life
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Stats Cards */}
        <div
          className={`${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          } rounded-lg shadow-sm p-6`}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Total Referrals</h2>
            <Users className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold mt-2">
            {referralData?.stats.totalCount || 0}
          </p>
        </div>

        <div
          className={`${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          } rounded-lg shadow-sm p-6`}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Active Referrals</h2>
            <Users className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold mt-2">
            {referralData?.stats.activeCount || 0}
          </p>
        </div>

        <div
          className={`${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          } rounded-lg shadow-sm p-6`}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Referral Earnings</h2>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold mt-2">
            ${referralData?.stats.totalEarnings || "0.00"}
          </p>
        </div>
      </div>

      {/* Referral Link */}
      <div
        className={`${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } rounded-lg shadow-sm p-6 mb-8`}
      >
        <h2 className="text-lg font-semibold mb-4">Your Referral Link</h2>
        <div className="flex items-center space-x-4">
          <code
            className={`flex-1 px-4 py-2 rounded-lg ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            {referralLink}
          </code>
          <button
            onClick={() => handleCopy(referralLink)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Referral List */}
      <div
        className={`${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } rounded-lg shadow-sm p-6`}
      >
        <h2 className="text-lg font-semibold mb-4">Your Referrals</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Earnings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Your Commission
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {referralData && referralData.referrals.length > 0 ? (
                referralData.referrals.map((referral, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {referral.user.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {new Date(referral.joinedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      ${referral.earnings.total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      ${referral.earnings.period}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm"
                    colSpan={4}
                  >
                    No referrals yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Affiliates;
