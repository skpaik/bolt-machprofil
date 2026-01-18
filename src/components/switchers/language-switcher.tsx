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
import { profileLanguageMap } from "@/lib/types/type.config";

export function LanguageSwitcher() {
  const { profileType, languageType, setLanguageType } = usePortfolio();
  const languageList = profileLanguageMap[profileType];

  const current = languageList.find((t) => t.value === languageType);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          {showLucidIcon("globe", "", 16)}
          <span className="hidden sm:inline">{current?.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languageList.map((t) => (
          <DropdownMenuItem
            key={t.value}
            onClick={() => setLanguageType(t.value)}
            className="flex flex-col items-start gap-1 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="font-medium">{t.label}</span>
              {languageType === t.value && <span className="text-xs">✓</span>}
            </div>
            {/*{t.description && (*/}
            {/*  <span className="text-xs text-muted-foreground">*/}
            {/*    {t.description}*/}
            {/*  </span>*/}
            {/*)}*/}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
