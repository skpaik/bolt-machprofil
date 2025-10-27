"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Calendar } from 'lucide-react';

export default function CertificatePage() {
  const certificates = [
    {
      id: 1,
      title: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2024',
      credential: 'AWS-CSA-123456',
      image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 2,
      title: 'Professional Scrum Master I',
      issuer: 'Scrum.org',
      date: '2023',
      credential: 'PSM-789012',
      image: 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      id: 3,
      title: 'Google Cloud Professional Developer',
      issuer: 'Google Cloud',
      date: '2023',
      credential: 'GCP-PD-345678',
      image: 'https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Certificates
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Professional certifications and achievements demonstrating expertise and commitment to continuous learning.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certificates.map((cert) => (
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
