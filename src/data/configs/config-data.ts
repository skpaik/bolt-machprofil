import { LanguageItem, ProfileItem, TemplateItem } from "@/lib/types/portfolio";
import { allowed_languages } from "@/data/configs/generated/allowed_language_list";
import { allowed_profiles } from "@/data/configs/generated/allowed_profile_list";

export class ConfigData {
  static themes = [
    {
      value: "light",
      label: "Light",
      icon: "sun",
    },
    {
      value: "dark",
      label: "Dark",
      icon: "moon",
    },
    {
      value: "system",
      label: "System",
      icon: "monitor",
    },
  ];

  static templates: TemplateItem[] = [
    {
      value: "modern",
      label: "Modern",
      description: "Gradient & bold design",
    },
    {
      value: "classic",
      label: "Classic",
      description: "Traditional & elegant",
    },
    {
      value: "minimal",
      label: "Minimal",
      description: "Clean & simple",
    },
  ];

  static profilesList: ProfileItem[] = allowed_profiles as ProfileItem[];

  static languageList: LanguageItem[] = allowed_languages as LanguageItem[];
}
