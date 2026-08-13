import type { Inventory } from "@/types";

type InventoryStatsProps = {
  inventory: Inventory[];
};

export function InventoryStats({ inventory }: InventoryStatsProps) {
  const baik = inventory.filter((i) => i.condition === "Baik").length;
  const rusakRingan = inventory.filter((i) => i.condition === "Rusak Ringan").length;
  const rusakBerat = inventory.filter((i) => i.condition === "Rusak Berat").length;

  const stats = [
    { label: "Total inventaris", value: inventory.length },
    { label: "Kondisi Baik", value: baik },
    { label: "Rusak Ringan", value: rusakRingan },
    { label: "Rusak Berat", value: rusakBerat },
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
