"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useStore();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    
    // Accept any password,just validate the email against our store
    if (login(email)) {
      router.push("/admin/dashboard");
    } else {
      setError("Invalid email address. Please use a registered account.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-800 p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-xl shadow-lg shadow-accent/20">🏗️</div>
            <span className="text-white font-extrabold text-[22px] tracking-tight">
              DNB <span className="text-accent">Constructions</span>
            </span>
          </Link>
          <h1 className="text-[1.8rem] font-black text-white leading-tight mb-2">Welcome Back</h1>
          <p className="text-white/50 text-[14px]">Sign in to the Admin ERP Portal.</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-[13px] font-medium text-center">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-[11px] font-bold text-white/60 uppercase tracking-wide mb-2">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3.5 text-[14px] text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder-white/20"
                placeholder="admin@dnb.com"
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[11px] font-bold text-white/60 uppercase tracking-wide">Password</label>
                <span className="text-[11px] text-accent font-medium hover:underline cursor-pointer">Forgot?</span>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3.5 text-[14px] text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder-white/20"
                placeholder="••••••••"
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3.5 bg-accent text-cement-900 font-bold rounded-xl hover:bg-accent-dark hover:text-white transition-all shadow-lg shadow-accent/20 active:scale-95 text-[14px] mt-2"
            >
              Sign In
            </button>
          </form>
        </div>

        <div className="text-center mt-8 text-[12px] text-white/40">
          <p>Demo Accounts:</p>
          <p className="mt-1 font-medium text-white/60">Dhruvil@dnbconstructions.in • rohan@dnbconstructions.in</p>
        </div>
      </div>
    </div>
  );
}
