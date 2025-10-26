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
import {Globe, Layout} from 'lucide-react';
import {ProfileType, TemplateType} from '@/types/portfolio';

export default function ProfileSwitcher() {
  const {
    langI18n,
    profileType,
    setProfileType
  } = usePortfolio();

  const profiles: { code: ProfileType; name: string }[] = [
    { code: 'developer', name: 'Developer' },
    { code: 'photographer', name: 'Photographer' },
    { code: 'teacher', name: 'Teacher' },
    { code: 'student', name: 'Student' },
  ];

  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Globe size={16} />
            <span className="hidden sm:inline">{langI18n.profile}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {profiles.map((prof) => (
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
