import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeBand from "@/components/MarqueeBand";
import AboutSection from "@/components/AboutSection";
import FallingTextSection from "@/components/FallingTextSection";
import Services from "@/components/Services";
import HowIWork from "@/components/HowIWork";
import Projects from "@/components/Projects";
import Stats from "@/components/Stats";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AskAhmed from "@/components/AskAhmed";

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <MarqueeBand />
        <AboutSection />
        <FallingTextSection />
        <Services />
        <HowIWork />
        <Projects />
        <Stats />
        <Experience />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <AskAhmed />
    </>
  );
}
