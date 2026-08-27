import type { AssetPayload } from "@/types";

export const fieldClass =
  "mt-1.5 h-11 w-full rounded-md border border-[#ced9eb] bg-white px-3 text-sm text-[#172033] outline-none transition focus:border-[#1f4f8f] focus:ring-2 focus:ring-[#eaf2ff] disabled:bg-[#f1f5f9] disabled:text-[#748299]";

export function getValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export function getFile(formData: FormData, key: string) {
  const file = formData.get(key);
  return file instanceof File && file.size > 0 ? file : undefined;
}

export function getPhotoFile(formData: FormData) {
  return getFile(formData, "photo");
}

export function buildAssetPayload(formData: FormData): AssetPayload {
  const landArea = getValue(formData, "landArea");
  const buildingArea = getValue(formData, "buildingArea");
  const procurementYear = getValue(formData, "procurementYear");

  return {
    buildingArea,
    certificateOwner: getValue(formData, "certificateOwner"),
    landArea,
    origin: getValue(formData, "origin"),
    procurementYear: procurementYear ? Number(procurementYear) : undefined,
  };
}

export function hasAssetPayload(payload: AssetPayload) {
  return Object.values(payload).some((value) => value !== undefined);
}
