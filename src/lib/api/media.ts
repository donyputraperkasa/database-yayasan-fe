const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";

export function getMediaUrl(path?: string | null) {
  if (!path) return null;
  return path.startsWith("/") ? `${apiUrl}${path}` : path;
}
