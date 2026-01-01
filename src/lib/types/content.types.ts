import {
  BlogPost,
  Certificate,
  Education,
  Experience,
  Photo,
  Project,
  Publication,
  Service,
  Skills,
  StaticContentData,
  Testimonial,
} from "@/lib/types/portfolio";
import { AboutContent } from "@/lib/types/about.contract";

export const contentFileMap = {
  about_content: "about_content",
  blog_list: "blog_list",
  certificate_list: "certificate_list",
  education_list: "education_list",
  experience_list: "experience_list",
  photos_list: "photo_list",
  project_list: "project_list",
  publication_list: "publication_list",
  service_list: "service_list",
  skill_list: "skill_list",
  testimonial_list: "testimonial_list",
  static_contents: "static_contents",
} as const;

// export type ContentKey = keyof typeof contentFileMap;

export type ContentData = {
  about_content: AboutContent;
  blog_list: BlogPost[];
  certificate_list: Certificate[];
  education_list: Education[];
  experience_list: Experience[];
  photos_list: Photo[];
  project_list: Project[];
  publication_list: Publication[];
  service_list: Service[];
  skill_list: Skills[];
  testimonial_list: Testimonial[];
  static_contents: StaticContentData;
};
