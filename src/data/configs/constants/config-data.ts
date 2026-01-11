import { LanguageItem, ProfileItem } from "@/lib/types/portfolio";
import { allowed_languages } from "@/data/configs/generated/allowed_language_list";
import { allowed_profiles } from "@/data/configs/generated/allowed_profile_list";
import { allowed_templates } from "@/data/configs/constants/allowed_template_list";
import { allowed_themes } from "@/data/configs/constants/allowed_theme_list";

export class ConfigData {
  static themeList = allowed_themes;

  static templateList = allowed_templates;

  static profileList: ProfileItem[] = allowed_profiles as ProfileItem[];

  static languageList: LanguageItem[] = allowed_languages as LanguageItem[];
}
