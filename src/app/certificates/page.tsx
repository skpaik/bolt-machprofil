"use client";

import React, { useEffect, useMemo, useState } from "react";
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
import { FilterConfig, SortConfig } from "@/lib/types/shared.contract";
import { SortOption } from "@/lib/types/type.config";
import { Certificate } from "@/lib/types/portfolio";
import { ListEmptyDisplay } from "@/components/shared/ListEmptyDisplay";
import { showLucidIcon } from "@/components/lucid-icon-map";
import { formatDateLong } from "@/lib/helpers/date.helper";

export default function CertificatesPage() {
  const { appConfig, langI18n, contentData } =
    usePortfolio();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("date-desc");

  // Use real data if available, otherwise use sample data
  const certificates = contentData.certificate_list;
  const ITEMS_PER_PAGE = appConfig.item_per_page;

  // Filter and search certificates
  const filteredCertificates = useMemo(() => {
    let filtered = certificates.filter((cert) => {
      // Category filter
      if (selectedCategory !== "all" && cert.category !== selectedCategory) {
        return false;
      }

      // Status filter (valid/expired)
      if (selectedStatus !== "all") {
        const isExpired =
          cert.expiryDate !== "No Expiry" &&
          new Date(cert.expiryDate) < new Date();
        if (selectedStatus === "valid" && isExpired) return false;
        if (selectedStatus === "expired" && !isExpired) return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchableText = [
          cert.title,
          cert.issuer,
          cert.category,
          cert.credentialId || "",
          cert.description || "",
          ...(cert.skills || []),
        ]
          .join(" ")
          .toLowerCase();

        if (!searchableText.includes(query)) {
          return false;
        }
      }

      return true;
    });

    // Sort certificates
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return (
            new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()
          );
        case "date-asc":
          return (
            new Date(a.issueDate).getTime() - new Date(b.issueDate).getTime()
          );
        case "name-asc":
          return a.title.localeCompare(b.title);
        case "name-desc":
          return b.title.localeCompare(a.title);
        case "issuer-asc":
          return a.issuer.localeCompare(b.issuer);
        case "issuer-desc":
          return b.issuer.localeCompare(a.issuer);
        default:
          return 0;
      }
    });

    return filtered;
  }, [certificates, selectedCategory, selectedStatus, searchQuery, sortBy]);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(certificates.map((cert) => cert.category)),
    ];
    return uniqueCategories.sort();
  }, [certificates]);

  const totalCertificates = filteredCertificates.length;
  const totalPages = Math.ceil(totalCertificates / ITEMS_PER_PAGE);

  const currentCertificates = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredCertificates.slice(startIndex, endIndex);
  }, [filteredCertificates, currentPage]);

  // Separate featured and regular certificates
  const featuredCertificates = currentCertificates.filter(
    (cert) => cert.featured,
  );
  const regularCertificates = currentCertificates.filter(
    (cert) => !cert.featured,
  );

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedStatus, sortBy]);

  // Configure filters
  const filterConfigs: FilterConfig[] = [
    {
      name: "category",
      label: "Category",
      value: selectedCategory,
      onChange: setSelectedCategory,
      options: [
        { value: "all", label: "All Categories" },
        ...categories.map((cat) => ({ value: cat, label: cat })),
      ],
    },
    {
      name: "status",
      label: "Status",
      value: selectedStatus,
      onChange: setSelectedStatus,
      options: [
        { value: "all", label: "All Status" },
        { value: "valid", label: "Valid" },
        { value: "expired", label: "Expired" },
      ],
    },
  ];

  const sortConfig: SortConfig = {
    value: sortBy,
    onChange: (value: string) => setSortBy(value as SortOption),
    options: [
      { value: "date-desc", label: "Issue Date (Newest)" },
      { value: "date-asc", label: "Issue Date (Oldest)" },
      { value: "name-asc", label: "Name (A-Z)" },
      { value: "name-desc", label: "Name (Z-A)" },
      { value: "issuer-asc", label: "Issuer (A-Z)" },
      { value: "issuer-desc", label: "Issuer (Z-A)" },
    ],
  };

  const handleClearAll = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedStatus("all");
    setSortBy("date-desc");
  };

  const isExpired = (expiryDate: string | undefined) => {
    if (!expiryDate || expiryDate === "No Expiry") return false;
    return new Date(expiryDate) < new Date();
  };

  const CertificateCard = ({ cert }: { cert: Certificate }) => {
    const expired = isExpired(cert.expiryDate);

    return (
      <Card
        className={`hover:shadow-lg transition-shadow ${cert.featured ? "border-2 border-primary" : ""}`}
      >
        {cert.featured && (
          <div className="bg-primary text-primary-foreground text-xs font-semibold py-1 px-4 text-center">
            ⭐ FEATURED
          </div>
        )}

        <CardHeader>
          <div className="flex items-start justify-between mb-3">
            {cert.logo && (
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <img
                  src={cert.logo}
                  alt={cert.issuer}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex gap-2">
              {cert.verified && (
                <Badge variant="secondary" className="text-xs">
                  {showLucidIcon("check-circle", "w-3 h-3 mr-1")}
                  Verified
                </Badge>
              )}
              {expired && (
                <Badge variant="destructive" className="text-xs">
                  Expired
                </Badge>
              )}
            </div>
          </div>

          <h3 className="font-bold text-lg mb-2 line-clamp-2">{cert.title}</h3>

          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            {showLucidIcon("building2", "w-4 h-4")}
            <span>{cert.issuer}</span>
          </div>

          <Badge variant="outline">{cert.category}</Badge>
        </CardHeader>

        <CardContent>
          {cert.description && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
              {cert.description}
            </p>
          )}

          <div className="space-y-2 text-sm mb-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              {showLucidIcon("calendar", "w-4 h-4")}
              <span>Issued: {formatDateLong(cert.issueDate)}</span>
            </div>
            {cert.expiryDate && (
              <div className="flex items-center gap-2 text-muted-foreground">
                {showLucidIcon("clock", "w-3 h-3 mr-1")}
                <span>
                  {cert.expiryDate === "No Expiry"
                    ? "No Expiry"
                    : `Expires: ${formatDateLong(cert.expiryDate)}`}
                </span>
              </div>
            )}
          </div>

          {cert.skills && cert.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {cert.skills.slice(0, 4).map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>

        <CardFooter>
          {cert.credentialUrl ? (
            <Button variant="outline" className="w-full" asChild>
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Credential
                {showLucidIcon("external-link", "w-4 h-4 ml-2")}
              </a>
            </Button>
          ) : (
            <div className="text-xs text-muted-foreground text-center w-full">
              ID: {cert.credentialId}
            </div>
          )}
        </CardFooter>
      </Card>
    );
  };

  return (
    <>
      <PageHeading
        title={langI18n.certificates || "Certificates & Achievements"}
        subTitle="Professional certifications and achievements demonstrating expertise and continuous learning."
      />

      {/* Filter Bar */}
      <FilterBar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search certificates by name, issuer, category, or skills..."
        filters={filterConfigs}
        sortConfig={sortConfig}
        resultsCount={totalCertificates}
        resultsLabel={totalCertificates === 1 ? "certificate" : "certificates"}
        onClearAll={handleClearAll}
      />

      {/* Certificates Grid or Empty State */}
      {currentCertificates.length > 0 ? (
        <>
          {/* Featured Certificates */}
          {featuredCertificates.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                {showLucidIcon("trophy", "w-5 h-5 text-primary")}
                <h2 className="text-2xl font-bold">Featured Certifications</h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredCertificates.map((cert) => (
                  <CertificateCard key={cert.id} cert={cert} />
                ))}
              </div>
            </div>
          )}

          {/* Regular Certificates */}
          {regularCertificates.length > 0 && (
            <div>
              {featuredCertificates.length > 0 && (
                <h2 className="text-2xl font-bold mb-6">All Certifications</h2>
              )}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularCertificates.map((cert) => (
                  <CertificateCard key={cert.id} cert={cert} />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <ListEmptyDisplay
          title={"No certificates found"}
          message={"Try adjusting your search terms or filters."}
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
