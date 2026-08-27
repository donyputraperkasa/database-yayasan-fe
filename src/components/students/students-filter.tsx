import type { School, StudentFilters } from "@/types";
import { Search, X } from "lucide-react";
import { LevelFilterPills } from "@/components/ui/level-filter-pills";

type StudentsFilterProps = {
  filters: StudentFilters;
  isSchoolUser: boolean;
  onChange: (filters: StudentFilters) => void;
  onSubmit: () => void;
  schools: School[];
};

export function StudentsFilter({
  filters,
  onChange,
}: StudentsFilterProps) {
  return (
    <section className="flex flex-col gap-3 rounded-xl border border-[#dbe5f4] bg-white p-3.5 shadow-sm sm:p-4 md:flex-row md:items-center md:justify-between">
      {/* Search Input Box */}
      <div className="relative flex-1">
        <label className="flex h-11 items-center gap-2.5 rounded-lg border border-[#dbe5f4] bg-[#f8fbff] px-3.5 transition focus-within:border-[#1f4f8f] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#eaf2ff]">
          <Search size={17} className="shrink-0 text-[#1f4f8f]" aria-hidden="true" />
          <input
            value={filters.query ?? ""}
            onChange={(event) => onChange({ ...filters, query: event.target.value })}
            placeholder="Cari nama siswa, sekolah, orang tua, kelas..."
            className="h-full min-w-0 flex-1 bg-transparent text-sm text-[#172033] outline-none placeholder:text-[#94a3b8]"
          />
          {filters.query ? (
            <button
              type="button"
              onClick={() => onChange({ ...filters, query: "" })}
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
        activeLevel={filters.level}
        onSelectLevel={(level) => onChange({ ...filters, level })}
      />
    </section>
  );
}

