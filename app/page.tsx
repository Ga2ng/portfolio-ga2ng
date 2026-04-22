import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Portfolio />
      <Contact />
      
      <footer className="py-8 border-t border-[#7c3aed]/20 text-center">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} Gagang. Dibuat dengan Next.js & Tailwind CSS.
        </p>
      </footer>
    </main>
  );
}
