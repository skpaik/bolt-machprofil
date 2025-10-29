"use client";

import React from 'react';
import { usePortfolio } from '@/components/context/PortfolioContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Mail, Phone, MapPin, Briefcase, GraduationCap, Award } from 'lucide-react';

export default function ResumePage() {
  const { appData, langI18n } = usePortfolio();

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <>
      <style jsx global>{`
        @media print {
          header, footer, button, .no-print {
            display: none !important;
          }
          body {
            background: white !important;
          }
          .print-container {
            max-width: 100% !important;
            padding: 0 !important;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 print-container">
        <div className="mb-8 flex justify-between items-center no-print">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">{langI18n.resume}</h1>
            <p className="text-muted-foreground">Professional curriculum vitae</p>
          </div>
          <Button onClick={handleDownloadPDF} size="lg" className="gap-2">
            <Download size={20} />
            {langI18n.downloadCV}
          </Button>
        </div>

        <div className="bg-card border rounded-lg p-8 md:p-12 space-y-8">
          <div className="text-center space-y-4 pb-8 border-b">
            <h2 className="text-4xl font-bold">{appData.name}</h2>
            <p className="text-2xl text-muted-foreground">{appData.title}</p>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>{appData.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>{appData.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{appData.location}</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-semibold flex items-center gap-2">
              <Award size={24} />
              Professional Summary
            </h3>
            <p className="text-muted-foreground leading-relaxed">{appData.bio}</p>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-semibold flex items-center gap-2">
              <Briefcase size={24} />
              {langI18n.experience}
            </h3>
            <div className="space-y-6">
              {appData.experience.map((exp, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <h4 className="text-lg font-semibold">{exp.position}</h4>
                      <p className="text-muted-foreground">{exp.company}</p>
                    </div>
                    <Badge variant="secondary">{exp.period}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-semibold flex items-center gap-2">
              <GraduationCap size={24} />
              {langI18n.education}
            </h3>
            <div className="space-y-6">
              {appData.education.map((edu, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <h4 className="text-lg font-semibold">{edu.degree}</h4>
                      <p className="text-muted-foreground">{edu.institution}</p>
                    </div>
                    <Badge variant="secondary">{edu.period}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">{langI18n.skills}</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {Object.entries(appData.skills).map(([category, skills]) => (
                <div key={category}>
                  <h4 className="font-semibold mb-3">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <Badge key={index} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t text-center text-sm text-muted-foreground">
            <p>This resume was generated on {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </>
  );
}
