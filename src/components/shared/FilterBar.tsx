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
  showSearch = false,
  collapsible = true,
  defaultExpanded = false,
}: FilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const hasActiveFilters =
    searchValue ||
    filters.some((f) => f.value !== "all") ||
    sortConfig.value !== sortConfig.options[0]?.value;

  const toggleFilters = () => {
    setIsExpanded(!isExpanded);
  };

  // Show search if showSearch is true OR filters are expanded
  const shouldShowSearch = showSearch || isExpanded;

  return (
    <div className="space-y-3 mb-8">
      {/* Main Filter Bar - Single Line on Desktop */}
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Search Input - Always visible when shouldShowSearch is true */}
        {shouldShowSearch && (
          <div className="relative flex-1 lg:max-w-md">
            {showLucidIcon(
              "search",
              "absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground",
              20,
            )}
            <Input
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-10 h-10"
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

        {/* Filters Section - Collapsible */}
        {(!collapsible || isExpanded) && (
          <div className="flex flex-col sm:flex-row gap-2 flex-1">
            {/* Filter Dropdowns - Dynamic width based on count */}
            {filters.map((filter) => (
              <Select
                key={filter.name}
                value={filter.value}
                onValueChange={filter.onChange}
              >
                <SelectTrigger className="w-full sm:flex-1 lg:w-auto h-10">
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

            {/* Sort Dropdown */}
            <Select
              value={sortConfig.value}
              onValueChange={sortConfig.onChange}
            >
              <SelectTrigger className="w-full sm:flex-1 lg:w-auto h-10">
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
        )}

        {/* Action Buttons - Right Side */}
        <div className="flex items-center gap-2 justify-between lg:justify-end">
          {/* Results Count - Mobile Only */}
          <div className="text-sm text-muted-foreground lg:hidden">
            <span className="font-medium">{resultsCount}</span> {resultsLabel}
          </div>

          <div className="flex items-center gap-2">
            {/* Clear Filters Button */}
            {showClearButton && hasActiveFilters && onClearAll && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearAll}
                className="h-10"
              >
                {showLucidIcon("x", "w-4 h-4 mr-1")}
                <span className="hidden sm:inline">Clear</span>
              </Button>
            )}

            {/* Toggle Filters Button */}
            {collapsible && (
              <Button
                variant="outline"
                size="sm"
                onClick={toggleFilters}
                className="h-10"
              >
                {showLucidIcon("filter", "w-4 h-4 mr-1")}
                <span className="hidden sm:inline">
                  {isExpanded ? "Hide" : "Show"}
                </span>
                {showLucidIcon(
                  isExpanded ? "chevron-up" : "chevron-down",
                  "w-4 h-4 ml-1",
                )}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Results Count - Desktop Only */}
      <div className="hidden lg:block text-sm text-muted-foreground">
        <span className="font-medium">{resultsCount}</span> {resultsLabel} found
      </div>
    </div>
  );
}
