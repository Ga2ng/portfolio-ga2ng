"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Code2, Briefcase, Mail } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

// ── Text scramble hook ─────────────────────────────────────────────────────────
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%";

function useScramble(target: string, autoStart = true) {
  const [display, setDisplay] = useState(target);
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scramble = useCallback(() => {
    let iteration = 0;
    const totalFrames = target.length * 4;

    const tick = () => {
      setDisplay(
        target
          .split("")
          .map((char, idx) => {
            if (char === " ") return " ";
            if (idx < iteration / 4) return target[idx];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      iteration++;
      if (iteration < totalFrames) {
        frameRef.current = setTimeout(tick, 35);
      } else {
        setDisplay(target);
      }
    };
    tick();
  }, [target]);

  useEffect(() => {
    if (autoStart) {
      const t = setTimeout(scramble, 400);
      return () => clearTimeout(t);
    }
  }, [autoStart, scramble]);

  return { display, scramble };
}

// ── Magnetic button ────────────────────────────────────────────────────────────
function MagneticLink({
  href,
  children,
  className,
  style,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sX = useSpring(x, { stiffness: 200, damping: 18 });
  const sY = useSpring(y, { stiffness: 200, damping: 18 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.3);
    y.set((e.clientY - cy) * 0.3);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sX, y: sY, ...style }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

// ── Marquee strip ──────────────────────────────────────────────────────────────
const MARQUEE_ITEMS = [
  "WEB DEVELOPER",
  "·",
  "LARAVEL",
  "·",
  "FULL STACK",
  "·",
  "UI ENTHUSIAST",
  "·",
  "SURABAYA",
  "·",
  "COOL BY DEFAULT",
  "·",
];

function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="absolute bottom-10 left-0 right-0 overflow-hidden pointer-events-none select-none">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className={`text-[11px] font-bold tracking-[0.3em] ${
              item === "·" ? "text-[#7c3aed]" : "text-slate-500"
            }`}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ── Main Hero ──────────────────────────────────────────────────────────────────
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth cursor-tracked glow
  const glowX = useSpring(useTransform(mouseX, [0, 1], ["-10%", "110%"]), {
    stiffness: 40,
    damping: 20,
  });
  const glowY = useSpring(useTransform(mouseY, [0, 1], ["-10%", "110%"]), {
    stiffness: 40,
    damping: 20,
  });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  // Scramble for name
  const { display: nameDisplay, scramble: triggerScramble } = useScramble(
    "GA2NG",
    true
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      {/* ── Background base ── */}
      <div className="absolute inset-0 -z-30 bg-[#080612]" />

      {/* ── Dot grid pattern ── */}
      <div
        className="absolute inset-0 -z-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(124,58,237,0.18) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)",
        }}
      />

      {/* ── Cursor-following glow — single soft orb, no particles ── */}
      <motion.div
        className="absolute -z-10 pointer-events-none w-[520px] h-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 70%)",
          left: glowX,
          top: glowY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* ── Static ambient blob ── */}
      <div className="absolute top-1/3 right-1/4 w-[380px] h-[380px] bg-[#7c3aed]/[0.05] rounded-full blur-[90px] pointer-events-none -z-10" />

      {/* ── Content ── */}
      <div className="container mx-auto max-w-5xl w-full pt-28 pb-20">

        {/* Overline label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="h-px w-10 bg-[#7c3aed]" />
          <span className="text-[11px] font-bold tracking-[0.35em] text-[#a855f7] uppercase">
            Available · Surabaya, JTM
          </span>
        </motion.div>

        {/* Big editorial heading */}
        <div className="mb-6 overflow-hidden">
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[13px] md:text-sm font-medium tracking-[0.2em] text-slate-500 uppercase mb-3">
              Ahmad Gagang Prakasa
            </p>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(3.5rem,12vw,9rem)] font-black leading-[0.88] tracking-tight"
            >
              <span
                className="inline-block cursor-pointer select-none bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #ffffff 0%, #c4b5fd 40%, #a855f7 70%, #7c3aed 100%)",
                  WebkitBackgroundClip: "text",
                }}
                onMouseEnter={triggerScramble}
              >
                {nameDisplay}
              </span>
            </motion.h1>
          </div>

          <div className="overflow-hidden mt-1">
            <motion.h2
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(1.6rem,5vw,4rem)] font-black leading-tight tracking-tight text-white/25"
            >
              WEB DEVELOPER
            </motion.h2>
          </div>
        </div>

        {/* Horizontal rule */}
        <motion.div
          className="h-px bg-gradient-to-r from-[#7c3aed]/60 via-[#a855f7]/20 to-transparent mb-8"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Bottom row: description + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          {/* Description */}
          <p className="text-slate-300 text-base leading-relaxed max-w-sm">
            Spesialis{" "}
            <span className="text-[#c4b5fd] font-semibold">Laravel & MySQL</span>.
            Membangun sistem terintegrasi, portal perizinan, hingga landing page — semuanya dengan standar kode yang bersih dan desain yang berbicara.
          </p>

          {/* CTA + socials */}
          <div className="flex flex-col gap-4 items-start md:items-end flex-shrink-0">
            <a
              href="#portfolio"
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                boxShadow: "0 0 28px rgba(124,58,237,0.35)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 48px rgba(168,85,247,0.55)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 28px rgba(124,58,237,0.35)";
              }}
            >
              Lihat Proyek
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </a>

            {/* Social icons — magnetic */}
            <div className="flex items-center gap-2">
              {[
                {
                  icon: <Code2 size={18} />,
                  href: "https://github.com/Ga2ng",
                  label: "GitHub",
                },
                {
                  icon: <Briefcase size={18} />,
                  href: "https://www.linkedin.com/in/ahmad-gagang-prakasa-a32948285",
                  label: "LinkedIn",
                },
                {
                  icon: <Mail size={18} />,
                  href: "mailto:gagangprakasa@gmail.com",
                  label: "Email",
                },
              ].map((s) => (
                <MagneticLink
                  key={s.label}
                  href={s.href}
                  className="group flex items-center justify-center w-9 h-9 rounded-lg text-slate-500 hover:text-white border border-white/5 hover:border-[#7c3aed]/40 transition-colors duration-200"
                  style={{ background: "rgba(255,255,255,0.02)" } as React.CSSProperties}
                >
                  {s.icon}
                </MagneticLink>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Number index — editorial detail */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute top-32 right-6 hidden xl:block"
        >
          <span
            className="text-[8rem] font-black leading-none select-none pointer-events-none"
            style={{
              color: "transparent",
              WebkitTextStroke: "1px rgba(124,58,237,0.12)",
            }}
          >
            01
          </span>
        </motion.div>
      </div>

      {/* ── Scrolling marquee strip ── */}
      <Marquee />
    </section>
  );
}
