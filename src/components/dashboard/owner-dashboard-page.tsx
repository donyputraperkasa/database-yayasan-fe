"use client";

import { getDashboardSummary } from "@/lib/api/dashboard";
import { getAccessToken } from "@/lib/auth/storage";
import type { DashboardProgress, DashboardStat, DashboardSummary } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { DashboardHome } from "./dashboard-home";

const emptySummary: DashboardSummary = {
  totals: {
    schools: 0,
    students: 0,
    employees: 0,
    teachers: 0,
    staff: 0,
    permanentEmployees: 0,
    nonPermanentEmployees: 0,
    honoraryEmployees: 0,
    assets: 0,
    facilities: 0,
    finances: 0,
    documents: 0,
  },
  schoolsByLevel: { tkKb: 0, sd: 0, smp: 0, smaSmk: 0 },
  studentsBySchool: [],
  employeesBySchool: [],
};

export function OwnerDashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary>(emptySummary);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadSummary = async () => {
    const token = getAccessToken();
    if (!token) return;

    setIsLoading(true);
    setErrorMessage(null);
    try {
      setSummary(await getDashboardSummary(token));
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
        if (isMounted) setSummary(data);
      })
      .catch((error) => {
        if (isMounted) setErrorMessage(getErrorMessage(error));
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const stats = useMemo(() => buildStats(summary), [summary]);
  const progress = useMemo(() => buildProgress(summary), [summary]);

  return (
    <DashboardHome
      errorMessage={errorMessage}
      isLoading={isLoading}
      onRetry={loadSummary}
      progress={progress}
      stats={stats}
    />
  );
}

function buildStats(summary: DashboardSummary): DashboardStat[] {
  return [
    {
      label: "Sekolah",
      value: formatNumber(summary.totals.schools),
      note: "Unit terdaftar",
    },
    {
      label: "Siswa",
      value: formatNumber(summary.totals.students),
      note: "Data aktif",
    },
    {
      label: "Pegawai",
      value: formatNumber(summary.totals.employees),
      note: "Guru dan pegawai",
    },
    {
      label: "Dokumen",
      value: formatNumber(summary.totals.documents),
      note: "File terunggah",
    },
  ];
}

function buildProgress(summary: DashboardSummary): DashboardProgress[] {
  const schools = summary.totals.schools;

  return [
    { title: "Unit sekolah terdaftar", progress: ratio(schools, 36) },
    {
      title: "Dokumen per sekolah",
      progress: ratio(summary.totals.documents, schools),
    },
    {
      title: "Data fasilitas",
      progress: ratio(summary.totals.facilities, schools),
    },
  ];
}

function ratio(value: number, target: number) {
  if (target <= 0) return 0;
  return Math.min(100, Math.round((value / target) * 100));
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("id-ID").format(value);
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Data gagal dimuat.";
}
