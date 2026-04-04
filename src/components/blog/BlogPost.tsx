"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, Calendar, ArrowRight, Share2, Link2, MessageCircle, ChevronUp, Home, FileText, Briefcase, type LucideIcon } from "lucide-react";

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
  const [headerSolid, setHeaderSolid] = useState(false);
  const isAr = lang === "ar";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".bp-hero", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out", delay: 0.2 });
    }, ref);

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

    const handleScroll = () => {
      setShowTop(window.scrollY > 600);
      setHeaderSolid(window.scrollY > 40);
    };
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

  const navItems = isAr
    ? [
        { label: "الرئيسية", href: "/ar" },
        { label: "المقالات", href: "/ar/blog" },
        { label: "أعمالي", href: "/ar#projects" },
        { label: "تواصل", href: "https://wa.me/201011648156" },
      ]
    : [
        { label: "Home", href: "/" },
        { label: "Blog", href: "/blog" },
        { label: "Portfolio", href: "/#projects" },
        { label: "Contact", href: "https://wa.me/201011648156" },
      ];

  return (
    <div ref={ref} className="no-tail" style={{ background: "#fff", color: D, direction: isAr ? "rtl" : "ltr", fontFamily: isAr ? "'Ahmed Sans', sans-serif" : undefined }}>

      {/* ═══ HEADER ═══ */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" style={{
        background: headerSolid ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: headerSolid ? "blur(20px)" : "none",
        borderBottom: headerSolid ? "1px solid #F0F0F0" : "1px solid transparent",
      }}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <a href={isAr ? "/ar" : "/"} className="flex items-center gap-2 no-underline" style={{ textDecoration: "none" }}>
            <span className={isAr ? "ar-heading" : "heading"} style={{ fontSize: 18, color: D }}>Ahmed Ali<span style={{ color: G }}>.</span></span>
          </a>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="px-4 py-2 rounded-full text-[13px] font-medium transition-colors duration-200 hover:bg-gray-100 no-underline" style={{ color: "rgba(0,0,0,0.55)", textDecoration: "none" }}>
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <a href="https://wa.me/201011648156" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-bold no-underline" style={{ background: G, color: D, border: `1.5px solid ${D}`, textDecoration: "none", boxShadow: `2px 2px 0px 0px ${D}` }}>
            <MessageCircle size={14} /> {isAr ? "واتساب" : "WhatsApp"}
          </a>
        </div>
      </header>

      {/* ═══ HERO ═══ */}
      <div style={{ paddingTop: 100, paddingBottom: 0, background: "#fff" }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="bp-hero opacity-0 flex flex-wrap items-center gap-3 mb-6">
            <span className="px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase" style={{ background: `${categoryColor}15`, color: categoryColor }}>{category}</span>
            <span className="flex items-center gap-1.5 text-[12px]" style={{ color: "rgba(0,0,0,0.35)" }}>
              <Calendar size={13} /> {date}
            </span>
            <span className="flex items-center gap-1.5 text-[12px]" style={{ color: "rgba(0,0,0,0.35)" }}>
              <Clock size={13} /> {readingTime}
            </span>
          </div>

          <h1 className={`bp-hero opacity-0 ${isAr ? "ar-heading" : "heading"} text-3xl sm:text-4xl md:text-5xl mb-6`} style={{ lineHeight: 1.3 }}>
            {title}
          </h1>

          <p className="bp-hero opacity-0 text-base md:text-lg mb-8 max-w-2xl" style={{ color: "rgba(0,0,0,0.5)", lineHeight: 1.9 }}>
            {description}
          </p>

          <div className="bp-hero opacity-0 flex items-center gap-4 mb-10 pb-8" style={{ borderBottom: "1px solid #F0F0F0" }}>
            <img src="/ahmed.jpeg" alt="Ahmed Ali" className="w-11 h-11 rounded-full object-cover" style={{ border: `2px solid ${G}` }} />
            <div>
              <p className="text-[13px] font-bold" style={{ margin: 0 }}>Ahmed Ali</p>
              <p className="text-[11px]" style={{ color: "rgba(0,0,0,0.35)", margin: 0 }}>Full-Stack Digital Strategist</p>
            </div>
            <div className={`flex items-center gap-2 ${isAr ? "mr-auto" : "ml-auto"}`}>
              <button onClick={copyLink} className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-colors hover:bg-gray-100" style={{ background: "#F5F5F5", border: "none" }} title="Copy link">
                <Link2 size={15} color="rgba(0,0,0,0.4)" />
              </button>
              <a href={`https://wa.me/?text=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`} target="_blank" rel="noopener" className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100 no-underline" style={{ background: "#F5F5F5", textDecoration: "none" }} title="Share">
                <Share2 size={15} color="rgba(0,0,0,0.4)" />
              </a>
            </div>
          </div>
        </div>

        <div className="bp-hero opacity-0 max-w-3xl mx-auto px-6 mb-12">
          <div className="rounded-[24px] overflow-hidden flex items-center justify-center" style={{ background: heroGradient, height: 280 }}>
            <HeroIcon size={72} color="rgba(255,255,255,0.2)" strokeWidth={1} />
          </div>
        </div>
      </div>

      {/* ═══ CONTENT ═══ */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="flex gap-10">
          {/* TOC sidebar */}
          <aside className="hidden lg:block w-[200px] flex-shrink-0">
            <div className="sticky top-24">
              <p className="text-[10px] font-bold tracking-[2px] uppercase mb-4" style={{ color: "rgba(0,0,0,0.25)" }}>
                {isAr ? "المحتويات" : "Contents"}
              </p>
              <nav className="flex flex-col gap-0.5">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="text-[12px] py-1.5 px-3 rounded-lg transition-all duration-200"
                    style={{
                      color: activeSection === item.id ? D : "rgba(0,0,0,0.35)",
                      background: activeSection === item.id ? `${G}12` : "transparent",
                      fontWeight: activeSection === item.id ? 700 : 400,
                      textDecoration: "none",
                      [`border${isAr ? "Right" : "Left"}`]: activeSection === item.id ? `3px solid ${G}` : "3px solid transparent",
                    }}
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Article */}
          <article className="flex-1 min-w-0">
            <div className="prose-custom">
              {children}
            </div>

            {/* Author */}
            <div className="mt-16 rounded-[24px] p-8 md:p-10 flex flex-col md:flex-row items-center gap-6" style={{ background: D }}>
              <img src="/ahmed.jpeg" alt="Ahmed Ali" className="w-20 h-20 rounded-full object-cover flex-shrink-0" style={{ border: `3px solid ${G}` }} />
              <div className={isAr ? "text-right" : ""}>
                <p className={`text-lg font-bold mb-1 ${isAr ? "ar-heading" : "heading"}`} style={{ color: "#fff", margin: 0 }}>Ahmed Ali</p>
                <p className="text-[12px] mb-3" style={{ color: G, margin: "4px 0 12px" }}>Full-Stack Digital Strategist</p>
                <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)", margin: 0 }}>
                  {isAr
                    ? "خبرة +5 سنوات في التسويق الرقمي وتطوير المنتجات عبر مصر والسعودية والإمارات وقطر."
                    : "5+ years building digital products across Egypt, Saudi Arabia, UAE & Qatar."}
                </p>
              </div>
              <a href="https://wa.me/201011648156" target="_blank" rel="noopener" className={`flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold ${isAr ? "mr-auto" : "ml-auto"}`} style={{ background: G, color: D, border: `2px solid ${G}`, textDecoration: "none" }}>
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
          className="fixed bottom-8 z-50 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:-translate-y-1"
          style={{ [isAr ? "left" : "right"]: 32, background: G, border: `2px solid ${D}`, boxShadow: `3px 3px 0px 0px ${D}` }}
        >
          <ChevronUp size={20} color={D} />
        </button>
      )}

      {/* Typography */}
      <style>{`
        .prose-custom h2 {
          font-family: ${isAr ? "'Ahmed Serif Display', serif" : "'TAN Headline', var(--font-bricolage)"};
          font-size: 26px; font-weight: ${isAr ? 700 : 400};
          margin: 56px 0 20px; color: ${D}; line-height: 1.5;
          padding-bottom: 12px; border-bottom: 1px solid #F0F0F0;
        }
        .prose-custom h3 {
          font-family: ${isAr ? "'Ahmed Serif Display', serif" : "'TAN Headline', var(--font-bricolage)"};
          font-size: 19px; font-weight: ${isAr ? 700 : 400};
          margin: 36px 0 14px; color: ${D};
        }
        .prose-custom p { font-size: 15px; line-height: 2.1; color: rgba(0,0,0,0.65); margin: 0 0 20px; }
        .prose-custom ul { margin: 0 0 24px; padding: 0; list-style: none; }
        .prose-custom ol { margin: 0 0 24px; padding: 0 20px; }
        .prose-custom li {
          font-size: 14px; line-height: 1.9; color: rgba(0,0,0,0.6); margin-bottom: 10px;
          padding: 8px 16px; border-radius: 12px; background: #FAFAFA;
          position: relative; padding-${isAr ? "right" : "left"}: 36px;
        }
        .prose-custom li::before {
          content: ''; position: absolute; ${isAr ? "right" : "left"}: 14px; top: 16px;
          width: 6px; height: 6px; border-radius: 50%; background: ${G};
        }
        .prose-custom strong { color: ${D}; font-weight: 700; }
        .prose-custom a { color: ${G}; text-decoration: underline; text-underline-offset: 3px; }
        .prose-custom blockquote {
          margin: 28px 0; padding: 24px 28px; border-radius: 20px;
          background: ${G}08; border-${isAr ? "right" : "left"}: 4px solid ${G};
        }
        .prose-custom blockquote p { color: ${D}; font-weight: 500; margin: 0; font-size: 14px; line-height: 2; }
        .prose-custom table { width: 100%; border-collapse: separate; border-spacing: 0; margin: 28px 0; border-radius: 16px; overflow: hidden; border: 1px solid #EBEBEB; }
        .prose-custom th { background: ${D}; color: ${G}; font-size: 11px; font-weight: 700; padding: 14px 18px; text-align: ${isAr ? "right" : "left"}; letter-spacing: 1px; text-transform: uppercase; }
        .prose-custom td { padding: 13px 18px; font-size: 13px; color: rgba(0,0,0,0.6); border-bottom: 1px solid #F3F4F6; }
        .prose-custom tr:nth-child(even) td { background: #FAFAFA; }
        .prose-custom tr:hover td { background: ${G}06; }
        .prose-custom .callout { margin: 28px 0; padding: 24px; border-radius: 20px; background: #FAFAFA; border: 1px solid #EBEBEB; }
        .prose-custom .callout-title { font-weight: 700; font-size: 14px; margin-bottom: 8px; color: ${D}; }
        .prose-custom .callout p { margin: 0; font-size: 13px; line-height: 1.9; }
        .prose-custom img { border-radius: 16px; margin: 28px 0; width: 100%; }
        .prose-custom hr { border: none; height: 1px; background: #F0F0F0; margin: 48px 0; }
      `}</style>
    </div>
  );
}
