"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, Linkedin, MessageCircle, Send, MapPin, ArrowLeft } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const contactMethods = [
  {
    icon: Mail,
    label: "البريد الإلكتروني",
    value: "hello@ahmedali.online",
    href: "mailto:hello@ahmedali.online",
    color: "#4FFFB0",
  },
  {
    icon: Phone,
    label: "الهاتف",
    value: "+20 101 164 8156",
    href: "tel:+201011648156",
    color: "#4FFFB0",
  },
  {
    icon: MessageCircle,
    label: "واتساب",
    value: "تواصل الآن",
    href: "https://wa.me/201011648156",
    color: "#25D366",
    customIcon: "https://cdn.simpleicons.org/whatsapp/25D366",
  },
  {
    icon: Linkedin,
    label: "لينكد إن",
    value: "ahmed-alli",
    href: "https://linkedin.com/in/ahmed-alli",
    color: "#0A66C2",
  },
];

export default function ContactAr() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ct-anim-ar",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
        }),
      });

      if (!res.ok) throw new Error("Failed to send");
      setFormState("sent");
      form.reset();
    } catch {
      setFormState("error");
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden"
      style={{ background: "#0A0A0A", padding: "100px 24px" }}
    >
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(circle, #4FFFB0 0%, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="ct-anim-ar opacity-0 text-center mb-16">
          <p className="ar-script text-xl md:text-2xl mb-3" style={{ color: "#4FFFB0" }}>تواصل</p>
          <h2 className="ar-heading text-3xl md:text-4xl mb-4" style={{ color: "#fff" }}>لنعمل معاً</h2>
          <p className="ar-body text-base max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
            لديك مشروع في ذهنك؟ دعنا نحوّل رؤيتك إلى واقع.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Right - Contact info (2 cols) - in RTL this appears on the right */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Location card */}
            <div className="ct-anim-ar opacity-0 rounded-[20px] p-6" style={{ background: "#4FFFB0" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#fff", border: "1px solid #e0e0e0" }}>
                  <MapPin size={18} color="#0A0A0A" />
                </div>
                <div>
                  <p className="ar-body text-xs font-semibold" style={{ color: "rgba(0,0,0,0.5)" }}>مقيم في</p>
                  <p className="ar-body text-sm font-bold" style={{ color: "#0A0A0A" }}>القاهرة، مصر</p>
                </div>
              </div>
              <p className="ar-body text-xs" style={{ color: "rgba(0,0,0,0.5)" }}>متاح للعمل عن بُعد في الشرق الأوسط والعالم</p>
            </div>

            {/* Contact methods */}
            {contactMethods.map((method, i) => (
              <a
                key={i}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="ct-anim-ar opacity-0 rounded-[20px] p-5 flex items-center gap-4 group transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: "#fff" }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${method.color}15`, border: `1px solid ${method.color}30` }}>
                  {method.customIcon ? (
                    <img src={method.customIcon} alt="" width={22} height={22} className="object-contain" />
                  ) : (
                    <method.icon size={20} color={method.color} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="ar-body text-[10px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: "rgba(0,0,0,0.4)" }}>{method.label}</p>
                  <p className="text-sm font-bold truncate" dir="ltr" style={{ color: "#0A0A0A", textAlign: "right" }}>{method.value}</p>
                </div>
                <ArrowLeft size={16} className="flex-shrink-0 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" style={{ color: "#0A0A0A" }} />
              </a>
            ))}
          </div>

          {/* Left - Form (3 cols) - in RTL this appears on the left */}
          <div className="lg:col-span-3 ct-anim-ar opacity-0">
            <div className="rounded-[24px] p-8 md:p-10" style={{ background: "#fff" }}>
              <h3 className="ar-heading text-2xl md:text-3xl mb-2" style={{ color: "#0A0A0A", lineHeight: 1.5 }}>أرسل رسالة</h3>
              <p className="ar-body text-sm mb-8" style={{ color: "rgba(0,0,0,0.45)" }}>سأعود إليك خلال 24 ساعة.</p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="ar-body block text-xs font-bold mb-2" style={{ color: "#0A0A0A" }}>الاسم</label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="اسمك"
                      className="ar-body w-full h-12 px-4 rounded-xl text-sm outline-none transition-all duration-200"
                      style={{ background: "#f7f7f7", border: "2px solid #e8e8e8", color: "#0A0A0A" }}
                      onFocus={(e) => { e.target.style.borderColor = "#4FFFB0"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#e8e8e8"; }}
                    />
                  </div>
                  <div>
                    <label className="ar-body block text-xs font-bold mb-2" style={{ color: "#0A0A0A" }}>البريد الإلكتروني</label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      className="ar-body w-full h-12 px-4 rounded-xl text-sm outline-none transition-all duration-200"
                      style={{ background: "#f7f7f7", border: "2px solid #e8e8e8", color: "#0A0A0A" }}
                      onFocus={(e) => { e.target.style.borderColor = "#4FFFB0"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#e8e8e8"; }}
                    />
                  </div>
                </div>

                <div>
                  <label className="ar-body block text-xs font-bold mb-2" style={{ color: "#0A0A0A" }}>الموضوع</label>
                  <input
                    name="subject"
                    type="text"
                    placeholder="ما موضوع رسالتك؟"
                    className="ar-body w-full h-12 px-4 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{ background: "#f7f7f7", border: "2px solid #e8e8e8", color: "#0A0A0A" }}
                    onFocus={(e) => { e.target.style.borderColor = "#4FFFB0"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#e8e8e8"; }}
                  />
                </div>

                <div>
                  <label className="ar-body block text-xs font-bold mb-2" style={{ color: "#0A0A0A" }}>الرسالة</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="أخبرني عن مشروعك وأهدافك والجدول الزمني..."
                    className="ar-body w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 resize-none"
                    style={{ background: "#f7f7f7", border: "2px solid #e8e8e8", color: "#0A0A0A" }}
                    onFocus={(e) => { e.target.style.borderColor = "#4FFFB0"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#e8e8e8"; }}
                  />
                </div>

                {formState === "sent" ? (
                  <div className="ar-body flex items-center justify-center gap-2 h-14 rounded-full text-base font-bold" style={{ background: "#4FFFB0", color: "#0A0A0A" }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10l4 4 8-8" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    تم الإرسال! تفقد بريدك.
                  </div>
                ) : formState === "error" ? (
                  <div className="text-center">
                    <button
                      type="submit"
                      className="ar-body inline-flex items-center justify-center gap-3 h-14 w-full rounded-full text-base font-bold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                      style={{ background: "#ff4d4d", color: "#fff", border: "2px solid #0A0A0A", boxShadow: "5px 5px 0px 0px #0A0A0A" }}
                    >
                      <Send size={16} />
                      حاول مرة أخرى
                    </button>
                    <p className="ar-body text-xs mt-2" style={{ color: "rgba(0,0,0,0.4)" }}>حدث خطأ. حاول مرة أخرى.</p>
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={formState === "sending"}
                    className="ar-body inline-flex items-center justify-center gap-3 h-14 w-full rounded-full text-base font-bold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{
                      background: "#4FFFB0",
                      color: "#0A0A0A",
                      border: "2px solid #0A0A0A",
                      boxShadow: "5px 5px 0px 0px #0A0A0A",
                    }}
                  >
                    {formState === "sending" ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: "spin 1s linear infinite" }}><circle cx="8" cy="8" r="6" stroke="#0A0A0A" strokeWidth="2" strokeDasharray="28" strokeDashoffset="8" strokeLinecap="round"/></svg>
                        جاري الإرسال...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        إرسال الرسالة
                      </>
                    )}
                  </button>
                )}

                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
