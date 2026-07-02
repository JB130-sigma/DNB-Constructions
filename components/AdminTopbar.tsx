"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

const breadcrumbMap: Record<string, string> = {
  "/admin/dashboard":  "Dashboard",
  "/admin/projects":   "Projects",
  "/admin/labour":     "Labour Management",
  "/admin/materials":  "Materials & Inventory",
  "/admin/machinery":  "Machinery",
  "/admin/finance":    "Financial Management",
  "/admin/expenses":   "Expenses",
  "/admin/clients":    "Client Management",
  "/admin/vendors":    "Vendors & Suppliers",
  "/admin/documents":  "Document Management",
  "/admin/reports":    "Reports & Analytics",
  "/admin/users":      "User Management",
  "/admin/settings":   "Settings",
};

export default function AdminTopbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, startNavigation } = useStore();
  const title = breadcrumbMap[pathname] ?? "Admin";

  return (
    <header className="h-auto min-h-[64px] bg-white border-b border-cement-200 flex flex-wrap items-center px-4 md:px-6 gap-2 py-2 flex-shrink-0 shadow-sm">
      <div className="flex-1 min-w-0">
        <div className="hidden sm:flex items-center gap-1.5 text-[12px] text-cement-400 font-medium mb-0.5">
          <span>🏠</span> <span>DNB Constructions</span>
          <span className="text-cement-300">›</span>
          <span className="truncate">{title}</span>
        </div>
        <h1 className="text-[15px] md:text-[17px] font-extrabold text-cement-900 tracking-tight truncate">{title}</h1>
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {/* Notification bell */}
        <button className="relative w-9 h-9 rounded-lg border border-cement-200 bg-white flex items-center justify-center text-cement-500 hover:bg-cement-50 transition-colors active:scale-95 touch-manipulation">
          🔔
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
        {/* Search */}
        <button className="w-9 h-9 rounded-lg border border-cement-200 bg-white flex items-center justify-center text-cement-500 hover:bg-cement-50 transition-colors active:scale-95 touch-manipulation">
          🔍
        </button>
        {/* New Project */}
        <Link href="/admin/projects"
          onClick={() => { if (pathname !== "/admin/projects") startNavigation(); }}
          className="flex items-center gap-1.5 px-3 py-2 bg-accent text-cement-900 text-[12px] md:text-[13px] font-bold rounded-lg hover:bg-accent-dark hover:text-white transition-all active:scale-95 touch-manipulation whitespace-nowrap">
          <span>＋</span>
          <span className="hidden sm:inline">New Project</span>
        </Link>
        {/* Logout */}
        <button onClick={() => { startNavigation(); logout(); router.replace("/login"); }}
          className="w-9 h-9 md:w-auto md:px-3 md:py-2 rounded-lg border border-red-200 bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 hover:text-red-700 transition-colors active:scale-95 text-[12px] md:text-[13px] font-bold ml-2">
          <span>🚪</span>
          <span className="hidden sm:inline ml-1">Logout</span>
        </button>
      </div>
    </header>
  );
}
