import { Upload } from "lucide-react";

type DocumentsHeaderProps = {
  canManage: boolean;
  onCreate: () => void;
};

export function DocumentsHeader({ canManage, onCreate }: DocumentsHeaderProps) {
  return (
    <section className="flex flex-col gap-4 rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-[#748299]">Arsip Sekolah</p>
        <h1 className="mt-1 text-2xl font-semibold">Dokumen</h1>
        <p className="mt-2 text-sm text-[#748299]">
          Kelola arsip dokumen tiap sekolah agar mudah dicek owner dan kantor.
        </p>
      </div>
      {canManage ? (
        <button
          type="button"
          onClick={onCreate}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#0f2a4f] px-4 text-sm font-semibold text-white"
        >
          <Upload size={18} aria-hidden="true" />
          Upload Dokumen
        </button>
      ) : null}
    </section>
  );
}
