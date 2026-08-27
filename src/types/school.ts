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
  archivedAt?: string | null;
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

export type SchoolsTableProps = {
  onDelete: (school: School) => void;
  onToggleEditAccess: (school: School) => Promise<void>;
  schools: School[];
};

export type SchoolsSearchBoxProps = {
  level: string;
  onClear: () => void;
  query: string;
  setLevel: (level: string) => void;
  setQuery: (query: string) => void;
};

export type ArchivedSchoolsProps = {
  isRestoring?: string | null;
  onDelete?: (school: School) => void;
  onRestore: (school: School) => void;
  schools: School[];
};

export type ArchiveSchoolModalProps = {
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
  school: School | null;
};

export type DeleteArchivedSchoolModalProps = {
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
  school: School | null;
};

export type CreateSchoolFormProps = {
  onCreated: (school: School) => void;
  token: string;
};

export type SchoolEditAccessNoticeProps = {
  school?: School | null;
  user?: { role: string } | null;
};

export type PrincipalProfileFormModalProps = {
  asset: import("./asset").Asset | null;
  isOpen: boolean;
  onClose: () => void;
  onSaved: (school: School, asset: import("./asset").Asset | null) => void;
  school: School | null;
  token: string;
};

export type PrincipalDetailModalProps = {
  asset?: import("./asset").Asset | null;
  onClose: () => void;
  school: School | null;
};


