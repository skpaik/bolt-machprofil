import {PrimaryMenuItem} from "@/lib/types/portfolio";
import {MenuConfig} from "@/lib/configs/menu-config";

export class MenuService {
    /**
     * Returns both primary and more menu items based on viewport
     * @param isMobile boolean
     * @param mobileLimit number of primary items to show on mobile
     * @param desktopLimit number of primary items to show on desktop
     */
    static getMenu(isMobile: boolean, mobileLimit = 4, desktopLimit = 5) {
        let primaryMenuItems: PrimaryMenuItem[] = [];
        let moreMenuItems: PrimaryMenuItem[] = [...MenuConfig.staticMoreMenuItems];

        if (isMobile) {
            primaryMenuItems = MenuConfig.allPrimaryMenuItems.slice(0, mobileLimit);
            const overflow = MenuConfig.allPrimaryMenuItems.slice(mobileLimit);
            moreMenuItems = [...overflow, ...moreMenuItems];
        } else {
            primaryMenuItems = MenuConfig.allPrimaryMenuItems.slice(0, desktopLimit);
            const overflow = MenuConfig.allPrimaryMenuItems.slice(desktopLimit);
            moreMenuItems = [...overflow, ...moreMenuItems];
        }

        return {primaryMenuItems, moreMenuItems};
    }
}
