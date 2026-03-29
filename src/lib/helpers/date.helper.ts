type FormatMonth = "long" | "short" | "numeric" | "2-digit" | undefined;

const formatDateGeneric = (
  dateString?: string,
  monthFormat: FormatMonth = "long",
  includeDay = true,
): string => {
  if (!dateString) return "";

  const normalized = dateString.trim();

  // Handle special keywords
  if (/^(present|ongoing)$/i.test(normalized)) {
    return (
      normalized.charAt(0).toUpperCase() + normalized.slice(1).toLowerCase()
    );
  }

  const date = new Date(normalized);
  if (isNaN(date.getTime())) return ""; // Guard against invalid date strings

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: monthFormat,
    ...(includeDay && { day: "numeric" }),
  });
};

// Specific short & long versions
export const formatDateLong = (
  dateString?: string,
  monthFormat: FormatMonth = "long",
) => formatDateGeneric(dateString, monthFormat, true);

export const formatDateShort = (
  dateString?: string,
  monthFormat: FormatMonth = "short",
) => formatDateGeneric(dateString, monthFormat, true);
