"use client";

import React from "react";
import { usePortfolio } from "@/components/context/PortfolioContext";
import { PageHeading } from "@/components/shared/PageHeading";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { showLucidIcon } from "@/components/lucid-icon-map";
import { formatDateShort } from "@/lib/helpers/date.helper";
import {useContentLoader} from "@/components/hooks/use-content-loader";
import {BlogPost, Experience} from "@/lib/types/portfolio";

export default function ExperiencePage() {
  const { langI18n, profileType, languageType } = usePortfolio();

  // Use real data if available, otherwise use sample data
  const { data: experiences, loading, error } = useContentLoader<Experience[]>(
      profileType,
      languageType,
      "experience_list",
      []
  );

  // Calculate total experience
  const totalYears = Math.floor(
    experiences.reduce((total, exp) => {
      const start = new Date(exp.startDate);
      const end =
        exp.endDate === "Present" ? new Date() : new Date(exp.endDate);
      return total + (end.getTime() - start.getTime());
    }, 0) /
      (1000 * 60 * 60 * 24 * 365),
  );

  const getEmploymentTypeColor = (type: string) => {
    switch (type) {
      case "Full-time":
        return "default";
      case "Part-time":
        return "secondary";
      case "Contract":
        return "outline";
      case "Freelance":
        return "secondary";
      case "Internship":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <>
      <PageHeading
        title={langI18n.experience}
        subTitle={langI18n.experience_sub_title}
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <Card className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5">
          {showLucidIcon("trending-up", "w-8 h-8 mx-auto mb-3 text-primary")}
          <div className="text-3xl font-bold mb-1">{totalYears}+</div>
          <div className="text-sm text-muted-foreground">
            {langI18n.years_experience}
          </div>
        </Card>

        <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          {showLucidIcon(
            "building2",
            "w-8 h-8 mx-auto mb-3 text-blue-600 dark:text-blue-400",
          )}
          <div className="text-3xl font-bold mb-1">{experiences.length}</div>
          <div className="text-sm text-muted-foreground">
            {langI18n.companies}
          </div>
        </Card>

        <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          {showLucidIcon(
            "award",
            "w-8 h-8 mx-auto mb-3 text-green-600 dark:text-green-400",
          )}
          <div className="text-3xl font-bold mb-1">
            {experiences.reduce(
              (sum, exp) => sum + (exp.achievements?.length || 0),
              0,
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            {langI18n.achievements}
          </div>
        </Card>

        <Card className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
          {showLucidIcon(
            "target",
            "w-8 h-8 mx-auto mb-3 text-purple-600 dark:text-purple-400",
          )}
          <div className="text-3xl font-bold mb-1">
            {experiences.reduce(
              (sum, exp) => sum + (exp.projects?.length || 0),
              0,
            )}
            +
          </div>
          <div className="text-sm text-muted-foreground">
            {langI18n.projects}
          </div>
        </Card>
      </div>

      {/* Experience Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative">
              {/* Timeline dot */}
              <div
                className={`hidden md:block absolute left-8 top-8 w-4 h-4 -ml-2 rounded-full border-4 border-background z-10 ${
                  exp.current
                    ? "bg-primary animate-pulse"
                    : "bg-muted-foreground"
                }`}
              />

              <Card
                className={`md:ml-20 hover:shadow-lg transition-shadow ${
                  exp.current ? "border-2 border-primary" : ""
                }`}
              >
                {exp.current && (
                  <div className="bg-primary text-primary-foreground text-xs font-semibold py-1 px-4 text-center flex items-center justify-center gap-1">
                    {showLucidIcon("sparkles", "w-3 h-3")}
                    {langI18n.current_position}
                  </div>
                )}

                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4">
                    {/* Company Logo */}
                    {exp.logo && (
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={exp.logo}
                          alt={exp.company}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Header Content */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                        <div>
                          <h3 className="text-2xl font-bold mb-1">
                            {exp.position}
                          </h3>
                          <div className="flex items-center gap-2 text-lg font-semibold text-primary mb-2">
                            {exp.companyUrl ? (
                              <a
                                href={exp.companyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 hover:underline"
                              >
                                {exp.company}
                                {showLucidIcon("external-link", "w-4 h-4")}
                              </a>
                            ) : (
                              <span>{exp.company}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge
                            variant={
                              getEmploymentTypeColor(exp.employmentType) as any
                            }
                          >
                            {exp.employmentType}
                          </Badge>
                          <Badge variant="outline">{exp.locationType}</Badge>
                        </div>
                      </div>

                      {/* Date and Location */}
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-2">
                          {showLucidIcon("calendar", "w-4 h-4")}
                          <span>
                            {formatDateShort(exp.startDate)} -{" "}
                            {formatDateShort(exp.endDate)}
                          </span>
                          {exp.duration && <span>({exp.duration})</span>}
                        </div>
                        <div className="flex items-center gap-2">
                          {showLucidIcon("map-pin", "w-4 h-4")}
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground mb-4">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Responsibilities */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      {showLucidIcon("briefcase", "w-5 h-5 text-primary")}
                      <h4 className="font-semibold">
                        {langI18n.key_responsibilities}
                      </h4>
                    </div>
                    <ul className="space-y-2 ml-7">
                      {exp.responsibilities.map((resp, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          {showLucidIcon(
                            "chevron-right",
                            "w-4 h-4 text-primary mt-0.5 flex-shrink-0",
                          )}
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Achievements */}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        {showLucidIcon("award", "w-5 h-5 text-primary")}
                        <h4 className="font-semibold">
                          {langI18n.key_achievements}
                        </h4>
                      </div>
                      <ul className="space-y-2 ml-7">
                        {exp.achievements.map((achievement, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-muted-foreground flex items-start gap-2"
                          >
                            {showLucidIcon(
                              "chevron-right",
                              "w-4 h-4 text-primary mt-0.5 flex-shrink-0",
                            )}
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      {showLucidIcon("target", "w-5 h-5 text-primary")}
                      <h4 className="font-semibold">
                        {langI18n.technologies_used}
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2 ml-7">
                      {exp.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Projects */}
                  {exp.projects && exp.projects.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        {showLucidIcon("users", "w-5 h-5 text-primary")}
                        <h4 className="font-semibold">
                          {langI18n.notable_projects}
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-2 ml-7">
                        {exp.projects.map((project) => (
                          <Badge key={project} variant="outline">
                            {project}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <Card className="mt-12 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">{langI18n.cta_title}</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            {langI18n.cta_descriptions_experience}
          </p>
          <Button size="lg">
            Get in Touch
            {showLucidIcon("chevron-right", "w-5 h-5 ml-2")}
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
