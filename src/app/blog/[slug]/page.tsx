import { blogPosts } from "@/data/blog-posts";
import BlogDetailClient from "./BlogDetailClient";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: number|string };
}) {
  const { slug } = await params;

  console.log(slug);

  return <BlogDetailClient slug={slug.toString()} />;
}
