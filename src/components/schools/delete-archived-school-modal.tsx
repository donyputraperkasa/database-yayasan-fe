import type { DeleteArchivedSchoolModalProps } from "@/types";

export function DeleteArchivedSchoolModal(props: DeleteArchivedSchoolModalProps) {
  if (!props.school) return null;

  return (
    <div
      onMouseDown={(event) => event.target === event.currentTarget && props.onClose()}
      className="modal-backdrop-enter fixed inset-0 z-[80] grid place-items-center bg-[#071529]/55 p-4 backdrop-blur-sm"
    >
      <section className="modal-panel-enter w-full max-w-md rounded-xl bg-white p-5 shadow-2xl">
        <p className="text-sm font-semibold text-red-700">Hapus Arsip Sekolah</p>
        <h2 className="mt-2 text-xl font-semibold text-[#172033]">
          Hapus sekolah dari arsip?
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#748299]">
          Data arsip untuk <strong>{props.school.name}</strong> akan dihapus dari daftar arsip.
        </p>
        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={props.onClose}
            className="h-11 rounded-md border border-[#dbe5f4] px-5 text-sm font-semibold text-[#526078] hover:bg-[#f8fbff]"
          >
            Batal
          </button>
          <button
            type="button"
            disabled={props.isLoading}
            onClick={props.onConfirm}
            className="h-11 rounded-md bg-red-600 px-5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:bg-red-300"
          >
            {props.isLoading ? "Menghapus..." : "Ya, Hapus Arsip"}
          </button>
        </div>
      </section>
    </div>
  );
}
