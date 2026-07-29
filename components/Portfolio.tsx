"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { projects } from "@/lib/projects";

function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <span className="text-[11px] font-mono text-[#7c3aed]">{num}</span>
      <span className="h-px w-8 bg-[#7c3aed]/60" />
      <span className="text-[11px] font-bold tracking-[0.3em] text-[#a855f7] uppercase">{label}</span>
    </div>
  );
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative py-28 px-6 overflow-hidden">
      {/* Right-side dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(168,85,247,0.15) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 60% 100% at 80% 50%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 100% at 80% 50%, black, transparent)",
        }}
      />

      <div className="container mx-auto max-w-6xl relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <SectionLabel num="03" label="Karya Terpilih" />
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.05]">
              Yang Pernah<br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #c4b5fd, #a855f7, #7c3aed)" }}
              >
                Saya Bangun
              </span>
            </h2>
          </div>
        </div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col border border-white/[0.05] rounded-2xl overflow-hidden hover:border-[#7c3aed]/30 transition-colors duration-300"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              {/* Thumbnail */}
              <div className="relative h-44 overflow-hidden bg-[#0d0b1e]">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${project.images[0] || "/project1.png"})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080612]/80 via-transparent to-transparent" />

                {/* Hover overlay with link */}
                <div className="absolute inset-0 bg-[#7c3aed]/0 group-hover:bg-[#7c3aed]/10 transition-colors duration-300 flex items-center justify-center">
                  <Link
                    href={`/project/${project.id}`}
                    className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 p-2.5 rounded-xl bg-white/10 border border-white/20 text-white backdrop-blur-sm"
                  >
                    <ExternalLink size={18} />
                  </Link>
                </div>

                {/* Index number */}
                <span className="absolute top-3 right-3 text-[10px] font-mono text-white/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tags.map((tag, ti) => (
                    <span
                      key={ti}
                      className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded text-[#a855f7] border border-[#7c3aed]/20"
                      style={{ background: "rgba(124,58,237,0.06)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-base font-black text-white mb-2 group-hover:text-[#c4b5fd] transition-colors leading-tight">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-5 flex-grow line-clamp-3">
                  {project.description}
                </p>

                <Link
                  href={`/project/${project.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#a855f7] hover:text-white transition-colors mt-auto group/link"
                >
                  Lihat Detail
                  <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub Repositories Banner CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 p-8 rounded-2xl border border-[#7c3aed]/20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.06) 0%, rgba(168,85,247,0.02) 100%)" }}
        >
          {/* Subtle glow orb */}
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#7c3aed]/10 blur-2xl pointer-events-none" />

          <div>
            <span className="text-[10px] font-mono text-[#7c3aed] tracking-widest uppercase mb-1 block">
              Eksplorasi Kode &amp; Repositori Open-Source
            </span>
            <h3 className="text-xl font-black text-white mb-2 tracking-tight">
              Ingin melihat lebih banyak proyek &amp; eksperimen kode?
            </h3>
            <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
              Selain karya terpilih di atas, saya juga mempublikasikan berbagai repositori utility tools, kustom modul, dan eksperimen source code langsung di profil GitHub <span className="text-[#c4b5fd] font-semibold">@Ga2ng</span>.
            </p>
          </div>

          <a
            href="https://github.com/Ga2ng"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_0_28px_rgba(124,58,237,0.4)]"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            }}
          >
            Jelajahi GitHub @Ga2ng
            <ExternalLink size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
