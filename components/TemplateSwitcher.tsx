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
import { TemplateType } from '@/types/portfolio';

export default function TemplateSwitcher() {
  const { template, setTemplate } = usePortfolio();

  const templates: { value: TemplateType; label: string; description: string }[] = [
    { value: 'modern', label: 'Modern', description: 'Gradient & bold design' },
    { value: 'classic', label: 'Classic', description: 'Traditional & elegant' },
    { value: 'minimal', label: 'Minimal', description: 'Clean & simple' },
  ];

  const currentTemplate = templates.find((t) => t.value === template);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Layout size={16} />
          <span className="hidden sm:inline">{currentTemplate?.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {templates.map((t) => (
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
