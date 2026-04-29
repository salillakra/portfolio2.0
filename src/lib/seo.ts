export const SITE_URL = (
  import.meta.env.VITE_SITE_URL ?? "https://example.com"
).replace(/\/$/, "");

export const absoluteUrl = (path: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
};
