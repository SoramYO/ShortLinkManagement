import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

import axiosInstance from "../../utils/axios";
import { toast } from "react-toastify";

const PasswordUpdate = () => {
  const { theme } = useContext(ThemeContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPassword = formData.get("newPassword");
    const confirmPassword = formData.get("confirmPassword");

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await axiosInstance.put("/api/user/profile/password", {
        currentPassword: formData.get("currentPassword"),
        newPassword,
      });
      toast.success("Password updated successfully");
      e.currentTarget.reset();
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update password");
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            required
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-900"
            }`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            name="newPassword"
            required
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-900"
            }`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            required
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-900"
            }`}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default PasswordUpdate;