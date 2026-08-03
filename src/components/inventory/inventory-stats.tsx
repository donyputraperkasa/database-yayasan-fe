import type { Inventory } from "@/types";

type InventoryStatsProps = {
  inventory: Inventory[];
};

export function InventoryStats({ inventory }: InventoryStatsProps) {
  const stats = [
    { label: "Total unit", value: sumBy(inventory, "quantity") },
    { label: "Kondisi baik", value: sumBy(inventory, "goodQuantity") },
    { label: "Rusak ringan", value: sumBy(inventory, "minorDamageQuantity") },
    { label: "Rusak berat", value: sumBy(inventory, "majorDamageQuantity") },
  ];

  return (
    <section className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {stats.map((stat) => (
        <article
          key={stat.label}
          className="rounded-lg border border-[#dbe5f4] bg-white p-4 shadow-sm"
        >
          <p className="text-sm font-semibold text-[#748299]">{stat.label}</p>
          <p className="mt-3 text-2xl font-semibold">{stat.value}</p>
        </article>
      ))}
    </section>
  );
}

function sumBy(
  inventory: Inventory[],
  key: "quantity" | "goodQuantity" | "minorDamageQuantity" | "majorDamageQuantity",
) {
  return inventory.reduce((sum, inventory) => sum + inventory[key], 0);
}
