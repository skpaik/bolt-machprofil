"use client";

import React from 'react';
import { usePortfolio } from '@/components/context/PortfolioContext';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {ConfigData} from "@/data/config-data";
import {ThemeType} from "@/lib/types/portfolio";


export default function ThemeSwitcher() {
    const { theme, setTheme, langI18n } = usePortfolio();

    const currentTheme =ConfigData.themes.find(t => t.value === theme) || ConfigData.themes[2];
    const CurrentIcon = currentTheme.icon;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                    <CurrentIcon size={16} />
                    <span className="hidden sm:inline">{langI18n.theme}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {ConfigData.themes.map((t) => {
                    const Icon = t.icon;
                    return (
                        <DropdownMenuItem
                            key={t.value}
                            onClick={() => setTheme(t.value as ThemeType)}
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <Icon size={16} />
                            <span className="font-medium">{t.label}</span>
                            {theme === t.value && <span className="ml-auto text-xs">✓</span>}
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}