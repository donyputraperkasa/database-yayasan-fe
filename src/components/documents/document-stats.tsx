import type { DocumentItem } from "@/types";

type DocumentStatsProps = {
  documents: DocumentItem[];
};

export function DocumentStats({ documents }: DocumentStatsProps) {
  const schoolCount = new Set(documents.map((document) => document.schoolId)).size;
  const stats = [
    { label: "Total dokumen", value: documents.length },
    { label: "Sekolah terisi", value: schoolCount },
    { label: "Upload terbaru", value: formatDate(documents[0]?.updatedAt) },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <article
          key={stat.label}
          className="rounded-lg border border-[#dbe5f4] bg-white p-4 shadow-sm"
        >
          <p className="text-sm font-semibold text-[#748299]">{stat.label}</p>
          <p className="mt-3 text-xl font-semibold">{stat.value}</p>
        </article>
      ))}
    </section>
  );
}

function formatDate(value?: string) {
  return value ? new Date(value).toLocaleDateString("id-ID") : "-";
}
