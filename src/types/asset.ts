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

export type AssetsTableProps = {
  assets: Asset[];
  canBackToSchools?: boolean;
  canManage: boolean;
  onBackToSchools: () => void;
  onDelete: (asset: Asset) => void;
  onDetail: (asset: Asset) => void;
  onEdit: (asset: Asset) => void;
  onSelectSchool: (schoolName: string) => void;
  selectedSchoolName?: string | null;
};

export type AssetFormModalProps = {
  asset?: Asset | null;
  isOpen: boolean;
  isSchoolUser: boolean;
  onClose: () => void;
  onSaved: (asset: Asset) => void;
  schools: School[];
  token: string;
};

export type AssetDetailModalProps = {
  asset: Asset | null;
  onClose: () => void;
};

export type AssetsFilterProps = {
  filters: AssetFilters;
  isSchoolUser: boolean;
  onChange: (filters: AssetFilters) => void;
  onSubmit: () => void;
  schools: School[];
};

