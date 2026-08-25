import { School } from "lucide-react";

export function SchoolsHeader() {
  return (
    <section className="flex flex-col gap-4 rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#eaf2ff] text-[#1f4f8f]">
          <School size={22} aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-lg font-semibold">Data Sekolah</h2>
          <p className="mt-1 text-sm text-[#748299]">
            Tambahkan dan kelola unit sekolah di lingkungan Yayasan BOPKRI.
          </p>
        </div>
      </div>
    </section>
  );
}
