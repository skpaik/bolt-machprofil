
import { blogPosts } from "@/data/blog-posts";
import BlogDetailClient from "./BlogDetailClient";

export const dynamicParams = false;

type PageProps = {
    params: {
        lang: string;
        id: string;
    };
};

export function generateStaticParams() {
    return blogPosts.map(({ lang, id }) => ({
        lang,
        id,
    }));
}

export default async function BlogDetailPage({ params }: PageProps) {
    const { lang, id } = await params;

    return <BlogDetailClient lang={lang} id={id} />;
}
