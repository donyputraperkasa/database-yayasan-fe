import { TableActions } from "@/components/ui/table-actions";
import { SchoolSummaryCard } from "@/components/ui/school-summary-card";
import type { Inventory, InventoryTableProps } from "@/types";
import { groupInventoryBySchool } from "./inventory-page-utils";

export function InventoryTable(props: InventoryTableProps) {
  const groups = groupInventoryBySchool(props.inventory);
  const entries = Object.entries(groups);
  const selectedGroup = entries.find(([name]) => name === props.selectedSchoolName);

  if (selectedGroup) {
    const [schoolName, inventory] = selectedGroup;

    return (
      <section className="rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm">
        <DetailHeader
          canBackToSchools={props.canBackToSchools ?? true}
          count={inventory.length}
          onBack={props.onBackToSchools}
          schoolName={schoolName}
        />
        <InventoryGroupTable {...props} inventory={inventory} />
      </section>
    );
  }

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      {entries.map(([schoolName, inventory]) => (
        <SchoolSummaryCard
          key={schoolName}
          countLabel={`${inventory.length} item`}
          description={`${inventory.length} inventaris tercatat.`}
          onClick={() => props.onSelectSchool(schoolName)}
          title={schoolName}
        />
      ))}
      {props.inventory.length === 0 ? (
        <p className="rounded-lg bg-white p-5 text-sm font-semibold text-[#748299] shadow-sm lg:col-span-2">
          Data Inventaris belum ditemukan.
        </p>
      ) : null}
    </section>
  );
}

function DetailHeader(props: {
  canBackToSchools: boolean;
  count: number;
  onBack: () => void;
  schoolName: string;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-lg font-semibold">{props.schoolName}</h2>
        <p className="mt-1 text-sm text-[#748299]">
          {props.count} inventaris tercatat.
        </p>
      </div>
      {props.canBackToSchools ? (
        <button
          type="button"
          onClick={props.onBack}
          className="h-10 rounded-md border border-[#dbe5f4] px-4 text-sm font-semibold text-[#0f2a4f]"
        >
          Kembali ke sekolah
        </button>
      ) : null}
    </div>
  );
}

function InventoryGroupTable(props: InventoryTableProps) {
  return (
    <div className="mt-5 overflow-x-auto">
      <table className="w-full min-w-[900px] text-left text-sm">
        <thead className="border-b border-[#dbe5f4] text-[#748299]">
          <tr>
            <th className="py-3 font-semibold">Nama Inventaris</th>
            <th className="py-3 font-semibold">Kondisi</th>
            <th className="py-3 font-semibold">Asal Perolehan</th>
            <th className="py-3 font-semibold">Tahun</th>
            <th className="py-3 font-semibold">Keterangan</th>
            <th className="py-3 text-center font-semibold">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#eef3fb]">
          {props.inventory.map((inventory) => (
            <tr key={inventory.id}>
              <td className="py-3 font-semibold text-[#172033]">{inventory.name}</td>
              <td className="py-3 text-[#526078]">
                <ConditionBadge condition={inventory.condition} />
              </td>
              <td className="py-3 text-[#526078]">{inventory.origin ?? "-"}</td>
              <td className="py-3 text-[#526078]">{inventory.procurementYear ?? "-"}</td>
              <td className="max-w-64 py-3 pr-4 text-[#526078]">
                <p className="line-clamp-2" title={inventory.description ?? ""}>
                  {inventory.description || "-"}
                </p>
              </td>
              <td className="py-3 text-center">
                <TableActions
                  canManage={props.canManage}
                  onDelete={() => props.onDelete(inventory)}
                  onDetail={() => props.onDetail(inventory)}
                  onEdit={() => props.onEdit(inventory)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ConditionBadge({ condition }: { condition?: string | null }) {
  if (!condition) return <span className="text-[#748299]">-</span>;

  const tone =
    condition === "Baik"
      ? "bg-emerald-50 text-emerald-700"
      : condition === "Rusak Ringan"
        ? "bg-amber-50 text-amber-700"
        : "bg-red-50 text-red-700";

  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${tone}`}>
      {condition}
    </span>
  );
}
