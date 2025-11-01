"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { usePortfolio } from '@/components/context/PortfolioContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import {SortOption} from "@/lib/types/type.config";
import {FilterConfig, SortConfig} from "@/lib/types/shared.contract";
import {FilterBar} from "@/components/shared/FilterBar";
import {ListEmptyDisplay} from "@/components/shared/ListEmptyDisplay";
import {PageHeading} from "@/components/shared/PageHeading";
import {Pagination} from "@/components/shared/Pagination";

export default function ProjectsPage() {
  const { appData, contentData, appConfig, langI18n } = usePortfolio();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProjectType, setSelectedProjectType] = useState<string>('all');
    const [selectedTechnology, setSelectedTechnology] = useState<string>('all');
    const [sortBy, setSortBy] = useState<SortOption>('date-desc');

    const projects = contentData.projects;

    // Filter and search projects
    const filteredProjects = useMemo(() => {
        let filtered = projects.filter(project => {
            // Project type filter
            if (selectedProjectType !== 'all' && project.project_type !== selectedProjectType) {
                return false;
            }

            // Tag filter
            if (selectedTechnology !== 'all' && !project.technologies?.includes(selectedTechnology)) {
                return false;
            }

            // Search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const searchableText = [
                    project.title,
                    project.category,
                    project.description || '',
                    ...(project.technologies || [])
                ].join(' ').toLowerCase();

                if (!searchableText.includes(query)) {
                    return false;
                }
            }

            return true;
        });

        // Sort projects
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'date-desc':
                    return new Date(b.started_at || 0).getTime() - new Date(a.started_at || 0).getTime();
                case 'date-asc':
                    return new Date(a.started_at || 0).getTime() - new Date(b.started_at || 0).getTime();
                case 'title-asc':
                    return a.title.localeCompare(b.title);
                case 'title-desc':
                    return b.title.localeCompare(a.title);
                case 'project-type-asc':
                    return (a.project_type || '').localeCompare(b.project_type || '');
                case 'project-type-desc':
                    return (b.project_type || '').localeCompare(a.project_type || '');
                default:
                    return 0;
            }
        });

        return filtered;
    }, [projects, selectedProjectType, searchQuery, selectedTechnology, sortBy]);

    // Get unique albums and technology for filters
    const projectTypeList = useMemo(() => {
        const uniqueProjectType = [...new Set(projects.map(project => project.project_type).filter(Boolean))];
        return uniqueProjectType.sort();
    }, [projects]);

    const technologies = useMemo(() => {
        const allTechnologies = projects.flatMap(project => project.technologies || []);
        const uniqueTechnologies = [...new Set(allTechnologies)];
        return uniqueTechnologies.sort();
    }, [projects]);

    const totalProjects = filteredProjects.length;
    const totalPages = Math.ceil(totalProjects / appConfig.item_per_page);

    const currentProjects = useMemo(() => {
        const startIndex = (currentPage - 1) * appConfig.item_per_page;
        const endIndex = startIndex + appConfig.item_per_page;
        return filteredProjects.slice(startIndex, endIndex);
    }, [filteredProjects, currentPage, appConfig.item_per_page]);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedProjectType, selectedTechnology, sortBy]);

    // Configure filters for FilterBar component
    const filterConfigs: FilterConfig[] = [
        {
            name: 'project_type',
            label: 'Project type',
            value: selectedProjectType,
            onChange: setSelectedProjectType,
            options: [
                { value: 'all', label: 'All Project Type' },
                ...projectTypeList.map(ptl => ({ value: ptl, label: ptl }))
            ]
        },
        {
            name: 'technology',
            label: 'Technology',
            value: selectedTechnology,
            onChange: setSelectedTechnology,
            options: [
                { value: 'all', label: 'All Technology' },
                ...technologies.map(technology => ({ value: technology, label: technology }))
            ]
        }
    ];

    // Configure sort options
    const sortConfig: SortConfig = {
        value: sortBy,
        onChange: (value: string) => setSortBy(value as SortOption),
        options: [
            { value: 'date-desc', label: 'Date (Newest)' },
            { value: 'date-asc', label: 'Date (Oldest)' },
            { value: 'title-asc', label: 'Title (A-Z)' },
            { value: 'title-desc', label: 'Title (Z-A)' },
            { value: 'project-type-asc', label: 'Project type (A-Z)' },
            { value: 'project-type-desc', label: 'Project type (Z-A)' }
        ]
    };

    const handleClearAll = () => {
        setSearchQuery('');
        setSelectedProjectType('all');
        setSelectedTechnology('all');
        setSortBy('date-desc');
    };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeading
            title={langI18n.projects}
            subTitle={"A showcase of my work, demonstrating expertise and passion across various projects."}
        />
        {/* Filter Bar Component */}
        <FilterBar
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search project by title, album, Technology, or description..."
            filters={filterConfigs}
            sortConfig={sortConfig}
            resultsCount={totalProjects}
            resultsLabel={totalProjects === 1 ? 'project' : 'Projects'}
            onClearAll={handleClearAll}
        />
        {/* Projects Grid or Empty State */}
        {currentProjects.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {currentProjects.map((project, index) => (
                    <Card key={index} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                        <div className="aspect-video overflow-hidden">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>
                                {project.category && (
                                    <Badge variant="secondary" className="mb-3">
                                        {project.category}
                                    </Badge>
                                )}
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {project.description}
                                </p>
                            </div>

                            {project.technologies && project.technologies.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech, techIndex) => (
                                        <Badge key={techIndex} variant="outline" className="text-xs">
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            )}

                            <Button variant="outline" className="w-full gap-2" asChild>
                                <a href={project.link} target="_blank" rel="noopener noreferrer">
                                    {langI18n.viewMore}
                                    <ExternalLink size={16} />
                                </a>
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        ) : (
            <ListEmptyDisplay
                title={"No project found"}
                message={"Try adjusting your search terms or filters to find what you're looking for."}
                handleClearAll={handleClearAll}/>
        )}
        {/* Pagination Component */}
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
        />
    </div>
  );
}
