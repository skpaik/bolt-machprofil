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

export default function Footer() {
  const {
    profile,
    language,
    languageType,
    setLanguageType,
    template,
    setTemplate,
    profileType,
    setProfileType,
    theme,
    setTheme
  } = usePortfolio();

  const languages: { code: LanguageType; name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
  ];

  const templates: { code: TemplateType; name: string }[] = [
    { code: 'modern', name: 'Modern' },
    { code: 'classic', name: 'Classic' },
    { code: 'minimal', name: 'Minimal' },
  ];

  const profiles: { code: ProfileType; name: string }[] = [
    { code: 'developer', name: 'Developer' },
    { code: 'photographer', name: 'Photographer' },
    { code: 'teacher', name: 'Teacher' },
  ];

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Globe size={16} />
                  <span className="hidden sm:inline">{language.language}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguageType(lang.code)}
                    className={languageType === lang.code ? 'bg-accent' : ''}
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Layout size={16} />
                  <span className="hidden sm:inline">{language.template}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {templates.map((tmpl) => (
                  <DropdownMenuItem
                    key={tmpl.code}
                    onClick={() => setTemplate(tmpl.code)}
                    className={template === tmpl.code ? 'bg-accent' : ''}
                  >
                    {tmpl.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Globe size={16} />
                  <span className="hidden sm:inline">{language.profile}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {profiles.map((prof) => (
                  <DropdownMenuItem
                    key={prof.code}
                    onClick={() => setProfileType(prof.code)}
                    className={profileType === prof.code ? 'bg-accent' : ''}
                  >
                    {prof.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="gap-2"
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
              <span className="hidden sm:inline">{language.theme}</span>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
