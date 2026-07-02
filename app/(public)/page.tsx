import Link from "next/link";
import { PROJECTS } from "@/lib/data";
import { SectionHeader } from "@/components/ui";

const stats = [
  { val: "340+", label: "Projects Completed", icon: "🏗️" },
  { val: "22yr",  label: "Years Experience",   icon: "📅" },
  { val: "₹850Cr",label: "Projects Delivered", icon: "💰" },
  { val: "1,200+",label: "Skilled Workers",    icon: "👷" },
];

const services = [
  { icon: "🏢", title: "Commercial Buildings",  desc: "High-rise offices, malls, industrial parks and warehouses built to international standards." },
  { icon: "🛣️", title: "Road & Highway",         desc: "Expressways, flyovers, underpasses, and rural roads with MORTH specifications." },
  { icon: "🏠", title: "Residential Projects",   desc: "Affordable housing, luxury villas, townships, and apartment complexes." },
  { icon: "💧", title: "Water & Sanitation",     desc: "Dams, pipelines, water treatment plants, and sewage infrastructure." },
  { icon: "⚡", title: "Industrial Structures",  desc: "Factories, power plants, substations, and heavy industrial construction." },
  { icon: "🔧", title: "Renovation & Retrofit",  desc: "Structural strengthening, seismic retrofitting, and building restoration." },
];

const testimonials = [
  { name: "Rajesh Kumar",  role: "MD, Skyline Developers",    rating: 5, text: "DNB Constructions delivered our 28-storey tower on schedule with zero compromises on quality. Their project management is world-class." },
  { name: "Sushma Mehta",  role: "IAS, GSHEB",                rating: 5, text: "The highway project was executed with exceptional precision. Attention to safety protocols and timeline adherence was commendable." },
  { name: "Arjun Patel",   role: "Director, Patel Industries", rating: 4, text: "Transparent communication, regular updates, quality output. DNB is our go-to contractor for all infrastructure needs." },
];

export default function HomePage() {
  const featured = PROJECTS.filter(p => ["P001","P002","P004"].includes(p.id));

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-cement-50 via-white to-cement-100 overflow-hidden min-h-[600px] flex items-center">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%238C8C7A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[220px] opacity-[0.04] select-none pointer-events-none">🏗️</div>

        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 text-accent-dark px-4 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-widest mb-6">
              🏆 ISO 9001:2015 Certified · Class-I Contractor (CPWD)
            </div>
            <h1 className="text-[3.5rem] font-black text-cement-900 leading-[1.1] tracking-tight mb-5">
              Building <span className="text-accent-dark">Tomorrow's</span><br />Infrastructure Today
            </h1>
            <p className="text-cement-500 text-[1.05rem] leading-relaxed mb-8">
              Over two decades of excellence in civil construction — from bridges to high-rises, highways to housing. We build with precision, integrity, and passion.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <Link href="/projects"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 bg-cement-900 text-white font-bold rounded-xl hover:bg-cement-700 transition-all shadow-lg active:scale-95">
                👁️ View Our Work
              </Link>
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 bg-white text-cement-700 font-semibold rounded-xl border-2 border-cement-200 hover:border-cement-400 hover:text-cement-900 transition-all active:scale-95">
                Get a Quote →
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-6 mt-10 pt-8 border-t-2 border-cement-200">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-[1.8rem] sm:text-[2rem] font-black text-cement-900 leading-none">{s.val}</div>
                  <div className="text-[12px] text-cement-400 font-medium mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hazard stripe */}
      <div className="hazard-stripe" />

      {/* ── SERVICES ── */}
      <section className="bg-cement-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader tag="What We Build" title="Our Core Services" sub="End-to-end civil construction services backed by expert teams, modern machinery, and proven methodologies." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <div key={s.title}
                className="bg-white border border-cement-200 rounded-2xl p-6 hover:shadow-card-hover hover:-translate-y-1 transition-all group relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-accent-dark scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-t-2xl" />
                <div className="w-12 h-12 bg-cement-100 rounded-xl flex items-center justify-center text-2xl mb-4 border border-cement-200">{s.icon}</div>
                <h3 className="font-bold text-[16px] text-cement-900 mb-2">{s.title}</h3>
                <p className="text-[13px] text-cement-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <SectionHeader tag="Portfolio" title="Featured Projects" sub="A snapshot of our landmark construction achievements across sectors." />
            <Link href="/projects" className="text-[13px] font-bold text-accent-dark hover:underline">View All →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((p) => (
              <Link key={p.id} href={`/projects/${p.id}`}
                className="group bg-white border border-cement-200 rounded-2xl overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all">
                <div className="h-44 bg-cement-100 flex items-center justify-center text-7xl border-b border-cement-200 relative">
                  {p.icon}
                  <span className={`absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-full border ${p.status === "completed" ? "bg-green-50 text-green-700 border-green-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>
                    {p.status === "completed" ? "Completed" : "In Progress"}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[15px] text-cement-900 mb-1">{p.name}</h3>
                  <div className="text-[12px] text-cement-400 flex items-center gap-1 mb-3">📍 {p.location}</div>
                  <div className="bg-cement-100 h-1.5 rounded-full overflow-hidden mb-2">
                    <div className="h-full rounded-full bg-gradient-to-r from-accent to-accent-dark" style={{ width: `${p.progress}%` }} />
                  </div>
                  <div className="flex justify-between text-[12px] text-cement-400 font-medium">
                    <span>₹{(p.budget / 100).toFixed(0)} Cr</span>
                    <span>{p.progress}% complete</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-cement-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader tag="Client Words" title="What Our Clients Say" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white border border-cement-200 rounded-2xl p-6 relative">
                <div className="absolute top-4 right-6 text-[60px] text-cement-100 font-serif leading-none select-none">"</div>
                <div className="text-amber-400 text-[16px] mb-3">{"★".repeat(t.rating)}{"☆".repeat(5-t.rating)}</div>
                <p className="text-[14px] text-cement-600 italic leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cement-800 rounded-full flex items-center justify-center font-bold text-[13px] text-white">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="font-bold text-[14px] text-cement-900">{t.name}</div>
                    <div className="text-[12px] text-cement-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-dark-800 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-[2rem] font-black text-white mb-3">Ready to Start Your Project?</div>
          <p className="text-white/50 mb-8 text-[1rem]">Get a free consultation and detailed project estimate within 24 hours.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 flex-wrap px-4">
            <Link href="/contact"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-accent text-cement-900 font-bold rounded-xl hover:bg-accent-dark hover:text-white transition-all text-[15px] active:scale-95">
              📞 Get Free Estimate
            </Link>
            <Link href="/projects"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/10 text-[15px] active:scale-95">
              View Portfolio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
