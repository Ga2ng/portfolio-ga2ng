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

// ── Retro 3D wireframe mesh canvas (zero dependency, highly optimized 60fps) ──
// ── Paper writing doodle component (zero dependency, highly optimized) ──
function PaperWritingDoodle() {
  const lineVariants = (delay: number) => ({
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, duration: 1.2, ease: "easeInOut" },
        opacity: { delay, duration: 0.01 }
      }
    }
  });

  const doodleVariants = (delay: number) => ({
    hidden: { pathLength: 0, opacity: 0, scale: 0.8 },
    visible: {
      pathLength: 1,
      opacity: 1,
      scale: 1,
      transition: {
        pathLength: { delay, duration: 1.5, ease: "easeInOut" },
        opacity: { delay, duration: 0.01 },
        scale: { delay, duration: 0.3 }
      }
    }
  });

  return (
    <div className="relative border-3 border-[#0f0e14] bg-[#ffffff] rounded-2xl shadow-[6px_6px_0_#0f0e14] p-5 w-[280px] h-[280px] rotate-[3deg] transition-all hover:rotate-0 hover:scale-105 duration-300 overflow-hidden select-none">
      {/* Torn notebook paper lines (horizontal blue lines, vertical red margin) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(239, 68, 68, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: "100% 24px, 100% 100%",
          backgroundPosition: "0 16px, 40px 0"
        }}
      />

      {/* SVG drawing content */}
      <svg viewBox="0 0 280 280" className="w-full h-full relative z-10">
        {/* Handwriting line strokes representing written code/ideas */}
        <motion.path
          d="M 50 40 L 150 40"
          stroke="#0f0e14"
          strokeWidth="4"
          strokeLinecap="round"
          initial="hidden"
          animate="visible"
          variants={lineVariants(0.2)}
        />
        
        <motion.path
          d="M 50 64 L 230 64"
          stroke="#0f0e14"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial="hidden"
          animate="visible"
          variants={lineVariants(0.6)}
        />

        <motion.path
          d="M 50 88 L 190 88"
          stroke="#0f0e14"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial="hidden"
          animate="visible"
          variants={lineVariants(1.0)}
        />

        <motion.path
          d="M 50 112 L 240 112"
          stroke="#0f0e14"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial="hidden"
          animate="visible"
          variants={lineVariants(1.4)}
        />

        <motion.path
          d="M 50 136 L 160 136"
          stroke="#0f0e14"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial="hidden"
          animate="visible"
          variants={lineVariants(1.8)}
        />

        {/* Code Tag Bracket Doodle < /> */}
        <motion.path
          d="M 60 175 L 45 190 L 60 205"
          fill="none"
          stroke="#0f0e14"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial="hidden"
          animate="visible"
          variants={doodleVariants(2.1)}
        />
        
        <motion.path
          d="M 75 208 L 90 172"
          fill="none"
          stroke="#0f0e14"
          strokeWidth="3"
          strokeLinecap="round"
          initial="hidden"
          animate="visible"
          variants={doodleVariants(2.3)}
        />

        <motion.path
          d="M 105 175 L 120 190 L 105 205"
          fill="none"
          stroke="#0f0e14"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial="hidden"
          animate="visible"
          variants={doodleVariants(2.5)}
        />

        {/* Coffee Cup Doodle instead of star */}
        <motion.path
          d="M 160 180 L 200 180 L 195 205 C 195 215 165 215 165 205 Z"
          fill="none"
          stroke="#0f0e14"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial="hidden"
          animate="visible"
          variants={doodleVariants(2.8)}
        />
        <motion.path
          d="M 200 185 C 212 185 212 198 197 198"
          fill="none"
          stroke="#0f0e14"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial="hidden"
          animate="visible"
          variants={doodleVariants(3.0)}
        />
        {/* Steam waves */}
        <motion.path
          d="M 173 172 C 173 166 177 166 177 160"
          fill="none"
          stroke="#0f0e14"
          strokeWidth="2"
          strokeLinecap="round"
          initial="hidden"
          animate="visible"
          variants={doodleVariants(3.2)}
        />
        <motion.path
          d="M 187 172 C 187 166 191 166 191 160"
          fill="none"
          stroke="#0f0e14"
          strokeWidth="2"
          strokeLinecap="round"
          initial="hidden"
          animate="visible"
          variants={doodleVariants(3.4)}
        />

      </svg>
      
      {/* Tape decoration on corners */}
      <div 
        className="absolute -top-3 -left-3 w-12 h-6 bg-[#f5f0e8]/80 border border-dashed border-[#0f0e14] opacity-80"
        style={{ transform: "rotate(-35deg)" }}
      />
      <div 
        className="absolute -bottom-3 -right-3 w-12 h-6 bg-[#f5f0e8]/80 border border-dashed border-[#0f0e14] opacity-80"
        style={{ transform: "rotate(-35deg)" }}
      />

      <span className="absolute bottom-2 left-5 text-[8px] font-black uppercase tracking-wider text-[#0f0e14] opacity-40" style={{ fontFamily: "var(--font-nunito)" }}>
        Drawing Draft...
      </span>
    </div>
  );
}


