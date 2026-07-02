import type { School } from "./school";

export type FacilityCondition = "baik" | "rusak_ringan" | "rusak_berat";

export type Facility = {
  id: string;
  schoolId: string;
  school: School;
  name: string;
  quantity: number;
  condition: FacilityCondition;
  createdAt: string;
  updatedAt: string;
};

export type FacilityFilters = {
  condition?: FacilityCondition | "";
  query?: string;
  schoolId?: string;
};

export type FacilityPayload = {
  condition: FacilityCondition;
  name: string;
  quantity: number;
  schoolId?: string;
};
