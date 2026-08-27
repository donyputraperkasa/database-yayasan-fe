import type { SchoolsTableProps } from "@/types";
import { schoolLevelLabel } from "./school-level-label";

export function SchoolsTable({
  onDelete,
  onToggleEditAccess,
  schools,
}: SchoolsTableProps) {
  return (
    <section className="rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Daftar Sekolah</h2>
          <p className="mt-1 text-sm text-[#748299]">
            Unit sekolah yang sudah terdaftar.
          </p>
        </div>
        <span className="rounded-lg bg-[#f2d35f] px-3 py-1 text-sm font-semibold">
          {schools.length} sekolah
        </span>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[920px] text-left text-sm">
          <thead className="border-b border-[#dbe5f4] text-[#748299]">
            <tr>
              <th className="py-3 font-semibold">Nama</th>
              <th className="py-3 font-semibold">Jenjang</th>
              <th className="py-3 font-semibold">Email</th>
              <th className="py-3 font-semibold">Telepon</th>
              <th className="py-3 font-semibold">Akses edit</th>
              <th className="py-3 text-center font-semibold">Aksi</th>
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
                <td className="py-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      school.canEdit
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {school.canEdit ? "Dibuka" : "Dikunci"}
                  </span>
                </td>
                <td className="py-3">
                  <div className="flex justify-center gap-2 m-2">
                    <button
                      type="button"
                      onClick={() => onToggleEditAccess(school)}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                        school.canEdit
                          ? "border-[#cbd5e1] bg-white text-[#475569] hover:bg-[#f8fafc] hover:border-[#94a3b8] hover:text-[#1e293b]"
                          : "border-[#bfdbfe] bg-[#eff6ff] text-[#1d4ed8] hover:bg-[#dbeafe]"
                      }`}
                    >
                      {school.canEdit ? "Kunci edit" : "Buka edit"}
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(school)}
                      className="rounded-lg border border-[#dbe5f4] bg-white px-3 py-1.5 text-xs font-semibold text-[#64748b] transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                    >
                      Arsipkan
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
