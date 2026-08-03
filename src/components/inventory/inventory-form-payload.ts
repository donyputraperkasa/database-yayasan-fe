import type { InventoryPayload } from "@/types";

export function buildInventoryPayload(
  formData: FormData,
  isSchoolUser: boolean,
): InventoryPayload {
  return {
    description: getOptional(formData, "description"),
    goodQuantity: getQuantity(formData, "goodQuantity"),
    majorDamageQuantity: getQuantity(formData, "majorDamageQuantity"),
    minorDamageQuantity: getQuantity(formData, "minorDamageQuantity"),
    name: String(formData.get("name") ?? "").trim(),
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

function getQuantity(formData: FormData, key: string) {
  return Number(formData.get(key) ?? 0);
}
