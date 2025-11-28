"use client";

import React from "react";
import { usePortfolio } from "@/components/context/PortfolioContext";
import { PageHeading } from "@/components/shared/PageHeading";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { showLucidIcon } from "@/components/lucid-icon-map";
import { formatDateShort } from "@/lib/helpers/date.helper";

export default function EducationPage() {
  const { educationContentData, langI18n } = usePortfolio();

  // Use real data if available, otherwise use sample data
  const education = educationContentData;

  const getTypeColor = (type: string) => {
    const colorMap: { [key: string]: string } = {
      Degree: "default",
      Certificate: "secondary",
      Course: "outline",
      Bootcamp: "destructive",
      "Self-Study": "outline",
    };
    return colorMap[type] || "outline";
  };

  return (
    <>
      <PageHeading
        title={langI18n.education || "Education"}
        subTitle="My academic journey, certifications, and continuous learning experiences that shape my expertise and professional growth."
      />

      {/* Education Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-8">
          {education.map((edu, index) => (
            <div key={edu.id} className="relative">
              {/* Timeline dot */}
              <div className="hidden md:block absolute left-8 top-6 w-4 h-4 -ml-2 rounded-full bg-primary border-4 border-background z-10" />

              <Card className="md:ml-20 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary">
                        {showLucidIcon("graduation-cap", "w-6 h-6")}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl font-bold mb-1">
                          {edu.degree}
                        </h3>
                        <p className="text-lg font-semibold text-muted-foreground mb-2">
                          {edu.institution}
                        </p>
                        <p className="text-base text-muted-foreground">
                          {edu.field}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={getTypeColor(edu.type) as any}
                      className="w-fit"
                    >
                      {edu.type}
                    </Badge>
                  </div>

                  {/* Date and Location */}
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      {showLucidIcon("calendar", "w-4 h-4")}
                      <span>
                        {formatDateShort(edu.startDate)} -{" "}
                        {formatDateShort(edu.endDate)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {showLucidIcon("map-pin", "w-4 h-4")}
                      <span>{edu.location}</span>
                    </div>
                    {edu.gpa && (
                      <div className="flex items-center gap-2">
                        {showLucidIcon("star", "w-4 h-4")}
                        <span>GPA: {edu.gpa}</span>
                      </div>
                    )}
                    {edu.grade && (
                      <div className="flex items-center gap-2">
                        {showLucidIcon("trophy", "w-4 h-4")}
                        <span>Grade: {edu.grade}</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  {edu.description && (
                    <p className="text-muted-foreground mb-4">
                      {edu.description}
                    </p>
                  )}
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Achievements */}
                  {edu.achievements && edu.achievements.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        {showLucidIcon("award", "w-5 h-5 text-primary")}
                        <h4 className="font-semibold">Achievements</h4>
                      </div>
                      <ul className="space-y-2 ml-7">
                        {edu.achievements.map((achievement, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-muted-foreground flex items-start gap-2"
                          >
                            <span className="text-primary mt-1">•</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Coursework */}
                  {edu.coursework && edu.coursework.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        {showLucidIcon("book-open", "w-5 h-5 text-primary")}
                        <h4 className="font-semibold">Relevant Coursework</h4>
                      </div>
                      <div className="flex flex-wrap gap-2 ml-7">
                        {edu.coursework.map((course, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs"
                          >
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Activities */}
                  {edu.activities && edu.activities.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        {showLucidIcon("Trophy", "w-5 h-5 text-primary")}
                        <h4 className="font-semibold">
                          Activities & Leadership
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-2 ml-7">
                        {edu.activities.map((activity, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="text-xs"
                          >
                            {activity}
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

      {/* Summary Stats */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center p-6">
          <div className="text-3xl font-bold text-primary mb-2">
            {education.filter((e) => e.type === "Degree").length}
          </div>
          <div className="text-sm text-muted-foreground">Degrees</div>
        </Card>
        <Card className="text-center p-6">
          <div className="text-3xl font-bold text-primary mb-2">
            {education.filter((e) => e.type === "Certificate").length}
          </div>
          <div className="text-sm text-muted-foreground">Certificates</div>
        </Card>
        <Card className="text-center p-6">
          <div className="text-3xl font-bold text-primary mb-2">
            {education.filter((e) => e.type === "Bootcamp").length}
          </div>
          <div className="text-sm text-muted-foreground">Bootcamps</div>
        </Card>
        <Card className="text-center p-6">
          <div className="text-3xl font-bold text-primary mb-2">
            {education.length}
          </div>
          <div className="text-sm text-muted-foreground">Total</div>
        </Card>
      </div>
    </>
  );
}
