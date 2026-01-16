import { Suspense } from "react";
import { Metadata } from "next";
import { blogPostsSlugs } from "@/data/configs/generated/blog-posts-slugs";
import BlogDetailClient from "./BlogDetailClient";
import {blogPostsSlugsProfile} from "@/data/configs/generated/blog-posts-slugs-profile";
import {LanguageType, ProfileType} from "@/lib/types/type.config";
import { ContentsService } from "@/lib/services/contents.service";
import { MetadataHelper } from "@/lib/helpers/metadata.helper";
import { settings_const } from "@/data/configs/generated/settings";

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
    id: id.toString(),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, id } = await params;
  const profileType = settings_const.activeProfile as ProfileType;

  try {
    const { post } = await ContentsService.loadContentOfBlogDetail(
      profileType,
      lang,
      id
    );

    if (!post) {
      return MetadataHelper.generatePageMetadata({
        title: "Blog Post Not Found",
        description: "The requested blog post could not be found.",
        url: `/blog/${lang}/${id}`,
      });
    }

    return MetadataHelper.generatePageMetadata({
      title: post.title,
      description: post.excerpt || "",
      image: post.coverImage,
      url: `/blog/${lang}/${id}`,
      type: "article",
      author: post.author,
      keywords: post.tags,
      publishedTime: post.publishedAt,
      modifiedTime: post.publishedAt,
    });
  } catch (error) {
    return MetadataHelper.generatePageMetadata({
      title: "Blog Post",
      description: "Read our latest blog post",
      url: `/blog/${lang}/${id}`,
    });
  }
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
