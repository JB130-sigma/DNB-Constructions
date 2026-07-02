"use client";
import { cn } from "@/lib/utils";

// ── Badge ────────────────────────────────────────────────────────────────────
interface BadgeProps { label: string; className?: string; }
export function Badge({ label, className }: BadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border",
      className
    )}>
      {label}
    </span>
  );
}

// ── StatCard ─────────────────────────────────────────────────────────────────
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  delta?: string;
  deltaUp?: boolean;
  iconClass?: string;
}
export function StatCard({ icon, label, value, delta, deltaUp, iconClass }: StatCardProps) {
  return (
    <div className="bg-white border border-cement-200 rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-shadow">
      <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-3", iconClass)}>
        {icon}
      </div>
      <div className="text-[26px] font-black text-cement-900 leading-none mb-1">{value}</div>
      <div className="text-[12px] font-medium text-cement-400">{label}</div>
      {delta && (
        <div className={cn(
          "inline-flex items-center gap-1 text-[11px] font-bold mt-2 px-2 py-0.5 rounded-full",
          deltaUp ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
        )}>
          {deltaUp ? "↑" : "↓"} {delta}
        </div>
      )}
    </div>
  );
}

// ── Card ─────────────────────────────────────────────────────────────────────
interface CardProps { children: React.ReactNode; className?: string; }
export function Card({ children, className }: CardProps) {
  return (
    <div className={cn("bg-white border border-cement-200 rounded-2xl shadow-card", className)}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: CardProps) {
  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-2 px-5 pt-5 pb-3", className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-[15px] font-bold text-cement-900">{children}</h3>;
}

export function CardBody({ children, className }: CardProps) {
  return <div className={cn("px-5 pb-5", className)}>{children}</div>;
}

// ── Progress Bar ─────────────────────────────────────────────────────────────
interface ProgressProps { value: number; className?: string; colorClass?: string; }
export function Progress({ value, className, colorClass }: ProgressProps) {
  const clr = colorClass ?? (
    value >= 80 ? "bg-green-500" : value >= 50 ? "bg-amber-500" : value >= 30 ? "bg-orange-500" : "bg-red-500"
  );
  return (
    <div className={cn("bg-cement-100 rounded-full overflow-hidden", className ?? "h-2 w-full")}>
      <div className={cn("h-full rounded-full transition-all duration-700", clr)} style={{ width: `${value}%` }} />
    </div>
  );
}

// ── Button ───────────────────────────────────────────────────────────────────
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "dark" | "ghost" | "amber" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: React.ReactNode;
}
export function Button({ variant = "dark", size = "md", fullWidth = false, children, className, ...rest }: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-1.5 font-semibold rounded-lg transition-all cursor-pointer active:scale-95 select-none whitespace-nowrap min-h-[36px] touch-manipulation";
  const sizes = {
    sm: "px-3 py-1.5 text-[12px] min-h-[32px]",
    md: "px-4 py-2 text-[13px] min-h-[38px]",
    lg: "px-6 py-3 text-[14px] min-h-[44px]",
  };
  const variants = {
    dark:   "bg-cement-900 text-white hover:bg-cement-700 disabled:opacity-50",
    ghost:  "bg-transparent text-cement-500 border border-cement-200 hover:bg-cement-50 hover:text-cement-800 disabled:opacity-50",
    amber:  "bg-accent text-cement-900 hover:bg-accent-dark hover:text-white disabled:opacity-50",
    danger: "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 disabled:opacity-50",
  };
  return (
    <button
      className={cn(base, sizes[size], variants[variant], fullWidth && "w-full", className)}
      {...rest}
    >
      {children}
    </button>
  );
}

// ── ButtonGroup ───────────────────────────────────────────────────────────────
interface ButtonGroupProps { children: React.ReactNode; className?: string; stack?: boolean; }
export function ButtonGroup({ children, className, stack = false }: ButtonGroupProps) {
  return (
    <div className={cn(
      "flex gap-2",
      stack ? "flex-col sm:flex-row" : "flex-wrap",
      className
    )}>
      {children}
    </div>
  );
}

// ── KPI Row ──────────────────────────────────────────────────────────────────
interface KpiRowProps { label: string; value: string | number; pct: number; color?: string; }
export function KpiRow({ label, value, pct, color = "#374151" }: KpiRowProps) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-cement-100 last:border-0">
      <span className="text-[13px] font-medium text-cement-700 w-36 flex-shrink-0">{label}</span>
      <div className="flex-1 h-[7px] bg-cement-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="text-[13px] font-bold w-12 text-right" style={{ color }}>{value}</span>
    </div>
  );
}

// ── Timeline Item ─────────────────────────────────────────────────────────────
interface TlItemProps { icon: string; title: string; sub: string; type?: "done" | "active" | "pending"; }
export function TlItem({ icon, title, sub, type = "pending" }: TlItemProps) {
  const dotClass = {
    done:    "bg-green-50 text-green-600",
    active:  "bg-amber-50 text-amber-600",
    pending: "bg-cement-100 text-cement-400 border border-cement-200",
  }[type];
  return (
    <div className="flex gap-3.5 pb-5 relative last:pb-0">
      <div className="relative">
        <div className={cn("w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-sm", dotClass)}>
          {icon}
        </div>
        <div className="absolute left-3.5 top-7 bottom-0 w-px bg-cement-100 last:hidden" />
      </div>
      <div>
        <div className="text-[13px] font-semibold text-cement-900 leading-snug">{title}</div>
        <div className="text-[12px] text-cement-400 mt-0.5">{sub}</div>
      </div>
    </div>
  );
}

// ── Section Header ────────────────────────────────────────────────────────────
interface SectionHeaderProps { tag: string; title: string; sub?: string; }
export function SectionHeader({ tag, title, sub }: SectionHeaderProps) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-[3px] bg-accent rounded" />
        <span className="text-[11px] font-extrabold text-accent-dark uppercase tracking-[3px]">{tag}</span>
      </div>
      <h2 className="text-[2.2rem] font-black text-cement-900 leading-tight tracking-tight">{title}</h2>
      {sub && <p className="text-cement-500 text-[1rem] mt-2 max-w-xl leading-relaxed">{sub}</p>}
    </div>
  );
}
