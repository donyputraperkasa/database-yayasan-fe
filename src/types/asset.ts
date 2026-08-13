import type { School } from "./school";

export type Asset = {
  id: string;
  schoolId: string;
  school: School;
  landArea?: string | null;
  buildingArea?: string | null;
  ownershipStatus?: string | null;
  photoUrl?: string | null;
  certificateOwner?: string | null;
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
  ownershipStatus?: string;
  procurementYear?: number;
  schoolId?: string;
};
