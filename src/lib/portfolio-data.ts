// // lib/portfolio-data.ts (Server-side - NO "use client")
//
// import portfolioData from "@/data/portfolio.json";
// import languageData from "@/data/i18n.json";
// import settingData from "@/data/settings.json";
// import { AppData, LanguageI18n, SettingSchema } from "@/lib/types/portfolio";
// import {LanguageType, ProfileType} from "@/lib/types/type.config";
//
// // Get data for a specific profile and language
// export function getPortfolioData(
//     profileType?: ProfileType,
//     languageType?: LanguageType
// ) {
//     const setting = settingData as SettingSchema;
//
//     // Use defaults from settings if not specified
//     const profile = profileType || (setting.activeProfile as ProfileType);
//     const language = languageType || (setting.activeLanguage as LanguageType);
//
//     const appData = portfolioData.profiles[profile] as AppData;
//     const langI18n = languageData[language] as LanguageI18n;
//
//     return {
//         appData,
//         langI18n,
//         profileType: profile,
//         languageType: language,
//     };
// }
//
// // Get all profiles (for generateStaticParams)
// export function getAllProfiles() {
//     return Object.keys(portfolioData.profiles) as ProfileType[];
// }
//
// // Get all blog posts from a specific profile
// export function getBlogPosts(profileType?: ProfileType) {
//     const { appData } = getPortfolioData(profileType);
//     return appData.blogs || [];
// }
//
// // Get a single blog post by slug
// export function getBlogPostBySlug(slug: string, profileType?: ProfileType) {
//     const posts = getBlogPosts(profileType);
//     return posts.find(post => post.slug === slug);
// }
