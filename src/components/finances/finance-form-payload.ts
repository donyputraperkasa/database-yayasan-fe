import type { FinancePayload, FinanceType } from "@/types";

export function buildFinancePayload(
  formData: FormData,
  isSchoolUser: boolean,
): FinancePayload {
  return {
    accountNo: getOptional(formData, "accountNo"),
    amount: getOptionalNumber(formData, "amount"),
    balance: getOptionalNumber(formData, "balance"),
    className: getOptional(formData, "className"),
    date: getOptional(formData, "date"),
    note: getOptional(formData, "note"),
    schoolId: isSchoolUser ? undefined : getOptional(formData, "schoolId"),
    type: String(formData.get("type") ?? "spp") as FinanceType,
  };
}

function getOptional(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  return value || undefined;
}

function getOptionalNumber(formData: FormData, key: string) {
  const value = getOptional(formData, key);
  return value ? Number(value) : undefined;
}
