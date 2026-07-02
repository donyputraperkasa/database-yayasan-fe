import type { School } from "./school";

export type Asset = {
  id: string;
  schoolId: string;
  school: School;
  landArea?: string | null;
  certificateOwner?: string | null;
  origin?: string | null;
  procurementYear?: number | null;
  buildingArea?: string | null;
  photoUrl?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type AssetFilters = {
  query?: string;
  schoolId?: string;
};

export type AssetPayload = {
  buildingArea?: string;
  certificateOwner?: string;
  landArea?: string;
  origin?: string;
  photoUrl?: string;
  procurementYear?: number;
  schoolId?: string;
};
