import type { Inventory, InventoryFilters } from "@/types";

export function cleanInventoryFilters(filters: InventoryFilters) {
  return {
    schoolId: filters.schoolId || undefined,
  };
}

export function filterInventory(
  inventory: Inventory[],
  query?: string,
  level?: string,
  schoolId?: string,
) {
  const keyword = query?.toLowerCase().trim();
  const selectedLevel = level && level !== "all" ? level : null;

  return inventory.filter((item) => {
    const matchesKeyword =
      !keyword ||
      [
        item.condition ?? "",
        item.description ?? "",
        item.name,
        item.origin ?? "",
        item.school.name,
        item.procurementYear?.toString() ?? "",
      ].some((value) => value.toLowerCase().includes(keyword));

    const matchesLevel = !selectedLevel || item.school.level === selectedLevel;
    const matchesSchool = !schoolId || item.schoolId === schoolId;

    return matchesKeyword && matchesLevel && matchesSchool;
  });
}

export function groupInventoryBySchool(inventory: Inventory[]) {
  return inventory.reduce<Record<string, Inventory[]>>((groups, inventory) => {
    const schoolName = inventory.school.name;
    groups[schoolName] = [...(groups[schoolName] ?? []), inventory];
    return groups;
  }, {});
}

export function upsertInventory(
  inventory: Inventory[],
  savedInventory: Inventory,
) {
  const exists = inventory.some((inventory) => inventory.id === savedInventory.id);

  if (!exists) return [savedInventory, ...inventory];

  return inventory.map((inventory) =>
    inventory.id === savedInventory.id ? savedInventory : inventory,
  );
}

export function getInventoryErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Data inventaris gagal diproses.";
}
