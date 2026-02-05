import React from "react";

// ─── TYPES ────────────────────────────────────────────────────────────────────

type CardVariant = "default" | "outlined" | "elevated";

interface CardProps {
  variant?:  CardVariant;
  children:  React.ReactNode;
  className?: string;
  id?:       string;
}

// ─── STYLE MAPS ───────────────────────────────────────────────────────────────

const variantStyles: Record<CardVariant, string> = {
  default:  "bg-white shadow-sm border border-slate-100",
  outlined: "bg-white border border-slate-200",
  elevated: "bg-white shadow-lg border border-slate-100",
};

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export function Card({ variant = "default", children, className = "", id }: CardProps) {
  return (
    <div
      id={id}
      className={[
        "rounded-2xl p-6",
        variantStyles[variant],
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

interface CardHeaderProps {
  children:   React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return (
    <div className={["mb-4", className].join(" ")}>
      {children}
    </div>
  );
}

export function CardBody({ children, className = "" }: CardHeaderProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = "" }: CardHeaderProps) {
  return (
    <div className={["mt-4 pt-4 border-t border-slate-100", className].join(" ")}>
      {children}
    </div>
  );
}

export default Card;
