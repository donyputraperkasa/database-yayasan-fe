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
  decreeUrl?: string | null;
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
  level?: string;
  query?: string;
  schoolId?: string;
  type?: EmployeeType;
};

export type EmployeePayload = {
  [K in keyof Partial<Employee>]?: Employee[K];
};

export type EmployeesTableProps = {
  canBackToSchools?: boolean;
  canDetail?: boolean;
  canManage: boolean;
  employees: Employee[];
  onBackToSchools: () => void;
  onDelete: (employee: Employee) => void;
  onDetail: (employee: Employee) => void;
  onEdit: (employee: Employee) => void;
  onSelectSchool: (schoolName: string) => void;
  selectedSchoolName?: string | null;
};

export type EmployeeFormModalProps = {
  employee?: Employee | null;
  isOpen: boolean;
  isSchoolUser: boolean;
  onClose: () => void;
  onSaved: (employee: Employee) => void;
  schools: School[];
  token: string;
};

export type EmployeeDetailModalProps = {
  employee: Employee | null;
  onClose: () => void;
};

export type EmployeesFilterProps = {
  filters: EmployeeFilters;
  isSchoolUser: boolean;
  onChange: (filters: EmployeeFilters) => void;
  onSubmit: () => void;
  schools: School[];
  selectedSchoolName?: string | null;
};

export type EmployeesHeaderProps = {
  canManage: boolean;
  onCreate: () => void;
};

export type EmployeeStatsProps = {
  employees: Employee[];
};

