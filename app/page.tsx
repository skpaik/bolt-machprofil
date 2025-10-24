"use client";

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { profile, language } = usePortfolio();

  const getSocialIcon = (platform: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      github: <Github size={20} />,
      linkedin: <Linkedin size={20} />,
      twitter: <Twitter size={20} />,
      instagram: <Instagram size={20} />,
      facebook: <Facebook size={20} />,
    };
    return icons[platform] || null;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              {profile.name}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-6">
              {profile.title}
            </p>
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
              {profile.bio}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Mail size={18} />
              <a href={`mailto:${profile.email}`} className="hover:text-foreground transition-colors">
                {profile.email}
              </a>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Phone size={18} />
              <span>{profile.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin size={18} />
              <span>{profile.location}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {Object.entries(profile.social).map(([platform, url]) => (
              <Button key={platform} variant="outline" size="icon" asChild>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {getSocialIcon(platform)}
                </a>
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            <Button asChild size="lg">
              <Link href="/contact">{language.getInTouch}</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/projects">{language.viewMore}</Link>
            </Button>
          </div>
        </div>

        <div className="flex justify-center">
          <Card className="p-8 w-full max-w-md">
            <div className="flex flex-col items-center space-y-6">
              <Avatar className="w-64 h-64">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback className="text-4xl">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              <div className="text-center space-y-2">
                <h3 className="text-2xl font-semibold">{profile.name}</h3>
                <p className="text-muted-foreground">{profile.title}</p>
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                  <MapPin size={14} />
                  {profile.location}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {profile.projects.slice(0, 4).map((project, index) => (
          <Card key={index} className="overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="aspect-video overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
