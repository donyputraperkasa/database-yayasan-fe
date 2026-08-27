import type { ArchiveSchoolModalProps } from "@/types";

export function ArchiveSchoolModal(props: ArchiveSchoolModalProps) {
  if (!props.school) return null;

  return (
    <div
      onMouseDown={(event) => event.target === event.currentTarget && props.onClose()}
      className="modal-backdrop-enter fixed inset-0 z-[80] grid place-items-center bg-[#071529]/55 p-4 backdrop-blur-sm"
    >
      <section className="modal-panel-enter w-full max-w-md rounded-xl bg-white p-5 shadow-2xl">
        <p className="text-sm font-semibold text-amber-700">Konfirmasi Arsip</p>
        <h2 className="mt-2 text-xl font-semibold text-[#172033]">
          Anda yakin mengarsipkan sekolah?
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#748299]">
          Data <strong>{props.school.name}</strong> disembunyikan dari sistem aktif,
          tetapi tetap tersimpan dan dapat dipulihkan oleh owner.
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
            className="h-11 rounded-md bg-amber-600 px-5 text-sm font-semibold text-white transition hover:bg-amber-700 disabled:bg-amber-300"
          >
            {props.isLoading ? "Mengarsipkan..." : "Ya, Arsipkan"}
          </button>
        </div>
      </section>
    </div>
  );
}
