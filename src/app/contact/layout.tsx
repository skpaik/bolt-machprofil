import { Metadata } from "next";
import { pagesMetadata } from "@/lib/config/seo.config";

export const metadata: Metadata = pagesMetadata.contact;

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
