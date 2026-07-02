"use client";
import { useState } from "react";
import Link from "next/link";
import { PROJECTS, type ProjectType } from "@/lib/data";

const filterLabels: { type: ProjectType | "all"; label: string; icon: string }[] = [
  { type: "all",            label: "All Projects",    icon: "🏗️" },
  { type: "residential",   label: "Residential",     icon: "🏠" },
  { type: "commercial",    label: "Commercial",       icon: "🏢" },
  { type: "industrial",    label: "Industrial",       icon: "🏭" },
  { type: "infrastructure",label: "Infrastructure",   icon: "🛣️" },
  { type: "government",    label: "Government",       icon: "🏛️" },
];

export default function ProjectsPage() {
  const [active, setActive] = useState<ProjectType | "all">("all");

  const filtered = active === "all" ? PROJECTS : PROJECTS.filter(p => p.type === active);

  return (
    <>
      {/* Banner */}
      <section className="bg-dark-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-[2.8rem] font-black text-white leading-tight mb-3">Our <span className="text-accent">Project Portfolio</span></h1>
          <p className="text-white/50 text-[1rem]">Browse our complete portfolio of civil construction projects across sectors.</p>
        </div>
      </section>
      <div className="hazard-stripe" />

      <section className="bg-cement-50 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {filterLabels.map(f => (
              <button key={f.type} onClick={() => setActive(f.type)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold border transition-all ${
                  active === f.type
                    ? "bg-cement-900 text-white border-cement-900"
                    : "bg-white text-cement-600 border-cement-200 hover:border-cement-400"
                }`}>
                <span>{f.icon}</span>{f.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(p => (
              <Link key={p.id} href={`/projects/${p.id}`}
                className="group bg-white border border-cement-200 rounded-2xl overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all">
                <div className="h-48 bg-cement-100 flex items-center justify-center text-7xl border-b border-cement-200 relative">
                  {p.icon}
                  <span className={`absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                    p.status === "completed" ? "bg-green-50 text-green-700 border-green-200" :
                    p.status === "delayed"   ? "bg-red-50 text-red-700 border-red-200" :
                    p.status === "on-hold"   ? "bg-gray-100 text-gray-600 border-gray-200" :
                    "bg-amber-50 text-amber-700 border-amber-200"
                  }`}>
                    {p.status === "ongoing" ? "In Progress" : p.status === "on-hold" ? "On Hold" : p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                  </span>
                  <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-1 bg-dark-800/80 text-white rounded capitalize">{p.type}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[15px] text-cement-900 mb-1">{p.name}</h3>
                  <div className="text-[12px] text-cement-400 mb-1">👤 {p.client}</div>
                  <div className="text-[12px] text-cement-400 flex items-center gap-1 mb-3">📍 {p.location}</div>
                  <div className="bg-cement-100 h-1.5 rounded-full overflow-hidden mb-2">
                    <div className="h-full rounded-full bg-gradient-to-r from-accent to-accent-dark" style={{ width: `${p.progress}%` }} />
                  </div>
                  <div className="flex justify-between text-[12px] font-medium">
                    <span className="text-cement-400">₹{(p.budget / 100).toFixed(0)} Cr</span>
                    <span className="text-cement-600 font-bold">{p.progress}%</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-cement-400 text-[14px]">
              No projects found for this filter.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
