import type { Employee, EmployeeFilters, EmployeePayload } from "@/types";
import { apiFileRequest, apiRequest } from "./client";
import { apiEndpoints } from "./endpoints";

export function listEmployees(token: string, filters: EmployeeFilters = {}) {
  const params = new URLSearchParams();

  if (filters.schoolId) params.set("schoolId", filters.schoolId);
  if (filters.type) params.set("type", filters.type);

  const query = params.toString();
  const path = query
    ? `${apiEndpoints.employees.list}?${query}`
    : apiEndpoints.employees.list;

  return apiRequest<Employee[]>(path, { token });
}

export function createEmployee(token: string, payload: EmployeePayload) {
  return apiRequest<Employee>(apiEndpoints.employees.create, {
    body: JSON.stringify(payload),
    method: "POST",
    token,
  });
}

export function updateEmployee(
  token: string,
  id: string,
  payload: EmployeePayload,
) {
  return apiRequest<Employee>(apiEndpoints.employees.update(id), {
    body: JSON.stringify(payload),
    method: "PATCH",
    token,
  });
}

export function deleteEmployee(token: string, id: string) {
  return apiRequest(apiEndpoints.employees.remove(id), {
    method: "DELETE",
    token,
  });
}

export function uploadEmployeePhoto(token: string, id: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return apiRequest<Employee>(apiEndpoints.employees.photo(id), {
    body: formData,
    method: "POST",
    token,
  });
}

export function uploadEmployeeDecree(token: string, id: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return apiRequest<Employee>(apiEndpoints.employees.decree(id), {
    body: formData,
    method: "POST",
    token,
  });
}

export function getEmployeeDecree(token: string, id: string) {
  return apiFileRequest(apiEndpoints.employees.decreeFile(id), token);
}
