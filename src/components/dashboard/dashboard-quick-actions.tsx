import type { Role } from "@/types";
import {
  ArrowRight,
  ClipboardList,
  FileDown,
  FileUp,
  School,
  UsersRound,
} from "lucide-react";
import Link from "next/link";

const ownerActions = [
  { href: "/documents", icon: FileUp, label: "Upload dokumen" },
  { href: "/schools", icon: ClipboardList, label: "Cek data sekolah" },
  { href: "/schools", icon: School, label: "Lihat unit sekolah" },
];

const officeActions = [
  { href: "/documents", icon: FileDown, label: "Download dokumen" },
  { href: "/students", icon: UsersRound, label: "Pantau siswa dan pegawai" },
  { href: "/facilities", icon: ClipboardList, label: "Cek data fasilitas" },
];

const schoolActions = [
  { href: "/documents", icon: FileUp, label: "Kelola dokumen" },
  { href: "/students", icon: UsersRound, label: "Kelola siswa" },
  { href: "/facilities", icon: ClipboardList, label: "Kelola fasilitas" },
];

export function DashboardQuickActions({ role }: { role: Role }) {
  const quickActions =
    role === "office"
      ? officeActions
      : role === "school"
        ? schoolActions
        : ownerActions;
  const subtitle =
    role === "office"
      ? "Akses pemantauan data sekolah dan dokumen dari satu tempat."
      : role === "school"
        ? "Kelola data sekolah sesuai akses edit yang dibuka owner."
      : "Akses pekerjaan yang sering dilakukan dari satu tempat.";

  return (
    <div className="rounded-lg border border-[#173b6b] bg-[#0f2a4f] p-5 text-white shadow-sm">
      <h2 className="text-lg font-semibold">Aksi Cepat</h2>
      <p className="mt-2 text-sm leading-6 text-[#c9d5ec]">
        {subtitle}
      </p>

      <div className="mt-5 space-y-3">
        {quickActions.map((item) => (
          <Link
            href={item.href}
            key={item.label}
            className="flex w-full items-center justify-between rounded-md bg-white/8 px-4 py-3 text-sm font-semibold transition hover:bg-white/14"
          >
            <span className="flex items-center gap-3">
              <item.icon size={17} aria-hidden="true" />
              {item.label}
            </span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </div>
  );
}
