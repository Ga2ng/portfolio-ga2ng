"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ExternalLink, CheckCircle2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/lib/projects";

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
    <main className="min-h-screen bg-[#080612] pt-24 pb-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Background dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(124,58,237,0.15) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl cursor-zoom-out"
          >
            {/* Close */}
            <button
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 p-2.5 rounded-xl transition-all z-[110] border border-white/10"
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            >
              <X size={20} />
            </button>

            {/* Prev / Next — only show if multiple images */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-[110] text-white bg-white/5 hover:bg-white/15 border border-white/10 p-2.5 rounded-xl transition-all"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-[110] text-white bg-white/5 hover:bg-white/15 border border-white/10 p-2.5 rounded-xl transition-all"
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
                className="max-w-full max-h-[85vh] object-contain rounded-2xl border border-white/10"
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
                    className={`w-1.5 h-1.5 rounded-full transition-all ${i === lightboxIndex ? "bg-[#a855f7] scale-125" : "bg-white/30"}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content */}
      <div className="container mx-auto max-w-4xl relative">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-[#a855f7] transition-colors text-sm font-medium mb-10 group"
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
            <span className="text-[11px] font-mono text-[#7c3aed]">DETAIL</span>
            <span className="h-px w-8 bg-[#7c3aed]/60" />
            <span className="text-[11px] font-bold tracking-[0.3em] text-[#a855f7] uppercase">Proyek</span>
          </div>

          {/* Title + tags */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-5 leading-[1.05]">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-2 mb-10">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-lg text-[#a855f7] border border-[#7c3aed]/20"
                style={{ background: "rgba(124,58,237,0.07)" }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Image gallery */}
          {project.images && project.images.length > 0 ? (
            <div className={`grid gap-3 mb-14 ${
              project.images.length === 1 ? "grid-cols-1" :
              project.images.length === 2 ? "grid-cols-1 sm:grid-cols-2" :
              "grid-cols-2 sm:grid-cols-2 md:grid-cols-3"
            }`}>
              {project.images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => openLightbox(idx)}
                  className={`group relative overflow-hidden rounded-xl cursor-zoom-in border border-white/[0.05] hover:border-[#7c3aed]/30 transition-colors bg-[#0d0b1e] ${
                    project.images.length >= 3 && idx === 0 ? "col-span-2 sm:col-span-2 md:col-span-1 row-span-1" : ""
                  }`}
                  style={{ aspectRatio: project.images.length === 1 ? "16/9" : "4/3" }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${img})` }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <span className="absolute top-2 right-2 text-[9px] font-mono text-white/30">{String(idx + 1).padStart(2, "0")}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full aspect-video rounded-2xl mb-14 border border-white/[0.05] relative flex items-center justify-center bg-[#0d0b1e]">
              <span className="text-slate-500 text-sm">Gambar belum tersedia</span>
            </div>
          )}

          {/* Content: main + sidebar */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Left: description + features */}
            <div className="md:col-span-2 space-y-10">
              <div>
                <h2 className="text-xs font-mono text-[#7c3aed] tracking-widest uppercase mb-4">Tentang Proyek</h2>
                <p className="text-slate-300 leading-relaxed text-base">{project.description}</p>
              </div>

              {project.features && project.features.length > 0 && (
                <div>
                  <h2 className="text-xs font-mono text-[#7c3aed] tracking-widest uppercase mb-5">Fitur Utama</h2>
                  <ul className="space-y-3">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="text-[#a855f7] shrink-0 mt-0.5" size={16} />
                        <span className="text-slate-300 text-sm leading-relaxed">{feature}</span>
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
                className="p-5 rounded-2xl border border-white/[0.05] space-y-4"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <h3 className="text-xs font-mono text-[#7c3aed] tracking-widest uppercase">Informasi</h3>
                <div className="space-y-3 text-sm">
                  {[
                    { label: "Peran", value: "Web Developer" },
                    { label: "Tahun", value: "2024–2025" },
                    { label: "Klien", value: "Klien / Perusahaan" },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between items-baseline">
                      <span className="text-slate-500 text-[11px] font-mono tracking-wider uppercase">{row.label}</span>
                      <span className="text-slate-200 font-medium">{row.value}</span>
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
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                    boxShadow: "0 0 24px rgba(124,58,237,0.35)",
                  }}
                >
                  Lihat Demo <ExternalLink size={15} />
                </a>
              )}

              {/* Back to portfolio */}
              <Link
                href="/#portfolio"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-semibold text-slate-400 border border-white/[0.06] hover:border-[#7c3aed]/30 hover:text-slate-200 transition-all"
                style={{ background: "rgba(255,255,255,0.02)" }}
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
