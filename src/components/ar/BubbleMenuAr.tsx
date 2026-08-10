"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { MINT, TEAL } from "../ui/brand";
import { Download } from "lucide-react";

/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages -- /ar and / are separate
   root layouts; crossing between them is a full page load either way. */

/* Arabic mirror of the English header: three floating capsules rather than one
   bar, same pod treatment, same entrance and the same mobile drawer. The only
   differences are the labels, the language it switches to, and the drawer
   sliding in from the left because the page reads right to left. */
const pod = (scrolled: boolean) =>
  ({
    background: scrolled ? "rgba(255,255,255,0.58)" : "#fff",
    backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
    WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
    border: scrolled ? "1px solid rgba(255,255,255,0.55)" : "1px solid rgba(4,50,58,0.07)",
    boxShadow: scrolled ? "0 8px 32px rgba(4,50,58,0.16)" : "0 4px 22px rgba(4,50,58,0.10)",
    borderRadius: 9999,
    transition: "background 0.4s, box-shadow 0.4s, backdrop-filter 0.4s, border-color 0.4s",
  }) as const;

const INK = "#04323A";

const navLinks = [
  { label: "عني", href: "#about" },
  { label: "الخدمات", href: "#services" },
  { label: "المشاريع", href: "#projects" },
  { label: "الخبرات", href: "#experience" },
  { label: "الشهادات", href: "#certifications" },
  { label: "تواصل", href: "#contact" },
];

