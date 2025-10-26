"use client";

import React from 'react';
import Link from 'next/link';
import { usePortfolio } from '@/context/PortfolioContext';
import TemplateSwitcher from '@/components/TemplateSwitcher';

export default function Header() {
  const { profile } = usePortfolio();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-foreground">{profile.name}</span>
          </Link>

          <TemplateSwitcher />
        </div>
      </div>
    </header>
  );
}
