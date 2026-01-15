import { Metadata } from "next";
import { MetadataHelper } from "@/lib/helpers/metadata.helper";

// SEO metadata for all static pages
export const pagesMetadata: Record<string, Metadata> = {
  home: MetadataHelper.generatePageMetadata({
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

  about: MetadataHelper.generatePageMetadata({
    title: "About Me",
    description:
      "Learn more about my background, experience, and passion for software development",
    url: "/about",
    keywords: ["about", "bio", "experience", "background", "developer"],
  }),

  projects: MetadataHelper.generatePageMetadata({
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

  blog: MetadataHelper.generatePageMetadata({
    title: "Blog",
    description:
      "Technical articles, tutorials, and insights about software development",
    url: "/blog",
    type: "website",
    keywords: ["blog", "articles", "tutorials", "tech", "programming"],
  }),

  skills: MetadataHelper.generatePageMetadata({
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

  experience: MetadataHelper.generatePageMetadata({
    title: "Experience",
    description:
      "Professional work experience, roles, and career achievements in software development",
    url: "/experience",
    keywords: ["experience", "career", "work history", "employment", "roles"],
  }),

  education: MetadataHelper.generatePageMetadata({
    title: "Education",
    description:
      "Educational background, degrees, certifications, and academic achievements",
    url: "/education",
    keywords: ["education", "degrees", "university", "learning", "academics"],
  }),

  certificates: MetadataHelper.generatePageMetadata({
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

  publications: MetadataHelper.generatePageMetadata({
    title: "Publications",
    description:
      "Research papers, articles, and publications in software engineering and technology",
    url: "/publications",
    keywords: ["publications", "research", "papers", "articles", "writing"],
  }),

  testimonials: MetadataHelper.generatePageMetadata({
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

  services: MetadataHelper.generatePageMetadata({
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

  contact: MetadataHelper.generatePageMetadata({
    title: "Contact",
    description:
      "Get in touch for project inquiries, collaborations, or professional opportunities",
    url: "/contact",
    keywords: ["contact", "email", "inquiries", "hire", "collaboration"],
  }),

  photos: MetadataHelper.generatePageMetadata({
    title: "Photos",
    description:
      "Photo gallery showcasing projects, events, and professional moments",
    url: "/photos",
    keywords: ["photos", "gallery", "images", "portfolio", "visual"],
  }),

  resume: MetadataHelper.generatePageMetadata({
    title: "Resume",
    description:
      "Download professional resume with detailed work experience, skills, and education",
    url: "/resume",
    keywords: ["resume", "CV", "curriculum vitae", "download", "career"],
  }),

  privacy: MetadataHelper.generatePageMetadata({
    title: "Privacy Policy",
    description:
      "Privacy policy detailing how personal data is collected, used, and protected",
    url: "/legal/privacy",
    keywords: ["privacy", "policy", "data protection", "GDPR", "legal"],
  }),

  terms: MetadataHelper.generatePageMetadata({
    title: "Terms of Service",
    description: "Terms and conditions for using this website and its services",
    url: "/legal/terms",
    keywords: ["terms", "conditions", "legal", "agreement", "service"],
  }),
};
