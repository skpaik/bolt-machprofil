"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { usePortfolio } from '@/components/context/PortfolioContext';
import { PageHeading } from "@/components/shared/PageHeading";
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FilterBar } from '@/components/shared/FilterBar';
import { Pagination } from '@/components/shared/Pagination';
import {
    Code,
    Palette,
    Wrench,
    MessageSquare,
    TrendingUp,
    Award,
    Star,
    Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {FilterConfig, SortConfig} from "@/lib/types/shared.contract";

// Skill interface - adaptable for any profession
interface Skill {
    id: string;
    name: string;
    category: string; // Technical, Design, Business, Soft Skills, Languages, etc.
    proficiency: number; // 0-100
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    yearsOfExperience?: number;
    tags?: string[];
    description?: string;
    certifications?: string[];
    icon?: string;
}

type SortOption = 'name-asc' | 'name-desc' | 'proficiency-desc' | 'proficiency-asc' | 'category-asc' | 'category-desc' | 'experience-desc' | 'experience-asc';

// Sample skills data - covers various professions
const SAMPLE_SKILLS: Skill[] = [
    // Technical Skills
    { id: '1', name: 'JavaScript', category: 'Technical', proficiency: 95, level: 'Expert', yearsOfExperience: 8, tags: ['Programming', 'Frontend', 'Backend'], description: 'Full-stack JavaScript development including ES6+, async/await, and modern frameworks.' },
    { id: '2', name: 'React', category: 'Technical', proficiency: 90, level: 'Expert', yearsOfExperience: 6, tags: ['Frontend', 'Framework', 'UI'], description: 'Building scalable web applications with React, hooks, and state management.' },
    { id: '3', name: 'TypeScript', category: 'Technical', proficiency: 88, level: 'Advanced', yearsOfExperience: 5, tags: ['Programming', 'Type Safety'], description: 'Strong typing for JavaScript applications, interfaces, and generics.' },
    { id: '4', name: 'Python', category: 'Technical', proficiency: 85, level: 'Advanced', yearsOfExperience: 6, tags: ['Programming', 'Backend', 'Data Science'], description: 'Backend development, automation, and data analysis.' },
    { id: '5', name: 'Node.js', category: 'Technical', proficiency: 87, level: 'Advanced', yearsOfExperience: 7, tags: ['Backend', 'API', 'Server'], description: 'Server-side JavaScript with Express, RESTful APIs, and microservices.' },

    // Design Skills
    { id: '6', name: 'UI/UX Design', category: 'Design', proficiency: 80, level: 'Advanced', yearsOfExperience: 5, tags: ['Design', 'User Experience', 'Interface'], description: 'Creating intuitive and visually appealing user interfaces.' },
    { id: '7', name: 'Figma', category: 'Design', proficiency: 85, level: 'Advanced', yearsOfExperience: 4, tags: ['Design Tool', 'Prototyping', 'Collaboration'], description: 'Wireframing, prototyping, and design systems.' },
    { id: '8', name: 'Adobe Photoshop', category: 'Design', proficiency: 75, level: 'Advanced', yearsOfExperience: 7, tags: ['Image Editing', 'Graphics'], description: 'Photo editing, digital art, and graphic design.' },
    { id: '9', name: 'Illustration', category: 'Design', proficiency: 70, level: 'Intermediate', yearsOfExperience: 3, tags: ['Art', 'Creative', 'Visual'], description: 'Digital and traditional illustration techniques.' },

    // Business Skills
    { id: '10', name: 'Project Management', category: 'Business', proficiency: 82, level: 'Advanced', yearsOfExperience: 6, tags: ['Management', 'Planning', 'Leadership'], description: 'Agile methodologies, Scrum, and team coordination.' },
    { id: '11', name: 'Business Analysis', category: 'Business', proficiency: 78, level: 'Advanced', yearsOfExperience: 5, tags: ['Analysis', 'Strategy', 'Requirements'], description: 'Requirements gathering, stakeholder management, and process improvement.' },
    { id: '12', name: 'Marketing Strategy', category: 'Business', proficiency: 73, level: 'Intermediate', yearsOfExperience: 4, tags: ['Marketing', 'Strategy', 'Growth'], description: 'Digital marketing, SEO, and brand development.' },

    // Soft Skills
    { id: '13', name: 'Communication', category: 'Soft Skills', proficiency: 90, level: 'Expert', yearsOfExperience: 10, tags: ['Interpersonal', 'Collaboration'], description: 'Clear verbal and written communication across teams and stakeholders.' },
    { id: '14', name: 'Problem Solving', category: 'Soft Skills', proficiency: 88, level: 'Expert', yearsOfExperience: 10, tags: ['Critical Thinking', 'Analysis'], description: 'Analytical thinking and creative solution development.' },
    { id: '15', name: 'Leadership', category: 'Soft Skills', proficiency: 80, level: 'Advanced', yearsOfExperience: 7, tags: ['Management', 'Mentoring', 'Team Building'], description: 'Team leadership, mentoring, and conflict resolution.' },

    // Languages
    { id: '16', name: 'English', category: 'Languages', proficiency: 100, level: 'Expert', yearsOfExperience: 20, tags: ['Communication', 'Native'], description: 'Native speaker with excellent written and verbal skills.' },
    { id: '17', name: 'Spanish', category: 'Languages', proficiency: 75, level: 'Advanced', yearsOfExperience: 8, tags: ['Communication', 'Second Language'], description: 'Conversational and business proficiency.' },
    { id: '18', name: 'German', category: 'Languages', proficiency: 60, level: 'Intermediate', yearsOfExperience: 3, tags: ['Communication', 'Learning'], description: 'Intermediate conversational skills.' },

    // Tools & Technologies
    { id: '19', name: 'Git', category: 'Tools', proficiency: 92, level: 'Expert', yearsOfExperience: 8, tags: ['Version Control', 'Collaboration'], description: 'Version control, branching strategies, and team collaboration.' },
    { id: '20', name: 'Docker', category: 'Tools', proficiency: 80, level: 'Advanced', yearsOfExperience: 4, tags: ['DevOps', 'Containers'], description: 'Containerization and deployment workflows.' },
    { id: '21', name: 'AWS', category: 'Tools', proficiency: 77, level: 'Advanced', yearsOfExperience: 5, tags: ['Cloud', 'Infrastructure'], description: 'Cloud services, EC2, S3, Lambda, and serverless architecture.' },
];

// Category icons mapping
const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
        'Technical': <Code className="w-5 h-5" />,
        'Design': <Palette className="w-5 h-5" />,
        'Business': <TrendingUp className="w-5 h-5" />,
        'Soft Skills': <MessageSquare className="w-5 h-5" />,
        'Languages': <MessageSquare className="w-5 h-5" />,
        'Tools': <Wrench className="w-5 h-5" />,
    };
    return iconMap[category] || <Star className="w-5 h-5" />;
};

