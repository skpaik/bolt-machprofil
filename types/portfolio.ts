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

export interface Profile {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  avatar: string;
  social: SocialLinks;
  projects: Project[];
  experience: Experience[];
  education: Education[];
  skills: Skills;
}

export interface Language {
  name: string;
  [key: string]: string;
}

export interface PortfolioData {
  profiles: {
    [key: string]: Profile;
  };
  languages: {
    [key: string]: Language;
  };
}

export type ProfileType = 'developer' | 'photographer' | 'teacher';
export type TemplateType = 'modern' | 'classic' | 'minimal';
export type LanguageType = 'en' | 'es' | 'fr';
export type ThemeType = 'light' | 'dark';
