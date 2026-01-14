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
    <div className="w-full space-y-4 mb-8">
      {/* Search Bar - Full Width, Prominent */}
      {shouldShowSearch && (
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none">
            {showLucidIcon("search", "", 20)}
          </div>
          <Input
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-12 pl-12 pr-12 text-base border-2 focus-visible:ring-2 focus-visible:ring-primary/20 rounded-xl transition-all"
          />
          {searchValue && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
              aria-label="Clear search"
            >
              {showLucidIcon("x", "", 18)}
            </button>
          )}
        </div>
      )}

      {/* Control Bar - Clean, Minimal */}
      <div className="flex items-center justify-between gap-4">
        {/* Results Count Badge */}
        <div className="flex items-center gap-2.5">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
            <span className="text-lg font-bold text-primary tabular-nums">{resultsCount}</span>
            <span className="text-sm font-medium text-primary/80">{resultsLabel}</span>
          </div>
        </div>

        {/* Action Buttons - Icon Focused */}
        <div className="flex items-center gap-2">
          {showClearButton && hasActiveFilters && onClearAll && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearAll}
              className="h-9 px-4 gap-2 rounded-full border-2 hover:bg-destructive/10 hover:border-destructive/30 hover:text-destructive transition-all"
            >
              {showLucidIcon("x", "", 16)}
              <span className="font-medium">Clear</span>
            </Button>
          )}

          {collapsible && (
            <Button
              variant={isExpanded ? "default" : "outline"}
              size="sm"
              onClick={toggleFilters}
              className="h-9 px-4 gap-2 rounded-full border-2 transition-all"
            >
              {showLucidIcon(
                isExpanded ? "chevron-up" : "sliders-horizontal",
                "",
                16,
              )}
              <span className="font-medium">{isExpanded ? "Hide" : "Filters"}</span>
            </Button>
          )}
        </div>
      </div>

      {/* Filters Section - Modern Grid */}
      {(!collapsible || isExpanded) && (
        <div className="animate-in fade-in-0 slide-in-from-top-4 duration-300">
          <div className="bg-gradient-to-br from-muted/40 to-muted/20 rounded-2xl border-2 border-muted p-6">
            <div className="flex flex-wrap items-center gap-4">
              {/* Filter Dropdowns */}
              {filters.map((filter) => (
                <div key={filter.name} className="flex-1 min-w-[200px]">
                  <Select
                    value={filter.value}
                    onValueChange={filter.onChange}
                  >
                    <SelectTrigger className="h-11 border-2 rounded-xl hover:border-primary/50 transition-all bg-background shadow-sm">
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
                </div>
              ))}

              {/* Sort Dropdown with Icon */}
              <div className="flex items-center gap-3 flex-1 min-w-[200px]">
                <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary shrink-0">
                  {showLucidIcon("arrow-up-down", "", 18)}
                </div>
                <Select
                  value={sortConfig.value}
                  onValueChange={sortConfig.onChange}
                >
                  <SelectTrigger className="h-11 border-2 rounded-xl hover:border-primary/50 transition-all bg-background shadow-sm">
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
