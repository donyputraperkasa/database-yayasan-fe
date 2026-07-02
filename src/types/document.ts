import type { School } from "./school";

export type DocumentItem = {
  id: string;
  schoolId: string;
  school: School;
  name: string;
  fileUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type DocumentFilters = {
  query?: string;
  schoolId?: string;
};

export type DocumentPayload = {
  name: string;
  schoolId?: string;
};
