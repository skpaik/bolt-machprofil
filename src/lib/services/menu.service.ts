import { PrimaryMenuItem } from "@/lib/types/portfolio";
import {
  Book,
  Briefcase,
  Clock,
  FileText,
  FileUser,
  Home,
  Mail,
  User,
} from "lucide-react";

export class MenuService {
  // Full primary menu
  private static allPrimaryMenuItems: PrimaryMenuItem[] = [
    { key: "home", path: "/", icon: Home },
    { key: "about", path: "/about", icon: User },
    { key: "projects", path: "/projects", icon: Briefcase },
    { key: "experience", path: "/experience", icon: Clock },
    { key: "blog", path: "/blog", icon: FileText },
    { key: "resume", path: "/resume", icon: FileUser },
    { key: "contact", path: "/contact", icon: Mail },
  ];

  // Static "more" items that are always in More menu
  private static staticMoreMenuItems: PrimaryMenuItem[] = [
    { key: "education", path: "/education", icon: Mail },
    { key: "skills", path: "/skills", icon: Mail },
    { key: "services", path: "/services", icon: Mail },
    { key: "testimonials", path: "/testimonials", icon: Mail },
    { key: "publications", path: "/publications", icon: Mail },
    { key: "certificates", path: "/certificates", icon: Mail },
    { key: "photos", path: "/photos", icon: Mail },
    { key: "privacy", path: "/legal/privacy", icon: Mail },
    { key: "terms", path: "/legal/terms", icon: Mail },
  ];

  /**
   * Returns both primary and more menu items based on viewport
   * @param isMobile boolean
   * @param mobileLimit number of primary items to show on mobile
   * @param desktopLimit number of primary items to show on desktop
   */
  static getMenu(isMobile: boolean, mobileLimit = 4, desktopLimit = 5) {
    let primaryMenuItems: PrimaryMenuItem[] = [];
    let moreMenuItems: PrimaryMenuItem[] = [...MenuService.staticMoreMenuItems];

    if (isMobile) {
      primaryMenuItems = MenuService.allPrimaryMenuItems.slice(0, mobileLimit);
      const overflow = MenuService.allPrimaryMenuItems.slice(mobileLimit);
      moreMenuItems = [...overflow, ...moreMenuItems];
    } else {
      primaryMenuItems = MenuService.allPrimaryMenuItems.slice(0, desktopLimit);
      const overflow = MenuService.allPrimaryMenuItems.slice(desktopLimit);
      moreMenuItems = [...overflow, ...moreMenuItems];
    }

    return { primaryMenuItems, moreMenuItems };
  }
}
