"use client";

import { ActionProvider } from "@/contexts/ActionsContext";
import { AuthProvider } from "@/contexts/AuthContext";
import React from "react";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ActionProvider>
        {children}
        <Toaster position="top-right" />
      </ActionProvider>
    </AuthProvider>
  );
}