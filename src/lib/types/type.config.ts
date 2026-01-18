import { allowed_profiles } from "@/data/configs/generated/allowed_profile_list";

export const profileLanguageMap = Object.fromEntries(
  allowed_profiles.map((p) => [p.value, p.allowed_languages]),
) as Record<
  (typeof allowed_profiles)[number]["value"],
  (typeof allowed_profiles)[number]["allowed_languages"]
>;

// export type ProfileType = "developer" | "photographer" | "teacher" | "student";
export type ProfileType = (typeof allowed_profiles)[number]["value"];
export type LanguageType =
  (typeof allowed_profiles)[number]["allowed_languages"][number]["value"];

export type TemplateType = "modern" | "classic" | "minimal";
export type LanguageTypeOld = "en" | "de" | "es" | "fr";
// export type LanguageType = keyof typeof MenuConfig.menuList;
export type ThemeType = "light" | "dark" | "system";

export type SortOption =
  | "all"
  | "date-desc"
  | "date-asc"
  | "title-asc"
  | "title-desc"
  | "category-asc"
  | "category-desc"
  | "album-asc"
  | "album-desc"
  | "project-type-asc"
  | "project-type-desc"
  | "name-asc"
  | "name-desc"
  | "proficiency-desc"
  | "proficiency-asc"
  | "experience-desc"
  | "experience-asc"
  | "issuer-asc"
  | "issuer-desc"
  | "likes-desc"
  | "views-desc"
  | "year-desc"
  | "year-asc"
  | "citations-desc"
  | "type-asc";
