import { ArrowRight, Link as LinkIcon, Users } from "lucide-react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaChartBar } from "react-icons/fa";
import { FcLike, FcLink, FcMoneyTransfer, FcStatistics } from "react-icons/fc";
import { MdOutlineSupportAgent } from "react-icons/md";
import { TbApiOff, TbCreditCardPay } from "react-icons/tb";
import { TfiPanel } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import FeatureCard from "../Features/FeatureCard";
import StatCard from "../Stats/StatCard";
const HomePage = () => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  return (
    <div
      className={`relative min-h-screen ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-b from-blue-50 via-white to-blue-50"
      }`}
    >
      {" "}
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </div>
      <div className={`relative z-10 ${theme === "dark" ? "text-white" : ""}`}>
        {/* Hero Section */}
        <section className="pt-20 pb-32 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                {t("heroTitle")}
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                {t("heroSubTitle")}
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t("heroDesc")}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {t("getStarted")}
                <ArrowRight className="ml-2 h-5 w-5 animate-bounce-x" />
              </Link>
              <Link
                to="/createlink"
                className="inline-flex items-center px-8 py-4 rounded-full border-2 border-gray-300 text-gray-700 font-medium hover:border-blue-600 hover:text-blue-600 transform hover:scale-105 transition-all duration-200 bg-white/50 backdrop-blur-sm"
              >
                {t("createlink")}
                <LinkIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          className={`py-20 ${
            theme === "dark" ? "bg-gray-800/70" : "bg-white/70"
          } backdrop-blur-sm`}
        >
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                {t("features")}
              </span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<FcLink size={48} />}
                title={t("feature1Title")}
                description={t("feature1Desc")}
              />
              <FeatureCard
                icon={<FcMoneyTransfer size={48} />}
                title={t("feature2Title")}
                description={t("feature2Desc")}
              />
              <FeatureCard
                icon={<AiOutlineUsergroupAdd size={48} />}
                title={t("feature3Title")}
                description={t("feature3Desc")}
              />
              <FeatureCard
                icon={<TfiPanel size={48} />}
                title={t("feature4Title")}
                description={t("feature4Desc")}
              />
              <FeatureCard
                icon={<FcStatistics size={48} />}
                title={t("feature5Title")}
                description={t("feature5Desc")}
              />
              <FeatureCard
                icon={<TbCreditCardPay size={48} />}
                title={t("feature6Title")}
                description={t("feature6Desc")}
              />
              <FeatureCard
                icon={<FcLike size={48} />}
                title={t("feature7Title")}
                description={t("feature7Desc")}
              />
              <FeatureCard
                icon={<TbApiOff size={48} />}
                title={t("feature8Title")}
                description={t("feature8Desc")}
              />
              <FeatureCard
                icon={<MdOutlineSupportAgent size={48} />}
                title={t("feature9Title")}
                description={t("feature9Desc")}
              />
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                {t("trustStats")}
              </span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <StatCard
                icon={<LinkIcon className="h-8 w-8" />}
                title={t("users")}
                value="241"
              />
              <StatCard
                icon={<Users className="h-8 w-8" />}
                title={t("linksCreated")}
                value="643"
              />
              <StatCard
                icon={<FaChartBar className="h-8 w-8" />}
                title={t("clicksTracked")}
                value="568"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto text-center px-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  {t("customLinksDesc")}
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-10">
                {t("getStartedDesc")}
              </p>
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
              >
                {t("getStarted")}
                <ArrowRight className="ml-2 h-6 w-6 animate-bounce-x" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
