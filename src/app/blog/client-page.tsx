"use client";
import React, { useMemo } from "react";
import { usePortfolio } from "@/components/context/PortfolioContext";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FilterBar } from "@/components/shared/FilterBar";
import { Pagination } from "@/components/shared/Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { FilterConfig, SortConfig } from "@/lib/types/shared.contract";
import { BlogPost } from "@/lib/types/portfolio";
import { formatDateLong } from "@/lib/helpers/date.helper";
import { SortOption } from "@/lib/types/type.config";
import { ListEmptyDisplay } from "@/components/shared/ListEmptyDisplay";
import { showLucidIcon } from "@/components/lucid-icon-map";
import { PageHeading } from "@/components/shared/PageHeading";
import { useContentLoader } from "@/components/hooks/use-content-loader";
import { AppConfig } from "@/data/configs/constants/app-config";

export default function ClientPage() {
  const { langI18n, profileType, languageType } = usePortfolio();
  const router = useRouter();
  const searchParams = useSearchParams();
  const POSTS_PER_PAGE = AppConfig.item_per_page;

  const {
    data: posts,
    loading,
    error,
  } = useContentLoader<BlogPost[]>(profileType, languageType, "blog_list", []);

  // Sync state with URL parameters
  const query = useMemo(
    () => ({
      page: Math.max(1, Number(searchParams?.get("page") ?? 1)),
      category: searchParams?.get("category") ?? "all",
      tag: searchParams?.get("tag") ?? "all",
      search: searchParams?.get("search") ?? "",
      sort: (searchParams?.get("sort") as SortOption) ?? "date-desc",
    }),
    [searchParams],
  );
  const currentPage = query.page;

  // Filter and search posts
  const filteredPosts = useMemo(() => {
    let filtered = posts.filter((post) => {
      if (query.category !== "all" && post.category !== query.category)
        return false;
      if (query.tag !== "all" && !post.tags?.includes(query.tag)) return false;

      if (query.search) {
        const q = query.search.toLowerCase();
        const searchableText = [
          post.title,
          post.excerpt,
          post.content,
          post.category,
          ...(post.tags || []),
        ]
          .join(" ")
          .toLowerCase();

        if (!searchableText.includes(q)) return false;
      }

      return true;
    });

    filtered.sort((a, b) => {
      switch (query.sort) {
        case "date-desc":
          return +new Date(b.publishedAt) - +new Date(a.publishedAt);
        case "date-asc":
          return +new Date(a.publishedAt) - +new Date(b.publishedAt);
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "category-asc":
          return (a.category || "").localeCompare(b.category || "");
        case "category-desc":
          return (b.category || "").localeCompare(a.category || "");
        default:
          return 0;
      }
    });

    return filtered;
  }, [posts, query]);

  // Get unique categories and tags
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(posts.map((post: BlogPost) => post.category).filter(Boolean)),
    ];
    return uniqueCategories.sort();
  }, [posts]);

  const tags = useMemo(() => {
    const allTags = posts.flatMap((post: BlogPost) => post.tags || []);
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

  // Update URL with all parameters
  const updateURL = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams?.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== "all" && value !== "") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    const query = params.toString();
    router.replace(query ? `/blog?${query}` : "/blog", { scroll: false });
  };

  const handleSearchChange = (value: string) => {
    updateURL({ search: value || null, page: null });
  };

  const handleCategoryChange = (category: string) => {
    updateURL({ category: category === "all" ? null : category, page: null });
  };

  const handleTagChange = (tag: string) => {
    updateURL({ tag: tag === "all" ? null : tag, page: null });
  };

  const handleSortChange = (sort: string) => {
    updateURL({ sort: sort === "date-desc" ? null : sort, page: null });
  };

  const handlePageChange = (page: number) => {
    updateURL({ page: page > 1 ? String(page) : null });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearAll = () => {
    router.replace("/blog", { scroll: false });
  };

  const createBlogDetailUrl = (post: BlogPost) => {
    return `/blog/${languageType}/${post.id}`;
    // return `/blog/${post.id}`
  };

  // Configure filters
  const filterConfigs: FilterConfig[] = [
    {
      name: "category",
      label: langI18n.category,
      value: query.category,
      onChange: handleCategoryChange,
      options: [
        { value: "all", label: langI18n.all_categories },
        ...categories.map((cat: string) => ({ value: cat, label: cat })),
      ],
    },
    {
      name: "tag",
      label: langI18n.tag,
      value: query.tag,
      onChange: handleTagChange,
      options: [
        { value: "all", label: langI18n.tag_all },
        ...tags.map((tag: string) => ({ value: tag, label: tag })),
      ],
    },
  ];

  // Configure sort options
  const sortConfig: SortConfig = {
    value: query.sort,
    onChange: handleSortChange,
    options: [
      { value: "date-desc", label: langI18n.latest_first },
      { value: "date-asc", label: langI18n.oldest_first },
      { value: "title-asc", label: langI18n.title_a_z },
      { value: "title-desc", label: langI18n.title_z_a },
      { value: "category-asc", label: langI18n.category_a_z },
      { value: "category-desc", label: langI18n.category_z_a },
    ],
  };

  return (
    <>
      <PageHeading title={langI18n.blog} subTitle={langI18n.blog_sub_title} />

      {/* Filter Bar */}
      <FilterBar
        searchValue={query.search}
        onSearchChange={handleSearchChange}
        searchPlaceholder={langI18n.blog_search_placeholder}
        filters={filterConfigs}
        sortConfig={sortConfig}
        resultsCount={totalPosts}
        resultsLabel={
          totalPosts === 1
            ? langI18n.post.toLowerCase()
            : langI18n.posts.toLowerCase()
        }
        onClearAll={handleClearAll}
      />

      {/* Posts Grid or Empty State */}
      {currentPosts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map((post: BlogPost) => (
            <Card
              key={post.id}
              className="overflow-hidden group hover:shadow-lg transition-shadow"
            >
              <Link
                key={`${languageType}-${post.id}`}
                href={createBlogDetailUrl(post)}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  {showLucidIcon("calendar", "w-4 h-4")}
                  <span>{formatDateLong(post.publishedAt)}</span>
                  <span>•</span>
                  {showLucidIcon("clock", "w-4 h-4")}
                  <span>{post.readTime} min read</span>
                </div>
                <Link
                  key={`${languageType}-${post.id}`}
                  href={createBlogDetailUrl(post)}
                >
                  <h2 className="text-2xl font-bold group-hover:text-primary transition-colors line-clamp-2">
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
                <p className="text-muted-foreground line-clamp-3 mb-4">
                  {post.excerpt}
                </p>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="w-full" asChild>
                  <Link
                    key={`${languageType}-${post.id}`}
                    href={createBlogDetailUrl(post)}
                  >
                    Read More
                    {showLucidIcon("arrow-right", "w-4 h-4 ml-1")}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <ListEmptyDisplay
          title={langI18n.posts_not_found}
          message={langI18n.posts_not_found_detail}
          handleClearAll={handleClearAll}
        />
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
