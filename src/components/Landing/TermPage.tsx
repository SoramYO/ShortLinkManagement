import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../context/ThemeContext";

const PrivacyPage = () => {
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">{t("termsOfUse")}</h1>
          <p className="text-lg text-gray-500">{t("lastUpdated")}</p>
        </div>

        {/* Content */}
        <div
          className={`prose ${theme === "dark" ? "prose-invert" : ""} mx-auto`}
        >
          <section className="mb-10">
            <p>{t("termsIntro")}</p>
          </section>

          {/* Rules Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{t("agreement")}</h2>
            <ol className="list-decimal pl-6 space-y-4">
              <li>{t("rule1")}</li>
              <li>{t("rule2")}</li>
              <li>{t("rule3")}</li>
              <li>{t("rule4")}</li>
              <li>{t("rule5")}</li>
              <li>{t("rule6")}</li>
              <li>{t("rule7")}</li>
              <li>{t("rule8")}</li>
              <li>{t("rule9")}</li>
              <li>{t("rule10")}</li>
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
