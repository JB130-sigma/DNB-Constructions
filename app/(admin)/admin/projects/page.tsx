"use client";
import { useState } from "react";
import { useStore, nextId } from "@/lib/store";
import { StatCard, Card, CardHeader, CardTitle, CardBody, Progress, Button } from "@/components/ui";
import Modal, { Field, FormGrid, inputCls, selectCls, SubmitRow } from "@/components/Modal";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import type { Project, ProjectType, ProjectStatus } from "@/lib/data";

const PROJECT_TYPES: ProjectType[]   = ["residential","commercial","industrial","infrastructure","government"];
const PROJECT_STATUS: ProjectStatus[] = ["ongoing","completed","delayed","on-hold"];

export default function ProjectsAdminPage() {
  const { projects, addProject, deleteProject } = useStore();
  const [open, setOpen]   = useState(false);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = projects.filter(p =>
    (typeFilter === "all" || p.type === typeFilter) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.client.toLowerCase().includes(search.toLowerCase()))
  );

  const active    = projects.filter(p => p.status === "ongoing").length;
  const completed = projects.filter(p => p.status === "completed").length;
  const delayed   = projects.filter(p => p.status === "delayed").length;
  const onHold    = projects.filter(p => p.status === "on-hold").length;

  // Form state
  const [form, setForm] = useState({
    name: "", client: "", location: "", type: "commercial" as ProjectType,
    status: "ongoing" as ProjectStatus, budget: "", manager: "", description: "",
    startDate: "", endDate: "", progress: "0", labourCount: "0",
  });
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const icons: Record<ProjectType, string> = { residential:"🏠", commercial:"🏢", industrial:"🏭", infrastructure:"🛣️", government:"🏛️" };
    addProject({
      id: nextId("P", projects),
      name: form.name, client: form.client, location: form.location,
      type: form.type, status: form.status,
      budget: Number(form.budget) || 0, spent: 0,
      progress: Number(form.progress) || 0,
      startDate: form.startDate || new Date().toISOString().slice(0,10),
      endDate: form.endDate || "",
      manager: form.manager, description: form.description,
      labourCount: Number(form.labourCount) || 0,
      icon: icons[form.type],
    });
    setOpen(false);
    setForm({ name:"",client:"",location:"",type:"commercial",status:"ongoing",budget:"",manager:"",description:"",startDate:"",endDate:"",progress:"0",labourCount:"0" });
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard icon="🏗️" label="Active"    value={String(active)}    iconClass="bg-blue-50 text-blue-600" />
        <StatCard icon="✅" label="Completed" value={String(completed)} iconClass="bg-green-50 text-green-600" />
        <StatCard icon="⏰" label="Delayed"   value={String(delayed)}   iconClass="bg-red-50 text-red-600" />
        <StatCard icon="⏸️" label="On Hold"   value={String(onHold)}    iconClass="bg-gray-100 text-gray-500" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Projects ({filtered.length})</CardTitle>
          <div className="flex flex-wrap gap-2">
            <input value={search} onChange={e => setSearch(e.target.value)}
              className="px-3 py-1.5 text-[12px] border border-cement-200 rounded-lg bg-white text-cement-600 focus:outline-none w-40"
              placeholder="🔍 Search…" />
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
              className="px-3 py-1.5 text-[12px] border border-cement-200 rounded-lg bg-white text-cement-600 focus:outline-none">
              <option value="all">All Types</option>
              {PROJECT_TYPES.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase()+t.slice(1)}</option>)}
            </select>
            <Button size="sm" variant="dark" onClick={() => setOpen(true)}>＋ Add Project</Button>
          </div>
        </CardHeader>
        <CardBody className="!pt-0">
          <div className="overflow-x-auto">
            <table className="data-table w-full">
              <thead><tr><th>Project</th><th>Client</th><th>Type</th><th>Budget</th><th>Progress</th><th>Status</th><th>Manager</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={8} className="text-center py-10 text-cement-400">No projects found. Click ＋ Add Project to create one.</td></tr>
                )}
                {filtered.map(p => (
                  <tr key={p.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{p.icon}</span>
                        <div>
                          <div className="font-semibold text-cement-900">{p.name}</div>
                          <div className="text-[11px] text-cement-400">📍 {p.location}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-cement-600">{p.client}</td>
                    <td><span className="text-[10px] font-semibold px-2 py-0.5 bg-cement-50 border border-cement-200 rounded-full text-cement-600 capitalize">{p.type}</span></td>
                    <td className="font-semibold text-cement-900">{formatCurrency(p.budget, true)}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Progress value={p.progress} className="h-1.5 w-16" />
                        <span className="text-[11px] font-bold text-cement-500">{p.progress}%</span>
                      </div>
                    </td>
                    <td>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        p.status === "completed" ? "bg-green-50 text-green-700 border-green-200" :
                        p.status === "delayed"   ? "bg-red-50 text-red-700 border-red-200" :
                        p.status === "on-hold"   ? "bg-gray-100 text-gray-500 border-gray-200" :
                        "bg-amber-50 text-amber-700 border-amber-200"
                      }`}>{p.status === "ongoing" ? "On Track" : p.status}</span>
                    </td>
                    <td className="text-cement-500 text-[12px]">{p.manager}</td>
                    <td>
                      <div className="flex gap-1">
                        <Link href={`/projects/${p.id}`} className="px-2 py-1 text-[11px] bg-cement-50 border border-cement-200 rounded font-medium text-cement-600 hover:bg-cement-100 transition">View</Link>
                        <button onClick={() => deleteProject(p.id)} className="px-2 py-1 text-[11px] bg-red-50 border border-red-200 rounded font-medium text-red-600 hover:bg-red-100 transition">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {/* ── Add Project Modal ── */}
      <Modal open={open} onClose={() => setOpen(false)} title="➕ Add New Project" size="lg">
        <form onSubmit={handleSubmit}>
          <FormGrid>
            <Field label="Project Name *"><input required className={inputCls} value={form.name} onChange={e=>set("name",e.target.value)} placeholder="e.g. Green Valley Residency" /></Field>
            <Field label="Client Name *"><input required className={inputCls} value={form.client} onChange={e=>set("client",e.target.value)} placeholder="e.g. Skyline Developers" /></Field>
            <Field label="Location"><input className={inputCls} value={form.location} onChange={e=>set("location",e.target.value)} placeholder="e.g. Vadodara, Gujarat" /></Field>
            <Field label="Site Manager"><input className={inputCls} value={form.manager} onChange={e=>set("manager",e.target.value)} placeholder="e.g. Vikram Shah" /></Field>
            <Field label="Project Type">
              <select className={selectCls} value={form.type} onChange={e=>set("type",e.target.value)}>
                {PROJECT_TYPES.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase()+t.slice(1)}</option>)}
              </select>
            </Field>
            <Field label="Status">
              <select className={selectCls} value={form.status} onChange={e=>set("status",e.target.value)}>
                {PROJECT_STATUS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Total Budget (₹)"><input type="number" className={inputCls} value={form.budget} onChange={e=>set("budget",e.target.value)} placeholder="e.g. 5000000" /></Field>
            <Field label="Progress (%)"><input type="number" min="0" max="100" className={inputCls} value={form.progress} onChange={e=>set("progress",e.target.value)} /></Field>
            <Field label="Start Date"><input type="date" className={inputCls} value={form.startDate} onChange={e=>set("startDate",e.target.value)} /></Field>
            <Field label="Expected End Date"><input type="date" className={inputCls} value={form.endDate} onChange={e=>set("endDate",e.target.value)} /></Field>
            <Field label="Labour Count"><input type="number" className={inputCls} value={form.labourCount} onChange={e=>set("labourCount",e.target.value)} /></Field>
          </FormGrid>
          <Field label="Project Description">
            <textarea rows={3} className={inputCls} value={form.description} onChange={e=>set("description",e.target.value)} placeholder="Describe the project scope…" />
          </Field>
          <SubmitRow onCancel={() => setOpen(false)} label="Save Project" />
        </form>
      </Modal>
    </div>
  );
}
