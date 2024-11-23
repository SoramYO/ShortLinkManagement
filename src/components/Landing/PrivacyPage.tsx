import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../context/ThemeContext";

const TermPage = () => {
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
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">{t("privacyPolicy")}</h1>
          <p className="text-lg text-gray-500">{t("lastUpdated")}</p>
        </div>

        <div
          className={`prose ${theme === "dark" ? "prose-invert" : ""} mx-auto`}
        >
          <section className="mb-10">
            <p>{t("introduction")}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              {t("dataCollection")}
            </h2>
            <p>{t("dataCollectionDescription")}</p>
            <ul>
              <li>{t("dataCollectionVisits")}</li>
              <li>{t("dataCollectionForms")}</li>
              <li>{t("dataCollectionContact")}</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{t("cookieUsage")}</h2>
            <p>{t("cookieDescription")}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{t("dataUsage")}</h2>
            <p>{t("dataUsageDescription")}</p>
            <ul>
              <li>{t("dataUsageDescription1")}</li>
              <li>{t("dataUsageDescription2")}</li>
              <li>{t("dataUsageDescription3")}</li>
              <li>{t("dataUsageDescription4")}</li>
              <li>{t("dataUsageDescription5")}</li>
              <li>{t("dataUsageDescription6")}</li>
              <li>{t("dataUsageDescription7")}</li>
              <li>{t("dataUsageDescription8")}</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{t("dataStorage")}</h2>
            <p>{t("dataStorageDescription")}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              {t("informationDisclosure")}
            </h2>
            <p>{t("informationDisclosureDescription")}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{t("contact")}</h2>
            <p>{t("contactDescription")}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermPage;
