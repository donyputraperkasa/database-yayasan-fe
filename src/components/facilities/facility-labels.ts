import type { FacilityCondition } from "@/types";

export const facilityConditionLabel: Record<FacilityCondition, string> = {
  baik: "Baik",
  rusak_berat: "Rusak berat",
  rusak_ringan: "Rusak ringan",
};

export const facilityConditionTone: Record<FacilityCondition, string> = {
  baik: "bg-emerald-50 text-emerald-700",
  rusak_berat: "bg-red-50 text-red-700",
  rusak_ringan: "bg-amber-50 text-amber-700",
};
