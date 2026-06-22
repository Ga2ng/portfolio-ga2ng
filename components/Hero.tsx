"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2, Briefcase, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="container mx-auto max-w-6xl flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-1.5 mb-6 rounded-full glass-card text-sm font-medium text-[#a855f7] border-[#7c3aed]/30"
        >
          👋 Hai, selamat datang di portofolio saya
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
        >
          Web <br className="hidden md:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7c3aed] to-[#a855f7] drop-shadow-[0_0_25px_rgba(124,58,237,0.3)]">
            Developer
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10"
        >
          Saya membangun pengalaman web modern dan aplikasi interaktif dengan teknologi mutakhir. Berfokus pada performa, estetik, dan skalabilitas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#portfolio"
            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#7c3aed] to-[#a855f7] rounded-full text-white font-semibold shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all hover:scale-105"
          >
            Lihat Proyek <ArrowRight size={20} />
          </a>
          <div className="flex gap-4 sm:ml-4">
            {[
              { icon: <Code2 size={24} />, href: "https://github.com/Ga2ng" },
              { icon: <Briefcase size={24} />, href: "https://www.linkedin.com/in/ahmad-gagang-prakasa-a32948285" },
              { icon: <Mail size={24} />, href: "mailto:gagangprakasa@gmail.com" }
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full glass-card text-slate-300 hover:text-white hover:border-[#7c3aed] transition-all"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7c3aed] opacity-10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse decoration-blob"></div>
    </section>
  );
}
