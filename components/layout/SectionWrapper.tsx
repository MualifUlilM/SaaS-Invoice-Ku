import React from "react";

// ─── TYPES ────────────────────────────────────────────────────────────────────

type BackgroundVariant = "white" | "gray" | "gradient";

interface SectionWrapperProps {
  children:    React.ReactNode;
  id?:         string;
  className?:  string;
  background?: BackgroundVariant;
  noPadding?:  boolean;
}

// ─── STYLE MAPS ───────────────────────────────────────────────────────────────

const backgroundStyles: Record<BackgroundVariant, string> = {
  white:    "bg-white",
  gray:     "bg-slate-50",
  gradient: "bg-gradient-to-br from-indigo-50 via-white to-emerald-50",
};

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export function SectionWrapper({
  children,
  id,
  className   = "",
  background  = "white",
  noPadding   = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={[
        backgroundStyles[background],
        className,
      ].join(" ")}
    >
      <div
        className={[
          "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
          !noPadding ? "py-16 sm:py-20 lg:py-24" : "",
        ].join(" ")}
      >
        {children}
      </div>
    </section>
  );
}

export default SectionWrapper;
