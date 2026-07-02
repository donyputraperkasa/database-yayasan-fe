import type { School } from "@/types";
import { schoolLevelLabel } from "./school-level-label";

type SchoolsTableProps = {
  onDelete: (school: School) => void;
  schools: School[];
};

export function SchoolsTable({ onDelete, schools }: SchoolsTableProps) {
  return (
    <section className="rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Daftar Sekolah</h2>
          <p className="mt-1 text-sm text-[#748299]">
            Unit sekolah yang sudah terdaftar.
          </p>
        </div>
        <span className="rounded-full bg-[#f2d35f] px-3 py-1 text-sm font-semibold">
          {schools.length} sekolah
        </span>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-[#dbe5f4] text-[#748299]">
            <tr>
              <th className="py-3 font-semibold">Nama</th>
              <th className="py-3 font-semibold">Jenjang</th>
              <th className="py-3 font-semibold">Email</th>
              <th className="py-3 font-semibold">Telepon</th>
              <th className="py-3 font-semibold">Kepala Sekolah</th>
              <th className="py-3 font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eef3fb]">
            {schools.map((school) => (
              <tr key={school.id}>
                <td className="py-3 font-semibold text-[#172033]">
                  {school.name}
                </td>
                <td className="py-3">
                  <span className="rounded-full bg-[#eaf2ff] px-3 py-1 text-xs font-semibold text-[#1f4f8f]">
                    {schoolLevelLabel[school.level]}
                  </span>
                </td>
                <td className="py-3 text-[#526078]">{school.email ?? "-"}</td>
                <td className="py-3 text-[#526078]">{school.phone ?? "-"}</td>
                <td className="py-3 text-[#526078]">
                  {school.principal ?? "-"}
                </td>
                <td className="py-3">
                  <button
                    type="button"
                    onClick={() => onDelete(school)}
                    className="rounded-md border border-red-100 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-50"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
