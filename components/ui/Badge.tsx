import React from "react";

// ─── TYPES ────────────────────────────────────────────────────────────────────

type BadgeVariant = "default" | "success" | "warning" | "info" | "danger";

interface BadgeProps {
  variant?:  BadgeVariant;
  children:  React.ReactNode;
  className?: string;
}

// ─── STYLE MAPS ───────────────────────────────────────────────────────────────

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-slate-100 text-slate-700 ring-slate-200",
  success: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  warning: "bg-amber-50 text-amber-700 ring-amber-200",
  info:    "bg-indigo-50 text-indigo-700 ring-indigo-200",
  danger:  "bg-red-50 text-red-700 ring-red-200",
};

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export function Badge({ variant = "default", children, className = "" }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1",
        "px-2.5 py-0.5",
        "text-xs font-medium",
        "rounded-full",
        "ring-1 ring-inset",
        variantStyles[variant],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}

export default Badge;
