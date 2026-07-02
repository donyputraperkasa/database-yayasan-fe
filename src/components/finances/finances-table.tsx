import { TableActions } from "@/components/ui/table-actions";
import type { Finance } from "@/types";
import { financeTypeLabel, formatRupiah } from "./finance-labels";
import { groupFinancesBySchool } from "./finance-page-utils";

type FinancesTableProps = {
  canManage: boolean;
  finances: Finance[];
  onDelete: (finance: Finance) => void;
  onDetail: (finance: Finance) => void;
  onEdit: (finance: Finance) => void;
};

export function FinancesTable(props: FinancesTableProps) {
  const entries = Object.entries(groupFinancesBySchool(props.finances));

  return (
    <section className="space-y-4">
      {entries.map(([schoolName, finances]) => (
        <article key={schoolName} className="rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm">
          <div>
            <div>
              <h2 className="text-lg font-semibold">{schoolName}</h2>
              <p className="mt-1 text-sm text-[#748299]">
                {finances.length} catatan keuangan tercatat.
              </p>
            </div>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead className="border-b border-[#dbe5f4] text-[#748299]">
                <tr>
                  <th className="py-3 font-semibold">Jenis</th>
                  <th className="py-3 font-semibold">Kelas</th>
                  <th className="py-3 font-semibold">Nominal</th>
                  <th className="py-3 font-semibold">Saldo</th>
                  <th className="py-3 font-semibold">Tanggal</th>
                  <th className="py-3 text-center font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eef3fb]">
                {finances.map((finance) => (
                  <tr key={finance.id}>
                    <td className="py-3 font-semibold text-[#172033]">
                      {financeTypeLabel[finance.type]}
                    </td>
                    <td className="py-3 text-[#526078]">{finance.className ?? "-"}</td>
                    <td className="py-3 text-[#526078]">{formatRupiah(finance.amount)}</td>
                    <td className="py-3 text-[#526078]">{formatRupiah(finance.balance)}</td>
                    <td className="py-3 text-[#526078]">{formatDate(finance.date)}</td>
                    <td className="py-3 text-center">
                      <TableActions
                        canManage={props.canManage}
                        onDelete={() => props.onDelete(finance)}
                        onDetail={() => props.onDetail(finance)}
                        onEdit={() => props.onEdit(finance)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      ))}
      {props.finances.length === 0 ? (
        <p className="rounded-lg bg-white p-5 text-sm font-semibold text-[#748299] shadow-sm">
          Data keuangan belum ditemukan.
        </p>
      ) : null}
    </section>
  );
}

function formatDate(value?: string | null) {
  return value ? new Date(value).toLocaleDateString("id-ID") : "-";
}
