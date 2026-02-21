"use client";

import React, { useState, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
  helperText?: string;
  inputSize?: "sm" | "md" | "lg";
}

// ─── STYLE MAPS ───────────────────────────────────────────────────────────────

const inputSizeStyles = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-3.5 py-2.5 text-sm",
  lg: "px-4 py-3 text-base",
} as const;

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      label,
      error,
      helperText,
      inputSize = "md",
      className = "",
      id,
      ...inputProps
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputId =
      id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : "password");
    const hasError = Boolean(error);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-slate-700"
          >
            {label}
            {inputProps.required && (
              <span className="ml-1 text-red-500" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative flex items-center">
          <input
            ref={ref}
            id={inputId}
            type={showPassword ? "text" : "password"}
            className={[
              "w-full rounded-lg border bg-white text-slate-900",
              "placeholder:text-slate-400",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-offset-0",
              "pr-10",
              hasError
                ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                : "border-slate-300 hover:border-slate-400 focus:border-indigo-500 focus:ring-indigo-100",
              inputProps.disabled
                ? "bg-slate-50 text-slate-400 cursor-not-allowed"
                : "",
              inputSizeStyles[inputSize],
              className,
            ].join(" ")}
            {...inputProps}
          />

          {/* Show/hide toggle */}
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
            className="absolute right-3 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors duration-150 focus:outline-none"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff size={16} />
            ) : (
              <Eye size={16} />
            )}
          </button>
        </div>

        {/* Error message */}
        {hasError && (
          <p className="text-xs text-red-600 flex items-center gap-1" role="alert">
            {error}
          </p>
        )}

        {/* Helper text */}
        {!hasError && helperText && (
          <p className="text-xs text-slate-500">{helperText}</p>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
