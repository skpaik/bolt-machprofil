import { Metadata } from "next";
import { pagesMetadata } from "@/lib/config/seo.config";

export const metadata: Metadata = pagesMetadata.photos;

export default function PhotosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
