"use client";

import React from 'react';
import { usePortfolio } from '@/components/context/PortfolioContext';
import { PageHeading } from "@/components/shared/PageHeading";
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    FileText,
    Shield,
    DollarSign,
    Clock,
    AlertCircle,
    Mail,
    CheckCircle
} from 'lucide-react';

export default function TermsPage() {
    const { appData, langI18n } = usePortfolio();

    return (
        <>
            <PageHeading
                title="Terms of Service"
                subTitle="Simple and straightforward terms for working together."
            />

            {/* Last Updated */}
            <div className="mb-8">
                <Badge variant="outline" className="text-sm">
                    <Clock className="w-4 h-4 mr-2" />
                    Last Updated: November 2, 2024
                </Badge>
            </div>

            {/* Main Terms Card */}
            <Card>
                <CardContent className="p-6 sm:p-8 space-y-8">

                    {/* Section 1 */}
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <FileText className="w-5 h-5 text-primary" />
                            <h2 className="text-lg font-bold">1. Services</h2>
                        </div>
                        <p className="text-muted-foreground">
                            I provide freelance services including web development, design, and consulting.
                            Specific project details, deliverables, and timelines will be discussed and agreed upon before starting work.
                        </p>
                    </div>

                    {/* Section 2 */}
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <DollarSign className="w-5 h-5 text-primary" />
                            <h2 className="text-lg font-bold">2. Payment</h2>
                        </div>
                        <p className="text-muted-foreground mb-2">
                            Payment terms will be agreed upon per project. Typically:
                        </p>
                        <ul className="text-muted-foreground space-y-1 ml-5">
                            <li>• 50% deposit before starting work</li>
                            <li>• 50% upon completion</li>
                            <li>• Hourly projects billed monthly</li>
                        </ul>
                    </div>

                    {/* Section 3 */}
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <Shield className="w-5 h-5 text-primary" />
                            <h2 className="text-lg font-bold">3. Ownership & Rights</h2>
                        </div>
                        <p className="text-muted-foreground">
                            Once you've paid in full, you own the final work I create for your project.
                            I may showcase the work in my portfolio. Any pre-existing code or third-party assets have their own licenses.
                        </p>
                    </div>

                    {/* Section 4 */}
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <Clock className="w-5 h-5 text-primary" />
                            <h2 className="text-lg font-bold">4. Timeline & Revisions</h2>
                        </div>
                        <p className="text-muted-foreground mb-2">
                            Project timelines are estimates. Most projects include 2-3 rounds of revisions.
                            Delays can happen if feedback or content is delayed. Major changes to the project scope may require additional time and cost.
                        </p>
                    </div>

                    {/* Section 5 */}
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <AlertCircle className="w-5 h-5 text-primary" />
                            <h2 className="text-lg font-bold">5. Cancellation</h2>
                        </div>
                        <p className="text-muted-foreground">
                            Either of us can cancel the project with notice. You'll need to pay for work completed up to that point.
                            Deposits are generally non-refundable once work has started.
                        </p>
                    </div>

                    {/* Section 6 */}
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <Shield className="w-5 h-5 text-primary" />
                            <h2 className="text-lg font-bold">6. Disclaimer</h2>
                        </div>
                        <p className="text-muted-foreground">
                            I'll do my best work, but I can't guarantee specific results like traffic, sales, or rankings.
                            You're responsible for maintaining your site/app and keeping backups after launch.
                        </p>
                    </div>

                </CardContent>
            </Card>

            {/* Contact Box */}
            <Card className="mt-8 bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                    <div className="flex gap-4">
                        <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-semibold mb-2">Have Questions?</h3>
                            <p className="text-sm text-muted-foreground">
                                If anything is unclear or you'd like to discuss terms for your project, feel free to reach out.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Simple Agreement Note */}
            <div className="mt-6 p-4 border rounded-lg bg-muted/30 text-center">
                <p className="text-sm text-muted-foreground">
                    By working with me, you agree to these terms. Let's create something great together! ✨
                </p>
            </div>
        </>
    );
}