// components/shared/Pagination.tsx
import React from 'react';
import {Clock, Mail} from 'lucide-react';
import {Badge} from "@/components/ui/badge";
import {Card, CardContent} from "@/components/ui/card";
import {showLucidIcon} from "@/components/lucid-icon-map";
import {TermsPrivacy} from "@/lib/types/portfolio";

export interface TermsPrivacyContentProps {
    lastUpdatedTranslate: string;
    termsPrivacy: TermsPrivacy;
}

export function TermsPrivacyContent({
                                        lastUpdatedTranslate,
                                        termsPrivacy: {
                                            lastUpdated,
                                            sections,
                                            contactTitle,
                                            contactText,
                                            footerText
                                        }
                                    }: TermsPrivacyContentProps) {
    return (
        <>
            {/* Last Updated */}
            <div className="mb-8">
                <Badge variant="outline" className="text-sm">
                    <Clock className="w-4 h-4 mr-2"/>
                    {lastUpdatedTranslate}: {lastUpdated}
                </Badge>
            </div>

            {/* Main Privacy Card */}
            <Card>
                <CardContent className="p-6 sm:p-8 space-y-8">
                    {sections.map((section) => {
                        return (
                            <div key={section.id}>
                                <div className="flex items-center gap-3 mb-3">
                                    {showLucidIcon(section.icon)}
                                    <h2 className="text-lg font-bold">{section.title}</h2>
                                </div>

                                <p className="text-muted-foreground mb-3">
                                    {section.content}
                                </p>

                                {section.list && section.list.length > 0 && (
                                    <ul className="text-muted-foreground space-y-1 ml-5">
                                        {section.list.map((item, idx) => (
                                            <li key={idx}>• {item}</li>
                                        ))}
                                    </ul>
                                )}

                                {section.note && (
                                    <p className="text-muted-foreground mt-3">
                                        {section.note}
                                    </p>
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

            {/* Simple Note */}
            {footerText && (
                <div className="mt-6 p-4 border rounded-lg bg-muted/30 text-center">
                    <p className="text-sm text-muted-foreground">
                        {footerText}
                    </p>
                </div>
            )}
        </>
    );
}