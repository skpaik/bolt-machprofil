/**
 * Badge variant utility functions
 * Centralized mapping functions for Badge component variants
 */

export type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

/**
 * Get badge variant for education type
 */
export function getEducationTypeColor(type: string): BadgeVariant {
  const colorMap: Record<string, BadgeVariant> = {
    Degree: "default",
    Certificate: "secondary",
    Course: "outline",
    Bootcamp: "destructive",
    "Self-Study": "outline",
  };
  return colorMap[type] || "outline";
}

/**
 * Get badge variant for employment type
 */
export function getEmploymentTypeColor(type: string): BadgeVariant {
  switch (type) {
    case "Full-time":
      return "default";
    case "Part-time":
      return "secondary";
    case "Contract":
      return "outline";
    case "Freelance":
      return "secondary";
    case "Internship":
      return "outline";
    default:
      return "outline";
  }
}

/**
 * Get badge variant for project status
 */
export function getProjectStatusColor(status: string): BadgeVariant {
  switch (status) {
    case "Completed":
      return "default";
    case "In Progress":
      return "secondary";
    case "Ongoing":
      return "outline";
    default:
      return "outline";
  }
}

/**
 * Get badge variant for publication type
 */
export function getPublicationTypeColor(type: string): BadgeVariant {
  switch (type) {
    case "Journal":
      return "default";
    case "Conference":
      return "secondary";
    case "Book Chapter":
      return "outline";
    case "Workshop":
      return "secondary";
    case "Preprint":
      return "outline";
    case "Thesis":
      return "default";
    case "Patent":
      return "destructive";
    default:
      return "outline";
  }
}

/**
 * Get badge variant for publication status
 */
export function getPublicationStatusColor(status?: string): BadgeVariant {
  switch (status) {
    case "Published":
      return "default";
    case "In Press":
      return "secondary";
    case "Under Review":
      return "outline";
    case "Preprint":
      return "outline";
    default:
      return "outline";
  }
}
