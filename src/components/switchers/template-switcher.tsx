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
import { showLucidIcon } from "@/components/lucid-icon-map";

export function TemplateSwitcher() {
  const { templateType, setTemplateType } = usePortfolio();

  const currentTemplate = ConfigData.templates.find(
    (t) => t.value === templateType,
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          {showLucidIcon("layout", "", 16)}
          <span className="hidden sm:inline">{currentTemplate?.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {ConfigData.templates.map((t) => (
          <DropdownMenuItem
            key={t.value}
            onClick={() => setTemplateType(t.value)}
            className="flex flex-col items-start gap-1 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="font-medium">{t.label}</span>
              {templateType === t.value && <span className="text-xs">✓</span>}
            </div>
            <span className="text-xs text-muted-foreground">
              {t.description}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
