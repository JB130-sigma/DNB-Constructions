import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(amount: number = 0, compact = false): string {
  const val = Number(amount) || 0;
  if (compact) {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`;
    if (val >= 100000)   return `₹${(val / 100000).toFixed(1)}L`;
    if (val >= 1000)     return `₹${(val / 1000).toFixed(0)}K`;
    return `₹${val.toLocaleString("en-IN")}`;
  }
  return `₹${val.toLocaleString("en-IN")}`;
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export function statusColor(status: string): string {
  const map: Record<string, string> = {
    approved: "bg-green-50 text-green-700 border-green-200",
    paid:     "bg-green-50 text-green-700 border-green-200",
    active:   "bg-green-50 text-green-700 border-green-200",
    running:  "bg-green-50 text-green-700 border-green-200",
    present:  "bg-green-50 text-green-700 border-green-200",
    completed:"bg-green-50 text-green-700 border-green-200",
    pending:  "bg-yellow-50 text-yellow-700 border-yellow-200",
    "on-track":"bg-yellow-50 text-yellow-700 border-yellow-200",
    ongoing:  "bg-blue-50 text-blue-700 border-blue-200",
    sent:     "bg-blue-50 text-blue-700 border-blue-200",
    "in-progress":"bg-blue-50 text-blue-700 border-blue-200",
    overdue:  "bg-red-50 text-red-700 border-red-200",
    delayed:  "bg-red-50 text-red-700 border-red-200",
    breakdown:"bg-red-50 text-red-700 border-red-200",
    rejected: "bg-red-50 text-red-700 border-red-200",
    absent:   "bg-red-50 text-red-700 border-red-200",
    "on-hold":"bg-gray-100 text-gray-600 border-gray-200",
    idle:     "bg-gray-100 text-gray-600 border-gray-200",
    "half-day":"bg-orange-50 text-orange-700 border-orange-200",
    overtime: "bg-purple-50 text-purple-700 border-purple-200",
    maintenance:"bg-yellow-50 text-yellow-700 border-yellow-200",
    "on-notice":"bg-orange-50 text-orange-700 border-orange-200",
    blacklisted:"bg-red-50 text-red-700 border-red-200",
  };
  return map[status] ?? "bg-gray-100 text-gray-500 border-gray-200";
}

export function progressColor(pct: number): string {
  if (pct >= 80) return "bg-green-500";
  if (pct >= 50) return "bg-amber-500";
  if (pct >= 30) return "bg-orange-500";
  return "bg-red-500";
}
