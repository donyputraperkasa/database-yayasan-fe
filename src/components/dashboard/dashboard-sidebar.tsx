"use client";

import { clearAuthSession } from "@/lib/auth/storage";
import { dashboardNavigation } from "@/lib/constants/dashboard";
import type { Role, User } from "@/types";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type DashboardSidebarProps = {
  user: User | null;
};

export function DashboardSidebar({ user }: DashboardSidebarProps) {
  const router = useRouter();
  const role = user?.role ?? "school";
  const items = dashboardNavigation.filter((item) =>
    item.roles.some((itemRole: Role) => itemRole === role),
  );

  const handleLogout = () => {
    clearAuthSession();
    router.replace("/");
  };

  return (
    <aside className="hidden w-72 shrink-0 bg-[#0f2a4f] px-5 py-5 text-white lg:flex lg:flex-col">
      <div>
        <Link href="/dashboard" className="flex items-center gap-3">
          <Image
            src="/logo-yayasan.png"
            alt="Logo Yayasan BOPKRI Yogyakarta"
            width={44}
            height={44}
            className="h-11 w-11 rounded-full bg-white object-contain p-1"
          />
          <div>
            <p className="text-sm font-semibold uppercase text-white">
              Yayasan BOPKRI
            </p>
            <p className="text-xs text-[#b8c8df]">Owner Dashboard</p>
          </div>
        </Link>

        <nav className="mt-8 space-y-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold text-[#d7e4f5] transition hover:bg-white/12 hover:text-white"
            >
              <item.icon size={18} aria-hidden="true" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto space-y-3">
        <div className="rounded-lg border border-white/12 bg-white/8 p-4">
          <p className="text-xs font-semibold uppercase text-[#f2d35f]">
            Role aktif
          </p>
          <p className="mt-2 text-sm font-semibold capitalize text-white">
            {role}
          </p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-[#f2d35f] px-4 py-3 text-sm font-semibold text-[#172033] transition hover:bg-[#e6c64c]"
        >
          <LogOut size={17} aria-hidden="true" />
          Keluar
        </button>
      </div>
    </aside>
  );
}
