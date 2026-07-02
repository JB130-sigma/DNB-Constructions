"use client";
import { useState } from "react";
import { useStore, nextId } from "@/lib/store";
import { StatCard, Card, CardHeader, CardTitle, CardBody, Progress, Button } from "@/components/ui";
import Modal, { Field, FormGrid, inputCls, selectCls, SubmitRow } from "@/components/Modal";
import { formatCurrency } from "@/lib/utils";
import type { VendorCategory } from "@/lib/data";

const CATEGORIES: VendorCategory[] = ["Material Supplier","Subcontractor","Equipment Rental","Logistics","Consultant"];

export default function VendorsPage() {
  const { vendors, addVendor, deleteVendor } = useStore();
  const [open, setOpen]     = useState(false);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");

  const filtered = vendors.filter(v =>
    (catFilter === "all" || v.category === catFilter) &&
    (v.name.toLowerCase().includes(search.toLowerCase()) || v.contactPerson.toLowerCase().includes(search.toLowerCase()))
  );

  const active   = vendors.filter(v => v.rating >= 4).length;
  const payables = vendors.reduce((a, v) => a + v.outstanding, 0);

  const [form, setForm] = useState({
    name: "", category: "Material Supplier" as VendorCategory,
    contactPerson: "", phone: "", email: "",
    gstin: "", totalBusiness: "0", outstanding: "0",
    rating: "5"
  });
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addVendor({
      id: nextId("VND", vendors),
      name: form.name, category: form.category,
      contactPerson: form.contactPerson, phone: form.phone, email: form.email,
      gstin: form.gstin,
      totalBusiness: Number(form.totalBusiness) || 0,
      outstanding: Number(form.outstanding) || 0,
      rating: Number(form.rating) || 5,
    });
    setOpen(false);
    setForm({ name: "", category: "Material Supplier", contactPerson: "", phone: "", email: "", gstin: "", totalBusiness: "0", outstanding: "0", rating: "5" });
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard icon="🚛" label="Total Vendors"    value={String(vendors.length)}         iconClass="bg-blue-50 text-blue-600" />
        <StatCard icon="⭐" label="Top Rated (4+)"   value={String(active)}                 iconClass="bg-green-50 text-green-600" />
        <StatCard icon="💸" label="Total Payables"   value={formatCurrency(payables, true)} iconClass="bg-red-50 text-red-600" />
        <StatCard icon="📝" label="Categories"       value={String(new Set(vendors.map(v=>v.category)).size)} iconClass="bg-amber-50 text-amber-600" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vendor Directory ({filtered.length})</CardTitle>
          <div className="flex flex-wrap gap-2">
            <input value={search} onChange={e => setSearch(e.target.value)}
              className="px-3 py-1.5 text-[12px] border border-cement-200 rounded-lg bg-white text-cement-600 focus:outline-none w-36"
              placeholder="🔍 Search…" />
            <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
              className="px-3 py-1.5 text-[12px] border border-cement-200 rounded-lg bg-white text-cement-600 focus:outline-none">
              <option value="all">All Categories</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <Button size="sm" variant="dark" onClick={() => setOpen(true)}>＋ Add Vendor</Button>
          </div>
        </CardHeader>
        <CardBody className="!pt-0">
          <div className="table-scroll">
            <table className="data-table w-full">
              <thead><tr><th>Vendor Name</th><th>Category</th><th>Contact Info</th><th>GSTIN</th><th>Total Business</th><th>Outstanding</th><th>Rating</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={8} className="text-center py-10 text-cement-400">No vendors found. Click ＋ Add Vendor.</td></tr>
                )}
                {filtered.map(v => (
                  <tr key={v.id}>
                    <td>
                      <div className="font-semibold text-cement-900">{v.name}</div>
                      <div className="text-[10px] text-cement-400">ID: {v.id}</div>
                    </td>
                    <td><span className="text-[10px] font-semibold px-2 py-0.5 bg-cement-50 border border-cement-200 rounded-full text-cement-600">{v.category}</span></td>
                    <td>
                      <div className="text-[12px] text-cement-700">{v.contactPerson}</div>
                      <div className="text-[11px] text-cement-500">{v.phone}</div>
                    </td>
                    <td className="text-cement-500 font-mono text-[11px]">{v.gstin}</td>
                    <td className="font-semibold text-cement-900">{formatCurrency(v.totalBusiness, true)}</td>
                    <td className="text-red-600 font-bold">{formatCurrency(v.outstanding, true)}</td>
                    <td>
                      <div className="flex items-center gap-1 text-amber-500 text-sm">
                        {"★".repeat(v.rating)}{"☆".repeat(5 - v.rating)}
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-1">
                        <button onClick={() => deleteVendor(v.id)} className="px-2 py-1 text-[11px] bg-red-50 border border-red-200 rounded text-red-600 font-medium hover:bg-red-100 transition">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {/* ── Add Vendor Modal ── */}
      <Modal open={open} onClose={() => setOpen(false)} title="➕ Add New Vendor" size="lg">
        <form onSubmit={handleSubmit}>
          <FormGrid>
            <Field label="Vendor / Company Name *"><input required className={inputCls} value={form.name} onChange={e=>set("name",e.target.value)} placeholder="e.g. Ultratech Cement Ltd." /></Field>
            <Field label="Category">
              <select className={selectCls} value={form.category} onChange={e=>set("category",e.target.value)}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Contact Person"><input className={inputCls} value={form.contactPerson} onChange={e=>set("contactPerson",e.target.value)} placeholder="e.g. Ramesh Bhai" /></Field>
            <Field label="Phone Number *"><input required type="tel" className={inputCls} value={form.phone} onChange={e=>set("phone",e.target.value)} placeholder="+91 XXXXX XXXXX" /></Field>
            <Field label="Email Address"><input type="email" className={inputCls} value={form.email} onChange={e=>set("email",e.target.value)} placeholder="vendor@example.com" /></Field>
            <Field label="GSTIN"><input className={inputCls} value={form.gstin} onChange={e=>set("gstin",e.target.value)} placeholder="24XXXXX1234X1Z5" /></Field>
            <Field label="Total Business (₹)"><input type="number" min="0" className={inputCls} value={form.totalBusiness} onChange={e=>set("totalBusiness",e.target.value)} /></Field>
            <Field label="Outstanding Balance (₹)"><input type="number" min="0" className={inputCls} value={form.outstanding} onChange={e=>set("outstanding",e.target.value)} /></Field>
            <Field label="Initial Rating (1-5)"><input type="number" min="1" max="5" className={inputCls} value={form.rating} onChange={e=>set("rating",e.target.value)} /></Field>
          </FormGrid>
          <SubmitRow onCancel={() => setOpen(false)} label="Save Vendor" />
        </form>
      </Modal>
    </div>
  );
}
