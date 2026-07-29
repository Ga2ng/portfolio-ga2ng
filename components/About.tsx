"use client";

import React from "react";
import { motion } from "framer-motion";

// Domain-level skill bars (no tool duplication)
const SKILLS = [
  { name: "Backend Development", level: "Expert", pct: 94 },
  { name: "Database Engineering", level: "Expert", pct: 91 },
  { name: "AI Agent & Automation", level: "Expert", pct: 90 },
  { name: "ETL & Data Pipeline", level: "Advanced", pct: 87 },
  { name: "Frontend & UI", level: "Intermediate", pct: 76 },
];

const FACTS = [
  { label: "Domisili", value: "Surabaya, JTM" },
  { label: "Spesialisasi", value: "Laravel · Python · MySQL" },
  { label: "Workflow", value: "AI Agent & Automation" },
  { label: "Status", value: "Open to Work" },
];

const CATEGORIZED_TOOLS = [
  {
    title: "Backend Engineering",
    items: [
      {
        name: "Python",
        desc: "ETL & Data Scripting",
        color: "#3776AB",
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M11.9 2c-4.3 0-4 .5-4 2.1v2.2h8.1v.8H5.7C4.1 7.1 2 8.3 2 11.9c0 3.8 1.4 4.8 4.2 4.8h1.6v-2.3c0-2.6 2.2-4.7 4.8-4.7h5.1c1.9 0 2.2-1.3 2.2-2.5V4.2C20.1 2.5 18 2 11.9 2zm-2.4 2.2c.6 0 1.1.5 1.1 1.1s-.5 1.1-1.1 1.1-1.1-.5-1.1-1.1.5-1.1 1.1-1.1z" fill="#3776AB"/>
            <path d="M12.1 22c4.3 0 4-.5 4-2.1v-2.2H12v-.8h10.3c1.6 0 3.7-1.2 3.7-4.8 0-3.8-1.4-4.8-4.2-4.8h-1.6v2.3c0 2.6-2.2 4.7-4.8 4.7H10.3c-1.9 0-2.2 1.3-2.2 2.5v3.1c0 1.7 2.1 2.2 8.2 2.2zm2.4-2.2c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1z" fill="#FFD43B"/>
          </svg>
        ),
      },
      {
        name: "Laravel",
        desc: "PHP Web Framework",
        color: "#FF2D20",
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#FF2D20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
      },
      {
        name: "PHP",
        desc: "Core Web Language",
        color: "#777BB4",
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
            <ellipse cx="12" cy="12" rx="10" ry="6" stroke="#777BB4" strokeWidth="2" />
            <text x="6" y="15" fontSize="8" fontWeight="bold" fill="#777BB4">PHP</text>
          </svg>
        ),
      },
      {
        name: "Node.js",
        desc: "JS Server Runtime",
        color: "#5FA04E",
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#5FA04E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7.5V16.5L12 22L22 16.5V7.5L12 2Z"/>
          </svg>
        ),
      },
      {
        name: "Express.js",
        desc: "Node Web API",
        color: "#CBD5E1",
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round">
            <path d="M4 12h16M12 4v16" />
          </svg>
        ),
      },
    ],
  },
  {
    title: "Database & Storage",
    items: [
      {
        name: "MySQL",
        desc: "Relational Database",
        color: "#4479A1",
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path d="M4 6c0-1.657 3.582-3 8-3s8 1.343 8 3v12c0 1.657-3.582 3-8 3s-8-1.343-8-3V6z" stroke="#38BDF8" strokeWidth="2"/>
            <path d="M4 12c0 1.657 3.582 3 8 3s8-1.343 8-3" stroke="#38BDF8" strokeWidth="2"/>
          </svg>
        ),
      },
      {
        name: "PostgreSQL",
        desc: "Advanced Relational DB",
        color: "#336791",
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
            <path d="M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0z" fill="rgba(56,189,248,0.3)" />
          </svg>
        ),
      },
      {
        name: "SQLite",
        desc: "Embedded DB",
        color: "#38BDF8",
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2">
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <line x1="9" y1="10" x2="9" y2="20" />
          </svg>
        ),
      },
    ],
  },
  {
    title: "Frontend UI & Design",
    items: [
      {
        name: "React",
        desc: "UI Component Library",
        color: "#61DAFB",
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#61DAFB" strokeWidth="2">
            <ellipse cx="12" cy="12" rx="9" ry="3.5" />
            <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
            <circle cx="12" cy="12" r="1.5" fill="#61DAFB" />
          </svg>
        ),
      },
      {
        name: "Next.js",
        desc: "Fullstack Framework",
        color: "#F1F5F9",
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#F1F5F9" strokeWidth="2">
            <circle cx="12" cy="12" r="9" />
            <path d="M10 8v8l6-8" strokeLinecap="round"/>
          </svg>
        ),
      },
      {
        name: "TypeScript",
        desc: "Typed JavaScript",
        color: "#3178C6",
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="4" fill="#3178C6"/>
            <text x="5" y="17" fontSize="11" fontWeight="bold" fill="#FFFFFF">TS</text>
          </svg>
        ),
      },
      {
        name: "Tailwind CSS",
        desc: "Utility Styling",
        color: "#06B6D4",
        icon: (
          <svg className="w-5 h-5" fill="#06B6D4" viewBox="0 0 24 24">
            <path d="M12 6c-3.314 0-5.8 2.05-6.6 4.95 1.1-.9 2.2-1.35 3.3-1.35 1.925 0 3.25 1.325 4 2.7 1.2 2.2 2.925 3.7 5.3 3.7 3.314 0 5.8-2.05 6.6-4.95-1.1.9-2.2 1.35-3.3 1.35-1.925 0-3.25-1.325-4-2.7C16.1 7.5 14.375 6 12 6zM5.4 12c-3.314 0-5.8 2.05-6.6 4.95 1.1-.9 2.2-1.35 3.3-1.35 1.925 0 3.25 1.325 4 2.7 1.2 2.2 2.925 3.7 5.3 3.7 3.314 0 5.8-2.05 6.6-4.95-1.1.9-2.2 1.35-3.3 1.35-1.925 0-3.25-1.325-4-2.7C9.5 13.5 7.775 12 5.4 12z"/>
          </svg>
        ),
      },
      {
        name: "Figma",
        desc: "UI/UX & Prototyping",
        color: "#F24E1E",
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" fill="#F24E1E"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M18 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" fill="#FF7262"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M18 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" fill="#1ABCFE"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M12 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" fill="#A259FF"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M12 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" fill="#0ACF83"/>
          </svg>
        ),
      },
    ],
  },
  {
    title: "AI & Automation",
    items: [
      {
        name: "Cursor AI",
        desc: "AI Code Editor",
        color: "#38BDF8",
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="3 3 10.07 19.97 12.58 12.58 19.97 10.07 3 3" fill="rgba(56,189,248,0.2)"/>
            <line x1="13" y1="13" x2="19" y2="19" />
          </svg>
        ),
      },
      {
        name: "Antigravity AI",
        desc: "Agentic AI System",
        color: "#A855F7",
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2">
            <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="rgba(168,85,247,0.3)" />
            <circle cx="12" cy="12" r="2.5" fill="#A855F7" />
          </svg>
        ),
      },
      {
        name: "Opencode",
        desc: "AI Agent Workspace",
        color: "#10B981",
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
            <line x1="14" y1="4" x2="10" y2="20" />
          </svg>
        ),
      },
      {
        name: "Hermes",
        desc: "AI Agent Engine",
        color: "#F59E0B",
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="rgba(245,158,11,0.2)" />
          </svg>
        ),
      },
      {
        name: "MCP",
        desc: "Model Context Protocol",
        color: "#8B5CF6",
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="8" height="8" rx="2" />
            <rect x="14" y="2" width="8" height="8" rx="2" />
            <rect x="14" y="14" width="8" height="8" rx="2" />
            <rect x="2" y="14" width="8" height="8" rx="2" />
          </svg>
        ),
      },
      {
        name: "Browser Auto",
        desc: "Web Scraping & Bots",
        color: "#EC4899",
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3a9 9 0 000 18v-9z" fill="rgba(236,72,153,0.3)" />
          </svg>
        ),
      },
      {
        name: "ETL Pipeline",
        desc: "Excel/CSV → DB Inject",
        color: "#6366F1",
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        ),
      },
    ],
  },
  {
    title: "Deployment & DevOps",
    items: [
      {
        name: "Git",
        desc: "Version Control",
        color: "#F05032",
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#F05032" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="6" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="18" r="3" />
            <line x1="8.7" y1="10.7" x2="15.3" y2="7.3" />
            <line x1="8.7" y1="13.3" x2="15.3" y2="16.7" />
          </svg>
        ),
      },
      {
        name: "GitHub",
        desc: "Repo & CI/CD",
        color: "#F1F5F9",
        icon: (
          <svg className="w-5 h-5" fill="#F1F5F9" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        ),
      },
      {
        name: "Linux",
        desc: "Server Admin",
        color: "#FCC624",
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#FCC624" strokeWidth="2">
            <rect x="4" y="4" width="16" height="16" rx="3" />
            <path d="M8 10l3 3-3 3M13 16h3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ),
      },
      {
        name: "SSH & SFTP",
        desc: "Secure Transfer",
        color: "#4ADE80",
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        ),
      },
      {
        name: "Vercel",
        desc: "Cloud Hosting",
        color: "#FFFFFF",
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FFFFFF">
            <path d="M12 2L24 22H0L12 2Z" />
          </svg>
        ),
      },
    ],
  },
];

