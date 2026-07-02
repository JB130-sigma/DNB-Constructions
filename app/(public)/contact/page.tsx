"use client";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <section className="bg-dark-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-[2.8rem] font-black text-white leading-tight mb-3">
            Let's Build Something <span className="text-accent">Great Together</span>
          </h1>
          <p className="text-white/50 text-[1rem]">Reach out for project consultations, estimates, or partnership opportunities.</p>
        </div>
      </section>
      <div className="hazard-stripe" />

      <section className="bg-cement-50 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <h2 className="text-[1.8rem] font-black text-cement-900 mb-6">Contact Information</h2>
            {[
              { icon: "📞", label: "Phone",   val: "+91 98765 43210" },
              { icon: "📧", label: "Email",   val: "info@dnbconstructions.in" },
              { icon: "📍", label: "Address", val: "DNB House, Alkapuri, Vadodara – 390007, Gujarat, India" },
              { icon: "🕐", label: "Hours",   val: "Mon–Sat: 9:00 AM – 6:00 PM" },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 border border-accent/20">{c.icon}</div>
                <div>
                  <div className="text-[12px] font-bold text-cement-400 uppercase tracking-wide">{c.label}</div>
                  <div className="text-[14px] text-cement-800 font-medium">{c.val}</div>
                </div>
              </div>
            ))}

            <a href="https://wa.me/919876543210?text=Hi%20DNB%20Constructions%2C%20I%20need%20a%20quote%20for%20my%20project."
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 mt-4 w-full sm:w-auto px-6 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-all active:scale-95 touch-manipulation">
              💬 WhatsApp Us
            </a>

            {/* Real Map Iframe */}
            <div className="mt-8 h-56 rounded-2xl overflow-hidden border border-cement-200 shadow-sm relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118106.71383789311!2d73.103046!3d22.322042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc8ab91a3ddab%3A0xac39d3bfe1473fb8!2sVadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form */}
          <div className="bg-white border border-cement-200 rounded-2xl p-8 shadow-card">
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-[20px] font-bold text-cement-900 mb-2">Enquiry Sent!</h3>
                <p className="text-cement-500">We'll get back to you within 24 hours.</p>
                <button onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2 bg-cement-100 text-cement-700 rounded-lg font-semibold hover:bg-cement-200 transition-all">
                  Send Another
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-[20px] font-bold text-cement-900 mb-6">Send Enquiry</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[11px] font-bold text-cement-400 uppercase tracking-wide mb-1.5">Full Name</label>
                    <input className="w-full bg-cement-50 border border-cement-200 rounded-lg px-3 py-2.5 text-[13px] focus:outline-none focus:border-cement-500" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-cement-400 uppercase tracking-wide mb-1.5">Company</label>
                    <input className="w-full bg-cement-50 border border-cement-200 rounded-lg px-3 py-2.5 text-[13px] focus:outline-none focus:border-cement-500" placeholder="Company name" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-[11px] font-bold text-cement-400 uppercase tracking-wide mb-1.5">Email</label>
                  <input type="email" className="w-full bg-cement-50 border border-cement-200 rounded-lg px-3 py-2.5 text-[13px] focus:outline-none focus:border-cement-500" placeholder="you@company.com" />
                </div>
                <div className="mb-4">
                  <label className="block text-[11px] font-bold text-cement-400 uppercase tracking-wide mb-1.5">Phone</label>
                  <input type="tel" className="w-full bg-cement-50 border border-cement-200 rounded-lg px-3 py-2.5 text-[13px] focus:outline-none focus:border-cement-500" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div className="mb-4">
                  <label className="block text-[11px] font-bold text-cement-400 uppercase tracking-wide mb-1.5">Project Type</label>
                  <select className="w-full bg-cement-50 border border-cement-200 rounded-lg px-3 py-2.5 text-[13px] focus:outline-none focus:border-cement-500">
                    <option>Commercial Building</option>
                    <option>Road / Highway</option>
                    <option>Residential</option>
                    <option>Industrial</option>
                    <option>Water & Sanitation</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label className="block text-[11px] font-bold text-cement-400 uppercase tracking-wide mb-1.5">Message</label>
                  <textarea rows={4} className="w-full bg-cement-50 border border-cement-200 rounded-lg px-3 py-2.5 text-[13px] focus:outline-none focus:border-cement-500 resize-none" placeholder="Describe your project requirements…" />
                </div>
                <button onClick={() => setSubmitted(true)}
                  className="w-full py-3.5 bg-cement-900 text-white font-bold rounded-xl hover:bg-cement-700 transition-all flex items-center justify-center gap-2 active:scale-95 touch-manipulation text-[14px]">
                  📨 Send Enquiry
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
