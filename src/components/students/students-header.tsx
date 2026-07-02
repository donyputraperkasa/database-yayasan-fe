import { GraduationCap, Plus } from "lucide-react";

type StudentsHeaderProps = {
  canManage: boolean;
  onCreate: () => void;
};

export function StudentsHeader({ canManage, onCreate }: StudentsHeaderProps) {
  return (
    <section className="flex flex-col gap-4 rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#eaf2ff] text-[#1f4f8f]">
          <GraduationCap size={22} aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-lg font-semibold">Data Siswa</h2>
          <p className="mt-1 text-sm text-[#748299]">
            Pantau data siswa berdasarkan sekolah dan kelas.
          </p>
        </div>
      </div>
      {canManage ? (
        <button
          type="button"
          onClick={onCreate}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#0f2a4f] px-4 text-sm font-semibold text-white"
        >
          <Plus size={17} aria-hidden="true" />
          Tambah Siswa
        </button>
      ) : null}
    </section>
  );
}
