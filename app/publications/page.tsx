"use client";

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, BookOpen } from 'lucide-react';

export default function PublicationsPage() {
  const { profile } = usePortfolio();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Publications
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Research, articles, and contributions to the field.
        </p>
      </div>

      <div className="space-y-6">
        {profile.projects.map((project, index) => (
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
