import type { Role } from "@/types";

const dashboardPathByRole: Record<Role, string> = {
  owner: "/dashboard",
  school: "/dashboard",
  general_office: "/dashboard",
  general_psdm: "/dashboard",
  general_manager: "/dashboard",
  general_director: "/dashboard",
};

export function getDashboardPath(role: Role) {
  return dashboardPathByRole[role];
}
