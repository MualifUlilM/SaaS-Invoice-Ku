import React from "react";

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface LegalSectionProps {
  id:       string;
  title:    string;
  children: React.ReactNode;
}

interface LegalHeading3Props {
  children: React.ReactNode;
}

interface LegalParagraphProps {
  children: React.ReactNode;
  className?: string;
}

interface LegalListProps {
  items:    React.ReactNode[];
  ordered?: boolean;
}

interface LegalContentProps {
  children: React.ReactNode;
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

/** Top-level section with h2 heading and anchor id */
export function LegalSection({ id, title, children }: LegalSectionProps) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="mb-4 border-b border-indigo-100 pb-3 text-xl font-bold text-indigo-700 sm:text-2xl">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

/** Sub-section heading (h3) */
export function LegalHeading3({ children }: LegalHeading3Props) {
  return (
    <h3 className="mt-6 mb-2 text-base font-semibold text-slate-800 sm:text-lg">
      {children}
    </h3>
  );
}

/** Body paragraph */
export function LegalParagraph({ children, className = "" }: LegalParagraphProps) {
  return (
    <p className={["text-sm leading-relaxed text-slate-600 sm:text-base", className].join(" ")}>
      {children}
    </p>
  );
}

/** Unordered or ordered list with consistent styling */
export function LegalList({ items, ordered = false }: LegalListProps) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag
      className={[
        "space-y-2 pl-1 text-sm leading-relaxed text-slate-600 sm:text-base",
        ordered ? "list-none" : "list-none",
      ].join(" ")}
    >
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          {ordered ? (
            <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600">
              {i + 1}
            </span>
          ) : (
            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-400" />
          )}
          <span>{item}</span>
        </li>
      ))}
    </Tag>
  );
}

/** Highlighted info/note box */
export function LegalNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-800">
      {children}
    </div>
  );
}

/** Outer wrapper — max-width prose, consistent spacing between sections */
export function LegalContent({ children }: LegalContentProps) {
  return (
    <div className="min-w-0 flex-1">
      <div className="mx-auto max-w-3xl space-y-12">{children}</div>
    </div>
  );
}

export default LegalContent;
