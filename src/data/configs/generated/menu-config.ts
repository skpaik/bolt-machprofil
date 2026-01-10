// src/data/configs/generated/menu-config.ts

import { PrimaryMenuItem } from "@/lib/types/portfolio";
import {
  OPTIONAL_MENU_ITEMS,
  PRIMARY_MENU_ITEMS,
} from "@/data/configs/generated/menus/menu.en";

type MenuGroup = {
  primary: PrimaryMenuItem[];
  more: PrimaryMenuItem[];
};

export class MenuConfig {
  private static allPrimaryMenuItemsDe: PrimaryMenuItem[] = [
    { key: "home", path: "/", icon: "home" },
    { key: "blog", path: "/blog", icon: "file-text" },
    { key: "resume", path: "/resume", icon: "file-user" },
    { key: "contact", path: "/contact", icon: "mail" },
  ];

  // Static "more" items that are always in More menu
  private static staticMoreMenuItemsDe: PrimaryMenuItem[] = [
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