// ── Marquee strip ──────────────────────────────────────────────────────────────
const MARQUEE_ITEMS = [
  "WEB DEVELOPER",
  "·",
  "LARAVEL",
  "·",
  "AI AGENT POWERED",
  "·",
  "FULL STACK",
  "·",
  "UI ENTHUSIAST",
  "·",
  "SURABAYA",
  "·",
];

function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div
      className="absolute bottom-12 left-[-5%] w-[110%] py-3 overflow-hidden select-none border-t-3 border-b-3 border-[#0f0e14] z-10"
      style={{
        background: "#0f0e14",
        transform: "rotate(-1.5deg)",
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
      }}
    >
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="text-[12px] font-black tracking-[0.3em] uppercase"
            style={{
              fontFamily: "var(--font-nunito, 'Nunito', sans-serif)",
              color: item === "·" ? "#ffffff" : "#f5f0e8",
            }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ── Scrapbook Elements ────────────────────────────────────────────────────────
const PushPin = ({ className = "" }: { className?: string }) => (
  <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none drop-shadow-[2px_3px_1.5px_rgba(0,0,0,0.35)] ${className}`}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 14 L15 22" stroke="#000000" strokeWidth="2.2" opacity="0.65" strokeLinecap="round" />
      <path d="M12 12 L12 21" stroke="#a0aec0" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M8 8 C8 5 16 5 16 8 L15 12 L9 12 Z" fill="#ff3d7f" stroke="#0f0e14" strokeWidth="2.2" />
      <ellipse cx="12" cy="5" rx="3.2" ry="1.6" fill="#ff72be" stroke="#0f0e14" strokeWidth="2.2" />
      <rect x="10.5" y="8" width="3" height="4.5" fill="#ff3d7f" stroke="#0f0e14" strokeWidth="1" />
    </svg>
  </div>
);

const StickyNote = ({ text, color = "#ffe135", rotate = -3, className = "" }: { text: string; color?: string; rotate?: number; className?: string }) => (
  <div
    className={`absolute p-4 w-28 h-28 flex items-center justify-center text-center border-2.5 border-[#0f0e14] shadow-[4px_4px_0_#0f0e14] select-none ${className}`}
    style={{
      background: color,
      transform: `rotate(${rotate}deg)`,
      fontFamily: "var(--font-fredoka)",
      fontSize: "11px",
      lineHeight: "1.3",
      color: "#0f0e14",
    }}
  >
    <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-8 h-2.5 bg-white/40 border border-dashed border-black/20" />
    <span className="font-extrabold tracking-wide uppercase">{text}</span>
  </div>
);

// ── Main Hero ──────────────────────────────────────────────────────────────────
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

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
      {/* Halftone dot pattern */}
      <div
        className="absolute inset-0 -z-20 pointer-events-none halftone-bg"
        style={{
          maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)",
        }}
      />

      {/* Subtle depth */}
      <motion.div
        className="absolute -z-10 pointer-events-none w-[480px] h-[480px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(15,14,20,0.03) 0%, transparent 70%)",
          left: glowX,
          top: glowY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* ── Content ── */}
      <div className="container mx-auto max-w-6xl w-full pt-28 pb-20 relative">
        {/* Paper Writing Doodle with pushpin and sticky note for zine/billboard vibe */}
        <div className="absolute right-12 top-[15%] hidden lg:block select-none z-10">
          <PushPin className="-top-3" />
          <PaperWritingDoodle />
          <StickyNote 
            text="LETS CODE" 
            color="#ffe135" 
            rotate={-8} 
            className="left-[-40px] -bottom-12" 
          />
        </div>

        {/* Overline label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <span
            className="comic-badge"
            style={{ fontFamily: "var(--font-nunito)", background: "#ffffff" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#0f0e14] animate-pulse inline-block" />
            Available · Surabaya, JTM
          </span>
        </motion.div>

        {/* Big heading */}
        <div className="mb-6 overflow-hidden">
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="text-[13px] md:text-sm font-medium tracking-[0.2em] uppercase mb-3"
              style={{
                fontFamily: "var(--font-nunito, 'Nunito', sans-serif)",
                color: "#0f0e14",
              }}
            >
              Ahmad Gagang Prakasa
            </p>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(3.5rem,12vw,9rem)] leading-[0.88]"
              style={{ fontFamily: "var(--font-bangers, 'Bangers', cursive)", letterSpacing: "0.06em" }}
            >
              <span
                className="inline-block cursor-pointer select-none"
                style={{ color: "#0f0e14" }}
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
              className="text-[clamp(1.6rem,5vw,4rem)] leading-tight tracking-tight"
              style={{
                fontFamily: "var(--font-fredoka, 'Fredoka One', cursive)",
                color: "#0f0e14",
              }}
            >
              WEB DEVELOPER
            </motion.h2>
          </div>
        </div>

        {/* Horizontal rule */}
        <motion.div
          className="h-[2.5px] mb-8"
          style={{ background: "#0f0e14" }}
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
          <p
            className="text-base leading-relaxed max-w-sm"
            style={{ color: "#0f0e14", fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)" }}
          >
            Spesialis{" "}
            <span className="highlight-yellow font-black">Laravel &amp; MySQL</span>.
            Membangun booking engine, ETL pipeline, REST API — dengan standar clean code dan kecepatan{" "}
            <span className="highlight-pink font-black">AI-assisted workflow</span>.
          </p>

          {/* CTA + socials */}
          <div className="flex flex-col gap-4 items-start md:items-end flex-shrink-0">
            <a
              href="#portfolio"
              className="comic-btn group inline-flex items-center gap-2.5 px-6 py-3 text-sm font-bold"
              style={{
                fontFamily: "var(--font-nunito, 'Nunito', sans-serif)",
                background: "#ffe135",
                color: "#0f0e14",
                border: "2.5px solid #0f0e14",
                boxShadow: "4px 4px 0 #0f0e14",
              }}
            >
              Lihat Proyek
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </a>

            {/* Social icons */}
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
                  className="group flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-150"
                  style={{
                    background: "#ffffff",
                    color: "#0f0e14",
                    border: "2.5px solid #0f0e14",
                    boxShadow: "3px 3px 0 #0f0e14",
                  } as React.CSSProperties}
                >
                  {s.icon}
                </MagneticLink>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Large ghost number */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute top-32 right-6 hidden xl:block"
        >
          <span
            className="text-[8rem] font-black leading-none select-none pointer-events-none"
            style={{
              fontFamily: "var(--font-bangers, 'Bangers', cursive)",
              color: "transparent",
              WebkitTextStroke: "1px rgba(15,14,20,0.06)",
              letterSpacing: "0.06em",
            }}
          >
            01
          </span>
        </motion.div>
      </div>

      {/* Marquee */}
      <Marquee />
    </section>
  );
}
