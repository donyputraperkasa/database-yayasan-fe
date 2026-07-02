import type { FacilityCondition, FacilityPayload } from "@/types";

export function buildFacilityPayload(
  formData: FormData,
  isSchoolUser: boolean,
): FacilityPayload {
  return {
    condition: String(formData.get("condition") ?? "baik") as FacilityCondition,
    name: String(formData.get("name") ?? "").trim(),
    quantity: Number(formData.get("quantity") ?? 0),
    schoolId: isSchoolUser
      ? undefined
      : String(formData.get("schoolId") ?? "").trim(),
  };
}
