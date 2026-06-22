import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import { Code2 } from "lucide-react";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Portfolio />
      <Contact />
      
      <footer className="py-8 border-t border-[#7c3aed]/20 text-center flex flex-col items-center gap-3">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} Gagang. Dibuat dengan Next.js & Tailwind CSS.
        </p>
        <a 
          href="https://github.com/Ga2ng" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-slate-400 hover:text-[#a855f7] text-sm transition-colors flex items-center gap-1.5"
        >
          <Code2 size={16} /> GitHub: Ga2ng
        </a>
      </footer>
    </main>
  );
}
