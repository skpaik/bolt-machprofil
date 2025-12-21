import { redirect } from "next/navigation";
import {blogPosts} from "@/data/blog-posts";

type PageProps = {
    params: {
        lang: string;
    };
};

export function generateStaticParams() {
    const langs = Array.from(new Set(blogPosts.map((p) => p.lang)));
    return langs.map((lang) => ({ lang }));
}

export default async function BlogLangRedirectPage({ params }: PageProps) {
    const { lang } = await params;

    console.log(`Redirecting /blog/${lang} -> /blog`);

    // Permanent redirect to /blog
    redirect("/blog");
}
