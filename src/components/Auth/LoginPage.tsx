// src/components/Auth/LoginPage.tsx
import { Lock } from "lucide-react";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { FcLock } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginAccount } from "../../apis/authenticateApis";
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/useAuth";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await loginAccount(username, password);

      if (response && response.data.success === true) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.user,
        });
        localStorage.setItem("accessToken", response.data?.accessToken || "");
        localStorage.setItem("refreshToken", response.data?.refreshToken || "");
        const userRole = response.data.user.role.name;
        if (userRole === "ADMIN") {
          navigate("/admin/dashboard");
        } else {
          navigate("/member/dashboard");
          toast.success(response.data.message);
        }
        toast.success(response.data.message);
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: response?.data.message,
        });
        toast.error(response?.data.message);
      }
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: "FAILED",
      });
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
      {/* Background Blob Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Login Form Container */}
      <div
        className={`relative z-10 max-w-md w-full space-y-8 p-10 rounded-xl shadow-2xl ${
          theme === "dark"
            ? "bg-gray-800 bg-opacity-70"
            : "bg-white bg-opacity-80"
        } backdrop-filter backdrop-blur-md`}
      >
        <div>
          <Lock className="mx-auto h-12 w-12 text-blue-500" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t("login")}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t("welcomeBack")}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="sr-only">
                {t("email")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                onChange={(e) => setUsername(e.target.value)}
                required
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
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                  theme === "dark"
                    ? "border-gray-700 bg-gray-700 text-white placeholder-gray-400"
                    : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
                } focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder={t("passwordPlaceholder")}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                {t("forgotPassword")}
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              theme === "dark"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ease-in-out duration-150`}
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <Lock
                className="h-5 w-5 text-blue-400 group-hover:text-blue-300"
                aria-hidden="true"
              />
            </span>
            {t("login")}
          </button>
        </form>
        <div
          className={`mt-4 text-center ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          <p className="text-sm">
            {t("noAccount")}{" "}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              {t("register")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
