import { Plus } from "lucide-react";

type AssetsHeaderProps = {
  canManage: boolean;
  onCreate: () => void;
};

export function AssetsHeader({ canManage, onCreate }: AssetsHeaderProps) {
  return (
    <section className="flex flex-col gap-4 rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-[#748299]">Inventaris</p>
        <h1 className="mt-1 text-2xl font-semibold">Data Aset</h1>
        <p className="mt-2 text-sm text-[#748299]">
          Lihat dan kelola aset berdasarkan unit sekolah.
        </p>
      </div>
      {canManage ? (
        <button
          type="button"
          onClick={onCreate}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#0f2a4f] px-4 text-sm font-semibold text-white"
        >
          <Plus size={18} aria-hidden="true" />
          Tambah Aset
        </button>
      ) : null}
    </section>
  );
}
