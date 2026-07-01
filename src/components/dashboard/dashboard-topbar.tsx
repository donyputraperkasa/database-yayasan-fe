"use client";

import type { User } from "@/types";
import { CalendarDays, Menu } from "lucide-react";

type DashboardTopbarProps = {
  user: User | null;
};

export function DashboardTopbar({ user }: DashboardTopbarProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-[#dbe5f4] bg-[#f8fbff]/90 px-5 py-4 backdrop-blur lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <button
            type="button"
            className="mr-3 inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#dbe5f4] text-[#0f2a4f] lg:hidden"
            aria-label="Buka menu"
          >
            <Menu size={18} aria-hidden="true" />
          </button>
          <span className="text-sm font-semibold text-[#617089]">
            Selamat datang, {user?.name ?? "Pengguna"}
          </span>
          <h1 className="mt-1 text-2xl font-semibold text-[#0f172a]">
            Dashboard Owner
          </h1>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <div className="inline-flex h-10 items-center gap-2 rounded-md border border-[#dbe5f4] bg-white px-3 text-sm font-semibold text-[#526078] shadow-sm">
            <CalendarDays size={16} aria-hidden="true" />
            Juli 2026
          </div>
          <div className="rounded-full bg-[#f2d35f] px-4 py-2 text-sm font-semibold text-[#172033]">
            Owner
          </div>
        </div>
      </div>
    </header>
  );
}
