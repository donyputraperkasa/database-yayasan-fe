import type { AssetPayload } from "@/types";

export function buildAssetPayload(
  formData: FormData,
  isSchoolUser: boolean,
): AssetPayload {
  return {
    buildingArea: getOptional(formData, "buildingArea"),
    landArea: getOptional(formData, "landArea"),
    ownershipStatus: getOptional(formData, "ownershipStatus"),
    schoolId: isSchoolUser ? undefined : getOptional(formData, "schoolId"),
  };
}

function getOptional(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  return value || undefined;
}
