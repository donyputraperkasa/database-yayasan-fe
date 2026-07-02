import type { DashboardProgress } from "@/types";

type DashboardProgressCardProps = {
  items: DashboardProgress[];
};

export function DashboardProgressCard({ items }: DashboardProgressCardProps) {
  return (
    <div className="rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Kelengkapan Data</h2>
          <p className="mt-1 text-sm text-[#748299]">
            Ringkasan progres input dari sekolah.
          </p>
        </div>
        <button className="text-sm font-semibold text-[#0f2a4f]">Detail</button>
      </div>

      <div className="mt-6 space-y-5">
        {items.map((item) => (
          <div key={item.title}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-semibold text-[#334155]">
                {item.title}
              </span>
              <span className="text-[#748299]">{item.progress}%</span>
            </div>
            <div className="h-2.5 rounded-sm bg-[#e8edf6]">
              <div
                className="h-2.5 rounded-sm bg-[#0f2a4f]"
                style={{ width: `${item.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
