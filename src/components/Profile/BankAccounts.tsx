import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { toast } from "react-toastify";
import { FaEdit, FaSave, FaTimes, FaPlus, FaTrash, FaExclamationTriangle } from "react-icons/fa";
import { addBank, removeBank } from "../../apis/profileApis";
import { BankAccount } from "../../models/AuthenticateUser";

interface BankAccountsProps {
  accounts: BankAccount[];
  onUpdate?: () => void;
}

const BankAccounts = ({ accounts, onUpdate }: BankAccountsProps) => {
  const { theme } = useContext(ThemeContext);
  const [isEditing, setIsEditing] = useState(false);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; account: BankAccount | null; index: number }>({
    isOpen: false,
    account: null,
    index: -1
  });

  useEffect(() => {
    setBankAccounts(accounts.filter(acc => acc.bankName && acc.accountNumber && acc.accountName));
  }, [accounts]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addBank(bankAccounts);
      toast.success("Bank accounts updated successfully");
      setIsEditing(false);
      onUpdate?.();
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update bank accounts");
    }
  };

  const handleAddAccount = () => {
    setIsEditing(true);
    setBankAccounts([
      ...bankAccounts,
      { bankName: "", accountNumber: "", accountName: "" },
    ]);
  };

  const openDeleteModal = (account: BankAccount, index: number) => {
    setDeleteModal({ isOpen: true, account, index });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, account: null, index: -1 });
  };

  const handleRemoveAccount = async (index: number) => {
    try {
      const accountToRemove = bankAccounts[index];
      if (!accountToRemove._id) {
        setBankAccounts(bankAccounts.filter((_, i) => i !== index));
        closeDeleteModal();
        return;
      }

      await removeBank(accountToRemove._id);
      toast.success("Bank account removed successfully");
      onUpdate?.();
      closeDeleteModal();
    } catch (error) {
      console.error("Remove bank error:", error);
      toast.error("Failed to remove bank account");
      closeDeleteModal();
    }
  };

  const handleAccountChange = (
    index: number,
    field: keyof Omit<BankAccount, "_id">,
    value: string
  ) => {
    const newAccounts = [...bankAccounts];
    newAccounts[index] = { ...newAccounts[index], [field]: value };
    setBankAccounts(newAccounts);
  };

  return (
    <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow-md`}>
      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && deleteModal.account && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-lg p-6 max-w-md w-full mx-4 shadow-xl`}>
            <div className="flex items-center justify-center mb-4 text-yellow-500">
              <FaExclamationTriangle size={48} />
            </div>
            <h3 className={`text-xl font-semibold mb-2 text-center ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Confirm Deletion
            </h3>
            <p className={`text-center mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              Are you sure you want to remove the bank account for {deleteModal.account.bankName}?
              <br />
              <span className="text-sm">Account: {deleteModal.account.accountNumber}</span>
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={closeDeleteModal}
                className={`px-4 py-2 rounded-md ${
                  theme === "dark"
                    ? "bg-gray-600 text-white hover:bg-gray-700"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                } transition-colors`}
              >
                Cancel
              </button>
              <button
                onClick={() => handleRemoveAccount(deleteModal.index)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
          Bank Accounts
        </h2>
        <div className="flex gap-2">
          {!isEditing && (
            <button
              onClick={handleAddAccount}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <FaPlus /> Add Account
            </button>
          )}
          {bankAccounts.length > 0 && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <FaEdit /> Edit
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className={theme === "dark" ? "bg-gray-700" : "bg-gray-50"}>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Number</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y divide-gray-200 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
                {bankAccounts.map((account, index) => (
                  <tr key={account._id || index}>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={account.bankName}
                        onChange={(e) => handleAccountChange(index, "bankName", e.target.value)}
                        className={`w-full px-3 py-2 rounded-md ${
                          theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-900"
                        }`}
                        placeholder="Enter bank name"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={account.accountNumber}
                        onChange={(e) => handleAccountChange(index, "accountNumber", e.target.value)}
                        className={`w-full px-3 py-2 rounded-md ${
                          theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-900"
                        }`}
                        placeholder="Enter account number"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={account.accountName}
                        onChange={(e) => handleAccountChange(index, "accountName", e.target.value)}
                        className={`w-full px-3 py-2 rounded-md ${
                          theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-900"
                        }`}
                        placeholder="Enter account name"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => openDeleteModal(account, index)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className={theme === "dark" ? "bg-gray-700" : "bg-gray-50"}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className={`divide-y divide-gray-200 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
              {bankAccounts.map((account, index) => (
                <tr key={account._id || index}>
                  <td className={`px-6 py-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{account.bankName}</td>
                  <td className={`px-6 py-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{account.accountNumber}</td>
                  <td className={`px-6 py-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{account.accountName}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openDeleteModal(account, index)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BankAccounts;