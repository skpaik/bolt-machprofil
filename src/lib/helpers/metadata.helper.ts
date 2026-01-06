import type { Metadata } from "next";
import type { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { PageMetaParams, SiteConfig } from "@/lib/types/portfolio";
import { site_const } from "@/data/configs/generated/site";

export class MetadataHelper {
  public static generateMetaData(): Metadata {
    const siteConfigData: SiteConfig = site_const;
    return {
      title: siteConfigData.siteTitle,
      description: siteConfigData.siteDescription,
      // authors: {name: siteConfigData.author},
      // generator: siteConfigData.generator,
      // keywords: siteConfigData.keywords,
      // creator: siteConfigData.author,
      // icons: siteConfigData.favicon,
      // openGraph: this.generateOpenGraphData(siteConfigData)
    };
  }

  public static generatePageMetadata({
    title,
    description,
    image,
    url,
    type = "website",
    author,
  }: PageMetaParams): Metadata {
    const siteName = "My Portfolio"; // Change to your site name
    const defaultDescription =
      "Check out my portfolio and blog about web development, programming, and design.";
    const defaultImage = "/og-default.png";
    const baseUrl = "https://yourdomain.com";

    return {
      title: title ? `${title} | ${siteName}` : siteName,
      description: description ?? defaultDescription,
      openGraph: {
        title: title ?? siteName,
        description: description ?? defaultDescription,
        url: url ?? baseUrl,
        siteName,
        type,
        images: [
          {
            url: image ?? defaultImage,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: title ?? siteName,
        description: description ?? defaultDescription,
        images: [image ?? defaultImage],
      },
      metadataBase: new URL(baseUrl),
      authors: author ? [{ name: author }] : undefined,
    };
  }

  private static generateOpenGraphData(siteConfigData: SiteConfig): OpenGraph {
    return {
      siteName: siteConfigData.siteTitle,
    };
  }
}
