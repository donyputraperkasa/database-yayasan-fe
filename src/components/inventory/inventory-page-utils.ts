import type { Inventory, InventoryFilters } from "@/types";

export function cleanInventoryFilters(filters: InventoryFilters) {
  return {
    condition: filters.condition || undefined,
    schoolId: filters.schoolId || undefined,
  };
}

export function filterInventory(inventory: Inventory[], query?: string) {
  const keyword = query?.toLowerCase().trim();

  if (!keyword) return inventory;

  return inventory.filter((inventory) =>
    [
      inventory.description ?? "",
      inventory.name,
      inventory.school.name,
      inventory.quantity.toString(),
    ]
      .some((value) => value.toLowerCase().includes(keyword)),
  );
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
