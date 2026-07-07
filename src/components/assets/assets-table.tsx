import { TableActions } from "@/components/ui/table-actions";
import { SchoolSummaryCard } from "@/components/ui/school-summary-card";
import type { Asset } from "@/types";
import { groupAssetsBySchool } from "./asset-page-utils";

type AssetsTableProps = {
  assets: Asset[];
  canManage: boolean;
  onBackToSchools: () => void;
  onDelete: (asset: Asset) => void;
  onDetail: (asset: Asset) => void;
  onEdit: (asset: Asset) => void;
  onSelectSchool: (schoolName: string) => void;
  selectedSchoolName?: string | null;
};

export function AssetsTable(props: AssetsTableProps) {
  const groups = groupAssetsBySchool(props.assets);
  const entries = Object.entries(groups);
  const selectedGroup = entries.find(([name]) => name === props.selectedSchoolName);

  if (selectedGroup) {
    const [schoolName, assets] = selectedGroup;

    return (
      <section className="rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm">
        <DetailHeader count={assets.length} onBack={props.onBackToSchools} schoolName={schoolName} />
        <AssetGroupTable {...props} assets={assets} />
      </section>
    );
  }

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      {entries.map(([schoolName, assets]) => (
        <SchoolSummaryCard
          key={schoolName}
          countLabel={`${assets.length} aset`}
          description="Aset sekolah yang sudah tercatat."
          onClick={() => props.onSelectSchool(schoolName)}
          title={schoolName}
        />
      ))}
      {props.assets.length === 0 ? (
        <p className="rounded-lg bg-white p-5 text-sm font-semibold text-[#748299] shadow-sm lg:col-span-2">
          Data aset belum ditemukan.
        </p>
      ) : null}
    </section>
  );
}

function DetailHeader(props: {
  count: number;
  onBack: () => void;
  schoolName: string;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-lg font-semibold">{props.schoolName}</h2>
        <p className="mt-1 text-sm text-[#748299]">
          {props.count} aset sekolah tercatat.
        </p>
      </div>
      <button
        type="button"
        onClick={props.onBack}
        className="h-10 rounded-md border border-[#dbe5f4] px-4 text-sm font-semibold text-[#0f2a4f]"
      >
        Kembali ke sekolah
      </button>
    </div>
  );
}

function AssetGroupTable(props: AssetsTableProps) {
  return (
    <div className="mt-5 overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="border-b border-[#dbe5f4] text-[#748299]">
          <tr>
            <th className="py-3 font-semibold">Luas tanah</th>
            <th className="py-3 font-semibold">Luas bangunan</th>
            <th className="py-3 font-semibold">Pemilik</th>
            <th className="py-3 font-semibold">Asal</th>
            <th className="py-3 font-semibold">Tahun</th>
            <th className="py-3 text-center font-semibold">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#eef3fb]">
          {props.assets.map((asset) => (
            <tr key={asset.id}>
              <td className="py-3 text-[#526078]">{asset.landArea ?? "-"}</td>
              <td className="py-3 text-[#526078]">{asset.buildingArea ?? "-"}</td>
              <td className="py-3 text-[#526078]">
                {asset.certificateOwner ?? "-"}
              </td>
              <td className="py-3 text-[#526078]">{asset.origin ?? "-"}</td>
              <td className="py-3 text-[#526078]">{asset.procurementYear ?? "-"}</td>
              <td className="py-3 text-center">
                <TableActions
                  canManage={props.canManage}
                  onDelete={() => props.onDelete(asset)}
                  onDetail={() => props.onDetail(asset)}
                  onEdit={() => props.onEdit(asset)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
