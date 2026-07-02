import type { Facility, FacilityFilters } from "@/types";

export function cleanFacilityFilters(filters: FacilityFilters) {
  return {
    condition: filters.condition || undefined,
    schoolId: filters.schoolId || undefined,
  };
}

export function filterFacilities(facilities: Facility[], query?: string) {
  const keyword = query?.toLowerCase().trim();

  if (!keyword) return facilities;

  return facilities.filter((facility) =>
    [facility.name, facility.school.name, facility.quantity.toString()]
      .some((value) => value.toLowerCase().includes(keyword)),
  );
}

export function groupFacilitiesBySchool(facilities: Facility[]) {
  return facilities.reduce<Record<string, Facility[]>>((groups, facility) => {
    const schoolName = facility.school.name;
    groups[schoolName] = [...(groups[schoolName] ?? []), facility];
    return groups;
  }, {});
}

export function upsertFacility(
  facilities: Facility[],
  savedFacility: Facility,
) {
  const exists = facilities.some((facility) => facility.id === savedFacility.id);

  if (!exists) return [savedFacility, ...facilities];

  return facilities.map((facility) =>
    facility.id === savedFacility.id ? savedFacility : facility,
  );
}

export function getFacilityErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Data fasilitas gagal diproses.";
}
