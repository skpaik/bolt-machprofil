import { LanguageItem, ProfileItem, TemplateItem } from "@/lib/types/portfolio";

export class ConfigData {
  static themes = [
    { value: "light", label: "Light", icon: 'sun' },
    { value: "dark", label: "Dark", icon: "moon" },
    { value: "system", label: "System", icon: "monitor" },
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

  static profiles: ProfileItem[] = [
    { code: "developer", name: "Developer" },
    { code: "photographer", name: "Photographer" },
    { code: "teacher", name: "Teacher" },
    { code: "student", name: "Student" },
  ];

  static languages: LanguageItem[] = [
    { code: "en", name: "English" },
    { code: "de", name: "German" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
  ];
}
