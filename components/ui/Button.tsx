"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";

// ─── TYPES ────────────────────────────────────────────────────────────────────

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize    = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?:   ButtonVariant;
  size?:      ButtonSize;
  isLoading?: boolean;
  leftIcon?:  React.ReactNode;
  rightIcon?: React.ReactNode;
  children:   React.ReactNode;
  disabled?:  boolean;
  className?: string;
}

// ─── STYLE MAPS ───────────────────────────────────────────────────────────────

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    "bg-indigo-600 text-white border border-indigo-600",
    "hover:bg-indigo-700 hover:border-indigo-700",
    "disabled:bg-indigo-300 disabled:border-indigo-300 disabled:cursor-not-allowed",
    "shadow-sm hover:shadow-md",
  ].join(" "),

  secondary: [
    "bg-transparent text-indigo-600 border border-indigo-600",
    "hover:bg-indigo-50",
    "disabled:text-indigo-300 disabled:border-indigo-300 disabled:cursor-not-allowed",
  ].join(" "),

  ghost: [
    "bg-transparent text-slate-600 border border-transparent",
    "hover:bg-slate-100 hover:text-slate-900",
    "disabled:text-slate-300 disabled:cursor-not-allowed",
  ].join(" "),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-sm px-3 py-1.5 gap-1.5 rounded-md",
  md: "text-sm px-4 py-2.5 gap-2 rounded-lg",
  lg: "text-base px-6 py-3 gap-2.5 rounded-xl",
};

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant    = "primary",
      size       = "md",
      isLoading  = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      className  = "",
      ...motionProps
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <motion.button
        ref={ref}
        whileHover={!isDisabled ? { scale: 1.02 } : undefined}
        whileTap={!isDisabled ? { scale: 0.98 } : undefined}
        transition={{ duration: 0.15, ease: "easeOut" }}
        disabled={isDisabled}
        className={[
          "inline-flex items-center justify-center font-medium",
          "transition-all duration-200 ease-out",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
          "select-none",
          variantStyles[variant],
          sizeStyles[size],
          className,
        ].join(" ")}
        {...motionProps}
      >
        {isLoading ? (
          <Loader2 className="animate-spin shrink-0" size={size === "sm" ? 14 : size === "lg" ? 18 : 16} />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}

        <span>{children}</span>

        {!isLoading && rightIcon && (
          <span className="shrink-0">{rightIcon}</span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
