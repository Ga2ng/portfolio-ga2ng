"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const NAV_LINKS = [
  { name: "Beranda", href: "#home", num: "01" },
  { name: "Tentang", href: "#about", num: "02" },
  { name: "Karya", href: "#portfolio", num: "03" },
  { name: "Kontak", href: "#contact", num: "04" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const sections = ["home", "about", "portfolio", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "py-3 border-b border-white/[0.04]"
            : "py-6"
        }`}
        style={
          isScrolled
            ? { background: "rgba(8,6,18,0.85)", backdropFilter: "blur(20px)" }
            : { background: "transparent" }
        }
      >
        <div className="container mx-auto px-6 max-w-6xl flex justify-between items-center">
          {/* Logo / Brand */}
          <Link href="/" className="group flex items-baseline gap-1">
            <span
              className="text-xl font-black tracking-tighter text-white"
              style={{ letterSpacing: "-0.04em" }}
            >
              GA2NG
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7] mb-0.5 group-hover:scale-150 transition-transform" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative group px-4 py-2 text-xs font-bold tracking-[0.15em] uppercase transition-colors duration-200 ${
                    isActive ? "text-white" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  {/* Active underline */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-4 -bottom-px h-px bg-[#a855f7]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}

            {/* Hire me CTA */}
            <a
              href="mailto:gagangprakasa@gmail.com"
              className="ml-4 flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-[0.15em] uppercase border border-[#7c3aed]/40 text-[#a855f7] rounded-lg hover:bg-[#7c3aed]/10 hover:border-[#a855f7]/60 transition-all duration-200"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7] animate-pulse" />
              Open to Work
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1 group"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-px bg-white origin-center"
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={isOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
              className="block w-4 h-px bg-slate-400"
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-px bg-white origin-center"
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: "rgba(8,6,18,0.97)", backdropFilter: "blur(24px)" }}
          >
            {/* Close top area */}
            <div className="h-20" />

            <div className="flex-1 flex flex-col justify-center px-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-baseline gap-4 py-4 border-b border-white/[0.04] hover:border-[#7c3aed]/30 transition-colors"
                  >
                    <span className="text-[11px] font-mono text-[#7c3aed]">{link.num}</span>
                    <span className="text-4xl font-black tracking-tight text-white group-hover:text-[#c4b5fd] transition-colors">
                      {link.name}
                    </span>
                  </Link>
                </motion.div>
              ))}

              <motion.a
                href="mailto:gagangprakasa@gmail.com"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="mt-10 self-start px-6 py-3 border border-[#7c3aed]/40 text-[#a855f7] text-sm font-bold tracking-widest uppercase rounded-lg"
              >
                gagangprakasa@gmail.com
              </motion.a>
            </div>

            <div className="px-8 pb-10 text-slate-600 text-xs font-mono tracking-widest">
              AHMAD GAGANG PRAKASA — SURABAYA
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
