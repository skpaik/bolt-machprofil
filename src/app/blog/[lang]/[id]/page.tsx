import { Suspense } from "react";
import { blogPostsSlugs } from "@/data/configs/generated/blog-posts-slugs";
import BlogDetailClient from "./BlogDetailClient";
import {blogPostsSlugsProfile} from "@/data/configs/generated/blog-posts-slugs-profile";
import {LanguageType} from "@/lib/types/type.config";

export const dynamicParams = false;

type PageProps = {
  params: {
    lang: LanguageType;
    id: string;
  };
};

export function generateStaticParams() {
  return blogPostsSlugsProfile.map(({ lang, id }) => ({
    lang,
    id,
  }));
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { lang, id } = await params;

  return (
    <Suspense fallback={
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-20">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <BlogDetailClient lang={lang} id={id} />
    </Suspense>
  );
}
