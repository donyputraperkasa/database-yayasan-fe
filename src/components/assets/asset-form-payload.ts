import type { AssetPayload } from "@/types";

export function buildAssetPayload(
  formData: FormData,
  isSchoolUser: boolean,
): AssetPayload {
  return {
    buildingArea: getOptional(formData, "buildingArea"),
    certificateOwner: getOptional(formData, "certificateOwner"),
    landArea: getOptional(formData, "landArea"),
    origin: getOptional(formData, "origin"),
    procurementYear: getOptionalNumber(formData, "procurementYear"),
    schoolId: isSchoolUser ? undefined : getOptional(formData, "schoolId"),
  };
}

export function getAssetPhotoFile(formData: FormData) {
  const file = formData.get("photo");

  if (file instanceof File && file.size > 0) {
    return file;
  }

  return null;
}

function getOptional(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  return value || undefined;
}

function getOptionalNumber(formData: FormData, key: string) {
  const value = getOptional(formData, key);
  return value ? Number(value) : undefined;
}
