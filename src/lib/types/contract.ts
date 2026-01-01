export interface PublicationSchema {
  title: string;
  authors: string[];
  publisher: string;
  date: string;
  link?: string;
  doi?: string;
  summary?: string;
  keywords?: string[];
  media?: string[];
}

export interface LanguageProficiencySchema {
  name: string;
  read: string;
  write: string;
  speak: string;
  listen: string;
  tests?: string[]; // Multiple tests e.g., ["IELTS", "TOEFL"]
  level?: string; // e.g., A1, B1, C1, Good, Fluent
}

export interface ReferenceSchema {
  name: string;
  position: string;
  organization: string;
  email?: string;
  phone?: string;
  relation?: string;
  notes?: string;
}

export interface ContactSchema {
  type: string;
  value: string;
  label?: string;
  description?: string;
}

export interface BioSchema {
  fullName: string;
  title: string;
  summary: string;
  location: string;
  dob?: string;
  photo?: string;
}


export interface ResumeSchema {
  title: string;
  type: string;
  description?: string;
  icon?: string;
  order?: number;
}

export interface TestimonialSchema {
  title: string;
  type: string;
  description?: string;
  icon?: string;
  order?: number;
}
