"use client";

import React, { useMemo } from "react";

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface PasswordStrengthProps {
  password: string;
  className?: string;
}

type StrengthLevel = 0 | 1 | 2 | 3 | 4;

interface StrengthConfig {
  label: string;
  color: string;
  bgColor: string;
  filledSegments: StrengthLevel;
}

// ─── STRENGTH LOGIC ───────────────────────────────────────────────────────────

function getStrengthLevel(password: string): StrengthLevel {
  if (!password) return 0;

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return 1;
  if (score === 2) return 2;
  if (score === 3) return 3;
  return 4;
}

const STRENGTH_CONFIG: Record<StrengthLevel, StrengthConfig> = {
  0: {
    label: "",
    color: "text-slate-400",
    bgColor: "bg-slate-200",
    filledSegments: 0,
  },
  1: {
    label: "Sangat Lemah",
    color: "text-red-500",
    bgColor: "bg-red-500",
    filledSegments: 1,
  },
  2: {
    label: "Lemah",
    color: "text-orange-500",
    bgColor: "bg-orange-400",
    filledSegments: 2,
  },
  3: {
    label: "Sedang",
    color: "text-yellow-600",
    bgColor: "bg-yellow-400",
    filledSegments: 3,
  },
  4: {
    label: "Kuat",
    color: "text-emerald-600",
    bgColor: "bg-emerald-500",
    filledSegments: 4,
  },
};

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({
  password,
  className = "",
}) => {
  const level = useMemo(() => getStrengthLevel(password), [password]);
  const config = STRENGTH_CONFIG[level];

  if (!password) return null;

  return (
    <div className={["flex flex-col gap-1.5", className].join(" ")}>
      {/* 4-segment bar */}
      <div className="flex gap-1" role="progressbar" aria-valuenow={level} aria-valuemin={0} aria-valuemax={4} aria-label={`Kekuatan password: ${config.label}`}>
        {([1, 2, 3, 4] as const).map((seg) => (
          <div
            key={seg}
            className={[
              "h-1.5 flex-1 rounded-full transition-all duration-300",
              seg <= config.filledSegments ? config.bgColor : "bg-slate-200",
            ].join(" ")}
          />
        ))}
      </div>

      {/* Label */}
      {config.label && (
        <p className={["text-xs font-medium", config.color].join(" ")}>
          {config.label}
        </p>
      )}
    </div>
  );
};

export default PasswordStrength;