// ── Tool Marquee Row ───────────────────────────────────────────────────────
type ToolItem = { name: string; desc: string; color: string; icon: React.ReactNode };

function ToolMarqueeRow({
  items,
  direction = "left",
  speed = 25,
}: {
  items: ToolItem[];
  direction?: "left" | "right";
  speed?: number;
}) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items, ...items];
  const animX = direction === "left" ? ["0%", "-33.333%"] : ["-33.333%", "0%"];

  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex gap-2 flex-shrink-0"
        animate={{ x: animX }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-white/[0.06] flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.025)" }}
          >
            <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
              {item.icon}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-bold text-slate-200 whitespace-nowrap leading-none">
                {item.name}
              </span>
              <span className="text-[9px] font-mono text-slate-500 whitespace-nowrap leading-tight mt-0.5">
                {item.desc}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <span className="text-[11px] font-mono text-[#7c3aed]">{num}</span>
      <span className="h-px w-8 bg-[#7c3aed]/60" />
      <span className="text-[11px] font-bold tracking-[0.3em] text-[#a855f7] uppercase">{label}</span>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6 overflow-hidden">
      {/* Subtle background dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(124,58,237,0.12) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 70% 100% at 20% 50%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 100% at 20% 50%, black, transparent)",
        }}
      />

      <div className="container mx-auto max-w-6xl relative">
        {/* ── SECTION HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <SectionLabel num="02" label="Tentang Saya" />
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.05]">
              Ahmad<br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #c4b5fd, #a855f7, #7c3aed)" }}
              >
                Gagang Prakasa
              </span>
            </h2>
          </div>
        </div>

        {/* ── TOP MAIN CONTENT GRID: Bio + Skills ── */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
          {/* Left: narrative bio + fact chips */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="space-y-4 text-slate-300 text-base leading-relaxed mb-8">
              <p>
                Web Developer berdomisili di{" "}
                <span className="text-white font-semibold">Surabaya, Jawa Timur</span>{" "}
                dengan fokus utama pada{" "}
                <span className="text-[#c4b5fd] font-semibold">Laravel, Python &amp; MySQL</span>.
              </p>
              <p>
                Berpengalaman membangun sistem enterprise — <span className="text-white font-medium">booking engine</span>, REST API, hingga{" "}
                <span className="text-[#c4b5fd] font-medium">ETL pipeline</span> yang meng-inject data dari Excel/CSV langsung ke database.
                Terlatih menggunakan <span className="text-white font-medium">AI Agent Tools &amp; MCP Workflows</span> untuk mempercepat development dengan standar <span className="text-[#c4b5fd] font-medium">clean code</span>.
              </p>
            </div>

            {/* Inline fact chips — lebih ringkas dari grid */}
            <div className="flex flex-wrap gap-2">
              {FACTS.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/[0.06]"
                  style={{ background: "rgba(255,255,255,0.025)" }}
                >
                  <span className="text-[9px] font-mono text-[#7c3aed] tracking-widest uppercase whitespace-nowrap">{f.label}</span>
                  <span className="text-[11px] text-slate-200 font-semibold whitespace-nowrap">{f.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Domain-level skill bars */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
          >
            <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-slate-500 mb-5">Domain Mastery</p>
            {SKILLS.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="text-sm font-bold text-slate-200">{skill.name}</span>
                  <span className="text-[10px] font-mono text-[#7c3aed]">{skill.level}</span>
                </div>
                <div className="h-1 w-full bg-white/[0.05] relative overflow-hidden rounded-full">
                  <motion.div
                    className="absolute top-0 left-0 h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #7c3aed, #a855f7, #c084fc)" }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── TECH STACK MARQUEE ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="pt-12 border-t border-white/[0.07]"
        >
          {/* Sub-header */}
          <div className="mb-7 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono text-[#7c3aed] font-semibold uppercase tracking-widest block mb-1">
                Full Tech &amp; AI Stack
              </span>
              <h3 className="text-xl font-black text-white tracking-tight">
                Teknologi &amp; Tools Yang Digunakan
              </h3>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 text-xs font-mono font-semibold text-[#c4b5fd] self-start sm:self-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7] animate-pulse" />
              25 Teknologi &amp; Tools Terintegrasi
            </div>
          </div>

          {/* 3-row infinite marquee — edge fade mask */}
          <div
            className="relative overflow-hidden space-y-2.5"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            }}
          >
            {/* ROW 1 — Backend + Database → scroll left */}
            <ToolMarqueeRow
              items={[
                ...CATEGORIZED_TOOLS[0].items,
                ...CATEGORIZED_TOOLS[1].items,
              ]}
              direction="left"
              speed={28}
            />
            {/* ROW 2 — AI & Automation → scroll right */}
            <ToolMarqueeRow
              items={CATEGORIZED_TOOLS[3].items}
              direction="right"
              speed={22}
            />
            {/* ROW 3 — Frontend + DevOps → scroll left */}
            <ToolMarqueeRow
              items={[
                ...CATEGORIZED_TOOLS[2].items,
                ...CATEGORIZED_TOOLS[4].items,
              ]}
              direction="left"
              speed={26}
            />
          </div>

          {/* ── CTA at bottom of About ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-5 p-6 rounded-2xl border border-[#7c3aed]/20"
            style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.06) 0%, rgba(168,85,247,0.02) 100%)" }}
          >
            <div>
              <p className="text-white font-black text-lg mb-1">Tertarik untuk berkolaborasi?</p>
              <p className="text-slate-400 text-sm">Saya terbuka untuk full-time, freelance, dan diskusi proyek menarik.</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <a
                href="#portfolio"
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-300 border border-white/[0.08] hover:border-[#7c3aed]/40 hover:text-white transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                Lihat Karya
              </a>
              <a
                href="#contact"
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]"
                style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
              >
                Hubungi Saya →
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
