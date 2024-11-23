// src/components/Pages/PaymentProof.tsx
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../context/ThemeContext";

const PaymentProof = () => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  return (
    <div
      className={`min-h-screen py-12 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t("paymentProof")}</h1>
          <p className="text-lg text-gray-500">
            {t("joinTelegram")}{" "}
            <a
              href="https://t.me/site2s"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              @site2s
            </a>{" "}
            {t("and")}{" "}
            <a
              href="https://t.me/site2schat"
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              @site2schat
            </a>{" "}
            {t("toSeeBills")}
          </p>
        </div>

        {/* Payment Table */}
        <div
          className={`overflow-x-auto ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          } shadow-md rounded-lg`}
        >
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-3 text-sm font-medium">{t("date")}</th>
                <th className="px-6 py-3 text-sm font-medium">
                  {t("username")}
                </th>
                <th className="px-6 py-3 text-sm font-medium">{t("amount")}</th>
                <th className="px-6 py-3 text-sm font-medium">{t("method")}</th>
              </tr>
            </thead>
            <tbody>
              {/* Example row */}
              <tr
                className={`${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                } hover:${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}
              >
                <td className="px-6 py-4 border-b text-sm">01/09/2023</td>
                <td className="px-6 py-4 border-b text-sm">user123</td>
                <td className="px-6 py-4 border-b text-sm">$50.00</td>
                <td className="px-6 py-4 border-b text-sm">PayPal</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentProof;
