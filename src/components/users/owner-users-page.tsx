"use client";

import { listSchools } from "@/lib/api/schools";
import { listUsers } from "@/lib/api/users";
import { getAccessToken } from "@/lib/auth/storage";
import type { School, User } from "@/types";
import { useEffect, useState } from "react";
import { CreateUserForm } from "./create-user-form";
import { ResetPasswordModal } from "./reset-password-modal";
import { UsersHeader } from "./users-header";
import { UsersTable } from "./users-table";

export function OwnerUsersPage() {
  const [error, setError] = useState<string | null>(null);
  const [schools, setSchools] = useState<School[]>([]);
  const [token] = useState(() => getAccessToken() ?? "");
  const [isLoading, setIsLoading] = useState(() => Boolean(token));
  const [resetTarget, setResetTarget] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!token) {
      return;
    }

    Promise.all([listUsers(token), listSchools(token)])
      .then(([userData, schoolData]) => {
        setUsers(userData);
        setSchools(schoolData);
      })
      .catch((loadError) => {
        setError(loadError instanceof Error ? loadError.message : "Gagal mengambil data.");
      })
      .finally(() => setIsLoading(false));
  }, [token]);

  if (!token) {
    return <PageState text="Sesi login tidak ditemukan." />;
  }

  if (isLoading) {
    return <PageState text="Memuat data user..." />;
  }

  if (error) {
    return <PageState text={error} />;
  }

  return (
    <div className="space-y-5">
      <UsersHeader />
      <CreateUserForm
        onCreated={(user) => setUsers((current) => [user, ...current])}
        schools={schools}
        token={token}
      />
      <UsersTable
        onResetPassword={(user) => setResetTarget(user)}
        schools={schools}
        users={users}
      />
      {resetTarget ? (
        <ResetPasswordModal
          onClose={() => setResetTarget(null)}
          token={token}
          user={resetTarget}
        />
      ) : null}
    </div>
  );
}

function PageState({ text }: { text: string }) {
  return (
    <section className="rounded-lg border border-[#dbe5f4] bg-white p-5 text-sm font-semibold text-[#1f4f8f] shadow-sm">
      {text}
    </section>
  );
}
