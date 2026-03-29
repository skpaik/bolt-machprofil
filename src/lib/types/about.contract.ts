export interface ProfileBio {
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

  fullName: string;
  summary: string;
  dob?: string;
  photo?: string;
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
  username?: string;
  description?: string;
}

export interface CtaSection {
  title: string;
  description: string;
  primaryButton: string;
  secondaryButton: string;
}

export interface AboutIntro {
  tagline: string;
  summary: string;
}

export interface AboutContent {
  bio: ProfileBio;
  intro: AboutIntro;
  sections: AboutSection[];
  stats: Stat[];
  interests: Interest[];
  socialLinks: SocialLink[];
  cta: CtaSection;
}
