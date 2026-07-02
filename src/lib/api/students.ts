import type { Student, StudentFilters, StudentPayload } from "@/types";
import { apiRequest } from "./client";
import { apiEndpoints } from "./endpoints";

export function listStudents(token: string, filters: StudentFilters = {}) {
  const params = new URLSearchParams();

  if (filters.schoolId) {
    params.set("schoolId", filters.schoolId);
  }

  if (filters.className) {
    params.set("className", filters.className);
  }

  const query = params.toString();
  const path = query
    ? `${apiEndpoints.students.list}?${query}`
    : apiEndpoints.students.list;

  return apiRequest<Student[]>(path, { token });
}

export function createStudent(token: string, payload: StudentPayload) {
  return apiRequest<Student>(apiEndpoints.students.create, {
    body: JSON.stringify(payload),
    method: "POST",
    token,
  });
}

export function updateStudent(
  token: string,
  id: string,
  payload: StudentPayload,
) {
  return apiRequest<Student>(apiEndpoints.students.update(id), {
    body: JSON.stringify(payload),
    method: "PATCH",
    token,
  });
}

export function uploadStudentPhoto(token: string, id: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return apiRequest<Student>(apiEndpoints.students.photo(id), {
    body: formData,
    method: "POST",
    token,
  });
}

export function deleteStudent(token: string, id: string) {
  return apiRequest(apiEndpoints.students.remove(id), {
    method: "DELETE",
    token,
  });
}
