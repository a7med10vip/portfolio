"use client";

import { ArrowUp, ArrowLeft } from "lucide-react";

import "@fortawesome/fontawesome-free/css/all.min.css";

const socials = [
  { label: "LinkedIn", href: "https://linkedin.com/in/ahmed-alli", iconClass: "fa-brands fa-linkedin-in" },
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

export default function FooterAr() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden" style={{ background: "#4FFFB0" }}>
      {/* Large CTA Section */}
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <div className="text-center mb-14">
          <p className="ar-script text-xl md:text-2xl mb-4" style={{ color: "#0A0A0A" }}>مستعد للبداية؟</p>
          <h2 className="ar-heading text-4xl md:text-6xl lg:text-7xl mb-6" style={{ color: "#0A0A0A" }}>
            لنبنِ شيئاً مختلفاً
          </h2>
          <p className="ar-body text-base md:text-lg max-w-lg mx-auto mb-10" style={{ color: "rgba(0,0,0,0.5)" }}>
            لديك مشروع أو فكرة أو تريد أن تقول مرحباً؟ يسعدني التواصل.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              className="ar-body group relative inline-flex items-center gap-3 h-14 px-9 rounded-full text-base font-bold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              style={{ background: "#fff", color: "#0A0A0A", border: "2px solid #0A0A0A", boxShadow: "5px 5px 0px 0px #0A0A0A" }}
            >
              <ArrowLeft size={16} />
              ابدأ مشروعاً
            </a>
            <a
              href="mailto:hello@ahmedali.online"
              className="ar-body group relative inline-flex items-center gap-3 h-14 px-9 rounded-full text-base font-bold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              style={{ background: "#fff", color: "#0A0A0A", border: "2px solid #0A0A0A", boxShadow: "5px 5px 0px 0px #0A0A0A" }}
            >
              قُل مرحباً
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] mb-12" style={{ background: "rgba(0,0,0,0.1)" }} />

        {/* Bottom grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="#" className="ar-heading text-3xl font-bold inline-block mb-3" style={{ color: "#0A0A0A" }}>
              أحمد علي<span style={{ color: "#fff" }}>.</span>
            </a>
            <p className="ar-body text-sm leading-relaxed mb-5" style={{ color: "rgba(0,0,0,0.5)" }}>
              استراتيجي رقمي شامل يصنع منتجات رقمية عالية الأثر وحملات وأنظمة نمو عبر الشرق الأوسط.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={s.label}
                  className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "#fff", border: "2px solid #0A0A0A", boxShadow: "2px 2px 0px 0px #0A0A0A" }}
                >
                  <i className={s.iconClass} style={{ fontSize: "16px", color: "#0A0A0A" }} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="ar-body text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "#0A0A0A" }}>التصفّح</h4>
            <div className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="ar-body text-sm font-medium transition-all duration-200 hover:-translate-x-1"
                  style={{ color: "rgba(0,0,0,0.6)" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact + Back to top */}
          <div>
            <h4 className="ar-body text-xs font-bold uppercase tracking-wider mb-4" style={{ color: "#0A0A0A" }}>تواصل معي</h4>
            <div className="flex flex-col gap-2.5 mb-6">
              <a href="mailto:hello@ahmedali.online" className="ar-body text-sm font-medium transition-all duration-200 hover:-translate-x-1" style={{ color: "rgba(0,0,0,0.6)" }}>
                hello@ahmedali.online
              </a>
              <a href="tel:+201011648156" className="text-sm font-medium transition-all duration-200 hover:-translate-x-1" style={{ color: "rgba(0,0,0,0.6)" }}>
                +20 101 164 8156
              </a>
              <p className="ar-body text-sm font-medium" style={{ color: "rgba(0,0,0,0.6)" }}>القاهرة، مصر</p>
            </div>

            <button
              onClick={scrollToTop}
              className="ar-body inline-flex items-center gap-2 h-10 px-5 rounded-full text-xs font-bold transition-all duration-200 hover:-translate-y-1 cursor-pointer"
              style={{ background: "#0A0A0A", color: "#4FFFB0", border: "2px solid #0A0A0A", boxShadow: "3px 3px 0px 0px rgba(0,0,0,0.2)" }}
            >
              <ArrowUp size={14} />
              الأعلى
            </button>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div style={{ background: "#0A0A0A" }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="ar-body text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            &copy; {new Date().getFullYear()} أحمد علي. جميع الحقوق محفوظة.
          </p>
          <p className="ar-body text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            تصميم وتطوير أحمد علي
          </p>
        </div>
      </div>
    </footer>
  );
}
