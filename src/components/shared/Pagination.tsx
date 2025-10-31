// components/shared/Pagination.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    maxVisiblePages?: number;
    showEdgePages?: boolean;
    className?: string;
}

export function Pagination({
                               currentPage,
                               totalPages,
                               onPageChange,
                               maxVisiblePages = 5,
                               showEdgePages = true,
                               className = ''
                           }: PaginationProps) {
    if (totalPages <= 1) return null;

    const getVisiblePages = (): (number | string)[] => {
        const pages: (number | string)[] = [];
        const halfVisible = Math.floor(maxVisiblePages / 2);

        let startPage = Math.max(1, currentPage - halfVisible);
        let endPage = Math.min(totalPages, currentPage + halfVisible);

        // Adjust if we're near the edges
        if (currentPage <= halfVisible) {
            endPage = Math.min(totalPages, maxVisiblePages);
        } else if (currentPage >= totalPages - halfVisible) {
            startPage = Math.max(1, totalPages - maxVisiblePages + 1);
        }

        // Add first page and ellipsis
        if (showEdgePages && startPage > 1) {
            pages.push(1);
            if (startPage > 2) pages.push('ellipsis-start');
        }

        // Add visible pages
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        // Add ellipsis and last page
        if (showEdgePages && endPage < totalPages) {
            if (endPage < totalPages - 1) pages.push('ellipsis-end');
            pages.push(totalPages);
        }

        return pages;
    };

    const visiblePages = getVisiblePages();

    return (
        <div className={`flex items-center justify-center gap-1 sm:gap-2 mt-12 ${className}`}>
            {/* Previous Button */}
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="h-9 w-9"
                aria-label="Previous page"
            >
                <ChevronLeft size={18} />
            </Button>

            {/* Page Numbers - Desktop */}
            <div className="hidden sm:flex items-center gap-1">
                {visiblePages.map((page, index) => {
                    if (typeof page === 'string') {
                        return (
                            <span key={page} className="px-2 text-muted-foreground">
                ...
              </span>
                        );
                    }

                    return (
                        <Button
                            key={page}
                            variant={currentPage === page ? 'default' : 'outline'}
                            size="icon"
                            onClick={() => onPageChange(page)}
                            className="h-9 w-9"
                            aria-label={`Page ${page}`}
                            aria-current={currentPage === page ? 'page' : undefined}
                        >
                            {page}
                        </Button>
                    );
                })}
            </div>

            {/* Page Indicator - Mobile */}
            <div className="sm:hidden px-3 py-2 text-sm font-medium">
                <span className="text-foreground">{currentPage}</span>
                <span className="text-muted-foreground"> / {totalPages}</span>
            </div>

            {/* Next Button */}
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="h-9 w-9"
                aria-label="Next page"
            >
                <ChevronRight size={18} />
            </Button>
        </div>
    );
}