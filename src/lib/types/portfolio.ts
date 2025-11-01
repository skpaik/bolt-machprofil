import {LanguageType, ProfileType, TemplateType} from "@/lib/types/type.config";

export interface BaseContent {
    id: string;
    title: string;
}

export interface BlogPost extends BaseContent {
    slug: string;
    excerpt: string;
    content: string;
    cover_image: string;
    author: string;
    published: boolean;
    published_at: string;
    tags: string[];
    read_time: number;
    category: string;
}

export interface Photo extends BaseContent {
    slug: string;
    excerpt: string;
    content: string;
    cover_image: string;
    author: string;
    published: boolean;
    published_at: string;
    tags: string[];
    location?: string;
    album: string;
    description: string;
    image: string;
}

export interface SocialLinks {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
    pinterest?: string;
}

export interface Project {
    title: string;
    description: string;
    technologies?: string[];
    category?: string;
    image: string;
    link: string;
}

export interface Experience {
    company: string;
    position: string;
    period: string;
    description: string;
}

export interface Education {
    institution: string;
    degree: string;
    period: string;
    description: string;
}

export interface TemplateItem {
    value: TemplateType;
    label: string;
    description: string
}

export interface ProfileItem {
    code: ProfileType;
    name: string
}

export interface LanguageItem {
    code: LanguageType;
    name: string
}

export interface PrimaryMenuItem {
    key: string;
    path: string,
    icon?: any
}


export interface Skills {
    [category: string]: string[];
}

export interface AppConfig {
    item_per_page: number;
}

export interface ContentData {
    blogs: BlogPost[];
    projects: Project[];
    experience: Experience[];
    education: Education[];
    skills: Skills;
    photos: Photo[];
}

export interface AppData {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    bio: string;
    avatar: string;
    //configData: ConfigData;
    social: SocialLinks;
}

export interface LanguageI18n {
    name: string;

    //primaryMenuItems Start
    home: string;
    about: string;
    projects: string;
    experience: string;
    blog: string;
    resume: string;
    contact: string;
    more: string;
    //primaryMenuItems End

    //moreMenuItems Start
    education: string;
    skills: string;
    services: string;
    testimonials: string;
    publications: string;
    certificates: string;
    photos: string;
    privacy: string;
    terms: string;
    //moreMenuItems End

    viewMore: string;
    getInTouch: string;
    sendMessage: string;
    downloadCV: string;
    language: string;
    template: string;
    profile: string;
    theme: string;
    contactInfo: string;
    email: string;
    phone: string;
    location: string;
    connectWithMe: string;
    allSkills: string;
    professionalHighlights: string;
    yearsExperience: string;
    projectsCompleted: string;
    skillsMastered: string;
    readMore: string;
    latestPosts: string;
    allPosts: string;
}

export interface SettingSchema {
    portfolioProfile: string;
    portfolioTemplate: string,
    portfolioLanguage: string,
    portfolioTheme: string,
}

export interface PortfolioData {
    profiles: {
        [key: string]: AppData;
    };
    languages: {
        [key: string]: LanguageI18n;
    };
}
