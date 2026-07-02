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
