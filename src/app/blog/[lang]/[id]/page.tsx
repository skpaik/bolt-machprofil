
import { blogPostsSlugs } from "@/data/blog-posts-slugs";
import BlogDetailClient from "./BlogDetailClient";

export const dynamicParams = false;

type PageProps = {
    params: {
        lang: string;
        id: string;
    };
};

export function generateStaticParams() {
    return blogPostsSlugs.map(({ lang, id }) => ({
        lang,
        id,
    }));
}

export default async function BlogDetailPage({ params }: PageProps) {
    const { lang, id } = await params;

    return <BlogDetailClient lang={lang} id={id} />;
}
