import type { School } from "./school";

export type InventoryCondition = "baik" | "rusak_ringan" | "rusak_berat";

export type Inventory = {
  description?: string | null;
  goodQuantity: number;
  id: string;
  majorDamageQuantity: number;
  minorDamageQuantity: number;
  name: string;
  photoUrl?: string | null;
  quantity: number;
  schoolId: string;
  school: School;
  createdAt: string;
  updatedAt: string;
};

export type InventoryFilters = {
  condition?: InventoryCondition | "";
  query?: string;
  schoolId?: string;
};

export type InventoryPayload = {
  description?: string;
  goodQuantity: number;
  majorDamageQuantity: number;
  minorDamageQuantity: number;
  name: string;
  schoolId?: string;
};
