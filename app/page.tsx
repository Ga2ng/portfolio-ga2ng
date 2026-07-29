import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
// import GitHubContributions from "@/components/GitHubContributions";
import Contact from "@/components/Contact";
import { Code2 } from "lucide-react";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Portfolio />
      {/* <GitHubContributions /> */}
      <Contact />
      
      <footer className="relative border-t border-white/[0.05] overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#7c3aed]/[0.07] blur-[80px] pointer-events-none rounded-full" />

        <div className="container mx-auto max-w-6xl px-6 pt-14 pb-8 relative">
          {/* Big editorial name */}
          <div className="mb-10 flex flex-col items-center text-center">
            <span
              className="text-[clamp(3.5rem,10vw,7rem)] font-black leading-none tracking-tighter select-none bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(168,85,247,0.25) 100%)", WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
            >
              GA2NG
            </span>
            <p className="text-slate-600 text-xs font-mono tracking-[0.25em] uppercase mt-2">
              Ahmad Gagang Prakasa — Surabaya, JTM
            </p>
          </div>

          {/* Social + availability row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
            {/* Left: availability */}
            <span className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-[#a855f7]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7] animate-pulse" />
              Available for Work
            </span>

            {/* Center: social icons */}
            <div className="flex items-center gap-3">
              {[
                {
                  label: "GitHub",
                  href: "https://github.com/Ga2ng",
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                  ),
                },
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/ahmad-gagang-prakasa-a32948285",
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  ),
                },
                {
                  label: "Email",
                  href: "mailto:gagangprakasa@gmail.com",
                  icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  ),
                },
                {
                  label: "WhatsApp",
                  href: "https://wa.me/6281390382131",
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={s.label}
                  className="flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-[#a855f7] border border-white/[0.05] hover:border-[#7c3aed]/30 transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Right: copyright */}
            <p className="text-slate-600 text-xs font-mono">
              © {new Date().getFullYear()} GA2NG
            </p>
          </div>

          {/* Bottom thin divider + tagline */}
          <div className="border-t border-white/[0.04] pt-5 flex items-center justify-center">
            <p className="text-[10px] font-mono text-slate-700 tracking-[0.2em] uppercase">
              Built with Next.js · Tailwind CSS · Framer Motion
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
