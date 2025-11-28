export interface HeroSection {
  name: string;
  title: string;
  tagline: string;
  image: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  resumeUrl: string;
  available: boolean;
}

export interface AboutSection {
  id: string;
  title: string;
  content: string;
  icon: string;
}

export interface Stat {
  label: string;
  value: string;
  icon: string;
}

export interface Interest {
  name: string;
  icon: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface CtaSection {
  title: string;
  description: string;
  primaryButton: string;
  secondaryButton: string;
}

export interface AboutContent {
  hero: HeroSection;
  intro: string;
  sections: AboutSection[];
  stats: Stat[];
  interests: Interest[];
  socialLinks: SocialLink[];
  cta: CtaSection;
}
