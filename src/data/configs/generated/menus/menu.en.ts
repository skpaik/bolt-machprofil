import { BottomMenuItem } from "@/lib/types/portfolio";

export const PRIMARY_MENU_ITEMS: BottomMenuItem[] = [
  { key: "home", path: "/", icon: "home" },
  { key: "about", path: "/about", icon: "user" },
  { key: "projects", path: "/projects", icon: "brief-case" },
  { key: "experience", path: "/experience", icon: "clock" },
  { key: "blog", path: "/blog", icon: "file-text" },
  { key: "resume", path: "/resume", icon: "file-user" },
  { key: "contact", path: "/contact", icon: "mail" },
];

// Static "more" items that are always in More menu
export const OPTIONAL_MENU_ITEMS: BottomMenuItem[] = [
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
