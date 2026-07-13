import type { DocumentFilters, DocumentItem, DocumentPayload } from "@/types";
import { apiFileRequest, apiRequest } from "./client";
import { apiEndpoints } from "./endpoints";

export function listDocuments(token: string, filters: DocumentFilters = {}) {
  const params = new URLSearchParams();

  if (filters.schoolId) params.set("schoolId", filters.schoolId);

  const query = params.toString();
  const path = query
    ? `${apiEndpoints.documents.list}?${query}`
    : apiEndpoints.documents.list;

  return apiRequest<DocumentItem[]>(path, { token });
}

export function uploadDocument(
  token: string,
  payload: DocumentPayload,
  file: File,
) {
  const formData = new FormData();
  formData.append("name", payload.name);
  if (payload.schoolId) formData.append("schoolId", payload.schoolId);
  formData.append("file", file);

  return apiRequest<DocumentItem>(apiEndpoints.documents.upload, {
    body: formData,
    method: "POST",
    token,
  });
}

export function updateDocument(
  token: string,
  id: string,
  payload: DocumentPayload,
  file?: File | null,
) {
  if (file) {
    const formData = new FormData();
    formData.append("name", payload.name);
    if (payload.schoolId) formData.append("schoolId", payload.schoolId);
    formData.append("file", file);

    return apiRequest<DocumentItem>(apiEndpoints.documents.update(id), {
      body: formData,
      method: "PATCH",
      token,
    });
  }

  return apiRequest<DocumentItem>(apiEndpoints.documents.update(id), {
    body: JSON.stringify(payload),
    method: "PATCH",
    token,
  });
}

export function deleteDocument(token: string, id: string) {
  return apiRequest(apiEndpoints.documents.remove(id), {
    method: "DELETE",
    token,
  });
}

export function getDocumentFile(token: string, id: string) {
  return apiFileRequest(apiEndpoints.documents.file(id), token);
}
