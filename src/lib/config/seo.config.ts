import { Metadata } from "next";
import { MetadataHelper } from "@/lib/helpers/metadata.helper";
import { ContentData } from "@/lib/types/content.types";

// SEO metadata for all static pages
export const pagesMetadata: Record<keyof ContentData, Metadata> = {
  home_content: MetadataHelper.generatePageMetadata({
    title: "Home",
    description:
      "Professional portfolio showcasing projects, skills, and experience in software development",
    url: "/",
    keywords: [
      "portfolio",
      "software engineer",
      "web developer",
      "projects",
      "skills",
    ],
  }),

  about_content: MetadataHelper.generatePageMetadata({
    title: "About Me",
    description:
      "Learn more about my background, experience, and passion for software development",
    url: "/about",
    keywords: ["about", "bio", "experience", "background", "developer"],
  }),

  project_list: MetadataHelper.generatePageMetadata({
    title: "Projects",
    description:
      "Explore my portfolio of software projects, applications, and technical work",
    url: "/projects",
    keywords: [
      "projects",
      "portfolio",
      "web applications",
      "software",
      "development",
    ],
  }),

  blog_list: MetadataHelper.generatePageMetadata({
    title: "Blog",
    description:
      "Technical articles, tutorials, and insights about software development",
    url: "/blog",
    type: "website",
    keywords: ["blog", "articles", "tutorials", "tech", "programming"],
  }),

  skill_list: MetadataHelper.generatePageMetadata({
    title: "Skills",
    description:
      "Technical skills, programming languages, frameworks, and tools I work with",
    url: "/skills",
    keywords: [
      "skills",
      "technologies",
      "programming languages",
      "frameworks",
      "tools",
    ],
  }),

  experience_list: MetadataHelper.generatePageMetadata({
    title: "Experience",
    description:
      "Professional work experience, roles, and career achievements in software development",
    url: "/experience",
    keywords: ["experience", "career", "work history", "employment", "roles"],
  }),

  education_list: MetadataHelper.generatePageMetadata({
    title: "Education",
    description:
      "Educational background, degrees, certifications, and academic achievements",
    url: "/education",
    keywords: ["education", "degrees", "university", "learning", "academics"],
  }),

  certificate_list: MetadataHelper.generatePageMetadata({
    title: "Certificates",
    description:
      "Professional certifications, courses completed, and credentials earned",
    url: "/certificates",
    keywords: [
      "certificates",
      "certifications",
      "credentials",
      "courses",
      "training",
    ],
  }),

  publication_list: MetadataHelper.generatePageMetadata({
    title: "Publications",
    description:
      "Research papers, articles, and publications in software engineering and technology",
    url: "/publications",
    keywords: ["publications", "research", "papers", "articles", "writing"],
  }),

  testimonial_list: MetadataHelper.generatePageMetadata({
    title: "Testimonials",
    description:
      "Client testimonials, recommendations, and feedback from colleagues and employers",
    url: "/testimonials",
    keywords: [
      "testimonials",
      "recommendations",
      "reviews",
      "feedback",
      "references",
    ],
  }),

  service_list: MetadataHelper.generatePageMetadata({
    title: "Services",
    description:
      "Professional services offered including web development, consulting, and software solutions",
    url: "/services",
    keywords: [
      "services",
      "consulting",
      "development",
      "solutions",
      "offerings",
    ],
  }),

  contact_content: MetadataHelper.generatePageMetadata({
    title: "Contact",
    description:
      "Get in touch for project inquiries, collaborations, or professional opportunities",
    url: "/contact",
    keywords: ["contact", "email", "inquiries", "hire", "collaboration"],
  }),

  photos_list: MetadataHelper.generatePageMetadata({
    title: "Photos",
    description:
      "Photo gallery showcasing projects, events, and professional moments",
    url: "/photos",
    keywords: ["photos", "gallery", "images", "portfolio", "visual"],
  }),

  resume_content: MetadataHelper.generatePageMetadata({
    title: "Resume",
    description:
      "Download professional resume with detailed work experience, skills, and education",
    url: "/resume",
    keywords: ["resume", "CV", "curriculum vitae", "download", "career"],
  }),

  static_contents: MetadataHelper.generatePageMetadata({
    title: "Privacy Policy",
    description:
      "Privacy policy detailing how personal data is collected, used, and protected",
    url: "/legal/privacy",
    keywords: ["privacy", "policy", "data protection", "GDPR", "legal"],
  }),

  // static_contents: MetadataHelper.generatePageMetadata({
  //   title: "Terms of Service",
  //   description: "Terms and conditions for using this website and its services",
  //   url: "/legal/terms",
  //   keywords: ["terms", "conditions", "legal", "agreement", "service"],
  // }),
};
