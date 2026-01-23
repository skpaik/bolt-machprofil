"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { TemplateSwitcher } from "@/components/switchers/template-switcher";
import { LanguageSwitcher } from "@/components/switchers/language-switcher";
import { ProfileSwitcher } from "@/components/switchers/profile-switcher";
import { ThemeSwitcher } from "@/components/switchers/theme-switcher";
import { settings_const } from "@/data/configs/generated/settings";
import { profileLanguageMap, ProfileType } from "@/lib/types/type.config";
import { ConfigData } from "@/data/configs/constants/config-data";

export interface HeaderProps {
  siteTitle: string;
  profileType: ProfileType;
}

export default function Header({ siteTitle, profileType }: HeaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const allowedLanguages = profileLanguageMap[profileType];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        // Scrolling up or at the top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 10) {
        // Scrolling down
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-foreground">
              {siteTitle}
            </span>
          </Link>
          {settings_const.show.ProfileChangeButton &&
            ConfigData.profileList.length > 1 && <ProfileSwitcher />}
          {settings_const.show.LanguageChangeButton &&
            allowedLanguages.length > 1 && <LanguageSwitcher />}
          {settings_const.showTemplateChangeButton && <TemplateSwitcher />}
          {settings_const.showThemeChangeButton && <ThemeSwitcher />}
        </div>
      </div>
    </header>
  );
}
