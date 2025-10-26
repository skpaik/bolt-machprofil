"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import portfolioData from '@/data/portfolio.json';
import languageData from '@/data/i18n.json';
import { Profile, LanguageI18n, ProfileType, TemplateType, LanguageType, ThemeType } from '@/types/portfolio';

interface PortfolioContextType {
  profile: Profile;
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

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [profileType, setProfileType] = useState<ProfileType>('developer');
  const [template, setTemplate] = useState<TemplateType>('modern');
  const [languageType, setLanguageType] = useState<LanguageType>('en');
  const [theme, setTheme] = useState<ThemeType>('light');

  useEffect(() => {
    const savedProfile = localStorage.getItem('portfolioProfile') as ProfileType;
    const savedTemplate = localStorage.getItem('portfolioTemplate') as TemplateType;
    const savedLanguage = localStorage.getItem('portfolioLanguage') as LanguageType;
    const savedTheme = localStorage.getItem('portfolioTheme') as ThemeType;

    if (savedProfile && portfolioData.profiles[savedProfile]) {
      setProfileType(savedProfile);
    }
    if (savedTemplate) {
      setTemplate(savedTemplate);
    }
    if (savedLanguage && languageData[savedLanguage]) {
      setLanguageType(savedLanguage);
    }
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolioProfile', profileType);
  }, [profileType]);

  useEffect(() => {
    localStorage.setItem('portfolioTemplate', template);
  }, [template]);

  useEffect(() => {
    localStorage.setItem('portfolioLanguage', languageType);
  }, [languageType]);

  useEffect(() => {
    localStorage.setItem('portfolioTheme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const profile = portfolioData.profiles[profileType] as Profile;
  const langI18n = languageData[languageType] as LanguageI18n;

  return (
    <PortfolioContext.Provider
      value={{
        profile,
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
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
