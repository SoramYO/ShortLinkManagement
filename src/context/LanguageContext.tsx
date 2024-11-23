// src/context/LanguageContext.tsx
import React, { createContext, useState } from "react";
import i18n from "../i18n";

type Language = "en" | "vi";
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

export const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem("language");
    return (savedLang as Language) || "en";
  });

  const handleSetLanguage = (lang: Language) => {
    localStorage.setItem("language", lang);
    setLanguage(lang);
    i18n.changeLanguage(lang); // Update language in i18n
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
