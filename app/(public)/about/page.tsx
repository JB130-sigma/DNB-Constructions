import { SectionHeader } from "@/components/ui";

const team = [
  { name: "Suresh Patel",   role: "Chairman & MD",          exp: "30+ years", initials: "SP" },
  { name: "Rekha Patel",    role: "Director – Finance",      exp: "25+ years", initials: "RP" },
  { name: "Vikram Shah",    role: "VP – Operations",         exp: "18+ years", initials: "VS" },
  { name: "Priya Nair",     role: "Sr. Site Manager",        exp: "12+ years", initials: "PN" },
  { name: "Rohan Kaul",     role: "CFO",                     exp: "15+ years", initials: "RK" },
  { name: "Deepak Joshi",   role: "Project Manager",         exp: "10+ years", initials: "DJ" },
];

const certs = [
  { icon: "🏆", title: "ISO 9001:2015",         desc: "Quality Management System" },
  { icon: "🛡️", title: "ISO 14001:2015",         desc: "Environmental Management" },
  { icon: "⚙️", title: "ISO 45001:2018",         desc: "Occupational Health & Safety" },
  { icon: "📋", title: "CPWD Class-I Contractor", desc: "Central Public Works Dept." },
  { icon: "🏛️", title: "Gujarat PWD Registered", desc: "State PWD Empanelment" },
  { icon: "🔑", title: "NHAI Empanelled",         desc: "National Highway Auth. India" },
];

const milestones = [
  { year: "2003", text: "DNB Constructions established in Vadodara by Suresh Patel." },
  { year: "2008", text: "Crossed ₹50 Cr turnover milestone. First CPWD project awarded." },
  { year: "2012", text: "ISO 9001 certification obtained. Expanded to infrastructure projects." },
  { year: "2017", text: "Crossed 200 projects mark. Labour strength surpassed 1,000 workers." },
  { year: "2020", text: "NHAI empanelment achieved. NH-48 Expressway work commenced." },
  { year: "2024", text: "₹850 Cr in total project delivery. 340+ projects completed." },
];

export default function AboutPage() {
  return (
    <>
      {/* Banner */}
      <section className="bg-dark-800 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest mb-4">About Us</div>
          <h1 className="text-[3rem] font-black text-white leading-tight tracking-tight mb-4">
            Two Decades of<br /><span className="text-accent">Building Excellence</span>
          </h1>
          <p className="text-white/50 max-w-xl text-[1rem] leading-relaxed">
            DNB Constructions Pvt. Ltd. is a premier civil construction contractor headquartered in Vadodara, Gujarat. We specialize in large-scale infrastructure, commercial, industrial, and residential construction across India.
          </p>
        </div>
      </section>
      <div className="hazard-stripe" />

      {/* Vision & Mission */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-cement-50 rounded-2xl p-8 border border-cement-200">
            <div className="text-3xl mb-4">🎯</div>
            <h2 className="text-[1.5rem] font-bold text-cement-900 mb-3">Our Vision</h2>
            <p className="text-cement-600 leading-relaxed">To be India's most trusted and innovative civil construction company — building the nation's infrastructure with unmatched quality, safety, and sustainability for generations to come.</p>
          </div>
          <div className="bg-cement-50 rounded-2xl p-8 border border-cement-200">
            <div className="text-3xl mb-4">🚀</div>
            <h2 className="text-[1.5rem] font-bold text-cement-900 mb-3">Our Mission</h2>
            <p className="text-cement-600 leading-relaxed">To deliver every project on time, within budget, and to the highest quality standards while maintaining the safety and well-being of our workers and stakeholders.</p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-cement-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader tag="Our Journey" title="Company Milestones" />
          <div className="relative border-l-2 border-cement-200 ml-6 pl-8 space-y-8">
            {milestones.map((m) => (
              <div key={m.year} className="relative">
                <div className="absolute -left-11 w-7 h-7 bg-accent rounded-full flex items-center justify-center text-[10px] font-black text-cement-900">{m.year.slice(2)}</div>
                <div className="text-[13px] font-bold text-accent-dark mb-1">{m.year}</div>
                <p className="text-[14px] text-cement-700">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader tag="Our People" title="Leadership Team" sub="Experienced professionals driving excellence across all operations." />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {team.map((t) => (
              <div key={t.name} className="text-center">
                <div className="w-16 h-16 bg-cement-800 rounded-2xl flex items-center justify-center font-bold text-white text-xl mx-auto mb-3">{t.initials}</div>
                <div className="font-bold text-[14px] text-cement-900">{t.name}</div>
                <div className="text-[12px] text-cement-500 mt-0.5">{t.role}</div>
                <div className="text-[11px] text-accent-dark font-semibold mt-1">{t.exp}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-cement-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader tag="Credentials" title="Licenses & Certifications" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certs.map((c) => (
              <div key={c.title} className="bg-white border border-cement-200 rounded-2xl p-5 flex items-start gap-4 hover:shadow-card transition-shadow">
                <div className="text-3xl">{c.icon}</div>
                <div>
                  <div className="font-bold text-[15px] text-cement-900">{c.title}</div>
                  <div className="text-[13px] text-cement-500 mt-0.5">{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
