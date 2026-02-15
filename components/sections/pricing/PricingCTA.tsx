"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui";

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export function PricingCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 py-20 sm:py-24">
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-indigo-500/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-indigo-200 text-sm font-semibold uppercase tracking-widest mb-3">
            Butuh bantuan memilih?
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Masih bingung? Hubungi tim kami
          </h2>
          <p className="text-indigo-200 text-lg mb-10 max-w-xl mx-auto">
            Tim kami siap membantu Anda menemukan paket yang paling sesuai
            dengan kebutuhan dan anggaran bisnis Anda.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              leftIcon={<MessageCircle size={20} />}
              className="bg-white text-indigo-700 border-white hover:bg-indigo-50 hover:border-indigo-50"
              onClick={() =>
                window.open(
                  "https://wa.me/6281234567890?text=Halo%20InvoiceKu%2C%20saya%20ingin%20tanya%20tentang%20paket%20harga.",
                  "_blank"
                )
              }
            >
              Chat via WhatsApp
            </Button>

            <Button
              variant="ghost"
              size="lg"
              leftIcon={<CalendarDays size={20} />}
              className="text-white border-white/40 hover:bg-white/10 hover:border-white/60"
              onClick={() =>
                window.open("https://cal.com/invoiceku/demo", "_blank")
              }
            >
              Jadwalkan Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default PricingCTA;
