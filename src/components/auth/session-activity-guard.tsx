"use client";

import { logout } from "@/lib/api/auth";
import { clearAuthSession, getAccessToken } from "@/lib/auth/storage";
import { queueToast } from "@/lib/feedback/toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const IDLE_TIMEOUT_MS = 60 * 60 * 1000;
const activityEvents = [
  "click",
  "keydown",
  "mousemove",
  "scroll",
  "touchstart",
  "visibilitychange",
] as const;

export function SessionActivityGuard() {
  const router = useRouter();

  useEffect(() => {
    let timeoutId: number;
    let isLoggingOut = false;

    const handleIdleLogout = async () => {
      if (isLoggingOut) return;
      isLoggingOut = true;

      const token = getAccessToken();
      try {
        if (token) await logout(token);
      } catch {
        // Session lokal tetap dibersihkan walaupun request logout gagal.
      } finally {
        clearAuthSession();
        queueToast({
          message: "Sesi berakhir karena tidak ada aktivitas",
          type: "error",
        });
        router.replace("/");
      }
    };

    const resetTimer = () => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => void handleIdleLogout(), IDLE_TIMEOUT_MS);
    };

    activityEvents.forEach((eventName) => {
      window.addEventListener(eventName, resetTimer, { passive: true });
    });
    resetTimer();

    return () => {
      window.clearTimeout(timeoutId);
      activityEvents.forEach((eventName) => {
        window.removeEventListener(eventName, resetTimer);
      });
    };
  }, [router]);

  return null;
}
