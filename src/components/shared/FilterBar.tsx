// components/shared/FilterBar.tsx
"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilterConfig, SortConfig } from "@/lib/types/shared.contract";
import { showLucidIcon } from "@/components/lucid-icon-map";

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
  // New configuration options
  showSearch?: boolean;
  collapsible?: boolean;
  defaultExpanded?: boolean;
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
  showClearButton = true,
  showSearch = true,
  collapsible = false,
  defaultExpanded = true,
}: FilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const hasActiveFilters =
    searchValue ||
    filters.some((f) => f.value !== "all") ||
    sortConfig.value !== sortConfig.options[0]?.value;

  const toggleFilters = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="space-y-4 mb-8">
      {/* Search Bar - Always Visible */}
      {showSearch && (
        <div className="relative">
          {showLucidIcon(
            "search",
            "absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground",
            20,
          )}
          <Input
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchValue && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              {showLucidIcon("x", "", 16)}
            </button>
          )}
        </div>
      )}

      {/* Header with Results Count and Toggle Button */}
      <div className="flex items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">{resultsCount}</span> {resultsLabel}{" "}
          found
        </div>

        <div className="flex items-center gap-2">
          {showClearButton && hasActiveFilters && onClearAll && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAll}
              className="h-8"
            >
              {showLucidIcon("x", "mr-1", 14)}
              Clear filters
            </Button>
          )}

          {collapsible && (
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFilters}
              className="h-9"
            >
              {showLucidIcon(
                "filter",
                "w-4 h-4 mr-2",
              )}
              {isExpanded ? "Hide Filters" : "Show Filters"}
              {showLucidIcon(
                isExpanded ? "chevron-up" : "chevron-down",
                "w-4 h-4 ml-1",
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Collapsible Filter Section */}
      {(!collapsible || isExpanded) && (
        <div className="space-y-4 animate-in slide-in-from-top-2 duration-200">
          {/* Filters and Sort - Responsive Grid */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {/* Filter Label - Hidden on mobile */}
            <div className="hidden sm:flex items-center gap-2 text-sm font-medium whitespace-nowrap">
              {showLucidIcon("filter", "", 16)}
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
                {showLucidIcon(
                  "sort-asc",
                  "hidden sm:block text-muted-foreground",
                  16,
                )}
                <Select
                  value={sortConfig.value}
                  onValueChange={sortConfig.onChange}
                >
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
        </div>
      )}
    </div>
  );
}
