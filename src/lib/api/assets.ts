import type { Asset, AssetFilters, AssetPayload } from "@/types";
import { apiRequest } from "./client";
import { apiEndpoints } from "./endpoints";

export function listAssets(token: string, filters: AssetFilters = {}) {
  const params = new URLSearchParams();

  if (filters.schoolId) {
    params.set("schoolId", filters.schoolId);
  }

  const query = params.toString();
  const path = query
    ? `${apiEndpoints.assets.list}?${query}`
    : apiEndpoints.assets.list;

  return apiRequest<Asset[]>(path, { token });
}

export function createAsset(token: string, payload: AssetPayload) {
  return apiRequest<Asset>(apiEndpoints.assets.create, {
    body: JSON.stringify(payload),
    method: "POST",
    token,
  });
}

export function updateAsset(token: string, id: string, payload: AssetPayload) {
  return apiRequest<Asset>(apiEndpoints.assets.update(id), {
    body: JSON.stringify(payload),
    method: "PATCH",
    token,
  });
}

export function uploadAssetPhoto(token: string, id: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return apiRequest<Asset>(apiEndpoints.assets.photo(id), {
    body: formData,
    method: "POST",
    token,
  });
}

export function deleteAsset(token: string, id: string) {
  return apiRequest(apiEndpoints.assets.remove(id), {
    method: "DELETE",
    token,
  });
}
