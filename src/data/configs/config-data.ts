import { LanguageItem, ProfileItem, TemplateItem } from "@/lib/types/portfolio";

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

  static profiles: ProfileItem[] = [
    {
      value: "developer",
      label: "Developer",
      description: "Clean & simple",
    },
    {
      value: "photographer",
      label: "Photographer",
      description: "Clean & simple",
    },
    {
      value: "teacher",
      label: "Teacher",
    },
    {
      value: "student",
      label: "Student",
      description: "Clean & simple",
    },
  ];

  static languages: LanguageItem[] = [
    {
      value: "en",
      label: "English",
      description: "Clean & simple",
    },
    {
      value: "de",
      label: "German",
      description: "Clean & simple",
    },
    {
      value: "es",
      label: "Español",
      description: "Clean & simple",
    },
    {
      value: "fr",
      label: "Français",
      description: "Clean & simple",
    },
  ];
}
