import type { School } from "./school";

export type Inventory = {
  condition?: string | null;
  description?: string | null;
  id: string;
  name: string;
  origin?: string | null;
  photoUrl?: string | null;
  procurementYear?: number | null;
  schoolId: string;
  school: School;
  createdAt: string;
  updatedAt: string;
};

export type InventoryFilters = {
  condition?: string;
  level?: string;
  query?: string;
  schoolId?: string;
};

export type InventoryPayload = {
  condition?: string;
  description?: string;
  name: string;
  origin?: string;
  procurementYear?: number;
  schoolId?: string;
};

export type InventoryCondition = "baik" | "rusak_ringan" | "rusak_berat";

export type InventoryTableProps = {
  canBackToSchools?: boolean;
  canManage: boolean;
  inventory: Inventory[];
  onBackToSchools: () => void;
  onDelete: (inventory: Inventory) => void;
  onDetail: (inventory: Inventory) => void;
  onEdit: (inventory: Inventory) => void;
  onSelectSchool: (schoolName: string) => void;
  selectedSchoolName?: string | null;
};

export type InventoryFormModalProps = {
  inventory?: Inventory | null;
  isOpen: boolean;
  isSchoolUser: boolean;
  onClose: () => void;
  onSaved: (inventory: Inventory) => void;
  schools: School[];
  token: string;
};

export type InventoryDetailModalProps = {
  inventory: Inventory | null;
  onClose: () => void;
};

export type InventoryFilterProps = {
  filters: InventoryFilters;
  isSchoolUser: boolean;
  onChange: (filters: InventoryFilters) => void;
  onSubmit: () => void;
  schools: School[];
};

