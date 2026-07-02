"use client";
import { useState } from "react";
import { useStore, nextId } from "@/lib/store";
import { StatCard, Card, CardHeader, CardTitle, CardBody, Button } from "@/components/ui";
import Modal, { Field, FormGrid, inputCls, selectCls, SubmitRow } from "@/components/Modal";
import { formatCurrency } from "@/lib/utils";
import type { Equipment, EquipmentCategory } from "@/lib/data";

const CATEGORIES: EquipmentCategory[] = ["Excavator","Crane","Truck","Concrete Mixer","Roller","Loader","Generator","Other"];
const STATUS_OPT = ["active","maintenance","idle","repair"] as const;

export default function MachineryPage() {
  const { machinery, projects, addMachinery, deleteMachinery } = useStore();
  const [open, setOpen]     = useState(false);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");

  const filtered = machinery.filter(e =>
    (catFilter === "all" || e.category === catFilter) &&
    (e.name.toLowerCase().includes(search.toLowerCase()) || e.model.toLowerCase().includes(search.toLowerCase()))
  );

  const active      = machinery.filter(e => e.status === "active").length;
  const maintenance = machinery.filter(e => e.status === "maintenance" || e.status === "repair").length;
  const idle        = machinery.filter(e => e.status === "idle").length;
  const totalCost   = machinery.reduce((a, e) => a + (e.maintenanceCost || 0) + (e.fuelCost || 0), 0);

  const [form, setForm] = useState({
    name: "", category: "Excavator" as EquipmentCategory, model: "",
    purchaseDate: "", cost: "", maintenanceCost: "", fuelCost: "",
    site: "", status: "active" as Equipment["status"]
  });
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addMachinery({
      id: nextId("EQ", machinery),
      name: form.name, category: form.category, model: form.model,
      purchaseDate: form.purchaseDate || new Date().toISOString().slice(0, 10),
      cost: Number(form.cost) || 0,
      maintenanceCost: Number(form.maintenanceCost) || 0,
      fuelCost: Number(form.fuelCost) || 0,
      site: form.site,
      status: form.status,
    });
    setOpen(false);
    setForm({ name: "", category: "Excavator", model: "", purchaseDate: "", cost: "", maintenanceCost: "", fuelCost: "", site: "", status: "active" });
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard icon="🚜" label="Total Assets"      value={String(machinery.length)}      iconClass="bg-blue-50 text-blue-600" />
        <StatCard icon="✅" label="Active / On Site"  value={String(active)}                iconClass="bg-green-50 text-green-600" />
        <StatCard icon="🔧" label="In Maintenance"    value={String(maintenance)}           iconClass="bg-red-50 text-red-600" />
        <StatCard icon="💰" label="Maint. & Fuel YTD" value={formatCurrency(totalCost)}     iconClass="bg-amber-50 text-amber-600" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Machinery & Assets ({filtered.length})</CardTitle>
          <div className="flex flex-wrap gap-2">
            <input value={search} onChange={e => setSearch(e.target.value)}
              className="px-3 py-1.5 text-[12px] border border-cement-200 rounded-lg bg-white text-cement-600 focus:outline-none w-36"
              placeholder="🔍 Search…" />
            <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
              className="px-3 py-1.5 text-[12px] border border-cement-200 rounded-lg bg-white text-cement-600 focus:outline-none">
              <option value="all">All Categories</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <Button size="sm" variant="dark" onClick={() => setOpen(true)}>＋ Add Asset</Button>
          </div>
        </CardHeader>
        <CardBody className="!pt-0">
          <div className="table-scroll">
            <table className="data-table w-full">
              <thead><tr><th>Equipment</th><th>Category</th><th>Model / Serial</th><th>Assigned Site</th><th>Asset Cost</th><th>Maint. Cost</th><th>Fuel Cost</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={9} className="text-center py-10 text-cement-400">No machinery found. Click ＋ Add Asset.</td></tr>
                )}
                {filtered.map(e => (
                  <tr key={e.id}>
                    <td className="font-semibold text-cement-900 whitespace-nowrap">{e.name}</td>
                    <td><span className="text-[10px] font-semibold px-2 py-0.5 bg-cement-50 border border-cement-200 rounded-full text-cement-600 whitespace-nowrap">{e.category}</span></td>
                    <td className="text-cement-500 text-[12px] whitespace-nowrap">{e.model}</td>
                    <td className="text-cement-600">{e.site || <span className="text-cement-300 italic">Unassigned</span>}</td>
                    <td className="font-semibold text-cement-900">{formatCurrency(e.cost, true)}</td>
                    <td className="text-red-600 font-medium">₹{(e.maintenanceCost || 0).toLocaleString()}</td>
                    <td className="text-orange-600 font-medium">₹{(e.fuelCost || 0).toLocaleString()}</td>
                    <td>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        e.status === "active" ? "bg-green-50 text-green-700 border-green-200" :
                        (e.status === "maintenance" || e.status === "repair") ? "bg-red-50 text-red-700 border-red-200" :
                        "bg-gray-100 text-gray-500 border-gray-200"
                      }`}>{e.status}</span>
                    </td>
                    <td>
                      <div className="flex gap-1">
                        <button onClick={() => deleteMachinery(e.id)} className="px-2 py-1 text-[11px] bg-red-50 border border-red-200 rounded text-red-600 font-medium hover:bg-red-100 transition">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {/* ── Add Machinery Modal ── */}
      <Modal open={open} onClose={() => setOpen(false)} title="➕ Add New Asset" size="lg">
        <form onSubmit={handleSubmit}>
          <FormGrid>
            <Field label="Asset Name *"><input required className={inputCls} value={form.name} onChange={e=>set("name",e.target.value)} placeholder="e.g. JCB 3DX Backhoe" /></Field>
            <Field label="Category">
              <select className={selectCls} value={form.category} onChange={e=>set("category",e.target.value)}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Model / Registration No"><input className={inputCls} value={form.model} onChange={e=>set("model",e.target.value)} placeholder="e.g. GJ-06-XX-1234" /></Field>
            <Field label="Purchase Date"><input type="date" className={inputCls} value={form.purchaseDate} onChange={e=>set("purchaseDate",e.target.value)} /></Field>
            <Field label="Asset Cost (₹)"><input type="number" min="0" className={inputCls} value={form.cost} onChange={e=>set("cost",e.target.value)} /></Field>
            <Field label="Total Maintenance (YTD)"><input type="number" min="0" className={inputCls} value={form.maintenanceCost} onChange={e=>set("maintenanceCost",e.target.value)} /></Field>
            <Field label="Total Fuel Cost (YTD)"><input type="number" min="0" className={inputCls} value={form.fuelCost} onChange={e=>set("fuelCost",e.target.value)} /></Field>
            <Field label="Current Status">
              <select className={selectCls} value={form.status} onChange={e=>set("status",e.target.value)}>
                {STATUS_OPT.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
              </select>
            </Field>
            <Field label="Assigned Site">
              <select className={selectCls} value={form.site} onChange={e=>set("site",e.target.value)}>
                <option value="">-- Unassigned (Yard) --</option>
                {projects.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
              </select>
            </Field>
          </FormGrid>
          <SubmitRow onCancel={() => setOpen(false)} label="Save Asset" />
        </form>
      </Modal>
    </div>
  );
}
