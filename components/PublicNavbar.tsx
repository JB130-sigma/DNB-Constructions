"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function PublicNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-dark-800 border-b-2 border-accent shadow-lg">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center text-lg">🏗️</div>
          <span className="text-white font-extrabold text-[18px] tracking-tight">
            DNB <span className="text-accent">Constructions</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className={cn(
                "text-[13px] font-medium transition-colors",
                pathname === l.href ? "text-accent" : "text-white/60 hover:text-accent"
              )}>
              {l.label}
            </Link>
          ))}
        
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-white/60 text-xl" onClick={() => setOpen(v => !v)}>☰</button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-dark-700 border-t border-white/5 px-6 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="text-white/70 text-[14px] font-medium hover:text-accent">{l.label}</Link>
          ))}
          <Link href="/admin/dashboard" onClick={() => setOpen(false)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent text-cement-900 text-[13px] font-bold rounded-lg w-max">
            🔒 Admin Portal
          </Link>
        </div>
      )}
    </nav>
  );
}
