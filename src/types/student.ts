import type { School } from "./school";

export type Gender = "male" | "female";

export type Student = {
  id: string;
  schoolId: string;
  school: School;
  name: string;
  birthPlaceDate?: string | null;
  address?: string | null;
  gender?: Gender | null;
  religion?: string | null;
  fatherName?: string | null;
  motherName?: string | null;
  fatherJob?: string | null;
  motherJob?: string | null;
  className?: string | null;
  sppAmount?: number | null;
  photoUrl?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type StudentFilters = {
  className?: string;
  level?: string;
  query?: string;
  schoolId?: string;
};

export type StudentPayload = {
  address?: string;
  birthPlaceDate?: string;
  className?: string;
  fatherJob?: string;
  fatherName?: string;
  gender?: Gender;
  religion?: string;
  motherJob?: string;
  motherName?: string;
  name: string;
  photoUrl?: string;
  schoolId?: string;
  sppAmount?: number;
};

export type StudentsTableProps = {
  canBackToSchools?: boolean;
  canManage: boolean;
  onDelete: (student: Student) => void;
  onDetail: (student: Student) => void;
  onEdit: (student: Student) => void;
  onBackToSchools: () => void;
  onBackToClasses: () => void;
  onSelectClass: (className: string) => void;
  onSelectSchool: (schoolName: string) => void;
  selectedClassName?: string | null;
  selectedSchoolName?: string | null;
  students: Student[];
};

