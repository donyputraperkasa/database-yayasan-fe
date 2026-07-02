import type { EmployeeStatus, EmployeeType } from "@/types";

export const employeeTypeLabel: Record<EmployeeType, string> = {
  guru: "Guru",
  pegawai: "Pegawai",
};

export const employeeStatusLabel: Record<EmployeeStatus, string> = {
  honorer: "Honorer",
  tetap: "Tetap",
  tidak_tetap: "Tidak tetap",
};

export function genderLabel(gender?: string | null) {
  if (gender === "male") return "Laki-laki";
  if (gender === "female") return "Perempuan";
  return "-";
}

export function formatDate(value?: string | null) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function dateInputValue(value?: string | null) {
  return value ? value.slice(0, 10) : "";
}

export function birthPlaceDateValue(place?: string | null, date?: string | null) {
  if (place && date && !/\d{4}/.test(place)) {
    return `${place}, ${formatDate(date).toLowerCase()}`;
  }

  return place ?? "";
}
