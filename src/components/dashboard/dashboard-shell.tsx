"use client";

import { getStoredUser } from "@/lib/auth/storage";
import type { ReactNode } from "react";
import { useState } from "react";
import type { User } from "@/types";
import { FloatingContact } from "@/components/landing/floating-contact";
import { DashboardCreatorFooter } from "./dashboard-creator-footer";
import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardTopbar } from "./dashboard-topbar";

type DashboardShellProps = {
  children: ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  const [user] = useState<User | null>(() => getStoredUser());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="h-screen overflow-hidden bg-[#eef4fb] text-[#172033]">
      <div className="flex h-full min-h-0">
        <DashboardSidebar
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          user={user}
        />
        <section className="flex min-h-0 min-w-0 flex-1 flex-col">
          <DashboardTopbar
            onMenuClick={() => setIsMenuOpen(true)}
            user={user}
          />
          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 lg:px-8">
            <div className="flex min-h-full flex-col gap-5">
              <div className="flex-1">{children}</div>
              <DashboardCreatorFooter />
            </div>
          </div>
          {user?.role === "office" || user?.role === "school" ? (
            <FloatingContact />
          ) : null}
        </section>
      </div>
    </main>
  );
}
