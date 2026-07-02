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
