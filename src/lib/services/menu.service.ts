//src/lib/services/menu.service.ts
import { BottomMenuItem } from "@/lib/types/portfolio";
import { MenuConfig } from "@/data/configs/generated/menu-config";
import { settings_const } from "@/data/configs/generated/settings";
import { ProfileType } from "@/lib/types/type.config";

type SupportedLang = keyof typeof MenuConfig.menuList;

export class MenuService {
  /**
   * Returns both primary and more menu items based on viewport
   * @param lang
   * @param isMobile boolean
   * @param mobileLimit number of primary items to show on mobile
   * @param desktopLimit number of primary items to show on desktop
   */
  static getMenu(
    profileType: ProfileType = settings_const.activeProfile,
    lang: SupportedLang = settings_const.activeLanguage,
    isMobile: boolean,
    mobileLimit = 4,
    desktopLimit = 5,
  ) {
    const langWiseMenuList =
      MenuConfig.menuList[lang] ?? MenuConfig.menuList.en;

    let primaryMenuItems: BottomMenuItem[] = [];
    let moreMenuItems: BottomMenuItem[] = [];

    if (isMobile) {
      primaryMenuItems = langWiseMenuList.primary.slice(0, mobileLimit);

      const overflow = langWiseMenuList.primary.slice(mobileLimit);

      moreMenuItems = [...overflow, ...langWiseMenuList.more];
    } else {
      primaryMenuItems = langWiseMenuList.primary.slice(0, desktopLimit);

      moreMenuItems = [...langWiseMenuList.more];
    }

    return { primaryMenuItems, moreMenuItems };
  }
}
