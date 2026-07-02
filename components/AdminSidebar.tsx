"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { label: "Main",       items: [
    { href: "/admin/dashboard",  icon: "📊", label: "Dashboard" },
  ]},
  { label: "Operations", items: [
    { href: "/admin/projects",   icon: "🏗️",  label: "Projects" },
    { href: "/admin/labour",     icon: "👷",  label: "Labour Management" },
    { href: "/admin/materials",  icon: "📦",  label: "Materials & Inventory" },
    { href: "/admin/machinery",  icon: "🚜",  label: "Machinery" },
  ]},
  { label: "Finance",    items: [
    { href: "/admin/finance",    icon: "📈",  label: "Financial Management" },
    { href: "/admin/expenses",   icon: "🧾",  label: "Expenses" },
  ]},
  { label: "Stakeholders", items: [
    { href: "/admin/clients",    icon: "💼",  label: "Clients" },
    { href: "/admin/vendors",    icon: "🚛",  label: "Vendors & Suppliers" },
  ]},
  { label: "Data",       items: [
    { href: "/admin/documents",  icon: "📁",  label: "Documents" },
    { href: "/admin/reports",    icon: "📋",  label: "Reports & Analytics" },
  ]},
  { label: "Admin",      items: [
    { href: "/admin/users",      icon: "👤",  label: "User Management" },
    { href: "/admin/settings",   icon: "⚙️",  label: "Settings" },
  ]},
];

import { useStore } from "@/lib/store";

export default function AdminSidebar() {
  const pathname = usePathname();
  const { currentUser, startNavigation } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavContent = () => (
    <>
      {/* Logo */}
      <div className="flex items-center justify-between gap-2.5 px-5 h-16 border-b border-white/5 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-base flex-shrink-0">🏗️</div>
          <div className="text-white font-extrabold text-[14px] leading-tight">
            DNB <span className="text-accent">Constructions</span>
          </div>
        </div>
        {/* Close button – mobile only */}
        <button
          className="md:hidden text-white/40 hover:text-white text-xl leading-none p-1 active:scale-95 transition-transform"
          onClick={() => setMobileOpen(false)}
        >✕</button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {navItems.map((group) => (
          <div key={group.label}>
            <div className="text-[10px] font-bold text-white/25 uppercase tracking-[2px] px-3 pt-3 pb-1.5">
              {group.label}
            </div>
            {group.items.map((item) => {
              const active = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}
                  onClick={() => {
                    if (!active) startNavigation();
                    setMobileOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2.5 rounded-md text-[13px] font-medium mb-0.5 transition-all border-l-[3px] touch-manipulation",
                    active
                      ? "bg-accent/15 text-accent border-accent font-bold"
                      : "text-white/55 border-transparent hover:bg-white/5 hover:text-white/85"
                  )}>
                  <span className="text-base w-5 text-center flex-shrink-0">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
        {/* Website link */}
        <div className="border-t border-white/5 mt-2 pt-2">
          <Link href="/" onClick={() => startNavigation()}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-md text-[13px] font-medium text-white/40 hover:text-white/70 border-l-[3px] border-transparent hover:bg-white/5 transition-all touch-manipulation">
            <span className="text-base w-5 text-center">🌐</span>
            <span>Public Website</span>
          </Link>
        </div>
      </nav>

      {/* User footer */}
      {currentUser && (
        <div className="border-t border-white/5 p-3 flex-shrink-0">
          <div className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-white/5 cursor-pointer touch-manipulation">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center font-bold text-sm text-white flex-shrink-0">
              {currentUser.initials}
            </div>
            <div>
              <div className="text-white text-[13px] font-semibold truncate max-w-[150px]">{currentUser.name}</div>
              <div className="text-white/40 text-[11px]">{currentUser.role}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Mobile hamburger trigger – shown in topbar area */}
      <button
        className="md:hidden fixed top-3.5 left-3 z-50 w-9 h-9 bg-dark-800 rounded-lg flex items-center justify-center text-white text-lg border border-white/10 active:scale-95 touch-manipulation"
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation"
      >☰</button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar – always visible on md+, drawer on mobile */}
      <aside className={cn(
        "fixed md:relative inset-y-0 left-0 z-50 w-[250px] flex-shrink-0 flex flex-col h-screen bg-dark-800 border-r border-white/5 transition-transform duration-300",
        mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <NavContent />
      </aside>
    </>
  );
}
