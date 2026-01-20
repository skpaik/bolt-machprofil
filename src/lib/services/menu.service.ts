//src/lib/services/menu.service.ts
import {BottomMenuItem} from "@/lib/types/portfolio";
import {MenuConfig} from "@/data/configs/constants/menu-config";
import {settings_const} from "@/data/configs/generated/settings";
import {LanguageType, ProfileType} from "@/lib/types/type.config";
import {menu_const} from "@/data/configs/generated/menu";
import {CONTENT_ITEM_COUNTS} from "@/data/configs/generated/content-item-counts";

type ContentItemCounts =
    typeof CONTENT_ITEM_COUNTS[keyof typeof CONTENT_ITEM_COUNTS][keyof typeof CONTENT_ITEM_COUNTS[keyof typeof CONTENT_ITEM_COUNTS]];

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
        lang: string = settings_const.activeLanguage,
        isMobile: boolean,
        mobileLimit = 4,
        desktopLimit = 5,
    ) {
        const limit = isMobile ? mobileLimit : desktopLimit;

        const profileCounts = CONTENT_ITEM_COUNTS[profileType as keyof typeof CONTENT_ITEM_COUNTS];

        const contentCounts = ((profileCounts && (profileCounts as Record<string, unknown>)[lang]) ??
            {}) as ContentItemCounts;

        //const hiddenKeys = new Set(menu_const.hide);
        const hiddenKeys = new Set<string>(menu_const.hide);

        const allowedMenuMap = new Map<string, BottomMenuItem>(
            MenuConfig.ALLOWED_MENU_ITEMS.map((item) => [item.key, item])
        );

        // Filter keys that are allowed, have content, and not hidden
        const resolveMenuItems = (keys: readonly string[]): BottomMenuItem[] =>
            keys
                .filter((key) => !hiddenKeys.has(key))
                .filter((key) => {
                    const contentKey = MenuConfig.MENU_KEY_TO_CONTENT_KEY[key];
                    if (!contentKey) return false; // skip if no mapping
                    return (contentCounts[contentKey as keyof ContentItemCounts] ?? 0) > 0;
                })
                .map((key) => allowedMenuMap.get(key))
                .filter((item): item is BottomMenuItem => !!item);


        const showItems = resolveMenuItems(menu_const.show);

        const primaryMenuItems = showItems.slice(0, limit);
        const overflowShowItems = showItems.slice(limit);

        const optionalItems = resolveMenuItems(menu_const.optional);

        const moreMenuItems = [...overflowShowItems, ...optionalItems];

        return {
            primaryMenuItems,
            moreMenuItems,
        };
    }


    static getMenuOldLatest(
        profileType: ProfileType = settings_const.activeProfile,
        lang: LanguageType = settings_const.activeLanguage,
        isMobile: boolean,
        mobileLimit = 4,
        desktopLimit = 5,
    ) {
        const langWiseMenuList =
            MenuConfig.menuList[lang] ?? MenuConfig.menuList.en;

        const limit = isMobile ? mobileLimit : desktopLimit;

        const primaryMenuItems = langWiseMenuList.primary.slice(0, limit);

        const overflowPrimary = langWiseMenuList.primary.slice(limit);

        const moreMenuItems = [...overflowPrimary, ...langWiseMenuList.more];

        return {primaryMenuItems, moreMenuItems};
    }

    static getMenuOld(
        profileType: ProfileType = settings_const.activeProfile,
        lang: LanguageType = settings_const.activeLanguage,
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

        return {primaryMenuItems, moreMenuItems};
    }
}
