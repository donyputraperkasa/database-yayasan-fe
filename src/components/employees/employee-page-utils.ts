import type { Employee, EmployeeFilters } from "@/types";

export function cleanEmployeeFilters(filters: EmployeeFilters): EmployeeFilters {
  return {
    schoolId: filters.schoolId || undefined,
    type: filters.type || undefined,
  };
}

export function filterEmployees(employees: Employee[], query?: string) {
  const keyword = query?.trim().toLowerCase();
  if (!keyword) return employees;

  return employees.filter((employee) =>
    [
      employee.name,
      employee.school.name,
      employee.position,
      employee.otherPosition,
      employee.religion,
      employee.email,
      employee.phone,
    ].some((value) => value?.toLowerCase().includes(keyword)),
  );
}

export function groupEmployeesBySchool(employees: Employee[]) {
  return employees.reduce<Record<string, Employee[]>>((groups, employee) => {
    const schoolName = employee.school.name;
    groups[schoolName] = [...(groups[schoolName] ?? []), employee];
    return groups;
  }, {});
}

export function upsertEmployee(employees: Employee[], saved: Employee) {
  if (!employees.some((employee) => employee.id === saved.id)) {
    return [saved, ...employees];
  }

  return employees.map((employee) =>
    employee.id === saved.id ? saved : employee,
  );
}

export function getEmployeeErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Gagal mengambil data.";
}