export default function BubbleMenuAr() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map((l) => l.href.replace("#", ""));
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

  useEffect(() => {
    if (!navRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(navRef.current, { opacity: 1 });
      gsap.fromTo(
        ".hdr-pod-ar",
        { y: -26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.09, delay: 0.5 }
      );
    }, navRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      gsap.fromTo(".mob-backdrop-ar", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: "power2.out" });
      /* Links fly in from the left here, the side the drawer opens from. */
      gsap.fromTo(
        ".mob-link-ar",
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: "power3.out", stagger: 0.06, delay: 0.1 }
      );
    }
  }, [mobileOpen]);

  const closeMobile = () => {
    gsap.to(".mob-link-ar", { x: -30, opacity: 0, duration: 0.2, ease: "power3.in", stagger: 0.03 });
    gsap.to(".mob-backdrop-ar", {
      autoAlpha: 0,
      duration: 0.25,
      ease: "power2.in",
      delay: 0.1,
      onComplete: () => setMobileOpen(false),
    });
  };

  return (
    <>

      <style>{`
        @keyframes hdr-wave {
          0%, 60%, 100% { transform: rotate(0deg); }
          10% { transform: rotate(14deg); }
          20% { transform: rotate(-8deg); }
          30% { transform: rotate(14deg); }
          40% { transform: rotate(-4deg); }
          50% { transform: rotate(10deg); }
        }
        .hdr-wave { animation: hdr-wave 2.4s ease-in-out infinite; }
        .hdr-cta:hover .hdr-wave { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .hdr-wave { animation: none; } }
      `}</style>
      <div className="fixed top-5 left-0 right-0 z-[100] flex justify-center pointer-events-none px-4">
        <div
          ref={navRef}
          className="pointer-events-auto w-full lg:w-auto flex items-center gap-3 opacity-0"
          dir="rtl"
        >
          {/* ── pod 1 · wordmark ── */}
          <div
            className="hdr-pod-ar flex items-center justify-between lg:justify-start w-full lg:w-auto"
            style={{ ...pod(scrolled), padding: "13px 20px" }}
          >
            {/* The wordmark stays Latin in both builds — it is the mark. */}
            <a href="#" className="heading text-[22px] leading-none" style={{ color: INK, fontFamily: "'TAN Headline'" }}>
              Ahmed<span style={{ color: TEAL }}>.</span>
            </a>

            <button
              onClick={() => (mobileOpen ? closeMobile() : setMobileOpen(true))}
              className="lg:hidden w-10 h-10 rounded-full flex flex-col items-center justify-center gap-[5px] cursor-pointer me-4 -my-1"
              style={{ background: TEAL, border: "none" }}
              aria-label="القائمة"
            >
              <span
                className="block h-[2px] rounded-full transition-all duration-300"
                style={{ width: 18, background: MINT, transform: mobileOpen ? "translateY(3.5px) rotate(45deg)" : "none" }}
              />
              <span
                className="block h-[2px] rounded-full transition-all duration-300"
                style={{ width: 12, background: MINT, opacity: mobileOpen ? 0 : 1 }}
              />
              <span
                className="block h-[2px] rounded-full transition-all duration-300"
                style={{ width: mobileOpen ? 18 : 15, background: MINT, transform: mobileOpen ? "translateY(-3.5px) rotate(-45deg)" : "none" }}
              />
            </button>
          </div>

          {/* ── pod 2 · links ── */}
          <div
            className="hdr-pod-ar hidden lg:flex items-center gap-0.5"
            style={{ ...pod(scrolled), padding: "8px 10px" }}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="ar-body px-3.5 xl:px-5 py-2.5 rounded-full text-[14px] xl:text-[15px] transition-all duration-300 whitespace-nowrap"
                  style={{
                    color: isActive ? TEAL : "rgba(4,50,58,0.58)",
                    background: isActive ? MINT : "transparent",
                    fontWeight: isActive ? 700 : 500,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = INK;
                      e.currentTarget.style.background = MINT;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "rgba(4,50,58,0.58)";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* ── pod 3 · language + CTA ── */}
          <div
            className="hdr-pod-ar hidden lg:flex items-center gap-2"
            style={{ ...pod(scrolled), padding: "8px" }}
          >
            <a
              href="/"
              className="inline-flex items-center gap-2 h-11 px-4 rounded-full text-[14px] font-bold transition-transform duration-200 hover:-translate-y-0.5"
              style={{
                background: "rgba(4,50,58,0.05)",
                color: INK,
                border: "1px solid rgba(4,50,58,0.06)",
              }}
              title="English"
            >
              <img src="/flags/gb.svg" alt="" width={20} height={20} style={{ borderRadius: "50%", flexShrink: 0 }} />
              EN
            </a>

            {/* Secondary to "لنتحدث": outlined, no hard shadow, and the label
                collapses below xl so the three pods still fit a 1024px laptop. */}
            <a
              href="/Ahmed-Ali-CV.pdf"
              download
              className="ar-body inline-flex items-center gap-2 h-11 px-4 rounded-full text-[14px] font-bold transition-transform duration-200 hover:-translate-y-0.5"
              style={{ background: "#fff", color: TEAL, border: `2px solid ${TEAL}` }}
              title="تحميل السيرة الذاتية"
            >
              <Download size={15} />
              <span className="hidden xl:inline">السيرة الذاتية</span>
              <span className="xl:hidden">CV</span>
            </a>

            <a
              href="#contact"
              className="hdr-cta ar-body inline-flex items-center gap-2 h-11 px-6 rounded-full text-[15px] font-bold transition-transform duration-200 hover:-translate-y-0.5"
              style={{ background: MINT, color: TEAL, border: `2px solid ${TEAL}`, boxShadow: `3px 3px 0px 0px ${TEAL}` }}
            >
              {/* the wave rests on hover — a hand waving forever in the corner
                  of every screen is a distraction, not a greeting */}
              <span className="hdr-wave inline-block" aria-hidden style={{ transformOrigin: "70% 80%" }}>👋</span>
              لنتحدث
            </a>
          </div>
        </div>
      </div>

      {/* Mobile drawer — opens from the left, the near edge in RTL */}
      {mobileOpen && (
        <>
          <div
            className="mob-backdrop-ar fixed inset-0 z-[98]"
            style={{ background: "rgba(4,50,58,0.6)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", opacity: 0 }}
            onClick={closeMobile}
          />
          <div className="fixed top-0 left-0 bottom-0 z-[99] w-[280px] flex flex-col justify-center px-8" style={{ background: INK }} dir="rtl">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={closeMobile}
                  className="mob-link-ar ar-heading text-2xl py-3 transition-colors duration-200 hover:text-[#CFF7EE]"
                  style={{ color: "#fff", opacity: 0, borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={closeMobile}
                className="mob-link-ar ar-body inline-flex items-center justify-center h-12 rounded-full text-base font-bold mt-4"
                style={{ background: MINT, color: INK, opacity: 0, border: `2px solid ${INK}`, boxShadow: `4px 4px 0px 0px ${INK}` }}
              >
                لنتحدث
              </a>
              {/* pod 3 is desktop-only, so the CV needs its own place here */}
              <a
                href="/Ahmed-Ali-CV.pdf"
                download
                onClick={closeMobile}
                className="mob-link-ar ar-body inline-flex items-center justify-center gap-2 h-11 rounded-full text-sm font-bold mt-2"
                style={{ background: "transparent", color: MINT, opacity: 0, border: `2px solid ${MINT}` }}
              >
                <Download size={15} />
                السيرة الذاتية
              </a>
              <a
                href="/"
                className="mob-link-ar inline-flex items-center justify-center gap-2 h-10 rounded-full text-sm font-bold mt-2"
                style={{ background: "rgba(255,255,255,0.08)", color: "#fff", opacity: 0, border: "1px solid rgba(255,255,255,0.15)" }}
              >
                <img src="/flags/gb.svg" alt="" width={20} height={20} style={{ borderRadius: "50%" }} />
                English
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}
