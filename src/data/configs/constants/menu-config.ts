// src/data/configs/generated/menu-config.ts

import { BottomMenuItem } from "@/lib/types/portfolio";
import {
  OPTIONAL_MENU_ITEMS,
  PRIMARY_MENU_ITEMS,
} from "@/data/configs/generated/menus/menu.en";

type MenuGroup = {
  primary: BottomMenuItem[];
  more: BottomMenuItem[];
};

export class MenuConfig {
  private static  ALLOWED_MENU_ITEMS: BottomMenuItem[] = [
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

  private static allPrimaryMenuItemsDe: BottomMenuItem[] = [
    { key: "home", path: "/", icon: "home" },
    { key: "blog", path: "/blog", icon: "file-text" },
    { key: "resume", path: "/resume", icon: "file-user" },
    { key: "contact", path: "/contact", icon: "mail" },
  ];

  // Static "more" items that are always in More menu
  private static staticMoreMenuItemsDe: BottomMenuItem[] = [
    { key: "education", path: "/education", icon: "mail" },
    { key: "privacy", path: "/legal/privacy", icon: "mail" },
    { key: "terms", path: "/legal/terms", icon: "mail" },
  ];

  public static menuList: Record<string, MenuGroup> = {
    en: {
      primary: PRIMARY_MENU_ITEMS,
      more: OPTIONAL_MENU_ITEMS,
    },
    de: {
      primary: MenuConfig.allPrimaryMenuItemsDe,
      more: MenuConfig.staticMoreMenuItemsDe,
    },
  };
}
