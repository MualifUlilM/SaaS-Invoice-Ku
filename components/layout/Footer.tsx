import React from "react";
import Link from "next/link";
import { FileText, Twitter, Linkedin, Instagram } from "lucide-react";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const footerLinks = {
  produk: [
    { label: "Fitur",       href: "/#fitur"    },
    { label: "Harga",       href: "/pricing"   },
    { label: "Testimoni",   href: "/#testimoni"},
    { label: "FAQ",         href: "/#faq"      },
  ],
  perusahaan: [
    { label: "Tentang Kami",  href: "/#hero"   },
    { label: "Daftar Gratis", href: "/register"},
    { label: "Masuk",         href: "/login"   },
    { label: "Hubungi Kami",  href: "/contact" },
  ],
  legal: [
    { label: "Kebijakan Privasi",  href: "/privacy" },
    { label: "Syarat & Ketentuan", href: "/terms"   },
  ],
};

const socialLinks = [
  { label: "Twitter / X", href: "https://twitter.com/invoiceku", icon: Twitter },
  { label: "LinkedIn",    href: "https://linkedin.com/company/invoiceku", icon: Linkedin },
  { label: "Instagram",   href: "https://instagram.com/invoiceku", icon: Instagram },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* ── Column 1: Brand ── */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 group mb-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500 text-white">
                <FileText size={16} strokeWidth={2.5} />
              </span>
              <span className="text-lg font-bold text-white tracking-tight">
                Invoice<span className="text-indigo-400">Ku</span>
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-slate-400 mb-6 max-w-xs">
              Solusi manajemen invoice terpercaya untuk freelancer dan bisnis kecil Indonesia. Buat, kirim, dan lacak invoice dengan mudah.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:bg-indigo-600 hover:text-white transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Column 2: Produk ── */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Produk
            </h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.produk.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3: Perusahaan ── */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Perusahaan
            </h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.perusahaan.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 4: Legal ── */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.legal.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            &copy; {currentYear} InvoiceKu. Seluruh hak dilindungi undang-undang.
          </p>
          <p className="text-xs text-slate-600 text-center sm:text-right">
            Dibuat dengan <span className="text-indigo-400">&#9825;</span> di Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
