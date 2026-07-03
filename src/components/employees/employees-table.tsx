import { TableActions } from "@/components/ui/table-actions";
import { SchoolSummaryCard } from "@/components/ui/school-summary-card";
import type { Employee } from "@/types";
import {
  employeeStatusLabel,
  employeeTypeLabel,
} from "./employee-labels";
import { groupEmployeesBySchool } from "./employee-page-utils";

type EmployeesTableProps = {
  canManage: boolean;
  employees: Employee[];
  onBackToSchools: () => void;
  onDelete: (employee: Employee) => void;
  onDetail: (employee: Employee) => void;
  onEdit: (employee: Employee) => void;
  onSelectSchool: (schoolName: string) => void;
  selectedSchoolName?: string | null;
};

export function EmployeesTable(props: EmployeesTableProps) {
  const groups = Object.entries(groupEmployeesBySchool(props.employees));
  const selectedGroup = groups.find(([name]) => name === props.selectedSchoolName);

  if (selectedGroup) {
    const [schoolName, employees] = selectedGroup;

    return (
      <section className="rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm">
        <DetailHeader count={employees.length} onBack={props.onBackToSchools} schoolName={schoolName} />
        <div className="mt-5 grid gap-3 md:hidden">
          {employees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} {...props} />
          ))}
        </div>
        <DesktopTable {...props} employees={employees} />
      </section>
    );
  }

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      {groups.map(([schoolName, employees]) => (
        <SchoolSummaryCard
          key={schoolName}
          countLabel={`${employees.length} data`}
          description="Guru dan pegawai per sekolah."
          onClick={() => props.onSelectSchool(schoolName)}
          title={schoolName}
        />
      ))}
      {props.employees.length === 0 ? (
        <p className="rounded-lg bg-white p-5 text-sm font-semibold text-[#748299] shadow-sm">
          Data pegawai belum ditemukan.
        </p>
      ) : null}
    </section>
  );
}

function GroupHeader(props: { count: number; schoolName: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h2 className="text-lg font-semibold">{props.schoolName}</h2>
        <p className="mt-1 text-sm text-[#748299]">Guru dan pegawai per sekolah.</p>
      </div>
      <span className="rounded-full bg-[#f2d35f] px-3 py-1 text-sm font-semibold">
        {props.count} data
      </span>
    </div>
  );
}

function DetailHeader(props: {
  count: number;
  onBack: () => void;
  schoolName: string;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <GroupHeader count={props.count} schoolName={props.schoolName} />
      <button
        type="button"
        onClick={props.onBack}
        className="h-10 rounded-md border border-[#dbe5f4] px-4 text-sm font-semibold text-[#0f2a4f]"
      >
        Kembali ke sekolah
      </button>
    </div>
  );
}

function DesktopTable(props: EmployeesTableProps) {
  return (
    <div className="mt-5 hidden overflow-x-auto md:block">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="border-b border-[#dbe5f4] text-[#748299]">
          <tr>
            <th className="py-3 font-semibold">Nama</th>
            <th className="py-3 font-semibold">Jenis</th>
            <th className="py-3 font-semibold">Jabatan</th>
            <th className="py-3 font-semibold">Status</th>
            <th className="py-3 text-center font-semibold">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#eef3fb]">
          {props.employees.map((employee) => (
            <EmployeeRow key={employee.id} employee={employee} {...props} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EmployeeCard(props: EmployeesTableProps & { employee: Employee }) {
  const employee = props.employee;

  return (
    <article className="rounded-lg border border-[#e8edf6] p-4">
      <p className="font-semibold text-[#172033]">{employee.name}</p>
      <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
        <Badge>{employeeTypeLabel[employee.type]}</Badge>
        <Badge>{employee.position ?? "Tanpa jabatan"}</Badge>
      </div>
      {props.canManage ? <Actions {...props} /> : null}
    </article>
  );
}

function EmployeeRow(props: EmployeesTableProps & { employee: Employee }) {
  const employee = props.employee;

  return (
    <tr>
      <td className="py-3 font-semibold text-[#172033]">{employee.name}</td>
      <td className="py-3 text-[#526078]">{employeeTypeLabel[employee.type]}</td>
      <td className="py-3 text-[#526078]">{employee.position ?? "-"}</td>
      <td className="py-3 text-[#526078]">
        {employee.status ? employeeStatusLabel[employee.status] : "-"}
      </td>
      <td className="py-3 text-center"><Actions {...props} /></td>
    </tr>
  );
}

function Actions(props: EmployeesTableProps & { employee: Employee }) {
  return (
    <TableActions
      canManage={props.canManage}
      onDelete={() => props.onDelete(props.employee)}
      onDetail={() => props.onDetail(props.employee)}
      onEdit={() => props.onEdit(props.employee)}
    />
  );
}

function Badge({ children }: { children: string }) {
  return (
    <span className="rounded-full bg-[#eaf2ff] px-3 py-1 text-[#1f4f8f]">
      {children}
    </span>
  );
}
