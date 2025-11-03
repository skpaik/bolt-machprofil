"use client";

import React from 'react';
import {usePortfolio} from '@/components/context/PortfolioContext';
import {PageHeading} from "@/components/shared/PageHeading";
import {Card, CardContent} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {CheckCircle, Clock, Mail} from 'lucide-react';
import { showLucidIcon} from "@/components/lucid-icon-map";

export default function TermsPage() {
    const {appData, staticContentData, langI18n} = usePortfolio();
    return (
        <>
            <PageHeading
                title="Terms & Conditions"
                subTitle="Please read these terms carefully before using our services."
            />

            {/* Last Updated Badge */}
            <div className="mb-8">
                <Badge variant="outline" className="text-sm">
                    <Clock className="w-4 h-4 mr-2"/>
                    Last Updated: November 2, 2024
                </Badge>
            </div>

            {/* Terms Sections */}
            <div className="space-y-6">
                {staticContentData.terms.map((section, index) => (
                    <Card key={section.id} id={section.id.toString()}>
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                                    {showLucidIcon(section.icon)}
                                </div>
                                <h2 className="text-xl font-bold">
                                    {index + 1}. {section.title}
                                </h2>
                            </div>

                            <div className="space-y-3 ml-14">
                                {section.content.map((paragraph, idx) => (
                                    <p key={idx} className="text-muted-foreground leading-relaxed">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Contact Section */}
            <Card className="mt-8 bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                    <div className="flex gap-4">
                        <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1"/>
                        <div>
                            <h3 className="font-semibold mb-2">Questions About These Terms?</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                If you have any questions about these Terms and Conditions, please contact us.
                            </p>
                            <Button variant="outline">
                                Contact Us
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Agreement Section */}
            <div className="mt-8 p-6 border-2 border-primary/20 rounded-lg bg-primary/5">
                <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1"/>
                    <p className="text-sm text-muted-foreground">
                        By using our services, you acknowledge that you have read, understood, and agree to be bound by
                        these Terms and Conditions.
                    </p>
                </div>
            </div>
        </>
    );
}