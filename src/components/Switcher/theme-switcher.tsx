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
import { ConfigData } from "@/data/configs/config-data";
import { ThemeType } from "@/lib/types/type.config";
import { showLucidIcon } from "@/components/lucid-icon-map";

export function ThemeSwitcher() {
  const { themeType, setThemeType } = usePortfolio();

  const currentTheme =
    ConfigData.themes.find((t) => t.value === themeType) || ConfigData.themes[2];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          {showLucidIcon(currentTheme.icon, "", 16)}
          <span className="hidden sm:inline">{currentTheme.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {ConfigData.themes.map((t) => {
          return (
            <DropdownMenuItem
              key={t.value}
              onClick={() => setThemeType(t.value as ThemeType)}
              className="flex items-center gap-2 cursor-pointer"
            >
              {showLucidIcon(t.icon, "", 16)}
              <span className="font-medium">{t.label}</span>
              {themeType === t.value && <span className="ml-auto text-xs">✓</span>}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
