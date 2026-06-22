"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <span className="text-[11px] font-mono text-[#7c3aed]">{num}</span>
      <span className="h-px w-8 bg-[#7c3aed]/60" />
      <span className="text-[11px] font-bold tracking-[0.3em] text-[#a855f7] uppercase">{label}</span>
    </div>
  );
}

const CONTACT_ITEMS = [
  {
    icon: <Mail size={18} />,
    label: "Email",
    value: "gagangprakasa@gmail.com",
    href: "mailto:gagangprakasa@gmail.com",
  },
  {
    icon: <Phone size={18} />,
    label: "WhatsApp",
    value: "+62 813-9038-2131",
    href: "https://wa.me/6281390382131",
  },
  {
    icon: <MapPin size={18} />,
    label: "Lokasi",
    value: "Surabaya, Jawa Timur",
    href: null,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-28 px-6 overflow-hidden">
      {/* Center dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(124,58,237,0.14) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 100%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 100%, black, transparent)",
        }}
      />

      <div className="container mx-auto max-w-5xl relative">
        <SectionLabel num="04" label="Let's Connect" />

        {/* Big CTA heading */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95] mb-6">
            Ada proyek<br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #c4b5fd, #a855f7, #7c3aed)" }}
            >
              di pikiran?
            </span>
          </h2>
          <p className="text-slate-300 text-base max-w-md leading-relaxed">
            Saya terbuka untuk kolaborasi, freelance, dan diskusi proyek. Jangan ragu — langsung hubungi saja.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Contact cards */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3"
          >
            {CONTACT_ITEMS.map((item) => (
              <div
                key={item.label}
                className="group flex items-center gap-4 p-5 rounded-2xl border border-white/[0.05] hover:border-[#7c3aed]/30 transition-colors duration-300"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[#a855f7] flex-shrink-0 border border-[#7c3aed]/20"
                  style={{ background: "rgba(124,58,237,0.08)" }}
                >
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-mono text-[#7c3aed] tracking-widest uppercase mb-0.5">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm font-semibold text-slate-200 hover:text-[#c4b5fd] transition-colors truncate block"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-slate-200 truncate">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA box */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 rounded-2xl border border-[#7c3aed]/20 relative overflow-hidden"
            style={{ background: "rgba(124,58,237,0.04)" }}
          >
            {/* Glow accent */}
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#7c3aed]/10 blur-3xl pointer-events-none" />

            <p className="text-[11px] font-mono text-[#7c3aed] tracking-widest uppercase mb-4">Preferred</p>
            <p className="text-2xl font-black text-white mb-2 leading-tight">
              Hubungi via<br />WhatsApp atau Email
            </p>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
              Formulir kontak belum aktif. Saya biasanya membalas dalam 24 jam kerja.
            </p>

            <div className="flex flex-col gap-3">
              <a
                href="mailto:gagangprakasa@gmail.com"
                className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", boxShadow: "0 0 28px rgba(124,58,237,0.35)" }}
              >
                <Mail size={16} />
                Kirim Email
              </a>
              <a
                href="https://wa.me/6281390382131"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-bold text-white border border-white/[0.08] hover:border-[#7c3aed]/40 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <Phone size={16} />
                Chat WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
