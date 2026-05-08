const FALLBACK = "/course";

export function safeRedirectPath(raw: unknown): string {
  if (typeof raw !== "string") return FALLBACK;

  let path: string;

  try {
    path = decodeURIComponent(raw);
  } catch {
    return FALLBACK;
  }

  if (!path.startsWith("/") || path.startsWith("//")) return FALLBACK;

  return path;
}
