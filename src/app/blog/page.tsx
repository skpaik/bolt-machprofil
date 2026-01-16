import React from "react";
import { Metadata } from "next";
import BlogPageClient from "./BlogClient";
import { pagesMetadata } from "@/lib/config/seo.config";

export const metadata: Metadata = pagesMetadata.blog_list;

export default async function BlogPage() {
    return (
        <BlogPageClient/>
    );
}
