"use client";

import React, { useEffect, useRef, useState } from "react";
import { X, Menu, FileText } from "lucide-react";

// ─── TYPES ────────────────────────────────────────────────────────────────────

export interface NavSection {
  id:    string;
  label: string;
}

interface LegalSidebarProps {
  sections: NavSection[];
  title:    string;
}

interface NavListProps {
  sections: NavSection[];
  activeId: string;
  onSelect: (id: string) => void;
}

function NavList({ sections, activeId, onSelect }: NavListProps) {
  return (
    <nav aria-label="Navigasi cepat kebijakan">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
        Navigasi Cepat
      </p>
      <ol className="space-y-1">
        {sections.map(({ id, label }, index) => {
          const isActive = activeId === id;
          return (
            <li key={id}>
              <button
                onClick={() => onSelect(id)}
                className={[
                  "group flex w-full items-start gap-3 rounded-lg px-3 py-2 text-left text-sm transition-all duration-150",
                  isActive
                    ? "bg-indigo-50 text-indigo-700 font-semibold"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800",
                ].join(" ")}
              >
                <span
                  className={[
                    "mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors",
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-100 text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-500",
                  ].join(" ")}
                >
                  {index + 1}
                </span>
                <span className="leading-snug">{label}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export function LegalSidebar({ sections, title }: LegalSidebarProps) {
  const [activeId,      setActiveId]      = useState<string>(sections[0]?.id ?? "");
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const observerRef                       = useRef<IntersectionObserver | null>(null);

  // ── Intersection Observer for active section tracking ──────────────────────
  useEffect(() => {
    const headingEls = sections
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (headingEls.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible heading
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold:  0,
      }
    );

    headingEls.forEach((el) => observerRef.current!.observe(el));

    return () => observerRef.current?.disconnect();
  }, [sections]);

  // ── Smooth scroll handler ──────────────────────────────────────────────────
  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 96; // height of sticky navbar + some breathing room
      const top    = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <>
      {/* ── Desktop sidebar ─────────────────────────────────────────────────── */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 w-64 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-4">
            <FileText className="h-4 w-4 text-indigo-500" />
            <span className="text-sm font-semibold text-slate-800">{title}</span>
          </div>
          <NavList sections={sections} activeId={activeId} onSelect={handleClick} />
        </div>
      </aside>

      {/* ── Mobile floating button ───────────────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50 lg:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Buka navigasi"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 active:scale-95"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* ── Mobile drawer ───────────────────────────────────────────────────── */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer panel */}
          <div className="fixed bottom-0 left-0 right-0 z-50 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-white p-6 shadow-2xl lg:hidden">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-indigo-500" />
                <span className="font-semibold text-slate-800">{title}</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Tutup navigasi"
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <NavList sections={sections} activeId={activeId} onSelect={handleClick} />
          </div>
        </>
      )}
    </>
  );
}

export default LegalSidebar;
