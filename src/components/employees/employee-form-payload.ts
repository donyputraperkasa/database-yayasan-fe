import type { EmployeePayload, EmployeeStatus, EmployeeType, Gender } from "@/types";

export function buildEmployeePayload(
  formData: FormData,
  isSchoolUser: boolean,
): EmployeePayload {
  const birthPlaceDate = getOptional(formData, "birthPlaceDate");

  return {
    address: getOptional(formData, "address"),
    birthDate: parseBirthDate(birthPlaceDate),
    birthPlaceDate,
    decreeNumber: getOptional(formData, "decreeNumber"),
    email: getOptional(formData, "email"),
    fee: getOptional(formData, "fee"),
    gender: getOptional(formData, "gender") as Gender,
    joinDate: getOptional(formData, "joinDate"),
    lastEducation: getOptional(formData, "lastEducation"),
    name: String(formData.get("name") ?? "").trim(),
    otherPosition: getOptional(formData, "otherPosition"),
    phone: getOptional(formData, "phone"),
    position: getOptional(formData, "position"),
    religion: getOptional(formData, "religion"),
    schoolId: isSchoolUser ? undefined : getOptional(formData, "schoolId"),
    status: getOptional(formData, "status") as EmployeeStatus,
    type: String(formData.get("type") ?? "guru") as EmployeeType,
  };
}

export function getEmployeePhotoFile(formData: FormData) {
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

function parseBirthDate(value?: string) {
  if (!value) return undefined;

  const months: Record<string, string> = {
    agustus: "08",
    april: "04",
    desember: "12",
    februari: "02",
    januari: "01",
    juli: "07",
    juni: "06",
    maret: "03",
    mei: "05",
    november: "11",
    oktober: "10",
    september: "09",
  };
  const match = value.toLowerCase().match(/(\d{1,2})\s+([a-z]+)\s+(\d{4})/);
  if (!match) return undefined;

  const [, day, monthName, year] = match;
  const month = months[monthName];
  return month ? `${year}-${month}-${day.padStart(2, "0")}` : undefined;
}
