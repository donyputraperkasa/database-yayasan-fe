import type { School, User } from "@/types";

type SchoolEditAccessNoticeProps = {
  school: School | null;
  user: User | null;
};

export function SchoolEditAccessNotice({
  school,
  user,
}: SchoolEditAccessNoticeProps) {
  if (user?.role !== "school") return null;

  const isOpen = Boolean(school?.canEdit);

  return (
    <section
      className={[
        "rounded-lg border p-4 text-sm font-semibold shadow-sm",
        isOpen
          ? "border-emerald-100 bg-emerald-50 text-emerald-700"
          : "border-amber-100 bg-amber-50 text-amber-700",
      ].join(" ")}
    >
      {isOpen
        ? "Akses edit sedang dibuka oleh masdon. Sekolah dapat menambah dan mengubah data."
        : "Akses edit sedang dikunci oleh masdon. Silahkan hubungi masdon untuk perubahan data."}
    </section>
  );
}
