"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface NavLink {
  label:   string;
  href:    string;
  hash?:   string; // anchor id on homepage (tanpa #)
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const navLinks: NavLink[] = [
  { label: "Home",   href: "/"          },
  { label: "Fitur",  href: "/#fitur",   hash: "fitur"  },
  { label: "Harga",  href: "/pricing"   },
  { label: "Kontak", href: "/contact"   },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export function Navbar() {
  const [isScrolled,    setIsScrolled]    = useState(false);
  const [isMobileOpen,  setIsMobileOpen]  = useState(false);
  const [activeHash,    setActiveHash]    = useState<string>("");
  const pathname = usePathname();

  // ── Scroll → sticky shadow + blur ──────────────────────────────────────────
  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 10);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // ── Close mobile menu on route change ──────────────────────────────────────
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // ── IntersectionObserver → active hash section ─────────────────────────────
  useEffect(() => {
    if (pathname !== "/") {
      setActiveHash("");
      return;
    }

    const sectionIds = navLinks
      .filter((l) => l.hash)
      .map((l) => l.hash as string);

    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveHash(id);
          }
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [pathname]);

  // ── Programmatic smooth scroll for hash links ─────────────────────────────
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, link: NavLink) => {
      if (!link.hash) return;

      // Jika sudah di homepage, scroll langsung tanpa navigasi ulang
      if (pathname === "/") {
        e.preventDefault();
        const el = document.getElementById(link.hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          setActiveHash(link.hash);
        }
      }
      // Jika di halaman lain, biarkan Next.js Link navigasi ke /#hash
    },
    [pathname]
  );

  // ── Active state ───────────────────────────────────────────────────────────
  const isActive = (link: NavLink): boolean => {
    if (link.hash) {
      return pathname === "/" && activeHash === link.hash;
    }
    if (link.href === "/") {
      return pathname === "/" && activeHash === "";
    }
    return pathname.startsWith(link.href);
  };

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50",
        "transition-all duration-300 ease-out",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/60"
          : "bg-white/70 backdrop-blur-sm",
      ].join(" ")}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="InvoiceKu - Halaman Utama"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm group-hover:bg-indigo-700 transition-colors duration-200">
              <FileText size={16} strokeWidth={2.5} />
            </span>
            <span className="text-lg font-bold text-slate-900 tracking-tight">
              Invoice<span className="text-indigo-600">Ku</span>
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={[
                  "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive(link)
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
                ].join(" ")}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ── Desktop CTA ── */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Masuk</Button>
            </Link>
            <Link href="/register">
              <Button variant="primary" size="sm">Daftar Gratis</Button>
            </Link>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setIsMobileOpen((prev) => !prev)}
            className="md:hidden flex items-center justify-center h-9 w-9 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors duration-200"
            aria-label={isMobileOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={isMobileOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{   rotate:  90,  opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={20} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate:  90, opacity: 0 }}
                  animate={{ rotate:  0,  opacity: 1 }}
                  exit={{   rotate: -90,  opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={20} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu (slide-down) ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{   opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden md:hidden bg-white border-t border-slate-200 shadow-lg"
          >
            <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link);
                    setIsMobileOpen(false);
                  }}
                  className={[
                    "px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive(link)
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-100",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile CTA */}
              <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2">
                <Link href="/login" className="w-full">
                  <Button variant="secondary" size="md" className="w-full">Masuk</Button>
                </Link>
                <Link href="/register" className="w-full">
                  <Button variant="primary" size="md" className="w-full">Daftar Gratis</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
