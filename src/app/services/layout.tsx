import { Metadata } from "next";
import { pagesMetadata } from "@/lib/config/seo.config";

export const metadata: Metadata = pagesMetadata.services;

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
