"use client";

import { login } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";
import { getDashboardPath } from "@/lib/auth/routes";
import { saveAuthSession } from "@/lib/auth/storage";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function useLoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
      setError("Email dan passwordnya diisi dulu yaaa :D");
      return;
    }

    try {
      setError(null);
      setIsLoading(true);

      const session = await login({ email, password });
      saveAuthSession(session);
      router.push(getDashboardPath(session.user.role));
      router.refresh();
    } catch (loginError) {
      setError(getLoginErrorMessage(loginError));
    } finally {
      setIsLoading(false);
    }
  };

  return { error, handleSubmit, isLoading };
}

function getLoginErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    return error.message;
  }

  return "Login gagal. Silakan coba lagi.";
}
