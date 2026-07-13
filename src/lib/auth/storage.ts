import type { LoginResponse, User } from "@/types";

const ACCESS_TOKEN_KEY = "database-yayasan.access-token";
const USER_KEY = "database-yayasan.user";
export const COOKIE_SESSION_MARKER = "cookie-session";

export function saveAuthSession(session: LoginResponse) {
  if (!canUseStorage()) {
    return;
  }

  // JWT disimpan oleh backend di cookie HttpOnly, bukan di JavaScript browser.
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.setItem(USER_KEY, JSON.stringify(session.user));
}

export function getAccessToken() {
  if (!canUseStorage()) {
    return null;
  }

  localStorage.removeItem(ACCESS_TOKEN_KEY);
  return getStoredUser() ? COOKIE_SESSION_MARKER : null;
}

export function getStoredUser(): User | null {
  if (!canUseStorage()) {
    return null;
  }

  const user = localStorage.getItem(USER_KEY);

  try {
    return user ? (JSON.parse(user) as User) : null;
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
}

export function clearAuthSession() {
  if (!canUseStorage()) {
    return;
  }

  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

function canUseStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}
