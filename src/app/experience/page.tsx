"use client";

import React from 'react';
import { usePortfolio } from '@/components/context/PortfolioContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Calendar } from 'lucide-react';
import {PageHeading} from "@/components/shared/PageHeading";

export default function ExperiencePage() {
  const { appData, contentData, langI18n } = usePortfolio();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <PageHeading
          title={langI18n.experience}
          subTitle={"My professional journey and career milestones that have shaped my expertise."}
      />

      <div className="space-y-8">
        {contentData.experience.map((exp, index) => (
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

      <div className="mt-16 p-8 bg-muted/50 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Professional Highlights</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">
              {contentData.experience.length}+
            </div>
            <p className="text-muted-foreground">Years Experience</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">
              {contentData.projects.length}+
            </div>
            <p className="text-muted-foreground">Projects Completed</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">
              {Object.keys(contentData.skills).reduce((acc, key) => acc + contentData.skills[key].length, 0)}+
            </div>
            <p className="text-muted-foreground">Skills Mastered</p>
          </div>
        </div>
      </div>
    </div>
  );
}
