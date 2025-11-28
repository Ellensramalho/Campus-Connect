"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PrivateGuard({ children }: { children: React.ReactNode }) {
  const { token, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !token) {
      router.replace("/account");
    }
  }, [loading, token]);

  if (loading) return <div>Carregando...</div>;
  if (!token) return null;

  return children;
}
