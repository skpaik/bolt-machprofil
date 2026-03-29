import type { Metadata } from "next";
import type { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { PageMetaParams } from "@/lib/types/portfolio";
import { site_const } from "@/data/configs/generated/site";

export class MetadataHelper {
  public static generateMetaData(): Metadata {
    return {
      metadataBase: new URL(site_const.baseUrl),
      title: {
        default: site_const.siteTitle,
        template: `%s | ${site_const.siteTitle}`,
      },
      description: site_const.description,
      keywords: [...site_const.keywords],
      authors: [{ name: site_const.author }],
      creator: site_const.author,
      publisher: site_const.author,
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      icons: {
        icon: site_const.favicon,
        shortcut: site_const.favicon,
        apple: site_const.favicon,
      },
      openGraph: this.generateOpenGraphData(),
      twitter: {
        card: "summary_large_image",
        title: site_const.siteTitle,
        description: site_const.description,
        creator: `@${site_const.author.replace(/\s+/g, "")}`,
        images: [site_const.ogImage],
      },
      verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      },
    };
  }

  public static generatePageMetadata({
    title,
    description,
    image,
    url,
    type = "website",
    author,
    keywords,
    publishedTime,
    modifiedTime,
  }: PageMetaParams): Metadata {
    const siteName = site_const.siteTitle;
    const defaultDescription = site_const.description;
    const defaultImage = site_const.ogImage;
    const baseUrl = site_const.baseUrl;

    const pageUrl = url ? `${baseUrl}${url}` : baseUrl;
    const pageImage = image ?? defaultImage;
    const pageDescription = description ?? defaultDescription;
    const pageTitle = title ?? site_const.siteTitle;

    return {
      title,
      description: pageDescription,
      keywords: keywords ?? [...site_const.keywords],
      authors: author ? [{ name: author }] : [{ name: site_const.author }],
      creator: author ?? site_const.author,
      publisher: site_const.author,
      openGraph: {
        title: pageTitle,
        description: pageDescription,
        url: pageUrl,
        siteName,
        type,
        images: [
          {
            url: pageImage,
            width: 1200,
            height: 630,
            alt: pageTitle,
          },
        ],
        ...(publishedTime && { publishedTime }),
        ...(modifiedTime && { modifiedTime }),
      },
      twitter: {
        card: "summary_large_image",
        title: pageTitle,
        description: pageDescription,
        creator: `@${site_const.author.replace(/\s+/g, "")}`,
        images: [pageImage],
      },
      alternates: {
        canonical: pageUrl,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  }

  // Generate JSON-LD structured data for Person/Organization
  public static generatePersonStructuredData() {
    return {
      "@context": "https://schema.org",
      "@type": "Person",
      name: site_const.author,
      url: site_const.baseUrl,
      image: site_const.ogImage,
      description: site_const.description,
      jobTitle: "Software Engineer",
      sameAs: [
        // Add social media links here
        // "https://twitter.com/username",
        // "https://linkedin.com/in/username",
        // "https://github.com/username"
      ],
    };
  }

  // Generate JSON-LD for Blog Post
  public static generateBlogPostStructuredData({
    title,
    description,
    image,
    publishedTime,
    modifiedTime,
    author,
    url,
  }: {
    title: string;
    description: string;
    image?: string;
    publishedTime: string;
    modifiedTime?: string;
    author?: string;
    url: string;
  }) {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: title,
      description: description,
      image: image ?? site_const.ogImage,
      datePublished: publishedTime,
      dateModified: modifiedTime ?? publishedTime,
      author: {
        "@type": "Person",
        name: author ?? site_const.author,
      },
      publisher: {
        "@type": "Person",
        name: site_const.author,
      },
      url: `${site_const.baseUrl}${url}`,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${site_const.baseUrl}${url}`,
      },
    };
  }

  // Generate JSON-LD for Website
  public static generateWebsiteStructuredData() {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: site_const.siteTitle,
      description: site_const.description,
      url: site_const.baseUrl,
      author: {
        "@type": "Person",
        name: site_const.author,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: `${site_const.baseUrl}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    };
  }

  // Generate JSON-LD for BreadcrumbList
  public static generateBreadcrumbStructuredData(
    items: Array<{ name: string; url: string }>,
  ) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: `${site_const.baseUrl}${item.url}`,
      })),
    };
  }

  private static generateOpenGraphData(): OpenGraph {
    return {
      type: "website",
      locale: "en_US",
      url: site_const.baseUrl,
      siteName: site_const.siteTitle,
      title: site_const.siteTitle,
      description: site_const.description,
      images: [
        {
          url: site_const.ogImage,
          width: 1200,
          height: 630,
          alt: site_const.siteTitle,
        },
      ],
    };
  }
}
