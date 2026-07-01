import type { LoginResponse, User } from "@/types";

const ACCESS_TOKEN_KEY = "database-yayasan.access-token";
const USER_KEY = "database-yayasan.user";

export function saveAuthSession(session: LoginResponse) {
  if (!canUseStorage()) {
    return;
  }

  localStorage.setItem(ACCESS_TOKEN_KEY, session.accessToken);
  localStorage.setItem(USER_KEY, JSON.stringify(session.user));
}

export function getAccessToken() {
  if (!canUseStorage()) {
    return null;
  }

  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getStoredUser(): User | null {
  if (!canUseStorage()) {
    return null;
  }

  const user = localStorage.getItem(USER_KEY);
  return user ? (JSON.parse(user) as User) : null;
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
