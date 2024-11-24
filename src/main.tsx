import { ThemeProvider } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { RouterProvider } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { LoadingProvider } from "./context/LoadingContext";
import { ThemeProvider as CustomThemeProvider } from "./context/ThemeContext";
import { AuthContextProvider } from "./context/useAuth";
import i18n from "./i18n";
import "./index.css";
import router from "./routes/Routes";
import theme from "./theme";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={{ theme }}>
      <CustomThemeProvider>
        <LanguageProvider>
          <AuthContextProvider>
            <LoadingProvider>
              <I18nextProvider i18n={i18n}>
                <RouterProvider router={router} />
              </I18nextProvider>
            </LoadingProvider>
          </AuthContextProvider>
        </LanguageProvider>
      </CustomThemeProvider>
    </ThemeProvider>
  </React.StrictMode>
);
