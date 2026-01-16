import React from "react";
import { Metadata } from "next";
import ClientPage from "./client-page";
import { pagesMetadata } from "@/lib/config/seo.config";

export const metadata: Metadata = pagesMetadata.resume_content;

export default function ResumePage() {
  return (
      <>
        <ClientPage/>
      </>
  );
}