// Proficiency color mapping
const getProficiencyColor = (proficiency: number): string => {
    if (proficiency >= 90) return 'bg-green-500';
    if (proficiency >= 75) return 'bg-blue-500';
    if (proficiency >= 60) return 'bg-yellow-500';
    return 'bg-orange-500';
};

export default function SkillPage() {
    const { appData, contentData, langI18n } = usePortfolio();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedLevel, setSelectedLevel] = useState<string>('all');
    const [sortBy, setSortBy] = useState<SortOption>('proficiency-desc');

    // Use real data if available, otherwise use sample data
    const skills = SAMPLE_SKILLS;
    const ITEMS_PER_PAGE = 12;

    // Filter and search skills
    const filteredSkills = useMemo(() => {
        let filtered = skills.filter(skill => {
            // Category filter
            if (selectedCategory !== 'all' && skill.category !== selectedCategory) {
                return false;
            }

            // Level filter
            if (selectedLevel !== 'all' && skill.level !== selectedLevel) {
                return false;
            }

            // Search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const searchableText = [
                    skill.name,
                    skill.category,
                    skill.level,
                    skill.description || '',
                    ...(skill.tags || [])
                ].join(' ').toLowerCase();

                if (!searchableText.includes(query)) {
                    return false;
                }
            }

            return true;
        });

        // Sort skills
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'name-asc':
                    return a.name.localeCompare(b.name);
                case 'name-desc':
                    return b.name.localeCompare(a.name);
                case 'proficiency-desc':
                    return b.proficiency - a.proficiency;
                case 'proficiency-asc':
                    return a.proficiency - b.proficiency;
                case 'category-asc':
                    return a.category.localeCompare(b.category);
                case 'category-desc':
                    return b.category.localeCompare(a.category);
                case 'experience-desc':
                    return (b.yearsOfExperience || 0) - (a.yearsOfExperience || 0);
                case 'experience-asc':
                    return (a.yearsOfExperience || 0) - (b.yearsOfExperience || 0);
                default:
                    return 0;
            }
        });

        return filtered;
    }, [skills, selectedCategory, selectedLevel, searchQuery, sortBy]);

    // Get unique categories and levels
    const categories = useMemo(() => {
        const uniqueCategories = [...new Set(skills.map(skill => skill.category))];
        return uniqueCategories.sort();
    }, [skills]);

    const levels = useMemo(() => {
        const uniqueLevels = [...new Set(skills.map(skill => skill.level))];
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
            name: 'category',
            label: 'Category',
            value: selectedCategory,
            onChange: setSelectedCategory,
            options: [
                { value: 'all', label: 'All Categories' },
                ...categories.map(cat => ({ value: cat, label: cat }))
            ]
        },
        {
            name: 'level',
            label: 'Level',
            value: selectedLevel,
            onChange: setSelectedLevel,
            options: [
                { value: 'all', label: 'All Levels' },
                ...levels.map(level => ({ value: level, label: level }))
            ]
        }
    ];

    const sortConfig: SortConfig = {
        value: sortBy,
        onChange: (value: string) => setSortBy(value as SortOption),
        options: [
            { value: 'proficiency-desc', label: 'Proficiency (High to Low)' },
            { value: 'proficiency-asc', label: 'Proficiency (Low to High)' },
            { value: 'name-asc', label: 'Name (A-Z)' },
            { value: 'name-desc', label: 'Name (Z-A)' },
            { value: 'category-asc', label: 'Category (A-Z)' },
            { value: 'category-desc', label: 'Category (Z-A)' },
            { value: 'experience-desc', label: 'Experience (Most to Least)' },
            { value: 'experience-asc', label: 'Experience (Least to Most)' }
        ]
    };

    const handleClearAll = () => {
        setSearchQuery('');
        setSelectedCategory('all');
        setSelectedLevel('all');
        setSortBy('proficiency-desc');
    };

    return (
        <>
            <PageHeading
                title={langI18n.skills || "Skills & Expertise"}
                subTitle="A comprehensive overview of my professional skills, competencies, and areas of expertise across various domains."
            />

            {/* Filter Bar */}
            <FilterBar
                searchValue={searchQuery}
                onSearchChange={setSearchQuery}
                searchPlaceholder="Search skills by name, category, level, or tags..."
                filters={filterConfigs}
                sortConfig={sortConfig}
                resultsCount={totalSkills}
                resultsLabel={totalSkills === 1 ? 'skill' : 'skills'}
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
                                            {getCategoryIcon(skill.category)}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">{skill.name}</h3>
                                            <p className="text-sm text-muted-foreground">{skill.category}</p>
                                        </div>
                                    </div>
                                    <Badge variant={
                                        skill.level === 'Expert' ? 'default' :
                                            skill.level === 'Advanced' ? 'secondary' :
                                                'outline'
                                    }>
                                        {skill.level}
                                    </Badge>
                                </div>

                                {/* Proficiency Bar */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Proficiency</span>
                                        <span className="font-semibold">{skill.proficiency}%</span>
                                    </div>
                                    <Progress
                                        value={skill.proficiency}
                                        className="h-2"
                                    />
                                </div>
                            </CardHeader>

                            <CardContent>
                                {skill.yearsOfExperience && (
                                    <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                                        <Award className="w-4 h-4" />
                                        <span>{skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? 'year' : 'years'} of experience</span>
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
                <div className="text-center py-12">
                    <div className="text-muted-foreground mb-4">
                        <Search size={48} className="mx-auto mb-4 opacity-50" />
                        <h3 className="text-xl font-semibold mb-2">No skills found</h3>
                        <p className="text-sm sm:text-base">
                            Try adjusting your search terms or filters to find what you're looking for.
                        </p>
                    </div>
                    <Button variant="outline" onClick={handleClearAll}>
                        Clear all filters
                    </Button>
                </div>
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