import { Metadata } from "next";
import { pagesMetadata } from "@/lib/config/seo.config";

export const metadata: Metadata = pagesMetadata.certificates;

export default function CertificatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
