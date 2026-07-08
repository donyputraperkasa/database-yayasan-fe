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
    <section className="rounded-lg border border-[#dbe5f4] bg-white p-4 shadow-sm">
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
          <label className="flex h-11 w-full items-center gap-3 rounded-md border border-[#dbe5f4] bg-[#f8fbff] px-3 sm:min-w-72">
            <Search size={17} className="text-[#748299]" aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari sekolah, siswa, dokumen..."
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#8b98ad]"
            />
          </label>
          <button className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#0f2a4f] px-5 text-sm font-semibold text-white transition hover:bg-[#173b6b]">
            <Search size={16} aria-hidden="true" />
            Cari
          </button>
          {errorMessage && onRetry ? (
            <button
              type="button"
              onClick={onRetry}
              className="h-11 rounded-md border border-[#dbe5f4] px-4 text-sm font-semibold text-[#0f2a4f]"
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
