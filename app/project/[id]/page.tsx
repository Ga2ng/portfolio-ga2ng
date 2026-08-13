"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ExternalLink, CheckCircle2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/lib/projects";

const STABILO_COLORS = [
  "#ffe135", // Stabilo Yellow
  "#ff72be", // Stabilo Pink
  "#70e0ff", // Stabilo Cyan
  "#79f2a0", // Stabilo Green
  "#ff9f43", // Stabilo Orange
  "#d6a2e8", // Stabilo Purple
];

export default function ProjectDetail() {
  const params = useParams();
  const project = projects.find((p) => p.id === params.id) || projects[0];
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
      if (e.key === "ArrowRight" && selectedImage)
        setLightboxIndex((i) => (i + 1) % project.images.length);
      if (e.key === "ArrowLeft" && selectedImage)
        setLightboxIndex((i) => (i - 1 + project.images.length) % project.images.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, project.images.length]);

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
    setSelectedImage(project.images[idx]);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = (lightboxIndex + 1) % project.images.length;
    setLightboxIndex(next);
    setSelectedImage(project.images[next]);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prev = (lightboxIndex - 1 + project.images.length) % project.images.length;
    setLightboxIndex(prev);
    setSelectedImage(project.images[prev]);
  };

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Notebook Binder Spiral Rings overlay on the left edge (desktop only) */}
      <div className="fixed left-6 top-0 bottom-0 w-8 z-50 pointer-events-none flex flex-col justify-around py-16 hidden lg:flex">
        {Array.from({ length: 12 }).map((_, i) => (
          <div 
            key={i} 
            className="w-5 h-5 rounded-full border-2.5 border-[#0f0e14] bg-[#f5f0e8] shadow-[2px_2px_0_#0f0e14] relative flex items-center justify-center"
          >
            {/* Inner ring hole */}
            <div className="w-2.5 h-2.5 rounded-full bg-[#0f0e14]/15" />
            {/* Metal spiral rings linking leftwards */}
            <div 
              className="absolute right-full top-1/2 -translate-y-1/2 w-7 h-2.5 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-400 border-2 border-[#0f0e14] rounded-full" 
              style={{ transform: "rotate(-12deg)", transformOrigin: "right" }} 
            />
          </div>
        ))}
      </div>
      {/* Background halftone pattern */}
      <div
        className="absolute inset-0 pointer-events-none halftone-bg opacity-30"
        style={{
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent)",
        }}
      />

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 cursor-zoom-out"
          >
            {/* Close */}
            <button
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-[#0f0e14] bg-[#ffffff] p-2.5 rounded-xl border-2 border-[#0f0e14] transition-all z-[110] shadow-[3px_3px_0_#0f0e14] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            >
              <X size={20} />
            </button>

            {/* Prev / Next */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-[110] text-[#0f0e14] bg-[#ffffff] border-2 border-[#0f0e14] p-2.5 rounded-xl transition-all shadow-[3px_3px_0_#0f0e14] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-[110] text-[#0f0e14] bg-[#ffffff] border-2 border-[#0f0e14] p-2.5 rounded-xl transition-all shadow-[3px_3px_0_#0f0e14] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}

            <div className="relative w-full max-w-5xl px-16 flex items-center justify-center">
              <motion.img
                key={lightboxIndex}
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.94, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                src={project.images[lightboxIndex]}
                alt={`${project.title} — gambar ${lightboxIndex + 1}`}
                className="max-w-full max-h-[85vh] object-contain rounded-2xl border-4 border-[#0f0e14] shadow-[8px_8px_0_#0f0e14]"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Dot indicator */}
            {project.images.length > 1 && (
              <div className="absolute bottom-6 flex gap-2">
                {project.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); setSelectedImage(project.images[i]); }}
                    className={`w-2 h-2 rounded-full border border-[#0f0e14] transition-all ${i === lightboxIndex ? "bg-[#ffffff] scale-125" : "bg-white/30"}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content */}
      <div className="container mx-auto max-w-4xl relative">
        {/* Sticky note annotation */}
        <div
          className="hidden md:flex p-4 w-28 h-28 items-center justify-center text-center border-2.5 border-[#0f0e14] shadow-[4px_4px_0_#0f0e14] select-none rotate-[6deg] hover:rotate-0 transition-transform duration-200 absolute right-0 top-[-20px]"
          style={{
            background: "#ffe135",
            fontFamily: "var(--font-fredoka)",
            fontSize: "10px",
            lineHeight: "1.3",
            color: "#0f0e14",
            zIndex: 20
          }}
        >
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-8 h-2.5 bg-white/40 border border-dashed border-black/20" />
          <span className="font-black tracking-wide uppercase">ACTIVE PROYEK ✦</span>
        </div>
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 hover:opacity-75 transition-opacity text-sm font-bold mb-10 group"
            style={{ fontFamily: "var(--font-nunito)", color: "#0f0e14" }}
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Kembali ke Karya
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Section label */}
          <div className="flex items-center gap-3 mb-6">
            <span className="comic-badge" style={{ fontFamily: "var(--font-nunito)" }}>
              DETAIL PROYEK
            </span>
          </div>

          {/* Title + tags */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-5 leading-[1.05]"
            style={{ fontFamily: "var(--font-fredoka)", color: "#0f0e14" }}
          >
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-2 mb-10">
            {project.tags.map((tag, idx) => {
              const bg = STABILO_COLORS[idx % STABILO_COLORS.length];
              const rot = idx % 2 === 0 ? "-1deg" : "1deg";
              return (
                <span
                  key={idx}
                  className="text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-md shadow-[2.5px_2.5px_0_#0f0e14]"
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

          {/* Image gallery */}
          {project.images && project.images.length > 0 ? (
            <div className={`grid gap-4 mb-14 ${
              project.images.length === 1 ? "grid-cols-1" :
              project.images.length === 2 ? "grid-cols-1 sm:grid-cols-2" :
              "grid-cols-2 sm:grid-cols-2 md:grid-cols-3"
            }`}>
              {project.images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => openLightbox(idx)}
                  className={`group relative overflow-hidden cursor-zoom-in ${
                    project.images.length >= 3 && idx === 0 ? "col-span-2 sm:col-span-2 md:col-span-1 row-span-1" : ""
                  }`}
                  style={{ aspectRatio: project.images.length === 1 ? "16/9" : "4/3" }}
                >
                  <div className="comic-card h-full w-full relative overflow-hidden" style={{ border: "2.5px solid #0f0e14" }}>
                    <div className="tape-top-left opacity-90 z-20" />
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${img})` }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                    <span
                      className="absolute top-2 right-2 text-[9px] font-bold"
                      style={{ fontFamily: "var(--font-bangers)", color: "rgba(15,14,20,0.4)" }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="w-full aspect-video rounded-2xl mb-14 relative flex items-center justify-center comic-card"
              style={{ background: "#ffffff", border: "2.5px solid #0f0e14", boxShadow: "8px 8px 0 #0f0e14" }}
            >
              <span className="text-slate-500 text-sm font-semibold">Gambar belum tersedia</span>
            </div>
          )}

          {/* Content: main + sidebar */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Left: description + features */}
            <div className="md:col-span-2 space-y-10">
              <div>
                <h2
                  className="text-xs font-bold tracking-widest uppercase mb-4"
                  style={{ fontFamily: "var(--font-nunito)", color: "#0f0e14" }}
                >
                  Tentang Proyek
                </h2>
                <p
                  className="leading-relaxed text-base"
                  style={{ fontFamily: "var(--font-space)", color: "#0f0e14" }}
                >
                  {project.description}
                </p>
              </div>

              {project.features && project.features.length > 0 && (
                <div>
                  <h2
                    className="text-xs font-bold tracking-widest uppercase mb-5"
                    style={{ fontFamily: "var(--font-nunito)", color: "#0f0e14" }}
                  >
                    Fitur Utama
                  </h2>
                  <ul className="space-y-3">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="shrink-0 mt-0.5" size={16} style={{ color: "#0f0e14" }} />
                        <span
                          className="text-sm leading-relaxed"
                          style={{ fontFamily: "var(--font-space)", color: "#0f0e14" }}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right: info sidebar */}
            <div className="space-y-5">
              {/* Info card */}
              <div
                className="comic-card p-5 space-y-4"
                style={{ background: "#ffffff", color: "#0f0e14" }}
              >
                <h3
                  className="text-xs font-black tracking-widest uppercase"
                  style={{ fontFamily: "var(--font-fredoka)" }}
                >
                  Informasi
                </h3>
                <div className="space-y-3 text-sm">
                  {[
                    { label: "Peran", value: project.role || "Web Developer" },
                    { label: "Tahun", value: project.year || "2024–2025" },
                    { label: "Klien", value: project.client || "Klien / Perusahaan" },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between items-baseline">
                      <span
                        className="text-[11px] font-bold tracking-wider uppercase"
                        style={{ fontFamily: "var(--font-nunito)", color: "#0f0e14" }}
                      >
                        {row.label}
                      </span>
                      <span
                        className="font-bold"
                        style={{ fontFamily: "var(--font-space)", color: "#0f0e14" }}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Demo link */}
              {project.linkDemo && (
                <a
                  href={project.linkDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="comic-btn flex items-center justify-center gap-2 w-full py-3.5 text-sm"
                  style={{
                    fontFamily: "var(--font-nunito)",
                    background: "#ffe135",
                    color: "#0f0e14",
                    border: "2.5px solid #0f0e14",
                    boxShadow: "4px 4px 0 #0f0e14",
                  }}
                >
                  Lihat Demo <ExternalLink size={15} />
                </a>
              )}

              {/* Back to portfolio */}
              <Link
                href="/#portfolio"
                className="comic-btn flex items-center justify-center gap-2 w-full py-3.5 text-sm"
                style={{
                  fontFamily: "var(--font-nunito)",
                  background: "#ffffff",
                  color: "#0f0e14",
                  border: "2.5px solid #0f0e14",
                  boxShadow: "5px 5px 0 #0f0e14",
                }}
              >
                <ArrowLeft size={15} />
                Karya Lainnya
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
