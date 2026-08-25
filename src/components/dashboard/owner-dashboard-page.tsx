"use client";

import { getDashboardSummary } from "@/lib/api/dashboard";
import { getAccessToken, getStoredUser } from "@/lib/auth/storage";
import type { DashboardStat, DashboardSummary, Role } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { DashboardHome } from "./dashboard-home";

const staticSummary: DashboardSummary = {
  totals: {
    schools: 36,
    students: 8420,
    employees: 612,
    teachers: 428,
    staff: 184,
    permanentEmployees: 340,
    nonPermanentEmployees: 172,
    honoraryEmployees: 100,
    assets: 184,
    inventory: 540,
    finances: 72,
    documents: 248,
  },
  schoolsByLevel: { tkKb: 8, sd: 12, smp: 8, smaSmk: 8 },
  studentsBySchool: [],
  employeesBySchool: [],
};

export function OwnerDashboardPage() {
  const [role] = useState(() => getStoredUser()?.role ?? "school");
  const [summary, setSummary] = useState<DashboardSummary>(staticSummary);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadSummary = async () => {
    const token = getAccessToken();
    if (!token) return;

    setIsLoading(true);
    setErrorMessage(null);
    try {
      const data = await getDashboardSummary(token);
      if (data) {
        setSummary(data);
      }
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const token = getAccessToken();

    if (!token) return;

    getDashboardSummary(token)
      .then((data) => {
        if (isMounted && data) {
          setSummary(data);
        }
      })
      .catch((error) => {
        if (isMounted) {
          // On network/auth error, keep static summary for preview
          setErrorMessage(getErrorMessage(error));
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const stats = useMemo(() => buildStats(summary, role), [summary, role]);

  return (
    <DashboardHome
      errorMessage={errorMessage}
      isLoading={isLoading}
      onRetry={loadSummary}
      role={role}
      stats={stats}
      summary={summary}
    />
  );
}

function buildStats(
  summary: DashboardSummary,
  role: Role,
): DashboardStat[] {
  const schoolHref = role === "owner" ? "/schools" : "/principals";

  return [
    {
      href: schoolHref,
      label: "Sekolah",
      value: formatNumber(summary.totals.schools),
      note: "Unit terdaftar",
    },
    {
      href: "/students",
      label: "Siswa",
      value: formatNumber(summary.totals.students),
      note: "Data aktif",
    },
    {
      href: "/employees",
      label: "Pegawai",
      value: formatNumber(summary.totals.employees),
      note: "Guru dan pegawai",
    },
    {
      href: "/documents",
      label: "Dokumen",
      value: formatNumber(summary.totals.documents),
      note: "File terunggah",
    },
  ];
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("id-ID").format(value);
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Data gagal dimuat.";
}
