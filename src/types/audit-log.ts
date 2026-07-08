import type { Role } from "./role";

export type AuditLog = {
  id: string;
  action: string;
  entity: string;
  entityId?: string | null;
  description: string;
  userId?: string | null;
  userEmail?: string | null;
  userRole?: Role | null;
  schoolId?: string | null;
  metadata?: Record<string, unknown> | null;
  createdAt: string;
};

export type AuditLogFilters = {
  entity?: string;
  schoolId?: string;
  take?: number;
};
