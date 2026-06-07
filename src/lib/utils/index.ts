/**
 * Centralized utility exports
 * Re-export all utility functions for easy importing
 */

// Badge variants
export {
  getEducationTypeColor,
  getEmploymentTypeColor,
  getProjectStatusColor,
  getPublicationTypeColor,
  getPublicationStatusColor,
  type BadgeVariant,
} from "./badge-variants";

// Date calculations
export {
  calculateTotalYearsOfExperience,
  formatDuration,
  calculateAge,
} from "./date-calculations";

// Array helpers
export {
  getUniqueItems,
  getUniqueByProperty,
  groupBy,
  sortByPropertyDesc,
  getFeaturedOrAll,
  chunkArray,
} from "./array-helpers";
