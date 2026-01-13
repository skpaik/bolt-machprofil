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

  return <BlogDetailClient lang={lang} id={id} />;
}
