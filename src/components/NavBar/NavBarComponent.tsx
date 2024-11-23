// src/components/NavBar/NavBarComponent.tsx
import { Languages, LinkIcon, Moon, Sun } from "lucide-react";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";
import { ThemeContext } from "../../context/ThemeContext";

const NavBarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { language, setLanguage } = useContext(LanguageContext);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { t } = useTranslation();
  return (
    <nav
      className={`${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      } shadow-lg`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <LinkIcon
                className={`h-8 w-8 ${
                  theme === "dark" ? "text-blue-400" : "text-blue-600"
                }`}
              />
              <span className="ml-2 text-xl font-bold">LinkShortener</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:items-center sm:ml-6 space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              {t("home")}
            </Link>
            <Link
              to="/payout-rates"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              {t("publisherRates")}
            </Link>
            <Link
              to="/payment-proof"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              {t("paymentProof")}
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className={`p-2 rounded-full flex items-center ${
                  theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                <Languages className="h-5 w-5" />
                <span className="ml-1">{language.toUpperCase()}</span>
              </button>

              {isLangMenuOpen && (
                // Update the language dropdown container width
                <div
                  className={`absolute right-0 mt-2 py-2 w-32 rounded-md shadow-lg z-20 ${
                    theme === "dark" ? "bg-gray-700" : "bg-white"
                  } ring-1 ring-black ring-opacity-5`}
                >
                  {/* English Button */}
                  <button
                    onClick={() => {
                      setLanguage("en");
                      setIsLangMenuOpen(false);
                    }}
                    className={`flex items-center px-4 py-2 text-sm w-full text-left whitespace-nowrap ${
                      language === "en"
                        ? theme === "dark"
                          ? "bg-gray-600 text-white"
                          : "bg-gray-200 text-gray-900"
                        : theme === "dark"
                        ? "hover:bg-gray-600 text-gray-300"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {language === "en" && (
                      <span className="mr-2 text-blue-500">✓</span>
                    )}
                    English
                  </button>
                  {/* Vietnamese Button */}
                  <button
                    onClick={() => {
                      setLanguage("vi");
                      setIsLangMenuOpen(false);
                    }}
                    className={`flex items-center px-4 py-2 text-sm w-full text-left whitespace-nowrap ${
                      language === "vi"
                        ? theme === "dark"
                          ? "bg-gray-600 text-white"
                          : "bg-gray-200 text-gray-900"
                        : theme === "dark"
                        ? "hover:bg-gray-600 text-gray-300"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {language === "vi" && (
                      <span className="mr-2 text-blue-500">✓</span>
                    )}
                    Tiếng Việt
                  </button>
                </div>
              )}
            </div>

            <Link
              to="/login"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              {t("login")}
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
            >
              {t("signUp")}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md ${
                theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className={`sm:hidden ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              Home
            </Link>
            <Link
              to="/getlink"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              Get Link
            </Link>
            <div className="flex items-center px-3 py-2 space-x-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${
                  theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
              <button
                onClick={() => setLanguage(language === "en" ? "vi" : "en")}
                className={`p-2 rounded-full ${
                  theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              >
                <Languages className="h-5 w-5" />
                <span className="ml-1">{language.toUpperCase()}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBarComponent;
