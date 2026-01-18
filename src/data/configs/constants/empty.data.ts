import { AboutContent } from "@/lib/types/about.contract";
import { ContentData } from "@/lib/types/content.types";
import { StaticContentData, TermsPrivacy } from "@/lib/types/portfolio";

export const emptyAboutContent: AboutContent = {
  bio: {
    name: "",
    title: "",
    tagline: "",
    image: "",
    location: "",
    email: "",
    phone: "",
    website: "",
    resumeUrl: "",
    available: true,
    fullName: "",
    summary: "",
  },
  intro: {
    tagline: "",
    summary: ""
  },
  sections: [],
  stats: [],
  interests: [],
  socialLinks: [],
  cta: {
    title: "",
    description: "",
    primaryButton: "",
    secondaryButton: "",
  },
};

export const emptyStaticContentObj: TermsPrivacy = {
  subtitle: "",
  last_updated: "",
  sections: [],
  contactTitle: "",
  contactText: "",
  footerText: "",
  id: 0,
  title: "",
};

export const emptyStaticContent: StaticContentData = {
  terms: emptyStaticContentObj,
  privacy: emptyStaticContentObj,
};

export const emptyContent: ContentData = {
  contact_content: emptyAboutContent,
  home_content: emptyAboutContent,
  resume_content: emptyAboutContent,
  about_content: emptyAboutContent,
  blog_list: [],
  certificate_list: [],
  education_list: [],
  experience_list: [],
  photos_list: [],
  project_list: [],
  publication_list: [],
  service_list: [],
  skill_list: [],
  testimonial_list: [],
  static_contents: emptyStaticContent
};
