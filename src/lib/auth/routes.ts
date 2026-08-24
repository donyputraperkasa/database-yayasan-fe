import type { Role } from "@/types";

const dashboardPathByRole: Record<Role, string> = {
  owner: "/dashboard",
  school: "/dashboard",
  general: "/dashboard",
  psdm: "/dashboard",
  manager: "/dashboard",
  director: "/dashboard",
};

export function getDashboardPath(role: Role) {
  return dashboardPathByRole[role];
}
