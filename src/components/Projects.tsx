"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, ArrowUpRight } from "lucide-react";
/* eslint-disable @next/next/no-img-element */

gsap.registerPlugin(ScrollTrigger);

/* ── Tool logos with brand colors ── */
const toolLogos: Record<string, { icon: string; color: string }> = {
  "Flutter": { icon: "/ext/flutter.svg", color: "#02569B" },
  "AI": { icon: "/ext/openai.png", color: "#10A37F" },
  "Payment": { icon: "/ext/visa-logo.png", color: "#1A1F71" },
  "Firebase": { icon: "/ext/firebase.svg", color: "#FFCA28" },
  "Events": { icon: "/ext/google.svg", color: "#4285F4" },
  "Google Ads": { icon: "/ext/google-ads-icon.png", color: "#4285F4" },
  "Strategy": { icon: "/ext/trello.svg", color: "#0079BF" },
  "WordPress": { icon: "/ext/wordpress.svg", color: "#21759B" },
  "SEO": { icon: "/ext/semrush.png", color: "#FF642D" },
  "GA4": { icon: "/ext/gtm.svg", color: "#4285F4" },
  "React": { icon: "/ext/react.svg", color: "#61DAFB" },
  "Next.js": { icon: "/ext/nextjs.svg", color: "#ffffff" },
  "Booking": { icon: "/ext/flaticon-seo.png", color: "#fff" },
  "SEO Strategy": { icon: "/ext/semrush.png", color: "#FF642D" },
  "Real Estate": { icon: "/ext/google-ads-icon.png", color: "#4285F4" },
  "Content": { icon: "/ext/flaticon-social.png", color: "#fff" },
  "Analytics": { icon: "/ext/google-analytics.png", color: "#E37400" },
  "UX Research": { icon: "/ext/figma.svg", color: "#F24E1E" },
  "E-commerce": { icon: "/ext/flaticon-target.png", color: "#4285F4" },
  "Optimization": { icon: "/ext/gsc.png", color: "#4285F4" },
  "Market Research": { icon: "/ext/google.svg", color: "#4285F4" },
  "UX Strategy": { icon: "/ext/figma.svg", color: "#A259FF" },
  "Growth Planning": { icon: "/ext/trello.svg", color: "#0079BF" },
  "Hospitality": { icon: "/ext/flaticon-photo.png", color: "#FF9800" },
};

/* ── Country flags ── */
const countryFlags: Record<string, { flag: string; name: string }> = {
  "KSA": { flag: "🇸🇦", name: "Saudi Arabia" },
  "UAE": { flag: "🇦🇪", name: "UAE" },
  "UK": { flag: "🇬🇧", name: "United Kingdom" },
};

