import type { School, StudentFilters } from "@/types";
import { Search } from "lucide-react";
import type { FormEvent } from "react";

type StudentsFilterProps = {
  filters: StudentFilters;
  isSchoolUser: boolean;
  onChange: (filters: StudentFilters) => void;
  onSubmit: () => void;
  schools: School[];
};

export function StudentsFilter({
  filters,
  isSchoolUser,
  onChange,
  onSubmit,
  schools,
}: StudentsFilterProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-3 rounded-lg border border-[#dbe5f4] bg-white p-4 shadow-sm xl:grid-cols-[1.2fr_0.8fr_1fr_auto]"
    >
      <input
        value={filters.query ?? ""}
        onChange={(event) => onChange({ ...filters, query: event.target.value })}
        placeholder="Cari nama siswa, sekolah, orang tua..."
        className="h-11 rounded-md border border-[#dbe5f4] bg-[#f8fbff] px-3 text-sm outline-none"
      />
      <input
        value={filters.className ?? ""}
        onChange={(event) => onChange({ ...filters, className: event.target.value })}
        placeholder="Filter kelas, contoh: 6A"
        className="h-11 rounded-md border border-[#dbe5f4] bg-[#f8fbff] px-3 text-sm outline-none"
      />
      <select
        disabled={isSchoolUser}
        value={filters.schoolId ?? ""}
        onChange={(event) => onChange({ ...filters, schoolId: event.target.value })}
        className="h-11 rounded-md border border-[#dbe5f4] bg-[#f8fbff] px-3 text-sm outline-none disabled:bg-[#eef3fb]"
      >
        <option value="">Semua sekolah</option>
        {schools.map((school) => (
          <option key={school.id} value={school.id}>
            {school.name}
          </option>
        ))}
      </select>
      <button className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#0f2a4f] px-5 text-sm font-semibold text-white">
        <Search size={16} aria-hidden="true" />
        Terapkan
      </button>
    </form>
  );
}
