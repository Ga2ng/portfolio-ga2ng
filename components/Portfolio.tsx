"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { projects } from "@/lib/projects";

const STABILO_COLORS = [
  "#ffe135", // Stabilo Yellow
  "#ff72be", // Stabilo Pink
  "#70e0ff", // Stabilo Cyan
  "#79f2a0", // Stabilo Green
  "#ff9f43", // Stabilo Orange
  "#d6a2e8", // Stabilo Purple
];

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

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="relative py-28 px-6 overflow-hidden"
    >
      {/* Halftone pattern */}
      <div
        className="absolute inset-0 pointer-events-none halftone-bg opacity-30"
        style={{
          maskImage: "radial-gradient(ellipse 60% 100% at 80% 50%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 100% at 80% 50%, black, transparent)",
        }}
      />

      {/* Left-corner stickman doodle (cropped & rotated) */}
      <div
        className="absolute left-[-30px] top-4 w-60 h-60 pointer-events-none opacity-20 hidden md:block"
        style={{
          backgroundImage: "url('/bg-stickman.png')",
          backgroundSize: "180% 180%",
          backgroundPosition: "left top",
          transform: "rotate(-12deg)",
          mixBlendMode: "multiply",
        }}
      />

      {/* Right-corner stickman doodle (flipped, cropped & rotated differently) */}
      <div
        className="absolute right-[-40px] bottom-12 w-64 h-64 pointer-events-none opacity-[0.22] hidden md:block"
        style={{
          backgroundImage: "url('/bg-stickman.png')",
          backgroundSize: "220% 220%",
          backgroundPosition: "right bottom",
          transform: "rotate(18deg) scaleX(-1)", // flipped horizontally to look like a new doodle
          mixBlendMode: "multiply",
        }}
      />

      <div className="container mx-auto max-w-6xl relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <SectionLabel num="03" label="Karya Terpilih" />
            <h2
              className="text-4xl md:text-5xl font-black tracking-tight leading-[1.05]"
              style={{ fontFamily: "var(--font-fredoka, 'Fredoka One', cursive)", color: "#0f0e14" }}
            >
              Yang Pernah<br />
              <span style={{ color: "#0f0e14" }}>Saya Bangun</span>
            </h2>
          </div>

          {/* Sticky note */}
          <div
            className="hidden md:flex p-4 w-28 h-28 items-center justify-center text-center border-2.5 border-[#0f0e14] shadow-[4px_4px_0_#0f0e14] select-none rotate-[4deg] hover:rotate-0 transition-transform duration-200 relative"
            style={{
              background: "#ffe135",
              fontFamily: "var(--font-fredoka)",
              fontSize: "10px",
              lineHeight: "1.3",
              color: "#0f0e14",
            }}
          >
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-8 h-2.5 bg-white/40 border border-dashed border-black/20" />
            <span className="font-black tracking-wide uppercase">CLICK CARDS FOR DETAILS!</span>
          </div>
        </div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Separate inner div for hover animations so it doesn't conflict with framer-motion */}
              <div className="group relative flex flex-col overflow-hidden comic-card h-full">
                {/* Thumbnail with scrapbook tape */}
                <div className="relative h-44 overflow-hidden" style={{ background: "#e2ddd5" }}>
                  <div className="tape-top-left opacity-90 z-20" />
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${project.images[0] || "/project1.png"})` }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(15,14,20,0.08) 0%, transparent 60%)" }}
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#0f0e14]/0 group-hover:bg-[#0f0e14]/10 transition-colors duration-300 flex items-center justify-center">
                    <Link
                      href={`/project/${project.id}`}
                      className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 p-2.5 rounded-lg"
                      style={{
                        background: "#ffffff",
                        border: "2px solid #0f0e14",
                        boxShadow: "3px 3px 0 #0f0e14",
                        color: "#0f0e14",
                      }}
                    >
                      <ExternalLink size={18} />
                    </Link>
                  </div>

                  {/* Index number */}
                  <span
                    className="absolute top-3 right-3 text-[10px] font-bold"
                    style={{ fontFamily: "var(--font-bangers)", color: "rgba(15,14,20,0.4)", letterSpacing: "0.06em" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Featured badge */}
                  {project.featured && (
                    <span
                      className="absolute top-3 left-3 text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-full"
                      style={{
                        fontFamily: "var(--font-nunito)",
                        background: "#ffffff",
                        color: "#0f0e14",
                        border: "2px solid #0f0e14",
                        boxShadow: "2px 2px 0 #0f0e14",
                      }}
                    >
                      ★ {project.featured}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow" style={{ background: "#ffffff" }}>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.map((tag, ti) => {
                      const bg = STABILO_COLORS[(index * 3 + ti) % STABILO_COLORS.length];
                      const rot = (index + ti) % 2 === 0 ? "-1deg" : "1deg";
                      return (
                        <span
                          key={ti}
                          className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-md shadow-[2px_2px_0_#0f0e14]"
                          style={{
                            fontFamily: "var(--font-nunito)",
                            background: bg,
                            color: "#0f0e14",
                            border: "1.5px solid #0f0e14",
                            transform: `rotate(${rot})`,
                          }}
                        >
                          {tag}
                        </span>
                      );
                    })}
                  </div>

                  <h3
                    className="text-base font-black mb-2 leading-tight"
                    style={{ fontFamily: "var(--font-fredoka)", color: "#0f0e14" }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-xs leading-relaxed mb-5 flex-grow line-clamp-3"
                    style={{ fontFamily: "var(--font-space)", color: "#0f0e14" }}
                  >
                    {project.description}
                  </p>

                  <Link
                    href={`/project/${project.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold mt-auto group/link select-none"
                    style={{ fontFamily: "var(--font-nunito)", color: "#0f0e14" }}
                  >
                    <span className="relative z-10 px-2 py-0.5 rounded transition-all duration-200 group-hover/link:bg-[#ffe135] group-hover/link:text-[#0f0e14] group-hover/link:border-1.5 group-hover/link:border-[#0f0e14] group-hover/link:shadow-[2px_2px_0_#0f0e14] group-hover/link:-rotate-1">
                      Lihat Detail ✦
                    </span>
                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
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
        >
          <div
            className="mt-14 p-8 rounded-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 comic-card"
            style={{
              background: "#ffffff",
              border: "2.5px solid #0f0e14",
              boxShadow: "8px 8px 0 #0f0e14",
            }}
          >
            <div className="tape-top-left" />
            <div className="tape-top-right" />
            <div>
              <span
                className="text-[10px] font-bold tracking-widest uppercase mb-1 block"
                style={{ fontFamily: "var(--font-nunito)", color: "#0f0e14" }}
              >
                Eksplorasi Kode &amp; Repositori Open-Source
              </span>
              <h3
                className="text-xl font-black mb-2 tracking-tight"
                style={{ fontFamily: "var(--font-fredoka)", color: "#0f0e14" }}
              >
                Ingin melihat lebih banyak proyek &amp; eksperimen kode?
              </h3>
              <p
                className="text-sm max-w-xl leading-relaxed"
                style={{ fontFamily: "var(--font-space)", color: "#0f0e14" }}
              >
                Selain karya terpilih di atas, saya juga mempublikasikan berbagai repositori utility tools, kustom modul, dan eksperimen source code langsung di profil GitHub{" "}
                <span className="font-semibold" style={{ color: "#0f0e14" }}>@Ga2ng</span>.
              </p>
            </div>

            <a
              href="https://github.com/Ga2ng"
              target="_blank"
              rel="noopener noreferrer"
              className="comic-btn flex-shrink-0 inline-flex items-center gap-2.5 px-6 py-3.5 text-sm"
              style={{
                fontFamily: "var(--font-nunito)",
                background: "#0f0e14",
                color: "#f5f0e8",
                border: "2.5px solid #0f0e14",
                boxShadow: "5px 5px 0 rgba(15,14,20,0.25)",
              }}
            >
              Jelajahi GitHub @Ga2ng
              <ExternalLink size={15} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
