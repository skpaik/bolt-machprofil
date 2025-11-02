"use client";

import React from 'react';
import {usePortfolio} from '@/components/context/PortfolioContext';
import {PageHeading} from "@/components/shared/PageHeading";
import {Card, CardContent} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {AlertCircle, CheckCircle, Clock, DollarSign, FileText, Lock, Mail, Shield} from 'lucide-react';

interface TermsSection {
    id: number;
    title: string;
    icon: React.ReactNode;
    content: string[];
}

const TERMS_SECTIONS: TermsSection[] = [
    {
        id: 1,
        title: 'Services',
        icon: <FileText className="w-5 h-5"/>,
        content: [
            'I provide freelance services including web development, design, and consulting.',
            'Specific project details, deliverables, and timelines will be discussed and agreed upon before starting work.'
        ]
    },
    {
        id: 2,
        title: 'Payment',
        icon: <DollarSign className="w-5 h-5"/>,
        content: [
            'Payment terms will be agreed upon per project. Typically:',
            '• 50% deposit before starting work',
            '• 50% upon completion',
            '• Hourly projects billed monthly'
        ]
    },
    {
        id: 3,
        title: 'Ownership & Rights',
        icon: <Lock className="w-5 h-5"/>,
        content: [
            'Once you\'ve paid in full, you own the final work I create for your project.',
            'I may showcase the work in my portfolio. Any pre-existing code or third-party assets have their own licenses.'
        ]
    },
    {
        id: 4,
        title: 'Timeline & Revisions',
        icon: <Clock className="w-5 h-5"/>,
        content: [
            'Project timelines are estimates. Most projects include 2-3 rounds of revisions.',
            'Delays can happen if feedback or content is delayed. Major changes to the project scope may require additional time and cost.'
        ]
    },
    {
        id: 5,
        title: 'Cancellation',
        icon: <AlertCircle className="w-5 h-5"/>,
        content: [
            'Either of us can cancel the project with notice. You\'ll need to pay for work completed up to that point.',
            'Deposits are generally non-refundable once work has started.'
        ]
    },
    {
        id: 6,
        title: 'Disclaimer',
        icon: <Shield className="w-5 h-5"/>,
        content: [
            'I\'ll do my best work, but I can\'t guarantee specific results like traffic, sales, or rankings.',
            'You\'re responsible for maintaining your site/app and keeping backups after launch.'
        ]
    }
];

export default function TermsPage() {
    const {appData, langI18n} = usePortfolio();

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
                {TERMS_SECTIONS.map((section, index) => (
                    <Card key={section.id} id={section.id}>
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                                    {section.icon}
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