"use client";
import { useState } from "react";
import { useStore, nextId } from "@/lib/store";
import { StatCard, Card, CardHeader, CardTitle, CardBody, Button } from "@/components/ui";
import Modal, { Field, FormGrid, inputCls, selectCls, SubmitRow } from "@/components/Modal";
import { formatCurrency } from "@/lib/utils";
import type { ClientCategory, ClientStatus } from "@/lib/data";

const CATEGORIES: ClientCategory[] = ["Government","Corporate","Private","Industrial"];
const STATUS_OPT: ClientStatus[] = ["active","inactive","blacklisted"];

export default function ClientsPage() {
  const { clients, addClient, deleteClient } = useStore();
  const [open, setOpen]     = useState(false);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");

  const filtered = clients.filter(c =>
    (catFilter === "all" || c.category === catFilter) &&
    (c.name.toLowerCase().includes(search.toLowerCase()) || c.company.toLowerCase().includes(search.toLowerCase()))
  );

  const active      = clients.filter(c => c.status === "active").length;
  const receivables = clients.reduce((a, c) => a + c.outstanding, 0);

  const [form, setForm] = useState({
    name: "", company: "", category: "Private" as ClientCategory,
    phone: "", email: "", projectsCount: "0",
    totalBilled: "0", outstanding: "0", status: "active" as ClientStatus
  });
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addClient({
      id: nextId("CL", clients),
      name: form.name, company: form.company, category: form.category,
      phone: form.phone, email: form.email,
      projectsCount: Number(form.projectsCount) || 0,
      totalBilled: Number(form.totalBilled) || 0,
      outstanding: Number(form.outstanding) || 0,
      status: form.status,
    });
    setOpen(false);
    setForm({ name: "", company: "", category: "Private", phone: "", email: "", projectsCount: "0", totalBilled: "0", outstanding: "0", status: "active" });
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard icon="💼" label="Total Clients"      value={String(clients.length)}            iconClass="bg-blue-50 text-blue-600" />
        <StatCard icon="🟢" label="Active Clients"     value={String(active)}                    iconClass="bg-green-50 text-green-600" />
        <StatCard icon="💸" label="Total Receivables"  value={formatCurrency(receivables, true)} iconClass="bg-red-50 text-red-600" />
        <StatCard icon="🏛️" label="Govt. Clients"      value={String(clients.filter(c=>c.category==="Government").length)} iconClass="bg-amber-50 text-amber-600" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Client Registry ({filtered.length})</CardTitle>
          <div className="flex flex-wrap gap-2">
            <input value={search} onChange={e => setSearch(e.target.value)}
              className="px-3 py-1.5 text-[12px] border border-cement-200 rounded-lg bg-white text-cement-600 focus:outline-none w-36"
              placeholder="🔍 Search…" />
            <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
              className="px-3 py-1.5 text-[12px] border border-cement-200 rounded-lg bg-white text-cement-600 focus:outline-none">
              <option value="all">All Categories</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <Button size="sm" variant="dark" onClick={() => setOpen(true)}>＋ Add Client</Button>
          </div>
        </CardHeader>
        <CardBody className="!pt-0">
          <div className="table-scroll">
            <table className="data-table w-full">
              <thead><tr><th>Client / Company</th><th>Category</th><th>Contact Info</th><th>Projects</th><th>Total Billed</th><th>Receivables</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={8} className="text-center py-10 text-cement-400">No clients found. Click ＋ Add Client.</td></tr>
                )}
                {filtered.map(c => (
                  <tr key={c.id}>
                    <td>
                      <div className="font-bold text-cement-900">{c.company}</div>
                      <div className="text-[12px] text-cement-600">{c.name}</div>
                    </td>
                    <td><span className="text-[10px] font-semibold px-2 py-0.5 bg-cement-50 border border-cement-200 rounded-full text-cement-600">{c.category}</span></td>
                    <td>
                      <div className="text-[12px] text-cement-700">{c.email}</div>
                      <div className="text-[11px] text-cement-500">{c.phone}</div>
                    </td>
                    <td className="text-cement-700 font-medium">{c.projectsCount}</td>
                    <td className="font-semibold text-cement-900">{formatCurrency(c.totalBilled, true)}</td>
                    <td className="text-red-600 font-bold">{formatCurrency(c.outstanding, true)}</td>
                    <td>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        c.status === "active" ? "bg-green-50 text-green-700 border-green-200" :
                        c.status === "blacklisted" ? "bg-red-50 text-red-700 border-red-200" :
                        "bg-gray-100 text-gray-500 border-gray-200"
                      }`}>{c.status}</span>
                    </td>
                    <td>
                      <div className="flex gap-1">
                        <button onClick={() => deleteClient(c.id)} className="px-2 py-1 text-[11px] bg-red-50 border border-red-200 rounded text-red-600 font-medium hover:bg-red-100 transition">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {/* ── Add Client Modal ── */}
      <Modal open={open} onClose={() => setOpen(false)} title="➕ Add New Client" size="lg">
        <form onSubmit={handleSubmit}>
          <FormGrid>
            <Field label="Client Name (Contact Person) *"><input required className={inputCls} value={form.name} onChange={e=>set("name",e.target.value)} placeholder="e.g. Anil Ambani" /></Field>
            <Field label="Company / Entity Name *"><input required className={inputCls} value={form.company} onChange={e=>set("company",e.target.value)} placeholder="e.g. Reliance Infrastructure" /></Field>
            <Field label="Category">
              <select className={selectCls} value={form.category} onChange={e=>set("category",e.target.value)}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Phone Number *"><input required type="tel" className={inputCls} value={form.phone} onChange={e=>set("phone",e.target.value)} placeholder="+91 XXXXX XXXXX" /></Field>
            <Field label="Email Address"><input type="email" className={inputCls} value={form.email} onChange={e=>set("email",e.target.value)} placeholder="client@example.com" /></Field>
            <Field label="Number of Projects"><input type="number" min="0" className={inputCls} value={form.projectsCount} onChange={e=>set("projectsCount",e.target.value)} /></Field>
            <Field label="Total Billed Amount (₹)"><input type="number" min="0" className={inputCls} value={form.totalBilled} onChange={e=>set("totalBilled",e.target.value)} /></Field>
            <Field label="Outstanding Balance (₹)"><input type="number" min="0" className={inputCls} value={form.outstanding} onChange={e=>set("outstanding",e.target.value)} /></Field>
            <Field label="Status">
              <select className={selectCls} value={form.status} onChange={e=>set("status",e.target.value)}>
                {STATUS_OPT.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
              </select>
            </Field>
          </FormGrid>
          <SubmitRow onCancel={() => setOpen(false)} label="Save Client" />
        </form>
      </Modal>
    </div>
  );
}
