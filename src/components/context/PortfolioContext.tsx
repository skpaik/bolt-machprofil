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
import {
  AppConfig,
  AppData,
  BlogPost,
  Certificate,
  Education,
  Experience,
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
import { ContentData } from "@/lib/types/content.types";
import { LanguageI18n } from "@/lib/types/lang.i18n";
import { emptyContent } from "@/data/configs/constants/empty.data";
// import blogContentsData from "@/data/contents/developer/en/blog_list";
// import projectContentsData from "@/data/project_contents.json";
// import experienceContentsData from "@/data/experience_contents.json";
// import educationContentsData from "@/data/education_contents.json";
// import serviceContentsData from "@/data/service_contents.json";
// import certificateContentsData from "@/data/certificate_contents.json";
// import skillContentsData from "@/data/skill_contents.json";
// import testimonialContentsData from "@/data/testimonial_contents.json";
// import publicationContentsData from "@/data/publication_contents.json";
// import photoContentsData from "@/data/photos_contents.json";
// import aboutContentsData from "@/data/contents/developer/en/about_content";
import languageData from "@/data/configs/constants/i18n.json";
import { ConfigData } from "@/data/configs/constants/config-data";
import { settings_const } from "@/data/configs/generated/settings";
import { LocalStorageService } from "@/lib/services/local.s.service";

type AvailableI18nLanguage = keyof typeof languageData;

function isI18nLanguageKeyAvailable(lang: LanguageType): lang is AvailableI18nLanguage {
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
  const allowedProfiles = ConfigData.profileList.map(
    (profile) => profile.value,
  );
  //console.log('allowedProfiles>  ', allowedProfiles);

  // ✅ Lazy initialization — runs once on first render in browser
  const [profileType, setProfileType] = useState<ProfileType>(() =>
    getInitialValue(
      "activeProfile",
      settings_const.activeProfile as ProfileType,
      Object.keys(allowedProfiles) as ProfileType[],
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

  const [contentData, setContentData] = useState<ContentData>(emptyContent);

  useEffect(() => {
    // loadAllContent(languageType).then(setContentData);
  }, [languageType]);

  //if (!contentData) return null;

  // Derived data
  //const appData: AppData = portfolioData.profiles[profileType];
  const appData = contentData.about_content.bio as AppData;
  //const blogContentData: BlogPost[] = blogContentsData;
  // const projectContentData: Project[] = projectContentsData[languageType];
  // const experienceContentData: Experience[] =    experienceContentsData[languageType];
  // const educationContentData: Education[] = educationContentsData[languageType];
  // const serviceContentData: Service[] = serviceContentsData[languageType];
  // const certificateContentData: Certificate[] =    certificateContentsData[languageType];
  // const skillContentData: Skills[] = skillContentsData[languageType];
  // const testimonialContentData: Testimonial[] =    testimonialContentsData[languageType];
  // const publicationContentData: Publication[] =    publicationContentsData[languageType];
  // const photoContentData: Photo[] = photoContentsData[languageType];
 // const aboutContent: AboutContent = aboutContentsData;
  //const langI18n: LanguageI18n = languageData[languageType];
  const langI18n: LanguageI18n = isI18nLanguageKeyAvailable(languageType) ? languageData[languageType] : languageData.en;
  const appConfig: AppConfig = { item_per_page: 4 };
  //contentData.staticContent = staticContentData;
  //contentData.photos = photoContentData;

  return (
    <PortfolioContext.Provider
      value={{
        appData,
        contentData,
        appConfig,
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
