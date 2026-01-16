import React from "react";
import { Metadata } from "next";
import ClientPage from "./client-page";
import { pagesMetadata } from "@/lib/config/seo.config";

export const metadata: Metadata = pagesMetadata.service_list;

export default function ServicePage() {
  return (
      <>
        <ClientPage/>
      </>
  );
}
