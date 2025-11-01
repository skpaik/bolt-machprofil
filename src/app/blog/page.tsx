"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { usePortfolio } from '@/components/context/PortfolioContext';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Search } from 'lucide-react';
import Link from 'next/link';
import { FilterBar } from '@/components/shared/FilterBar';
import { Pagination } from '@/components/shared/Pagination';
import {FilterConfig, SortConfig} from "@/lib/types/shared.contract";
import {SortOption} from "@/lib/types/type.config";

const POSTS_PER_PAGE = 6;


export default function BlogPage() {
  const { appData, contentData, langI18n } = usePortfolio();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');

  const posts = contentData.blogs;

  // Filter and search posts
  const filteredPosts = useMemo(() => {
    let filtered = posts.filter(post => {
      // Category filter
      if (selectedCategory !== 'all' && post.category !== selectedCategory) {
        return false;
      }

      // Tag filter
      if (selectedTag !== 'all' && !post.tags?.includes(selectedTag)) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchableText = [
          post.title,
          post.excerpt,
          post.content,
          post.category,
          ...(post.tags || [])
        ].join(' ').toLowerCase();

        if (!searchableText.includes(query)) {
          return false;
        }
      }

      return true;
    });

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
        case 'date-asc':
          return new Date(a.published_at).getTime() - new Date(b.published_at).getTime();
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'category-asc':
          return (a.category || '').localeCompare(b.category || '');
        case 'category-desc':
          return (b.category || '').localeCompare(a.category || '');
        default:
          return 0;
      }
    });

    return filtered;
  }, [posts, selectedCategory, selectedTag, searchQuery, sortBy]);

  // Get unique categories and tags for filters
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(posts.map(post => post.category).filter(Boolean))];
    return uniqueCategories.sort();
  }, [posts]);

  const tags = useMemo(() => {
    const allTags = posts.flatMap(post => post.tags || []);
    const uniqueTags = [...new Set(allTags)];
    return uniqueTags.sort();
  }, [posts]);

  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const currentPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, endIndex);
  }, [filteredPosts, currentPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedTag, sortBy]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Configure filters for FilterBar component
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
      name: 'tag',
      label: 'Tag',
      value: selectedTag,
      onChange: setSelectedTag,
      options: [
        { value: 'all', label: 'All Tags' },
        ...tags.map(tag => ({ value: tag, label: tag }))
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
      { value: 'category-asc', label: 'Category (A-Z)' },
      { value: 'category-desc', label: 'Category (Z-A)' }
    ]
  };

  const handleClearAll = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedTag('all');
    setSortBy('date-desc');
  };

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header Section - Compact and Responsive */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                {langI18n.blog}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground">
                {langI18n.latestPosts}
              </p>
            </div>
          </div>
        </div>

        {/* Filter Bar Component */}
        <FilterBar
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search posts by title, content, category, or tags..."
            filters={filterConfigs}
            sortConfig={sortConfig}
            resultsCount={totalPosts}
            resultsLabel={totalPosts === 1 ? 'post' : 'posts'}
            onClearAll={handleClearAll}
        />

        {/* Posts Grid or Empty State */}
        {currentPosts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {currentPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden group hover:shadow-lg transition-shadow flex flex-col">
                    <Link href={`/blog/${post.slug}`}>
                      <div className="aspect-video overflow-hidden">
                        <img
                            src={post.cover_image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>
                    <CardHeader className="flex-1">
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-2 flex-wrap">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{formatDate(post.published_at)}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{post.read_time} min read</span>
                        </div>
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <h2 className="text-xl sm:text-2xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                      </Link>
                      {post.category && (
                          <Badge variant="outline" className="mt-2 w-fit">
                            {post.category}
                          </Badge>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm sm:text-base text-muted-foreground line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                      {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {post.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                            ))}
                          </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" asChild className="w-full">
                        <Link href={`/blog/${post.slug}`}>{langI18n.readMore}</Link>
                      </Button>
                    </CardFooter>
                  </Card>
              ))}
            </div>
        ) : (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <Search size={48} className="mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No posts found</h3>
                <p className="text-sm sm:text-base">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
              </div>
              <Button variant="outline" onClick={handleClearAll}>
                Clear all filters
              </Button>
            </div>
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