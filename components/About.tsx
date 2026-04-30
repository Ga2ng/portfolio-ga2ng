"use client";

import { motion } from "framer-motion";

export default function About() {
  const skills = [
    { name: "React / Next.js", level: "Expert" },
    { name: "TypeScript", level: "Advanced" },
    { name: "Node.js / Express", level: "Advanced" },
    { name: "Tailwind CSS", level: "Expert" },
    { name: "PostgreSQL / MongoDB", level: "Intermediate" },
    { name: "Docker", level: "Intermediate" },
  ];

  return (
    <section id="about" className="py-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Tentang <span className="text-[#a855f7]">Saya</span></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#7c3aed] to-[#a855f7] mx-auto rounded-full glow"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 text-slate-300 text-lg leading-relaxed"
          >
            <p>
              Halo! Saya seorang <strong>Web Developer</strong> yang bersemangat menciptakan produk digital yang tidak hanya fungsional, tetapi juga memberikan pengalaman visual yang memukau.
            </p>
            <p>
              Saya berpengalaman dalam membangun berbagai solusi digital mulai dari website apps, landing page, CMS, hingga sistem ERP web. Saya berkomitmen untuk mengubah ide kompleks menjadi antarmuka yang bersih, intuitif, dan responsif.
            </p>
            <p>
              Saat tidak sedang <em>ngoding</em>, Anda akan menemukan saya sedang membaca tentang tren desain UI/UX terbaru, atau bereksperimen dengan teknologi web 3D.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="glass-card p-4 rounded-xl flex flex-col items-start justify-center border border-[#7c3aed]/20 hover:border-[#7c3aed]/60 group"
              >
                <h4 className="font-semibold text-white mb-1 group-hover:text-[#a855f7] transition-colors">{skill.name}</h4>
                <span className="text-sm text-slate-400">{skill.level}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
