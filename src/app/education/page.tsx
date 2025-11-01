"use client";

import React from 'react';
import { usePortfolio } from '@/components/context/PortfolioContext';
import { PageHeading } from "@/components/shared/PageHeading";
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  GraduationCap,
  Calendar,
  MapPin,
  Award,
  BookOpen,
  Trophy,
  Star
} from 'lucide-react';

// Education interface - adaptable for any educational background
interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string | 'Present';
  location: string;
  gpa?: string;
  grade?: string;
  description?: string;
  achievements?: string[];
  coursework?: string[];
  activities?: string[];
  logo?: string;
  type: 'Degree' | 'Certificate' | 'Course' | 'Bootcamp' | 'Self-Study';
}

// Sample education data - covers various educational paths
const SAMPLE_EDUCATION: Education[] = [
  {
    id: '1',
    institution: 'Stanford University',
    degree: 'Master of Science',
    field: 'Computer Science',
    startDate: '2018-09',
    endDate: '2020-06',
    location: 'Stanford, CA',
    gpa: '3.9/4.0',
    type: 'Degree',
    description: 'Specialized in Artificial Intelligence and Machine Learning with focus on deep learning and natural language processing.',
    achievements: [
      'Graduated with Honors',
      'Teaching Assistant for CS231n: Deep Learning for Computer Vision',
      'Published research paper on neural network optimization',
      'Recipient of Graduate Fellowship Award'
    ],
    coursework: [
      'Machine Learning',
      'Deep Learning',
      'Natural Language Processing',
      'Computer Vision',
      'Algorithms & Data Structures',
      'Distributed Systems'
    ],
    activities: [
      'AI Research Lab Member',
      'Graduate Student Council',
      'Tech Mentorship Program'
    ]
  },
  {
    id: '2',
    institution: 'University of California, Berkeley',
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    startDate: '2014-09',
    endDate: '2018-05',
    location: 'Berkeley, CA',
    gpa: '3.8/4.0',
    type: 'Degree',
    description: 'Comprehensive computer science education with strong foundation in software engineering, algorithms, and system design.',
    achievements: [
      'Dean\'s List for 6 semesters',
      'First Place in Annual Hackathon 2017',
      'President of Computer Science Club',
      'Undergraduate Research Grant Recipient'
    ],
    coursework: [
      'Data Structures',
      'Operating Systems',
      'Database Systems',
      'Software Engineering',
      'Web Development',
      'Computer Networks'
    ],
    activities: [
      'Computer Science Student Association',
      'Open Source Contributor',
      'Peer Tutor for Programming Courses'
    ]
  },
  {
    id: '3',
    institution: 'Coursera - deeplearning.ai',
    degree: 'Deep Learning Specialization',
    field: 'Artificial Intelligence',
    startDate: '2020-01',
    endDate: '2020-06',
    location: 'Online',
    type: 'Certificate',
    description: 'Comprehensive 5-course specialization covering neural networks, CNNs, RNNs, and deployment strategies.',
    achievements: [
      'Completed all 5 courses with 100% scores',
      'Built and deployed 10+ deep learning projects',
      'Specialization Certificate with Distinction'
    ],
    coursework: [
      'Neural Networks and Deep Learning',
      'Improving Deep Neural Networks',
      'Structuring Machine Learning Projects',
      'Convolutional Neural Networks',
      'Sequence Models'
    ]
  },
  {
    id: '4',
    institution: 'AWS Training',
    degree: 'AWS Certified Solutions Architect',
    field: 'Cloud Computing',
    startDate: '2021-03',
    endDate: '2021-05',
    location: 'Online',
    type: 'Certificate',
    description: 'Professional certification demonstrating expertise in designing distributed systems on AWS.',
    achievements: [
      'Passed certification exam on first attempt',
      'Score: 920/1000',
      'Valid through 2024'
    ]
  },
  {
    id: '5',
    institution: 'General Assembly',
    degree: 'Full Stack Web Development Bootcamp',
    field: 'Web Development',
    startDate: '2017-06',
    endDate: '2017-09',
    location: 'San Francisco, CA',
    type: 'Bootcamp',
    description: 'Intensive 12-week immersive program covering modern web development technologies and best practices.',
    achievements: [
      'Built 4 full-stack applications',
      'Collaborated on group projects using Agile methodology',
      'Received Outstanding Student Award'
    ],
    coursework: [
      'HTML, CSS, JavaScript',
      'React & Redux',
      'Node.js & Express',
      'MongoDB & PostgreSQL',
      'RESTful API Design',
      'Authentication & Security'
    ]
  },
  {
    id: '6',
    institution: 'freeCodeCamp',
    degree: 'Responsive Web Design Certification',
    field: 'Front-End Development',
    startDate: '2016-03',
    endDate: '2016-06',
    location: 'Online',
    type: 'Certificate',
    description: 'Self-paced curriculum covering HTML, CSS, responsive design principles, and accessibility.',
    achievements: [
      'Completed 300+ hours of coursework',
      'Built 5 responsive web projects',
      'Earned certification'
    ]
  }
];

