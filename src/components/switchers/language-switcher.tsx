"use client";

import React from "react";
import { usePortfolio } from "@/components/context/PortfolioContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { showLucidIcon } from "@/components/lucid-icon-map";
import { ConfigData } from "@/data/configs/config-data";

export function LanguageSwitcher() {
  const { langI18n, languageType, setLanguageType } = usePortfolio();
  const current = ConfigData.languages.find((t) => t.value === languageType);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          {showLucidIcon("globe", "", 16)}
          <span className="hidden sm:inline">{current?.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {ConfigData.languages.map((t) => (
          <DropdownMenuItem
            key={t.value}
            onClick={() => setLanguageType(t.value)}
            className="flex flex-col items-start gap-1 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="font-medium">{t.label}</span>
              {languageType === t.value && <span className="text-xs">✓</span>}
            </div>
            {t.description && (
              <span className="text-xs text-muted-foreground">
                {t.description}
              </span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
