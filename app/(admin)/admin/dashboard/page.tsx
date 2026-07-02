"use client";
import { useStore } from "@/lib/store";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { StatCard, Card, CardHeader, CardTitle, CardBody, Progress } from "@/components/ui";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { MONTHLY_REVENUE } from "@/lib/data"; // Keep static revenue trend for visual demo if invoices don't have enough history

const CF = { fontFamily: "Inter,sans-serif", fontSize: 11, fill: "#8C8C7A" };

export default function DashboardPage() {
  const { projects, labour, invoices, materials } = useStore();

  const activeProjects = projects.filter(p => p.status === "ongoing").length;
  const totalLabour = labour.filter(l => l.status === "present").length;
  const revenue = invoices.filter(i => i.status === "paid").reduce((a, i) => a + i.amount, 0);
  const pendingPay = invoices.filter(i => i.status === "pending" || i.status === "overdue").reduce((a, i) => a + i.amount, 0);

  const statusCounts = { ongoing: 0, completed: 0, delayed: 0, "on-hold": 0 };
  projects.forEach(p => { 
    if (p.status in statusCounts) {
      statusCounts[p.status as keyof typeof statusCounts] += 1; 
    }
  });

  const projectStatusData = [
    { name: "On Track",   value: statusCounts.ongoing, fill: "#374151" },
    { name: "Delayed",    value: statusCounts.delayed, fill: "#d97706" },
    { name: "On Hold",    value: statusCounts["on-hold"], fill: "#dc2626" },
    { name: "Completed",  value: statusCounts.completed, fill: "#16a34a" },
  ];

  const lowStock = materials.filter(m => m.remaining <= m.minStock);
  const overdueInvoices = invoices.filter(i => i.status === "overdue");

  return (
    <div className="space-y-5">
      {/* Alert banner */}
      {(lowStock.length > 0 || overdueInvoices.length > 0) && (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-[13px]">
          <span className="text-amber-500 text-lg">⚠️</span>
          <div>
            <span className="font-bold text-amber-800">{lowStock.length + overdueInvoices.length} Alerts: </span>
            <span className="text-amber-700">
              {lowStock.length > 0 ? `${lowStock.length} materials running low on stock. ` : ""}
              {overdueInvoices.length > 0 ? `${overdueInvoices.length} invoices are currently overdue.` : ""}
            </span>
          </div>
          <div className="ml-auto text-[12px] text-amber-600 font-semibold cursor-pointer hover:underline">View All</div>
        </div>
      )}

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard icon="🏗️" label="Active Projects"  value={String(activeProjects)} delta="live from store" deltaUp iconClass="bg-blue-50 text-blue-600" />
        <StatCard icon="💰" label="Total Revenue"    value={formatCurrency(revenue, true)} delta="paid invoices" deltaUp iconClass="bg-green-50 text-green-600" />
        <StatCard icon="👷" label="Present Workers"  value={String(totalLabour)} delta="clocked in today" deltaUp iconClass="bg-amber-50 text-amber-600" />
        <StatCard icon="🧾" label="Pending Payments" value={formatCurrency(pendingPay, true)} delta={`${overdueInvoices.length} overdue`} deltaUp={false} iconClass="bg-red-50 text-red-600" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader><CardTitle>Revenue vs Expenditure</CardTitle><span className="text-[12px] text-cement-400">Monthly – 2025 (Demo Data)</span></CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={MONTHLY_REVENUE} barSize={12}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eceae4" />
                <XAxis dataKey="month" tick={CF} axisLine={false} tickLine={false} />
                <YAxis tick={CF} axisLine={false} tickLine={false} tickFormatter={v => `₹${v}L`} />
                <Tooltip formatter={(v: any) => [`₹${v}L`]} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="revenue" name="Revenue"  fill="#374151" radius={[4,4,0,0]} />
                <Bar dataKey="expense" name="Expense"  fill="#d1d5db" radius={[4,4,0,0]} />
                <Bar dataKey="profit"  name="Profit"   fill="#8C8C7A" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <Card>
          <CardHeader><CardTitle>Project Status Breakdown</CardTitle><span className="text-[12px] text-cement-400">Live Data</span></CardHeader>
          <CardBody className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={projectStatusData} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={3} dataKey="value" stroke="none">
                  {projectStatusData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" align="right" verticalAlign="middle" wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>

      {/* Projects */}
      <div className="grid grid-cols-1 gap-5">
        <Card>
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
            <Link href="/admin/projects" className="text-[12px] font-bold text-accent-dark hover:underline">View all →</Link>
          </CardHeader>
          <CardBody className="!pt-0">
            <div className="table-scroll">
              <table className="data-table w-full">
                <thead><tr><th>Project</th><th>Progress</th><th>Budget Used</th><th>Status</th><th>Due Date</th></tr></thead>
                <tbody>
                  {projects.filter(p => p.status === "ongoing" || p.status === "delayed").slice(0,5).map(p => (
                    <tr key={p.id}>
                      <td><span className="font-semibold text-cement-900">{p.name}</span></td>
                      <td>
                        <div className="flex flex-wrap items-center gap-2">
                          <Progress value={p.progress} className="h-1.5 w-24" />
                          <span className="text-[11px] font-bold text-cement-500">{p.progress}%</span>
                        </div>
                      </td>
                      <td className="text-cement-600 font-medium">
                        {formatCurrency(p.spent, true)} <span className="text-cement-400 font-normal">/ {formatCurrency(p.budget, true)}</span>
                      </td>
                      <td>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${p.status === "delayed" ? "bg-red-50 text-red-700 border-red-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>
                          {p.status === "ongoing" ? "On Track" : "Delayed"}
                        </span>
                      </td>
                      <td className="text-cement-400 text-[12px]">{new Date(p.endDate).toLocaleDateString("en-IN",{month:"short",year:"numeric"})}</td>
                    </tr>
                  ))}
                  {projects.filter(p => p.status === "ongoing" || p.status === "delayed").length === 0 && (
                     <tr><td colSpan={5} className="text-center py-8 text-cement-400">No active projects running.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
