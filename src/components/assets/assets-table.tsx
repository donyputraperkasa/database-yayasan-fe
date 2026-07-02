import { TableActions } from "@/components/ui/table-actions";
import type { Asset } from "@/types";
import { groupAssetsBySchool } from "./asset-page-utils";

type AssetsTableProps = {
  assets: Asset[];
  canManage: boolean;
  onDelete: (asset: Asset) => void;
  onDetail: (asset: Asset) => void;
  onEdit: (asset: Asset) => void;
};

export function AssetsTable(props: AssetsTableProps) {
  const groups = groupAssetsBySchool(props.assets);
  const entries = Object.entries(groups);

  return (
    <section className="space-y-4">
      {entries.map(([schoolName, assets]) => (
        <article
          key={schoolName}
          className="rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">{schoolName}</h2>
              <p className="mt-1 text-sm text-[#748299]">
                {assets.length} aset sekolah tercatat.
              </p>
            </div>
            <span className="rounded-full bg-[#f2d35f] px-3 py-1 text-sm font-semibold">
              {assets.length} aset
            </span>
          </div>
          <AssetGroupTable {...props} assets={assets} />
        </article>
      ))}
      {props.assets.length === 0 ? (
        <p className="rounded-lg bg-white p-5 text-sm font-semibold text-[#748299] shadow-sm">
          Data aset belum ditemukan.
        </p>
      ) : null}
    </section>
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
