import {
  LanguageType,
  ProfileType,
  TemplateType,
  ThemeType,
} from "@/lib/types/type.config";
import { ContentData } from "@/lib/types/content.types";

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
  description?: string;
  date?: string;
  location?: string;
  camera?: string;
  tags?: string[];
  // views?: number;
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
  description: string;
  shortDescription: string;
  category: string;
  tags: string[];
  thumbnail: string;
  images?: string[];
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
}

export interface Experience {
  id: string;
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
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string | "Present";
  location: string;
  gpa?: string;
  grade?: string;
  description?: string;
  achievements?: string[];
  coursework?: string[];
  activities?: string[];
  logo?: string;
  type:
    | string
    | "Degree"
    | "Certificate"
    | "Course"
    | "Bootcamp"
    | "Self-Study";
}

export interface TemplateItem {
  value: TemplateType;
  label: string;
  description: string;
}

export interface ProfileItem {
  code: ProfileType;
  name: string;
}

export interface LanguageItem {
  code: LanguageType;
  name: string;
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

export interface SettingSchema {
  portfolioProfile: string;
  portfolioTemplate: string;
  portfolioLanguage: string;
  portfolioTheme: string;
}

export interface Publication extends BaseContent {
  authors: string[];
  publishedIn: string; // Journal, Conference, Book, etc.
  publisher?: string;
  year: string;
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
}

export interface PortfolioData {
  profiles: {
    [key: string]: AppData;
  };
  languages: {
    [key: string]: LanguageI18n;
  };
}

export interface PortfolioContextType {
  appData: AppData;
  contentData: ContentData;
  staticContentData: StaticContentData;
  appConfig: AppConfig;
  profileType: ProfileType;
  setProfileType: (type: ProfileType) => void;
  template: TemplateType;
  setTemplate: (type: TemplateType) => void;
  langI18n: LanguageI18n;
  languageType: LanguageType;
  setLanguageType: (type: LanguageType) => void;
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
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

export interface LanguageI18n {
  name: string;

  //primaryMenuItems Start
  home: string;
  about: string;
  project: string;
  projects: string;
  projects_sub_title: string;
  projects_search_placeholder: string;
  project_all: string;
  project_not_found: string;
  project_not_found_detail: string;
  experience: string;
  blog: string;
  resume: string;
  contact: string;
  more: string;
  //primaryMenuItems End

  //moreMenuItems Start
  education: string;
  education_sub_title: string;
  skills: string;
  services: string;
  testimonials: string;
  publications: string;
  certificates: string;
  photos: string;
  privacy: string;
  terms: string;
  //moreMenuItems End

  view_more: string;
  get_in_touch: string;
  send_message: string;
  download_cv: string;
  language: string;
  template: string;
  profile: string;
  theme: string;
  contact_info: string;
  email: string;
  phone: string;
  location: string;
  connect_with_me: string;
  skills_all: string;
  professional_highlights: string;
  years_experience: string;
  projects_completed: string;
  skills_mastered: string;
  read_more: string;
  latest_posts: string;
  posts_all: string;
  last_updated: string;

  skills_sub_title: string;
  skills_search_placeholder: string;
  skills_not_found: string;
  skills_not_found_message: string;
  skill: string;
  year: string;
  years: string;
  of_experience: string;
  level: string;
  all_levels: string;
  category: string;
  all_categories: string;
  technology: string;
  all_technology: string;
  completed: string;
  in_progress: string;
  ongoing: string;

  testimonials_show_all: string;
  testimonials_selecting_different_category: string;
  no_testimonials_found: string;
  more_testimonials: string;
  featured_testimonials: string;
  testimonials_all: string;
  verified_reviews: string;
  happy_clients: string;
  average_rating: string;
  five_star_reviews: string;
  verified: string;
  testimonials_sub_title: string;
  cta_start_your_project: string;
  cta_title: string;
  cta_descriptions: string;
  cta_descriptions_experience: string;

  //SortConfig Start
  proficiency_high_to_low: string;
  proficiency_low_to_high: string;
  name_a_z: string;
  name_z_a: string;
  category_a_z: string;
  category_z_a: string;
  experience_most_to_least: string;
  experience_least_to_most: string;
  year_newest: string;
  year_oldest: string;
  title_a_z: string;
  title_z_a: string;
  most_cited: string;
  type_a_z: string;
  date_newest: string;
  date_oldest: string;
  most_liked: string;
  most_viewed: string;
  issue_date_newest: string;
  issue_date_oldest: string;
  issuer_a_z: string;
  issuer_z_a: string;
  latest_first: string;
  oldest_first: string;
  //SortConfig End
  view_details: string;
  services_sub_title: string;
  services_all: string;
  most_popular: string;
  contact_for_pricing: string;
  key_features: string;
  more_features: string;
  get_started: string;
  why_choose_my_services: string;
  why_choose_my_services_details: string;
  fast_delivery: string;
  fast_delivery_details: string;
  quality_assured: string;
  quality_assured_details: string;
  twenty_4_support: string;
  twenty_4_support_detail: string;
  global_reach: string;
  global_reach_detail: string;
  ready_to_get_started: string;
  ready_to_get_started_details: string;
  contact_me_now: string;
  type: string;
  all_types: string;
  status: string;
  status_all: string;
  featured: string;
  doi: string;
  view: string;
  pdf: string;
  contact_for_access: string;
  publications_sub_title: string;
  total_publications: string;
  total_citations: string;
  publishers: string;
  publications_search_placeholder: string;
  publication: string;
  featured_publications: string;
  all_publications: string;
  publications_not_found: string;
  publications_not_found_message: string;
  album: string;
  album_all: string;
  tag: string;
  tag_all: string;
  album_a_z: string;
  viewing_album: string;
  viewing_album_detail: string;
  photo_albums: string;
  photo_albums_detail: string;
  photo: string;
  photos_search_placeholder: string;
  photo_not_found: string;
  photo_not_found_detail: string;
  clear_all_filters: string;
  experience_sub_title: string;
  companies: string;
  achievements: string;
  current_position: string;
  key_responsibilities: string;
  key_achievements: string;
  technologies_used: string;
  notable_projects: string;
  valid: string;
  expired: string;
  relevant_coursework: string;
  activities_leadership: string;
  bootcamps: string;
  total: string;
  gpa: string;
  grade: string;
  degrees: string;
  message_sent: string;
  message_sent_description: string;
  contact_sub_title: string;
  quick_response: string;
  quick_response_detail: string;
  your_name: string;
  name_star: string;
  your_email: string;
  subject: string;
  whats_this_about: string;
  contact_message: string;
  contact_message_placeholder: string;
  no_expiry: string;
  expires: string;
  certificates_sub_title: string;
  certificates_search_placeholder: string;
  certificate: string;
  featured_certifications: string;
  certifications_all: string;
  certifications_not_found: string;
  certifications_not_found_detail: string;
  blog_sub_title: string;
  blog_search_placeholder: string;
  posts: string;
  post: string;
  posts_not_found: string;
  posts_not_found_detail: string;
  post_not_found: string;
  post_not_found_detail: string;
  back_to_blog: string;
  related_posts: string;
  back_to_all_posts: string;
  min_read: string;
  interests_hobbies: string;
  technologies: string;
  proficiency: string;
}
