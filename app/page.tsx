import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
// import GitHubContributions from "@/components/GitHubContributions";
import Contact from "@/components/Contact";

function SectionDivider({ icon = "✖ ✖ ✖", rotate = -2 }: { icon?: string; rotate?: number }) {
  return (
    <div className="relative w-full py-6 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-x-0 h-[3.5px] bg-[#0f0e14]" />
      <div
        className="relative z-10 px-4 py-1.5 bg-[#ffffff] border-2.5 border-[#0f0e14] text-[10px] text-[#0f0e14] font-black shadow-[3px_3px_0_#0f0e14] select-none tracking-widest"
        style={{ fontFamily: "var(--font-nunito)", transform: `rotate(${rotate}deg)` }}
      >
        {icon}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative">
      {/* Notebook Binder Spiral Rings overlay on the left edge (desktop only) */}
      <div className="fixed left-6 top-0 bottom-0 w-8 z-50 pointer-events-none flex flex-col justify-around py-16 hidden lg:flex">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="w-5 h-5 rounded-full border-2.5 border-[#0f0e14] bg-[#f5f0e8] shadow-[2px_2px_0_#0f0e14] relative flex items-center justify-center"
          >
            {/* Inner ring hole */}
            <div className="w-2.5 h-2.5 rounded-full bg-[#0f0e14]/15" />
            {/* Metal spiral rings linking leftwards */}
            <div
              className="absolute right-full top-1/2 -translate-y-1/2 w-7 h-2.5 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-400 border-2 border-[#0f0e14] rounded-full"
              style={{ transform: "rotate(-12deg)", transformOrigin: "right" }}
            />
          </div>
        ))}
      </div>

      {/* Background graffiti markings / doodles at global level */}
      <div className="absolute inset-x-0 top-96 h-[300vh] pointer-events-none overflow-hidden opacity-5 select-none z-0">
        <span className="absolute left-10 top-20 text-[10rem] font-black" style={{ fontFamily: "var(--font-bangers)" }}>SURABAYA</span>
        <span className="absolute right-10 top-96 text-[15rem] font-black" style={{ fontFamily: "var(--font-bangers)" }}>G2</span>
        <span className="absolute left-20 top-[180vh] text-[8rem] font-black" style={{ fontFamily: "var(--font-fredoka)" }}>HELL YEAH</span>
      </div>

      <Navbar />
      <Hero />
      <SectionDivider icon="✦ TENTANG SAYA ✦" rotate={-2} />
      <About />
      <SectionDivider icon="✦ KARYA TERPILIH ✦" rotate={1.5} />
      <Portfolio />
      {/* <GitHubContributions /> */}
      <SectionDivider icon="✦ HUBUNGI SAYA ✦" rotate={-1.8} />
      <Contact />
      <SectionDivider icon="✦ FIN ✦" rotate={2.5} />

      <footer className="relative overflow-hidden">
        {/* Halftone pattern */}
        <div
          className="absolute inset-0 pointer-events-none halftone-bg opacity-30"
          style={{
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 100%, black, transparent)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 100%, black, transparent)",
          }}
        />

        {/* Stickman doodles background - blends with grid paper */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: "url('/bg-stickman.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "multiply",
          }}
        />

        <div className="container mx-auto max-w-6xl px-6 pt-10 pb-8 relative">
          {/* Big editorial name + Center-aligned social icons */}
          <div className="mb-10 flex flex-col items-center text-center">
            <span
              className="text-[clamp(3.5rem,10vw,7rem)] leading-none select-none"
              style={{
                fontFamily: "var(--font-bangers, 'Bangers', cursive)",
                letterSpacing: "0.06em",
                color: "#0f0e14",
              }}
            >
              GA2NG
            </span>
            <p
              className="text-xs uppercase mt-2 font-bold tracking-[0.25em]"
              style={{ fontFamily: "var(--font-nunito)", color: "#0f0e14" }}
            >
              Ahmad Gagang Prakasa — Surabaya, JTM
            </p>

            {/* Center: social icons aligned directly under GA2NG */}
            <div className="flex items-center gap-3 mt-5">
              {[
                {
                  label: "GitHub",
                  href: "https://github.com/Ga2ng",
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  ),
                },
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/ahmad-gagang-prakasa-a32948285",
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  ),
                },
                {
                  label: "Email",
                  href: "mailto:gagangprakasa@gmail.com",
                  icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  ),
                },
                {
                  label: "WhatsApp",
                  href: "https://wa.me/6281390382131",
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
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
                  className="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-150 hover:scale-105"
                  style={{
                    background: "#ffffff",
                    color: "#0f0e14",
                    border: "2px solid #0f0e14",
                    boxShadow: "3px 3px 0 #0f0e14",
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Social + availability row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
            {/* Left: availability */}
            <span className="comic-badge" style={{ fontFamily: "var(--font-nunito)", background: "#ffffff" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0f0e14] animate-pulse inline-block mr-1" />
              Available for Work
            </span>

            {/* Right: copyright */}
            <p
              className="text-xs font-bold"
              style={{ fontFamily: "var(--font-space)", color: "#0f0e14" }}
            >
              © {new Date().getFullYear()} GA2NG
            </p>
          </div>

          {/* Bottom thin divider + tagline */}
          <div className="pt-5 flex items-center justify-center" style={{ borderTop: "1.5px solid rgba(15,14,20,0.1)" }}>
            <p
              className="text-[10px] font-bold tracking-[0.2em] uppercase"
              style={{ fontFamily: "var(--font-nunito)", color: "#0f0e14" }}
            >
              Built with Next.js · Tailwind CSS · Framer Motion
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
