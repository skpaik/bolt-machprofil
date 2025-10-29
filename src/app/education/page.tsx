"use client";

import React from 'react';
import { usePortfolio } from '@/components/context/PortfolioContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Calendar } from 'lucide-react';

export default function EducationPage() {
  const { appData, langI18n } = usePortfolio();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {langI18n.education}
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          My academic journey and educational achievements that have shaped my career.
        </p>
      </div>

      <div className="space-y-8">
        {appData.experience.map((exp, index) => (
          <Card key={index} className="p-6 md:p-8 hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg mt-1">
                    <GraduationCap size={20} className="text-primary" />
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

      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <GraduationCap size={24} className="text-primary" />
            </div>
          </div>
          <h3 className="font-semibold text-lg mb-2">Academic Excellence</h3>
          <p className="text-3xl font-bold text-primary mb-2">{appData.experience.length}+</p>
          <p className="text-sm text-muted-foreground">Years of Study</p>
        </Card>

        <Card className="p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <GraduationCap size={24} className="text-primary" />
            </div>
          </div>
          <h3 className="font-semibold text-lg mb-2">Projects Completed</h3>
          <p className="text-3xl font-bold text-primary mb-2">{appData.projects.length}+</p>
          <p className="text-sm text-muted-foreground">Academic Projects</p>
        </Card>

        <Card className="p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <GraduationCap size={24} className="text-primary" />
            </div>
          </div>
          <h3 className="font-semibold text-lg mb-2">Skills Acquired</h3>
          <p className="text-3xl font-bold text-primary mb-2">
            {Object.keys(appData.skills).reduce((acc, key) => acc + appData.skills[key].length, 0)}+
          </p>
          <p className="text-sm text-muted-foreground">Technical Skills</p>
        </Card>
      </div>
    </div>
  );
}
