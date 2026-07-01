import type { Role } from "@/types";
import {
  Archive,
  Banknote,
  Building2,
  GraduationCap,
  Home,
  Landmark,
  School,
  Settings,
  UserPlus,
  UsersRound,
} from "lucide-react";

export const dashboardStats = [
  { label: "Sekolah", value: "36", tone: "blue" },
  { label: "Siswa", value: "8.420", tone: "indigo" },
  { label: "Pegawai", value: "612", tone: "yellow" },
  { label: "Dokumen", value: "248", tone: "slate" },
];

export const dashboardModules = [
  { title: "Profil sekolah", progress: 86 },
  { title: "Dokumen terunggah", progress: 64 },
  { title: "Data fasilitas", progress: 72 },
];

export const dashboardNavigation = [
  { href: "/dashboard", icon: Home, label: "Dashboard", roles: allRoles() },
  { href: "/users", icon: UserPlus, label: "Tambah User", roles: ["owner"] },
  {
    href: "/schools",
    icon: School,
    label: "Sekolah",
    roles: ["owner", "office"],
  },
  { href: "/students", icon: GraduationCap, label: "Siswa", roles: allRoles() },
  { href: "/employees", icon: UsersRound, label: "Pegawai", roles: allRoles() },
  { href: "/assets", icon: Archive, label: "Aset", roles: allRoles() },
  {
    href: "/facilities",
    icon: Building2,
    label: "Fasilitas",
    roles: allRoles(),
  },
  {
    href: "/finances",
    icon: Banknote,
    label: "Keuangan",
    roles: ["owner", "office"],
  },
  { href: "/documents", icon: Landmark, label: "Dokumen", roles: allRoles() },
  { href: "/settings", icon: Settings, label: "Pengaturan", roles: allRoles() },
] as const;

function allRoles(): Role[] {
  return ["owner", "office", "school"];
}
