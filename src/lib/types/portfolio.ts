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

export interface WebUIItem {
  label: string;
  description?: string;
}

export interface TemplateItem extends WebUIItem {
  value: TemplateType;
}

export interface ProfileItem  extends WebUIItem{
  value: ProfileType;
}

export interface LanguageItem  extends WebUIItem{
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

  // Primary Navigation
  home: string;
  about: string;
  blog: string;
  contact: string;
  education: string;
  experience: string;
  more: string;
  project: string;
  projects: string;
  resume: string;

  // Secondary Navigation (More Menu)
  certificates: string;
  photos: string;
  privacy: string;
  publications: string;
  services: string;
  skills: string;
  terms: string;
  testimonials: string;

  // Common Actions
  back_to_all_posts: string;
  back_to_blog: string;
  clear_all_filters: string;
  contact_me_now: string;
  download_cv: string;
  download_pdf: string;
  get_in_touch: string;
  get_started: string;
  print: string;
  read_more: string;
  send_message: string;
  view_all: string;
  view_details: string;
  view_more: string;
  view_my_work: string;
  view_projects: string;

  // Settings & Preferences
  language: string;
  profile: string;
  template: string;
  theme: string;

  // Contact Information
  connect_with_me: string;
  contact_info: string;
  email: string;
  location: string;
  phone: string;

  // Time & Status
  completed: string;
  current_position: string;
  expired: string;
  expires: string;
  in_progress: string;
  last_updated: string;
  no_expiry: string;
  ongoing: string;
  valid: string;

  // Measurements & Quantities
  min_read: string;
  of_experience: string;
  total: string;
  year: string;
  years: string;
  years_experience: string;

  // Filters & Categories
  all_categories: string;
  all_levels: string;
  all_technology: string;
  all_types: string;
  category: string;
  level: string;
  status: string;
  status_all: string;
  technology: string;
  type: string;

  // Sort Options
  album_a_z: string;
  category_a_z: string;
  category_z_a: string;
  date_newest: string;
  date_oldest: string;
  experience_least_to_most: string;
  experience_most_to_least: string;
  issue_date_newest: string;
  issue_date_oldest: string;
  issuer_a_z: string;
  issuer_z_a: string;
  latest_first: string;
  most_cited: string;
  most_liked: string;
  most_viewed: string;
  name_a_z: string;
  name_z_a: string;
  oldest_first: string;
  proficiency_high_to_low: string;
  proficiency_low_to_high: string;
  title_a_z: string;
  title_z_a: string;
  type_a_z: string;
  year_newest: string;
  year_oldest: string;

  // About Section
  available_for_work: string;
  interests_hobbies: string;
  professional: string;
  professional_highlights: string;
  professional_summary: string;
  proficiency: string;
  satisfaction_rate: string;
  services_tailored: string;
  technologies: string;

  // Projects Section
  featured_projects: string;
  project_all: string;
  project_not_found: string;
  project_not_found_detail: string;
  projects_completed: string;
  projects_search_placeholder: string;
  projects_sub_title: string;
  some_of_my_recent_work: string;
  what_i_do: string;
  what_i_do_detail: string;

  // Skills Section
  skill: string;
  skills_all: string;
  skills_mastered: string;
  skills_not_found: string;
  skills_not_found_message: string;
  skills_search_placeholder: string;
  skills_sub_title: string;
  skills_technologies: string;

  // Experience Section
  achievements: string;
  companies: string;
  experience_sub_title: string;
  key_achievements: string;
  key_responsibilities: string;
  notable_projects: string;
  technologies_used: string;
  work_experience: string;

  // Education Section
  activities_leadership: string;
  bootcamps: string;
  degrees: string;
  education_sub_title: string;
  gpa: string;
  grade: string;
  relevant_coursework: string;

  // Services Section
  contact_for_pricing: string;
  fast_delivery: string;
  fast_delivery_details: string;
  global_reach: string;
  global_reach_detail: string;
  key_features: string;
  more_features: string;
  most_popular: string;
  quality_assured: string;
  quality_assured_details: string;
  ready_to_get_started: string;
  ready_to_get_started_details: string;
  services_all: string;
  services_sub_title: string;
  twenty_4_support: string;
  twenty_4_support_detail: string;
  why_choose_my_services: string;
  why_choose_my_services_details: string;

  // Testimonials Section
  average_rating: string;
  client_testimonials: string;
  client_testimonials_detail: string;
  featured_testimonials: string;
  five_star_reviews: string;
  happy_clients: string;
  more_testimonials: string;
  no_testimonials_found: string;
  testimonials_all: string;
  testimonials_selecting_different_category: string;
  testimonials_show_all: string;
  testimonials_sub_title: string;
  verified: string;
  verified_reviews: string;

  // Publications Section
  all_publications: string;
  contact_for_access: string;
  doi: string;
  featured_publications: string;
  pdf: string;
  publication: string;
  publications_not_found: string;
  publications_not_found_message: string;
  publications_search_placeholder: string;
  publications_sub_title: string;
  publishers: string;
  total_citations: string;
  total_publications: string;
  view: string;

  // Certificates Section
  certificate: string;
  certificates_search_placeholder: string;
  certificates_sub_title: string;
  certifications_all: string;
  certifications_not_found: string;
  certifications_not_found_detail: string;
  featured_certifications: string;

  // Photos Section
  album: string;
  album_all: string;
  photo: string;
  photo_albums: string;
  photo_albums_detail: string;
  photo_not_found: string;
  photo_not_found_detail: string;
  photos_search_placeholder: string;
  tag: string;
  tag_all: string;
  viewing_album: string;
  viewing_album_detail: string;

  // Blog Section
  blog_search_placeholder: string;
  blog_sub_title: string;
  latest_posts: string;
  post: string;
  post_not_found: string;
  post_not_found_detail: string;
  posts: string;
  posts_all: string;
  posts_not_found: string;
  posts_not_found_detail: string;
  related_posts: string;

  // Contact Section
  contact_message: string;
  contact_message_placeholder: string;
  contact_sub_title: string;
  message_sent: string;
  message_sent_description: string;
  name_star: string;
  quick_response: string;
  quick_response_detail: string;
  subject: string;
  whats_this_about: string;
  your_email: string;
  your_name: string;

  // Resume Section
  professional_cv_portfolio: string;
  up_to_date_information: string;

  // Call to Action
  cta_descriptions: string;
  cta_descriptions_experience: string;
  cta_something_amazing: string;
  cta_something_amazing_detail: string;
  cta_start_your_project: string;
  cta_title: string;

  // Featured Badge
  featured: string;
}
