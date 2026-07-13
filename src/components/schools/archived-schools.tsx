import type { School } from "@/types";
import { ArchiveRestore } from "lucide-react";

type ArchivedSchoolsProps = {
  isRestoring: string | null;
  onRestore: (school: School) => void;
  schools: School[];
};

export function ArchivedSchools(props: ArchivedSchoolsProps) {
  if (props.schools.length === 0) return null;

  return (
    <section className="rounded-lg border border-[#eadfb8] bg-[#fffdf5] p-5 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold">Arsip Sekolah</h2>
        <p className="mt-1 text-sm text-[#748299]">
          Data tetap tersimpan dan dapat dipulihkan oleh owner.
        </p>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {props.schools.map((school) => (
          <div
            key={school.id}
            className="flex items-center justify-between gap-4 rounded-lg border border-[#eadfb8] bg-white p-4"
          >
            <div className="min-w-0">
              <p className="truncate font-semibold">{school.name}</p>
              <p className="mt-1 text-xs text-[#748299]">
                Diarsipkan {formatDate(school.archivedAt)}
              </p>
            </div>
            <button
              type="button"
              disabled={props.isRestoring === school.id}
              onClick={() => props.onRestore(school)}
              className="inline-flex h-10 items-center gap-2 rounded-md border border-[#b7c9e3] px-3 text-sm font-semibold text-[#1f4f8f] disabled:opacity-50"
            >
              <ArchiveRestore size={16} aria-hidden="true" />
              {props.isRestoring === school.id ? "Memulihkan..." : "Pulihkan"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function formatDate(value?: string | null) {
  return value ? new Date(value).toLocaleDateString("id-ID") : "-";
}
