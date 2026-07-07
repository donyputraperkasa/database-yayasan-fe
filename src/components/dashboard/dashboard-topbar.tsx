"use client";

import type { User } from "@/types";
import { CalendarDays, Menu } from "lucide-react";

type DashboardTopbarProps = {
  onMenuClick: () => void;
  user: User | null;
};

export function DashboardTopbar({ onMenuClick, user }: DashboardTopbarProps) {
  const roleLabel = formatRole(user?.role);

  return (
    <header className="sticky top-0 z-20 border-b border-[#dbe5f4] bg-[#f8fbff]/92 px-4 py-4 backdrop-blur lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#cfe0f5] bg-white text-[#0f2a4f] shadow-sm lg:hidden"
            aria-label="Buka menu"
          >
            <Menu size={22} aria-hidden="true" />
          </button>
          <div className="min-w-0">
            <span className="block truncate text-sm font-semibold text-[#617089]">
              Selamat datang, {user?.name ?? "Pengguna"}
            </span>
            <h1 className="mt-1 truncate text-2xl font-semibold text-[#0f172a]">
              Dashboard {roleLabel}
            </h1>
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <div className="inline-flex h-10 items-center gap-2 rounded-md border border-[#dbe5f4] bg-white px-3 text-sm font-semibold text-[#526078] shadow-sm">
            <CalendarDays size={16} aria-hidden="true" />
            Juli 2026
          </div>
          <div className="rounded-full bg-[#f2d35f] px-4 py-2 text-sm font-semibold text-[#172033]">
            {roleLabel}
          </div>
        </div>
      </div>
    </header>
  );
}

function formatRole(role?: string) {
  if (role === "office") return "Office";
  if (role === "school") return "School";

  return "Owner";
}
