import "./globals.css";
import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";
import { MetadataHelper } from "@/lib/helpers/metadata.helper";
import AppLayout from "@/app/app-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
