import {
  LanguageType,
  ProfileType,
  TemplateType,
  ThemeType,
} from "@/lib/types/type.config";
import { ContentData } from "@/lib/types/content.types";
import { LanguageI18n } from "@/lib/types/lang.i18n";
import { ProfileBio } from "@/lib/types/about.contract";

export interface BaseContent {
  id: number;
  title: string;
}

export interface BlogPost extends BaseContent {
  excerpt: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  readTime: number;
  author: string;
  category: string;
  tags: string[];
  featured?: boolean;
}

export interface Photo extends BaseContent {
  image: string;
  album: string;
  category: string;
  description?: string;
  date?: string;
  location?: string;
  camera?: string;
  tags?: string[];
  views?: number;
  featured?: boolean;
}

export interface Certificate extends BaseContent {
  issuer: string;
  issueDate: string;
  expiryDate?: string | "No Expiry";
  credentialId?: string;
  credentialUrl?: string;
  category: string;
  skills?: string[];
  description?: string;
  logo?: string;
  verified?: boolean;
  featured?: boolean;

  // OLD Fields
  // name: string;
  // organization: string;
  // expirationDate?: string;
  // media?: string[];
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  pinterest?: string;
}

export interface Project extends BaseContent {
  slug: string;
  shortDescription: string;
  description: string;
  category: string;
  tags: string[];
  thumbnail: string;
  startDate: string;
  endDate?: string | "Ongoing";
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
  status: string | "Completed" | "In Progress" | "Ongoing";

  images?: string[];
}

export interface Experience extends BaseContent {
  company: string;
  companyUrl?: string;
  logo?: string;
  position: string;
  employmentType:
    | string
    | "Full-time"
    | "Part-time"
    | "Contract"
    | "Freelance"
    | "Internship";
  location: string;
  locationType: string | "On-site" | "Remote" | "Hybrid";
  startDate: string;
  endDate: string | "Present";
  duration?: string;
  description: string;
  responsibilities: string[];
  achievements?: string[];
  technologies: string[];
  projects?: string[];
  current?: boolean;

  // organization: string;
  // website?: string;
}

export interface Education {
  id: number;

  /** Name of the institution, e.g. "Technical University Berlin" */
  institution: string;

  /** Degree type, e.g. "Bachelor's", "Master's", "PhD" */
  degree?: string;

  field: string;

  /** Start date in ISO format, e.g. "2018-10-01" */
  startDate: string;

  /** End date in ISO format, e.g. "2020-09-30" */
  endDate: string;

  /** Location of the institution, e.g. "Berlin, Germany" */
  location: string;

  gpa?: string;
  /** Final grade or GPA, e.g. "1.7" */
  grade?: string;

  type:
    | string
    | "Degree"
    | "Certificate"
    | "Course"
    | "Bootcamp"
    | "Self-Study";

  /** Short description of the education or major */
  description: string;

  achievements?: string[];
  coursework?: string[];
  activities?: string[];

  /** Optional institution logo path */
  logo?: string;

  // /** Whether this should be featured on the website */
  // featured?: boolean;
  //
  // /** Optional full markdown body content */
  // body?: string;
}

export interface WebUIItem {
  label: string;
  description?: string;
}

export interface TemplateItem extends WebUIItem {
  value: TemplateType;
}

export interface ProfileItem extends WebUIItem {
  value: ProfileType;
}

export interface LanguageItem extends WebUIItem {
  value: LanguageType;
}

export interface PrimaryMenuItem {
  key: string;
  path: string;
  icon: string;
}

// Skill interface - adaptable for any profession
export interface Skills extends BaseContent {
  category: string; // Technical, Design, Business, Soft Skills, Languages, etc.
  proficiency: number; // 0-100
  level: string; //  'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
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

  type: string;
  description?: string;
  icon?: string;
  order?: number;
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
    type: string | "Fixed" | "Hourly" | "Project-based" | "Contact";
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

/*
export interface ContentData {
  about?: AboutContentData;
  blogs: BlogPost[];
  certificates: Certificate[];
  //Contact
  educations: Education[];
  experience: Experience[];
  staticContent?: StaticContentData;
  photos: Photo[];
  projects: Project[];
  publications: Publication[];
  //resume: ResumeSchema;
  services: Service[];
  skills: Skills[];
  testimonials: Testimonial[];
}
*/

export interface TermsPrivacySection extends BaseContent {
  icon: string; // Icon name as string for dynamic lookup
  content: string;
  list?: string[];
  note?: string;
}

export interface TermsPrivacy extends BaseContent {
  subtitle: string;
  last_updated: string;
  sections: TermsPrivacySection[];
  contactTitle: string;
  contactText: string;
  footerText: string;
}

export interface StaticContentData {
  terms: TermsPrivacy;
  privacy: TermsPrivacy;
}

export interface AppData extends ProfileBio {
  bio: string;
  avatar: string;

  //configData: ConfigData;
  social: SocialLinks;
}

export interface SettingSchema {
  activeProfile: string;
  activeTemplate: string;
  activeLanguage: string;
  activeTheme: string;
  allowedProfiles: string[];
}

export interface Publication extends BaseContent {
  authors: string[];
  publishedIn: string; // Journal, Conference, Book, etc.
  publisher?: string;
  year: number;
  month?: string;
  type:
    | string
    | "Journal"
    | "Conference"
    | "Book Chapter"
    | "Workshop"
    | "Preprint"
    | "Thesis"
    | "Patent";
  abstract: string;
  keywords?: string[];
  doi?: string;
  url?: string;
  pdfUrl?: string;
  citations?: number;
  featured?: boolean;
  status: string | "Published" | "In Press" | "Under Review" | "Preprint";

  // date: string;
  // link?: string;
  // summary?: string;
  images?: string[];
}

export interface PortfolioContextType {
  appData: AppData;
  contentData: ContentData;
  appConfig: AppConfig;
  profileType: ProfileType;
  setProfileType: (type: ProfileType) => void;
  templateType: TemplateType;
  setTemplateType: (type: TemplateType) => void;
  langI18n: LanguageI18n;
  languageType: LanguageType;
  setLanguageType: (type: LanguageType) => void;
  themeType: ThemeType;
  setThemeType: (theme: ThemeType) => void;
}

export interface SiteConfig {
  // Site Settings
  siteTitle: string;
  // tagline: string;
  // author: string;
  description: string;
  // keywords: string[];
  // baseUrl: string;
  // language: string;
  // locale: string;
  // timezone: string;

  // // Theme Settings
  // layout: 'classic' | 'modern' | 'creative';
  // colorScheme: string;
  // fontFamily: string;
  // theme: 'light' | 'dark' | 'system';
  //
  // // Assets
  // favicon: string;
  // ogImage: string;
  // showHeaderImage: boolean;
  //
  // // Contact & Social
  // email: string;
  // github: string;
  // linkedin: string;
  // twitter: string;
  //
  // // Analytics & SEO
  // googleAnalyticsId: string;
  // googleSiteVerification: string;
  //
  // // Version
  // version: string;
  // generator: string;
}

export interface PageMetaParams {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  author?: string;
}
