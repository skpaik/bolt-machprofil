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
import {Globe, Layout} from 'lucide-react';
import {ConfigData} from "@/data/config-data";

export default function ProfileSwitcher() {
  const {
    langI18n,
    profileType,
    setProfileType
  } = usePortfolio();

  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Globe size={16} />
            <span className="hidden sm:inline">{langI18n.profile}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {ConfigData.profiles.map((prof) => (
              <DropdownMenuItem
                  key={prof.code}
                  onClick={() => setProfileType(prof.code)}
                  className={profileType === prof.code ? 'bg-accent' : ''}
              >
                {prof.name}
              </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
  );
}
