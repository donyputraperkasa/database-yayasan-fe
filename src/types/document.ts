import type { School } from "./school";

export type DocumentItem = {
  id: string;
  schoolId: string;
  school: School;
  name: string;
  fileUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type DocumentFilters = {
  level?: string;
  query?: string;
  schoolId?: string;
};

export type DocumentPayload = {
  name: string;
  schoolId?: string;
};

export type DocumentsTableProps = {
  canBackToSchools?: boolean;
  canManage: boolean;
  documents: DocumentItem[];
  onBackToSchools: () => void;
  onDelete: (document: DocumentItem) => void;
  onDetail: (document: DocumentItem) => void;
  onEdit: (document: DocumentItem) => void;
  onSelectSchool: (schoolName: string) => void;
  selectedSchoolName?: string | null;
};

export type DocumentFormModalProps = {
  document?: DocumentItem | null;
  isOpen: boolean;
  isSchoolUser: boolean;
  onClose: () => void;
  onSaved: (document: DocumentItem) => void;
  schools: School[];
  token: string;
};

export type DocumentDetailModalProps = {
  document: DocumentItem | null;
  onClose: () => void;
};

export type DocumentsFilterProps = {
  filters: DocumentFilters;
  isSchoolUser: boolean;
  onChange: (filters: DocumentFilters) => void;
  onSubmit: () => void;
  schools: School[];
};

export type DocumentStatsProps = {
  documents: DocumentItem[];
};

