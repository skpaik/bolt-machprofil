"use client";

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Calendar } from 'lucide-react';

export default function CurriculumPage() {
  const { profile, language } = usePortfolio();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {language.curriculum}
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          My educational background and professional development journey.
        </p>
      </div>

      <div className="space-y-8">
        {profile.experience.map((exp, index) => (
          <Card key={index} className="p-6 md:p-8 hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg mt-1">
                    <Briefcase size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-1">
                      {exp.position}
                    </h3>
                    <p className="text-lg text-muted-foreground font-medium">
                      {exp.company}
                    </p>
                  </div>
                </div>
              </div>
              <Badge variant="secondary" className="gap-2 px-3 py-2 w-fit">
                <Calendar size={14} />
                {exp.period}
              </Badge>
            </div>
            <p className="text-foreground/80 leading-relaxed ml-0 md:ml-11">
              {exp.description}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
