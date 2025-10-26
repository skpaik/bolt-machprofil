"use client";

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Globe, Layout, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LanguageType, TemplateType, ProfileType } from '@/types/portfolio';
import TemplateSwitcher from "@/components/TemplateSwitcher";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ProfileSwitcher from "@/components/ProfileSwitcher";

export default function Footer() {
  const {
    profile,
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
              © {new Date().getFullYear()} {profile.name}. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            <TemplateSwitcher />

            <ProfileSwitcher/>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="gap-2"
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
              <span className="hidden sm:inline">{langI18n.theme}</span>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
