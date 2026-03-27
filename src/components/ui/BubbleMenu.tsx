"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },

  { label: "Contact", href: "#contact" },
];

export default function BubbleMenu() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = navLinks.map(l => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i]);
          return;
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Entrance animation
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current,
        { marginTop: -30, opacity: 0 },
        { marginTop: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.5 }
      );
    }
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (mobileOpen) {
      gsap.fromTo(".mob-backdrop", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(".mob-link",
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: "power3.out", stagger: 0.06, delay: 0.1 }
      );
    }
  }, [mobileOpen]);

  const closeMobile = () => {
    gsap.to(".mob-link", { x: 30, opacity: 0, duration: 0.2, ease: "power3.in", stagger: 0.03 });
    gsap.to(".mob-backdrop", { autoAlpha: 0, duration: 0.25, ease: "power2.in", delay: 0.1, onComplete: () => setMobileOpen(false) });
  };

  return (
    <>
      <div className="fixed top-4 left-0 right-0 z-[100] flex justify-center pointer-events-none px-4 md:px-0">
      <nav
        ref={navRef}
        className="transition-all duration-500 opacity-0 pointer-events-auto w-full md:w-auto"
        style={{
          background: scrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: "9999px",
          border: scrolled ? "1px solid rgba(0,0,0,0.06)" : "1px solid rgba(255,255,255,0.1)",
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.08)" : "none",
          padding: "6px 6px 6px 20px",
        }}
      >
        <div className="flex items-center justify-between md:justify-start gap-1 w-full md:w-auto">
          {/* Logo */}
          <a href="#" className="heading text-lg mr-4" style={{ color: scrolled ? "#0A0A0A" : "#fff" }}>
            Ahmed<span style={{ color: "#4FFFB0" }}>.</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-300"
                  style={{
                    color: isActive
                      ? "#0A0A0A"
                      : scrolled ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.6)",
                    background: isActive ? "#4FFFB0" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = scrolled ? "#0A0A0A" : "#fff";
                      e.currentTarget.style.background = scrolled ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.1)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = scrolled ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.6)";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Language switch - desktop */}
          <a
            href="/ar"
            className="hidden md:inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full text-[12px] font-bold transition-all duration-200 hover:-translate-y-0.5 ml-1"
            style={{
              background: scrolled ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.08)",
              color: scrolled ? "#0A0A0A" : "#fff",
              border: scrolled ? "1px solid rgba(0,0,0,0.06)" : "1px solid rgba(255,255,255,0.1)",
            }}
            title="العربية"
          >
            <img src="/flags/sa.svg" alt="" width={18} height={18} style={{ borderRadius: "50%", flexShrink: 0 }} />
            AR
          </a>

          {/* CTA button - desktop */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center h-9 px-5 rounded-full text-[13px] font-bold transition-all duration-200 hover:-translate-y-0.5 ml-1"
            style={{
              background: "#4FFFB0",
              color: "#0A0A0A",
              border: "2px solid #0A0A0A",
              boxShadow: "3px 3px 0px 0px #0A0A0A",
            }}
          >
            Let's Talk
          </a>

          {/* Mobile burger */}
          <button
            onClick={() => mobileOpen ? closeMobile() : setMobileOpen(true)}
            className="md:hidden w-9 h-9 rounded-full flex flex-col items-center justify-center gap-[5px] cursor-pointer ml-2"
            style={{
              background: scrolled ? "#0A0A0A" : "rgba(255,255,255,0.15)",
              border: "none",
            }}
            aria-label="Menu"
          >
            <span className="block h-[2px] rounded-full transition-all duration-300" style={{ width: mobileOpen ? 18 : 18, background: scrolled ? "#4FFFB0" : "#fff", transform: mobileOpen ? "translateY(3.5px) rotate(45deg)" : "none" }} />
            <span className="block h-[2px] rounded-full transition-all duration-300" style={{ width: 12, background: scrolled ? "#4FFFB0" : "#fff", opacity: mobileOpen ? 0 : 1 }} />
            <span className="block h-[2px] rounded-full transition-all duration-300" style={{ width: mobileOpen ? 18 : 15, background: scrolled ? "#4FFFB0" : "#fff", transform: mobileOpen ? "translateY(-3.5px) rotate(-45deg)" : "none" }} />
          </button>
        </div>
      </nav>
      </div>

      {/* Mobile fullscreen menu */}
      {mobileOpen && (
        <>
          <div className="mob-backdrop fixed inset-0 z-[98]" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", opacity: 0 }} onClick={closeMobile} />
          <div className="fixed top-0 right-0 bottom-0 z-[99] w-[280px] flex flex-col justify-center px-8" style={{ background: "#0A0A0A" }}>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={closeMobile}
                  className="mob-link heading text-2xl py-3 transition-colors duration-200 hover:text-[#4FFFB0]"
                  style={{ color: "#fff", opacity: 0, borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={closeMobile}
                className="mob-link inline-flex items-center justify-center h-12 rounded-full text-base font-bold mt-4"
                style={{ background: "#4FFFB0", color: "#0A0A0A", opacity: 0, border: "2px solid #0A0A0A", boxShadow: "4px 4px 0px 0px #0A0A0A" }}
              >
                Let's Talk
              </a>
              <a
                href="/ar"
                className="mob-link inline-flex items-center justify-center gap-2 h-10 rounded-full text-sm font-bold mt-2"
                style={{ background: "rgba(255,255,255,0.08)", color: "#fff", opacity: 0, border: "1px solid rgba(255,255,255,0.15)" }}
              >
                <img src="/flags/sa.svg" alt="" width={20} height={20} style={{ borderRadius: "50%" }} />
                العربية
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}
