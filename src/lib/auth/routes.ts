import type { Role } from "@/types";

const dashboardPathByRole: Record<Role, string> = {
  office: "/dashboard",
  owner: "/dashboard",
  school: "/dashboard",
};

export function getDashboardPath(role: Role) {
  return dashboardPathByRole[role];
}
