import type { InventoryPayload } from "@/types";

export function buildInventoryPayload(
  formData: FormData,
  isSchoolUser: boolean,
): InventoryPayload {
  return {
    condition: getOptional(formData, "condition"),
    description: getOptional(formData, "description"),
    name: String(formData.get("name") ?? "").trim(),
    origin: getOptional(formData, "origin"),
    procurementYear: getOptionalNumber(formData, "procurementYear"),
    schoolId: isSchoolUser
      ? undefined
      : String(formData.get("schoolId") ?? "").trim(),
  };
}

export function getInventoryPhotoFile(formData: FormData) {
  const file = formData.get("photo");
  return file instanceof File && file.size > 0 ? file : null;
}

function getOptional(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  return value || undefined;
}

function getOptionalNumber(formData: FormData, key: string) {
  const value = getOptional(formData, key);
  return value ? Number(value) : undefined;
}
