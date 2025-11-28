"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import portfolioData from "@/data/portfolio.json";
import staticContentsData from "@/data/static_contents.json";
import blogContentsData from "@/data/blog_contents.json";
import projectContentsData from "@/data/project_contents.json";
import experienceContentsData from "@/data/experience_contents.json";
import educationContentsData from "@/data/education_contents.json";
import serviceContentsData from "@/data/service_contents.json";
import certificateContentsData from "@/data/certificate_contents.json";
import skillContentsData from "@/data/skill_contents.json";
import testimonialContentsData from "@/data/testimonial_contents.json";
import publicationContentsData from "@/data/publication_contents.json";
import photoContentsData from "@/data/photos_contents.json";
import aboutContentsData from "@/data/about_contents.json";
import languageData from "@/data/i18n.json";
import settingData from "@/data/settings.json";
import {
  LanguageType,
  ProfileType,
  TemplateType,
  ThemeType,
} from "@/lib/types/type.config";
import {
  AppConfig,
  AppData,
  BlogPost,
  Certificate,
  Education,
  Experience,
  LanguageI18n,
  Photo,
  PortfolioContextType,
  Project,
  Publication,
  Service,
  SettingSchema,
  Skills,
  StaticContentData,
  Testimonial,
} from "@/lib/types/portfolio";
import { AboutContent } from "@/lib/types/about.contract";
import { loadAllContent } from "@/lib/services/loadContent";
import { ContentData, emptyContent } from "@/lib/types/content.types";

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
    const stored = localStorage.getItem(key) as T | null;
    if (stored && (!validValues || validValues.includes(stored))) {
      return stored;
    }
  } catch {
    /* ignore errors */
  }
  return fallback;
}

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const setting = settingData as SettingSchema;

  // ✅ Lazy initialization — runs once on first render in browser
  const [profileType, setProfileType] = useState<ProfileType>(() =>
    getInitialValue(
      "portfolioProfile",
      setting.portfolioProfile as ProfileType,
      Object.keys(portfolioData.profiles) as ProfileType[],
    ),
  );

  const [template, setTemplate] = useState<TemplateType>(() =>
    getInitialValue(
      "portfolioTemplate",
      setting.portfolioTemplate as TemplateType,
    ),
  );

  const [languageType, setLanguageType] = useState<LanguageType>(() =>
    getInitialValue(
      "portfolioLanguage",
      setting.portfolioLanguage as LanguageType,
      Object.keys(languageData) as LanguageType[],
    ),
  );

  const [theme, setTheme] = useState<ThemeType>(() =>
    getInitialValue("portfolioTheme", setting.portfolioTheme as ThemeType),
  );

  // Keep theme synced to DOM
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // Persist on change
  useEffect(() => {
    localStorage.setItem("portfolioProfile", profileType);
  }, [profileType]);

  useEffect(() => {
    localStorage.setItem("portfolioTemplate", template);
  }, [template]);

  useEffect(() => {
    localStorage.setItem("portfolioLanguage", languageType);
  }, [languageType]);

  useEffect(() => {
    localStorage.setItem("portfolioTheme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const [contentData, setContentData] = useState<ContentData>(emptyContent);

  useEffect(() => {
    loadAllContent(languageType).then(setContentData);
  }, [languageType]);

  //if (!contentData) return null;

  // Derived data
  const appData: AppData = portfolioData.profiles[profileType];
  const staticContentData: StaticContentData = staticContentsData[languageType];
  const blogContentData: BlogPost[] = blogContentsData[languageType];
  const projectContentData: Project[] = projectContentsData[languageType];
  const experienceContentData: Experience[] =
    experienceContentsData[languageType];
  const educationContentData: Education[] = educationContentsData[languageType];
  const serviceContentData: Service[] = serviceContentsData[languageType];
  const certificateContentData: Certificate[] =
    certificateContentsData[languageType];
  const skillContentData: Skills[] = skillContentsData[languageType];
  const testimonialContentData: Testimonial[] =
    testimonialContentsData[languageType];
  const publicationContentData: Publication[] =
    publicationContentsData[languageType];
  const photoContentData: Photo[] = photoContentsData[languageType];
  const appConfig: AppConfig = portfolioData.app_config;
  const aboutContent: AboutContent = aboutContentsData[languageType];
  const langI18n: LanguageI18n = languageData[languageType];

  //contentData.staticContent = staticContentData;
  //contentData.photos = photoContentData;

  return (
    <PortfolioContext.Provider
      value={{
        appData,
        contentData,
        staticContentData,
        appConfig,
        profileType,
        setProfileType,
        template,
        setTemplate,
        langI18n,
        languageType,
        setLanguageType,
        theme,
        setTheme,
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
