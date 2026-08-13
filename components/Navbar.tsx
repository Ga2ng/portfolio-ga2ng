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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "py-3" : "py-5"
        }`}
        style={{
          background: "#f5f0e8",
          borderBottom: "3px solid #0f0e14",
          boxShadow: isScrolled ? "0 5px 0 #0f0e14" : "none",
        }}
      >
        <div className="container mx-auto px-6 max-w-6xl flex justify-between items-center">
          {/* Logo / Brand */}
          <Link href="/" className="group flex items-baseline gap-1">
            <span
              className="text-2xl tracking-wide font-black"
              style={{
                fontFamily: "var(--font-bangers, 'Bangers', cursive)",
                letterSpacing: "0.06em",
                color: "#0f0e14",
              }}
            >
              GA2NG
            </span>
            <span className="w-2 h-2 rounded-full mb-0.5 border-2 border-[#0f0e14] bg-[#0f0e14] transition-transform group-hover:scale-125" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative group px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.15em] uppercase transition-all duration-150"
                  style={{
                    fontFamily: "var(--font-nunito, 'Nunito', sans-serif)",
                    background: isActive ? "#ffffff" : "transparent",
                    color: "#0f0e14",
                    border: "2px solid #0f0e14",
                    boxShadow: isActive ? "3px 3px 0px #0f0e14" : "none",
                  }}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Open to Work CTA */}
            <a
              href="mailto:gagangprakasa@gmail.com"
              className="ml-2 comic-btn px-4 py-1.5 text-xs"
              style={{
                fontFamily: "var(--font-nunito, 'Nunito', sans-serif)",
                background: "#ffffff",
                color: "#0f0e14",
                border: "2.5px solid #0f0e14",
                boxShadow: "3px 3px 0 #0f0e14",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse inline-block" />
              Open to Work
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg border-2"
            style={{
              borderColor: "#0f0e14",
              background: "transparent",
              boxShadow: "2px 2px 0 #0f0e14",
            }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block w-5 h-0.5 origin-center bg-[#0f0e14]"
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={isOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
              className="block w-3.5 h-0.5 bg-[#0f0e14]"
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block w-5 h-0.5 origin-center bg-[#0f0e14]"
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: "#f5f0e8" }}
          >
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
                    className="group flex items-baseline gap-4 py-4 border-b"
                    style={{ borderColor: "rgba(15,14,20,0.12)" }}
                  >
                    <span
                      className="text-[11px] font-bold"
                      style={{ fontFamily: "var(--font-nunito)", color: "#0f0e14", opacity: 0.5 }}
                    >
                      {link.num}
                    </span>
                    <span
                      className="text-4xl font-black tracking-tight text-[#0f0e14]"
                      style={{ fontFamily: "var(--font-fredoka, 'Fredoka One', cursive)" }}
                    >
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
                className="mt-10 self-start comic-btn px-6 py-3 text-sm"
                style={{
                  fontFamily: "var(--font-nunito)",
                  background: "#ffffff",
                  color: "#0f0e14",
                  border: "2.5px solid #0f0e14",
                  boxShadow: "4px 4px 0 #0f0e14",
                }}
              >
                gagangprakasa@gmail.com
              </motion.a>
            </div>

            <div
              className="px-8 pb-10 text-xs font-bold tracking-widest uppercase"
              style={{ fontFamily: "var(--font-nunito)", color: "rgba(15,14,20,0.4)" }}
            >
              AHMAD GAGANG PRAKASA — SURABAYA
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
