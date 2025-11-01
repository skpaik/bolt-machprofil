"use client";

import React from 'react';
import {usePortfolio} from '@/components/context/PortfolioContext';
import TemplateSwitcher from "@/components/TemplateSwitcher";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ProfileSwitcher from "@/components/ProfileSwitcher";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function Footer() {
  const {
    appData,
    langI18n,
    theme,
    setTheme
  } = usePortfolio();

  return (
    <footer className="border-t bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {appData.name}. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher/>
            <TemplateSwitcher/>
            <ProfileSwitcher/>
            <ThemeSwitcher/>
          </div>
        </div>
      </div>
    </footer>
  );
}
