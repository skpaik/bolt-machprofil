"use client";

import React, { useMemo, useState } from "react";
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
import { Publication } from "@/lib/types/portfolio";
import { FilterConfig, SortConfig } from "@/lib/types/shared.contract";
import { SortOption } from "@/lib/types/type.config";
import { ListEmptyDisplay } from "@/components/shared/ListEmptyDisplay";
import { showLucidIcon } from "@/components/lucid-icon-map";
import { useContentLoader } from "@/components/hooks/use-content-loader";
import { usePagination } from "@/components/hooks/use-pagination";

export default function ClientPage() {
  const { langI18n, profileType, languageType } = usePortfolio();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("year-desc");

  const {
    data: publications,
    loading,
    error,
  } = useContentLoader<Publication[]>(
    profileType,
    languageType,
    "publication_list",
    [],
  );

  // Filter and search publications
  const filteredPublications = useMemo(() => {
    let filtered = publications.filter((pub: Publication) => {
      // Type filter
      if (selectedType !== "all" && pub.type !== selectedType) {
        return false;
      }

      // Status filter
      if (selectedStatus !== "all" && pub.status !== selectedStatus) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchableText = [
          pub.title,
          pub.abstract,
          pub.publishedIn,
          pub.publisher || "",
          ...(pub.authors || []),
          ...(pub.keywords || []),
        ]
          .join(" ")
          .toLowerCase();

        if (!searchableText.includes(query)) {
          return false;
        }
      }

      return true;
    });

    // Sort publications
    filtered.sort((a: Publication, b: Publication) => {
      switch (sortBy) {
        case "year-desc":
          return b.year - a.year;
        case "year-asc":
          return a.year - b.year;
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "citations-desc":
          return (b.citations || 0) - (a.citations || 0);
        case "type-asc":
          return a.type.localeCompare(b.type);
        default:
          return 0;
      }
    });

    return filtered;
  }, [publications, selectedType, selectedStatus, searchQuery, sortBy]);

  // Get unique types and statuses
  const types = useMemo(() => {
    const uniqueTypes = [
      ...new Set(publications.map((p: Publication) => p.type)),
    ];
    return uniqueTypes.sort();
  }, [publications]);

  const statuses = useMemo(() => {
    const uniqueStatuses = [
      ...new Set(
        publications.map((p: Publication) => p.status).filter(Boolean),
      ),
    ];
    return uniqueStatuses.sort();
  }, [publications]);

  const {
    currentPage,
    setCurrentPage,
    currentItems: currentPublications,
    totalPages,
    totalItems: totalPublications,
  } = usePagination(filteredPublications);

  // Separate featured and regular publications
  const featuredPublications = currentPublications.filter(
    (p: Publication) => p.featured,
  );
  const regularPublications = currentPublications.filter(
    (p: Publication) => !p.featured,
  );

  // Configure filters
  const filterConfigs: FilterConfig[] = [
    {
      name: "type",
      label: langI18n.type,
      value: selectedType,
      onChange: setSelectedType,
      options: [
        { value: "all", label: langI18n.all_types },
        ...types.map((type: string) => ({ value: type, label: type })),
      ],
    },
  ];

  if (statuses.length > 0) {
    filterConfigs.push({
      name: "status",
      label: langI18n.status,
      value: selectedStatus,
      onChange: setSelectedStatus,
      options: [
        { value: "all", label: langI18n.status_all },
        ...statuses.map((status: string) => ({ value: status, label: status })),
      ],
    });
  }

  const sortConfig: SortConfig = {
    value: sortBy,
    onChange: (value: string) => setSortBy(value as SortOption),
    options: [
      { value: "year-desc", label: langI18n.year_newest },
      { value: "year-asc", label: langI18n.year_oldest },
      { value: "title-asc", label: langI18n.title_a_z },
      { value: "title-desc", label: langI18n.title_z_a },
      { value: "citations-desc", label: langI18n.most_cited },
      { value: "type-asc", label: langI18n.type_a_z },
    ],
  };

  const handleClearAll = () => {
    setSearchQuery("");
    setSelectedType("all");
    setSelectedStatus("all");
    setSortBy("year-desc");
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Journal":
        return "default";
      case "Conference":
        return "secondary";
      case "Book Chapter":
        return "outline";
      case "Workshop":
        return "secondary";
      case "Preprint":
        return "outline";
      case "Thesis":
        return "default";
      case "Patent":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "Published":
        return "default";
      case "In Press":
        return "secondary";
      case "Under Review":
        return "outline";
      case "Preprint":
        return "outline";
      default:
        return "outline";
    }
  };

  const PublicationCard = ({ pub }: { pub: Publication }) => (
    <Card
      className={`hover:shadow-lg transition-shadow ${pub.featured ? "border-2 border-primary" : ""}`}
    >
      {pub.featured && (
        <div className="bg-primary text-primary-foreground text-xs font-semibold py-1 px-4 text-center flex items-center justify-center gap-1">
          {showLucidIcon("star", "w-3 h-3 fill-current")}
          {langI18n.featured.toUpperCase()}
        </div>
      )}

      <CardHeader>
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex gap-2">
            <Badge variant={getTypeColor(pub.type) as any}>{pub.type}</Badge>
            {pub.status && (
              <Badge variant={getStatusColor(pub.status) as any}>
                {pub.status}
              </Badge>
            )}
          </div>
          {pub.citations && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              {showLucidIcon("quote", "w-4 h-4")}
              <span>{pub.citations}</span>
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold mb-3 leading-tight">{pub.title}</h3>

        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            {showLucidIcon(
              "users",
              "w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0",
            )}
            <span className="text-muted-foreground">
              {pub.authors.join(", ")}
            </span>
          </div>

          <div className="flex items-start gap-2">
            {showLucidIcon(
              "book-open",
              "w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0",
            )}
            <span className="text-muted-foreground">
              {pub.publishedIn}
              {pub.publisher && ` (${pub.publisher})`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {showLucidIcon("calendar", "w-4 h-4 text-muted-foreground")}
            <span className="text-muted-foreground">
              {pub.month ? `${pub.month} ` : ""}
              {pub.year}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {pub.abstract}
        </p>

        {pub.keywords && pub.keywords.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {pub.keywords.map((keyword: string) => (
              <Badge key={keyword} variant="outline" className="text-xs">
                {keyword}
              </Badge>
            ))}
          </div>
        )}

        {pub.doi && (
          <div className="text-xs text-muted-foreground mb-2">
            <span className="font-semibold">{langI18n.doi}:</span> {pub.doi}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-2">
        {pub.url && (
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <a href={pub.url} target="_blank" rel="noopener noreferrer">
              {showLucidIcon("external-link", "w-3 h-3 mr-1")}
              {langI18n.view}
            </a>
          </Button>
        )}
        {pub.pdfUrl && (
          <Button variant="default" size="sm" className="flex-1" asChild>
            <a href={pub.pdfUrl} target="_blank" rel="noopener noreferrer">
              {showLucidIcon("download", "w-3 h-3 mr-1")}
              {langI18n.pdf}
            </a>
          </Button>
        )}
        {!pub.url && !pub.pdfUrl && (
          <div className="text-xs text-muted-foreground text-center w-full py-2">
            {langI18n.contact_for_access}
          </div>
        )}
      </CardFooter>
    </Card>
  );

  return (
    <>
      <PageHeading
        title={langI18n.publications}
        subTitle={langI18n.publications_sub_title}
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="text-center p-4">
          {showLucidIcon("file-text", "w-6 h-6 mx-auto mb-2 text-primary")}
          <div className="text-2xl font-bold">{publications.length}</div>
          <div className="text-xs text-muted-foreground">
            {langI18n.total_publications}
          </div>
        </Card>
        <Card className="text-center p-4">
          {showLucidIcon("award", "w-6 h-6 mx-auto mb-2 text-primary")}
          <div className="text-2xl font-bold">
            {publications.reduce(
              (sum: number, p: Publication) => sum + (p.citations || 0),
              0,
            )}
          </div>
          <div className="text-xs text-muted-foreground">
            {langI18n.total_citations}
          </div>
        </Card>
        <Card className="text-center p-4">
          {showLucidIcon("building2", "w-6 h-6 mx-auto mb-2 text-primary")}
          <div className="text-2xl font-bold">
            {
              new Set(
                publications
                  .map((p: Publication) => p.publisher)
                  .filter(Boolean),
              ).size
            }
          </div>
          <div className="text-xs text-muted-foreground">
            {langI18n.publishers}
          </div>
        </Card>
        <Card className="text-center p-4">
          {showLucidIcon("star", "w-6 h-6 mx-auto mb-2 text-primary")}
          <div className="text-2xl font-bold">
            {publications.filter((p: Publication) => p.featured).length}
          </div>
          <div className="text-xs text-muted-foreground">
            {langI18n.featured}
          </div>
        </Card>
      </div>

      {/* Filter Bar */}
      <FilterBar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder={langI18n.publications_search_placeholder}
        filters={filterConfigs}
        sortConfig={sortConfig}
        resultsCount={totalPublications}
        resultsLabel={
          totalPublications === 1 ? langI18n.publication : langI18n.publications
        }
        onClearAll={handleClearAll}
      />

      {/* Publications List or Empty State */}
      {currentPublications.length > 0 ? (
        <>
          {/* Featured Publications */}
          {featuredPublications.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                {showLucidIcon("award", "w-5 h-5 text-primary")}
                <h2 className="text-2xl font-bold">
                  {langI18n.featured_publications}
                </h2>
              </div>
              <div className="space-y-6">
                {featuredPublications.map((pub: Publication) => (
                  <PublicationCard key={pub.id} pub={pub} />
                ))}
              </div>
            </div>
          )}

          {/* Regular Publications */}
          {regularPublications.length > 0 && (
            <div>
              {featuredPublications.length > 0 && (
                <h2 className="text-2xl font-bold mb-6">
                  {langI18n.all_publications}
                </h2>
              )}
              <div className="space-y-6">
                {regularPublications.map((pub: Publication) => (
                  <PublicationCard key={pub.id} pub={pub} />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <ListEmptyDisplay
          title={langI18n.publications_not_found}
          message={langI18n.publications_not_found_message}
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
