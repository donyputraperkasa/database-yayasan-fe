import type { AuditLog, AuditLogFilters } from "@/types";
import { apiRequest } from "./client";
import { apiEndpoints } from "./endpoints";

export function listAuditLogs(token: string, filters: AuditLogFilters = {}) {
  const params = new URLSearchParams();

  if (filters.entity) params.set("entity", filters.entity);
  if (filters.schoolId) params.set("schoolId", filters.schoolId);
  if (filters.take) params.set("take", String(filters.take));

  const query = params.toString();
  const path = query
    ? `${apiEndpoints.auditLogs.list}?${query}`
    : apiEndpoints.auditLogs.list;

  return apiRequest<AuditLog[]>(path, { token });
}
