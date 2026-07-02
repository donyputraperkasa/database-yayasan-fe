"use client";

import { DashboardBreadcrumbs } from "@/components/dashboard/dashboard-breadcrumbs";
import { PageState } from "@/components/ui/page-state";
import { deleteFinance, listFinances } from "@/lib/api/finances";
import { listSchools } from "@/lib/api/schools";
import { getAccessToken, getStoredUser } from "@/lib/auth/storage";
import type { Finance, FinanceFilters, School, User } from "@/types";
import { useEffect, useState } from "react";
import { FinanceDetailModal } from "./finance-detail-modal";
import { FinanceFormModal } from "./finance-form-modal";
import {
  cleanFinanceFilters,
  filterFinances,
  getFinanceErrorMessage,
  upsertFinance,
} from "./finance-page-utils";
import { FinanceStats } from "./finance-stats";
import { FinancesFilter } from "./finances-filter";
import { FinancesHeader } from "./finances-header";
import { FinancesTable } from "./finances-table";

export function FinancesPage() {
  const [detailFinance, setDetailFinance] = useState<Finance | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FinanceFilters>({});
  const [finances, setFinances] = useState<Finance[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(() => Boolean(getAccessToken()));
  const [schools, setSchools] = useState<School[]>([]);
  const [selectedFinance, setSelectedFinance] = useState<Finance | null>(null);
  const [token] = useState(() => getAccessToken() ?? "");
  const [user] = useState<User | null>(() => getStoredUser());

  const loadFinances = async (nextFilters = filters) => {
    if (!token) return;
    setIsLoading(true);
    setError(null);
    try {
      setFinances(await listFinances(token, cleanFinanceFilters(nextFilters)));
    } catch (loadError) {
      setError(getFinanceErrorMessage(loadError));
    } finally {
      setIsLoading(false);
    }
  };

  const openForm = (finance: Finance | null) => {
    setSelectedFinance(finance);
    setIsFormOpen(true);
  };

  const handleDelete = async (finance: Finance) => {
    if (!confirm(`Hapus data keuangan ${finance.school.name}?`)) return;
    await deleteFinance(token, finance.id);
    setFinances((current) => current.filter((item) => item.id !== finance.id));
  };

  useEffect(() => {
    if (!token) return;
    Promise.all([listSchools(token), listFinances(token)])
      .then(([schoolData, financeData]) => {
        setSchools(schoolData);
        setFinances(financeData);
      })
      .catch((loadError) => setError(getFinanceErrorMessage(loadError)))
      .finally(() => setIsLoading(false));
  }, [token]);

  const canManage = user?.role === "owner" || user?.role === "school";
  const visibleFinances = filterFinances(finances, filters.query);

  if (!token) return <PageState text="Sesi login tidak ditemukan." />;
  if (isLoading) return <PageState text="Memuat data keuangan..." />;
  if (error) return <PageState text={error} action={() => void loadFinances()} />;

  return (
    <div className="space-y-5">
      <DashboardBreadcrumbs items={[{ href: "/dashboard", label: "Dashboard" }, { label: "Keuangan" }]} />
      <FinancesHeader canManage={canManage} onCreate={() => openForm(null)} />
      <FinanceStats finances={visibleFinances} />
      <FinancesFilter filters={filters} isSchoolUser={user?.role === "school"} onChange={setFilters} onSubmit={() => void loadFinances()} schools={schools} />
      <FinancesTable canManage={canManage} finances={visibleFinances} onDelete={handleDelete} onDetail={setDetailFinance} onEdit={openForm} />
      <FinanceDetailModal finance={detailFinance} onClose={() => setDetailFinance(null)} />
      <FinanceFormModal finance={selectedFinance} isOpen={isFormOpen} isSchoolUser={user?.role === "school"} onClose={() => setIsFormOpen(false)} onSaved={(finance) => setFinances((current) => upsertFinance(current, finance))} schools={schools} token={token} />
    </div>
  );
}
