"use client";

import React, { useState, useMemo } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const { appData,  langI18n } = usePortfolio();
  const [currentPage, setCurrentPage] = useState(1);

  const posts = appData.blogs;
  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const currentPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    return posts.slice(startIndex, endIndex);
  }, [posts, currentPage]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{langI18n.blog}</h1>
        <p className="text-lg text-muted-foreground">
          {langI18n.latestPosts}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
            <Link href={`/blog/${post.slug}`}>
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
            <CardHeader>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Calendar size={14} />
                <span>{formatDate(post.published_at)}</span>
                <span>•</span>
                <Clock size={14} />
                <span>{post.read_time} min read</span>
              </div>
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
              </Link>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-3 mb-4">
                {post.excerpt}
              </p>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary">
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

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={20} />
          </Button>

          <div className="flex items-center gap-2">
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return <span key={page}>...</span>;
              }
              return null;
            })}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={20} />
          </Button>
        </div>
      )}
    </div>
  );
}
