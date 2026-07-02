import type { DashboardSummary } from "@/types";
import { apiEndpoints } from "./endpoints";
import { apiRequest } from "./client";

export function getDashboardSummary(token: string) {
  return apiRequest<DashboardSummary>(apiEndpoints.dashboard.summary, {
    method: "GET",
    token,
  });
}
