import type { Facility } from "@/types";

type FacilityStatsProps = {
  facilities: Facility[];
};

export function FacilityStats({ facilities }: FacilityStatsProps) {
  const totalQuantity = facilities.reduce((sum, item) => sum + item.quantity, 0);
  const stats = [
    { label: "Jenis fasilitas", value: facilities.length },
    { label: "Total unit", value: totalQuantity },
    { label: "Kondisi baik", value: countBy(facilities, "baik") },
    { label: "Perlu perhatian", value: countDamaged(facilities) },
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

function countBy(facilities: Facility[], condition: Facility["condition"]) {
  return facilities.filter((facility) => facility.condition === condition).length;
}

function countDamaged(facilities: Facility[]) {
  return facilities.filter((facility) => facility.condition !== "baik").length;
}
