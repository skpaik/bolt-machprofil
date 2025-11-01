"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Calendar } from 'lucide-react';
import {PageHeading} from "@/components/shared/PageHeading";
import {usePortfolio} from "@/components/context/PortfolioContext";

export default function CertificatePage() {

  const { appData, contentData, langI18n } = usePortfolio();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeading
            title={langI18n.certificates}
            subTitle={"Professional certifications and achievements demonstrating expertise and commitment to continuous learning."}
        />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {contentData.certificates.map((cert) => (
          <Card key={cert.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Award size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {cert.issuer}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar size={14} />
                <span>{cert.date}</span>
              </div>

              <Badge variant="outline" className="font-mono text-xs">
                {cert.credential}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
