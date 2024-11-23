// src/components/RegisterPage.tsx
import React, { useContext, useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerAccount } from "../../apis/authenticateApis";

import { Lock, MailsIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FcCustomerSupport, FcLock } from "react-icons/fc";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [refCode, setRefCode] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get("ref");
    if (ref) {
      setRefCode(ref);
    }
  }, [location.search]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await registerAccount(
        email,
        password,
        username,
        refCode
      );
      if (response && response.data.errCode === 0) {
        navigate("/login");
        toast.success(response.data.message);
      } else {
        toast.error(response?.data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred during registration");
    }
  };

  return (
    <div
      className={`relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 ${
        theme === "dark"
          ? "bg-gradient-to-tr from-gray-900 to-gray-800"
          : "bg-gradient-to-tr from-blue-400 to-purple-600"
      } overflow-hidden`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </div>
      <div
        className={`relative z-10 max-w-md w-full space-y-8 p-10 rounded-xl shadow-2xl ${
          theme === "dark"
            ? "bg-gray-800 bg-opacity-70"
            : "bg-white bg-opacity-80"
        } backdrop-filter backdrop-blur-md`}
      >
        <div>
          <FcLock className="mx-auto h-12 w-12 text-blue-500" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t("register")}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t("welcome")}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Username Field */}
            <div className="relative">
              <label htmlFor="username" className="sr-only">
                {t("username")}
              </label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FcCustomerSupport
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                  theme === "dark"
                    ? "border-gray-700 bg-gray-700 text-white placeholder-gray-400"
                    : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
                } focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder={t("usernamePlaceholder")}
              />
            </div>
            {/* Email Field */}
            <div className="relative mt-4">
              <label htmlFor="email" className="sr-only">
                {t("email")}
              </label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MailsIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                  theme === "dark"
                    ? "border-gray-700 bg-gray-700 text-white placeholder-gray-400"
                    : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
                } focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder={t("emailPlaceholder")}
              />
            </div>
            {/* Password Field */}
            <div className="relative mt-4">
              <label htmlFor="password" className="sr-only">
                {t("password")}
              </label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FcLock className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                  theme === "dark"
                    ? "border-gray-700 bg-gray-700 text-white placeholder-gray-400"
                    : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
                } focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder={t("passwordPlaceholder")}
              />
            </div>
            {/* Confirm Password Field */}
            <div className="relative mt-4">
              <label htmlFor="confirmPassword" className="sr-only">
                {t("confirmPassword")}
              </label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                  theme === "dark"
                    ? "border-gray-700 bg-gray-700 text-white placeholder-gray-400"
                    : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
                } focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder={t("confirmPasswordPlaceholder")}
              />
            </div>
          </div>

          <button
            type="submit"
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              theme === "dark"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-green-500 hover:bg-green-600"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition ease-in-out duration-150`}
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <Lock
                className="h-5 w-5 text-green-400 group-hover:text-green-300"
                aria-hidden="true"
              />
            </span>
            {t("register")}
          </button>
        </form>
        <div
          className={`mt-4 text-center ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          <p className="text-sm">
            {t("alreadyHaveAccount")}{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              {t("login")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
