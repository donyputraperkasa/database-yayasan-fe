import type { Finance, FinanceFilters, FinancePayload } from "@/types";
import { apiRequest } from "./client";
import { apiEndpoints } from "./endpoints";

export function listFinances(token: string, filters: FinanceFilters = {}) {
  const params = new URLSearchParams();

  if (filters.schoolId) params.set("schoolId", filters.schoolId);
  if (filters.type) params.set("type", filters.type);
  if (filters.className) params.set("className", filters.className);

  const query = params.toString();
  const path = query
    ? `${apiEndpoints.finances.list}?${query}`
    : apiEndpoints.finances.list;

  return apiRequest<Finance[]>(path, { token });
}

export function createFinance(token: string, payload: FinancePayload) {
  return apiRequest<Finance>(apiEndpoints.finances.create, {
    body: JSON.stringify(payload),
    method: "POST",
    token,
  });
}

export function updateFinance(
  token: string,
  id: string,
  payload: FinancePayload,
) {
  return apiRequest<Finance>(apiEndpoints.finances.update(id), {
    body: JSON.stringify(payload),
    method: "PATCH",
    token,
  });
}

export function deleteFinance(token: string, id: string) {
  return apiRequest(apiEndpoints.finances.remove(id), {
    method: "DELETE",
    token,
  });
}
