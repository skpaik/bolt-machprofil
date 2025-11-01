"use client";

import React, {createContext, ReactNode, useContext, useEffect, useState,} from "react";
import portfolioData from "@/data/portfolio.json";
import languageData from "@/data/i18n.json";
import settingData from "@/data/settings.json";
import {
    LanguageType,
    ProfileType,
    TemplateType,
    ThemeType,
} from "@/lib/types/type.config";
import {
    AppConfig, AppData, ContentData, LanguageI18n, SettingSchema
} from "@/lib/types/portfolio";

interface PortfolioContextType {
    appData: AppData;
    contentData: ContentData;
    appConfig: AppConfig;
    profileType: ProfileType;
    setProfileType: (type: ProfileType) => void;
    template: TemplateType;
    setTemplate: (type: TemplateType) => void;
    langI18n: LanguageI18n;
    languageType: LanguageType;
    setLanguageType: (type: LanguageType) => void;
    theme: ThemeType;
    setTheme: (theme: ThemeType) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
    undefined
);

// Safe helper — works both client and SSR
function getInitialValue<T extends string>(
    key: string,
    fallback: T,
    validValues?: readonly T[]
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

export function PortfolioProvider({children}: { children: ReactNode }) {
    const setting = settingData as SettingSchema;

    // ✅ Lazy initialization — runs once on first render in browser
    const [profileType, setProfileType] = useState<ProfileType>(() =>
        getInitialValue(
            "portfolioProfile",
            setting.portfolioProfile as ProfileType,
            Object.keys(portfolioData.profiles) as ProfileType[]
        )
    );

    const [template, setTemplate] = useState<TemplateType>(() =>
        getInitialValue(
            "portfolioTemplate",
            setting.portfolioTemplate as TemplateType,
        )
    );

    const [languageType, setLanguageType] = useState<LanguageType>(() =>
        getInitialValue(
            "portfolioLanguage",
            setting.portfolioLanguage as LanguageType,
            Object.keys(languageData) as LanguageType[]
        )
    );

    const [theme, setTheme] = useState<ThemeType>(() =>
        getInitialValue(
            "portfolioTheme",
            setting.portfolioTheme as ThemeType,
        )
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

    // Derived data
    const appData = portfolioData.profiles[profileType] as AppData;
    const contentData = portfolioData.profiles[profileType] as ContentData;
    const appConfig = portfolioData.app_config as AppConfig;
    const langI18n = languageData[languageType] as LanguageI18n;

    return (
        <PortfolioContext.Provider
            value={{
                appData,
                contentData,
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
