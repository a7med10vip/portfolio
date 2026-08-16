"use client";

import { ArrowUp, ArrowLeft } from "lucide-react";
import "@fortawesome/fontawesome-free/css/all.min.css";

/* Same named ramp as every section. */
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
  { label: "نبذة عني", href: "#about" },
  { label: "الخدمات", href: "#services" },
  { label: "المشاريع", href: "#projects" },
  { label: "الخبرات", href: "#experience" },
  { label: "تواصل", href: "#contact" },
];

const reachLinks = [
  { label: "hello@ahmedali.online", href: "mailto:hello@ahmedali.online", ltr: true },
  { label: "+20 101 164 8156", href: "tel:+201011648156", ltr: true },
  { label: "جدة، السعودية", href: null, ltr: false },
];

export default function FooterAr() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    /* Arabic mirror of the ticket-stub footer: a mint head carrying the ask, a
       perforated edge, and a white stub carrying the details. */
    <footer className="relative" style={{ background: "#0A0A0A", padding: "40px 24px 0" }}>
      <div className="ticket-ar max-w-[1400px] mx-auto rounded-[22px] overflow-hidden"
        style={{ background: MINT, border: `2px solid ${TEAL}`, boxShadow: `7px 7px 0px 0px ${TEAL}` }}>

        {/* Head — the ask */}
        <div className="px-7 py-14 md:px-12 md:py-16 text-center">
          <p className="ar-script text-xl md:text-2xl mb-4" style={{ color: TEAL }}>مستعد للبداية؟</p>
          {/* Arabic display type needs far looser leading than the Latin
              build's 1.3 — the serif's descenders collide below that. */}
          <h2 className="ar-heading text-3xl md:text-5xl mb-5" style={{ color: INK, lineHeight: 1.5 }}>
            لنبنِ شيئاً مختلفاً
          </h2>
          <p className="ar-body text-base md:text-lg max-w-md mx-auto mb-9" style={{ color: "rgba(4,50,58,0.70)", lineHeight: 1.9 }}>
            لديك مشروع أو فكرة أو تريد أن تقول مرحباً؟ يسعدني التواصل.
          </p>

          {/* Both buttons white with the full retro treatment, matching the
              English footer. The arrow points left — this column reads RTL. */}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              className="ar-body inline-flex items-center gap-2.5 px-8 rounded-full text-base font-bold"
              style={{ background: "#fff", color: INK, border: `2px solid ${TEAL}`, boxShadow: `5px 5px 0px 0px ${TEAL}`, height: "52px" }}
            >
              <ArrowLeft size={16} />
              ابدأ مشروعاً
            </a>
            <a
              href="mailto:hello@ahmedali.online"
              className="ar-body inline-flex items-center gap-2.5 px-8 rounded-full text-base font-bold"
              style={{ background: "#fff", color: INK, border: `2px solid ${TEAL}`, boxShadow: `5px 5px 0px 0px ${TEAL}`, height: "52px" }}
            >
              قُل مرحباً
            </a>
          </div>
        </div>

        <div className="ticket-perf-ar" />

        {/* Stub — the details */}
        <div className="grid grid-cols-1 md:grid-cols-[1.7fr_1fr_1fr] gap-8 md:gap-10 px-7 py-10 md:px-12" style={{ background: "#fff" }}>
          <div>
            <a href="#" className="ar-heading text-2xl inline-block mb-2.5" style={{ color: INK }}>
              أحمد علي<span style={{ color: TEAL }}>.</span>
            </a>
            <p className="ar-body text-sm leading-loose mb-5 max-w-[38ch]" style={{ color: MUTED }}>
              استراتيجي رقمي شامل يصنع منتجات رقمية عالية الأثر وحملات وأنظمة نمو عبر الشرق الأوسط.
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
            <h4 className="ar-body text-[11px] font-bold tracking-[0.06em] mb-3.5" style={{ color: TEAL }}>التصفّح</h4>
            <div className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="ar-body text-sm font-medium" style={{ color: MUTED }}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="ar-body text-[11px] font-bold tracking-[0.06em] mb-3.5" style={{ color: TEAL }}>تواصل معي</h4>
            <div className="flex flex-col gap-2.5 mb-6">
              {/* The address and phone number are Latin-script data sitting in
                  an RTL column, so they carry their own direction. */}
              {reachLinks.map((r) =>
                r.href ? (
                  <a
                    key={r.label}
                    href={r.href}
                    dir={r.ltr ? "ltr" : undefined}
                    className="ar-body text-sm font-medium"
                    style={{ color: MUTED, textAlign: r.ltr ? "right" : undefined }}
                  >
                    {r.label}
                  </a>
                ) : (
                  <p key={r.label} className="ar-body text-sm font-medium" style={{ color: MUTED }}>{r.label}</p>
                )
              )}
            </div>

            <button
              onClick={scrollToTop}
              className="ar-body inline-flex items-center gap-2 h-10 px-5 rounded-full text-xs font-bold cursor-pointer"
              style={{ background: MINT, color: INK, border: `2px solid ${TEAL}`, boxShadow: `3px 3px 0px 0px ${TEAL}` }}
            >
              <ArrowUp size={14} />
              الأعلى
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-2 px-1 py-6">
        <p className="ar-body text-xs" style={{ color: "rgba(207,247,238,0.55)" }}>
          &copy; {new Date().getFullYear()} أحمد علي. جميع الحقوق محفوظة.
        </p>
        <p className="ar-body text-xs" style={{ color: "rgba(207,247,238,0.55)" }}>
          تصميم وتطوير أحمد علي
        </p>
      </div>

      <style>{`
        .ticket-perf-ar {
          position: relative;
          border-top: 3px dashed ${TEAL};
        }
        .ticket-perf-ar::before,
        .ticket-perf-ar::after {
          content: '';
          position: absolute;
          top: -15px;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #0A0A0A;
          border: 2px solid ${TEAL};
        }
        .ticket-perf-ar::before { left: -15px; clip-path: inset(0 0 0 50%); }
        .ticket-perf-ar::after  { right: -15px; clip-path: inset(0 50% 0 0); }
      `}</style>
    </footer>
  );
}
