import { ContentData, contentFileMap } from "@/lib/types/content.types";
import { LanguageType } from "@/lib/types/type.config";
// import {registry} from "@/data/registry";

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
      // console.log('loadAllContent fileName>> ',fileName);
      // console.log('loadAllContent data>> ',data);
      return [key, data];
    }),
  );

  return Object.fromEntries(entries) as ContentData;
}
// export function loadContent<T>(
//     profile: string,
//     lang: string,
//     pageType: string,
// ): T[] {
//     console.log("profile> ", profile);
//     console.log("lang> ", lang);
//     console.log("pageType> ", pageType);
//     //alert("lang> "+ lang);
//     // @ts-ignore
//     const loader = registry?.[profile]?.[lang]?.[pageType];
//     console.log("loader> ", JSON.stringify(loader));
//     if (!loader) return [];
//     return loader().default as T[];
// }
