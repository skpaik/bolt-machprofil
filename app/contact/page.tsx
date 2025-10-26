"use client";

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const { appData, langI18n } = usePortfolio();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {langI18n.contact}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {langI18n.getInTouch}. I&apos;d love to hear from you and discuss how we can work together.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg mt-1">
                  <Mail className="text-primary" size={20} />
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Email</p>
                  <a
                    href={`mailto:${appData.email}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {appData.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg mt-1">
                  <Phone className="text-primary" size={20} />
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Phone</p>
                  <a
                    href={`tel:${appData.phone}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {appData.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg mt-1">
                  <MapPin className="text-primary" size={20} />
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Location</p>
                  <p className="text-muted-foreground">{appData.location}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Connect With Me</h2>
            <div className="flex flex-wrap gap-3">
              {Object.entries(appData.social).map(([platform, url]) => (
                <Button key={platform} variant="outline" className="gap-2" asChild>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {getSocialIcon(platform)}
                    <span className="capitalize">{platform}</span>
                  </a>
                </Button>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-primary/5">
            <h3 className="font-semibold mb-2">Quick Response</h3>
            <p className="text-sm text-muted-foreground">
              I typically respond to inquiries within 24-48 hours during business days.
            </p>
          </Card>
        </div>

        <Card className="p-8">
          <h2 className="text-2xl font-semibold mb-6">{langI18n.sendMessage}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What's this about?"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me more about your project or inquiry..."
                rows={6}
                required
              />
            </div>

            <Button type="submit" className="w-full gap-2" size="lg">
              <Send size={18} />
              {langI18n.sendMessage}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
