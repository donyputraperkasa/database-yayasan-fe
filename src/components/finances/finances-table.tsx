import { TableActions } from "@/components/ui/table-actions";
import { SchoolSummaryCard } from "@/components/ui/school-summary-card";
import type { Finance } from "@/types";
import { financeTypeLabel, formatRupiah } from "./finance-labels";
import { groupFinancesBySchool } from "./finance-page-utils";

type FinancesTableProps = {
  canManage: boolean;
  finances: Finance[];
  onBackToSchools: () => void;
  onDelete: (finance: Finance) => void;
  onDetail: (finance: Finance) => void;
  onEdit: (finance: Finance) => void;
  onSelectSchool: (schoolName: string) => void;
  selectedSchoolName?: string | null;
};

export function FinancesTable(props: FinancesTableProps) {
  const entries = Object.entries(groupFinancesBySchool(props.finances));
  const selectedGroup = entries.find(
    ([name]) => name === props.selectedSchoolName,
  );

  if (selectedGroup) {
    const [schoolName, finances] = selectedGroup;

    return (
      <section className="rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm">
        <DetailHeader
          count={finances.length}
          onBack={props.onBackToSchools}
          schoolName={schoolName}
        />
        <FinanceGroupTable {...props} finances={finances} />
      </section>
    );
  }

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      {entries.map(([schoolName, finances]) => (
        <SchoolSummaryCard
          key={schoolName}
          countLabel={`${finances.length} data`}
          description="Catatan keuangan per sekolah."
          onClick={() => props.onSelectSchool(schoolName)}
          title={schoolName}
        />
      ))}
      {props.finances.length === 0 ? (
        <p className="rounded-lg bg-white p-5 text-sm font-semibold text-[#748299] shadow-sm lg:col-span-2">
          Data keuangan belum ditemukan.
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
          {props.count} catatan keuangan tercatat.
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

function FinanceGroupTable(props: FinancesTableProps) {
  return (
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
          {props.finances.map((finance) => (
            <tr key={finance.id}>
              <td className="py-3 font-semibold text-[#172033]">
                {financeTypeLabel[finance.type]}
              </td>
              <td className="py-3 text-[#526078]">{finance.className ?? "-"}</td>
              <td className="py-3 text-[#526078]">
                {formatRupiah(finance.amount)}
              </td>
              <td className="py-3 text-[#526078]">
                {formatRupiah(finance.balance)}
              </td>
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
  );
}

function formatDate(value?: string | null) {
  return value ? new Date(value).toLocaleDateString("id-ID") : "-";
}
