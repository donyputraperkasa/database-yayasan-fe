import { listDocuments } from "@/lib/api/documents";
import { listEmployees } from "@/lib/api/employees";
import { listSchools } from "@/lib/api/schools";
import { listStudents } from "@/lib/api/students";
import type { Role } from "@/types";

export type DashboardSearchResult = {
  href: string;
  subtitle: string;
  title: string;
  type: "Dokumen" | "Pegawai" | "Sekolah" | "Siswa";
};

type SearchRecord = DashboardSearchResult & {
  keywords: Array<string | null | undefined>;
};

export async function searchDashboard(
  token: string,
  query: string,
  role: Role,
) {
  const keyword = normalize(query);
  if (!keyword) return [];

  const [schools, students, employees, documents] = await Promise.all([
    listSchools(token),
    listStudents(token),
    listEmployees(token),
    listDocuments(token),
  ]);
  const schoolHref = role === "owner" ? "/schools" : "/principals";
  const records: SearchRecord[] = [
    ...schools.map((school) => ({
      href: schoolHref,
      keywords: [school.name, school.email, school.principal, school.address],
      subtitle: school.level.replace("_", " ").toUpperCase(),
      title: school.name,
      type: "Sekolah" as const,
    })),
    ...students.map((student) => ({
      href: "/students",
      keywords: [
        student.name,
        student.school.name,
        student.className,
        student.fatherName,
        student.motherName,
      ],
      subtitle: `${student.school.name} • Kelas ${student.className ?? "-"}`,
      title: student.name,
      type: "Siswa" as const,
    })),
    ...employees.map((employee) => ({
      href: "/employees",
      keywords: [
        employee.name,
        employee.school.name,
        employee.position,
        employee.email,
        employee.phone,
      ],
      subtitle: `${employee.school.name} • ${employee.position ?? employee.type}`,
      title: employee.name,
      type: "Pegawai" as const,
    })),
    ...documents.map((document) => ({
      href: "/documents",
      keywords: [document.name, document.school.name],
      subtitle: document.school.name,
      title: document.name,
      type: "Dokumen" as const,
    })),
  ];

  return records
    .filter((item) => item.keywords.some((value) => normalize(value).includes(keyword)))
    .slice(0, 8)
    .map(({ href, subtitle, title, type }) => ({ href, subtitle, title, type }));
}

function normalize(value?: string | null) {
  return (value ?? "").toLowerCase().trim();
}
