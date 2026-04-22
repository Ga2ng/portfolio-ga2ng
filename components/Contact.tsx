"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Mail, Phone } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Hubungi <span className="text-[#a855f7]">Saya</span></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#7c3aed] to-[#a855f7] mx-auto rounded-full glow"></div>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2 space-y-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Mari Berkoneksi</h3>
            <p className="text-slate-400 mb-8">
              Tertarik bekerja sama atau punya pertanyaan? Jangan ragu untuk menghubungi. Saya sering merespon dalam waktu 24 jam.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-[#a855f7]">
                  <Mail size={20} />
                </div>
                <span>hello@gagang.dev</span>
              </div>
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-[#a855f7]">
                  <MapPin size={20} />
                </div>
                <span>Jakarta, Indonesia</span>
              </div>
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-[#a855f7]">
                  <Phone size={20} />
                </div>
                <span>+62 812 3456 7890</span>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-3 glass-card p-8 rounded-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 sm:col-span-1 space-y-2">
                  <label className="text-sm text-slate-400 font-medium">Nama</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-[#0f0a1f]/50 border border-[#7c3aed]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#7c3aed] transition-colors"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="col-span-2 sm:col-span-1 space-y-2">
                  <label className="text-sm text-slate-400 font-medium">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full bg-[#0f0a1f]/50 border border-[#7c3aed]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#7c3aed] transition-colors"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-slate-400 font-medium">Pesan</label>
                <textarea
                  required
                  rows={5}
                  className="w-full bg-[#0f0a1f]/50 border border-[#7c3aed]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#7c3aed] transition-colors resize-none"
                  placeholder="Ceritakan tentang proyek Anda..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-[#7c3aed] to-[#a855f7] rounded-lg text-white font-semibold shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all flex justify-center items-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Mengirim...</span>
                ) : isSuccess ? (
                  <span>Pesan Terkirim! 🎉</span>
                ) : (
                  <>Kirim Pesan <Send size={20} /></>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
