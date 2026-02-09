"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui";
import { SectionWrapper } from "@/components/layout";

// ─── CTA SECTION ──────────────────────────────────────────────────────────────

export function CTASection() {
  return (
    <SectionWrapper id="cta" background="white" noPadding>
      <div
        className="relative overflow-hidden rounded-3xl mx-4 sm:mx-0 my-16 sm:my-20 lg:my-24"
        style={{
          background:
            "linear-gradient(135deg, #4338CA 0%, #4F46E5 50%, #6366F1 100%)",
        }}
      >
        {/* Decorative blobs */}
        <div
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 blur-3xl"
          style={{ background: "#818CF8" }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-20 blur-3xl"
          style={{ background: "#10B981" }}
        />

        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative text-center px-6 py-16 sm:py-20 lg:py-24 max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" as const }}
            className="text-indigo-200 text-sm font-semibold uppercase tracking-widest mb-4"
          >
            Mulai Sekarang
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.1 }}
            className="text-white mb-5"
          >
            Siap Kelola Invoice{" "}
            <span className="text-emerald-300">Lebih Profesional?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.2 }}
            className="text-indigo-200 text-lg mb-10 max-w-xl mx-auto"
          >
            Bergabung dengan 10.000+ freelancer dan UKM Indonesia yang sudah
            lebih produktif bersama InvoiceKu.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {/* Pulsing primary CTA */}
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut" as const,
              }}
            >
              <Link href="/register">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-indigo-700 border-indigo-600 hover:bg-indigo-50 hover:border-indigo-50 shadow-lg"
                  rightIcon={<ArrowRight size={18} />}
                >
                  Mulai Gratis Sekarang
                </Button>
              </Link>
            </motion.div>

            <a href="mailto:sales@invoiceku.id">
              <Button
                size="lg"
                className="bg-transparent text-white border border-white/40 hover:bg-white/10 hover:border-white/70"
                leftIcon={<MessageCircle size={18} />}
              >
                Hubungi Sales
              </Button>
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-indigo-300 text-sm mt-6"
          >
            Tidak perlu kartu kredit · Gratis 14 hari · Batalkan kapan saja
          </motion.p>
        </div>
      </div>
    </SectionWrapper>
  );
}

export default CTASection;