const projects = [
  {
    category: "Strategy & UX",
    title: "Saudi Arabian Airlines",
    client: "Saudia · Saudi Arabia",
    year: "2023",
    country: "KSA",
    logo: "/ext/saudia.svg",
    logoSize: "65px",
    desc: "Conducted comprehensive competitor analysis, SWOT assessment, and user experience evaluation for Saudi Arabian Airlines' official website. Delivered strategic insights on key international flight routes and UX improvement recommendations.",
    results: ["Competitor & SWOT analysis", "UX audit for official website", "Flight route keyword gap analysis"],
    tags: ["UX Research", "SEO Strategy", "Analytics", "Market Research"],
    accent: "#4FFFB0",
    link: null as string | null,
    image: "/ext/saudia-plane.png",
  },
  {
    category: "UX & Growth",
    title: "QNB · Qatar National Bank",
    client: "QNB Group · Qatar",
    year: "2023",
    country: "UAE",
    logo: "/logos/qnb.png",
    logoSize: "35px",
    desc: "User experience analysis and optimization recommendations for QNB's official mobile banking app. Focused on simplifying user journeys, reducing friction points, and increasing lead generation to drive higher app adoption and engagement.",
    results: ["UX audit for mobile app", "Lead generation strategy", "User journey optimization"],
    tags: ["UX Research", "Analytics", "Optimization", "Market Research"],
    accent: "#4FFFB0",
    link: null,
    image: "/projects/qnb.jpg",
  },
  {
    category: "UX Optimization",
    title: "Chelsea FC Store",
    client: "Chelsea Football Club · UK",
    year: "2023",
    country: "UK",
    logo: "/logos/chelsea.png",
    logoNoFilter: true,
    desc: "UX optimization recommendations for the official Chelsea FC online merchandise store. Analyzed user journeys and provided actionable improvements for conversion optimization.",
    results: ["UX audit", "Conversion optimization", "Global brand"],
    tags: ["UX Research", "E-commerce", "Optimization", "Analytics", "GA4"],
    accent: "#4FFFB0",
    link: "https://store.chelseafc.com/en/",
    image: "/projects/chealse.png",
  },
  {
    category: "Real Estate SEO",
    title: "Mohammed BinGhatti",
    client: "BinGhatti Investments · Dubai",
    year: "2024",
    country: "UAE",
    logo: "/ext/binghatti-white.png",
    desc: "SEO strategy and digital presence management for one of Dubai's leading luxury real estate developers. Increased rankings for high-value property keywords across the UAE market.",
    results: ["Luxury real estate SEO", "UAE market reach", "High-value keywords"],
    tags: ["SEO Strategy", "GA4", "Content", "Analytics"],
    accent: "#4FFFB0",
    link: "https://www.binghatti.com/en/",
    image: "/projects/binghatti.png",
  },
  {
    category: "Event Strategy",
    title: "Mobile Developers Week",
    client: "Abu Dhabi Energy Center",
    year: "2025",
    country: "UAE",
    logo: "/ext/mdw.png",
    desc: "Served as digital strategy consultant for this landmark international tech conference at Abu Dhabi Energy Center, unifying droidcon and Swift Heroes under one roof for the first time. Consulted on ticket sales growth campaigns, audience acquisition, and full digital marketing strategy contributing to the commercial success of one of the region's biggest tech events.",
    results: ["3,000+ attendees", "60+ global speakers", "Backed by Abu Dhabi Bureau"],
    tags: ["Events", "Google Ads", "Strategy"],
    accent: "#4FFFB0",
    link: "https://mobiledevelopersweek.com/",
    image: "/projects/mdw.png",
  },
  {
    category: "AI Platform",
    title: "Omnis Media AI",
    client: "Omnis Media · Dubai",
    year: "2026",
    country: "UAE",
    logo: "/ext/omnes.svg",
    desc: "Led development of an AI-powered digital media platform for MENA's MarTech innovation leader, organizer of Mobile Developers Week. Built with React, Next.js, and Firebase featuring intelligent automation, data pipelines, real-time analytics dashboards, and AI-driven content workflows. Integrated APIs, payment gateways, and automation tools.",
    results: ["AI-powered platform", "MarTech innovation", "Full-stack delivery"],
    tags: ["React", "Next.js", "Firebase", "AI", "Analytics", "Optimization"],
    accent: "#4FFFB0",
    link: "https://arab-marketing-net-web-app.web.app/",
    image: "/projects/omnis.png",
  },
  {
    category: "Mobile App",
    title: "Maasob Al-Sultan App",
    client: "Restaurant Chain · Jeddah",
    year: "2026",
    country: "KSA",
    logo: "/ext/masoub.png",
    desc: "End-to-end Flutter mobile app for a leading Jeddah restaurant chain. Built AI-powered chatbot for customer support, customer loyalty program, multi-branch order management across 5 locations, real-time performance dashboards for management, and fully integrated payment gateways. Designed, developed, and shipped to both stores in under one month.",
    results: ["Shipped in < 1 month", "5 branches connected", "Live on App Store & Google Play"],
    tags: ["Flutter", "AI", "Payment", "Firebase", "Analytics"],
    accent: "#4FFFB0",
    link: null,
    image: "/projects/maasob.png",
    appStore: "https://apps.apple.com/ca/app/%D9%85%D8%B9%D8%B5%D9%88%D8%A8-%D8%A7%D9%84%D8%B3%D9%84%D8%B7%D8%A7%D9%86/id6757263587",
    playStore: "https://play.google.com/store/apps/details?id=com.masoubalsultan.app",
  },
  {
    category: "SEO & Web",
    title: "Finance & Business UAE",
    client: "UAE Editorial Platform",
    year: "2025",
    country: "UAE",
    logo: "/ext/finance-business.png",
    desc: "Built and managed the complete digital presence from scratch. Website development, comprehensive SEO strategy (On-Page, Off-Page, Technical), analytics integration, and content strategy. Secured top-10 Google rankings for competitive finance keywords within just 8 months of launch. Partners include Mohammed BinGhatti and other major UAE brands.",
    results: ["Top 10 in 8 months", "Full digital ecosystem", "Major brand partners"],
    tags: ["WordPress", "SEO", "GA4", "Analytics", "Optimization", "SEO Strategy"],
    accent: "#4FFFB0",
    link: "https://financebusinessuae.com",
    image: "/projects/fnb.png",
  },
  {
    category: "Healthcare",
    title: "RM Clinic · Mecca",
    client: "Medical Clinic · KSA",
    year: "2024",
    country: "KSA",
    logo: "/ext/rmclinic.png",
    desc: "Designed and developed a complete medical platform with integrated online booking system, payment gateways, and patient management. Implemented full SEO strategy driving local patient acquisition in Mecca. Managed Google Ads and Meta Ads campaigns for the clinic.",
    results: ["Online booking & payment", "Local SEO strategy", "Paid campaigns"],
    tags: ["WordPress", "Booking", "Payment", "Optimization", "Analytics", "GA4", "SEO"],
    accent: "#4FFFB0",
    link: "https://rmclinic.sa",
    image: "/projects/rmclinic.png",
  },
  {
    category: "Hospitality & Strategy",
    title: "Wejhat × Kadana Partnership",
    client: "Wejhat Hospitality · Mecca, KSA",
    year: "2024",
    country: "KSA",
    logo: "/1.svg",
    desc: "Led market research and strategic planning for Wejhat, a premium hospitality and hotel management company in Mecca, during their high-profile partnership with Kadana, one of Saudi Arabia's largest Hajj and Umrah service operators. Conducted comprehensive market analysis, UX improvement strategy for their digital platforms, and developed a full expansion and growth roadmap to scale operations across the holy city.",
    results: ["Kadana partnership", "Market research & UX", "Expansion roadmap"],
    tags: ["Market Research", "UX Strategy", "Growth Planning", "Hospitality"],
    accent: "#4FFFB0",
    link: "https://kidana.com.sa/",
    image: "/ext/ghrannews.jpg",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".proj-header", { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
      gsap.utils.toArray<HTMLElement>(".proj-item").forEach((el) => {
        gsap.fromTo(el, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" style={{ background: "#0A0A0A", padding: "100px 0" }}>
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="proj-header opacity-0 text-center mb-14">
          <p className="script text-xl md:text-2xl mb-3" style={{ color: "#4FFFB0" }}>Impact</p>
          <h2 className="heading text-3xl md:text-4xl" style={{ color: "#fff" }}>Featured Projects</h2>
        </div>

        {/* Projects list */}
        <div className="flex flex-col gap-6">
          {projects.map((project, i) => {
            const isEven = i % 2 === 0;
            const isGreen = i % 2 === 0;
            const cardBg = isGreen ? "#4FFFB0" : "#fff";
            const cardText = "#0A0A0A";
            const cardMuted = isGreen ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.45)";
            const resultBg = isGreen ? "rgba(0,0,0,0.08)" : "#F4F4F5";
            const resultBorder = isGreen ? "rgba(0,0,0,0.1)" : "#E4E4E7";
            const flag = countryFlags[project.country];
            return (
              <div
                key={project.title}
                className="proj-item opacity-0 rounded-[28px] overflow-hidden"
                style={{ background: cardBg }}
              >
                <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`} style={{ minHeight: "500px" }}>
                  {/* Image side */}
                  <div className="md:w-[55%] flex-shrink-0 relative overflow-hidden" style={{ minHeight: "500px", background: "#161616" }}>
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover object-center" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center" />
                    )}

                    {/* Year badge */}
                    <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full text-[11px] font-bold" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", color: "#4FFFB0" }}>
                      {project.year}
                    </div>

                    {/* Country flag badge */}
                    {flag && (
                      <div className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", color: "#fff" }}>
                        <span className="text-base">{flag.flag}</span>
                        {flag.name}
                      </div>
                    )}

                    {/* Category badge */}
                    <div className="absolute bottom-5 left-5 px-3 py-1.5 rounded-full text-[11px] font-semibold" style={{ background: isGreen ? "#fff" : "#4FFFB0", color: "#0A0A0A" }}>
                      {project.category}
                    </div>
                  </div>

                  {/* Content side */}
                  <div className="flex-1 p-8 md:p-10 flex flex-col justify-between" style={{ color: cardText }}>
                    <div>
                      {/* Brand Logo */}
                      {(project as any).logo && (
                        <img src={(project as any).logo} alt="" className="mb-3 object-contain" style={{ height: (project as any).logoSize || "50px", width: "auto", maxWidth: "160px", filter: (project as any).logoNoFilter ? "none" : "brightness(0)" }} />
                      )}

                      {/* Client */}
                      <p className="text-xs mb-2" style={{ color: cardMuted }}>{project.client}</p>

                      {/* Title */}
                      <h3 className="heading text-2xl md:text-3xl mb-4" style={{ color: cardText }}>{project.title}</h3>

                      {/* Description */}
                      <p className="text-sm leading-relaxed mb-6" style={{ color: cardMuted }}>{project.desc}</p>

                      {/* Results */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.results.map(r => (
                          <div key={r} className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: resultBg, border: `1px solid ${resultBorder}` }}>
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: isGreen ? "#0A0A0A" : "#4FFFB0" }} />
                            <span className="text-xs font-medium" style={{ color: cardText }}>{r}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tool logos */}
                      <div className="flex flex-wrap gap-4">
                        {project.tags.map(tag => {
                          const tool = toolLogos[tag];
                          return (
                            <div key={tag} className="flex flex-col items-center gap-1.5">
                              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "#fff", border: "1px solid #e0e0e0" }}>
                                {tool ? (
                                  <img src={tool.icon} alt={tag} width={20} height={20} />
                                ) : (
                                  <span className="text-xs font-bold" style={{ color: "#4FFFB0" }}>{tag[0]}</span>
                                )}
                              </div>
                              <span className="text-[10px] font-medium" style={{ color: cardText }}>{tag}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap items-center gap-3 mt-6">
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 h-10 px-6 rounded-full text-xs font-bold transition-all duration-200 hover:-translate-y-0.5" style={{ background: isGreen ? "#fff" : "#4FFFB0", color: "#0A0A0A", border: "2px solid #0A0A0A", boxShadow: "3px 3px 0px 0px #0A0A0A" }}>
                          Visit Live <ExternalLink size={12} />
                        </a>
                      )}
                      {(project as any).playStore && (
                        <a href={(project as any).playStore} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 h-11 px-4 rounded-xl transition-all hover:-translate-y-0.5" style={{ background: "#000", border: "1px solid #333" }}>
                          <svg width="20" height="22" viewBox="0 0 512 512"><path fill="#2196F3" d="M48 59.49v393a17 17 0 0 0 27.24 13.6l383-196.49a17 17 0 0 0 0-27.21L75.24 45.89A17 17 0 0 0 48 59.49z"/><path fill="#4CAF50" d="M48 59.49v393l240-196.5z"/><path fill="#FFC107" d="M288 256l-240 196.5 383-196.5z"/><path fill="#F44336" d="M288 256L48 59.49l240 196.5z"/></svg>
                          <div className="text-left"><span className="block text-[8px] leading-none" style={{ color: "#aaa" }}>GET IT ON</span><span className="block text-sm font-semibold leading-tight" style={{ color: "#fff" }}>Google Play</span></div>
                        </a>
                      )}
                      {(project as any).appStore && (
                        <a href={(project as any).appStore} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 h-11 px-4 rounded-xl transition-all hover:-translate-y-0.5" style={{ background: "#000", border: "1px solid #333" }}>
                          <svg width="18" height="22" viewBox="0 0 384 512" fill="#fff"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                          <div className="text-left"><span className="block text-[8px] leading-none" style={{ color: "#aaa" }}>Download on the</span><span className="block text-sm font-semibold leading-tight" style={{ color: "#fff" }}>App Store</span></div>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a href="#contact" className="inline-flex items-center gap-2 h-12 px-8 rounded-full text-sm font-bold transition-all duration-200 hover:-translate-y-0.5" style={{ background: "#4FFFB0", color: "#0A0A0A", border: "2px solid #0A0A0A", boxShadow: "4px 4px 0px 0px #0A0A0A" }}>
            Start a Project <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
