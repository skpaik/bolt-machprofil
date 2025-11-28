"use client";

import React from "react";
import { usePortfolio } from "@/components/context/PortfolioContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Download,
  Mail,
  MapPin,
  Phone,
  Globe,
  Linkedin,
  Github,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Star,
  Calendar,
  ExternalLink,
  FileText,
  Printer,
} from "lucide-react";
import { formatDateShort } from "@/lib/helpers/date.helper";

export default function ResumePage() {
  const {
    experienceContentData,
    educationContentData,
    skillContentData,
    certificateContentData,
    langI18n,
    contentData,
  } = usePortfolio();
const     aboutContent =contentData.about_content

  // Aggregate data from different sources
  const profile = aboutContent.hero || {
    name: "John Doe",
    title: "Full Stack Developer & Designer",
    email: "hello@johndoe.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "https://johndoe.com",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
  };

  const summary =
    aboutContent.intro ||
    "Passionate full-stack developer with 8+ years of experience building scalable web applications. Expert in React, Node.js, and cloud technologies. Strong focus on clean code, user experience, and continuous learning.";

  const experiences = experienceContentData;
  const education = educationContentData;
  const skills = skillContentData;
  const certificates = certificateContentData;

  const resumePdfUrl = profile.resumeUrl || "/resume.pdf";

  const handleDownload = () => {
    window.open(resumePdfUrl, "_blank");
  };

  const handlePrint = () => {
    window.print();
  };

  // Group skills by category
  const groupedSkills = skills.reduce((acc: any, skill: any) => {
    const category = skill.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Action Bar - Hidden in Print */}
      <div className="print:hidden sticky top-0 z-10 bg-background border-b shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Resume</h1>
              <p className="text-sm text-muted-foreground">
                Professional CV & Portfolio
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
              <Button onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:p-0">
        <Card className="print:shadow-none print:border-0">
          <CardContent className="p-8 sm:p-12 space-y-8 print:p-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row gap-6 items-start print:flex-row">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-32 h-32 rounded-full border-4 border-primary/20 object-cover print:w-24 print:h-24"
                />
              </div>

              {/* Contact Info */}
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2 print:text-3xl">
                  {profile.name}
                </h1>
                <h2 className="text-2xl text-primary font-semibold mb-4 print:text-xl">
                  {profile.title}
                </h2>

                <div className="grid sm:grid-cols-2 gap-2 text-sm">
                  {profile.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <a
                        href={`mailto:${profile.email}`}
                        className="hover:text-primary"
                      >
                        {profile.email}
                      </a>
                    </div>
                  )}
                  {profile.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <a
                        href={`tel:${profile.phone}`}
                        className="hover:text-primary"
                      >
                        {profile.phone}
                      </a>
                    </div>
                  )}
                  {profile.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                  {profile.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <a
                        href={profile.website}
                        className="hover:text-primary"
                        target="_blank"
                      >
                        {profile.website.replace("https://", "")}
                      </a>
                    </div>
                  )}
                  {profile.linkedin && (
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-muted-foreground" />
                      <a
                        href={`https://${profile.linkedin}`}
                        className="hover:text-primary"
                        target="_blank"
                      >
                        {profile.linkedin}
                      </a>
                    </div>
                  )}
                  {profile.github && (
                    <div className="flex items-center gap-2">
                      <Github className="w-4 h-4 text-muted-foreground" />
                      <a
                        href={`https://${profile.github}`}
                        className="hover:text-primary"
                        target="_blank"
                      >
                        {profile.github}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <hr className="border-border" />

            {/* Summary Section */}
            <div>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Professional Summary
              </h3>
              <p className="text-muted-foreground leading-relaxed">{summary}</p>
            </div>

            <hr className="border-border print:hidden" />

            {/* Experience Section */}
            {experiences.length > 0 && (
              <div className="print:break-inside-avoid">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  Work Experience
                </h3>
                <div className="space-y-6">
                  {experiences.map((exp: any) => (
                    <div key={exp.id} className="print:break-inside-avoid">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-lg font-bold">{exp.position}</h4>
                          <div className="text-primary font-semibold">
                            {exp.company}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground text-right">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDateShort(exp.startDate)} -{" "}
                            {formatDateShort(exp.endDate)}
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" />
                            {exp.location}
                          </div>
                        </div>
                      </div>

                      {exp.description && (
                        <p className="text-sm text-muted-foreground mb-2">
                          {exp.description}
                        </p>
                      )}

                      {exp.responsibilities &&
                        exp.responsibilities.length > 0 && (
                          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-2">
                            {exp.responsibilities
                              .slice(0, 4)
                              .map((resp: string, idx: number) => (
                                <li key={idx}>{resp}</li>
                              ))}
                          </ul>
                        )}

                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {exp.technologies.map((tech: string) => (
                            <Badge
                              key={tech}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {experiences.length > 0 && (
              <hr className="border-border print:hidden" />
            )}

            {/* Education Section */}
            {education.length > 0 && (
              <div className="print:break-inside-avoid">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  Education
                </h3>
                <div className="space-y-4">
                  {education.map((edu: any) => (
                    <div key={edu.id}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold">{edu.degree}</h4>
                          <div className="text-primary font-semibold">
                            {edu.institution}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {edu.field}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground text-right">
                          <div>
                            {formatDateShort(edu.startDate)} -{" "}
                            {formatDateShort(edu.endDate)}
                          </div>
                          {edu.gpa && (
                            <div className="font-semibold">GPA: {edu.gpa}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {education.length > 0 && (
              <hr className="border-border print:hidden" />
            )}

            {/* Skills Section */}
            {Object.keys(groupedSkills).length > 0 && (
              <div className="print:break-inside-avoid">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5 text-primary" />
                  Skills & Technologies
                </h3>
                <div className="space-y-4">
                  {Object.entries(groupedSkills).map(
                    ([category, categorySkills]: [string, any]) => (
                      <div key={category}>
                        <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                          {category}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {categorySkills
                            .sort(
                              (a: any, b: any) => b.proficiency - a.proficiency,
                            )
                            .slice(0, 10)
                            .map((skill: any) => (
                              <Badge
                                key={skill.id}
                                variant="outline"
                                className="text-sm"
                              >
                                {skill.name}
                                {skill.proficiency && (
                                  <span className="ml-1 text-xs text-muted-foreground">
                                    ({skill.proficiency}%)
                                  </span>
                                )}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

            {Object.keys(groupedSkills).length > 0 &&
              certificates.length > 0 && (
                <hr className="border-border print:hidden" />
              )}

            {/* Certifications Section */}
            {certificates.length > 0 && (
              <div className="print:break-inside-avoid">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Certifications
                </h3>
                <div className="space-y-3">
                  {certificates.slice(0, 6).map((cert: any) => (
                    <div
                      key={cert.id}
                      className="flex justify-between items-start"
                    >
                      <div>
                        <h4 className="font-semibold">{cert.name}</h4>
                        <div className="text-sm text-primary">
                          {cert.issuer}
                        </div>
                        {cert.credentialId && (
                          <div className="text-xs text-muted-foreground">
                            ID: {cert.credentialId}
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground text-right">
                        <div>{formatDateShort(cert.issueDate)}</div>
                        {cert.expiryDate && cert.expiryDate !== "No Expiry" && (
                          <div className="text-xs">
                            Expires: {formatDateShort(cert.expiryDate)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer Note - Hidden in Print */}
        <div className="print:hidden text-center text-sm text-muted-foreground mt-8 mb-4">
          <p>
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="mt-2">
            For the most up-to-date information, visit my website
          </p>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }

          .print\\:hidden {
            display: none !important;
          }

          .print\\:break-inside-avoid {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .print\\:p-8 {
            padding: 2rem;
          }

          .print\\:shadow-none {
            box-shadow: none !important;
          }

          .print\\:border-0 {
            border: none !important;
          }

          @page {
            margin: 0.75in;
            size: letter;
          }
        }
      `}</style>
    </div>
  );
}
