"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePortfolio } from '@/context/PortfolioContext';
import { Home, Briefcase, Calendar, FileText, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function BottomNav() {
  const { langI18n } = usePortfolio();
  const pathname = usePathname();

  const primaryMenuItems = [
    { key: 'home', path: '/', icon: Home },
    { key: 'projects', path: '/projects', icon: Briefcase },
    { key: 'experience', path: '/experience', icon: Calendar },
    { key: 'blog', path: '/blog', icon: FileText },
  ];

  const moreMenuItems = [
    { key: 'publications', path: '/publications', label: 'Publications' },
    { key: 'certificate', path: '/certificate', label: 'Certificates' },
    { key: 'gallery', path: '/gallery', label: 'Gallery' },
  ];

  const isActive = (path: string) => {
    return pathname === path;
  };

  const isMoreActive = moreMenuItems.some((item) => pathname === item.path);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {primaryMenuItems.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;

            return (
              <Link
                key={item.key}
                href={item.path}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  active
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon size={24} />
                <span className="text-xs mt-1">
                  {langI18n[item.key as keyof typeof langI18n]}
                </span>
              </Link>
            );
          })}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  isMoreActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <MoreHorizontal size={24} />
                <span className="text-xs mt-1">More</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="top" className="mb-2">
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
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
