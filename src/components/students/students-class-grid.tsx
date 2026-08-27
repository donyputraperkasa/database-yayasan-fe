import type { Student } from "@/types";
import { ArrowRight } from "lucide-react";
import { groupStudentsByClass } from "./student-page-utils";

export function ClassGrid(props: {
  onSelect: (className: string) => void;
  students: Student[];
}) {
  const classEntries = Object.entries(groupStudentsByClass(props.students)).sort(
    ([firstClass], [secondClass]) =>
      firstClass.localeCompare(secondClass, "id", { numeric: true }),
  );

  return (
    <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {classEntries.map(([className, students]) => (
        <button
          key={className}
          type="button"
          onClick={() => props.onSelect(className)}
          className="group rounded-lg border border-[#dbe5f4] bg-[#f8fbff] p-4 text-left transition hover:-translate-y-0.5 hover:border-[#b6cce8] hover:bg-white hover:shadow-md"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#748299]">Kelas</p>
              <h3 className="mt-1 text-xl font-semibold text-[#172033]">
                {className}
              </h3>
            </div>
            <span className="rounded-full bg-[#f2d35f] px-3 py-1 text-sm font-semibold text-[#172033]">
              {students.length} siswa
            </span>
          </div>
          <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#1f4f8f]">
            Lihat daftar siswa
            <ArrowRight size={17} aria-hidden="true" className="transition group-hover:translate-x-1" />
          </div>
        </button>
      ))}
      {props.students.length === 0 ? (
        <p className="rounded-lg bg-white p-5 text-sm font-semibold text-[#748299] shadow-sm md:col-span-2 xl:col-span-3">
          Data siswa belum ditemukan.
        </p>
      ) : null}
    </div>
  );
}

export function ClassDetailHeader(props: {
  classNameLabel: string;
  count: number;
  onBack: () => void;
  schoolName: string;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-[#748299]">{props.schoolName}</p>
        <h2 className="mt-1 text-lg font-semibold">
          Kelas {props.classNameLabel}
        </h2>
        <p className="mt-1 text-sm text-[#748299]">
          {props.count} siswa tercatat.
        </p>
      </div>
      <button
        type="button"
        onClick={props.onBack}
        className="h-10 rounded-md border border-[#dbe5f4] px-4 text-sm font-semibold text-[#0f2a4f]"
      >
        Kembali ke kelas
      </button>
    </div>
  );
}

export function DetailHeader(props: {
  canBackToSchools: boolean;
  count: number;
  onBack: () => void;
  schoolName: string;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">{props.schoolName}</h2>
          <p className="mt-1 text-sm text-[#748299]">Daftar siswa per sekolah.</p>
        </div>
        <span className="rounded-full bg-[#f2d35f] px-3 py-1 text-sm font-semibold">
          {props.count} siswa
        </span>
      </div>
      {props.canBackToSchools ? (
        <button
          type="button"
          onClick={props.onBack}
          className="h-10 rounded-md border border-[#dbe5f4] px-4 text-sm font-semibold text-[#0f2a4f]"
        >
          Kembali ke sekolah
        </button>
      ) : null}
    </div>
  );
}
