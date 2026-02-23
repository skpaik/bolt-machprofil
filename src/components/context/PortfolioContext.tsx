"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  LanguageType,
  ProfileType,
  TemplateType,
  ThemeType,
} from "@/lib/types/type.config";
import { PortfolioContextType } from "@/lib/types/portfolio";
import { LanguageI18n } from "@/lib/types/lang.i18n";
// import blogContentsData from "@/data/contents/developer/en/blog_list";
// import aboutContentsData from "@/data/contents/developer/en/about_content";
import languageData from "@/data/configs/constants/i18n.json";
import { ConfigData } from "@/data/configs/constants/config-data";
import { settings_const } from "@/data/configs/generated/settings";
import { LocalStorageService } from "@/lib/services/local.s.service";

type AvailableI18nLanguage = keyof typeof languageData;

function isI18nLanguageKeyAvailable(
  lang: LanguageType,
): lang is AvailableI18nLanguage {
  return lang in languageData;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined,
);

// Safe helper — works both client and SSR
function getInitialValue<T extends string>(
  key: string,
  fallback: T,
  validValues?: readonly T[],
): T {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = LocalStorageService.get<T>(key);
    if (stored && (!validValues || validValues.includes(stored))) {
      return stored;
    }
  } catch {
    /* ignore errors */
  }
  return fallback;
}

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const allowedProfileValues = ConfigData.profileList.map(
    (profile) => profile.value,
  ) as ProfileType[];
  //console.log('allowedProfiles>  ', allowedProfiles);

  // ✅ Lazy initialization — runs once on first render in browser
  const [profileType, setProfileType] = useState<ProfileType>(() =>
    getInitialValue(
      "activeProfile",
      settings_const.activeProfile as ProfileType,
      allowedProfileValues,
    ),
  );

  const [templateType, setTemplateType] = useState<TemplateType>(() =>
    getInitialValue(
      "activeTemplate",
      settings_const.activeTemplate as TemplateType,
    ),
  );

  const [languageType, setLanguageType] = useState<LanguageType>(() =>
    getInitialValue(
      "activeLanguage",
      settings_const.activeLanguage as LanguageType,
      Object.keys(languageData) as LanguageType[],
    ),
  );

  const [themeType, setThemeType] = useState<ThemeType>(() =>
    getInitialValue("activeTheme", settings_const.activeTheme as ThemeType),
  );

  // Keep theme synced to DOM
  useEffect(() => {
    document.documentElement.classList.toggle("dark", themeType === "dark");
  }, [themeType]);

  // Persist on change
  useEffect(() => {
    LocalStorageService.set("activeProfile", profileType);
  }, [profileType]);

  useEffect(() => {
    LocalStorageService.set("activeTemplate", templateType);
  }, [templateType]);

  useEffect(() => {
    LocalStorageService.set("activeLanguage", languageType);
  }, [languageType]);

  useEffect(() => {
    LocalStorageService.set("activeTheme", themeType);
    document.documentElement.classList.toggle("dark", themeType === "dark");
  }, [themeType]);

  //const [contentData, setContentData] = useState<ContentData>(emptyContent);

  useEffect(() => {
    // loadAllContent(languageType).then(setContentData);
  }, [languageType]);

  //const blogContentData: BlogPost[] = blogContentsData;
  // const aboutContent: AboutContent = aboutContentsData;
  //const langI18n: LanguageI18n = languageData[languageType];
  const langI18n: LanguageI18n = isI18nLanguageKeyAvailable(languageType)
    ? languageData[languageType]
    : languageData.en;

  return (
    <PortfolioContext.Provider
      value={{
        profileType,
        setProfileType,
        templateType,
        setTemplateType,
        langI18n,
        languageType,
        setLanguageType,
        themeType,
        setThemeType,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);

  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }

  return context;
}
