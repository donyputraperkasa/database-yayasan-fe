import { UserPlus } from "lucide-react";

export function UsersHeader() {
  return (
    <section className="flex flex-col gap-4 rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#eaf2ff] text-[#1f4f8f]">
          <UserPlus size={22} aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-lg font-semibold">Tambah User</h2>
          <p className="mt-1 text-sm text-[#748299]">
            Buat akun kantor dan hubungkan akun sekolah ke unit yang sesuai.
          </p>
        </div>
      </div>
    </section>
  );
}
