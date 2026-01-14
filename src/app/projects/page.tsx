"use client";

import React, { useState, useMemo, useEffect } from "react";
import { usePortfolio } from "@/components/context/PortfolioContext";
import { PageHeading } from "@/components/shared/PageHeading";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FilterBar } from "@/components/shared/FilterBar";
import { Pagination } from "@/components/shared/Pagination";
import Link from "next/link";
import {BlogPost, Project} from "@/lib/types/portfolio";
import { FilterConfig, SortConfig } from "@/lib/types/shared.contract";
import { SortOption } from "@/lib/types/type.config";
import { ListEmptyDisplay } from "@/components/shared/ListEmptyDisplay";
import { showLucidIcon } from "@/components/lucid-icon-map";
import { formatDateShort } from "@/lib/helpers/date.helper";
import {ContentsService} from "@/lib/services/contents.service";
import {useContentLoader} from "@/components/hooks/use-content-loader";

export default function ProjectsPage() {
  const { appConfig, langI18n, profileType, languageType } = usePortfolio();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTechnology, setSelectedTechnology] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("date-desc");

  const { data: projects, loading, error } = useContentLoader<Project[]>(
      profileType,
      languageType,
      "project_list",
      []
  );
  const ITEMS_PER_PAGE = appConfig.item_per_page;

  // Filter and search projects
  const filteredProjects = useMemo(() => {
    let filtered = projects.filter((project) => {
      // Category filter
      if (selectedCategory !== "all" && project.category !== selectedCategory) {
        return false;
      }

      // Status filter
      if (selectedStatus !== "all" && project.status !== selectedStatus) {
        return false;
      }

      // Technology filter
      if (
        selectedTechnology !== "all" &&
        !project.technologies?.includes(selectedTechnology)
      ) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchableText = [
          project.title,
          project.description,
          project.shortDescription,
          project.category,
          project.client || "",
          project.role,
          ...(project.tags || []),
          ...(project.technologies || []),
        ]
          .join(" ")
          .toLowerCase();

        if (!searchableText.includes(query)) {
          return false;
        }
      }

      return true;
    });

    // Sort projects
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return (
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
          );
        case "date-asc":
          return (
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          );
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "likes-desc":
          return (b.likes || 0) - (a.likes || 0);
        case "views-desc":
          return (b.views || 0) - (a.views || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [
    projects,
    selectedCategory,
    selectedStatus,
    searchQuery,
    selectedTechnology,
    sortBy,
  ]);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(projects.map((p) => p.category))];
    return uniqueCategories.sort();
  }, [projects]);

  const technologies = useMemo(() => {
    const allTechnologies = projects.flatMap(
      (project) => project.technologies || [],
    );
    const uniqueTechnologies = [...new Set(allTechnologies)];
    return uniqueTechnologies.sort();
  }, [projects]);

  const totalProjects = filteredProjects.length;
  const totalPages = Math.ceil(totalProjects / ITEMS_PER_PAGE);

  const currentProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredProjects.slice(startIndex, endIndex);
  }, [filteredProjects, currentPage]);

  // Separate featured and regular projects
  const featuredProjects = currentProjects.filter((p) => p.featured);
  const regularProjects = currentProjects.filter((p) => !p.featured);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    selectedCategory,
    selectedTechnology,
    selectedStatus,
    sortBy,
  ]);

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
      name: "technology",
      label: langI18n.technology,
      value: selectedTechnology,
      onChange: setSelectedTechnology,
      options: [
        { value: "all", label: langI18n.all_technology },
        ...technologies.map((technology) => ({
          value: technology,
          label: technology,
        })),
      ],
    },
    {
      name: "status",
      label: langI18n.status,
      value: selectedStatus,
      onChange: setSelectedStatus,
      options: [
        { value: "all", label: langI18n.status_all },
        { value: "Completed", label: langI18n.completed },
        { value: "In Progress", label: langI18n.in_progress },
        { value: "Ongoing", label: langI18n.ongoing },
      ],
    },
  ];

  const sortConfig: SortConfig = {
    value: sortBy,
    onChange: (value: string) => setSortBy(value as SortOption),
    options: [
      { value: "date-desc", label: langI18n.date_newest },
      { value: "date-asc", label: langI18n.date_oldest },
      { value: "title-asc", label: langI18n.title_a_z },
      { value: "title-desc", label: langI18n.title_z_a },
      { value: "likes-desc", label: langI18n.most_liked },
      { value: "views-desc", label: langI18n.most_viewed },
    ],
  };

  const handleClearAll = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedStatus("all");
    setSelectedTechnology("all");
    setSortBy("date-desc");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "default";
      case "In Progress":
        return "secondary";
      case "Ongoing":
        return "outline";
      default:
        return "outline";
    }
  };

  const ProjectCard = ({ project }: { project: Project }) => (
    <Card
      className={`overflow-hidden group hover:shadow-xl transition-all ${
        project.featured ? "border-2 border-primary" : ""
      }`}
    >
      {project.featured && (
        <div className="bg-primary text-primary-foreground text-xs font-semibold py-1 px-4 text-center flex items-center justify-center gap-1">
          {showLucidIcon("star", "w-3 h-3 fill-current")}
          {langI18n.featured.toUpperCase()}
        </div>
      )}

      <div className="aspect-video overflow-hidden relative">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <Badge variant={getStatusColor(project.status) as any}>
            {project.status}
          </Badge>
          <div className="flex gap-3 text-xs text-muted-foreground">
            {project.views && (
              <div className="flex items-center gap-1">
                {showLucidIcon("eye", "w-3 h-3")}
                <span>{project.views}</span>
              </div>
            )}
            {project.likes && (
              <div className="flex items-center gap-1">
                {showLucidIcon("heart", "w-3 h-3")}
                <span>{project.likes}</span>
              </div>
            )}
          </div>
        </div>

        <Link href={`/projects/${project.slug}`}>
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
            {project.title}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {project.shortDescription}
        </p>

        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            {showLucidIcon("calendar", "w-3 h-3")}
            <span>{formatDateShort(project.startDate)}</span>
          </div>
          {project.client && (
            <div className="flex items-center gap-1">
              {showLucidIcon("users", "w-3 h-3")}
              <span className="line-clamp-1">{project.client}</span>
            </div>
          )}
        </div>

        <Badge variant="outline" className="mb-3">
          {project.category}
        </Badge>
      </CardHeader>

      <CardContent>
        <div className="mb-4">
          <div className="flex items-center gap-2 text-xs font-semibold mb-2 text-muted-foreground">
            {showLucidIcon("code", "w-3 h-3")}
            <span>{langI18n.technologies}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{project.technologies.length - 4}
              </Badge>
            )}
          </div>
        </div>

        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-2">
        {project.liveUrl && (
          <Button variant="default" size="sm" className="flex-1" asChild>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              {showLucidIcon("external-link", "w-3 h-3 mr-1")}
              Live
            </a>
          </Button>
        )}
        {project.githubUrl && (
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {showLucidIcon("github", "w-3 h-3 mr-1")}
              Code
            </a>
          </Button>
        )}
        {!project.liveUrl && !project.githubUrl && (
          <Button variant="ghost" size="sm" className="flex-1" asChild>
            <Link href={`/projects/${project.slug}`}>
              {langI18n.view_details}
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );

  return (
    <>
      <PageHeading
        title={langI18n.projects}
        subTitle={langI18n.projects_sub_title}
      />

      {/* Filter Bar */}
      <FilterBar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder={langI18n.projects_search_placeholder}
        filters={filterConfigs}
        sortConfig={sortConfig}
        resultsCount={totalProjects}
        resultsLabel={
          totalProjects === 1 ? langI18n.project : langI18n.projects
        }
        onClearAll={handleClearAll}
        collapsible={true}
        defaultExpanded={false}
        showSearch={true}
      />

      {/* Projects Grid or Empty State */}
      {currentProjects.length > 0 ? (
        <>
          {/* Featured Projects */}
          {featuredProjects.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                {showLucidIcon("award", "w-5 h-5 text-primary")}
                <h2 className="text-2xl font-bold">
                  {langI18n.featured} {langI18n.project}
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          )}

          {/* Regular Projects */}
          {regularProjects.length > 0 && (
            <div>
              {featuredProjects.length > 0 && (
                <h2 className="text-2xl font-bold mb-6">
                  {langI18n.project_all}
                </h2>
              )}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <ListEmptyDisplay
          title={langI18n.project_not_found}
          message={langI18n.project_not_found_detail}
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
