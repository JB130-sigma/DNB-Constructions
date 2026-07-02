"use client";
import { useState } from "react";
import { useStore, nextId } from "@/lib/store";
import { StatCard, Card, CardHeader, CardTitle, CardBody, Button } from "@/components/ui";
import Modal, { Field, FormGrid, inputCls, selectCls, SubmitRow } from "@/components/Modal";
import { formatCurrency, statusColor } from "@/lib/utils";

export default function FinancePage() {
  const { invoices, clients, projects, addInvoice, deleteInvoice } = useStore();
  const [open, setOpen]     = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = invoices.filter(i =>
    (statusFilter === "all" || i.status === statusFilter) &&
    (i.client.toLowerCase().includes(search.toLowerCase()) || i.project.toLowerCase().includes(search.toLowerCase()))
  );

  const totalPaid = invoices.filter(i => i.status === "paid").reduce((a, i) => a + i.amount, 0);
  const totalPending = invoices.filter(i => i.status === "pending" || i.status === "sent").reduce((a, i) => a + i.amount, 0);
  const totalOverdue = invoices.filter(i => i.status === "overdue").reduce((a, i) => a + i.amount, 0);

  const [form, setForm] = useState({
    client: "", project: "", amount: "", date: new Date().toISOString().slice(0, 10), due: "", status: "pending" as any
  });
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addInvoice({
      id: nextId("INV-2026-", invoices),
      client: form.client,
      project: form.project,
      amount: Number(form.amount) || 0,
      date: form.date,
      due: form.due || form.date,
      status: form.status,
    });
    setOpen(false);
    setForm({ client: "", project: "", amount: "", date: new Date().toISOString().slice(0, 10), due: "", status: "pending" });
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard icon="💸" label="Total Collected" value={formatCurrency(totalPaid, true)}    iconClass="bg-green-50 text-green-600" />
        <StatCard icon="⏳" label="Pending Revenue" value={formatCurrency(totalPending, true)} iconClass="bg-blue-50 text-blue-600" />
        <StatCard icon="⚠️" label="Overdue"         value={formatCurrency(totalOverdue, true)} iconClass="bg-red-50 text-red-600" />
        <StatCard icon="📄" label="Total Invoices"  value={String(invoices.length)}            iconClass="bg-gray-100 text-gray-600" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoices ({filtered.length})</CardTitle>
          <div className="flex flex-wrap gap-2">
            <input value={search} onChange={e => setSearch(e.target.value)}
              className="px-3 py-1.5 text-[12px] border border-cement-200 rounded-lg bg-white text-cement-600 focus:outline-none w-36"
              placeholder="🔍 Search…" />
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 text-[12px] border border-cement-200 rounded-lg bg-white text-cement-600 focus:outline-none">
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="sent">Sent</option>
              <option value="overdue">Overdue</option>
            </select>
            <Button size="sm" variant="dark" onClick={() => setOpen(true)}>＋ Create Invoice</Button>
          </div>
        </CardHeader>
        <CardBody className="!pt-0">
          <div className="table-scroll">
            <table className="data-table w-full">
              <thead><tr><th>Invoice ID</th><th>Client</th><th>Project</th><th>Date</th><th>Due Date</th><th>Amount</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={8} className="text-center py-10 text-cement-400">No invoices found. Click ＋ Create Invoice.</td></tr>
                )}
                {filtered.map(i => (
                  <tr key={i.id}>
                    <td className="font-mono text-[11px] text-cement-600 font-semibold">{i.id}</td>
                    <td className="font-medium text-cement-900">{i.client}</td>
                    <td className="text-cement-500 text-[12px]">{i.project}</td>
                    <td className="text-cement-500 text-[12px] whitespace-nowrap">{i.date}</td>
                    <td className="text-cement-500 text-[12px] whitespace-nowrap">{i.due}</td>
                    <td className="font-bold text-cement-900">{formatCurrency(i.amount, true)}</td>
                    <td>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColor(i.status)} uppercase`}>
                        {i.status}
                      </span>
                    </td>
                    <td>
                      <button onClick={() => deleteInvoice(i.id)} className="px-2 py-1 text-[11px] bg-red-50 border border-red-200 rounded text-red-600 font-medium hover:bg-red-100 transition">🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="➕ Create Invoice" size="lg">
        <form onSubmit={handleSubmit}>
          <FormGrid>
            <Field label="Client *">
              <select required className={selectCls} value={form.client} onChange={e=>set("client",e.target.value)}>
                <option value="">Select Client</option>
                {clients.map(c => <option key={c.id} value={c.company}>{c.company} ({c.name})</option>)}
              </select>
            </Field>
            <Field label="Project *">
              <select required className={selectCls} value={form.project} onChange={e=>set("project",e.target.value)}>
                <option value="">Select Project</option>
                {projects.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
              </select>
            </Field>
            <Field label="Amount (₹) *"><input required type="number" min="0" className={inputCls} value={form.amount} onChange={e=>set("amount",e.target.value)} /></Field>
            <Field label="Invoice Date *"><input required type="date" className={inputCls} value={form.date} onChange={e=>set("date",e.target.value)} /></Field>
            <Field label="Due Date"><input type="date" className={inputCls} value={form.due} onChange={e=>set("due",e.target.value)} /></Field>
            <Field label="Status">
              <select className={selectCls} value={form.status} onChange={e=>set("status",e.target.value)}>
                <option value="pending">Pending</option>
                <option value="sent">Sent</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </select>
            </Field>
          </FormGrid>
          <SubmitRow onCancel={() => setOpen(false)} label="Create Invoice" />
        </form>
      </Modal>
    </div>
  );
}
