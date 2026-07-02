"use client";
import { useState } from "react";
import { useStore, nextId } from "@/lib/store";
import { StatCard, Card, CardHeader, CardTitle, CardBody, Button } from "@/components/ui";
import Modal, { Field, FormGrid, inputCls, selectCls, SubmitRow } from "@/components/Modal";
import { statusColor } from "@/lib/utils";
import type { User } from "@/lib/data";

const ROLES = ["Admin", "Site Manager", "Accountant", "Client", "Viewer"];

export default function UsersPage() {
  const { users, projects, addUser, deleteUser } = useStore();
  const [open, setOpen]     = useState(false);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filtered = users.filter(u =>
    (roleFilter === "all" || u.role === roleFilter) &&
    (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
  );

  const active = users.filter(u => u.status === "active").length;
  const managers = users.filter(u => u.role === "Site Manager").length;

  const [form, setForm] = useState({
    name: "", email: "", role: "Site Manager" as User["role"],
    projects: "All", status: "active" as User["status"]
  });
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const initials = form.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    addUser({
      id: nextId("U", users),
      name: form.name,
      email: form.email,
      role: form.role,
      projects: form.projects || "None",
      lastLogin: "Never",
      status: form.status,
      initials: initials || "?",
    });
    setOpen(false);
    setForm({ name: "", email: "", role: "Site Manager", projects: "All", status: "active" });
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard icon="👥" label="Total Users"    value={String(users.length)} iconClass="bg-blue-50 text-blue-600" />
        <StatCard icon="🟢" label="Active Users"   value={String(active)}       iconClass="bg-green-50 text-green-600" />
        <StatCard icon="🏗️" label="Site Managers"  value={String(managers)}     iconClass="bg-amber-50 text-amber-600" />
        <StatCard icon="🔒" label="Admins"         value={String(users.filter(u=>u.role==="Admin").length)} iconClass="bg-red-50 text-red-600" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Management ({filtered.length})</CardTitle>
          <div className="flex flex-wrap gap-2">
            <input value={search} onChange={e => setSearch(e.target.value)}
              className="px-3 py-1.5 text-[12px] border border-cement-200 rounded-lg bg-white text-cement-600 focus:outline-none w-36"
              placeholder="🔍 Search…" />
            <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}
              className="px-3 py-1.5 text-[12px] border border-cement-200 rounded-lg bg-white text-cement-600 focus:outline-none">
              <option value="all">All Roles</option>
              {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <Button size="sm" variant="dark" onClick={() => setOpen(true)}>＋ Add User</Button>
          </div>
        </CardHeader>
        <CardBody className="!pt-0">
          <div className="table-scroll">
            <table className="data-table w-full">
              <thead><tr><th>User</th><th>Role</th><th>Email Address</th><th>Assigned Projects</th><th>Last Login</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={7} className="text-center py-10 text-cement-400">No users found. Click ＋ Add User.</td></tr>
                )}
                {filtered.map(u => (
                  <tr key={u.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-cement-800 text-white flex items-center justify-center text-[11px] font-bold">
                          {u.initials}
                        </div>
                        <div>
                          <div className="font-semibold text-cement-900">{u.name}</div>
                          <div className="text-[10px] text-cement-400">ID: {u.id}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className="text-[10px] font-semibold px-2 py-0.5 bg-cement-50 border border-cement-200 rounded-full text-cement-600">{u.role}</span></td>
                    <td className="text-cement-600 text-[12px]">{u.email}</td>
                    <td className="text-cement-600 text-[12px]">{u.projects}</td>
                    <td className="text-cement-400 text-[11px] whitespace-nowrap">{u.lastLogin}</td>
                    <td>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColor(u.status)} uppercase`}>
                        {u.status}
                      </span>
                    </td>
                    <td>
                      <button onClick={() => deleteUser(u.id)} className="px-2 py-1 text-[11px] bg-red-50 border border-red-200 rounded text-red-600 font-medium hover:bg-red-100 transition">🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title="➕ Add New User" size="lg">
        <form onSubmit={handleSubmit}>
          <FormGrid>
            <Field label="Full Name *"><input required className={inputCls} value={form.name} onChange={e=>set("name",e.target.value)} placeholder="e.g. Rahul Verma" /></Field>
            <Field label="Email Address *"><input required type="email" className={inputCls} value={form.email} onChange={e=>set("email",e.target.value)} placeholder="rahul@dnbconstructions.in" /></Field>
            <Field label="System Role">
              <select className={selectCls} value={form.role} onChange={e=>set("role",e.target.value as any)}>
                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </Field>
            <Field label="Assigned Projects">
              <select className={selectCls} value={form.projects} onChange={e=>set("projects",e.target.value)}>
                <option value="All">All Projects (Admin/Accountant)</option>
                {projects.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
              </select>
            </Field>
            <Field label="Account Status">
              <select className={selectCls} value={form.status} onChange={e=>set("status",e.target.value as any)}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </Field>
          </FormGrid>
          <SubmitRow onCancel={() => setOpen(false)} label="Create User" />
        </form>
      </Modal>
    </div>
  );
}
