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
                <a href="mailto:gagangprakasa@gmail.com" className="hover:text-[#a855f7] transition-colors">gagangprakasa@gmail.com</a>
              </div>
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-[#a855f7]">
                  <MapPin size={20} />
                </div>
                <span>Surabaya, Jawa Timur, Indonesia</span>
              </div>
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-[#a855f7]">
                  <Phone size={20} />
                </div>
                <a href="tel:081390382131" className="hover:text-[#a855f7] transition-colors">+62 813-9038-2131</a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-3 glass-card p-8 rounded-2xl relative overflow-hidden"
          >
            {/* Disabled Overlay */}
            <div className="absolute inset-0 bg-[#0f0a1f]/85 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-[#7c3aed]/10 border border-[#7c3aed]/30 flex items-center justify-center text-[#a855f7] mb-4">
                <Mail size={28} />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Formulir Kontak Dinonaktifkan</h4>
              <p className="text-slate-400 text-sm max-w-sm mb-6">
                Formulir kirim pesan belum aktif. Silakan hubungi saya secara langsung melalui Email atau WhatsApp.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <a
                  href="mailto:gagangprakasa@gmail.com"
                  className="px-5 py-2.5 bg-gradient-to-r from-[#7c3aed] to-[#a855f7] rounded-full text-white font-medium text-xs shadow-[0_0_15px_rgba(124,58,237,0.4)] hover:scale-105 transition-all"
                >
                  Kirim Email
                </a>
                <a
                  href="https://wa.me/6281390382131"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-green-600 rounded-full text-white font-medium text-xs shadow-[0_0_15px_rgba(22,163,74,0.4)] hover:scale-105 transition-all"
                >
                  Hubungi via WhatsApp
                </a>
              </div>
            </div>
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
