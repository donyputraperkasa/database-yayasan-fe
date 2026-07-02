import type { CreateSchoolPayload, School } from "@/types";
import { apiRequest } from "./client";
import { apiEndpoints } from "./endpoints";

export function listSchools(token: string) {
  return apiRequest<School[]>(apiEndpoints.schools.list, { token });
}

export function createSchool(token: string, payload: CreateSchoolPayload) {
  return apiRequest<School>(apiEndpoints.schools.create, {
    body: JSON.stringify(payload),
    method: "POST",
    token,
  });
}

export function deleteSchool(token: string, id: string) {
  return apiRequest(apiEndpoints.schools.remove(id), {
    method: "DELETE",
    token,
  });
}
