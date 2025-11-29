import { ContentData, contentFileMap } from "@/lib/types/content.types";
import { LanguageType } from "@/lib/types/type.config";

export async function loadContentFile<T>(
  lang: string,
  fileKey: string,
): Promise<T> {
  const mod = await import(`@/data/${lang}/${fileKey}.json`);
  return mod.default;
}

export async function loadAllContent(lang: LanguageType): Promise<ContentData> {
  const entries = await Promise.all(
    Object.entries(contentFileMap).map(async ([key, fileName]) => {
      //console.log(key, fileName);
      const data = await loadContentFile<any>(lang, fileName);
      //console.log(data);
      return [key, data];
    }),
  );

  return Object.fromEntries(entries) as ContentData;
}
