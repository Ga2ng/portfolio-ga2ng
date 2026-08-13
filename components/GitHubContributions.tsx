"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { GitCommit, GitFork, Star, ExternalLink, RefreshCw, BookOpen, Users, Code, Calendar } from "lucide-react";

function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-12">
      <span 
        className="px-5 py-2.5 border-3 border-[#0f0e14] bg-[#ffffff] text-[#0f0e14] font-black rounded-xl shadow-[4px_4px_0_#0f0e14] rotate-[-2deg] inline-flex items-center gap-2.5 text-sm uppercase tracking-wider transition-transform hover:rotate-0 duration-200"
        style={{ fontFamily: "var(--font-nunito)" }}
      >
        <span
          className="text-base font-black opacity-60"
          style={{ fontFamily: "var(--font-bangers)", letterSpacing: "0.06em" }}
        >
          {num}
        </span>
        {label}
      </span>
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
            color: LANG_COLORS[name] || "#0f0e14",
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

  // Grayscale levels for calendar grid
  const getPurpleColor = (level: number) => {
    switch (level) {
      case 0:
        return "rgba(15, 14, 20, 0.05)";
      case 1:
        return "rgba(15, 14, 20, 0.25)";
      case 2:
        return "rgba(15, 14, 20, 0.5)";
      case 3:
        return "rgba(15, 14, 20, 0.75)";
      case 4:
      default:
        return "#0f0e14";
    }
  };

  // Month labels calculation
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
    <section id="github" className="relative py-28 px-6 overflow-hidden" style={{ background: "#f5f0e8" }}>
      {/* Halftone grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none halftone-bg opacity-30"
        style={{
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
        }}
      />

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
            <h2
              className="text-4xl md:text-5xl font-black tracking-tight leading-[1.05]"
              style={{ fontFamily: "var(--font-fredoka, 'Fredoka One', cursive)", color: "#0f0e14" }}
            >
              Aktivitas Kontribusi<br />
              <span style={{ color: "#0f0e14" }}>GitHub @{GITHUB_USERNAME}</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="comic-badge" style={{ fontFamily: "var(--font-nunito)", background: "#ffffff" }}>
              <span className="w-2 h-2 rounded-full bg-[#0f0e14] animate-pulse mr-1 inline-block" />
              Direct GitHub.com Scraping
            </span>
            <button
              onClick={() => {
                fetchGraphData(selectedYear);
                fetchGitHubStats();
              }}
              className="p-2.5 rounded-lg transition-all cursor-pointer"
              style={{
                background: "#ffffff",
                border: "2px solid #0f0e14",
                boxShadow: "3px 3px 0 #0f0e14",
                color: "#0f0e14",
              }}
              title="Refresh Data"
            >
              <RefreshCw size={14} className={loadingGraph || loadingStats ? "animate-spin" : ""} />
            </button>
          </div>
        </motion.div>

        {/* MAIN CONTRIBUTION GRAPH CARD */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="relative rounded-2xl p-6 md:p-8 mb-8 overflow-hidden comic-card"
            style={{
              background: "#ffffff",
              border: "2.5px solid #0f0e14",
              boxShadow: "8px 8px 0 #0f0e14",
            }}
          >
            {/* Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4" style={{ borderBottom: "1.5px solid rgba(15,14,20,0.1)" }}>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center border-2 border-[#0f0e14]"
                  style={{ background: "#f5f0e8", color: "#0f0e14" }}
                >
                  <GitCommit size={18} />
                </div>
                <div>
                  <h3
                    className="text-sm font-black tracking-wide"
                    style={{ fontFamily: "var(--font-fredoka)", color: "#0f0e14" }}
                  >
                    {totalContributions !== null
                      ? `${totalContributions} Kontribusi`
                      : "Memuat kontribusi..."}
                  </h3>
                  <p
                    className="text-[11px] font-bold"
                    style={{ fontFamily: "var(--font-nunito)", color: "rgba(15,14,20,0.5)" }}
                  >
                    tahun {selectedYear} di GitHub
                  </p>
                </div>
              </div>

              {/* Year Selector Tabs */}
              <div
                className="flex items-center gap-1.5 p-1 rounded-xl flex-wrap"
                style={{ background: "#f5f0e8", border: "2px solid #0f0e14" }}
              >
                <span
                  className="text-[10px] font-bold px-2 flex items-center gap-1"
                  style={{ fontFamily: "var(--font-nunito)", color: "#0f0e14" }}
                >
                  <Calendar size={12} /> Tahun:
                </span>
                {YEARS.map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setSelectedYear(yr)}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                      selectedYear === yr
                        ? "bg-[#0f0e14] text-[#f5f0e8] scale-105"
                        : "text-[#0f0e14] hover:bg-black/10"
                    }`}
                    style={{ fontFamily: "var(--font-nunito)" }}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            </div>

            {/* Hover Tooltip display */}
            <div className="h-7 flex items-center text-xs mb-3">
              {hoveredDay ? (
                <span
                  className="px-3 py-1.5 rounded-lg font-bold"
                  style={{
                    background: "#0f0e14",
                    color: "#f5f0e8",
                    border: "2px solid #0f0e14",
                    fontFamily: "var(--font-nunito)",
                  }}
                >
                  {hoveredDay.count > 0 ? `${hoveredDay.count} kontribusi` : "Tidak ada kontribusi"} pada {hoveredDay.date}
                </span>
              ) : (
                <span
                  className="text-[11px] font-semibold"
                  style={{ fontFamily: "var(--font-space)", color: "rgba(15,14,20,0.45)" }}
                >
                  Arahkan kursor ke kotak warna untuk melihat detail per hari
                </span>
              )}
            </div>

            {/* ACCURATE SVG VECTOR GRID */}
            {loadingGraph ? (
              <div
                className="h-36 flex items-center justify-center text-xs gap-2 font-bold"
                style={{ fontFamily: "var(--font-space)", color: "rgba(15,14,20,0.5)" }}
              >
                <RefreshCw size={16} className="animate-spin" />
                Mengambil data kontribusi resmi tahun {selectedYear}...
              </div>
            ) : weeks.length > 0 ? (
              <div className="overflow-x-auto pb-3 pt-1 scrollbar-thin">
                <svg
                  width={svgWidth}
                  height={svgHeight}
                  className="select-none overflow-visible w-full min-w-[760px]"
                >
                  {/* Month labels */}
                  <g className="text-[10px] font-bold" style={{ fontFamily: "var(--font-nunito)", fill: "#0f0e14" }}>
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

                  {/* Day labels */}
                  <g className="text-[9px] font-bold" style={{ fontFamily: "var(--font-nunito)", fill: "rgba(15,14,20,0.5)" }}>
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
                            stroke="#0f0e14"
                            strokeWidth={day.level > 0 ? 1 : 0.5}
                            className="transition-all duration-150 cursor-pointer hover:scale-125"
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
              <div
                className="text-center py-10 text-xs font-semibold"
                style={{ fontFamily: "var(--font-space)", color: "rgba(15,14,20,0.5)" }}
              >
                Tidak ada data kontribusi untuk tahun {selectedYear}
              </div>
            )}

            {/* Footer Bar */}
            <div
              className="mt-6 pt-4 flex items-center justify-between text-[11px]"
              style={{ borderTop: "1.5px solid rgba(15,14,20,0.1)", fontFamily: "var(--font-space)", color: "#0f0e14" }}
            >
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline flex items-center gap-1 font-black transition-colors"
              >
                github.com/{GITHUB_USERNAME}
                <ExternalLink size={12} />
              </a>

              <div className="flex items-center gap-2">
                <span>Sedikit</span>
                <div className="flex gap-[3px]">
                  <div className="w-[10.5px] h-[10.5px] rounded-[2px] border border-[#0f0e14]" style={{ background: "rgba(15, 14, 20, 0.05)" }} />
                  <div className="w-[10.5px] h-[10.5px] rounded-[2px] border border-[#0f0e14]" style={{ background: "rgba(15, 14, 20, 0.25)" }} />
                  <div className="w-[10.5px] h-[10.5px] rounded-[2px] border border-[#0f0e14]" style={{ background: "rgba(15, 14, 20, 0.5)" }} />
                  <div className="w-[10.5px] h-[10.5px] rounded-[2px] border border-[#0f0e14]" style={{ background: "rgba(15, 14, 20, 0.75)" }} />
                  <div className="w-[10.5px] h-[10.5px] rounded-[2px] border border-[#0f0e14]" style={{ background: "#0f0e14" }} />
                </div>
                <span>Banyak</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* STATS CARDS */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="grid md:grid-cols-2 gap-6 mb-10"
        >
          {/* Card 1: Account Overview */}
          <div className="comic-card p-6 flex flex-col justify-between" style={{ background: "#ffffff" }}>
            <div>
              <div className="flex items-center justify-between mb-6 pb-3" style={{ borderBottom: "1.5px solid rgba(15,14,20,0.1)" }}>
                <div className="flex items-center gap-2" style={{ color: "#0f0e14" }}>
                  <Code size={18} />
                  <h3
                    className="text-sm font-black uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-fredoka)" }}
                  >
                    Statistik Akun GitHub
                  </h3>
                </div>
                <span
                  className="text-[11px] font-bold"
                  style={{ fontFamily: "var(--font-nunito)", color: "rgba(15,14,20,0.5)" }}
                >
                  @{GITHUB_USERNAME}
                </span>
              </div>

              {loadingStats ? (
                <div
                  className="py-8 flex items-center justify-center text-xs gap-2 font-bold"
                  style={{ fontFamily: "var(--font-space)", color: "rgba(15,14,20,0.5)" }}
                >
                  <RefreshCw size={14} className="animate-spin" />
                  Mengambil statistik GitHub API...
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div
                    className="p-4 rounded-xl"
                    style={{ background: "#f5f0e8", border: "2px solid #0f0e14" }}
                  >
                    <div className="flex items-center gap-2 mb-1" style={{ color: "#0f0e14" }}>
                      <BookOpen size={16} />
                      <span
                        className="text-[10px] font-bold uppercase"
                        style={{ fontFamily: "var(--font-nunito)", opacity: 0.7 }}
                      >
                        Repositories
                      </span>
                    </div>
                    <p
                      className="text-2xl font-black"
                      style={{ fontFamily: "var(--font-fredoka)", color: "#0f0e14" }}
                    >
                      {profile?.public_repos || 35}
                    </p>
                  </div>

                  <div
                    className="p-4 rounded-xl"
                    style={{ background: "#f5f0e8", border: "2px solid #0f0e14" }}
                  >
                    <div className="flex items-center gap-2 mb-1" style={{ color: "#0f0e14" }}>
                      <Star size={16} />
                      <span
                        className="text-[10px] font-bold uppercase"
                        style={{ fontFamily: "var(--font-nunito)", opacity: 0.7 }}
                      >
                        Stars Earned
                      </span>
                    </div>
                    <p
                      className="text-2xl font-black"
                      style={{ fontFamily: "var(--font-fredoka)", color: "#0f0e14" }}
                    >
                      {totalStars}
                    </p>
                  </div>

                  <div
                    className="p-4 rounded-xl"
                    style={{ background: "#f5f0e8", border: "2px solid #0f0e14" }}
                  >
                    <div className="flex items-center gap-2 mb-1" style={{ color: "#0f0e14" }}>
                      <Users size={16} />
                      <span
                        className="text-[10px] font-bold uppercase"
                        style={{ fontFamily: "var(--font-nunito)", opacity: 0.7 }}
                      >
                        Followers
                      </span>
                    </div>
                    <p
                      className="text-2xl font-black"
                      style={{ fontFamily: "var(--font-fredoka)", color: "#0f0e14" }}
                    >
                      {profile?.followers || 8}
                    </p>
                  </div>

                  <div
                    className="p-4 rounded-xl"
                    style={{ background: "#f5f0e8", border: "2px solid #0f0e14" }}
                  >
                    <div className="flex items-center gap-2 mb-1" style={{ color: "#0f0e14" }}>
                      <GitFork size={16} />
                      <span
                        className="text-[10px] font-bold uppercase"
                        style={{ fontFamily: "var(--font-nunito)", opacity: 0.7 }}
                      >
                        Following
                      </span>
                    </div>
                    <p
                      className="text-2xl font-black"
                      style={{ fontFamily: "var(--font-fredoka)", color: "#0f0e14" }}
                    >
                      {profile?.following || 6}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div
              className="mt-6 pt-3 flex items-center justify-between text-[10px] font-bold"
              style={{
                borderTop: "1.5px solid rgba(15,14,20,0.1)",
                fontFamily: "var(--font-space)",
                color: "rgba(15,14,20,0.5)",
              }}
            >
              <span>Aktif Sejak: 2022</span>
              <span>Official GitHub REST API</span>
            </div>
          </div>

          {/* Card 2: Top Languages Breakdown */}
          <div className="comic-card p-6 flex flex-col justify-between" style={{ background: "#ffffff" }}>
            <div>
              <div className="flex items-center justify-between mb-6 pb-3" style={{ borderBottom: "1.5px solid rgba(15,14,20,0.1)" }}>
                <div className="flex items-center gap-2" style={{ color: "#0f0e14" }}>
                  <GitFork size={18} />
                  <h3
                    className="text-sm font-black uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-fredoka)" }}
                  >
                    Top Languages
                  </h3>
                </div>
                <span
                  className="text-[11px] font-bold"
                  style={{ fontFamily: "var(--font-nunito)", color: "rgba(15,14,20,0.5)" }}
                >
                  By Repositories
                </span>
              </div>

              {loadingStats ? (
                <div
                  className="py-8 flex items-center justify-center text-xs gap-2 font-bold"
                  style={{ fontFamily: "var(--font-space)", color: "rgba(15,14,20,0.5)" }}
                >
                  <RefreshCw size={14} className="animate-spin" />
                  Mengalkulasi bahasa...
                </div>
              ) : (
                <div className="space-y-3.5">
                  {languages.map((lang) => (
                    <div key={lang.name}>
                      <div
                        className="flex justify-between items-center text-xs mb-1.5 font-bold"
                        style={{ fontFamily: "var(--font-nunito)", color: "#0f0e14" }}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full border"
                            style={{ backgroundColor: lang.color, borderColor: "#0f0e14" }}
                          />
                          {lang.name}
                        </span>
                        <span style={{ opacity: 0.6 }}>
                          {lang.count} repo ({lang.percentage}%)
                        </span>
                      </div>
                      {/* Comic-style language progress bar */}
                      <div
                        className="h-2 w-full rounded overflow-hidden"
                        style={{ background: "#f5f0e8", border: "1.5px solid #0f0e14" }}
                      >
                        <motion.div
                          className="h-full rounded"
                          style={{ background: "#0f0e14" }}
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

            <div
              className="mt-6 pt-3 flex items-center justify-between text-[10px] font-bold"
              style={{
                borderTop: "1.5px solid rgba(15,14,20,0.1)",
                fontFamily: "var(--font-space)",
                color: "rgba(15,14,20,0.5)",
              }}
            >
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
            className="comic-btn inline-flex items-center gap-2.5 py-3.5 px-8 text-sm"
            style={{
              fontFamily: "var(--font-nunito)",
              background: "#0f0e14",
              color: "#f5f0e8",
              border: "2.5px solid #0f0e14",
              boxShadow: "5px 5px 0 #0f0e14",
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
