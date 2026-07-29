"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { GitCommit, GitFork, Star, ExternalLink, RefreshCw, BookOpen, Users, Code, Calendar } from "lucide-react";

function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <span className="text-[11px] font-mono text-[#7c3aed]">{num}</span>
      <span className="h-px w-8 bg-[#7c3aed]/60" />
      <span className="text-[11px] font-bold tracking-[0.3em] text-[#a855f7] uppercase">{label}</span>
    </div>
  );
}

const GITHUB_USERNAME = "Ga2ng";
const YEARS = [2026, 2025, 2024, 2023, 2022];

interface DayData {
  date: string;
  level: number;
  count: number;
}

type WeekData = DayData[];

interface UserProfile {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

interface LanguageStat {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

const LANG_COLORS: Record<string, string> = {
  PHP: "#7c3aed",
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  HTML: "#E34F26",
  CSS: "#a855f7",
  Blade: "#F28D35",
  Java: "#b07219",
  Vue: "#4FC08D",
  Shell: "#89E051",
};

export default function GitHubContributions() {
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [weeks, setWeeks] = useState<WeekData[]>([]);
  const [totalContributions, setTotalContributions] = useState<number | null>(null);
  const [loadingGraph, setLoadingGraph] = useState<boolean>(true);
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null);

  // Profile & Repo stats
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [languages, setLanguages] = useState<LanguageStat[]>([]);
  const [totalStars, setTotalStars] = useState<number>(0);
  const [loadingStats, setLoadingStats] = useState<boolean>(true);

  // Fetch 100% Official GitHub Contributions via internal API route
  const fetchGraphData = useCallback(async (year: number) => {
    setLoadingGraph(true);
    try {
      const res = await fetch(`/api/github?username=${GITHUB_USERNAME}&year=${year}`);
      if (!res.ok) throw new Error("API Route error");
      const data = await res.json();

      setTotalContributions(data.totalContributions ?? 0);

      // Construct API Data Map
      const dataMap: Record<string, DayData> = {};
      if (data.days) {
        data.days.forEach((d: DayData) => {
          dataMap[d.date] = d;
        });
      }

      // Build 52-week calendar grid starting from Jan 1 of selected year
      const calendarWeeks: WeekData[] = [];
      const jan1 = new Date(year, 0, 1);
      const startDate = new Date(jan1);
      startDate.setDate(jan1.getDate() - jan1.getDay()); // Start at preceding Sunday

      const dec31 = new Date(year, 11, 31);
      const endDate = new Date(dec31);
      endDate.setDate(dec31.getDate() + (6 - dec31.getDay())); // End at following Saturday

      const curr = new Date(startDate);
      let currentWeek: WeekData = [];

      while (curr <= endDate) {
        const yearStr = curr.getFullYear();
        const monthStr = String(curr.getMonth() + 1).padStart(2, "0");
        const dayStr = String(curr.getDate()).padStart(2, "0");
        const dateKey = `${yearStr}-${monthStr}-${dayStr}`;

        const existing = dataMap[dateKey];
        const dayItem: DayData = existing || {
          date: dateKey,
          level: 0,
          count: 0,
        };

        currentWeek.push(dayItem);
        if (currentWeek.length === 7) {
          calendarWeeks.push(currentWeek);
          currentWeek = [];
        }

        curr.setDate(curr.getDate() + 1);
      }

      if (currentWeek.length > 0) calendarWeeks.push(currentWeek);
      setWeeks(calendarWeeks);
    } catch (err) {
      console.error("Error fetching graph data:", err);
    } finally {
      setLoadingGraph(false);
    }
  }, []);

