"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePortfolio } from '@/context/PortfolioContext';
import { Menu, X, MoreHorizontal } from 'lucide-react';
import TemplateSwitcher from '@/components/TemplateSwitcher';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export default function Header() {
  const { profile, language } = usePortfolio();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { key: 'home', path: '/' },
    { key: 'projects', path: '/projects' },
    { key: 'experience', path: '/experience' },
    { key: 'blog', path: '/blog' },
    { key: 'skills', path: '/skills' },
    { key: 'resume', path: '/resume' },
    { key: 'contact', path: '/contact' },
  ];

  const primaryMenuItems = menuItems.slice(0, 4);
  const moreMenuItems = menuItems.slice(4);

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-foreground">{profile.name}</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {primaryMenuItems.map((item) => {
              const active = isActive(item.path);

              return (
                <Link
                  key={item.key}
                  href={item.path}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    active
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground/80 hover:text-foreground hover:bg-accent'
                  }`}
                >
                  {language[item.key as keyof typeof language]}
                </Link>
              );
            })}

            {moreMenuItems.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1">
                    More
                    <MoreHorizontal size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {moreMenuItems.map((item) => {
                    const active = isActive(item.path);
                    return (
                      <DropdownMenuItem key={item.key} asChild>
                        <Link
                          href={item.path}
                          className={`cursor-pointer ${
                            active ? 'bg-accent' : ''
                          }`}
                        >
                          {language[item.key as keyof typeof language]}
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <TemplateSwitcher />
          </nav>

          <button
            className="md:hidden p-2 rounded-md text-foreground hover:bg-accent"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              {menuItems.map((item) => {
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.key}
                    href={item.path}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      active
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground/80 hover:text-foreground hover:bg-accent'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {language[item.key as keyof typeof language]}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
