"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardBody, Button } from "@/components/ui";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-5 max-w-3xl">
      {saved && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-[13px] text-green-700 font-semibold">
          ✅ Settings saved successfully.
        </div>
      )}

      {/* Company Info */}
      <Card>
        <CardHeader><CardTitle>Company Information</CardTitle></CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Company Name",       val: "DNB Constructions Pvt. Ltd." },
              { label: "CIN",                val: "U45200GJ2003PTC043211" },
              { label: "GST Number",         val: "24AABCB1234M1Z5" },
              { label: "PAN",                val: "AABCB1234M" },
              { label: "Phone",              val: "+91 98765 43210" },
              { label: "Email",              val: "info@dnbconstructions.in" },
              { label: "Website",            val: "www.dnbconstructions.in" },
              { label: "Registered Address", val: "DNB House, Alkapuri, Vadodara – 390007" },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-[11px] font-bold text-cement-400 uppercase tracking-wide mb-1.5">{f.label}</label>
                <input defaultValue={f.val} className="w-full bg-cement-50 border border-cement-200 rounded-lg px-3 py-2.5 text-[13px] text-cement-900 focus:outline-none focus:border-cement-500" />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader><CardTitle>Notification Settings</CardTitle></CardHeader>
        <CardBody>
          <div className="space-y-3">
            {[
              { label: "Low Material Stock Alert",     sub: "Alert when inventory drops below minimum" },
              { label: "Labour Salary Due Reminder",   sub: "3 days before salary date" },
              { label: "Project Deadline Alert",       sub: "7 days before project end date" },
              { label: "Overdue Invoice Notification", sub: "Daily reminder for overdue invoices" },
              { label: "Daily Site Report Email",      sub: "Automated site summary at 8 PM" },
              { label: "WhatsApp Notifications",       sub: "Send critical alerts via WhatsApp" },
            ].map((n, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-cement-100 last:border-0">
                <div>
                  <div className="text-[13px] font-semibold text-cement-900">{n.label}</div>
                  <div className="text-[12px] text-cement-400">{n.sub}</div>
                </div>
                <button className={`relative w-11 h-6 rounded-full transition-colors ${i < 4 ? "bg-cement-700" : "bg-cement-200"}`}>
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${i < 4 ? "left-5" : "left-0.5"}`} />
                </button>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader><CardTitle>Security & Access</CardTitle></CardHeader>
        <CardBody>
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-cement-400 uppercase tracking-wide mb-1.5">Current Password</label>
              <input type="password" className="w-full bg-cement-50 border border-cement-200 rounded-lg px-3 py-2.5 text-[13px] focus:outline-none focus:border-cement-500" placeholder="••••••••" />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-cement-400 uppercase tracking-wide mb-1.5">New Password</label>
              <input type="password" className="w-full bg-cement-50 border border-cement-200 rounded-lg px-3 py-2.5 text-[13px] focus:outline-none focus:border-cement-500" placeholder="••••••••" />
            </div>
            <div className="flex items-center justify-between py-3 border border-cement-200 rounded-xl px-4">
              <div>
                <div className="text-[13px] font-semibold text-cement-900">Two-Factor Authentication (2FA)</div>
                <div className="text-[12px] text-cement-400">Secure your account with Google Authenticator</div>
              </div>
              <button className="px-3 py-1.5 text-[12px] font-bold bg-cement-900 text-white rounded-lg hover:bg-cement-700 transition">Enable 2FA</button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Backup */}
      <Card>
        <CardHeader><CardTitle>Backup & Data</CardTitle></CardHeader>
        <CardBody>
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-cement-50 border border-cement-200 rounded-xl text-[13px] font-semibold text-cement-700 hover:bg-cement-100 transition">
              💾 Backup Now
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-cement-50 border border-cement-200 rounded-xl text-[13px] font-semibold text-cement-700 hover:bg-cement-100 transition">
              📥 Export All Data (Excel)
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-cement-50 border border-cement-200 rounded-xl text-[13px] font-semibold text-cement-700 hover:bg-cement-100 transition">
              📊 Generate Audit Log
            </button>
            <div className="w-full text-[12px] text-cement-400 pt-1">Last backup: Today, 3:00 AM · Stored on AWS S3</div>
          </div>
        </CardBody>
      </Card>

      <Button variant="dark" className="!px-8 !py-3" onClick={() => setSaved(true)}>
        💾 Save All Settings
      </Button>
    </div>
  );
}
