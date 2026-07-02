import type { Student } from "@/types";

type StudentStatsProps = {
  students: Student[];
};

export function StudentStats({ students }: StudentStatsProps) {
  const maleCount = students.filter((student) => student.gender === "male").length;
  const femaleCount = students.filter((student) => student.gender === "female").length;
  const classCount = new Set(
    students.map((student) => student.className).filter(Boolean),
  ).size;

  const stats = [
    { label: "Total siswa", value: students.length },
    { label: "Murid Laki-laki", value: maleCount },
    { label: "Murid Perempuan", value: femaleCount },
    { label: "TotalKelas", value: classCount },
  ];

  return (
    <section className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {stats.map((stat) => (
        <article
          key={stat.label}
          className="rounded-lg border border-[#dbe5f4] bg-white p-4 shadow-sm"
        >
          <p className="text-sm font-semibold text-[#748299]">{stat.label}</p>
          <p className="mt-3 text-2xl font-semibold">{stat.value}</p>
        </article>
      ))}
    </section>
  );
}
