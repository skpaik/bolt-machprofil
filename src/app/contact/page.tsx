"use client";

import React, { useState } from "react";
import { usePortfolio } from "@/components/context/PortfolioContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/lib/hooks/use-toast";
import { PageHeading } from "@/components/shared/PageHeading";
import { showLucidIcon } from "@/components/lucid-icon-map";

export default function ContactPage() {
  const { appData, langI18n } = usePortfolio();

  const { toast } = useToast();

  const emptyForm = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };
  const [formData, setFormData] = useState(emptyForm);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: langI18n.message_sent,
      description: langI18n.message_sent_description,
    });
    setFormData(emptyForm);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <PageHeading
        title={langI18n.contact}
        subTitle={langI18n.contact_sub_title}
      />

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">
              {langI18n.contact_info}
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg mt-1">
                  {showLucidIcon("mail", "text-primary", 20)}
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">
                    {langI18n.email}
                  </p>
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
                  {showLucidIcon("phone", "text-primary", 20)}
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">
                    {langI18n.phone}
                  </p>
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
                  {showLucidIcon("map-pin", "text-primary", 20)}
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">
                    {langI18n.location}
                  </p>
                  <p className="text-muted-foreground">{appData.location}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">
              {langI18n.connect_with_me}
            </h2>
            <div className="flex flex-wrap gap-3">
              {Object.entries(appData.social).map(([platform, url]) => (
                <Button
                  key={platform}
                  variant="outline"
                  className="gap-2"
                  asChild
                >
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {showLucidIcon(platform, "", 20)}
                    <span className="capitalize">{platform}</span>
                  </a>
                </Button>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-primary/5">
            <h3 className="font-semibold mb-2">{langI18n.quick_response}</h3>
            <p className="text-sm text-muted-foreground">
              {langI18n.quick_response_detail}
            </p>
          </Card>
        </div>

        <Card className="p-8">
          <h2 className="text-2xl font-semibold mb-6">
            {langI18n.send_message}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">{langI18n.name_star}</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={langI18n.your_name}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{langI18n.email} *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={langI18n.your_email}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">{langI18n.subject} *</Label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder={langI18n.whats_this_about}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">{langI18n.contact_message} *</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={langI18n.contact_message_placeholder}
                rows={6}
                required
              />
            </div>

            <Button type="submit" className="w-full gap-2" size="lg">
              {showLucidIcon("send", "", 18)}
              {langI18n.send_message}
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
}
