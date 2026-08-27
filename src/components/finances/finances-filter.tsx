import { LevelFilterPills } from "@/components/ui/level-filter-pills";
import type { FinanceFilters, School } from "@/types";
import { Search, X } from "lucide-react";
import { financeTypeLabel } from "./finance-labels";

type FinancesFilterProps = {
  filters: FinanceFilters;
  isSchoolUser: boolean;
  onChange: (filters: FinanceFilters) => void;
  onSubmit: () => void;
  schools: School[];
};

export function FinancesFilter(props: FinancesFilterProps) {
  return (
    <section className="flex flex-col gap-3 rounded-xl border border-[#dbe5f4] bg-white p-3.5 shadow-sm sm:p-4 md:flex-row md:items-center md:justify-between">
      {/* Search Input Box */}
      <div className="relative flex-1">
        <label className="flex h-11 items-center gap-2.5 rounded-lg border border-[#dbe5f4] bg-[#f8fbff] px-3.5 transition focus-within:border-[#1f4f8f] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#eaf2ff]">
          <Search size={17} className="shrink-0 text-[#1f4f8f]" aria-hidden="true" />
          <input
            value={props.filters.query ?? ""}
            onChange={(event) =>
              props.onChange({ ...props.filters, query: event.target.value })
            }
            placeholder="Cari sekolah, kelas, rekening, catatan..."
            className="h-full min-w-0 flex-1 bg-transparent text-sm text-[#172033] outline-none placeholder:text-[#94a3b8]"
          />
          {props.filters.query ? (
            <button
              type="button"
              onClick={() => props.onChange({ ...props.filters, query: "" })}
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#cbd5e1] text-white transition hover:bg-[#94a3b8]"
              title="Hapus pencarian"
            >
              <X size={12} />
            </button>
          ) : null}
        </label>
      </div>

      {/* Level Filters Pills */}
      <LevelFilterPills
        activeLevel={props.filters.level}
        onSelectLevel={(level) => props.onChange({ ...props.filters, level })}
      />
    </section>
  );
}

