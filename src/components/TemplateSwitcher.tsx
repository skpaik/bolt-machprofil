"use client";

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Layout } from 'lucide-react';
import {ConfigData} from "@/data/config-data";

export default function TemplateSwitcher() {
  const { template, setTemplate } = usePortfolio();

  const currentTemplate =ConfigData. templates.find(t => t.value === template);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Layout size={16} />
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
            <span className="text-xs text-muted-foreground">{t.description}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
