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
import { ConfigData } from "@/data/configs/constants/config-data";
import { showLucidIcon } from "@/components/lucid-icon-map";

export function ProfileSwitcher() {
  const { langI18n, profileType, setProfileType } = usePortfolio();

  const current = ConfigData.profileList.find((t) => t.value === profileType);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          {showLucidIcon("globe", "", 16)}
          <span className="hidden sm:inline">{current?.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {ConfigData.profileList.map((t) => (
          <DropdownMenuItem
            key={t.value}
            onClick={() => setProfileType(t.value)}
            className="flex flex-col items-start gap-1 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="font-medium">{t.label}</span>
              {profileType === t.value && <span className="text-xs">✓</span>}
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
