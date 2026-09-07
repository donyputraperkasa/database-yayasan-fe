import { LevelFilterPills } from "@/components/ui/level-filter-pills";
import type { SchoolsSearchBoxProps } from "@/types";
import { Search, X } from "lucide-react";

export function SchoolsSearchBox(props: SchoolsSearchBoxProps) {
  return (
    <section className="flex flex-col gap-4 rounded-[18px] border border-[#e2e8f0] bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)] sm:p-5 md:flex-row md:items-center md:justify-between">
      <div className="relative flex-1">
        <label className="flex h-11 items-center gap-3 rounded-[12px] border-[1.5px] border-[#dbeafe] bg-[#f8fafc] px-3.5 transition focus-within:border-[#1d4ed8] focus-within:bg-white focus-within:ring-3 focus-within:ring-[#1d4ed8]/15">
          <Search size={19} className="shrink-0 text-[#1d4ed8]" aria-hidden="true" />
          <input
            value={props.query}
            onChange={(event) => props.setQuery(event.target.value)}
            placeholder="Cari nama sekolah, kepala sekolah, email, alamat, atau nomor telepon..."
            className="h-full min-w-0 flex-1 bg-transparent text-sm text-[#1e293b] outline-none placeholder:text-[#94a3b8]"
          />
          {props.query ? (
            <button
              type="button"
              onClick={props.onClear}
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e2e8f0] text-[#64748b] transition hover:bg-[#cbd5e1] hover:text-[#1e293b]"
              title="Hapus pencarian"
            >
              <X size={13} />
            </button>
          ) : null}
        </label>
      </div>
      <LevelFilterPills
        activeLevel={props.level}
        onSelectLevel={props.setLevel}
      />
    </section>
  );
}
