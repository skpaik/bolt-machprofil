//src/lib/services/contents.service.ts
import { BlogPost } from "@/lib/types/portfolio";

export class ContentsService {
  /**
   * Returns both primary and more menu items based on viewport
   * @param profileType
   * @param lang boolean
   * @param fileName number of primary items to show on mobile
   * @param fallback
   */
  static async loadContentOf<T>(
    profileType: string,
    lang: string,
    fileName: string,
    fallback = [],
  ): Promise<T> {
    if (!profileType || !lang) {
      return {} as T;
    }

    try {
      const data = await ContentsService.loadContentFile(
        profileType,
        lang,
        fileName,
      );
      return (data ?? fallback) as T;
    } catch {
      return fallback as T;
    }
  }

  static async loadContentOfBlogDetail(
    profileType: string,
    lang: string,
    id: string,
  ) {
    const blogPostList: BlogPost[] = await ContentsService.loadContentOf<
      BlogPost[]
    >(profileType, lang, "blog_list");

    const post = blogPostList?.find((p) => p.id.toString() === id);
    const relatedPosts =
      blogPostList
        ?.filter((p: any) => p.id !== id && p.category === post?.category)
        .slice(0, 3) || [];

    return { post, relatedPosts };
  }

  private static async loadContentFile(
    profileType: string | null,
    lang: string | null,
    fileKey: string,
  ) {
    const mod = await import(
      `@/data/contents/${profileType}/${lang}/${fileKey}`
    );
    return mod.default;
  }
}
