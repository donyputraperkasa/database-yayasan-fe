export type SchoolLevel = "tk_kb" | "sd" | "smp" | "sma_smk";

export type School = {
  id: string;
  name: string;
  level: SchoolLevel;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  principal?: string | null;
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
