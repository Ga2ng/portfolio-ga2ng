"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Code2, CheckCircle2, X } from "lucide-react";
import { projects } from "@/lib/projects";

const getGridClass = (index: number, total: number) => {
  if (total === 1) return "col-span-2 md:col-span-4 h-[300px] md:h-[500px]";
  if (total === 2) return "col-span-2 md:col-span-2 h-[250px] md:h-[400px]";
  if (total === 3) {
    if (index === 0) return "col-span-2 md:col-span-2 md:row-span-2 h-[300px] md:h-full";
    return "col-span-2 md:col-span-2 h-[200px] md:h-[240px]";
  }
  if (total === 4) {
    if (index === 0) return "col-span-2 md:col-span-2 md:row-span-2 h-[300px] md:h-full";
    if (index === 1) return "col-span-2 md:col-span-2 h-[200px] md:h-[240px]";
    return "col-span-1 md:col-span-1 h-[150px] md:h-[250px]";
  }
  if (total >= 5) {
    if (index === 0) return "col-span-2 md:col-span-2 md:row-span-2 h-[300px] md:h-[500px]";
    if (index <= 2) return "col-span-1 md:col-span-1 h-[150px] md:h-[240px]";
    return "col-span-1 md:col-span-1 h-[150px] md:h-[240px]"; 
  }
  return "col-span-2 md:col-span-4 h-[300px]";
};

export default function ProjectDetail() {
  const params = useParams();
  const project = projects.find((p) => p.id === params.id) || projects[0];
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="min-h-screen pt-24 pb-16 px-6 relative">
      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#070314]/95 p-4 md:p-10 backdrop-blur-xl cursor-zoom-out"
          >
            <button 
              className="absolute top-6 right-6 text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 p-3 rounded-full transition-all z-[110] border border-white/10"
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            >
              <X size={24} />
            </button>
            <div className="relative w-full max-w-6xl max-h-[90vh] flex items-center justify-center">
              <motion.img 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                src={selectedImage}
                alt="Enlarged Project View"
                className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-[0_0_50px_rgba(124,58,237,0.2)] border border-[#7c3aed]/20"
                onClick={(e) => e.stopPropagation()} 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="container mx-auto max-w-4xl">
        <Link href="/#portfolio" className="inline-flex items-center text-slate-400 hover:text-[#a855f7] mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" /> Kembali ke Portofolio
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">{project.title}</h1>
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 bg-[#7c3aed]/10 text-[#a855f7] border border-[#7c3aed]/30 rounded-full text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Images Gallery */}
          {project.images && project.images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-16 auto-rows-max">
              {project.images.map((img, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedImage(img)}
                  className={`group rounded-2xl overflow-hidden glass border-[#7c3aed]/20 relative cursor-zoom-in ${getGridClass(idx, project.images.length)}`}
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110 duration-700 ease-out" 
                    style={{ backgroundImage: `url(${img})` }} 
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-[#7c3aed]/10 transition-colors duration-300 pointer-events-none" />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-16 glass border-[#7c3aed]/20 relative flex items-center justify-center">
              <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: `url('/project1.png')` }} />
              <span className="relative z-10 text-white bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm">Gambar Belum Tersedia</span>
            </div>
          )}

          {/* Content */}
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-8 text-slate-300 leading-relaxed text-lg">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Tentang Proyek</h2>
                <p>
                  Ini adalah halaman detail untuk {project.title}. Biasanya, bagian ini akan berisi penjelasan mendalam mengenai latar belakang proyek, masalah yang dipecahkan, dan bagaimana proyek ini memberikan nilai tambah.
                </p>
                <p className="mt-4">
                  {project.description}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Fitur Utama</h2>
                <ul className="space-y-3">
                  {(project.features || [
                    'Autentikasi Pengguna JWT & OAuth2', 
                    'Dashboard Real-time dengan WebSocket', 
                    'Desain Responsif dengan Tailwind', 
                    'Optimasi Performa dan SEO'
                  ]).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="text-[#a855f7] shrink-0 mt-1" size={20} />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="font-bold text-white mb-4">Informasi</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="block text-slate-500 mb-1">Klien</span>
                    <span className="text-slate-300">Pribadi / Open Source</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 mb-1">Tahun</span>
                    <span className="text-slate-300">2026</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 mb-1">Peran</span>
                    <span className="text-slate-300">Fullstack Developer</span>
                  </div>
                </div>
              </div>

              <a href="#" className="w-full py-4 bg-gradient-to-r from-[#7c3aed] to-[#a855f7] rounded-xl text-white font-semibold shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all flex justify-center items-center gap-2">
                Lihat Demo <ExternalLink size={20} />
              </a>
              
              <a href="#" className="w-full py-4 glass text-white font-semibold border border-[#7c3aed]/30 hover:border-[#7c3aed] transition-all flex justify-center items-center gap-2 rounded-xl">
                Source Code <Code2 size={20} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
