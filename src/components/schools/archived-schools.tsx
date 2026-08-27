import type { ArchivedSchoolsProps } from "@/types";
import { ArchiveRestore, Trash2 } from "lucide-react";

export function ArchivedSchools(props: ArchivedSchoolsProps) {
  if (props.schools.length === 0) return null;

  return (
    <section className="rounded-xl border border-[#dbe5f4] bg-[#f8fbff] p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-[#172033] sm:text-lg">
            Arsip Sekolah
          </h2>
          <p className="mt-0.5 text-xs text-[#748299] sm:text-sm">
            Data sekolah yang diarsipkan tersimpan di sini dan dapat dipulihkan kembali oleh owner.
          </p>
        </div>
        <span className="rounded-full border border-amber-200 bg-[#fef3c7] px-3 py-1 text-xs font-bold text-[#92400e]">
          {props.schools.length} diarsipkan
        </span>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {props.schools.map((school) => (
          <div
            key={school.id}
            className="flex flex-col justify-between gap-3 rounded-xl border border-[#dbe5f4] bg-white p-4 shadow-xs transition hover:border-[#b6cce8] sm:flex-row sm:items-center"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold text-[#172033]">{school.name}</p>
              <p className="mt-1 text-xs text-[#748299]">
                Diarsipkan pada {formatDate(school.archivedAt)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={props.isRestoring === school.id}
                onClick={() => props.onRestore(school)}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#bfdbfe] bg-[#eff6ff] px-3.5 text-xs font-semibold text-[#1d4ed8] transition hover:bg-[#dbeafe] disabled:opacity-50"
              >
                <ArchiveRestore size={14} aria-hidden="true" />
                <span>{props.isRestoring === school.id ? "Memulihkan..." : "Pulihkan"}</span>
              </button>

              {props.onDelete ? (
                <button
                  type="button"
                  onClick={() => props.onDelete!(school)}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 text-xs font-semibold text-red-600 transition hover:bg-red-50 hover:border-red-300"
                >
                  <Trash2 size={14} aria-hidden="true" />
                  <span>Hapus</span>
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function formatDate(value?: string | null) {
  return value ? new Date(value).toLocaleDateString("id-ID") : "-";
}
