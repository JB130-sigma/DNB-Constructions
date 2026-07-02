"use client";
import { useState } from "react";
import { useStore, nextId } from "@/lib/store";
import { StatCard, Card, CardHeader, CardTitle, CardBody, Button } from "@/components/ui";
import Modal, { Field, FormGrid, inputCls, selectCls, SubmitRow } from "@/components/Modal";
import { formatCurrency } from "@/lib/utils";
import type { LabourWorker, TradeType } from "@/lib/data";

const TRADES: TradeType[] = ["Mason","Carpenter","Electrician","Plumber","Painter","Welder","Helper","Supervisor"];
const STATUS_OPT = ["present","absent","half-day","overtime"] as const;

const statusStyle: Record<string, string> = {
  present: "bg-green-50 text-green-700 border-green-200",
  absent: "bg-red-50 text-red-700 border-red-200",
  "half-day": "bg-orange-50 text-orange-700 border-orange-200",
  overtime: "bg-purple-50 text-purple-700 border-purple-200",
};

export default function LabourPage() {
  const { labour, projects, addLabour, editLabour, deleteLabour } = useStore();
  const [open, setOpen]     = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [slipWorkerId, setSlipWorkerId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [tradeFilter, setTradeFilter] = useState("all");

  const filtered = labour.filter(l =>
    (tradeFilter === "all" || l.trade === tradeFilter) &&
    (l.name.toLowerCase().includes(search.toLowerCase()) || l.site.toLowerCase().includes(search.toLowerCase()))
  );

  const present   = labour.filter(l => l.status === "present" || l.status === "overtime").length;
  const absent    = labour.filter(l => l.status === "absent").length;
  const halfDay   = labour.filter(l => l.status === "half-day").length;
  const dailyCost = labour.reduce((a, l) => a + l.dailyWage, 0);

  const [form, setForm] = useState({
    name:"", aadhaar:"", mobile:"", trade:"Mason" as TradeType,
    dailyWage:"700", site:"", joinDate:"", status:"present" as LabourWorker["status"],
    monthDays:"26", overtime:"0", advance:"0",
  });
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data = {
      name: form.name, aadhaar: form.aadhaar || "XXXX-XXXX-0000",
      mobile: form.mobile, trade: form.trade,
      dailyWage: Number(form.dailyWage) || 0,
      site: form.site, joinDate: form.joinDate || new Date().toISOString().slice(0,10),
      status: form.status, monthDays: Number(form.monthDays) || 0,
      overtime: Number(form.overtime) || 0, advance: Number(form.advance) || 0,
    };
    if (editId) {
      editLabour(editId, data);
    } else {
      addLabour({ id: nextId("L", labour), ...data });
    }
    setOpen(false);
    setEditId(null);
    setForm({ name:"",aadhaar:"",mobile:"",trade:"Mason",dailyWage:"700",site:"",joinDate:"",status:"present",monthDays:"26",overtime:"0",advance:"0" });
  }

  function handleOpenAdd() {
    setEditId(null);
    setForm({ name:"",aadhaar:"",mobile:"",trade:"Mason",dailyWage:"700",site:"",joinDate:"",status:"present",monthDays:"26",overtime:"0",advance:"0" });
    setOpen(true);
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard icon="👷" label="Total Registered" value={String(labour.length)}      iconClass="bg-blue-50 text-blue-600" />
        <StatCard icon="✅" label="Present Today"    value={String(present)}            iconClass="bg-green-50 text-green-600" />
        <StatCard icon="❌" label="Absent Today"     value={String(absent)}             iconClass="bg-red-50 text-red-600" />
        <StatCard icon="💵" label="Daily Labour Cost" value={formatCurrency(dailyCost)} iconClass="bg-amber-50 text-amber-600" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Labour Register ({filtered.length})</CardTitle>
          <div className="flex flex-wrap gap-2">
            <input value={search} onChange={e => setSearch(e.target.value)}
              className="px-3 py-1.5 text-[12px] border border-cement-200 rounded-lg bg-white text-cement-600 focus:outline-none w-36"
              placeholder="🔍 Search…" />
            <select value={tradeFilter} onChange={e => setTradeFilter(e.target.value)}
              className="px-3 py-1.5 text-[12px] border border-cement-200 rounded-lg bg-white text-cement-600 focus:outline-none">
              <option value="all">All Trades</option>
              {TRADES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <Button size="sm" variant="dark" onClick={handleOpenAdd}>＋ Add Worker</Button>
          </div>
        </CardHeader>
        <CardBody className="!pt-0">
          <div className="overflow-x-auto">
            <table className="data-table w-full">
              <thead><tr><th>Name</th><th>Trade</th><th>Site</th><th>Daily Wage</th><th>Days</th><th>Net Salary</th><th>Attendance</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={8} className="text-center py-10 text-cement-400">No workers found. Click ＋ Add Worker to register one.</td></tr>
                )}
                {filtered.map(l => {
                  const gross = l.dailyWage * l.monthDays + (l.overtime * l.dailyWage / 8);
                  const net   = gross - l.advance;
                  return (
                    <tr key={l.id}>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-cement-700 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                            {l.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
                          </div>
                          <div>
                            <div className="font-semibold text-cement-900 text-[13px]">{l.name}</div>
                            <div className="text-[10px] text-cement-400">{l.mobile}</div>
                          </div>
                        </div>
                      </td>
                      <td><span className="text-[10px] font-semibold px-2 py-0.5 bg-cement-50 border border-cement-200 rounded-full text-cement-600">{l.trade}</span></td>
                      <td className="text-cement-500 text-[12px]">{l.site}</td>
                      <td className="font-semibold text-cement-900">₹{l.dailyWage}</td>
                      <td className="text-cement-700 font-medium">{l.monthDays}</td>
                      <td className="font-bold text-cement-900">₹{net.toLocaleString()}</td>
                      <td>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusStyle[l.status]}`}>
                          {l.status}
                        </span>
                      </td>
                      <td>
                        <div className="flex gap-1">
                          <button onClick={() => {
                            setEditId(l.id);
                            setForm({ name: l.name, aadhaar: l.aadhaar, mobile: l.mobile, trade: l.trade, dailyWage: String(l.dailyWage), site: l.site, joinDate: l.joinDate, status: l.status, monthDays: String(l.monthDays), overtime: String(l.overtime), advance: String(l.advance) });
                            setOpen(true);
                          }} className="px-2 py-1 text-[11px] bg-blue-50 border border-blue-200 rounded text-blue-600 font-medium hover:bg-blue-100 transition">✏️</button>
                          <button onClick={() => setSlipWorkerId(l.id)} className="px-2 py-1 text-[11px] bg-cement-50 border border-cement-200 rounded text-cement-600 font-medium hover:bg-cement-100 transition">📋 Slip</button>
                          <button onClick={() => deleteLabour(l.id)} className="px-2 py-1 text-[11px] bg-red-50 border border-red-200 rounded text-red-600 font-medium hover:bg-red-100 transition">🗑️</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {/* ── Add/Edit Worker Modal ── */}
      <Modal open={open} onClose={() => setOpen(false)} title={editId ? "✏️ Edit Worker" : "➕ Add New Worker"} size="lg">
        <form onSubmit={handleSubmit}>
          <FormGrid>
            <Field label="Full Name *"><input required className={inputCls} value={form.name} onChange={e=>set("name",e.target.value)} placeholder="e.g. Ramesh Kumar" /></Field>
            <Field label="Mobile Number *"><input required type="tel" className={inputCls} value={form.mobile} onChange={e=>set("mobile",e.target.value)} placeholder="+91 XXXXX XXXXX" /></Field>
            <Field label="Aadhaar Number"><input className={inputCls} value={form.aadhaar} onChange={e=>set("aadhaar",e.target.value)} placeholder="XXXX-XXXX-XXXX" /></Field>
            <Field label="Trade *">
              <select required className={selectCls} value={form.trade} onChange={e=>set("trade",e.target.value)}>
                {TRADES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Assigned Site">
              <select className={selectCls} value={form.site} onChange={e=>set("site",e.target.value)}>
                <option value="">Select site…</option>
                {projects.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                <option value="Multiple">Multiple Sites</option>
              </select>
            </Field>
            <Field label="Daily Wage (₹)"><input type="number" className={inputCls} value={form.dailyWage} onChange={e=>set("dailyWage",e.target.value)} /></Field>
            <Field label="Joining Date"><input type="date" className={inputCls} value={form.joinDate} onChange={e=>set("joinDate",e.target.value)} /></Field>
            <Field label="Today's Status">
              <select className={selectCls} value={form.status} onChange={e=>set("status",e.target.value)}>
                {STATUS_OPT.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Working Days (Month)"><input type="number" min="0" max="31" className={inputCls} value={form.monthDays} onChange={e=>set("monthDays",e.target.value)} /></Field>
            <Field label="Overtime Hours"><input type="number" min="0" className={inputCls} value={form.overtime} onChange={e=>set("overtime",e.target.value)} /></Field>
            <Field label="Advance Paid (₹)"><input type="number" min="0" className={inputCls} value={form.advance} onChange={e=>set("advance",e.target.value)} /></Field>
          </FormGrid>
          <SubmitRow onCancel={() => setOpen(false)} label={editId ? "Save Changes" : "Save Worker"} />
        </form>
      </Modal>

      {/* ── Salary Slip Modal ── */}
      <Modal open={!!slipWorkerId} onClose={() => setSlipWorkerId(null)} title="📄 Salary Slip & Attendance" size="lg">
        {slipWorkerId && (() => {
          const w = labour.find(l => l.id === slipWorkerId);
          if (!w) return null;
          
          const gross = w.dailyWage * w.monthDays + (w.overtime * w.dailyWage / 8);
          const net = gross - w.advance;

          // Generate current month calendar
          const now = new Date();
          const year = now.getFullYear();
          const month = now.getMonth();
          const daysInMonth = new Date(year, month + 1, 0).getDate();
          const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday
          const monthName = now.toLocaleString('default', { month: 'long', year: 'numeric' });

          const blanks = Array.from({ length: firstDay }, (_, i) => i);
          const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

          const attArray = w.attendance || (() => {
            const arr: number[] = [];
            let c = 0;
            for (let d = 1; d <= daysInMonth; d++) {
              if (new Date(year, month, d).getDay() !== 0 && c < w.monthDays) {
                arr.push(d);
                c++;
              }
            }
            return arr;
          })();

          function toggleDay(d: number) {
            if (!w) return;
            if (new Date(year, month, d).getDay() === 0) return; // Cannot toggle Sundays
            let newAtt: number[];
            if (attArray.includes(d)) {
              newAtt = attArray.filter(x => x !== d);
            } else {
              newAtt = [...attArray, d].sort((a, b) => a - b);
            }
            editLabour(w.id, { attendance: newAtt, monthDays: newAtt.length });
          }

          return (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-cement-50 p-4 rounded-xl border border-cement-200">
                  <div className="text-[11px] font-bold text-cement-500 uppercase mb-1">Worker Details</div>
                  <div className="font-bold text-cement-900">{w.name}</div>
                  <div className="text-[12px] text-cement-600">{w.trade} • {w.site}</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 text-center">
                  <div className="text-[11px] font-bold text-blue-600 uppercase mb-1">Gross Salary</div>
                  <div className="font-black text-blue-700 text-lg">₹{gross.toLocaleString()}</div>
                  <div className="text-[11px] text-blue-500">{w.monthDays} days + {w.overtime}h OT</div>
                </div>
                <div className="bg-red-50 p-4 rounded-xl border border-red-200 text-center">
                  <div className="text-[11px] font-bold text-red-600 uppercase mb-1">Deductions</div>
                  <div className="font-black text-red-700 text-lg">₹{w.advance.toLocaleString()}</div>
                  <div className="text-[11px] text-red-500">Advance Paid</div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl border border-green-200 text-center">
                  <div className="text-[11px] font-bold text-green-600 uppercase mb-1">Net Payable</div>
                  <div className="font-black text-green-700 text-lg">₹{net.toLocaleString()}</div>
                  <div className="text-[11px] text-green-500">Final Salary</div>
                </div>
              </div>

              {/* Calendar */}
              <div>
                <h3 className="font-bold text-cement-900 mb-4 flex items-center justify-between">
                  <span>📅 Attendance Calendar</span>
                  <span className="text-accent-dark">{monthName}</span>
                </h3>
                
                <div className="grid grid-cols-7 gap-2 text-center text-[11px] font-bold text-cement-400 mb-2">
                  <div>SUN</div><div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div>
                </div>
                
                <div className="grid grid-cols-7 gap-2">
                  {blanks.map(b => <div key={`b-${b}`} className="h-14 bg-transparent" />)}
                  
                  {days.map(d => {
                    const dayOfWeek = new Date(year, month, d).getDay();
                    const isHoliday = dayOfWeek === 0;
                    const isPresent = attArray.includes(d);

                    let state = "absent";
                    let classes = "bg-red-50 text-red-600 border-red-200 cursor-pointer hover:bg-red-100 hover:scale-[1.02]";

                    if (isHoliday) {
                      state = "holiday";
                      classes = "bg-cement-100 text-cement-500 border-cement-200 cursor-not-allowed";
                    } else if (isPresent) {
                      state = "present";
                      classes = "bg-green-50 text-green-700 border-green-200 cursor-pointer hover:bg-green-100 hover:scale-[1.02]";
                    }

                    return (
                      <div key={d} onClick={() => toggleDay(d)} className={`h-14 rounded-lg border flex flex-col items-center justify-center transition-all active:scale-95 select-none ${classes}`}>
                        <span className="font-bold text-[14px] mb-0.5">{d}</span>
                        <span className="text-[9px] uppercase font-bold opacity-80">{state}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="flex justify-end pt-4 border-t border-cement-200 gap-3">
                <Button variant="ghost" onClick={() => setSlipWorkerId(null)}>Close</Button>
                <Button variant="dark" onClick={() => window.print()}>🖨️ Print Slip</Button>
              </div>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
}
