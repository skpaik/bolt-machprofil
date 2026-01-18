"use client";

import React, { useState, useMemo, useEffect } from "react";
import { usePortfolio } from "@/components/context/PortfolioContext";
import { PageHeading } from "@/components/shared/PageHeading";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FilterBar } from "@/components/shared/FilterBar";
import { Pagination } from "@/components/shared/Pagination";
import { FilterConfig, SortConfig } from "@/lib/types/shared.contract";
import { SortOption } from "@/lib/types/type.config";
import { showLucidIcon } from "@/components/lucid-icon-map";
import { ListEmptyDisplay } from "@/components/shared/ListEmptyDisplay";
import { useContentLoader } from "@/components/hooks/use-content-loader";
import { Skills } from "@/lib/types/portfolio";

export default function ClientPage() {
  const { appConfig, langI18n, profileType, languageType } = usePortfolio();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("proficiency-desc");

  const {
    data: skills,
    loading,
    error,
  } = useContentLoader<Skills[]>(profileType, languageType, "skill_list", []);

  const ITEMS_PER_PAGE = appConfig.item_per_page;

  // Filter and search skills
  const filteredSkills = useMemo(() => {
    let filtered = skills.filter((skill) => {
      // Category filter
      if (selectedCategory !== "all" && skill.category !== selectedCategory) {
        return false;
      }

      // Level filter
      if (selectedLevel !== "all" && skill.level !== selectedLevel) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchableText = [
          skill.title,
          skill.category,
          skill.level,
          skill.description || "",
          ...(skill.tags || []),
        ]
          .join(" ")
          .toLowerCase();

        if (!searchableText.includes(query)) {
          return false;
        }
      }

      return true;
    });

    // Sort skills
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.title.localeCompare(b.title);
        case "name-desc":
          return b.title.localeCompare(a.title);
        case "proficiency-desc":
          return b.proficiency - a.proficiency;
        case "proficiency-asc":
          return a.proficiency - b.proficiency;
        case "category-asc":
          return a.category.localeCompare(b.category);
        case "category-desc":
          return b.category.localeCompare(a.category);
        case "experience-desc":
          return (b.yearsOfExperience || 0) - (a.yearsOfExperience || 0);
        case "experience-asc":
          return (a.yearsOfExperience || 0) - (b.yearsOfExperience || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [skills, selectedCategory, selectedLevel, searchQuery, sortBy]);

  // Get unique categories and levels
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(skills.map((skill) => skill.category)),
    ];
    return uniqueCategories.sort();
  }, [skills]);

  const levels = useMemo(() => {
    const uniqueLevels = [...new Set(skills.map((skill) => skill.level))];
    return uniqueLevels.sort();
  }, [skills]);

  const totalSkills = filteredSkills.length;
  const totalPages = Math.ceil(totalSkills / ITEMS_PER_PAGE);

  const currentSkills = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredSkills.slice(startIndex, endIndex);
  }, [filteredSkills, currentPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedLevel, sortBy]);

  // Configure filters
  const filterConfigs: FilterConfig[] = [
    {
      name: "category",
      label: langI18n.category,
      value: selectedCategory,
      onChange: setSelectedCategory,
      options: [
        { value: "all", label: langI18n.all_categories },
        ...categories.map((cat) => ({ value: cat, label: cat })),
      ],
    },
    {
      name: "level",
      label: langI18n.level,
      value: selectedLevel,
      onChange: setSelectedLevel,
      options: [
        { value: "all", label: langI18n.all_levels },
        ...levels.map((level) => ({ value: level, label: level })),
      ],
    },
  ];

  const sortConfig: SortConfig = {
    value: sortBy,
    onChange: (value: string) => setSortBy(value as SortOption),
    options: [
      { value: "proficiency-desc", label: langI18n.proficiency_high_to_low },
      { value: "proficiency-asc", label: langI18n.proficiency_low_to_high },
      { value: "name-asc", label: langI18n.name_a_z },
      { value: "name-desc", label: langI18n.name_z_a },
      { value: "category-asc", label: langI18n.category_a_z },
      { value: "category-desc", label: langI18n.category_z_a },
      { value: "experience-desc", label: langI18n.experience_most_to_least },
      { value: "experience-asc", label: langI18n.experience_least_to_most },
    ],
  };

  const handleClearAll = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedLevel("all");
    setSortBy("proficiency-desc");
  };

  return (
    <>
      <PageHeading
        title={langI18n.skills}
        subTitle={langI18n.skills_sub_title}
      />

      {/* Filter Bar */}
      <FilterBar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder={langI18n.skills_search_placeholder}
        filters={filterConfigs}
        sortConfig={sortConfig}
        resultsCount={totalSkills}
        resultsLabel={totalSkills === 1 ? langI18n.skill : langI18n.skills}
        onClearAll={handleClearAll}
      />

      {/* Skills Grid or Empty State */}
      {currentSkills.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {currentSkills.map((skill) => (
            <Card key={skill.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {showLucidIcon(skill.category)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{skill.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {skill.category}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      skill.level === "Expert"
                        ? "default"
                        : skill.level === "Advanced"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {skill.level}
                  </Badge>
                </div>

                {/* Proficiency Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {langI18n.proficiency}
                    </span>
                    <span className="font-semibold">{skill.proficiency}%</span>
                  </div>
                  <Progress value={skill.proficiency} className="h-2" />
                </div>
              </CardHeader>

              <CardContent>
                {skill.yearsOfExperience && (
                  <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                    {showLucidIcon("award", "w-4 h-4")}
                    <span>
                      {skill.yearsOfExperience}{" "}
                      {skill.yearsOfExperience === 1
                        ? langI18n.year
                        : langI18n.years}{" "}
                      {langI18n.of_experience}
                    </span>
                  </div>
                )}

                {skill.description && (
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {skill.description}
                  </p>
                )}

                {skill.tags && skill.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {skill.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <ListEmptyDisplay
          title={langI18n.skills_not_found}
          message={langI18n.skills_not_found_message}
          handleClearAll={handleClearAll}
        />
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
