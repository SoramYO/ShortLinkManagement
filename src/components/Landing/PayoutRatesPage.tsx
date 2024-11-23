// src/components/Pages/PayoutRatesPage.tsx
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../context/ThemeContext";

const PayoutRatesPage = () => {
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
          <h1 className="text-4xl font-bold mb-4">{t("publisherRates")}</h1>
          <p className="text-lg text-gray-500">{t("earnBySharing")}</p>
        </div>

        {/* Rates Table */}
        <div
          className={`overflow-x-auto ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          } shadow-md rounded-lg`}
        >
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-3 text-sm font-medium">
                  {t("country")}
                </th>
                <th className="px-6 py-3 text-sm font-medium">
                  {t("desktopRates")}
                </th>
                <th className="px-6 py-3 text-sm font-medium">
                  {t("mobileRates")}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                className={`${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                } hover:${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}
              >
                <td className="px-6 py-4 border-b text-sm">Việt Nam</td>
                <td className="px-6 py-4 border-b text-sm">$16.00</td>
                <td className="px-6 py-4 border-b text-sm">$16.00</td>
              </tr>
              {/* Add more rows if needed */}
            </tbody>
          </table>
        </div>

        {/* Additional Information */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">{t("additionalInfo")}</h2>
          <p>{t("payoutDescription")}</p>
        </div>
      </div>
    </div>
  );
};

export default PayoutRatesPage;
