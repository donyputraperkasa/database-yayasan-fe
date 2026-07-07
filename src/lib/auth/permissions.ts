import type { School, User } from "@/types";

export function getCurrentSchool(user: User | null, schools: School[]) {
  if (user?.role !== "school" || !user.schoolId) return null;

  return schools.find((school) => school.id === user.schoolId) ?? null;
}

export function canManageSchoolData(user: User | null, schools: School[]) {
  if (user?.role === "owner") return true;

  const currentSchool = getCurrentSchool(user, schools);

  return user?.role === "school" && Boolean(currentSchool?.canEdit);
}
