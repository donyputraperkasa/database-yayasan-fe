import type { InventoryCondition } from "@/types";

export const inventoryConditionLabel: Record<InventoryCondition, string> = {
  baik: "Baik",
  rusak_berat: "Rusak berat",
  rusak_ringan: "Rusak ringan",
};

export const inventoryConditionTone: Record<InventoryCondition, string> = {
  baik: "bg-emerald-50 text-emerald-700",
  rusak_berat: "bg-red-50 text-red-700",
  rusak_ringan: "bg-amber-50 text-amber-700",
};
