import { Save } from "lucide-react";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Settings = () => {
  const { theme } = useContext(ThemeContext);
  const [settings, setSettings] = useState({
    siteName: "LinkShortener",
    siteDescription: "URL Shortener and Link Management Platform",
    adminEmail: "",
    maintenanceMode: false,
    registrationEnabled: true,
    defaultUserRole: "member",
    minimumPayout: "5",
    paymentMethods: {
      paypal: true,
      bankTransfer: true,
    },
    smtp: {
      host: "",
      port: "",
      username: "",
      password: "",
      encryption: "tls",
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement settings update
    console.log("Updating settings:", settings);
  };

  return (
    <div>
      <div className="mb-8">
        <h1
          className={`text-2xl font-bold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          System Settings
        </h1>
        <p
          className={`mt-2 text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Configure system settings and preferences
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* General Settings */}
          <div
            className={`${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } rounded-lg shadow-sm p-6`}
          >
            <h2 className="text-lg font-semibold mb-4">General Settings</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label
                  htmlFor="siteName"
                  className="block text-sm font-medium mb-2"
                >
                  Site Name
                </label>
                <input
                  type="text"
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) =>
                    setSettings({ ...settings, siteName: e.target.value })
                  }
                  className={`w-full px-4 py-2 rounded-lg border ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label
                  htmlFor="siteDescription"
                  className="block text-sm font-medium mb-2"
                >
                  Site Description
                </label>
                <textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      siteDescription: e.target.value,
                    })
                  }
                  className={`w-full px-4 py-2 rounded-lg border ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300"
                  }`}
                  rows={3}
                />
              </div>

              <div>
                <label
                  htmlFor="adminEmail"
                  className="block text-sm font-medium mb-2"
                >
                  Admin Email
                </label>
                <input
                  type="email"
                  id="adminEmail"
                  value={settings.adminEmail}
                  onChange={(e) =>
                    setSettings({ ...settings, adminEmail: e.target.value })
                  }
                  className={`w-full px-4 py-2 rounded-lg border ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Site Configuration */}
          <div
            className={`${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } rounded-lg shadow-sm p-6`}
          >
            <h2 className="text-lg font-semibold mb-4">Site Configuration</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      maintenanceMode: e.target.checked,
                    })
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="maintenanceMode"
                  className="ml-2 block text-sm font-medium"
                >
                  Maintenance Mode
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="registrationEnabled"
                  checked={settings.registrationEnabled}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      registrationEnabled: e.target.checked,
                    })
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="registrationEnabled"
                  className="ml-2 block text-sm font-medium"
                >
                  Enable Registration
                </label>
              </div>
            </div>
          </div>

          {/* Payment Settings */}
          <div
            className={`${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } rounded-lg shadow-sm p-6`}
          >
            <h2 className="text-lg font-semibold mb-4">Payment Settings</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label
                  htmlFor="minimumPayout"
                  className="block text-sm font-medium mb-2"
                >
                  Minimum Payout Amount ($)
                </label>
                <input
                  type="number"
                  id="minimumPayout"
                  value={settings.minimumPayout}
                  onChange={(e) =>
                    setSettings({ ...settings, minimumPayout: e.target.value })
                  }
                  className={`w-full px-4 py-2 rounded-lg border ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300"
                  }`}
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="paypalEnabled"
                    checked={settings.paymentMethods.paypal}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        paymentMethods: {
                          ...settings.paymentMethods,
                          paypal: e.target.checked,
                        },
                      })
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="paypalEnabled"
                    className="ml-2 block text-sm font-medium"
                  >
                    Enable PayPal
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="bankTransferEnabled"
                    checked={settings.paymentMethods.bankTransfer}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        paymentMethods: {
                          ...settings.paymentMethods,
                          bankTransfer: e.target.checked,
                        },
                      })
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="bankTransferEnabled"
                    className="ml-2 block text-sm font-medium"
                  >
                    Enable Bank Transfer
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* SMTP Settings */}
          <div
            className={`${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } rounded-lg shadow-sm p-6`}
          >
            <h2 className="text-lg font-semibold mb-4">SMTP Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="smtpHost"
                  className="block text-sm font-medium mb-2"
                >
                  SMTP Host
                </label>
                <input
                  type="text"
                  id="smtpHost"
                  value={settings.smtp.host}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      smtp: { ...settings.smtp, host: e.target.value },
                    })
                  }
                  className={`w-full px-4 py-2 rounded-lg border ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label
                  htmlFor="smtpPort"
                  className="block text-sm font-medium mb-2"
                >
                  SMTP Port
                </label>
                <input
                  type="text"
                  id="smtpPort"
                  value={settings.smtp.port}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      smtp: { ...settings.smtp, port: e.target.value },
                    })
                  }
                  className={`w-full px-4 py-2 rounded-lg border ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label
                  htmlFor="smtpUsername"
                  className="block text-sm font-medium mb-2"
                >
                  SMTP Username
                </label>
                <input
                  type="text"
                  id="smtpUsername"
                  value={settings.smtp.username}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      smtp: { ...settings.smtp, username: e.target.value },
                    })
                  }
                  className={`w-full px-4 py-2 rounded-lg border ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label
                  htmlFor="smtpPassword"
                  className="block text-sm font-medium mb-2"
                >
                  SMTP Password
                </label>
                <input
                  type="password"
                  id="smtpPassword"
                  value={settings.smtp.password}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      smtp: { ...settings.smtp, password: e.target.value },
                    })
                  }
                  className={`w-full px-4 py-2 rounded-lg border ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label
                  htmlFor="smtpEncryption"
                  className="block text-sm font-medium mb-2"
                >
                  SMTP Encryption
                </label>
                <select
                  id="smtpEncryption"
                  value={settings.smtp.encryption}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      smtp: { ...settings.smtp, encryption: e.target.value },
                    })
                  }
                  className={`w-full px-4 py-2 rounded-lg border ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <option value="tls">TLS</option>
                  <option value="ssl">SSL</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Settings;
