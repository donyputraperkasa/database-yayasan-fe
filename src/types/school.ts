export type SchoolLevel = "tk_kb" | "sd" | "smp" | "sma_smk";

export type School = {
  id: string;
  name: string;
  level: SchoolLevel;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  principal?: string | null;
  canEdit: boolean;
  profile?: SchoolProfile | null;
  createdAt: string;
  updatedAt: string;
};

export type SchoolProfile = {
  id: string;
  schoolId: string;
  history?: string | null;
  vision?: string | null;
  mission?: string | null;
  motto?: string | null;
  photoUrl?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateSchoolPayload = {
  address?: string;
  email?: string;
  level: SchoolLevel;
  name: string;
  phone?: string;
  principal?: string;
};

export type UpdateSchoolPayload = Partial<CreateSchoolPayload>;

export type UpdateSchoolProfilePayload = {
  history?: string;
  mission?: string;
  motto?: string;
  photoUrl?: string;
  vision?: string;
};
