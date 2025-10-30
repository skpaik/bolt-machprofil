"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePortfolio } from '@/components/context/PortfolioContext';
import { Home, Briefcase, Calendar, FileText, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {MenuService} from "@/lib/services/menu.service";

export default function BottomNav() {
  const { langI18n } = usePortfolio();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        // Scrolling up or at the top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 10) {
        // Scrolling down
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const isMoreActive = MenuService.moreMenuItems.some((item) => pathname === item.path);

  return (
      <nav
          className={`fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-lg transition-transform duration-300 ${
              isVisible ? 'translate-y-0' : 'translate-y-full'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-around items-center h-16">
            {MenuService.primaryMenuItems.map((item) => {
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
                  <span className="text-xs mt-1">{langI18n.more}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="top" className="mb-2">
                {MenuService.moreMenuItems.map((item) => {
                  const active = isActive(item.path);
                  return (
                      <DropdownMenuItem key={item.key} asChild>
                        <Link
                            href={item.path}
                            className={`cursor-pointer ${
                                active ? 'bg-accent' : ''
                            }`}
                        >
                          {langI18n[item.key as keyof typeof langI18n]}
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