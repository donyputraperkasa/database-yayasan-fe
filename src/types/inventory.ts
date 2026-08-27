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
