import type { Metadata } from "next";

import { MetadataHelper } from "@/lib/helpers/metadata.helper";
import AppLayout from "@/app/app-layout";

import "../assets/styles/globals.css";
import { geistSans, geistMono } from "@/assets/fonts";

export const metadata: Metadata = MetadataHelper.generateMetaData({
  siteTitle: "Portfolio Website",
  description:
    "Professional portfolio website showcasing work, skills, and experience",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
