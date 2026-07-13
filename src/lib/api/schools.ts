import type {
  CreateSchoolPayload,
  School,
  SchoolProfile,
  UpdateSchoolPayload,
  UpdateSchoolProfilePayload,
} from "@/types";
import { apiRequest } from "./client";
import { apiEndpoints } from "./endpoints";

export function listSchools(token: string) {
  return apiRequest<School[]>(apiEndpoints.schools.list, { token });
}

export function listArchivedSchools(token: string) {
  return apiRequest<School[]>(apiEndpoints.schools.archived, { token });
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

export function restoreSchool(token: string, id: string) {
  return apiRequest<School>(apiEndpoints.schools.restore(id), {
    method: "PATCH",
    token,
  });
}

export function updateSchool(
  token: string,
  id: string,
  payload: UpdateSchoolPayload,
) {
  return apiRequest<School>(apiEndpoints.schools.update(id), {
    body: JSON.stringify(payload),
    method: "PATCH",
    token,
  });
}

export function getSchoolProfile(token: string, schoolId: string) {
  return apiRequest<SchoolProfile | null>(apiEndpoints.schoolProfile.detail(schoolId), {
    token,
  });
}

export function updateSchoolProfile(
  token: string,
  schoolId: string,
  payload: UpdateSchoolProfilePayload,
) {
  return apiRequest<SchoolProfile>(apiEndpoints.schoolProfile.update(schoolId), {
    body: JSON.stringify(payload),
    method: "PATCH",
    token,
  });
}

export function uploadSchoolProfilePhoto(
  token: string,
  schoolId: string,
  file: File,
) {
  const formData = new FormData();
  formData.append("file", file);

  return apiRequest<SchoolProfile>(apiEndpoints.schoolProfile.photo(schoolId), {
    body: formData,
    method: "POST",
    token,
  });
}

export function setSchoolEditAccess(
  token: string,
  id: string,
  canEdit: boolean,
) {
  return apiRequest<School>(apiEndpoints.schools.editAccess(id), {
    body: JSON.stringify({ canEdit }),
    method: "PATCH",
    token,
  });
}
