"use client";

import React from 'react';
import { usePortfolio } from '@/components/context/PortfolioContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, BookOpen } from 'lucide-react';
import {PageHeading} from "@/components/shared/PageHeading";

export default function PublicationsPage() {
  const { appData, contentData, langI18n } = usePortfolio();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeading
            title={langI18n.publications}
            subTitle={"Research, articles, and contributions to the field."}
        />

      <div className="space-y-6">
        {contentData.projects.map((project, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-48 h-32 flex-shrink-0 overflow-hidden rounded-lg">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  {project.category && (
                    <Badge variant="secondary" className="mb-3">
                      {project.category}
                    </Badge>
                  )}
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <BookOpen size={16} />
                    Read More
                    <ExternalLink size={14} />
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
