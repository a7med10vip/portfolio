"use client";

import { ArrowUp, ArrowRight } from "lucide-react";
import RotatingText from "./ui/RotatingText";
import "@fortawesome/fontawesome-free/css/all.min.css";

/* Same named ramp as every section above. */
const INK = "#04323A";
const TEAL = "#004D5A";
const MUTED = "#4E717A";
const MINT = "#CFF7EE";

const socials = [
  { label: "LinkedIn", href: "https://linkedin.com/in/ahmed-alli", iconClass: "fa-brands fa-linkedin-in" },
  { label: "TikTok", href: "https://www.tiktok.com/@ahmed.development", iconClass: "fa-brands fa-tiktok" },
  { label: "WhatsApp", href: "https://wa.me/201011648156", iconClass: "fa-brands fa-whatsapp" },
  { label: "Email", href: "mailto:hello@ahmedali.online", iconClass: "fa-solid fa-envelope" },
];

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const reachLinks = [
  { label: "hello@ahmedali.online", href: "mailto:hello@ahmedali.online" },
  { label: "+20 101 164 8156", href: "tel:+201011648156" },
  { label: "Jeddah, Saudi Arabia", href: null },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    /* Ticket stub: a mint head carrying the ask, a perforated edge, and a
       white stub carrying the details — the same torn-ticket device as the
       stats strip. The footer sits on white like the rest of the page; the
       ticket itself is the coloured object. */
    <footer className="relative" style={{ background: "#0A0A0A", padding: "40px 24px 0" }}>
      <div className="ticket max-w-[1400px] mx-auto rounded-[22px] overflow-hidden"
        style={{ background: MINT, border: `2px solid ${TEAL}`, boxShadow: `7px 7px 0px 0px ${TEAL}` }}>

        {/* Head — the ask */}
        <div className="px-7 py-14 md:px-12 md:py-16 text-center">
          <p className="script text-xl md:text-2xl mb-4" style={{ color: TEAL }}>Ready to start?</p>
          {/* Flex with items-center, not baseline. RotatingText's root is an
              overflow-hidden inline-block, and CSS gives such a box its bottom
              margin edge as its baseline — so aligning on the baseline rode the
              word up off the line. Hero solves it the same way. */}
          <h2
            className="heading text-3xl md:text-5xl mb-5 flex flex-wrap items-center justify-center gap-x-3"
            /* line-height 1.08 was clipping the rotating word: RotatingText's
               root is overflow-hidden and only as tall as one line box, so a
               tight line-height cut the ascenders and descenders off. */
            style={{ color: INK, lineHeight: 1.3 }}
          >
            <span>Let&apos;s Build Something</span>
            <RotatingText
              texts={["Great", "Bold", "Impactful", "Different"]}
              mainClassName="inline-block overflow-hidden text-[#04323A]"
              rotationInterval={2500}
            />
          </h2>
          <p className="text-base md:text-lg max-w-md mx-auto mb-9" style={{ color: "rgba(4,50,58,0.70)" }}>
            Got a project, idea, or just want to say hi? I&apos;d love to hear from you.
          </p>

          {/* Both buttons carry the full retro treatment — white fill, 2px
              teal outline, 5px hard shadow — matching every other button on
              the site. */}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 px-8 rounded-full text-base font-bold"
              style={{ background: "#fff", color: INK, border: `2px solid ${TEAL}`, boxShadow: `5px 5px 0px 0px ${TEAL}`, height: "52px" }}
            >
              <ArrowRight size={16} />
              Start a Project
            </a>
            <a
              href="mailto:hello@ahmedali.online"
              className="inline-flex items-center gap-2.5 px-8 rounded-full text-base font-bold"
              style={{ background: "#fff", color: INK, border: `2px solid ${TEAL}`, boxShadow: `5px 5px 0px 0px ${TEAL}`, height: "52px" }}
            >
              Say Hello
            </a>
          </div>
        </div>

        {/* Perforation. The notches are half-circles filled with the page
            ground; the card's overflow:hidden trims their outer halves. */}
        <div className="ticket-perf" />

        {/* Stub — the details */}
        <div className="grid grid-cols-1 md:grid-cols-[1.7fr_1fr_1fr] gap-8 md:gap-10 px-7 py-10 md:px-12" style={{ background: "#fff" }}>
          <div>
            <a href="#" className="heading text-2xl inline-block mb-2.5" style={{ color: INK }}>
              {/* The stop is an accent now — it used to be wrapped in a span
                  that set the exact colour the parent already had. */}
              Ahmed Ali<span style={{ color: TEAL }}>.</span>
            </a>
            <p className="text-sm leading-relaxed mb-5 max-w-[34ch]" style={{ color: MUTED }}>
              Full-Stack Digital Strategist crafting high-impact digital products, campaigns, and growth systems across MENA.
            </p>

            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={s.label}
                  className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{ background: "#fff", border: `2px solid ${TEAL}`, boxShadow: `2px 2px 0px 0px ${TEAL}` }}
                >
                  <i className={s.iconClass} style={{ fontSize: "16px", color: INK }} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.1em] mb-3.5" style={{ color: TEAL }}>Navigate</h4>
            <div className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-sm font-medium" style={{ color: MUTED }}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.1em] mb-3.5" style={{ color: TEAL }}>Reach Out</h4>
            <div className="flex flex-col gap-2.5 mb-6">
              {reachLinks.map((r) =>
                r.href ? (
                  <a key={r.label} href={r.href} className="text-sm font-medium" style={{ color: MUTED }}>
                    {r.label}
                  </a>
                ) : (
                  <p key={r.label} className="text-sm font-medium" style={{ color: MUTED }}>{r.label}</p>
                )
              )}
            </div>

            {/* This button's shadow used to be rgba(0,0,0,0.2) — the only
                translucent hard shadow on the site, and it read muddy beside
                the solid teal ones everywhere else. */}
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 h-10 px-5 rounded-full text-xs font-bold cursor-pointer"
              style={{ background: MINT, color: INK, border: `2px solid ${TEAL}`, boxShadow: `3px 3px 0px 0px ${TEAL}` }}
            >
              <ArrowUp size={14} />
              Top
            </button>
          </div>
        </div>
      </div>

      {/* Legal sits outside the ticket, on the page ground */}
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-2 px-1 py-6">
        <p className="text-xs" style={{ color: "rgba(207,247,238,0.55)" }}>
          &copy; {new Date().getFullYear()} Ahmed Ali. All rights reserved.
        </p>
        <p className="text-xs" style={{ color: "rgba(207,247,238,0.55)" }}>
          Designed &amp; Developed by Ahmed Ali
        </p>
      </div>

      <style>{`
        .ticket-perf {
          position: relative;
          border-top: 3px dashed ${TEAL};
        }
        .ticket-perf::before,
        .ticket-perf::after {
          content: '';
          position: absolute;
          top: -15px;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #0A0A0A;
          border: 2px solid ${TEAL};
        }
        /* Each notch keeps only its inner half — the outer half would sit
           outside the card and is trimmed by overflow:hidden anyway. */
        .ticket-perf::before { left: -15px; clip-path: inset(0 0 0 50%); }
        .ticket-perf::after  { right: -15px; clip-path: inset(0 50% 0 0); }
      `}</style>
    </footer>
  );
}
