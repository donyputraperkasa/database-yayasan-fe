import type { FinanceType } from "@/types";

export const financeTypeLabel: Record<FinanceType, string> = {
  bos: "BOS",
  bosda: "BOSDA",
  dpp: "DPP",
  lain_lain: "Lain-lain",
  rekening: "Rekening",
  spp: "SPP",
};

export function formatRupiah(value?: number | null) {
  if (!value) return "-";

  return new Intl.NumberFormat("id-ID", {
    currency: "IDR",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(value);
}
