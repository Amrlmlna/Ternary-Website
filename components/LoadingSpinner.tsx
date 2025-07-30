import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

export default function LoadingSpinner({
  size = "md",
  text,
  className = "",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`neu-shadow-inset neu-radius flex items-center justify-center ${sizeClasses[size]}`}
      >
        <Loader2
          size={size === "sm" ? 16 : size === "md" ? 24 : 32}
          className="animate-spin text-accent"
        />
      </div>
      {text && (
        <p className="mt-2 text-sm text-[var(--neu-text)] opacity-70">{text}</p>
      )}
    </div>
  );
}
