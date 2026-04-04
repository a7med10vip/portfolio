"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, Calendar, ArrowRight, ExternalLink, Share2, Link2, MessageCircle, ChevronUp, type LucideIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const G = "#4FFFB0";
const D = "#0A0A0A";

export interface TOCItem {
  id: string;
  title: string;
}

interface BlogPostProps {
  title: string;
  description: string;
  category: string;
  categoryColor?: string;
  date: string;
  readingTime: string;
  heroIcon: LucideIcon;
  heroGradient: string;
  toc: TOCItem[];
  lang?: "en" | "ar";
  children: React.ReactNode;
}

export default function BlogPost({
  title, description, category, categoryColor = G, date, readingTime,
  heroIcon: HeroIcon, heroGradient, toc, lang = "en", children,
}: BlogPostProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("");
  const [showTop, setShowTop] = useState(false);
  const isAr = lang === "ar";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".bp-hero", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out", delay: 0.2 });
    }, ref);

    // Track active section for TOC
    const observers: IntersectionObserver[] = [];
    toc.forEach((item) => {
      const el = document.getElementById(item.id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(item.id); },
        { rootMargin: "-20% 0px -70% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    // Show scroll-to-top
    const handleScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);

    return () => {
      ctx.revert();
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("scroll", handleScroll);
    };
  }, [toc]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div ref={ref} style={{ background: "#fff", color: D, direction: isAr ? "rtl" : "ltr" }}>

      {/* Hero */}
      <div style={{ paddingTop: 120, paddingBottom: 0, background: "#fff" }}>
        <div className="max-w-4xl mx-auto px-6">
          {/* Category + meta */}
          <div className="bp-hero opacity-0 flex flex-wrap items-center gap-3 mb-6">
            <span className="px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase" style={{ background: `${categoryColor}15`, color: categoryColor }}>{category}</span>
            <span className="flex items-center gap-1.5 text-[12px]" style={{ color: "rgba(0,0,0,0.35)" }}>
              <Calendar size={13} /> {date}
            </span>
            <span className="flex items-center gap-1.5 text-[12px]" style={{ color: "rgba(0,0,0,0.35)" }}>
              <Clock size={13} /> {readingTime}
            </span>
          </div>

          {/* Title */}
          <h1 className={`bp-hero opacity-0 ${isAr ? "ar-heading" : "heading"} text-3xl sm:text-4xl md:text-5xl mb-6`} style={{ lineHeight: 1.25 }}>
            {title}
          </h1>

          {/* Description */}
          <p className={`bp-hero opacity-0 text-base md:text-lg mb-8 max-w-2xl ${isAr ? "ar-body" : ""}`} style={{ color: "rgba(0,0,0,0.5)", lineHeight: 1.8 }}>
            {description}
          </p>

          {/* Author */}
          <div className="bp-hero opacity-0 flex items-center gap-4 mb-10 pb-10" style={{ borderBottom: "1px solid #F0F0F0" }}>
            <img src="/ahmed.jpeg" alt="Ahmed Ali" className="w-12 h-12 rounded-full object-cover" style={{ border: `2px solid ${G}` }} />
            <div>
              <p className="text-[14px] font-bold">Ahmed Ali</p>
              <p className="text-[11px]" style={{ color: "rgba(0,0,0,0.4)" }}>Full-Stack Digital Strategist</p>
            </div>
            <div className={`flex items-center gap-2 ${isAr ? "mr-auto" : "ml-auto"}`}>
              <button onClick={copyLink} className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-colors hover:bg-gray-100" style={{ background: "#F5F5F5", border: "none" }} title="Copy link">
                <Link2 size={15} color="rgba(0,0,0,0.4)" />
              </button>
              <a href={`https://wa.me/?text=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`} target="_blank" rel="noopener" className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100" style={{ background: "#F5F5F5" }} title="Share on WhatsApp">
                <Share2 size={15} color="rgba(0,0,0,0.4)" />
              </a>
            </div>
          </div>
        </div>

        {/* Hero visual */}
        <div className="bp-hero opacity-0 max-w-4xl mx-auto px-6 mb-12">
          <div className="rounded-[24px] overflow-hidden flex items-center justify-center" style={{ background: heroGradient, height: 320 }}>
            <HeroIcon size={80} color="rgba(255,255,255,0.25)" strokeWidth={1} />
          </div>
        </div>
      </div>

      {/* Content area with TOC */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="flex gap-12">

          {/* TOC — desktop only */}
          <aside className="hidden lg:block w-[220px] flex-shrink-0">
            <div className="sticky top-32">
              <p className={`text-[10px] font-bold tracking-[2px] uppercase mb-4 ${isAr ? "ar-body" : ""}`} style={{ color: "rgba(0,0,0,0.3)" }}>
                {isAr ? "المحتويات" : "Contents"}
              </p>
              <nav className="flex flex-col gap-1">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`text-[12px] py-1.5 px-3 rounded-lg transition-all duration-200 no-underline ${isAr ? "ar-body" : ""}`}
                    style={{
                      color: activeSection === item.id ? D : "rgba(0,0,0,0.4)",
                      background: activeSection === item.id ? `${G}12` : "transparent",
                      fontWeight: activeSection === item.id ? 700 : 400,
                      borderRight: isAr ? "none" : undefined,
                      borderLeft: isAr ? (activeSection === item.id ? `3px solid ${G}` : "3px solid transparent") : undefined,
                      [isAr ? "borderLeft" : "borderRight"]: "none",
                      [`border${isAr ? "Right" : "Left"}`]: activeSection === item.id ? `3px solid ${G}` : "3px solid transparent",
                    }}
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Article content */}
          <article className="flex-1 min-w-0">
            <div className={`prose-custom ${isAr ? "ar-body" : ""}`}>
              {children}
            </div>

            {/* Author card bottom */}
            <div className="mt-16 rounded-[20px] p-8 flex flex-col md:flex-row items-center gap-6" style={{ background: "#FAFAFA", border: "1px solid #EBEBEB" }}>
              <img src="/ahmed.jpeg" alt="Ahmed Ali" className="w-20 h-20 rounded-full object-cover flex-shrink-0" style={{ border: `3px solid ${G}` }} />
              <div className={isAr ? "text-right" : ""}>
                <p className={`text-lg font-bold mb-1 ${isAr ? "ar-heading" : "heading"}`}>Ahmed Ali</p>
                <p className="text-[12px] mb-3" style={{ color: G }}>Full-Stack Digital Strategist</p>
                <p className={`text-[13px] leading-relaxed ${isAr ? "ar-body" : ""}`} style={{ color: "rgba(0,0,0,0.5)" }}>
                  {isAr
                    ? "خبرة +5 سنوات في التسويق الرقمي وتطوير المنتجات عبر مصر والسعودية والإمارات وقطر."
                    : "5+ years building digital products across Egypt, Saudi Arabia, UAE & Qatar."}
                </p>
              </div>
              <a href="https://wa.me/201011648156" target="_blank" rel="noopener" className={`flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold ${isAr ? "mr-auto" : "ml-auto"}`} style={{ background: G, color: D, border: `2px solid ${D}`, boxShadow: `3px 3px 0px 0px ${D}`, textDecoration: "none" }}>
                <MessageCircle size={16} /> {isAr ? "تواصل معي" : "Let's Talk"}
              </a>
            </div>
          </article>
        </div>
      </div>

      {/* Scroll to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer z-50 transition-all duration-300 hover:-translate-y-1"
          style={{ background: G, border: `2px solid ${D}`, boxShadow: `3px 3px 0px 0px ${D}` }}
        >
          <ChevronUp size={20} color={D} />
        </button>
      )}

      {/* Article typography styles */}
      <style>{`
        .prose-custom h2 { font-family: ${isAr ? "'Ahmed Serif Display', serif" : "'TAN Headline', var(--font-bricolage)"}; font-size: 28px; font-weight: ${isAr ? 700 : 400}; margin: 48px 0 16px; color: ${D}; line-height: 1.4; }
        .prose-custom h3 { font-family: ${isAr ? "'Ahmed Serif Display', serif" : "'TAN Headline', var(--font-bricolage)"}; font-size: 20px; font-weight: ${isAr ? 700 : 400}; margin: 32px 0 12px; color: ${D}; }
        .prose-custom p { font-size: 15px; line-height: 2; color: rgba(0,0,0,0.6); margin: 0 0 20px; }
        .prose-custom ul, .prose-custom ol { margin: 0 0 20px; padding: 0 20px; }
        .prose-custom li { font-size: 14px; line-height: 1.9; color: rgba(0,0,0,0.55); margin-bottom: 8px; }
        .prose-custom strong { color: ${D}; font-weight: 700; }
        .prose-custom a { color: ${G}; text-decoration: underline; text-underline-offset: 3px; }
        .prose-custom blockquote { margin: 24px 0; padding: 20px 24px; border-radius: 16px; background: ${G}08; border-left: ${isAr ? "none" : `4px solid ${G}`}; border-right: ${isAr ? `4px solid ${G}` : "none"}; }
        .prose-custom blockquote p { color: ${D}; font-weight: 500; margin: 0; }
        .prose-custom table { width: 100%; border-collapse: collapse; margin: 24px 0; border-radius: 16px; overflow: hidden; border: 1px solid #EBEBEB; }
        .prose-custom th { background: ${D}; color: ${G}; font-size: 11px; font-weight: 700; padding: 14px 18px; text-align: ${isAr ? "right" : "left"}; letter-spacing: 1px; text-transform: uppercase; }
        .prose-custom td { padding: 12px 18px; font-size: 13px; color: rgba(0,0,0,0.6); border-bottom: 1px solid #F3F4F6; }
        .prose-custom tr:nth-child(even) td { background: #FAFAFA; }
        .prose-custom .callout { margin: 24px 0; padding: 20px; border-radius: 16px; background: #FAFAFA; border: 1px solid #EBEBEB; }
        .prose-custom .callout-title { font-weight: 700; font-size: 14px; margin-bottom: 8px; color: ${D}; }
        .prose-custom .callout p { margin: 0; font-size: 13px; }
        .prose-custom img { border-radius: 16px; margin: 24px 0; width: 100%; }
        .prose-custom hr { border: none; height: 1px; background: #F0F0F0; margin: 40px 0; }
      `}</style>
    </div>
  );
}
