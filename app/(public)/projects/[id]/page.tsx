import { PROJECTS } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface Props { params: Promise<{ id: string }> }

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const project = PROJECTS.find(p => p.id === id);
  if (!project) notFound();

  const spent = project.spent;
  const remaining = project.budget - spent;

  return (
    <>
      <section className="bg-dark-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-white/40 text-[13px] mb-3">
            <Link href="/projects" className="hover:text-white">Projects</Link> › {project.name}
          </div>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-[2.4rem] font-black text-white leading-tight mb-2">{project.name}</h1>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-white/50 text-[13px]">📍 {project.location}</span>
                <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                  project.status === "completed" ? "bg-green-900/30 text-green-300 border-green-800" :
                  project.status === "delayed"   ? "bg-red-900/30 text-red-300 border-red-800" :
                  "bg-amber-900/30 text-amber-300 border-amber-800"
                }`}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </span>
              </div>
            </div>
            <div className="text-4xl">{project.icon}</div>
          </div>
        </div>
      </section>
      <div className="hazard-stripe" />

      <section className="bg-cement-50 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white border border-cement-200 rounded-2xl p-6">
              <h2 className="text-[16px] font-bold text-cement-900 mb-3">Project Overview</h2>
              <p className="text-cement-600 leading-relaxed">{project.description}</p>
            </div>

            {/* Progress */}
            <div className="bg-white border border-cement-200 rounded-2xl p-6">
              <h2 className="text-[16px] font-bold text-cement-900 mb-4">Progress Tracking</h2>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] text-cement-500">Overall Completion</span>
                <span className="text-[22px] font-black text-cement-900">{project.progress}%</span>
              </div>
              <div className="bg-cement-100 h-4 rounded-full overflow-hidden mb-4">
                <div className="h-full rounded-full bg-gradient-to-r from-accent to-accent-dark transition-all" style={{ width: `${project.progress}%` }} />
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-cement-50 rounded-xl p-3">
                  <div className="text-[18px] font-black text-cement-900">₹{(spent/100).toFixed(0)}Cr</div>
                  <div className="text-[11px] text-cement-400">Spent</div>
                </div>
                <div className="bg-cement-50 rounded-xl p-3">
                  <div className="text-[18px] font-black text-cement-900">₹{(remaining/100).toFixed(0)}Cr</div>
                  <div className="text-[11px] text-cement-400">Remaining</div>
                </div>
                <div className="bg-cement-50 rounded-xl p-3">
                  <div className="text-[18px] font-black text-cement-900">{project.labourCount}</div>
                  <div className="text-[11px] text-cement-400">Workers</div>
                </div>
              </div>
            </div>

            {/* Gallery placeholder */}
            <div className="bg-white border border-cement-200 rounded-2xl p-6">
              <h2 className="text-[16px] font-bold text-cement-900 mb-4">Site Gallery</h2>
              <div className="grid grid-cols-3 gap-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-square bg-cement-100 rounded-xl flex items-center justify-center text-4xl border border-cement-200 cursor-pointer hover:border-cement-400 transition-colors">
                    {project.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar specs */}
          <div className="space-y-4">
            <div className="bg-white border border-cement-200 rounded-2xl p-5">
              <h3 className="text-[15px] font-bold text-cement-900 mb-4">Project Details</h3>
              {[
                ["Client",       project.client],
                ["Type",         project.type.charAt(0).toUpperCase() + project.type.slice(1)],
                ["Budget",       `₹${(project.budget/100).toFixed(0)} Crore`],
                ["Start Date",   formatDate(project.startDate)],
                ["End Date",     formatDate(project.endDate)],
                ["Site Manager", project.manager],
                ["Labour Count", `${project.labourCount} workers`],
              ].map(([k,v]) => (
                <div key={k} className="flex justify-between py-2.5 border-b border-cement-100 last:border-0">
                  <span className="text-[12px] text-cement-400 font-medium">{k}</span>
                  <span className="text-[13px] text-cement-900 font-semibold text-right max-w-[55%]">{v}</span>
                </div>
              ))}
            </div>

            <Link href="/contact"
              className="block w-full text-center py-3 bg-accent text-cement-900 font-bold rounded-xl hover:bg-accent-dark hover:text-white transition-all">
              📞 Enquire About This Project
            </Link>
            <Link href="/projects"
              className="block w-full text-center py-3 bg-cement-100 text-cement-700 font-semibold rounded-xl hover:bg-cement-200 transition-all">
              ← Back to Projects
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
