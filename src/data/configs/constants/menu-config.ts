// src/data/configs/constants/menu-config.ts

import { BottomMenuItem } from "@/lib/types/portfolio";

export class MenuConfig {
  public static ALLOWED_MENU_ITEMS: BottomMenuItem[] = [
    { key: "home", path: "/", icon: "home" },
    { key: "about", path: "/about", icon: "user" },
    { key: "projects", path: "/projects", icon: "brief-case" },
    { key: "experience", path: "/experience", icon: "clock" },
    { key: "blog", path: "/blog", icon: "file-text" },
    { key: "resume", path: "/resume", icon: "file-user" },
    { key: "contact", path: "/contact", icon: "mail" },
    { key: "education", path: "/education", icon: "mail" },
    { key: "skills", path: "/skills", icon: "mail" },
    { key: "services", path: "/services", icon: "mail" },
    { key: "testimonials", path: "/testimonials", icon: "mail" },
    { key: "publications", path: "/publications", icon: "mail" },
    { key: "certificates", path: "/certificates", icon: "mail" },
    { key: "photos", path: "/photos", icon: "mail" },
    { key: "privacy", path: "/legal/privacy", icon: "mail" },
    { key: "terms", path: "/legal/terms", icon: "mail" },
  ];

  public static MENU_KEY_TO_CONTENT_KEY: Record<string, string> = {
    home: "about_content",
    about: "about_content",
    projects: "project_list",
    blog: "blog_list",
    resume: "resume_list",
    education: "education_list",
    skills: "skills_list",
    services: "services_list",
    publications: "publication_list",
    certificates: "certificate_list",
    testimonials: "testimonial_list",
    photos: "photo_list",
    contact: "contact_list", // if exists
    privacy: "privacy_list",
    terms: "terms_list",
  };
}
