import type { School } from "./school";

export type FinanceType =
  | "spp"
  | "dpp"
  | "bos"
  | "bosda"
  | "rekening"
  | "lain_lain";

export type Finance = {
  id: string;
  schoolId: string;
  school: School;
  type: FinanceType;
  className?: string | null;
  amount?: number | null;
  accountNo?: string | null;
  balance?: number | null;
  date?: string | null;
  note?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type FinanceFilters = {
  className?: string;
  level?: string;
  query?: string;
  schoolId?: string;
  type?: FinanceType | "";
};

export type FinancePayload = {
  accountNo?: string;
  amount?: number;
  balance?: number;
  className?: string;
  date?: string;
  note?: string;
  schoolId?: string;
  type: FinanceType;
};

export type FinancesTableProps = {
  canBackToSchools?: boolean;
  canManage: boolean;
  finances: Finance[];
  onBackToSchools: () => void;
  onDelete: (finance: Finance) => void;
  onDetail: (finance: Finance) => void;
  onEdit: (finance: Finance) => void;
  onSelectSchool: (schoolName: string) => void;
  selectedSchoolName?: string | null;
};

export type FinanceFormModalProps = {
  finance?: Finance | null;
  isOpen: boolean;
  isSchoolUser: boolean;
  onClose: () => void;
  onSaved: (finance: Finance) => void;
  schools: School[];
  token: string;
};

export type FinanceDetailModalProps = {
  finance: Finance | null;
  onClose: () => void;
};

export type FinancesFilterProps = {
  filters: FinanceFilters;
  isSchoolUser: boolean;
  onChange: (filters: FinanceFilters) => void;
  onSubmit: () => void;
  schools: School[];
};

export type FinancesHeaderProps = {
  canManage: boolean;
  onCreate: () => void;
};

