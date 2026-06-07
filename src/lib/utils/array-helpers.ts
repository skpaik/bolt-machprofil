/**
 * Array helper utilities
 * Common array operations used across the application
 */

/**
 * Get unique items from an array
 */
export function getUniqueItems<T>(items: T[]): T[] {
  return [...new Set(items)];
}

/**
 * Get unique items by a specific property
 */
export function getUniqueByProperty<T, K extends keyof T>(
  items: T[],
  property: K,
): T[K][] {
  return [...new Set(items.map((item) => item[property]))];
}

/**
 * Group items by a specific property
 */
export function groupBy<T, K extends keyof T>(
  items: T[],
  property: K,
): Record<string, T[]> {
  return items.reduce((acc, item) => {
    const key = String(item[property]);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

/**
 * Sort items by a numeric property (descending)
 */
export function sortByPropertyDesc<T, K extends keyof T>(
  items: T[],
  property: K,
): T[] {
  return [...items].sort((a, b) => {
    const aVal = a[property];
    const bVal = b[property];
    if (typeof aVal === "number" && typeof bVal === "number") {
      return bVal - aVal;
    }
    return 0;
  });
}

/**
 * Filter featured items or return all if no featured items
 */
export function getFeaturedOrAll<T extends { featured?: boolean }>(
  items: T[],
  limit?: number,
): T[] {
  const featured = items.filter((item) => item.featured);
  const result = featured.length > 0 ? featured : items;
  return limit ? result.slice(0, limit) : result;
}

/**
 * Chunk array into smaller arrays of specified size
 */
export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}
