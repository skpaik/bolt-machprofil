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
import { ConfigData } from "@/data/config-data";
import {showLucidIcon} from "@/components/lucid-icon-map";

export default function TemplateSwitcher() {
  const { template, setTemplate } = usePortfolio();

  const currentTemplate = ConfigData.templates.find(
    (t) => t.value === template,
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
            {showLucidIcon('layout', '', 16)}
          <span className="hidden sm:inline">{currentTemplate?.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {ConfigData.templates.map((t) => (
          <DropdownMenuItem
            key={t.value}
            onClick={() => setTemplate(t.value)}
            className="flex flex-col items-start gap-1 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="font-medium">{t.label}</span>
              {template === t.value && <span className="text-xs">✓</span>}
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
