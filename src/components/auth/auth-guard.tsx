"use client";

import { getMe } from "@/lib/api/auth";
import { clearAuthSession, getAccessToken } from "@/lib/auth/storage";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

type AuthGuardProps = {
  children: ReactNode;
};

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const token = getAccessToken();

    if (!token) {
      router.replace("/");
      return;
    }

    getMe(token)
      .then(() => {
        if (isMounted) {
          setIsAllowed(true);
        }
      })
      .catch(() => {
        clearAuthSession();
        router.replace("/");
      });

    return () => {
      isMounted = false;
    };
  }, [router]);

  if (!isAllowed) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f5f8ff] text-[#1f4f8f]">
        <p className="text-sm font-semibold">Memeriksa sesi login...</p>
      </main>
    );
  }

  return children;
}
