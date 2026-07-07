"use client";

import { clearAuthSession } from "@/lib/auth/storage";
import { dashboardNavigation } from "@/lib/constants/dashboard";
import type { Role, User } from "@/types";
import { LogOut, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

type DashboardSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
};

export function DashboardSidebar({
  isOpen,
  onClose,
  user,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const role = user?.role ?? "school";
  const roleLabel = formatRole(role);
  const items = dashboardNavigation.filter((item) =>
    item.roles.some((itemRole: Role) => itemRole === role),
  );

  const handleLogout = () => {
    clearAuthSession();
    router.replace("/");
  };

  return (
    <>
      {isOpen ? (
        <button
          type="button"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-[#071529]/55 backdrop-blur-sm lg:hidden"
          aria-label="Tutup menu"
        />
      ) : null}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[#0f2a4f]",
          "px-5 py-5 text-white shadow-2xl transition-transform duration-300",
          "lg:static lg:z-auto lg:shrink-0 lg:translate-x-0 lg:shadow-none",
          isOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div>
          <div className="flex items-center justify-between gap-3">
            <Link href="/dashboard" onClick={onClose} className="flex items-center gap-3">
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
                <p className="text-xs text-[#b8c8df]">
                  {roleLabel} Dashboard
                </p>
              </div>
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/10 lg:hidden"
              aria-label="Tutup menu"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <nav className="mt-8 space-y-1">
            {items.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={[
                    "flex items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold transition",
                    isActive
                      ? "bg-[#f2d35f] text-[#172033] shadow-sm"
                      : "text-[#d7e4f5] hover:bg-white/12 hover:text-white",
                  ].join(" ")}
                >
                  <item.icon size={18} aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto space-y-3">
          <div className="rounded-lg border border-white/12 bg-white/8 p-4">
            <p className="text-xs font-semibold uppercase text-[#f2d35f]">
              Role aktif
            </p>
            <p className="mt-2 text-sm font-semibold capitalize text-white">
              {roleLabel}
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
    </>
  );
}

function formatRole(role: Role) {
  if (role === "office") return "Office";
  if (role === "school") return "School";

  return "Owner";
}
