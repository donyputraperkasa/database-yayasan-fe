"use client";

import { getMe } from "@/lib/api/auth";
import { clearAuthSession, getAccessToken } from "@/lib/auth/storage";
import type { Role } from "@/types";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

type RoleGuardProps = {
  allowedRoles: Role[];
  children: ReactNode;
};

export function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
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
      .then((user) => {
        if (!isMounted) return;

        if (allowedRoles.includes(user.role)) {
          setIsAllowed(true);
        } else {
          router.replace("/dashboard");
        }
      })
      .catch(() => {
        clearAuthSession();
        router.replace("/");
      });

    return () => {
      isMounted = false;
    };
  }, [router, allowedRoles]);

  if (!isAllowed) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f5f8ff] text-[#1f4f8f]">
        <p className="text-sm font-semibold">Memeriksa akses...</p>
      </main>
    );
  }

  return children;
}
