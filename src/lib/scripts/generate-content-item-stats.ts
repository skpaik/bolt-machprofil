import fs from "fs";
import path from "path";
import { CONTENT_ITEM_COUNTS } from "@/data/configs/generated/content-item-counts";
import { toTsObject } from "@/lib/scripts/helpers/to-ts-helper";

/* -------------------------------------------------- */
/* Types                                               */
/* -------------------------------------------------- */
export type ProfileStats = {
  lang_count: number;
  item_count: number;
};

export type ContentItemStats = {
  profile_count: number;
  profiles: Record<string, ProfileStats>;
};
type ProfileKey = keyof typeof CONTENT_ITEM_COUNTS;
type LanguageKey<P extends ProfileKey> = keyof (typeof CONTENT_ITEM_COUNTS)[P];
// type ContentItemStats = {
//   profile_count: number;
// } & {
//   [profile: string]: {
//     lang_count: number;
//     item_count: number;
//   };
// };

/* -------------------------------------------------- */
/* Generator                                           */
/* -------------------------------------------------- */
const outputDir = path.join(process.cwd(), "src/data/configs/generated");

export function main(): ContentItemStats {
  // const stats: ContentItemStats = {
  //   profile_count: 0,
  // };
  const stats: ContentItemStats = {
    profile_count: 0,
    profiles: {},
  };

  //const profiles = Object.keys(CONTENT_ITEM_COUNTS);
  const profiles: ProfileKey[] = Object.keys(
    CONTENT_ITEM_COUNTS,
  ) as ProfileKey[];

  for (const profile of profiles) {
    const langs = Object.keys(CONTENT_ITEM_COUNTS[profile]) as LanguageKey<
      typeof profile
    >[];

    let totalItems = 0;

    for (const lang of langs) {
      const items = CONTENT_ITEM_COUNTS[profile][lang];
      for (const value of Object.values(items)) {
        totalItems += value;
      }
    }

    stats.profiles[profile] = {
      lang_count: langs.length,
      item_count: totalItems,
    };
  }

  stats.profile_count = profiles.length;

  fs.mkdirSync(outputDir, { recursive: true });

  fs.writeFileSync(
    path.join(outputDir, "content-item-stats.ts"),
    `export const CONTENT_ITEM_STATS = ${toTsObject(stats)} as const;\n`,
  );

  return stats;
}

export function generateContentItemStats() {
  main();
}
