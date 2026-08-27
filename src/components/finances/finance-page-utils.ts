import type { Finance, FinanceFilters } from "@/types";

export function cleanFinanceFilters(filters: FinanceFilters) {
  return {
    className: filters.className || undefined,
    schoolId: filters.schoolId || undefined,
    type: filters.type || undefined,
  };
}

export function filterFinances(
  finances: Finance[],
  query?: string,
  level?: string,
  schoolId?: string,
  type?: string,
  className?: string,
) {
  const keyword = query?.toLowerCase().trim();
  const selectedLevel = level && level !== "all" ? level : null;
  const targetClass = className?.toLowerCase().trim();

  return finances.filter((finance) => {
    const matchesKeyword =
      !keyword ||
      [
        finance.school.name,
        finance.type,
        finance.className,
        finance.accountNo,
        finance.note,
      ]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(keyword));

    const matchesLevel = !selectedLevel || finance.school.level === selectedLevel;
    const matchesSchool = !schoolId || finance.schoolId === schoolId;
    const matchesType = !type || finance.type === type;
    const matchesClass = !targetClass || (finance.className?.toLowerCase().includes(targetClass) ?? false);

    return matchesKeyword && matchesLevel && matchesSchool && matchesType && matchesClass;
  });
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
