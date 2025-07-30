import React from "react";
import { AlertCircle, X } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
  className?: string;
}

export default function ErrorMessage({
  message,
  onClose,
  className = "",
}: ErrorMessageProps) {
  return (
    <div
      className={`neu-bg neu-shadow neu-radius p-4 border-l-4 border-red-500 ${className}`}
    >
      <div className="flex items-start gap-3">
        <AlertCircle size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm text-[var(--neu-text)] font-medium">
            {message}
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-[var(--neu-text)] opacity-70 hover:opacity-100 transition-opacity flex-shrink-0"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
