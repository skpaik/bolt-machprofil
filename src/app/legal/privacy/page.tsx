"use client";

import React from 'react';
import { usePortfolio } from '@/components/context/PortfolioContext';
import { PageHeading } from "@/components/shared/PageHeading";
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    FileText,
    Shield,
    Scale,
    AlertCircle,
    CheckCircle,
    Clock,
    DollarSign,
    Users,
    Lock,
    Mail
} from 'lucide-react';

interface TermsSection {
    id: string;
    title: string;
    icon: React.ReactNode;
    content: string[];
}

const TERMS_SECTIONS: TermsSection[] = [
    {
        id: 'acceptance',
        title: 'Acceptance of Terms',
        icon: <CheckCircle className="w-5 h-5" />,
        content: [
            'By accessing and using this website and services, you accept and agree to be bound by these terms and conditions.',
            'If you do not agree to these terms, please do not use this service.'
        ]
    },
    {
        id: 'services',
        title: 'Services',
        icon: <FileText className="w-5 h-5" />,
        content: [
            'I provide professional services including web development, mobile app development, UI/UX design, consulting, and related digital services.',
            'Service specifications and deliverables will be outlined in individual project agreements.',
            'Services are subject to availability and may be modified or discontinued at any time.'
        ]
    },
    {
        id: 'pricing',
        title: 'Pricing & Payment',
        icon: <DollarSign className="w-5 h-5" />,
        content: [
            'All prices are in USD unless otherwise stated and quoted on a per-project basis.',
            'Typical payment structure: 50% upfront, 50% upon completion (or as specified in project agreement).',
            'Late payments may incur additional fees. Refunds are considered on a case-by-case basis.',
            'Accepted payment methods: Bank transfer, PayPal, Stripe, and other platforms as agreed.'
        ]
    },
    {
        id: 'intellectual-property',
        title: 'Intellectual Property',
        icon: <Lock className="w-5 h-5" />,
        content: [
            'Upon full payment, clients receive ownership of the final deliverables created specifically for their project.',
            'I retain the right to showcase completed work in my portfolio unless otherwise agreed in writing.',
            'Pre-existing code libraries, frameworks, and reusable components remain my property.',
            'Clients are responsible for licensing any third-party assets (stock photos, fonts, plugins).'
        ]
    },
    {
        id: 'confidentiality',
        title: 'Confidentiality',
        icon: <Shield className="w-5 h-5" />,
        content: [
            'I respect the confidentiality of all client information and project details.',
            'Non-disclosure agreements (NDAs) can be signed upon request.',
            'Client data is protected and not shared with third parties without consent.'
        ]
    },
    {
        id: 'timeline',
        title: 'Timeline & Deadlines',
        icon: <Clock className="w-5 h-5" />,
        content: [
            'Project timelines are estimates and may change based on scope, feedback delays, or unforeseen circumstances.',
            'Client feedback, content delays, or scope changes may extend project timelines.',
            'Expedited delivery is available for an additional fee (typically 25-50% of project cost).'
        ]
    },
    {
        id: 'revisions',
        title: 'Revisions & Changes',
        icon: <AlertCircle className="w-5 h-5" />,
        content: [
            'Each project includes a specified number of revision rounds (typically 2-3) as outlined in the project agreement.',
            'Additional revisions beyond the agreed scope may incur additional charges.',
            'Major scope changes will require a new agreement and may affect pricing and timeline.'
        ]
    },
    {
        id: 'responsibilities',
        title: 'Client Responsibilities',
        icon: <Users className="w-5 h-5" />,
        content: [
            'Clients must provide timely feedback, content, and materials needed for project completion.',
            'Clients must ensure they have rights to any materials, content, or assets they provide.',
            'Clients should respond to communications within 48 business hours to prevent delays.'
        ]
    },
    {
        id: 'warranties',
        title: 'Warranties & Disclaimers',
        icon: <Scale className="w-5 h-5" />,
        content: [
            'Services are provided "as is" without warranties. I warrant that work will be performed professionally and consistent with industry standards.',
            'I do not guarantee specific results, rankings, traffic, or business outcomes.',
            'Code is tested across major browsers and devices. Post-launch support provided for an initial period as agreed.'
        ]
    },
    {
        id: 'termination',
        title: 'Termination',
        icon: <AlertCircle className="w-5 h-5" />,
        content: [
            'Either party may terminate the agreement with written notice.',
            'Upon termination, client is responsible for payment of all work completed to date.',
            'Completed deliverables will be provided for milestones that have been paid.'
        ]
    },
    {
        id: 'liability',
        title: 'Limitation of Liability',
        icon: <Shield className="w-5 h-5" />,
        content: [
            'I shall not be liable for any indirect, incidental, special, or consequential damages.',
            'Total liability for any claim shall not exceed the amount paid for the services.',
            'Clients are responsible for maintaining backups and ensuring business continuity.'
        ]
    },
    {
        id: 'disputes',
        title: 'Dispute Resolution',
        icon: <Scale className="w-5 h-5" />,
        content: [
            'Disputes will be resolved through good faith negotiation first.',
            'If negotiation fails, disputes will be resolved through binding arbitration or mediation.',
            'These terms are governed by the laws of the jurisdiction where services are provided.'
        ]
    },
    {
        id: 'modifications',
        title: 'Modifications',
        icon: <FileText className="w-5 h-5" />,
        content: [
            'I reserve the right to modify these terms at any time. Changes will be posted on this page with an updated date.',
            'Continued use of services after changes constitutes acceptance of new terms.'
        ]
    }
];

export default function TermsPage() {
    const { appData, langI18n } = usePortfolio();

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <PageHeading
                title="Terms & Conditions"
                subTitle="Please read these terms carefully before using our services."
            />

            {/* Last Updated Badge */}
            <div className="mb-8">
                <Badge variant="outline" className="text-sm">
                    <Clock className="w-4 h-4 mr-2" />
                    Last Updated: November 2, 2024
                </Badge>
            </div>

            {/* Important Notice */}
            <Card className="mb-8 border-yellow-200 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-800">
                <CardContent className="p-6">
                    <div className="flex gap-4">
                        <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                                Important Notice
                            </h3>
                            <p className="text-sm text-yellow-800 dark:text-yellow-200">
                                By accessing and using our services, you accept these terms and conditions in full.
                                Do not continue to use our services if you do not accept all of the terms stated on this page.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

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
                        <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
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
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <p className="text-sm text-muted-foreground">
                        By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                    </p>
                </div>
            </div>
        </div>
    );
}