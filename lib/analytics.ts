/** Strip query strings and fragments before providing URL context to measurement tags. */
export function sanitizeAnalyticsUrl(value: string): string {
  if (!value) return "";
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.origin + url.pathname
      : "";
  } catch {
    return "";
  }
}
