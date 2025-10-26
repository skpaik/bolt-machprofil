"use client";

import React from 'react';
import {usePortfolio} from '@/context/PortfolioContext';
import {Button} from '@/components/ui/button';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from '@/components/ui/dropdown-menu';
import {Globe} from 'lucide-react';
import {languages, LanguageType} from '@/types/portfolio';

export default function LanguageSwitcher() {
    const {
        langI18n,
        languageType,
        setLanguageType,
    } = usePortfolio();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                    <Globe size={16}/>
                    <span className="hidden sm:inline">{langI18n.language}</span>
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
    );
}
