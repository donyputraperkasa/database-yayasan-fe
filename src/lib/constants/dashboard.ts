import type { Role } from "@/types";
import {
  Banknote,
  Building2,
  GraduationCap,
  Home,
  IdCard,
  Landmark,
  School,
  Settings,
  ShieldCheck,
  UserRoundCheck,
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
  { title: "Biodata sekolah", progress: 86 },
  { title: "Dokumen terunggah", progress: 64 },
  { title: "Data inventaris", progress: 72 },
];

export const dashboardNavigation = [
  { href: "/dashboard", 
    icon: Home, 
    label: "Dashboard", 
    roles: allRoles() 
  },
  { href: "/users", 
    icon: UserPlus, 
    label: "Tambah User", 
    roles: ["owner"] 
  },
  {
    href: "/schools",
    icon: School,
    label: "Tambah Sekolah",
    roles: ["owner"],
  },
  {
    href: "/principals",
    icon: UserRoundCheck,
    label: "Profil Sekolah",
    roles: ["owner", "office"],
  },
  { href: "/students", 
    icon: GraduationCap, 
    label: "Daftar Siswa", 
    roles: allRoles() 
  },
  { href: "/employees", 
    icon: UsersRound, 
    label: "Daftar Pegawai", 
    roles: ["owner", "psdm"] 
  },
  {
    href: "/inventory",
    icon: Building2,
    label: "Daftar Inventaris",
    roles: allRoles(),
  },
  {
    href: "/finances",
    icon: Banknote,
    label: "Keuangan",
    roles: allRoles(),
  },
  { href: "/documents", 
    icon: Landmark, 
    label: "Dokumen", 
    roles: allRoles() 
  },
  {
    href: "/audit-logs",
    icon: ShieldCheck,
    label: "Audit Log",
    roles: allRoles(),
  },
  {
    href: "/school-profile",
    icon: IdCard,
    label: "Biodata Sekolah",
    roles: ["school"],
  },
  {
    href: "/settings",
    icon: Settings,
    label: "Pengaturan",
    roles: ["office", "school", "psdm"],
  },
] as const;

function allRoles(): Role[] {
  return ["owner", "office", "school", "psdm"];
}
