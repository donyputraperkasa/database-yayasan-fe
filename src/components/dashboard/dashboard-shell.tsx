"use client";

import { getStoredUser } from "@/lib/auth/storage";
import type { ReactNode } from "react";
import { useState } from "react";
import type { User } from "@/types";
import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardTopbar } from "./dashboard-topbar";

type DashboardShellProps = {
  children: ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  const [user] = useState<User | null>(() => getStoredUser());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#eef4fb] text-[#172033]">
      <div className="flex min-h-screen">
        <DashboardSidebar
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          user={user}
        />
        <section className="min-w-0 flex-1">
          <DashboardTopbar
            onMenuClick={() => setIsMenuOpen(true)}
            user={user}
          />
          <div className="px-5 py-5 lg:px-8">{children}</div>
        </section>
      </div>
    </main>
  );
}
