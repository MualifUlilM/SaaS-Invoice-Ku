"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

interface RootShellProps {
  children: React.ReactNode;
}

const HIDDEN_CHROME_PREFIXES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/auth",
  "/dashboard",
  "/clients",
  "/invoices",
  "/settings",
  "/analytics",
  "/onboarding",
] as const;

function shouldShowMarketingChrome(pathname: string): boolean {
  return !HIDDEN_CHROME_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export function RootShell({ children }: RootShellProps) {
  const pathname = usePathname();
  const showMarketingChrome = shouldShowMarketingChrome(pathname);

  return (
    <div className="flex min-h-screen flex-col">
      {showMarketingChrome ? <Navbar /> : null}
      <main className={["flex-1", showMarketingChrome ? "pt-16" : ""].join(" ")}>
        {children}
      </main>
      {showMarketingChrome ? <Footer /> : null}
    </div>
  );
}

export default RootShell;
