"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePortfolio } from '@/components/context/PortfolioContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {formatDateLong} from "@/lib/helpers/date.helper";
import {showLucidIcon} from "@/components/lucid-icon-map";

interface BlogDetailPageProps {
    slug: string;
}

export default async function BlogDetailPage({ params }: { params: Promise<BlogDetailPageProps> }) {
  const {appData, blogContentData} = usePortfolio();
  const router = useRouter();
  const { slug} = await params;

  // Use real data if available
  const posts = blogContentData;
  const post = posts.find(p => p.id.toString() === slug);

  if (!post) {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The blog post you're looking for doesn't exist.
            </p>
            <Button asChild>
              <Link href="/blog">
                {showLucidIcon('arrow-left', 'w-4 h-4 mr-2')}
                Back to Blog
              </Link>
            </Button>
          </div>
        </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Get related posts (same category, excluding current post)
  const relatedPosts = posts
      .filter((p: any) => p.id !== slug && p.category === post.category)
      .slice(0, 3);

  return (
      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-muted/30 border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Button variant="ghost" onClick={() => router.back()} className="mb-6">
              {showLucidIcon('arrow-left', 'w-4 h-4 mr-2')}
              Back to Blog
            </Button>

            <div className="space-y-4">
              {post.category && (
                  <Badge variant="secondary" className="text-sm">
                    {post.category}
                  </Badge>
              )}

              <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  {showLucidIcon('calendar', 'w-4 h-4')}
                  <span>{formatDateLong(post.publishedAt)}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-2">
                  {showLucidIcon('clock', 'w-4 h-4')}
                  <span>{post.readTime} min read</span>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShare}
                    className="ml-auto"
                >
                  {showLucidIcon('share2', 'w-4 h-4 mr-2')}
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        {post.coverImage && (
            <div className="w-full aspect-[21/9] max-h-[500px] overflow-hidden bg-muted">
              <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
              />
            </div>
        )}

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="prose prose-lg dark:prose-invert max-w-none">
            {/* Excerpt */}
            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>

            {/* Main Content */}
            <div className="mt-8">
              {/* You can render markdown content here */}
              <div className="whitespace-pre-wrap text-foreground/90 leading-relaxed" dangerouslySetInnerHTML={{__html: post.content}}
              />
            </div>
          </article>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t">
                <div className="flex items-center gap-2 mb-4">
                  {showLucidIcon('tag', 'w-5 h-5 text-muted-foreground')}
                  <h3 className="font-semibold">Tags</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                      <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                        <Badge variant="outline" className="hover:bg-accent cursor-pointer">
                          {tag}
                        </Badge>
                      </Link>
                  ))}
                </div>
              </div>
          )}

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost: any) => (
                      <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full group">
                          <div className="aspect-video overflow-hidden">
                            <img
                                src={relatedPost.coverImage}
                                alt={relatedPost.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-4">
                            <Badge variant="outline" className="mb-2 text-xs">
                              {relatedPost.category}
                            </Badge>
                            <h3 className="font-bold group-hover:text-primary transition-colors line-clamp-2">
                              {relatedPost.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                              {relatedPost.excerpt}
                            </p>
                            <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                              {showLucidIcon('calendar', 'w-3 h-3')}
                              <span>{formatDateLong(relatedPost.publishedAt)}</span>
                            </div>
                          </div>
                        </Card>
                      </Link>
                  ))}
                </div>
              </div>
          )}

          {/* Navigation */}
          <div className="mt-16 pt-8 border-t">
            <Button asChild>
              <Link href="/blog">
                {showLucidIcon('arrow-left', 'w-4 h-4 mr-2')}
                Back to All Posts
              </Link>
            </Button>
          </div>
        </div>
      </div>
  );
}