export default function EducationPage() {
  const { appData, langI18n } = usePortfolio();

  // Use real data if available, otherwise use sample data
  const education = SAMPLE_EDUCATION;

  const getTypeColor = (type: string) => {
    const colorMap: { [key: string]: string } = {
      'Degree': 'default',
      'Certificate': 'secondary',
      'Course': 'outline',
      'Bootcamp': 'destructive',
      'Self-Study': 'outline'
    };
    return colorMap[type] || 'outline';
  };

  const formatDate = (date: string) => {
    if (date === 'Present') return 'Present';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
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
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-border"/>

          <div className="space-y-8">
            {education.map((edu, index) => (
                <div key={edu.id} className="relative">
                  {/* Timeline dot */}
                  <div
                      className="hidden md:block absolute left-8 top-6 w-4 h-4 -ml-2 rounded-full bg-primary border-4 border-background z-10"/>

                  <Card className="md:ml-20 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-primary/10 text-primary">
                            <GraduationCap className="w-6 h-6"/>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl sm:text-2xl font-bold mb-1">{edu.degree}</h3>
                            <p className="text-lg font-semibold text-muted-foreground mb-2">
                              {edu.institution}
                            </p>
                            <p className="text-base text-muted-foreground">{edu.field}</p>
                          </div>
                        </div>
                        <Badge variant={getTypeColor(edu.type) as any} className="w-fit">
                          {edu.type}
                        </Badge>
                      </div>

                      {/* Date and Location */}
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4"/>
                          <span>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4"/>
                          <span>{edu.location}</span>
                        </div>
                        {edu.gpa && (
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4"/>
                              <span>GPA: {edu.gpa}</span>
                            </div>
                        )}
                        {edu.grade && (
                            <div className="flex items-center gap-2">
                              <Trophy className="w-4 h-4"/>
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
                              <Award className="w-5 h-5 text-primary"/>
                              <h4 className="font-semibold">Achievements</h4>
                            </div>
                            <ul className="space-y-2 ml-7">
                              {edu.achievements.map((achievement, idx) => (
                                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
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
                              <BookOpen className="w-5 h-5 text-primary"/>
                              <h4 className="font-semibold">Relevant Coursework</h4>
                            </div>
                            <div className="flex flex-wrap gap-2 ml-7">
                              {edu.coursework.map((course, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
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
                              <Trophy className="w-5 h-5 text-primary"/>
                              <h4 className="font-semibold">Activities & Leadership</h4>
                            </div>
                            <div className="flex flex-wrap gap-2 ml-7">
                              {edu.activities.map((activity, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
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
              {education.filter(e => e.type === 'Degree').length}
            </div>
            <div className="text-sm text-muted-foreground">Degrees</div>
          </Card>
          <Card className="text-center p-6">
            <div className="text-3xl font-bold text-primary mb-2">
              {education.filter(e => e.type === 'Certificate').length}
            </div>
            <div className="text-sm text-muted-foreground">Certificates</div>
          </Card>
          <Card className="text-center p-6">
            <div className="text-3xl font-bold text-primary mb-2">
              {education.filter(e => e.type === 'Bootcamp').length}
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