import type { Employee } from "@/types";

type EmployeeStatsProps = {
  employees: Employee[];
};

export function EmployeeStats({ employees }: EmployeeStatsProps) {
  const stats = [
    { label: "Total", value: employees.length },
    { label: "Guru", value: countBy(employees, "type", "guru") },
    { label: "Pegawai", value: countBy(employees, "type", "pegawai") },
    { label: "PTY/GTY", value: countBy(employees, "status", "tetap") },
    { label: "PTTY/GTTY", value: countBy(employees, "status", "tidak_tetap") },
    { label: "Honorer", value: countBy(employees, "status", "honorer") },
  ];

  return (
    <section className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
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

function countBy(employees: Employee[], key: "status" | "type", value: string) {
  return employees.filter((employee) => employee[key] === value).length;
}
