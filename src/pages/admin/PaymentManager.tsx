import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { getWithdrawals, updateWithdrawalStatus } from "../../apis/withdrawalApis";

interface WithdrawalType {
  _id: string;
  user: {
    username: string;
    email: string;
  };
  amount: number;
  paymentMethod: string;
  status: string;
  requestedAt: string;
  accountDetails: {
    accountNumber: string;
    accountName: string;
    bankName: string;
  };
}

const PaymentManager = () => {
  const { theme } = useContext(ThemeContext);
  const [withdrawals, setWithdrawals] = useState<WithdrawalType[]>([]);
const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
const [selectedWithdrawal, setSelectedWithdrawal] = useState<string>("");
const [rejectionNote, setRejectionNote] = useState("");
  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const response = await getWithdrawals();
        setWithdrawals(response?.data.withdrawals || []);
      } catch (error) {
        console.error("Error fetching withdrawals:", error);
      }
    };

    fetchWithdrawals();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      const response = await updateWithdrawalStatus(id, "approved", "");
      if (response) {
        setWithdrawals((prevWithdrawals) =>
          prevWithdrawals.map((withdrawal) =>
            withdrawal._id === id ? { ...withdrawal, status: "approved" } : withdrawal
          )
        );
      }
    } catch (error) {
      console.error("Error approving withdrawal:", error);
    }
  };

  const handlePaid = async (id: string) => {
    try {
      const response = await updateWithdrawalStatus(id, "paid", "");
      if (response) {
        setWithdrawals((prevWithdrawals) =>
          prevWithdrawals.map((withdrawal) =>
            withdrawal._id === id ? { ...withdrawal, status: "paid" } : withdrawal
          )
        );
      }
    } catch (error) {
      console.error("Error marking withdrawal as paid:", error);
    }
  };

  const handleReject = async (id: string) => {
    setSelectedWithdrawal(id);
    setIsRejectModalOpen(true);
  };
  const handleConfirmReject = async () => {
    try {
      const response = await updateWithdrawalStatus(selectedWithdrawal, "rejected", rejectionNote);
      if (response) {
        setWithdrawals((prevWithdrawals) =>
          prevWithdrawals.map((withdrawal) =>
            withdrawal._id === selectedWithdrawal ? { ...withdrawal, status: "rejected" } : withdrawal
          )
        );
        setIsRejectModalOpen(false);
        setRejectionNote("");
        setSelectedWithdrawal("");
      }
    } catch (error) {
      console.error("Error rejecting withdrawal:", error);
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
          Payment Management
        </h1>
        <p
          className={`mt-2 text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Manage withdrawal requests
        </p>
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
                  User
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
                  Requested
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {withdrawals.length === 0 ? (
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm" colSpan={6}>
                    No withdrawal requests
                  </td>
                </tr>
              ) : (
                withdrawals.map((withdrawal) => (
                  <tr key={withdrawal._id}>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                      theme === "dark" ? "text-gray-300" : "text-gray-900"
                    }`}>
                      <div>
                        <div className="font-medium">{withdrawal.user.username}</div>
                        <div className="text-gray-500">{withdrawal.user.email}</div>
                      </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                      theme === "dark" ? "text-gray-300" : "text-gray-900"
                    }`}>
                      {withdrawal.amount.toLocaleString()} VND
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                      theme === "dark" ? "text-gray-300" : "text-gray-900"
                    }`}>
                      <div>
                        <div>{withdrawal.accountDetails.bankName}</div>
                        <div className="text-gray-500">
                          {withdrawal.accountDetails.accountNumber} - {withdrawal.accountDetails.accountName}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${withdrawal.status === 'Pending' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : withdrawal.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                        }`}>
                        {withdrawal.status}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                      theme === "dark" ? "text-gray-300" : "text-gray-900"
                    }`}>
                      {new Date(withdrawal.requestedAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <button
                        className="text-green-600 hover:text-green-900 mr-4"
                        onClick={() => handlePaid(withdrawal._id)}
                      >
                        Mark as Paid
                      </button>
                      <button
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                        onClick={() => handleApprove(withdrawal._id)}
                      >
                        Approve
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleReject(withdrawal._id)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {isRejectModalOpen && (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
    <div className={`relative p-5 border w-96 shadow-lg rounded-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
      <h3 className={`text-lg font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
        Reject Withdrawal
      </h3>
      <div className="mt-4">
        <textarea
          className={`w-full p-2 border rounded-md ${
            theme === "dark" 
              ? "bg-gray-700 text-white border-gray-600" 
              : "bg-white text-gray-900 border-gray-300"
          }`}
          rows={4}
          placeholder="Enter rejection reason..."
          value={rejectionNote}
          onChange={(e) => setRejectionNote(e.target.value)}
        />
      </div>
      <div className="mt-4 flex justify-end space-x-3">
        <button
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          onClick={() => {
            setIsRejectModalOpen(false);
            setRejectionNote("");
            setSelectedWithdrawal("");
          }}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          onClick={handleConfirmReject}
          disabled={!rejectionNote.trim()}
        >
          Reject
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default PaymentManager;
