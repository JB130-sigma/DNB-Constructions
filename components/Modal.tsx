"use client";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function Modal({ open, onClose, title, children, size = "md" }: ModalProps) {
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const widths = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Panel */}
      <div className={cn(
        "relative w-full bg-white shadow-modal flex flex-col",
        "rounded-t-2xl sm:rounded-2xl",
        "max-h-[92dvh] sm:max-h-[88dvh]",
        widths[size]
      )}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-cement-200 flex-shrink-0">
          <h2 className="text-[16px] font-extrabold text-cement-900">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-cement-100 flex items-center justify-center text-cement-500 hover:bg-cement-200 transition-colors text-sm font-bold active:scale-95"
          >✕</button>
        </div>
        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-5 py-4">
          {children}
        </div>
      </div>
    </div>
  );
}

// ── Reusable form helpers ─────────────────────────────────────────────────────
export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block text-[11px] font-bold text-cement-400 uppercase tracking-wide mb-1.5">{label}</label>
      {children}
    </div>
  );
}

export const inputCls = "w-full bg-cement-50 border border-cement-200 rounded-lg px-3 py-2.5 text-[13px] text-cement-900 focus:outline-none focus:border-cement-500 focus:bg-white transition-colors";
export const selectCls = "w-full bg-cement-50 border border-cement-200 rounded-lg px-3 py-2.5 text-[13px] text-cement-900 focus:outline-none focus:border-cement-500 focus:bg-white transition-colors";

export function FormGrid({ children, cols = 2 }: { children: React.ReactNode; cols?: number }) {
  return (
    <div className={cn(
      "grid gap-x-4",
      cols === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-3"
    )}>
      {children}
    </div>
  );
}

export function SubmitRow({ onCancel, label = "Save" }: { onCancel: () => void; label?: string }) {
  return (
    <div className="flex flex-col-reverse sm:flex-row gap-2 pt-2 border-t border-cement-100 mt-4">
      <button
        type="button"
        onClick={onCancel}
        className="flex-1 py-2.5 rounded-xl border border-cement-200 text-cement-600 text-[13px] font-semibold hover:bg-cement-50 transition-all active:scale-95"
      >Cancel</button>
      <button
        type="submit"
        className="flex-1 py-2.5 rounded-xl bg-cement-900 text-white text-[13px] font-bold hover:bg-cement-700 transition-all active:scale-95"
      >💾 {label}</button>
    </div>
  );
}
