// components/shared/Pagination.tsx
import React from 'react';
import {Button} from '@/components/ui/button';
import {Search} from 'lucide-react';

export interface PageHeadingProps {
    title: string;
    subTitle: string;
}

export function PageHeading({title, subTitle}: PageHeadingProps) {
    return (
        <div className="mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                        {title}
                    </h1>
                    <p className="text-base sm:text-lg text-muted-foreground">
                        {subTitle}
                    </p>
                </div>
            </div>
        </div>
    );
}