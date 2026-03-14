"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface GoogleOAuthButtonProps {
  onClick?: () => void | Promise<void>;
  className?: string;
}

// ─── GOOGLE SVG LOGO ──────────────────────────────────────────────────────────

const GoogleLogo = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M17.64 9.2045C17.64 8.5663 17.5827 7.9527 17.4764 7.3636H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8196H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.2045Z"
      fill="#4285F4"
    />
    <path
      d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8196L12.0477 13.5614C11.2418 14.1014 10.2109 14.4204 9 14.4204C6.65591 14.4204 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z"
      fill="#34A853"
    />
    <path
      d="M3.96409 10.71C3.78409 10.17 3.68182 9.5932 3.68182 9C3.68182 8.4068 3.78409 7.83 3.96409 7.29V4.9582H0.957275C0.347727 6.1732 0 7.5477 0 9C0 10.4523 0.347727 11.8268 0.957275 13.0418L3.96409 10.71Z"
      fill="#FBBC05"
    />
    <path
      d="M9 3.5795C10.3214 3.5795 11.5077 4.0336 12.4405 4.9255L15.0218 2.3441C13.4632 0.8918 11.4259 0 9 0C5.48182 0 2.43818 2.0168 0.957275 4.9582L3.96409 7.29C4.67182 5.1627 6.65591 3.5795 9 3.5795Z"
      fill="#EA4335"
    />
  </svg>
);

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export const GoogleOAuthButton: React.FC<GoogleOAuthButtonProps> = ({
  onClick,
  className = "",
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      if (onClick) {
        await onClick();
      } else {
        // Simulate async until OAuth provider is connected
        await new Promise((res) => setTimeout(res, 1500));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      className={[
        "w-full flex items-center justify-center gap-3",
        "px-4 py-2.5 rounded-lg",
        "border border-slate-300 bg-white",
        "text-sm font-medium text-slate-700",
        "transition-all duration-200",
        "hover:bg-slate-50 hover:shadow-md hover:border-slate-400",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        className,
      ].join(" ")}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-slate-500" />
      ) : (
        <GoogleLogo />
      )}
      <span>Lanjutkan dengan Google</span>
    </button>
  );
};

export default GoogleOAuthButton;
