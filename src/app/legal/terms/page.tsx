"use client";

import React from 'react';
import {usePortfolio} from '@/components/context/PortfolioContext';
import {PageHeading} from "@/components/shared/PageHeading";
import {Card, CardContent} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Clock, Mail} from 'lucide-react';
import {showLucidIcon} from "@/components/lucid-icon-map";

export default function TermsPage() {
    const {langI18n, staticContentData} = usePortfolio();

    const {
        subtitle,
        lastUpdated,
        sections,
        contactTitle,
        contactText,
        footerText
    } = staticContentData.terms;

    const title = langI18n.terms;

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <PageHeading
                title={title}
                subTitle={subtitle}
            />

            {/* Last Updated */}
            <div className="mb-8">
                <Badge variant="outline" className="text-sm">
                    <Clock className="w-4 h-4 mr-2"/>
                    {langI18n.lastUpdated || 'Last Updated'}: {lastUpdated}
                </Badge>
            </div>

            {/* Main Terms Card */}
            <Card>
                <CardContent className="p-6 sm:p-8 space-y-8">
                    {sections.map((section) => {
                        return (
                            <div key={section.id}>
                                <div className="flex items-center gap-3 mb-3">
                                    {showLucidIcon(section.icon)}
                                    <h2 className="text-lg font-bold">{section.title}</h2>
                                </div>

                                <p className="text-muted-foreground mb-2">
                                    {section.content}
                                </p>

                                {section.list && section.list.length > 0 && (
                                    <ul className="text-muted-foreground space-y-1 ml-5">
                                        {section.list.map((item, idx) => (
                                            <li key={idx}>• {item}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        );
                    })}
                </CardContent>
            </Card>

            {/* Contact Box */}
            {contactText && (
                <Card className="mt-8 bg-primary/5 border-primary/20">
                    <CardContent className="p-6">
                        <div className="flex gap-4">
                            <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"/>
                            <div>
                                <h3 className="font-semibold mb-2">{contactTitle}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {contactText}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Simple Agreement Note */}
            {footerText && (
                <div className="mt-6 p-4 border rounded-lg bg-muted/30 text-center">
                    <p className="text-sm text-muted-foreground">
                        {footerText}
                    </p>
                </div>
            )}
        </div>
    );
}