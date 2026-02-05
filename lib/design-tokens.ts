// Design Tokens - InvoiceKu Landing Page
// Consistent color palette, typography, and spacing system

// ─── COLOR PALETTE ────────────────────────────────────────────────────────────

export const colors = {
  primary: {
    500: "#4F46E5", // indigo-600 base
    400: "#6366F1", // indigo-500
    300: "#818CF8", // indigo-400
    600: "#4338CA", // indigo-700 (dark variant)
    700: "#3730A3", // indigo-800 (darker)
    50:  "#EEF2FF", // indigo-50 (light bg)
    100: "#E0E7FF", // indigo-100
  },
  accent: {
    500: "#10B981", // emerald-500 base
    400: "#34D399", // emerald-400
    600: "#059669", // emerald-600 (dark variant)
    50:  "#ECFDF5", // emerald-50
    100: "#D1FAE5", // emerald-100
  },
  neutral: {
    50:  "#F8FAFC", // slate-50
    100: "#F1F5F9", // slate-100
    200: "#E2E8F0", // slate-200
    300: "#CBD5E1", // slate-300
    400: "#94A3B8", // slate-400
    500: "#64748B", // slate-500
    600: "#475569", // slate-600
    700: "#334155", // slate-700
    800: "#1E293B", // slate-800
    900: "#0F172A", // slate-900
  },
  background: {
    white:    "#FFFFFF",
    nearWhite: "#F8FAFC",
    subtle:   "#F1F5F9",
    gradient: "linear-gradient(135deg, #EEF2FF 0%, #F8FAFC 50%, #ECFDF5 100%)",
  },
  status: {
    success: "#10B981",
    warning: "#F59E0B",
    error:   "#EF4444",
    info:    "#3B82F6",
  },
  dark: {
    bg:        "#0F172A",
    surface:   "#1E293B",
    border:    "#334155",
    text:      "#F1F5F9",
    textMuted: "#94A3B8",
  },
} as const;

// ─── TYPOGRAPHY ───────────────────────────────────────────────────────────────

export const typography = {
  fontFamily: {
    sans:  "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif",
    mono:  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
  fontSize: {
    xs:   "0.75rem",   // 12px
    sm:   "0.875rem",  // 14px
    base: "1rem",      // 16px
    lg:   "1.125rem",  // 18px
    xl:   "1.25rem",   // 20px
    "2xl": "1.5rem",   // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem",  // 36px
    "5xl": "3rem",     // 48px
    "6xl": "3.75rem",  // 60px
  },
  fontWeight: {
    normal:   "400",
    medium:   "500",
    semibold: "600",
    bold:     "700",
    extrabold:"800",
  },
  lineHeight: {
    tight:  "1.25",
    snug:   "1.375",
    normal: "1.5",
    relaxed:"1.625",
    loose:  "2",
  },
  letterSpacing: {
    tight:  "-0.025em",
    normal: "0em",
    wide:   "0.025em",
    wider:  "0.05em",
    widest: "0.1em",
  },
} as const;

// ─── SPACING ──────────────────────────────────────────────────────────────────

export const spacing = {
  0:   "0px",
  1:   "0.25rem",  // 4px
  2:   "0.5rem",   // 8px
  3:   "0.75rem",  // 12px
  4:   "1rem",     // 16px
  5:   "1.25rem",  // 20px
  6:   "1.5rem",   // 24px
  8:   "2rem",     // 32px
  10:  "2.5rem",   // 40px
  12:  "3rem",     // 48px
  16:  "4rem",     // 64px
  20:  "5rem",     // 80px
  24:  "6rem",     // 96px
  32:  "8rem",     // 128px
  section: "5rem", // default section padding
} as const;

// ─── BORDER RADIUS ────────────────────────────────────────────────────────────

export const borderRadius = {
  none:  "0px",
  sm:    "0.125rem",
  base:  "0.25rem",
  md:    "0.375rem",
  lg:    "0.5rem",
  xl:    "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  full:  "9999px",
} as const;

// ─── SHADOWS ──────────────────────────────────────────────────────────────────

export const shadows = {
  sm:  "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  base:"0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md:  "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg:  "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl:  "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl":"0 25px 50px -12px rgb(0 0 0 / 0.25)",
  inner:"inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  primaryGlow: "0 0 20px rgba(79, 70, 229, 0.3)",
  accentGlow:  "0 0 20px rgba(16, 185, 129, 0.3)",
} as const;

// ─── TRANSITIONS ─────────────────────────────────────────────────────────────

export const transitions = {
  fast:   "150ms ease",
  base:   "200ms ease",
  slow:   "300ms ease",
  slower: "500ms ease",
} as const;

// ─── BREAKPOINTS ──────────────────────────────────────────────────────────────

export const breakpoints = {
  sm:  "640px",
  md:  "768px",
  lg:  "1024px",
  xl:  "1280px",
  "2xl": "1536px",
} as const;

// ─── Z-INDEX ──────────────────────────────────────────────────────────────────

export const zIndex = {
  hide:    -1,
  auto:    "auto",
  base:    0,
  raised:  1,
  dropdown:10,
  sticky:  20,
  overlay: 30,
  modal:   40,
  toast:   50,
} as const;

// ─── ANIMATION VARIANTS (Framer Motion) ───────────────────────────────────────

export const motionVariants = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: -20 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit:    { opacity: 0 },
  },
  slideDown: {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: "auto" },
    exit:    { opacity: 0, height: 0 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit:    { opacity: 0, scale: 0.95 },
  },
  buttonTap: {
    whileHover: { scale: 1.02 },
    whileTap:   { scale: 0.98 },
  },
} as const;

// ─── CONTAINER WIDTHS ─────────────────────────────────────────────────────────

export const container = {
  sm:  "640px",
  md:  "768px",
  lg:  "1024px",
  xl:  "1280px",
  max: "1280px",
  padding: {
    mobile: "1rem",
    tablet: "2rem",
    desktop:"2rem",
  },
} as const;
