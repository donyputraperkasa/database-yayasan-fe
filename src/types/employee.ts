import type { Gender, School } from "@/types";

export type EmployeeType = "guru" | "pegawai";
export type EmployeeStatus = "tetap" | "tidak_tetap" | "honorer";

export type Employee = {
  id: string;
  schoolId: string;
  school: School;
  name: string;
  gender?: Gender | null;
  birthPlaceDate?: string | null;
  birthDate?: string | null;
  religion?: string | null;
  lastEducation?: string | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  status?: EmployeeStatus | null;
  decreeNumber?: string | null;
  joinDate?: string | null;
  workingPeriod?: string | null;
  retirementAge?: number | null;
  retirementDate?: string | null;
  position?: string | null;
  otherPosition?: string | null;
  type: EmployeeType;
  fee?: string | null;
  photoUrl?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type EmployeeFilters = {
  query?: string;
  schoolId?: string;
  type?: EmployeeType;
};

export type EmployeePayload = {
  [K in keyof Partial<Employee>]?: Employee[K];
};
