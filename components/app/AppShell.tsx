"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart2,
  Bell,
  Building2,
  ChevronUp,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Users,
  X,
} from "lucide-react";

interface AppShellProps {
  children: React.ReactNode;
  businessName?: string | null;
  userName?: string | null;
  userEmail?: string | null;
}

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/invoices", label: "Invoices", icon: FileText },
  { href: "/clients", label: "Clients", icon: Users },
  { href: "/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/settings/business", label: "Profil Bisnis", icon: Building2 },
];

function isOnboarding(pathname: string) {
  return pathname.startsWith("/onboarding");
}

function isPrintPage(pathname: string) {
  return pathname.includes("/print");
}

function getInitials(name?: string | null): string {
  if (!name) return "U";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function ProfileMenu({
  userName,
  userEmail,
  onClose,
}: {
  userName?: string | null;
  userEmail?: string | null;
  onClose?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const initials = getInitials(userName);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative px-3 py-3 border-t border-slate-200">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-slate-700 hover:bg-slate-100"
      >
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white text-xs font-semibold select-none">
          {initials}
        </div>
        <div className="min-w-0 flex-1 text-left">
          <p className="truncate text-sm font-medium text-slate-900">
            {userName || "User"}
          </p>
          {userEmail && (
            <p className="truncate text-xs text-slate-500">{userEmail}</p>
          )}
        </div>
        <ChevronUp
          size={14}
          className={`shrink-0 text-slate-400 transition-transform duration-200 ${open ? "rotate-0" : "rotate-180"}`}
        />
      </button>

      {open && (
        <div className="absolute bottom-full left-3 right-3 mb-1 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50">
          <Link
            href="/settings/account"
            onClick={() => {
              setOpen(false);
              onClose?.();
            }}
            className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Settings size={15} className="text-slate-400" />
            <span>Pengaturan Akun</span>
          </Link>
          <div className="border-t border-slate-100" />
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut size={15} />
              <span>Log out</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

function SidebarNav({
  pathname,
  onNavClick,
  userName,
  userEmail,
}: {
  pathname: string;
  onNavClick?: () => void;
  userName?: string | null;
  userEmail?: string | null;
}) {
  return (
    <>
      {/* Logo */}
      <div className="p-4 border-b border-slate-200">
        <Link
          href="/dashboard"
          className="flex items-center gap-2"
          onClick={onNavClick}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <FileText size={16} strokeWidth={2.5} />
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Invoice<span className="text-indigo-600">Ku</span>
          </span>
        </Link>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-0.5" aria-label="App navigation">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavClick}
              className={[
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                isActive
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-800",
              ].join(" ")}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Profile + dropdown at bottom */}
      <ProfileMenu
        userName={userName}
        userEmail={userEmail}
        onClose={onNavClick}
      />
    </>
  );
}

export function AppShell({
  children,
  businessName: _businessName,
  userName,
  userEmail,
}: AppShellProps) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (isOnboarding(pathname) || isPrintPage(pathname)) {
    return <div className="min-h-screen bg-slate-50">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col fixed top-0 left-0 h-full w-55 z-20 bg-white border-r border-slate-200">
        <SidebarNav
          pathname={pathname}
          userName={userName}
          userEmail={userEmail}
        />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile sidebar drawer */}
      <aside
        className={[
          "fixed top-0 left-0 h-full w-55 z-40 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 lg:hidden",
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <Link
            href="/dashboard"
            className="flex items-center gap-2"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <FileText size={16} strokeWidth={2.5} />
            </span>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Invoice<span className="text-indigo-600">Ku</span>
            </span>
          </Link>
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="p-1 rounded-lg text-slate-500 hover:bg-slate-100"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5" aria-label="App navigation">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileSidebarOpen(false)}
                className={[
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-800",
                ].join(" ")}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <ProfileMenu
          userName={userName}
          userEmail={userEmail}
          onClose={() => setMobileSidebarOpen(false)}
        />
      </aside>

      {/* Main content area */}
      <div className="lg:ml-55 min-h-screen bg-slate-50 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between gap-4 sticky top-0 z-10">
          {/* Left: hamburger (mobile only) */}
          <button
            className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
            onClick={() => setMobileSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Right: notification bell only */}
          <button
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={18} />
          </button>
        </header>

        {/* Page content */}
        <main className="p-6 flex-1">{children}</main>
      </div>
    </div>
  );
}

export default AppShell;
