import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Skills from "@/components/skills/Skills";
import Projects from "@/components/projects/Projects";
import Experience from "@/components/experience/Experience";
import Certifications from "@/components/certifications/Certifications";
import CodingProfiles from "@/components/codingProfiles/CodingProfiles";
import Contact from "@/components/contact/Contact";

export default function Home() {
  return (
    <main className="relative z-10 w-full flex flex-col items-center overflow-x-hidden">
      <div className="w-full">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <CodingProfiles />
        <Contact />
      </div>
    </main>
  );
}
