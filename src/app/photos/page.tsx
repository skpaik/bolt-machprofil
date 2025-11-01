"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Search } from 'lucide-react';
import { usePortfolio } from "@/components/context/PortfolioContext";
import { Pagination } from "@/components/shared/Pagination";
import { FilterBar } from '@/components/shared/FilterBar';
import {FilterConfig, SortConfig} from "@/lib/types/shared.contract";
import {SortOption} from "@/lib/types/type.config";
import {ListEmptyDisplay} from "@/components/shared/ListEmptyDisplay";
import {PageHeading} from "@/components/shared/PageHeading";


export default function PhotoPage() {
    const { appData, contentData, appConfig, langI18n } = usePortfolio();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAlbum, setSelectedAlbum] = useState<string>('all');
    const [selectedTag, setSelectedTag] = useState<string>('all');
    const [sortBy, setSortBy] = useState<SortOption>('date-desc');

    const photos = contentData.photos;

    // Filter and search photos
    const filteredPhotos = useMemo(() => {
        let filtered = photos.filter(photo => {
            // Album filter
            if (selectedAlbum !== 'all' && photo.album !== selectedAlbum) {
                return false;
            }

            // Tag filter
            if (selectedTag !== 'all' && !photo.tags?.includes(selectedTag)) {
                return false;
            }

            // Search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const searchableText = [
                    photo.title,
                    photo.album,
                    photo.description || '',
                    ...(photo.tags || [])
                ].join(' ').toLowerCase();

                if (!searchableText.includes(query)) {
                    return false;
                }
            }

            return true;
        });

        // Sort photos
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'date-desc':
                    return new Date(b.published_at || 0).getTime() - new Date(a.published_at || 0).getTime();
                case 'date-asc':
                    return new Date(a.published_at || 0).getTime() - new Date(b.published_at || 0).getTime();
                case 'title-asc':
                    return a.title.localeCompare(b.title);
                case 'title-desc':
                    return b.title.localeCompare(a.title);
                case 'album-asc':
                    return (a.album || '').localeCompare(b.album || '');
                case 'album-desc':
                    return (b.album || '').localeCompare(a.album || '');
                default:
                    return 0;
            }
        });

        return filtered;
    }, [photos, selectedAlbum, searchQuery, selectedTag, sortBy]);

    // Get unique albums and tags for filters
    const albums = useMemo(() => {
        const uniqueAlbums = [...new Set(photos.map(photo => photo.album).filter(Boolean))];
        return uniqueAlbums.sort();
    }, [photos]);

    const tags = useMemo(() => {
        const allTags = photos.flatMap(photo => photo.tags || []);
        const uniqueTags = [...new Set(allTags)];
        return uniqueTags.sort();
    }, [photos]);

    const totalPhotos = filteredPhotos.length;
    const totalPages = Math.ceil(totalPhotos / appConfig.item_per_page);

    const currentPhotos = useMemo(() => {
        const startIndex = (currentPage - 1) * appConfig.item_per_page;
        const endIndex = startIndex + appConfig.item_per_page;
        return filteredPhotos.slice(startIndex, endIndex);
    }, [filteredPhotos, currentPage, appConfig.item_per_page]);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedAlbum, selectedTag, sortBy]);

    // Configure filters for FilterBar component
    const filterConfigs: FilterConfig[] = [
        {
            name: 'album',
            label: 'Album',
            value: selectedAlbum,
            onChange: setSelectedAlbum,
            options: [
                { value: 'all', label: 'All Albums' },
                ...albums.map(album => ({ value: album, label: album }))
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
            { value: 'album-asc', label: 'Album (A-Z)' },
            { value: 'album-desc', label: 'Album (Z-A)' }
        ]
    };

    const handleClearAll = () => {
        setSearchQuery('');
        setSelectedAlbum('all');
        setSelectedTag('all');
        setSortBy('date-desc');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* Header Section */}
            <PageHeading
                title={langI18n.photos}
                subTitle={"A visual journey through projects, events, and memorable moments."}
            />

            {/* Filter Bar Component */}
            <FilterBar
                searchValue={searchQuery}
                onSearchChange={setSearchQuery}
                searchPlaceholder="Search photos by title, album, tags, or description..."
                filters={filterConfigs}
                sortConfig={sortConfig}
                resultsCount={totalPhotos}
                resultsLabel={totalPhotos === 1 ? 'photo' : 'photos'}
                onClearAll={handleClearAll}
            />

            {/* Photos Grid or Empty State */}
            {currentPhotos.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {currentPhotos.map((item) => (
                        <Card
                            key={item.id}
                            className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow"
                            onClick={() => setSelectedImage(item.image)}
                        >
                            <div className="aspect-square overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                                    {item.title}
                                </h3>
                                <div className="flex flex-wrap gap-2 items-center">
                                    <Badge variant="secondary">{item.album}</Badge>
                                    {item.tags && item.tags.length > 0 && (
                                        <>
                                            {item.tags.slice(0, 2).map((tag) => (
                                                <Badge key={tag} variant="outline" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <ListEmptyDisplay
                    title={"No photos found"}
                    message={"Try adjusting your search terms or filters to find what you're looking for."}
                    handleClearAll={handleClearAll}/>
            )}

            {/* Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-background/95 backdrop-blur flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-4 right-4 p-2 rounded-full bg-background border hover:bg-accent transition-colors"
                        onClick={() => setSelectedImage(null)}
                        aria-label="Close image"
                    >
                        <X size={24} />
                    </button>
                    <img
                        src={selectedImage}
                        alt="Gallery item"
                        className="max-w-full max-h-full object-contain rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                    />
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