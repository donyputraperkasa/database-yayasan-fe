"use client";

import { getAccessToken, getStoredUser } from "@/lib/auth/storage";
import {
  searchDashboard,
  type DashboardSearchResult,
} from "@/lib/search/dashboard-search";
import { Search } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { DashboardSearchResults } from "./dashboard-search-results";

type DashboardSearchPanelProps = {
  errorMessage?: string | null;
  onRetry?: () => void;
};

export function DashboardSearchPanel({
  errorMessage,
  onRetry,
}: DashboardSearchPanelProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<DashboardSearchResult[]>([]);
  const [searchedQuery, setSearchedQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const keyword = query.trim();
    setSearchedQuery(keyword);
    setResults([]);

    if (!keyword) {
      setMessage("Ketik kata kunci terlebih dahulu.");
      return;
    }

    const token = getAccessToken();
    const role = getStoredUser()?.role ?? "school";

    if (!token) {
      setMessage("Sesi login tidak ditemukan.");
      return;
    }

    setIsSearching(true);
    setMessage(null);
    try {
      setResults(await searchDashboard(token, keyword, role));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Pencarian gagal.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <section className="rounded-[18px] border border-[#e2e8f0] bg-white p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Cari Data</h2>
          <p className="mt-1 text-sm text-[#748299]">
            Pantau kondisi data yayasan dan aktivitas unit sekolah.
          </p>
          {errorMessage ? (
            <p className="mt-2 text-sm font-semibold text-[#c2410c]">
              {errorMessage}
            </p>
          ) : null}
        </div>

        <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row">
          <label className="flex h-11 w-full items-center gap-3 rounded-[12px] border-[1.5px] border-[#dbeafe] bg-[#f8fafc] px-3.5 transition focus-within:border-[#1d4ed8] focus-within:bg-white focus-within:ring-3 focus-within:ring-[#1d4ed8]/15 sm:min-w-72">
            <Search size={19} className="shrink-0 text-[#1d4ed8]" aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari sekolah, siswa, dokumen..."
              className="min-w-0 flex-1 bg-transparent text-sm text-[#1e293b] outline-none placeholder:text-[#94a3b8]"
            />
          </label>
          <button className="inline-flex h-11 items-center justify-center gap-2 rounded-[12px] bg-[#1d4ed8] px-5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(29,78,216,0.25)] transition hover:bg-[#1e40af]">
            <Search size={16} aria-hidden="true" />
            Cari
          </button>
          {errorMessage && onRetry ? (
            <button
              type="button"
              onClick={onRetry}
              className="h-11 rounded-[12px] border-[1.5px] border-[#e2e8f0] px-4 text-sm font-semibold text-[#475569] transition hover:border-[#bfdbfe] hover:text-[#1d4ed8]"
            >
              Muat ulang
            </button>
          ) : null}
        </form>
      </div>
      <DashboardSearchResults
        isLoading={isSearching}
        message={message}
        query={searchedQuery}
        results={results}
      />
    </section>
  );
}
