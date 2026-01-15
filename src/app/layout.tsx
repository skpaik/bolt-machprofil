import type { Metadata } from "next";
import { Suspense } from "react";

import { MetadataHelper } from "@/lib/helpers/metadata.helper";
import AppLayout from "@/app/app-layout";
import { ProfileSync } from "@/components/layouts/profile-sync";
import { StructuredData } from "@/components/seo/StructuredData";

import "../assets/styles/globals.css";
import { geistSans, geistMono } from "@/assets/fonts";

export const metadata: Metadata = MetadataHelper.generateMetaData();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Generate structured data for the website
  const websiteStructuredData = MetadataHelper.generateWebsiteStructuredData();
  const personStructuredData = MetadataHelper.generatePersonStructuredData();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData data={websiteStructuredData} />
        <StructuredData data={personStructuredData} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <ProfileSync />
        </Suspense>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
