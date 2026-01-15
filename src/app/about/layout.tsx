import { Metadata } from "next";
import { pagesMetadata } from "@/lib/config/seo.config";

export const metadata: Metadata = pagesMetadata.about;

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
