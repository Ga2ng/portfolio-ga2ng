"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

import { projects } from "@/lib/projects";

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 px-6 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Proyek <span className="text-[#a855f7]">Terpilih</span></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#7c3aed] to-[#a855f7] mx-auto rounded-full glow"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group glass-card rounded-2xl overflow-hidden flex flex-col h-full cursor-pointer relative"
            >
              {/* Image Container with Hover Overlay */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-800">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
                  style={{ backgroundImage: `url(${project.images[0] || '/project1.png'})` }} 
                />
                <div className="absolute inset-0 bg-[#0f0a1f]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                  <Link href={`/project/${project.id}`} className="p-3 bg-[#7c3aed] rounded-full text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <ExternalLink size={24} />
                  </Link>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tIndex) => (
                    <span key={tIndex} className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#7c3aed]/10 text-[#a855f7] border border-[#7c3aed]/20">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#a855f7] transition-colors">{project.title}</h3>
                <p className="text-slate-400 text-sm mb-6 flex-grow">{project.description}</p>
                
                <Link href={`/project/${project.id}`} className="inline-flex items-center text-sm font-semibold text-[#a855f7] hover:text-white transition-colors mt-auto">
                  Lihat Detail <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
