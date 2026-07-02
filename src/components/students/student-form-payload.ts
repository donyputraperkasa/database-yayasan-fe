import type { StudentPayload } from "@/types";

export function buildStudentPayload(
  formData: FormData,
  isSchoolUser: boolean,
): StudentPayload {
  return {
    address: getOptional(formData, "address"),
    birthPlaceDate: getOptional(formData, "birthPlaceDate"),
    className: getOptional(formData, "className"),
    fatherJob: getOptional(formData, "fatherJob"),
    fatherName: getOptional(formData, "fatherName"),
    gender: getOptional(formData, "gender") as StudentPayload["gender"],
    motherJob: getOptional(formData, "motherJob"),
    motherName: getOptional(formData, "motherName"),
    name: String(formData.get("name") ?? "").trim(),
    photoUrl: getOptional(formData, "photoUrl"),
    religion: getOptional(formData, "religion"),
    schoolId: isSchoolUser ? undefined : getOptional(formData, "schoolId"),
    sppAmount: getOptionalNumber(formData, "sppAmount"),
  };
}

export function getStudentPhotoFile(formData: FormData) {
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
