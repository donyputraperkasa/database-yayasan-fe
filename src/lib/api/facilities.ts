import type { Facility, FacilityFilters, FacilityPayload } from "@/types";
import { apiRequest } from "./client";
import { apiEndpoints } from "./endpoints";

export function listFacilities(token: string, filters: FacilityFilters = {}) {
  const params = new URLSearchParams();

  if (filters.schoolId) params.set("schoolId", filters.schoolId);
  if (filters.condition) params.set("condition", filters.condition);

  const query = params.toString();
  const path = query
    ? `${apiEndpoints.facilities.list}?${query}`
    : apiEndpoints.facilities.list;

  return apiRequest<Facility[]>(path, { token });
}

export function createFacility(token: string, payload: FacilityPayload) {
  return apiRequest<Facility>(apiEndpoints.facilities.create, {
    body: JSON.stringify(payload),
    method: "POST",
    token,
  });
}

export function updateFacility(
  token: string,
  id: string,
  payload: FacilityPayload,
) {
  return apiRequest<Facility>(apiEndpoints.facilities.update(id), {
    body: JSON.stringify(payload),
    method: "PATCH",
    token,
  });
}

export function deleteFacility(token: string, id: string) {
  return apiRequest(apiEndpoints.facilities.remove(id), {
    method: "DELETE",
    token,
  });
}
