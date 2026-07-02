import type { AssetFilters, School } from "@/types";
import { Search } from "lucide-react";

type AssetsFilterProps = {
  filters: AssetFilters;
  isSchoolUser: boolean;
  onChange: (filters: AssetFilters) => void;
  onSubmit: () => void;
  schools: School[];
};

export function AssetsFilter(props: AssetsFilterProps) {
  return (
    <section className="rounded-lg border border-[#dbe5f4] bg-white p-4 shadow-sm">
      <div className="grid gap-3 lg:grid-cols-[1fr_280px_auto]">
        <input
          value={props.filters.query ?? ""}
          onChange={(event) =>
            props.onChange({ ...props.filters, query: event.target.value })
          }
          placeholder="Cari pemilik, asal aset, sekolah..."
          className="h-11 rounded-md border border-[#dbe5f4] px-3 text-sm outline-none focus:border-[#1f4f8f]"
        />
        {!props.isSchoolUser ? (
          <select
            value={props.filters.schoolId ?? ""}
            onChange={(event) =>
              props.onChange({ ...props.filters, schoolId: event.target.value })
            }
            className="h-11 rounded-md border border-[#dbe5f4] px-3 text-sm outline-none"
          >
            <option value="">Semua sekolah</option>
            {props.schools.map((school) => (
              <option key={school.id} value={school.id}>
                {school.name}
              </option>
            ))}
          </select>
        ) : null}
        <button
          type="button"
          onClick={props.onSubmit}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#0f2a4f] px-5 text-sm font-semibold text-white"
        >
          <Search size={17} aria-hidden="true" />
          Terapkan
        </button>
      </div>
    </section>
  );
}
