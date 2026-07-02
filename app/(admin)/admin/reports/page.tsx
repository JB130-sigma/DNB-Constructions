"use client";
import { useStore } from "@/lib/store";
import { MONTHLY_REVENUE, EXPENSE_BY_CATEGORY } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardBody, Button, StatCard } from "@/components/ui";
import { formatCurrency } from "@/lib/utils";
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from "recharts";

const CF = { fontFamily: "Inter,sans-serif", fontSize: 11, fill: "#8C8C7A" };

const reportTypes = [
  { icon: "📊", label: "Expense Report",   desc: "Category-wise expense summary" },
  { icon: "📦", label: "Material Report",  desc: "Inventory & consumption analytics" },
  { icon: "👷", label: "Labour Report",    desc: "Attendance, wages & salary slips" },
  { icon: "🏗️", label: "Project Report",   desc: "Progress & milestone tracking" },
  { icon: "💰", label: "P&L Report",       desc: "Profit & loss statements" },
  { icon: "🧾", label: "GST Report",       desc: "GST input/output reconciliation" },
  { icon: "🚛", label: "Vendor Report",    desc: "Supplier payments & outstanding" },
  { icon: "📋", label: "Daily Site Report",desc: "Auto-generated daily site logs" },
];

const labourCost = [
  { month: "Jan", cost: 2100 }, { month: "Feb", cost: 2400 },
  { month: "Mar", cost: 2800 }, { month: "Apr", cost: 3100 },
  { month: "May", cost: 3400 }, { month: "Jun", cost: 3800 },
];

export default function ReportsPage() {
  const { materials, invoices, projects } = useStore();

  // AI Prediction Logic
  const insights = [];
  
  const lowStock = materials.filter(m => m.remaining <= m.minStock);
  if (lowStock.length > 0) {
    insights.push({
       icon: "🧱",
       color: "text-amber-600 bg-amber-50 border-amber-200",
       title: "Material Shortage Predicted",
       desc: `${lowStock.length} materials (including ${lowStock[0].name}) are at or below minimum stock levels. Expect procurement delays if not ordered within 48 hours.`
    });
  }

  const overdue = invoices.filter(i => i.status === "overdue");
  if (overdue.length > 0) {
    insights.push({
      icon: "💸",
      color: "text-red-600 bg-red-50 border-red-200",
      title: "Cashflow Bottleneck",
      desc: `You have ${overdue.length} overdue invoice(s) totaling ${formatCurrency(overdue.reduce((a,i)=>a+i.amount,0))}. Follow up with ${overdue[0].client} immediately.`
    });
  }

  const delayedProjects = projects.filter(p => p.status === "delayed");
  if (delayedProjects.length > 0) {
    insights.push({
      icon: "🏗️",
      color: "text-orange-600 bg-orange-50 border-orange-200",
      title: "Schedule Slippage",
      desc: `Project "${delayedProjects[0].name}" is marked as delayed. Consider reallocating labour from completed sites to accelerate progress.`
    });
  }

  if (insights.length === 0) {
    insights.push({
      icon: "✨",
      color: "text-green-600 bg-green-50 border-green-200",
      title: "All Systems Nominal",
      desc: "No critical bottlenecks detected in inventory, cashflow, or schedules. Great job!"
    });
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard icon="📋" label="Reports Generated" value="142" iconClass="bg-blue-50 text-blue-600" />
        <StatCard icon="📥" label="Downloads (Month)"  value="38"  iconClass="bg-green-50 text-green-600" />
        <StatCard icon="📅" label="Scheduled Reports"  value="8"   iconClass="bg-amber-50 text-amber-600" />
        <StatCard icon="⚡" label="AI Predictions"     value={String(insights.length)} iconClass="bg-purple-50 text-purple-600" />
      </div>

      {/* AI Insights Section */}
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-purple-600">✨</span> AI Predictions & Insights
            </div>
          </CardTitle>
          <span className="text-[11px] text-cement-400 bg-cement-100 px-2 py-1 rounded">Live Data Analysis</span>
        </CardHeader>
        <CardBody className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {insights.map((insight, idx) => (
            <div key={idx} className={`p-4 rounded-xl border ${insight.color} flex flex-col gap-2`}>
              <div className="flex items-center gap-2 font-bold text-[13px] mb-1">
                <span className="text-lg">{insight.icon}</span> {insight.title}
              </div>
              <p className="text-[12px] opacity-90 leading-relaxed">
                {insight.desc}
              </p>
            </div>
          ))}
        </CardBody>
      </Card>

      {/* Generate Report Cards */}
      <Card>
        <CardHeader><CardTitle>Generate Reports</CardTitle></CardHeader>
        <CardBody>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {reportTypes.map(r => (
              <button key={r.label}
                className="bg-cement-50 border border-cement-200 rounded-xl p-4 text-left hover:border-cement-400 hover:bg-white hover:shadow-card transition-all group">
                <div className="text-2xl mb-2">{r.icon}</div>
                <div className="text-[13px] font-bold text-cement-900 group-hover:text-cement-700">{r.label}</div>
                <div className="text-[11px] text-cement-400 mt-0.5">{r.desc}</div>
                <div className="mt-2 text-[11px] font-bold text-accent-dark opacity-0 group-hover:opacity-100 transition-opacity">Generate →</div>
              </button>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader><CardTitle>Revenue Trend</CardTitle><Button size="sm" variant="ghost">📥 Export</Button></CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={MONTHLY_REVENUE}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#374151" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#374151" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#eceae4" />
                <XAxis dataKey="month" tick={CF} axisLine={false} tickLine={false} />
                <YAxis tick={CF} axisLine={false} tickLine={false} tickFormatter={v=>`₹${v}L`} />
                <Tooltip formatter={(v: any)=>[`₹${v}L`]} />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#374151" fill="url(#revGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <Card>
          <CardHeader><CardTitle>Labour Cost Trend</CardTitle><Button size="sm" variant="ghost">📥 Export</Button></CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={labourCost} barSize={18}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eceae4" />
                <XAxis dataKey="month" tick={CF} axisLine={false} tickLine={false} />
                <YAxis tick={CF} axisLine={false} tickLine={false} tickFormatter={v=>`₹${v}L`} />
                <Tooltip formatter={(v: any)=>[`₹${v}L`, "Labour Cost"]} />
                <Bar dataKey="cost" name="Labour Cost" fill="#8C8C7A" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
