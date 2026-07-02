"use client";
import { useState } from "react";
import { useStore, nextId } from "@/lib/store";
import { StatCard, Card, CardHeader, CardTitle, CardBody, Button } from "@/components/ui";
import Modal, { Field, FormGrid, inputCls, selectCls, SubmitRow } from "@/components/Modal";
import { statusColor } from "@/lib/utils";

const DOC_TYPES = ["Compliance", "Drawing", "Policy", "Contract", "Insurance", "Invoice", "Other"];

export default function DocumentsPage() {
  const { documents, projects, users, addDocument, deleteDocument } = useStore();
  const [open, setOpen]     = useState(false);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = documents.filter(d =>
    (typeFilter === "all" || d.type === typeFilter) &&
    (d.title.toLowerCase().includes(search.toLowerCase()) || d.project.toLowerCase().includes(search.toLowerCase()))
  );

  const pending = documents.filter(d => d.status === "pending").length;
  const expired = documents.filter(d => d.status === "expired").length;

  const [form, setForm] = useState({
    title: "", type: "Drawing", project: "", uploadedBy: "",
    date: new Date().toISOString().slice(0, 10), size: "1.0 MB", status: "pending" as any
  });
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addDocument({
      id: nextId("DOC-", documents),
      title: form.title,
      type: form.type,
      project: form.project || "General",
      uploadedBy: form.uploadedBy || "System",
      date: form.date,
      size: form.size,
      status: form.status,
    });
    setOpen(false);
    setForm({ title: "", type: "Drawing", project: "", uploadedBy: "", date: new Date().toISOString().slice(0, 10), size: "1.0 MB", status: "pending" });
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard icon="📁" label="Total Documents" value={String(documents.length)}     iconClass="bg-blue-50 text-blue-600" />
        <StatCard icon="🔍" label="Pending Review"  value={String(pending)}              iconClass="bg-amber-50 text-amber-600" />
        <StatCard icon="❌" label="Expired Docs"    value={String(expired)}              iconClass="bg-red-50 text-red-600" />
        <StatCard icon="✅" label="Verified"        value={String(documents.length - pending - expired)} iconClass="bg-green-50 text-green-600" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Document Repository ({filtered.length})</CardTitle>
          <div className="flex flex-wrap gap-2">
            <input value={search} onChange={e => setSearch(e.target.value)}
              className="px-3 py-1.5 text-[12px] border border-cement-200 rounded-lg bg-white text-cement-600 focus:outline-none w-36"
              placeholder="🔍 Search…" />
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
              className="px-3 py-1.5 text-[12px] border border-cement-200 rounded-lg bg-white text-cement-600 focus:outline-none">
              <option value="all">All Types</option>
              {DOC_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <Button size="sm" variant="dark" onClick={() => setOpen(true)}>＋ Upload Document</Button>
          </div>
        </CardHeader>
        <CardBody className="!pt-0">
          <div className="table-scroll">
            <table className="data-table w-full">
              <thead><tr><th>ID</th><th>Document Title</th><th>Type</th><th>Project</th><th>Uploaded By</th><th>Date</th><th>Size</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={9} className="text-center py-10 text-cement-400">No documents found. Click ＋ Upload Document.</td></tr>
                )}
                {filtered.map(d => (
                  <tr key={d.id}>
                    <td className="font-mono text-[11px] text-cement-500">{d.id}</td>
                    <td className="font-medium text-cement-900">{d.title}</td>
                    <td><span className="text-[10px] font-semibold px-2 py-0.5 bg-cement-50 border border-cement-200 rounded-full text-cement-600">{d.type}</span></td>
                    <td className="text-cement-600 text-[12px]">{d.project}</td>
                    <td className="text-cement-500 text-[12px]">{d.uploadedBy}</td>
                    <td className="text-cement-500 text-[12px] whitespace-nowrap">{d.date}</td>
                    <td className="text-cement-400 text-[12px]">{d.size}</td>
                    <td>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColor(d.status)} uppercase`}>
                        {d.status}
                      </span>
                    </td>
                    <td>
                      <button onClick={() => deleteDocument(d.id)} className="px-2 py-1 text-[11px] bg-red-50 border border-red-200 rounded text-red-600 font-medium hover:bg-red-100 transition">🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="➕ Upload Document" size="lg">
        <form onSubmit={handleSubmit}>
          <FormGrid>
            <Field label="Document Title *"><input required className={inputCls} value={form.title} onChange={e=>set("title",e.target.value)} placeholder="e.g. Safety Audit Report Q2" /></Field>
            <Field label="Document Type">
              <select className={selectCls} value={form.type} onChange={e=>set("type",e.target.value)}>
                {DOC_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Related Project">
              <select className={selectCls} value={form.project} onChange={e=>set("project",e.target.value)}>
                <option value="">Select Project / General</option>
                {projects.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
              </select>
            </Field>
            <Field label="Uploaded By">
              <select className={selectCls} value={form.uploadedBy} onChange={e=>set("uploadedBy",e.target.value)}>
                <option value="">Select User</option>
                {users.map(u => <option key={u.id} value={u.name}>{u.name} ({u.role})</option>)}
              </select>
            </Field>
            <Field label="Upload Date *"><input required type="date" className={inputCls} value={form.date} onChange={e=>set("date",e.target.value)} /></Field>
            <Field label="File Size (Simulated)"><input className={inputCls} value={form.size} onChange={e=>set("size",e.target.value)} placeholder="e.g. 2.5 MB" /></Field>
            <Field label="Verification Status">
              <select className={selectCls} value={form.status} onChange={e=>set("status",e.target.value)}>
                <option value="pending">Pending</option>
                <option value="verified">Verified</option>
                <option value="expired">Expired</option>
              </select>
            </Field>
          </FormGrid>
          <SubmitRow onCancel={() => setOpen(false)} label="Upload Document" />
        </form>
      </Modal>
    </div>
  );
}
