import Link from "next/link";

export default function PublicFooter() {
  return (
    <footer className="bg-dark-800 text-white/50 text-[13px]">
      {/* Hazard stripe */}
      <div className="hazard-stripe" />
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">🏗️</div>
            <span className="text-white font-extrabold text-[16px]">DNB <span className="text-accent">Constructions</span></span>
          </div>
          <p className="leading-relaxed max-w-sm">
            ISO 9001:2015 Certified Civil Construction Contractor. Building tomorrow's infrastructure with precision, integrity, and passion since 2003.
          </p>
          <div className="flex gap-3 mt-4">
            {["📘","📷","🐦","▶️"].map((ic, i) => (
              <div key={i} className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center cursor-pointer hover:bg-accent/20 transition-colors">{ic}</div>
            ))}
          </div>
        </div>
        {/* Quick links */}
        <div>
          <h4 className="text-white font-bold mb-3 text-[14px]">Quick Links</h4>
          {[["Home","/"],["About","/about"],["Projects","/projects"],["Contact","/contact"],["Admin Portal","/admin/dashboard"]].map(([l,h]) => (
            <Link key={h} href={h} className="block mb-2 hover:text-accent transition-colors">{l}</Link>
          ))}
        </div>
        {/* Contact */}
        <div>
          <h4 className="text-white font-bold mb-3 text-[14px]">Contact</h4>
          <div className="space-y-2">
            <div>📞 +91 98765 43210</div>
            <div>📧 info@dnbconstructions.in</div>
            <div>📍 DNB House, Alkapuri,<br/>Vadodara – 390007</div>
            <div>🕐 Mon–Sat: 9 AM – 6 PM</div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 px-6 py-4 text-center text-[12px]">
        © 2025 DNB Constructions Pvt. Ltd. | CIN: U45200GJ2003PTC043211 | GST: 24AABCB1234M1Z5 &nbsp;·&nbsp; ISO 9001:2015 Certified · Class-I Contractor (CPWD)
      </div>
    </footer>
  );
}
