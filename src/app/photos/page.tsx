"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { usePortfolio } from "@/components/context/PortfolioContext";
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Image as ImageIcon, Calendar, MapPin, Camera, Eye, Grid3x3, Layers, ArrowLeft } from 'lucide-react';
import { FilterBar } from '@/components/shared/FilterBar';
import { Pagination } from "@/components/shared/Pagination";
import { useRouter, useSearchParams } from 'next/navigation';
import {FilterConfig, SortConfig} from "@/lib/types/shared.contract";
import {Photo} from "@/lib/types/portfolio";
import {SortOption} from "@/lib/types/type.config";

type ViewMode = 'gallery' | 'albums';

export default function PhotoPage() {
    const { appData, contentData, appConfig, langI18n } = usePortfolio();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAlbum, setSelectedAlbum] = useState<string>('all');
    const [selectedTag, setSelectedTag] = useState<string>('all');
    const [sortBy, setSortBy] = useState<SortOption>('date-desc');
    const [viewMode, setViewMode] = useState<ViewMode>('gallery');

    // Use real data if available, otherwise use sample data
    const photos =  contentData.photos;

    // Get URL parameters
    const albumParam = searchParams?.get('album');
    const photoParam = searchParams?.get('photo');

    // Set album filter based on URL parameter
    useEffect(() => {
        if (albumParam && albumParam !== 'all') {
            setSelectedAlbum(decodeURIComponent(albumParam));
            setViewMode('gallery');
        } else if (!albumParam) {
            setSelectedAlbum('all');
        }
    }, [albumParam]);

    // Get unique albums and tags
    const albums = useMemo(() => {
        const uniqueAlbums = [...new Set(photos.map((photo: Photo) => photo.album).filter(Boolean))];
        return uniqueAlbums.sort();
    }, [photos]);

    const tags = useMemo(() => {
        const allTags = photos.flatMap((photo: Photo) => photo.tags || []);
        const uniqueTags = [...new Set(allTags)];
        return uniqueTags.sort();
    }, [photos]);

    // Group photos by album
    const albumGroups = useMemo(() => {
        const groups: { [key: string]: Photo[] } = {};
        photos.forEach((photo: Photo) => {
            if (!groups[photo.album]) {
                groups[photo.album] = [];
            }
            groups[photo.album].push(photo);
        });
        return groups;
    }, [photos]);

    // Filter and search photos
    const filteredPhotos = useMemo(() => {
        let filtered = photos.filter((photo: Photo) => {
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
        filtered.sort((a: Photo, b: Photo) => {
            switch (sortBy) {
                case 'date-desc':
                    return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime();
                case 'date-asc':
                    return new Date(a.date || 0).getTime() - new Date(b.date || 0).getTime();
                case 'title-asc':
                    return a.title.localeCompare(b.title);
                case 'title-desc':
                    return b.title.localeCompare(a.title);
                case 'album-asc':
                    return (a.album || '').localeCompare(b.album || '');
                default:
                    return 0;
            }
        });

        return filtered;
    }, [photos, selectedAlbum, selectedTag, searchQuery, sortBy]);

    const totalPhotos = filteredPhotos.length;
    const totalPages = Math.ceil(totalPhotos / (appConfig?.item_per_page || 12));

    const currentPhotos = useMemo(() => {
        const startIndex = (currentPage - 1) * (appConfig?.item_per_page || 12);
        const endIndex = startIndex + (appConfig?.item_per_page || 12);
        return filteredPhotos.slice(startIndex, endIndex);
    }, [filteredPhotos, currentPage, appConfig]);

    // Get page from URL or default to 1
    const pageParam = searchParams?.get('page');

    useEffect(() => {
        if (pageParam) {
            const page = parseInt(pageParam);
            if (!isNaN(page) && page > 0) {
                setCurrentPage(page);
            }
        }
    }, [pageParam]);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
        // Update URL to remove page parameter when filters change
        const params = new URLSearchParams(searchParams?.toString());
        params.delete('page');
        if (params.toString()) {
            router.push(`/photos?${params.toString()}`, { scroll: false });
        } else {
            router.push('/photos', { scroll: false });
        }
    }, [searchQuery, selectedAlbum, selectedTag, sortBy]);

    // Find current photo for detail view
    const currentPhoto = photoParam ? photos.find((p: Photo) => p.id.toString() === photoParam) : null;

    // Handle album selection from filter
    const handleAlbumChange = (album: string) => {
        setSelectedAlbum(album);
        // Update URL with album parameter
        const params = new URLSearchParams(searchParams?.toString());
        if (album !== 'all') {
            params.set('album', album);
        } else {
            params.delete('album');
        }
        params.delete('photo'); // Clear photo when changing album
        router.push(`/photos?${params.toString()}`, { scroll: false });
    };

    // Configure filters
    const filterConfigs: FilterConfig[] = [
        {
            name: 'album',
            label: 'Album',
            value: selectedAlbum,
            onChange: handleAlbumChange,
            options: [
                { value: 'all', label: 'All Albums' },
                ...albums.map((album: string) => ({ value: album, label: album }))
            ]
        },
        {
            name: 'tag',
            label: 'Tag',
            value: selectedTag,
            onChange: setSelectedTag,
            options: [
                { value: 'all', label: 'All Tags' },
                ...tags.map((tag: string) => ({ value: tag, label: tag }))
            ]
        }
    ];

    const sortConfig: SortConfig = {
        value: sortBy,
        onChange: (value: string) => setSortBy(value as SortOption),
        options: [
            { value: 'date-desc', label: 'Date (Newest)' },
            { value: 'date-asc', label: 'Date (Oldest)' },
            { value: 'title-asc', label: 'Title (A-Z)' },
            { value: 'title-desc', label: 'Title (Z-A)' },
            { value: 'album-asc', label: 'Album (A-Z)' },
            { value: 'views-desc', label: 'Most Viewed' }
        ]
    };

    const handleClearAll = () => {
        setSearchQuery('');
        setSelectedAlbum('all');
        setSelectedTag('all');
        setSortBy('date-desc');
        router.push('/photos', { scroll: false });
    };

    const handlePhotoClick = (photo: Photo) => {
        const params = new URLSearchParams(searchParams?.toString());
        params.set('photo', photo.id.toString());
        router.push(`/photos?${params.toString()}`, { scroll: false });
    };

    const handleClosePhoto = () => {
        const params = new URLSearchParams(searchParams?.toString());
        params.delete('photo');
        router.push(`/photos?${params.toString()}`, { scroll: false });
    };

    const handleAlbumCardClick = (albumName: string) => {
        setSelectedAlbum(albumName);
        setViewMode('gallery');
        router.push(`/photos?album=${encodeURIComponent(albumName)}`, { scroll: false });
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        const params = new URLSearchParams(searchParams?.toString());
        if (page > 1) {
            params.set('page', page.toString());
        } else {
            params.delete('page');
        }
        router.push(`/photos?${params.toString()}`, { scroll: true });
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return null;
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // If photo detail is open, show full-screen view
    if (currentPhoto) {
        return (
            <div className="fixed inset-0 z-50 bg-black">
                {/* Header */}
                <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <Button
                            variant="ghost"
                            className="text-white hover:bg-white/10"
                            onClick={handleClosePhoto}
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back to Gallery
                        </Button>
                        <Button
                            variant="ghost"
                            className="text-white hover:bg-white/10"
                            onClick={handleClosePhoto}
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="h-full flex flex-col lg:flex-row">
                    {/* Image Container */}
                    <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
                        <img
                            src={currentPhoto.image}
                            alt={currentPhoto.title}
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>

                    {/* Details Sidebar */}
                    <div className="w-full lg:w-96 bg-background p-6 overflow-y-auto border-t lg:border-t-0 lg:border-l border-border">
                        <h2 className="text-2xl font-bold mb-2">{currentPhoto.title}</h2>
                        <Badge variant="secondary" className="mb-4">{currentPhoto.album}</Badge>

                        {currentPhoto.description && (
                            <p className="text-muted-foreground mb-4">
                                {currentPhoto.description}
                            </p>
                        )}

                        <div className="space-y-3 mb-4">
                            {currentPhoto.date && (
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="w-4 h-4 text-muted-foreground" />
                                    <span>{formatDate(currentPhoto.date)}</span>
                                </div>
                            )}
                            {currentPhoto.location && (
                                <div className="flex items-center gap-2 text-sm">
                                    <MapPin className="w-4 h-4 text-muted-foreground" />
                                    <span>{currentPhoto.location}</span>
                                </div>
                            )}
                            {currentPhoto.camera && (
                                <div className="flex items-center gap-2 text-sm">
                                    <Camera className="w-4 h-4 text-muted-foreground" />
                                    <span>{currentPhoto.camera}</span>
                                </div>
                            )}
                        </div>

                        {currentPhoto.tags && currentPhoto.tags.length > 0 && (
                            <div>
                                <h3 className="font-semibold text-sm mb-2">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {currentPhoto.tags.map((tag: string) => (
                                        <Badge key={tag} variant="outline" className="text-xs">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* Header */}
            <div className="mb-8 sm:mb-12">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                            {selectedAlbum !== 'all' ? selectedAlbum : 'Photos'}
                        </h1>
                        <p className="text-base sm:text-lg text-muted-foreground">
                            {selectedAlbum !== 'all'
                                ? `Viewing album: ${selectedAlbum}`
                                : 'A visual journey through projects, events, and memorable moments.'}
                        </p>
                    </div>
                    {/* View Mode Toggle */}
                    <div className="flex gap-2">
                        <Button
                            variant={viewMode === 'gallery' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setViewMode('gallery')}
                        >
                            <Grid3x3 className="w-4 h-4 mr-2" />
                            Gallery
                        </Button>
                        <Button
                            variant={viewMode === 'albums' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setViewMode('albums')}
                        >
                            <Layers className="w-4 h-4 mr-2" />
                            Albums
                        </Button>
                    </div>
                </div>
            </div>

            {/* Albums View */}
            {viewMode === 'albums' ? (
                <div className="space-y-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold mb-2">Photo Albums</h2>
                        <p className="text-muted-foreground">Browse photos organized by albums</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.entries(albumGroups).map(([albumName, albumPhotos]: [string, any]) => (
                            <Card
                                key={albumName}
                                className="overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
                                onClick={() => handleAlbumCardClick(albumName)}
                            >
                                <div className="aspect-video overflow-hidden relative">
                                    <img
                                        src={albumPhotos[0].image}
                                        alt={albumName}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="flex items-center gap-2 text-sm">
                                            <ImageIcon className="w-4 h-4" />
                                            <span>{albumPhotos.length} photos</span>
                                        </div>
                                    </div>
                                </div>
                                <CardContent className="p-4">
                                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                                        {albumName}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {albumPhotos.length} {albumPhotos.length === 1 ? 'photo' : 'photos'}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    {/* Gallery View with Filters */}
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
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {currentPhotos.map((item: Photo) => (
                                <Card
                                    key={item.id}
                                    className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow"
                                    onClick={() => handlePhotoClick(item)}
                                >
                                    <div className="aspect-square overflow-hidden relative">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-3">
                                        <h3 className="font-semibold text-sm mb-1 line-clamp-1">
                                            {item.title}
                                        </h3>
                                        <Badge variant="secondary" className="text-xs">{item.album}</Badge>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <ImageIcon size={48} className="mx-auto mb-4 opacity-50 text-muted-foreground" />
                            <h3 className="text-xl font-semibold mb-2">No photos found</h3>
                            <p className="text-sm sm:text-base text-muted-foreground mb-4">
                                Try adjusting your search terms or filters.
                            </p>
                            <Button variant="outline" onClick={handleClearAll}>
                                Clear all filters
                            </Button>
                        </div>
                    )}

                    {/* Pagination */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
}