//src/lib/services/menu.service.ts
import { PrimaryMenuItem } from "@/lib/types/portfolio";
import { MenuConfig } from "@/data/configs/generated/menu-config";

type SupportedLang = keyof typeof MenuConfig.menuList;

export class MenuService {
    /**
     * Returns both primary and more menu items based on viewport
     * @param lang
     * @param isMobile boolean
     * @param mobileLimit number of primary items to show on mobile
     * @param desktopLimit number of primary items to show on desktop
     */
    static getMenu(lang: SupportedLang = 'en', isMobile: boolean, mobileLimit = 4, desktopLimit = 5) {
        let primaryMenuItems: PrimaryMenuItem[] = [];

        const langWiseMenuList = MenuConfig.menuList[lang] ?? MenuConfig.menuList.en;

        let moreMenuItems: PrimaryMenuItem[] = [...langWiseMenuList.primary];

        if (isMobile) {
            primaryMenuItems = langWiseMenuList.primary.slice(0, mobileLimit);
            const overflow = langWiseMenuList.primary.slice(mobileLimit);
            moreMenuItems = [...overflow, ...moreMenuItems];
        } else {
            primaryMenuItems = langWiseMenuList.primary.slice(0, desktopLimit);
            const overflow = langWiseMenuList.more.slice(desktopLimit);
            moreMenuItems = [...overflow, ...moreMenuItems];
        }

        return {primaryMenuItems, moreMenuItems};
    }
}
