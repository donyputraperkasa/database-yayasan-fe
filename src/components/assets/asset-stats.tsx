import type { Asset } from "@/types";

type AssetStatsProps = {
  assets: Asset[];
};

export function AssetStats({ assets }: AssetStatsProps) {
  const stats = [
    { label: "Total aset", value: assets.length },
    { label: "Ada foto", value: assets.filter((asset) => asset.photoUrl).length },
    { label: "Tanah terdata", value: assets.filter((asset) => asset.landArea).length },
    {
      label: "Bangunan terdata",
      value: assets.filter((asset) => asset.buildingArea).length,
    },
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
