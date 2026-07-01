import type { Role } from "./role";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  schoolId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type AuthUser = {
  sub: string;
  email: string;
  role: Role;
  schoolId?: string | null;
};
