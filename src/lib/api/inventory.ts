import type { Inventory, InventoryFilters, InventoryPayload } from "@/types";
import { apiRequest } from "./client";
import { apiEndpoints } from "./endpoints";

export function listInventory(token: string, filters: InventoryFilters = {}) {
  const params = new URLSearchParams();

  if (filters.schoolId) params.set("schoolId", filters.schoolId);
  if (filters.condition) params.set("condition", filters.condition);

  const query = params.toString();
  const path = query
    ? `${apiEndpoints.inventory.list}?${query}`
    : apiEndpoints.inventory.list;

  return apiRequest<Inventory[]>(path, { token });
}

export function createInventory(token: string, payload: InventoryPayload) {
  return apiRequest<Inventory>(apiEndpoints.inventory.create, {
    body: JSON.stringify(payload),
    method: "POST",
    token,
  });
}

export function updateInventory(
  token: string,
  id: string,
  payload: InventoryPayload,
) {
  return apiRequest<Inventory>(apiEndpoints.inventory.update(id), {
    body: JSON.stringify(payload),
    method: "PATCH",
    token,
  });
}

export function uploadInventoryPhoto(token: string, id: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return apiRequest<Inventory>(apiEndpoints.inventory.photo(id), {
    body: formData,
    method: "POST",
    token,
  });
}

export function deleteInventory(token: string, id: string) {
  return apiRequest(apiEndpoints.inventory.remove(id), {
    method: "DELETE",
    token,
  });
}
