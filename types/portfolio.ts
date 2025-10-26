export interface BlogPost2 {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author: string;
  published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
  tags: string[];
  read_time: number;
}
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author: string;
  published: boolean;
  published_at: string;
  tags: string[];
  read_time: number;
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

export interface Skills {
  [category: string]: string[];
}

export interface AppData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  avatar: string;
  social: SocialLinks;
  blogs: BlogPost[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  skills: Skills;
}

export interface LanguageI18n {
  name: string;

  home: string;
  projects: string;
  portfolio: string;
  experience: string;
  skills: string;
  contact: string;
  resume: string;
  blog: string;
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
  education: string;
  readMore: string;
  latestPosts: string;
  allPosts: string;
}

export interface PortfolioData {
  profiles: {
    [key: string]: AppData;
  };
  languages: {
    [key: string]: LanguageI18n;
  };
}

export type ProfileType = 'developer' | 'photographer' | 'teacher' | 'student';
export type TemplateType = 'modern' | 'classic' | 'minimal';
export type LanguageType = 'en' | 'es' | 'fr';
export type ThemeType = 'light' | 'dark';