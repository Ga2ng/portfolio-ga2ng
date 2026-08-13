"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-12">
      <span 
        className="px-5 py-2.5 border-3 border-[#0f0e14] bg-[#ffffff] text-[#0f0e14] font-black rounded-xl shadow-[4px_4px_0_#0f0e14] rotate-[-2deg] inline-flex items-center gap-2.5 text-sm uppercase tracking-wider transition-transform hover:rotate-0 duration-200"
        style={{ fontFamily: "var(--font-nunito)" }}
      >
        <span
          className="text-base font-black opacity-60"
          style={{ fontFamily: "var(--font-bangers)", letterSpacing: "0.06em" }}
        >
          {num}
        </span>
        {label}
      </span>
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
    <section
      id="contact"
      className="relative py-28 px-6 overflow-hidden"
    >
      {/* Halftone pattern */}
      <div
        className="absolute inset-0 pointer-events-none halftone-bg opacity-30"
        style={{
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 100%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 100%, black, transparent)",
        }}
      />

      <div className="container mx-auto max-w-6xl relative">
        {/* Big CTA heading */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <SectionLabel num="04" label="Let's Connect" />
            <h2
              className="text-4xl md:text-5xl font-black tracking-tight leading-[1.05]"
              style={{ fontFamily: "var(--font-fredoka, 'Fredoka One', cursive)", color: "#0f0e14" }}
            >
              Ada proyek<br />
              <span style={{ color: "#0f0e14" }}>di pikiran?</span>
            </h2>
          </div>
          <p
            className="text-sm max-w-sm leading-relaxed"
            style={{ fontFamily: "var(--font-space)", color: "#0f0e14" }}
          >
            Saya terbuka untuk kolaborasi, freelance, dan diskusi proyek. Jangan ragu — langsung hubungi saja.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Contact cards */}
          <div className="space-y-3">
            {CONTACT_ITEMS.map((item, idx) => {
              const rotVal = idx === 0 ? "-1.2deg" : idx === 1 ? "1.5deg" : "-0.8deg";
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div 
                    className="group flex items-center gap-4 p-5 rounded-2xl comic-card hover:rotate-0 hover:scale-[1.02] transition-transform duration-200"
                    style={{ transform: `rotate(${rotVal})` }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "#0f0e14",
                        color: "#f5f0e8",
                        border: "2px solid #0f0e14",
                      }}
                    >
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p
                        className="text-[10px] font-bold tracking-widest uppercase mb-0.5"
                        style={{ fontFamily: "var(--font-nunito)", color: "#0f0e14" }}
                      >
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-sm font-semibold truncate block transition-opacity hover:opacity-60"
                          style={{ fontFamily: "var(--font-space)", color: "#0f0e14" }}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p
                          className="text-sm font-semibold truncate"
                          style={{ fontFamily: "var(--font-space)", color: "#0f0e14" }}
                        >
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA box */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="p-8 rounded-2xl relative overflow-hidden comic-card"
              style={{
                background: "#ffe76c",
                backgroundImage: "linear-gradient(rgba(30,144,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(30,144,255,0.1) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
                border: "2.5px solid #0f0e14",
                boxShadow: "8px 8px 0 #0f0e14",
              }}
            >
              <div className="tape-top-left opacity-90 z-20" />
              <div className="tape-top-right opacity-90 z-20" />
              <p
                className="text-[11px] font-bold tracking-widest uppercase mb-4"
                style={{ fontFamily: "var(--font-nunito)", color: "#0f0e14" }}
              >
                Preferred
              </p>
              <p
                className="text-2xl font-black mb-2 leading-tight"
                style={{ fontFamily: "var(--font-fredoka)", color: "#0f0e14" }}
              >
                Hubungi via<br />WhatsApp atau Email
              </p>
              <p
                className="text-sm mb-8 leading-relaxed"
                style={{ fontFamily: "var(--font-space)", color: "#0f0e14" }}
              >
                Formulir kontak belum aktif. Saya biasanya membalas dalam 24 jam kerja.
              </p>

              <div className="flex flex-col gap-3">
                <a
                  href="mailto:gagangprakasa@gmail.com"
                  className="comic-btn flex items-center justify-center gap-2 py-3.5 px-6 text-sm"
                  style={{
                    fontFamily: "var(--font-nunito)",
                    background: "#0f0e14",
                    color: "#ffffff",
                    border: "2.5px solid #0f0e14",
                    boxShadow: "4px 4px 0 #ff72be",
                  }}
                >
                  <Mail size={16} />
                  Kirim Email
                </a>
                <a
                  href="https://wa.me/6281390382131"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="comic-btn flex items-center justify-center gap-2 py-3.5 px-6 text-sm"
                  style={{
                    fontFamily: "var(--font-nunito)",
                    background: "transparent",
                    color: "#0f0e14",
                    border: "2.5px solid #0f0e14",
                    boxShadow: "4px 4px 0 #0f0e14",
                  }}
                >
                  <Phone size={16} />
                  Chat WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
