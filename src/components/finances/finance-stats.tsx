import type { Finance } from "@/types";
import { formatRupiah } from "./finance-labels";

type FinanceStatsProps = {
  finances: Finance[];
  showNominal?: boolean;
};

export function FinanceStats({ finances, showNominal = false }: FinanceStatsProps) {
  const totalAmount = finances.reduce((sum, item) => sum + (item.amount ?? 0), 0);
  const totalBalance = finances.reduce((sum, item) => sum + (item.balance ?? 0), 0);
  const schools = new Set(finances.map((item) => item.school.id));
  const financeTypes = new Set(finances.map((item) => item.type));
  const stats = showNominal
    ? [
        { label: "Data keuangan", value: finances.length },
        { label: "Total nominal", value: formatRupiah(totalAmount) },
        { label: "Total saldo", value: formatRupiah(totalBalance) },
        { label: "Rekening", value: finances.filter((item) => item.accountNo).length },
      ]
    : [
        { label: "Data keuangan", value: finances.length },
        { label: "Sekolah terisi", value: schools.size },
        { label: "Rekening", value: finances.filter((item) => item.accountNo).length },
        { label: "Jenis data", value: financeTypes.size },
      ];

  return (
    <section className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {stats.map((stat) => (
        <article
          key={stat.label}
          className="rounded-lg border border-[#dbe5f4] bg-white p-4 shadow-sm"
        >
          <p className="text-sm font-semibold text-[#748299]">{stat.label}</p>
          <p className="mt-3 text-xl font-semibold">{stat.value}</p>
        </article>
      ))}
    </section>
  );
}
