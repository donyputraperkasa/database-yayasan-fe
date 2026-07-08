"use client";

import { DashboardBreadcrumbs } from "@/components/dashboard/dashboard-breadcrumbs";
import { PageState } from "@/components/ui/page-state";
import { listAuditLogs } from "@/lib/api/audit-logs";
import { listSchools } from "@/lib/api/schools";
import { getAccessToken, getStoredUser } from "@/lib/auth/storage";
import type { AuditLog, School, User } from "@/types";
import { ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

const entityOptions = ["users", "schools", "students", "employees", "documents"];

export function AuditLogsPage() {
  const [entity, setEntity] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [schoolId, setSchoolId] = useState("");
  const [schools, setSchools] = useState<School[]>([]);
  const [token] = useState(() => getAccessToken() ?? "");
  const [user] = useState<User | null>(() => getStoredUser());
  const [isLoading, setIsLoading] = useState(() => Boolean(token));

  const loadLogs = async () => {
    if (!token) return;
    setIsLoading(true);
    setError(null);
    try {
      setLogs(await listAuditLogs(token, {
        entity: entity || undefined,
        schoolId: schoolId || undefined,
        take: 80,
      }));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Audit log gagal dimuat.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!token) return;

    Promise.all([
      listAuditLogs(token, { take: 80 }),
      user?.role === "school" ? Promise.resolve([]) : listSchools(token),
    ])
      .then(([logData, schoolData]) => {
        setLogs(logData);
        setSchools(schoolData);
      })
      .catch((loadError) => {
        setError(loadError instanceof Error ? loadError.message : "Audit log gagal dimuat.");
      })
      .finally(() => setIsLoading(false));
  }, [token, user?.role]);

  if (!token) return <PageState text="Sesi login tidak ditemukan." />;
  if (isLoading) return <PageState text="Memuat audit log..." />;
  if (error) return <PageState text={error} action={() => void loadLogs()} />;

  return (
    <div className="space-y-5">
      <DashboardBreadcrumbs
        items={[{ href: "/dashboard", label: "Dashboard" }, { label: "Audit Log" }]}
      />
      <section className="rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-lg bg-[#eaf2ff] text-[#1f4f8f]">
            <ShieldCheck size={22} aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#748299]">Keamanan Data</p>
            <h1 className="mt-1 text-2xl font-semibold">Audit Log</h1>
          </div>
        </div>
      </section>

      <section className="grid gap-3 rounded-lg border border-[#dbe5f4] bg-white p-4 shadow-sm lg:grid-cols-[1fr_1fr_auto]">
        <select value={entity} onChange={(event) => setEntity(event.target.value)} className={fieldClass}>
          <option value="">Semua modul</option>
          {entityOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <select
          value={schoolId}
          onChange={(event) => setSchoolId(event.target.value)}
          disabled={user?.role === "school"}
          className={fieldClass}
        >
          <option value="">Semua sekolah</option>
          {schools.map((school) => (
            <option key={school.id} value={school.id}>{school.name}</option>
          ))}
        </select>
        <button onClick={() => void loadLogs()} className="h-11 rounded-md bg-[#0f2a4f] px-5 text-sm font-semibold text-white">
          Terapkan
        </button>
      </section>

      <section className="rounded-lg border border-[#dbe5f4] bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">Aktivitas Terbaru</h2>
          <span className="rounded-full bg-[#f2d35f] px-3 py-1 text-sm font-semibold">
            {logs.length} log
          </span>
        </div>
        <div className="mt-5 divide-y divide-[#eef3fb]">
          {logs.map((log) => (
            <article key={log.id} className="grid gap-3 py-4 lg:grid-cols-[180px_1fr_180px]">
              <div>
                <p className="text-xs font-semibold uppercase text-[#748299]">{log.entity}</p>
                <p className="mt-1 text-sm font-semibold text-[#172033]">{log.action}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#172033]">{log.description}</p>
                <p className="mt-1 text-xs text-[#748299]">
                  {log.userEmail ?? "System"} - {log.userRole ?? "-"}
                </p>
              </div>
              <p className="text-sm text-[#748299] lg:text-right">{formatDate(log.createdAt)}</p>
            </article>
          ))}
          {logs.length === 0 ? (
            <p className="py-6 text-sm font-semibold text-[#748299]">Belum ada aktivitas.</p>
          ) : null}
        </div>
      </section>
    </div>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

const fieldClass =
  "h-11 rounded-md border border-[#ced9eb] bg-white px-3 text-sm outline-none focus:border-[#1f4f8f]";
