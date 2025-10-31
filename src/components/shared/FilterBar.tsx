// components/shared/FilterBar.tsx
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter, Search, SortAsc, X } from 'lucide-react';
import {FilterConfig, SortConfig} from "@/lib/types/shared.contract";

export interface FilterBarProps {
    searchValue: string;
    onSearchChange: (value: string) => void;
    searchPlaceholder?: string;
    filters: FilterConfig[];
    sortConfig: SortConfig;
    resultsCount: number;
    resultsLabel?: string;
    onClearAll?: () => void;
    showClearButton?: boolean;
}

export function FilterBar({
                              searchValue,
                              onSearchChange,
                              searchPlaceholder = "Search...",
                              filters,
                              sortConfig,
                              resultsCount,
                              resultsLabel = "items",
                              onClearAll,
                              showClearButton = true
                          }: FilterBarProps) {
    const hasActiveFilters =
        searchValue ||
        filters.some(f => f.value !== 'all') ||
        sortConfig.value !== sortConfig.options[0]?.value;

    return (
        <div className="space-y-4 mb-8">
            {/* Search Bar - Full Width */}
            <div className="relative">
                <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    size={20}
                />
                <Input
                    placeholder={searchPlaceholder}
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10 pr-10"
                />
                {searchValue && (
                    <button
                        onClick={() => onSearchChange('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Clear search"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            {/* Filters and Sort - Responsive Grid */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                {/* Filter Label - Hidden on mobile */}
                <div className="hidden sm:flex items-center gap-2 text-sm font-medium whitespace-nowrap">
                    <Filter size={16} />
                    <span>Filters:</span>
                </div>

                {/* Filters Container - Responsive */}
                <div className="flex-1 flex flex-wrap gap-2 sm:gap-3">
                    {filters.map((filter) => (
                        <Select
                            key={filter.name}
                            value={filter.value}
                            onValueChange={filter.onChange}
                        >
                            <SelectTrigger className="w-full sm:w-[160px] md:w-[180px]">
                                <SelectValue placeholder={filter.label} />
                            </SelectTrigger>
                            <SelectContent>
                                {filter.options.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    ))}

                    {/* Sort */}
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <SortAsc size={16} className="hidden sm:block text-muted-foreground" />
                        <Select value={sortConfig.value} onValueChange={sortConfig.onChange}>
                            <SelectTrigger className="w-full sm:w-[160px] md:w-[180px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                {sortConfig.options.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Results Count and Clear Button */}
            <div className="flex items-center justify-between gap-4 text-sm">
                <div className="text-muted-foreground">
                    <span className="font-medium">{resultsCount}</span> {resultsLabel} found
                </div>

                {showClearButton && hasActiveFilters && onClearAll && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClearAll}
                        className="h-8"
                    >
                        <X size={14} className="mr-1" />
                        Clear filters
                    </Button>
                )}
            </div>
        </div>
    );
}