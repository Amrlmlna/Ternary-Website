import React from "react";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { Toast as ToastType } from "../src/hooks/useToast";

interface ToastProps {
  toast: ToastType;
  onRemove: (id: string) => void;
}

const toastIcons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const toastColors = {
  success: "text-green-500",
  error: "text-red-500",
  warning: "text-yellow-500",
  info: "text-blue-500",
};

export default function Toast({ toast, onRemove }: ToastProps) {
  const Icon = toastIcons[toast.type];

  return (
    <div className="neu-bg neu-shadow neu-radius p-4 border-l-4 border-current animate-fade-in">
      <div className="flex items-start gap-3">
        <Icon
          size={20}
          className={`${toastColors[toast.type]} mt-0.5 flex-shrink-0`}
        />
        <div className="flex-1">
          <p className="text-sm text-[var(--neu-text)] font-medium">
            {toast.message}
          </p>
        </div>
        <button
          onClick={() => onRemove(toast.id)}
          className="text-[var(--neu-text)] opacity-70 hover:opacity-100 transition-opacity flex-shrink-0"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
