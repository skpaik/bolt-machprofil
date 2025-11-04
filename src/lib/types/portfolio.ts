import {LanguageType, ProfileType, TemplateType} from "@/lib/types/type.config";

export interface BaseContent {
    id: number;
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
    excerpt?: string;
    content?: string;
    cover_image?: string;
    author?: string;
    published?: boolean;
    published_at?: string;
    tags: string[];
    location?: string;
    album?: string;
    description?: string;
    image: string;
}

export interface Certificate2 extends BaseContent {
    date: string;
    credential: string;
    image: string;
}

export interface Certificate extends BaseContent {
    issuer: string;
    issueDate: string;
    expiryDate?: string | 'No Expiry';
    credentialId?: string;
    credentialUrl?: string;
    category: string;
    skills?: string[];
    description?: string;
    logo?: string;
    verified?: boolean;
    featured?: boolean;
}

export interface SocialLinks {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
    pinterest?: string;
}

export interface Project2 {
    title: string;
    description: string;
    technologies?: string[];
    category?: string;
    project_type: string;
//    tags: string[];
    image?: string;
    link?: string;
    started_at?: string;
    ended_at?: string;
}

export interface Project extends BaseContent {
    slug: string;
    description: string;
    shortDescription: string;
    category: string;
    tags: string[];
    thumbnail: string;
    images?: string[];
    startDate: string;
    endDate?: string | 'Ongoing';
    client?: string;
    role: string;
    technologies: string[];
    features?: string[];
    liveUrl?: string;
    githubUrl?: string;
    caseStudyUrl?: string;
    featured?: boolean;
    likes?: number;
    views?: number;
    status: string | 'Completed' | 'In Progress' | 'Ongoing';
}


export interface Experience {
    id: string;
    company: string;
    companyUrl?: string;
    logo?: string;
    position: string;
    employmentType: string | 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship';
    location: string;
    locationType: string | 'On-site' | 'Remote' | 'Hybrid';
    startDate: string;
    endDate: string | 'Present';
    duration?: string;
    description: string;
    responsibilities: string[];
    achievements?: string[];
    technologies: string[];
    projects?: string[];
    current?: boolean;
}

export interface Education {
    id: number;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string | 'Present';
    location: string;
    gpa?: string;
    grade?: string;
    description?: string;
    achievements?: string[];
    coursework?: string[];
    activities?: string[];
    logo?: string;
    type: string | 'Degree' | 'Certificate' | 'Course' | 'Bootcamp' | 'Self-Study';
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

// Skill interface - adaptable for any profession
export interface Skills extends BaseContent {
    category: string; // Technical, Design, Business, Soft Skills, Languages, etc.
    proficiency: number; // 0-100
    level: string;//  'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    yearsOfExperience?: number;
    tags?: string[];
    description?: string;
    certifications?: string[];
    icon?: string;
}
// Testimonial interface
export interface Testimonial {
    id: string;
    name: string;
    role: string;
    company: string;
    location?: string;
    avatar?: string;
    rating: number;
    testimonial: string;
    date: string;
    project?: string;
    category: string;
    featured?: boolean;
    verified?: boolean;
}
// Service interface - adaptable for any professional service
export interface Service extends BaseContent {
    category: string;
    description: string;
    shortDescription: string;
    icon: string;
    features: string[];
    deliverables?: string[];
    pricing?: {
        type: string | 'Fixed' | 'Hourly' | 'Project-based' | 'Contact';
        amount?: string;
        currency?: string;
    };
    duration?: string;
    popular?: boolean;
    tags?: string[];
}

export interface AppConfig {
    item_per_page: number;
}

export interface ContentData {
   // education: Education[];
    //skills: Skills[];
    photos: Photo[];
}

export interface TermsPrivacySection extends BaseContent {
    icon: string; // Icon name as string for dynamic lookup
    content: string;
    list?: string[];
    note?: string;
}

export interface TermsPrivacy extends BaseContent {
    subtitle: string;
    lastUpdated: string;
    sections: TermsPrivacySection[];
    contactTitle: string;
    contactText: string;
    footerText: string;
}

export interface StaticContentData {
    terms: TermsPrivacy;
    privacy: TermsPrivacy;
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
    lastUpdated: string;
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
