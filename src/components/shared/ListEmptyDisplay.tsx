// components/shared/Pagination.tsx
import React from 'react';
import {Button} from '@/components/ui/button';
import {Search} from 'lucide-react';

export interface ListEmptyDisplayProps {
    title: string;
    message: string;
    handleClearAll: () => void;
}

export function ListEmptyDisplay({title, message, handleClearAll,}: ListEmptyDisplayProps) {
    return (
        <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
                <Search size={48} className="mx-auto mb-4 opacity-50"/>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-sm sm:text-base">
                    {message} Try adjusting your search terms or filters to find what you're looking for.
                </p>
            </div>
            <Button variant="outline" onClick={handleClearAll}>
                Clear all filters
            </Button>
        </div>
    );
}