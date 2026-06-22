"use client";

import { motion } from "framer-motion";

const SKILLS = [
  { name: "Laravel", level: "Expert", pct: 95 },
  { name: "MySQL", level: "Expert", pct: 92 },
  { name: "PHP", level: "Expert", pct: 90 },
  { name: "React / Next.js", level: "Intermediate", pct: 68 },
  { name: "Tailwind CSS", level: "Advanced", pct: 85 },
  { name: "Bootstrap", level: "Advanced", pct: 83 },
];

const FACTS = [
  { label: "Domisili", value: "Surabaya, JTM" },
  { label: "Spesialisasi", value: "Laravel · MySQL" },
  { label: "Status", value: "Open to Work" },
  { label: "Email", value: "gagangprakasa@gmail.com" },
];

function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <span className="text-[11px] font-mono text-[#7c3aed]">{num}</span>
      <span className="h-px w-8 bg-[#7c3aed]/60" />
      <span className="text-[11px] font-bold tracking-[0.3em] text-[#a855f7] uppercase">{label}</span>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6 overflow-hidden">
      {/* Subtle background dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(124,58,237,0.12) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 70% 100% at 20% 50%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 100% at 20% 50%, black, transparent)",
        }}
      />

      <div className="container mx-auto max-w-5xl relative">
        <SectionLabel num="02" label="Tentang Saya" />

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-8 leading-[1.05]">
              Ahmad<br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #c4b5fd, #a855f7, #7c3aed)" }}
              >
                Gagang Prakasa
              </span>
            </h2>

            <div className="space-y-5 text-slate-300 text-base leading-relaxed mb-10">
              <p>
                Web Developer berdomisili di{" "}
                <span className="text-white font-semibold">Surabaya, Jawa Timur</span>{" "}
                dengan fokus utama pada ekosistem{" "}
                <span className="text-[#c4b5fd] font-semibold">Laravel & MySQL</span>.
              </p>
              <p>
                Saya menangani berbagai proyek — dari sistem informasi pemerintahan, portal perizinan bangunan, manajemen gedung negara, hingga website apartemen dan landing page modern berbasis React & Vercel.
              </p>
              <p>
                Kode yang bersih, arsitektur yang scalable, dan desain yang berbicara. Itu yang selalu saya kejar di setiap proyek.
              </p>
            </div>

            {/* Fact grid */}
            <div className="grid grid-cols-2 gap-3">
              {FACTS.map((f) => (
                <div
                  key={f.label}
                  className="p-3 rounded-xl border border-white/[0.05]"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <p className="text-[10px] font-mono text-[#7c3aed] tracking-widest uppercase mb-1">{f.label}</p>
                  <p className="text-sm text-slate-200 font-medium truncate">{f.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: skills */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
          >
            <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-slate-500 mb-6">Tech Stack</p>
            {SKILLS.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-sm font-bold text-slate-200">{skill.name}</span>
                  <span className="text-[11px] font-mono text-[#7c3aed]">{skill.level}</span>
                </div>
                <div className="h-px w-full bg-white/[0.05] relative overflow-hidden rounded-full">
                  <motion.div
                    className="absolute top-0 left-0 h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #7c3aed, #a855f7)" }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
