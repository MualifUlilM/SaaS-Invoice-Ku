import React from "react";

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?:      string;
  error?:      string;
  helperText?: string;
  leftIcon?:   React.ReactNode;
  rightIcon?:  React.ReactNode;
  inputSize?:  "sm" | "md" | "lg";
  className?:  string;
}

// ─── STYLE MAPS ───────────────────────────────────────────────────────────────

const inputSizeStyles = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-3.5 py-2.5 text-sm",
  lg: "px-4 py-3 text-base",
} as const;

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      inputSize = "md",
      className = "",
      id,
      ...inputProps
    },
    ref
  ) => {
    const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
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
              <span className="ml-1 text-red-500" aria-hidden="true">*</span>
            )}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative flex items-center">
          {/* Left icon */}
          {leftIcon && (
            <span className="absolute left-3 flex items-center justify-center text-slate-400 pointer-events-none">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={[
              "w-full rounded-lg border bg-white text-slate-900",
              "placeholder:text-slate-400",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-offset-0",
              hasError
                ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                : "border-slate-300 hover:border-slate-400 focus:border-indigo-500 focus:ring-indigo-100",
              inputProps.disabled
                ? "bg-slate-50 text-slate-400 cursor-not-allowed"
                : "",
              leftIcon  ? "pl-10" : "",
              rightIcon ? "pr-10" : "",
              inputSizeStyles[inputSize],
              className,
            ].join(" ")}
            {...inputProps}
          />

          {/* Right icon */}
          {rightIcon && (
            <span className="absolute right-3 flex items-center justify-center text-slate-400">
              {rightIcon}
            </span>
          )}
        </div>

        {/* Error message */}
        {hasError && (
          <p className="text-xs text-red-600 flex items-center gap-1" role="alert">
            {error}
          </p>
        )}

        {/* Helper text */}
        {!hasError && helperText && (
          <p className="text-xs text-slate-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
