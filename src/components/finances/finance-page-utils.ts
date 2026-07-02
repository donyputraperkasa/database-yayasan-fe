import type { Finance, FinanceFilters } from "@/types";

export function cleanFinanceFilters(filters: FinanceFilters) {
  return {
    className: filters.className || undefined,
    schoolId: filters.schoolId || undefined,
    type: filters.type || undefined,
  };
}

export function filterFinances(finances: Finance[], query?: string) {
  const keyword = query?.toLowerCase().trim();
  if (!keyword) return finances;

  return finances.filter((finance) =>
    [
      finance.school.name,
      finance.type,
      finance.className,
      finance.accountNo,
      finance.note,
    ]
      .filter(Boolean)
      .some((value) => value!.toLowerCase().includes(keyword)),
  );
}

export function groupFinancesBySchool(finances: Finance[]) {
  return finances.reduce<Record<string, Finance[]>>((groups, finance) => {
    const schoolName = finance.school.name;
    groups[schoolName] = [...(groups[schoolName] ?? []), finance];
    return groups;
  }, {});
}

export function upsertFinance(finances: Finance[], savedFinance: Finance) {
  const exists = finances.some((finance) => finance.id === savedFinance.id);
  if (!exists) return [savedFinance, ...finances];

  return finances.map((finance) =>
    finance.id === savedFinance.id ? savedFinance : finance,
  );
}

export function getFinanceErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Data keuangan gagal diproses.";
}
