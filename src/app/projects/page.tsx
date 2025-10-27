"use client";

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

export default function ProjectsPage() {
  const { appData, langI18n } = usePortfolio();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {langI18n.projects}
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          A showcase of my work, demonstrating expertise and passion across various projects.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {appData.projects.map((project, index) => (
          <Card key={index} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="aspect-video overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                {project.category && (
                  <Badge variant="secondary" className="mb-3">
                    {project.category}
                  </Badge>
                )}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>

              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}

              <Button variant="outline" className="w-full gap-2" asChild>
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  {langI18n.viewMore}
                  <ExternalLink size={16} />
                </a>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
