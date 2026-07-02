"use client";
import { useState } from "react";
import { useStore, nextId } from "@/lib/store";
import { StatCard, Card, CardHeader, CardTitle, CardBody, Progress, Button } from "@/components/ui";
import Modal, { Field, FormGrid, inputCls, selectCls, SubmitRow } from "@/components/Modal";
import { formatCurrency } from "@/lib/utils";
import type { Material, MaterialCategory } from "@/lib/data";

const CATEGORIES: MaterialCategory[] = ["Cement","Steel","Sand","Aggregate","Bricks","Tiles","Paint","Electrical","Plumbing","Miscellaneous"];
const UNITS = ["Bags","MT","CFT","Nos","Kg","Litre","Sq.Ft","RMT"];

export default function MaterialsPage() {
  const { materials, projects, addMaterial, deleteMaterial } = useStore();
  const [open, setOpen]     = useState(false);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");

  const filtered = materials.filter(m =>
    (catFilter === "all" || m.category === catFilter) &&
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  const lowStock   = materials.filter(m => m.remaining < m.minStock);
  const totalValue = materials.reduce((a, m) => a + m.remaining * m.purchaseRate, 0);

  const [form, setForm] = useState({
    name:"", category:"Cement" as MaterialCategory, unit:"Bags",
    purchased:"0", used:"0", wasted:"0", minStock:"50",
    purchaseRate:"0", site:"",
  });
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const purchased = Number(form.purchased) || 0;
    const used      = Number(form.used) || 0;
    const wasted    = Number(form.wasted) || 0;
    addMaterial({
      id: nextId("M", materials),
      name: form.name, category: form.category, unit: form.unit,
      purchased, used, wasted,
      remaining: purchased - used - wasted,
      minStock: Number(form.minStock) || 0,
      purchaseRate: Number(form.purchaseRate) || 0,
      site: form.site,
    });
    setOpen(false);
    setForm({ name:"",category:"Cement",unit:"Bags",purchased:"0",used:"0",wasted:"0",minStock:"50",purchaseRate:"0",site:"" });
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard icon="📦" label="Total Materials"   value={String(materials.length)}        iconClass="bg-blue-50 text-blue-600" />
        <StatCard icon="⚠️" label="Low Stock Alerts"  value={String(lowStock.length)}         iconClass="bg-red-50 text-red-600" />
        <StatCard icon="💰" label="Inventory Value"   value={formatCurrency(totalValue, true)} iconClass="bg-green-50 text-green-600" />
        <StatCard icon="🏷️" label="Categories"        value={String(new Set(materials.map(m=>m.category)).size)} iconClass="bg-amber-50 text-amber-600" />
      </div>

      {lowStock.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="font-bold text-red-700 mb-2">⚠️ Low Stock Alerts</div>
          <div className="flex flex-wrap gap-2">
            {lowStock.map(m => (
              <span key={m.id} className="px-3 py-1 bg-white border border-red-200 rounded-lg text-[12px] font-semibold text-red-700">
                {m.name} — only {m.remaining} {m.unit} (min: {m.minStock})
              </span>
            ))}
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Material Inventory ({filtered.length})</CardTitle>
          <div className="flex flex-wrap gap-2">
            <input value={search} onChange={e => setSearch(e.target.value)}
              className="px-3 py-1.5 text-[12px] border border-cement-200 rounded-lg bg-white text-cement-600 focus:outline-none w-36"
              placeholder="🔍 Search…" />
            <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
              className="px-3 py-1.5 text-[12px] border border-cement-200 rounded-lg bg-white text-cement-600 focus:outline-none">
              <option value="all">All Categories</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <Button size="sm" variant="dark" onClick={() => setOpen(true)}>＋ Add Material</Button>
          </div>
        </CardHeader>
        <CardBody className="!pt-0">
          <div className="overflow-x-auto">
            <table className="data-table w-full">
              <thead><tr><th>Material</th><th>Category</th><th>Purchased</th><th>Used</th><th>Stock</th><th>Rate</th><th>Value</th><th>Site</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={10} className="text-center py-10 text-cement-400">No materials found. Click ＋ Add Material.</td></tr>
                )}
                {filtered.map(m => {
                  const pct   = m.purchased ? Math.round((m.remaining / m.purchased) * 100) : 0;
                  const isLow = m.remaining < m.minStock;
                  return (
                    <tr key={m.id}>
                      <td><div className="font-semibold text-cement-900">{m.name}</div></td>
                      <td><span className="text-[10px] font-semibold px-2 py-0.5 bg-cement-50 border border-cement-200 rounded-full text-cement-600">{m.category}</span></td>
                      <td className="text-cement-700">{m.purchased} {m.unit}</td>
                      <td className="text-cement-700">{m.used}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Progress value={pct} className="h-1.5 w-14" colorClass={isLow ? "bg-red-500" : "bg-green-500"} />
                          <span className={`text-[11px] font-bold ${isLow ? "text-red-600" : "text-cement-700"}`}>{m.remaining}</span>
                        </div>
                      </td>
                      <td className="text-cement-700">₹{m.purchaseRate}</td>
                      <td className="font-bold text-cement-900">{formatCurrency(m.remaining * m.purchaseRate, true)}</td>
                      <td className="text-cement-400 text-[12px]">{m.site}</td>
                      <td>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${isLow ? "bg-red-50 text-red-700 border-red-200" : "bg-green-50 text-green-700 border-green-200"}`}>
                          {isLow ? "Low" : "OK"}
                        </span>
                      </td>
                      <td>
                        <button onClick={() => deleteMaterial(m.id)} className="px-2 py-1 text-[11px] bg-red-50 border border-red-200 rounded text-red-600 font-medium hover:bg-red-100 transition">🗑️</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {/* ── Add Material Modal ── */}
      <Modal open={open} onClose={() => setOpen(false)} title="➕ Add Material / Inventory" size="lg">
        <form onSubmit={handleSubmit}>
          <FormGrid>
            <Field label="Material Name *"><input required className={inputCls} value={form.name} onChange={e=>set("name",e.target.value)} placeholder="e.g. OPC Cement 43 Grade" /></Field>
            <Field label="Category">
              <select className={selectCls} value={form.category} onChange={e=>set("category",e.target.value)}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Unit">
              <select className={selectCls} value={form.unit} onChange={e=>set("unit",e.target.value)}>
                {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </Field>
            <Field label="Site">
              <select className={selectCls} value={form.site} onChange={e=>set("site",e.target.value)}>
                <option value="">Select site…</option>
                {projects.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
              </select>
            </Field>
            <Field label="Total Purchased"><input type="number" min="0" className={inputCls} value={form.purchased} onChange={e=>set("purchased",e.target.value)} /></Field>
            <Field label="Already Used"><input type="number" min="0" className={inputCls} value={form.used} onChange={e=>set("used",e.target.value)} /></Field>
            <Field label="Wasted / Damaged"><input type="number" min="0" className={inputCls} value={form.wasted} onChange={e=>set("wasted",e.target.value)} /></Field>
            <Field label="Minimum Stock Level"><input type="number" min="0" className={inputCls} value={form.minStock} onChange={e=>set("minStock",e.target.value)} /></Field>
            <Field label="Purchase Rate (₹/unit)"><input type="number" min="0" className={inputCls} value={form.purchaseRate} onChange={e=>set("purchaseRate",e.target.value)} /></Field>
          </FormGrid>
          <SubmitRow onCancel={() => setOpen(false)} label="Save Material" />
        </form>
      </Modal>
    </div>
  );
}