  // Fetch GitHub User & Repos Stats directly from official GitHub REST API
  const fetchGitHubStats = useCallback(async () => {
    setLoadingStats(true);
    try {
      const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
      if (userRes.ok) {
        const userData = await userRes.json();
        setProfile({
          public_repos: userData.public_repos,
          followers: userData.followers,
          following: userData.following,
          created_at: userData.created_at,
        });
      }

      const repoRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
      if (repoRes.ok) {
        const repos = await repoRes.json();
        let stars = 0;
        const langCounts: Record<string, number> = {};

        repos.forEach((r: { stargazers_count?: number; language?: string }) => {
          stars += r.stargazers_count || 0;
          if (r.language) {
            langCounts[r.language] = (langCounts[r.language] || 0) + 1;
          }
        });

        setTotalStars(stars);

        const totalLangRepos = Object.values(langCounts).reduce((a, b) => a + b, 0);
        const sortedLangs: LanguageStat[] = Object.entries(langCounts)
          .map(([name, count]) => ({
            name,
            count,
            percentage: Math.round((count / (totalLangRepos || 1)) * 100),
            color: LANG_COLORS[name] || "#a855f7",
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 6);

        setLanguages(sortedLangs);
      }
    } catch (err) {
      console.error("Error loading GitHub stats:", err);
    } finally {
      setLoadingStats(false);
    }
  }, []);

  useEffect(() => {
    fetchGraphData(selectedYear);
  }, [selectedYear, fetchGraphData]);

  useEffect(() => {
    fetchGitHubStats();
  }, [fetchGitHubStats]);

  // Color Palette matching website theme
  const getPurpleColor = (level: number) => {
    switch (level) {
      case 0:
        return "rgba(255, 255, 255, 0.03)";
      case 1:
        return "#4c1d95";
      case 2:
        return "#6d28d9";
      case 3:
        return "#7c3aed";
      case 4:
      default:
        return "#a855f7";
    }
  };

  // Month labels calculation (Jan -> Dec chronologically)
  const monthLabels: { name: string; weekIndex: number }[] = [];
  let lastMonthName = "";
  weeks.forEach((w, wIdx) => {
    const validDay = w.find((d) => d.date.startsWith(String(selectedYear)));
    if (validDay) {
      const dateObj = new Date(validDay.date);
      const mName = dateObj.toLocaleString("en-US", { month: "short" });
      if (mName !== lastMonthName) {
        monthLabels.push({ name: mName, weekIndex: wIdx });
        lastMonthName = mName;
      }
    }
  });

  const svgWidth = Math.max(780, 40 + weeks.length * 14 + 10);
  const svgHeight = 140;

  return (
    <section id="github" className="relative py-28 px-6 overflow-hidden">
      {/* Background ambient dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(124,58,237,0.14) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
        }}
      />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#7c3aed]/8 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-[#a855f7]/6 blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <SectionLabel num="04" label="GitHub Activity" />
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.05]">
              Aktivitas Kontribusi<br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #c4b5fd, #a855f7, #7c3aed)" }}
              >
                GitHub @{GITHUB_USERNAME}
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-semibold bg-[#7c3aed]/10 text-[#a855f7] border border-[#7c3aed]/20">
              <span className="w-2 h-2 rounded-full bg-[#a855f7] animate-pulse" />
              Direct GitHub.com Scraping
            </span>
            <button
              onClick={() => {
                fetchGraphData(selectedYear);
                fetchGitHubStats();
              }}
              className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/[0.06] transition-colors"
              title="Refresh Data"
            >
              <RefreshCw size={14} className={loadingGraph || loadingStats ? "animate-spin text-[#a855f7]" : ""} />
            </button>
          </div>
        </motion.div>

        {/* MAIN CONTRIBUTION GRAPH (100% OFFICIAL ACCURATE DATA FROM GITHUB.COM) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl p-6 md:p-8 mb-8 border border-white/[0.06] hover:border-[#7c3aed]/30 transition-all duration-300 backdrop-blur-md overflow-hidden"
          style={{ background: "rgba(255,255,255,0.02)" }}
        >
          {/* Header Bar with Exact Total Count & Year Selector */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/[0.04]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#7c3aed]/10 border border-[#7c3aed]/20 flex items-center justify-center text-[#a855f7]">
                <GitCommit size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide">
                  {totalContributions !== null
                    ? `${totalContributions} Kontribusi`
                    : "Memuat kontribusi..."}
                </h3>
                <p className="text-[11px] text-slate-400 font-mono">
                  tahun {selectedYear} di GitHub
                </p>
              </div>
            </div>

            {/* Year Selector Tabs (2026, 2025, 2024, 2023, 2022) */}
            <div className="flex items-center gap-1.5 p-1 bg-white/[0.02] border border-white/[0.06] rounded-xl flex-wrap">
              <span className="text-[10px] font-mono text-slate-500 px-2 flex items-center gap-1">
                <Calendar size={12} /> Tahun:
              </span>
              {YEARS.map((yr) => (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`px-3.5 py-1 text-xs font-mono font-bold rounded-lg transition-all ${
                    selectedYear === yr
                      ? "bg-[#7c3aed] text-white shadow-[0_0_18px_rgba(124,58,237,0.5)] scale-105"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>

          {/* Hover Tooltip display */}
          <div className="h-7 flex items-center text-xs font-mono text-slate-300 mb-3">
            {hoveredDay ? (
              <span className="bg-[#7c3aed]/20 px-3 py-1.5 rounded-md border border-[#7c3aed]/40 text-[#c4b5fd] font-bold">
                {hoveredDay.count > 0 ? `${hoveredDay.count} kontribusi` : "Tidak ada kontribusi"} pada {hoveredDay.date}
              </span>
            ) : (
              <span className="text-slate-500 text-[11px]">
                Arahkan kursor ke kotak warna untuk melihat detail per hari
              </span>
            )}
          </div>

          {/* ACCURATE SVG VECTOR GRID */}
          {loadingGraph ? (
            <div className="h-36 flex items-center justify-center text-slate-500 font-mono text-xs gap-2">
              <RefreshCw size={16} className="animate-spin text-[#a855f7]" />
              Mengambil data kontribusi resmi tahun {selectedYear}...
            </div>
          ) : weeks.length > 0 ? (
            <div className="overflow-x-auto pb-3 pt-1 scrollbar-thin">
              <svg
                width={svgWidth}
                height={svgHeight}
                className="select-none overflow-visible w-full min-w-[760px]"
              >
                {/* Month labels (Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec) */}
                <g className="text-[10px] font-mono fill-slate-400">
                  {monthLabels.map((m) => (
                    <text
                      key={`${m.name}-${m.weekIndex}`}
                      x={35 + m.weekIndex * 14}
                      y={12}
                    >
                      {m.name}
                    </text>
                  ))}
                </g>

                {/* Day labels (Mon, Wed, Fri) */}
                <g className="text-[9px] font-mono fill-slate-500">
                  <text x={5} y={41}>Mon</text>
                  <text x={5} y={69}>Wed</text>
                  <text x={5} y={97}>Fri</text>
                </g>

                {/* Squares Grid */}
                <g transform="translate(35, 25)">
                  {weeks.map((week, wIdx) => (
                    <g key={wIdx} transform={`translate(${wIdx * 14}, 0)`}>
                      {week.map((day, dIdx) => (
                        <rect
                          key={`${wIdx}-${dIdx}`}
                          x={0}
                          y={dIdx * 14}
                          width={11}
                          height={11}
                          rx={2}
                          fill={getPurpleColor(day.level)}
                          stroke={day.level > 0 ? "rgba(168, 85, 247, 0.4)" : "rgba(255, 255, 255, 0.05)"}
                          strokeWidth={0.5}
                          className="transition-all duration-150 cursor-pointer hover:scale-125 hover:stroke-[#a855f7] hover:stroke-2"
                          onMouseEnter={() =>
                            setHoveredDay({ date: day.date, count: day.count })
                          }
                          onMouseLeave={() => setHoveredDay(null)}
                        />
                      ))}
                    </g>
                  ))}
                </g>
              </svg>
            </div>
          ) : (
            <div className="text-center py-10 text-slate-500 font-mono text-xs">
              Tidak ada data kontribusi untuk tahun {selectedYear}
            </div>
          )}

          {/* Footer Bar */}
          <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono text-slate-400">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#a855f7] hover:text-[#c4b5fd] hover:underline flex items-center gap-1 font-semibold transition-colors"
            >
              github.com/{GITHUB_USERNAME}
              <ExternalLink size={12} />
            </a>

            <div className="flex items-center gap-2">
              <span>Sedikit</span>
              <div className="flex gap-[3px]">
                <div className="w-[10px] h-[10px] rounded-[2px] bg-white/[0.03] border border-white/5" />
                <div className="w-[10px] h-[10px] rounded-[2px] bg-[#4c1d95]" />
                <div className="w-[10px] h-[10px] rounded-[2px] bg-[#6d28d9]" />
                <div className="w-[10px] h-[10px] rounded-[2px] bg-[#7c3aed]" />
                <div className="w-[10px] h-[10px] rounded-[2px] bg-[#a855f7]" />
              </div>
              <span>Banyak</span>
            </div>
          </div>
        </motion.div>

        {/* STATS CARDS (GLASSMORPHISM MATCHING WEBSITE THEME) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="grid md:grid-cols-2 gap-6 mb-10"
        >
          {/* Card 1: Account Overview */}
          <div
            className="rounded-2xl p-6 border border-white/[0.05] hover:border-[#7c3aed]/30 transition-all duration-300 backdrop-blur-md flex flex-col justify-between"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            <div>
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/[0.04]">
                <div className="flex items-center gap-2 text-[#a855f7]">
                  <Code size={18} />
                  <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
                    Statistik Akun GitHub
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-[#7c3aed]">@{GITHUB_USERNAME}</span>
              </div>

              {loadingStats ? (
                <div className="py-8 flex items-center justify-center text-slate-500 text-xs font-mono gap-2">
                  <RefreshCw size={14} className="animate-spin text-[#a855f7]" />
                  Mengambil statistik GitHub API...
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div
                    className="p-4 rounded-xl border border-white/[0.04]"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                  >
                    <div className="flex items-center gap-2 text-[#a855f7] mb-1">
                      <BookOpen size={16} />
                      <span className="text-[10px] font-mono text-slate-400 uppercase">Repositories</span>
                    </div>
                    <p className="text-2xl font-black text-white">{profile?.public_repos || 35}</p>
                  </div>

                  <div
                    className="p-4 rounded-xl border border-white/[0.04]"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                  >
                    <div className="flex items-center gap-2 text-[#e3b341] mb-1">
                      <Star size={16} />
                      <span className="text-[10px] font-mono text-slate-400 uppercase">Stars Earned</span>
                    </div>
                    <p className="text-2xl font-black text-white">{totalStars}</p>
                  </div>

                  <div
                    className="p-4 rounded-xl border border-white/[0.04]"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                  >
                    <div className="flex items-center gap-2 text-[#c4b5fd] mb-1">
                      <Users size={16} />
                      <span className="text-[10px] font-mono text-slate-400 uppercase">Followers</span>
                    </div>
                    <p className="text-2xl font-black text-white">{profile?.followers || 8}</p>
                  </div>

                  <div
                    className="p-4 rounded-xl border border-white/[0.04]"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                  >
                    <div className="flex items-center gap-2 text-[#7c3aed] mb-1">
                      <GitFork size={16} />
                      <span className="text-[10px] font-mono text-slate-400 uppercase">Following</span>
                    </div>
                    <p className="text-2xl font-black text-white">{profile?.following || 6}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span>Aktif Sejak: 2022</span>
              <span>Official GitHub REST API</span>
            </div>
          </div>

          {/* Card 2: Top Languages Breakdown */}
          <div
            className="rounded-2xl p-6 border border-white/[0.05] hover:border-[#7c3aed]/30 transition-all duration-300 backdrop-blur-md flex flex-col justify-between"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            <div>
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/[0.04]">
                <div className="flex items-center gap-2 text-[#a855f7]">
                  <GitFork size={18} />
                  <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
                    Top Languages
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-[#7c3aed]">By Repositories</span>
              </div>

              {loadingStats ? (
                <div className="py-8 flex items-center justify-center text-slate-500 text-xs font-mono gap-2">
                  <RefreshCw size={14} className="animate-spin text-[#a855f7]" />
                  Mengalkulasi bahasa...
                </div>
              ) : (
                <div className="space-y-3.5">
                  {languages.map((lang) => (
                    <div key={lang.name}>
                      <div className="flex justify-between items-center text-xs mb-1.5 font-mono">
                        <span className="flex items-center gap-2 text-slate-200 font-semibold">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: lang.color }}
                          />
                          {lang.name}
                        </span>
                        <span className="text-slate-400 font-mono text-[11px]">
                          {lang.count} repo ({lang.percentage}%)
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden border border-white/[0.04]">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: "linear-gradient(90deg, #7c3aed, #a855f7)",
                          }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${lang.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span>Main Stack: PHP / Laravel / TS / HTML</span>
              <span>Updated Real-Time</span>
            </div>
          </div>
        </motion.div>

        {/* Bottom Profile CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center"
        >
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 py-3.5 px-8 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              boxShadow: "0 0 28px rgba(124,58,237,0.35)",
            }}
          >
            <GitCommit size={18} />
            Buka Profil GitHub @{GITHUB_USERNAME}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
