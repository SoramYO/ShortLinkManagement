import { DollarSign } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createWithdrawal, getWithdrawalInfo } from "../../apis/withdrawalApis";
import { ThemeContext } from "../../context/ThemeContext";

interface WithdrawalInfo {
  success: boolean;
  data: {
    availableBalance: number;
    paymentMethods: PaymentMethod[];
    minWithdrawalAmount: number;
    recentWithdrawals: RecentWithdrawal[];
  };
}

interface PaymentMethod {
  bankName: string;
  accountNumber: string;
  accountName: string;
}

interface RecentWithdrawal {
  date: string;
  amount: number;
  method: string;
  status: string;
  processedDate: string | null;
  adminNote: string | null;
}

const Withdraw = () => {
  const { theme } = useContext(ThemeContext);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
  const [withdrawalInfo, setWithdrawalInfo] = useState<WithdrawalInfo | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWithdrawalInfo();
  }, []);

  const fetchWithdrawalInfo = async () => {
    try {
      const response = await getWithdrawalInfo();
      setWithdrawalInfo(response?.data);
    } catch (error) {
      console.error("Error fetching withdrawal info:", error);
      toast.error("Failed to fetch withdrawal information");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await createWithdrawal(
      parseFloat(amount),
      method
    );

    try {
      toast.success("Withdrawal request submitted successfully");
      fetchWithdrawalInfo(); // Refresh data
      setAmount("");
      setMethod("");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to submit withdrawal request"
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "text-green-500";
      case "pending":
        return "text-yellow-500";
      case "rejected":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1
          className={`text-2xl font-bold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Withdraw
        </h1>
        <p
          className={`mt-2 text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Withdraw your earnings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Balance Card */}
        <div
          className={`${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          } rounded-lg shadow-sm p-6`}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Available Balance</h2>
            <DollarSign className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold mt-2">
            ${withdrawalInfo?.data.availableBalance.toFixed(2) || "0.00"}
          </p>
          <p
            className={`text-sm mt-2 ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Minimum withdrawal: ${withdrawalInfo?.data.minWithdrawalAmount}
          </p>
        </div>

        {/* Withdrawal Form */}
        <div
          className={`${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          } rounded-lg shadow-sm p-6 md:col-span-2`}
        >
          <h2 className="text-lg font-semibold mb-4">Request Withdrawal</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium mb-2"
              >
                Amount
              </label>
              <input
                type="number"
                id="amount"
                min={withdrawalInfo?.data.minWithdrawalAmount || 0}
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300"
                }`}
                required
              />
            </div>

            <div>
              <label
                htmlFor="method"
                className="block text-sm font-medium mb-2"
              >
                Payment Method
              </label>
              <select
                id="method"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300"
                }`}
                required
              >
                <option value="">Select payment method</option>
                {withdrawalInfo?.data.paymentMethods.map((method, index) => (
                  <option key={index} value={method.bankName}>
                    {method.bankName} - {method.accountNumber}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? "Processing..." : "Request Withdrawal"}
            </button>
          </form>
        </div>

        {/* Withdrawal History */}
        <div
          className={`${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          } rounded-lg shadow-sm p-6 md:col-span-3`}
        >
          <h2 className="text-lg font-semibold mb-4">Recent Withdrawals</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Processed Date
                  </th>
                  {}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reason
                  </th>

                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {withdrawalInfo?.data.recentWithdrawals.length ? (
                  withdrawalInfo.data.recentWithdrawals.map(
                    (withdrawal, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {withdrawal.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          ${withdrawal.amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {withdrawal.method}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm ${getStatusColor(
                            withdrawal.status
                          )}`}
                        >
                          {withdrawal.status}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {withdrawal.processedDate || "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {withdrawal.adminNote || "-"}
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm"
                      colSpan={5}
                    >
                      No withdrawal history
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
