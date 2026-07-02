"use client";
import { useState } from "react";
import { useStore, nextId } from "@/lib/store";
import { StatCard, Card, CardHeader, CardTitle, CardBody, Button } from "@/components/ui";
import Modal, { Field, FormGrid, inputCls, selectCls, SubmitRow } from "@/components/Modal";
import { formatCurrency } from "@/lib/utils";
import type { ExpenseCategory, ExpenseStatus } from "@/lib/data";

const CATEGORIES: ExpenseCategory[] = ["Cement","Steel","Sand","Aggregate","Bricks","Tiles","Paint","Labour","Machinery","Fuel","Transportation","Electrical","Plumbing","Miscellaneous"];
const STATUS_OPT: ExpenseStatus[] = ["pending","approved","rejected"];

export default function ExpensesPage() {
  const { expenses, projects, vendors, addExpense, deleteExpense } = useStore();
  const [open, setOpen]     = useState(false);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");

  const filtered = expenses.filter(e => 
    (catFilter === "all" || e.category === catFilter) &&
    (e.name.toLowerCase().includes(search.toLowerCase()) || e.vendor.toLowerCase().includes(search.toLowerCase()))
  );

  const total     = expenses.reduce((a, e) => a + e.amount, 0);
  const approved  = expenses.filter(e => e.status === "approved").reduce((a,e) => a+e.amount, 0);
  const pending   = expenses.filter(e => e.status === "pending").length;
  const rejected  = expenses.filter(e => e.status === "rejected").length;

  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    name: "", category: "Cement" as ExpenseCategory,
    project: "", vendor: "", amount: "", gst: "18", status: "pending" as ExpenseStatus
  });
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addExpense({
      id: nextId("EXP", expenses),
      date: form.date, name: form.name, category: form.category,
      project: form.project, vendor: form.vendor,
      amount: Number(form.amount) || 0,
      gst: Number(form.gst) || 0,
      status: form.status,
    });
    setOpen(false);
    setForm({ date: new Date().toISOString().slice(0, 10), name: "", category: "Cement", project: "", vendor: "", amount: "", gst: "18", status: "pending" });
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard icon="💸" label="Total Expenses"   value={formatCurrency(total, true)}    iconClass="bg-red-50 text-red-600" />
        <StatCard icon="✅" label="Approved Amount"  value={formatCurrency(approved, true)} iconClass="bg-green-50 text-green-600" />
        <StatCard icon="⏳" label="Pending Approval" value={String(pending)}                iconClass="bg-amber-50 text-amber-600" />
        <StatCard icon="❌" label="Rejected"         value={String(rejected)}               iconClass="bg-gray-100 text-gray-500" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Expense Records ({filtered.length})</CardTitle>
          <div className="flex flex-wrap gap-2">
            <input value={search} onChange={e => setSearch(e.target.value)}
              className="px-3 py-1.5 text-[12px] border border-cement-200 rounded-lg bg-white text-cement-600 focus:outline-none w-36"
              placeholder="🔍 Search…" />
            <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
              className="px-3 py-1.5 text-[12px] border border-cement-200 rounded-lg bg-white text-cement-600 focus:outline-none">
              <option value="all">All Categories</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <Button size="sm" variant="dark" onClick={() => setOpen(true)}>＋ Add Expense</Button>
          </div>
        </CardHeader>
        <CardBody className="!pt-0">
          <div className="table-scroll">
            <table className="data-table w-full">
              <thead><tr><th>Date</th><th>Category</th><th>Description</th><th>Project</th><th>Vendor</th><th>Amount</th><th>GST%</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={9} className="text-center py-10 text-cement-400">No expenses found. Click ＋ Add Expense.</td></tr>
                )}
                {filtered.map(e => (
                  <tr key={e.id}>
                    <td className="text-cement-400 text-[12px] whitespace-nowrap">{e.date}</td>
                    <td><span className="text-[10px] font-semibold px-2 py-0.5 bg-cement-50 border border-cement-200 rounded-full text-cement-600 whitespace-nowrap">{e.category}</span></td>
                    <td className="font-medium text-cement-900">{e.name}</td>
                    <td className="text-cement-500 text-[12px]">{e.project.slice(0,25)}</td>
                    <td className="text-cement-500 text-[12px]">{e.vendor}</td>
                    <td className="font-bold text-cement-900">{formatCurrency(e.amount, true)}</td>
                    <td className="text-cement-400 text-[12px]">{e.gst}%</td>
                    <td>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        e.status === "approved" ? "bg-green-50 text-green-700 border-green-200" :
                        e.status === "rejected" ? "bg-red-50 text-red-700 border-red-200" :
                        "bg-amber-50 text-amber-700 border-amber-200"
                      }`}>{e.status}</span>
                    </td>
                    <td>
                      <div className="flex gap-1">
                        <button onClick={() => deleteExpense(e.id)} className="px-2 py-1 text-[11px] bg-red-50 border border-red-200 rounded text-red-600 font-medium hover:bg-red-100 transition">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {/* ── Add Expense Modal ── */}
      <Modal open={open} onClose={() => setOpen(false)} title="➕ Add New Expense" size="lg">
        <form onSubmit={handleSubmit}>
          <FormGrid>
            <Field label="Description *"><input required className={inputCls} value={form.name} onChange={e=>set("name",e.target.value)} placeholder="e.g. Purchased 500 bags of OPC 43" /></Field>
            <Field label="Category">
              <select className={selectCls} value={form.category} onChange={e=>set("category",e.target.value)}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Amount (₹) *"><input required type="number" min="0" className={inputCls} value={form.amount} onChange={e=>set("amount",e.target.value)} /></Field>
            <Field label="GST (%)"><input type="number" min="0" max="100" className={inputCls} value={form.gst} onChange={e=>set("gst",e.target.value)} /></Field>
            <Field label="Project">
              <select className={selectCls} value={form.project} onChange={e=>set("project",e.target.value)}>
                <option value="">Select Project / General</option>
                {projects.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
              </select>
            </Field>
            <Field label="Vendor">
              <select className={selectCls} value={form.vendor} onChange={e=>set("vendor",e.target.value)}>
                <option value="">Select Vendor (Optional)</option>
                {vendors.map(v => <option key={v.id} value={v.name}>{v.name}</option>)}
              </select>
            </Field>
            <Field label="Date"><input type="date" className={inputCls} value={form.date} onChange={e=>set("date",e.target.value)} /></Field>
            <Field label="Status">
              <select className={selectCls} value={form.status} onChange={e=>set("status",e.target.value)}>
                {STATUS_OPT.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
              </select>
            </Field>
          </FormGrid>
          <SubmitRow onCancel={() => setOpen(false)} label="Save Expense" />
        </form>
      </Modal>
    </div>
  );
}
