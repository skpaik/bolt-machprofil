/**
 * Date calculation utilities
 * Common date-related calculations used across the application
 */

import { Experience } from "@/lib/types/portfolio";

/**
 * Calculate total years of experience from experience list
 */
export function calculateTotalYearsOfExperience(
  experiences: Experience[],
): number {
  if (experiences.length === 0) return 0;

  const totalMilliseconds = experiences.reduce((total, exp) => {
    const start = new Date(exp.startDate);
    const end =
      exp.endDate === "Present" ? new Date() : new Date(exp.endDate);
    return total + (end.getTime() - start.getTime());
  }, 0);

  return Math.floor(totalMilliseconds / (1000 * 60 * 60 * 24 * 365));
}

/**
 * Format duration between two dates
 */
export function formatDuration(startDate: string, endDate: string | "Present"): string {
  const start = new Date(startDate);
  const end = endDate === "Present" ? new Date() : new Date(endDate);

  const months = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30));
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  }

  if (remainingMonths === 0) {
    return `${years} year${years !== 1 ? 's' : ''}`;
  }

  return `${years} year${years !== 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
}

/**
 * Calculate age from date of birth
 */
export function calculateAge(dateOfBirth: string): number {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}
