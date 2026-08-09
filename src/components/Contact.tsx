"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, Linkedin, MessageCircle, Send, MapPin, ArrowRight } from "lucide-react";
/* eslint-disable @next/next/no-img-element */

gsap.registerPlugin(ScrollTrigger);

/* Same named ramp as every other section. */
const INK = "#04323A";
const TEAL = "#004D5A";
const MUTED = "#4E717A";
const MINT = "#CFF7EE";
const WASH = "#F4FBF9";
/* Semantic only — this is the one hue on the page that means "that failed". */
const DANGER = "#C2123A";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@ahmedali.online",
    href: "mailto:hello@ahmedali.online",
    color: "#004D5A",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+20 101 164 8156",
    href: "tel:+201011648156",
    color: "#004D5A",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat Now",
    href: "https://wa.me/201011648156",
    color: "#25D366",
    customIcon: "https://cdn.simpleicons.org/whatsapp/25D366",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "ahmed-alli",
    href: "https://linkedin.com/in/ahmed-alli",
    color: "#0A66C2",
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ct-anim",
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
      style={{ background: "#fff", padding: "100px 24px" }}
    >
      {/* A mint radial at 4% opacity used to sit here — it never rendered
          as anything, on this ground or any other. */}

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="ct-anim opacity-0 text-center mb-16">
          <p className="script text-xl md:text-2xl mb-3" style={{ color: TEAL }}>Get in Touch</p>
          <h2 className="heading text-3xl md:text-5xl mb-4" style={{ color: INK }}>Let&apos;s Work Together</h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: MUTED }}>
            Have a project in mind? Let&apos;s turn your vision into reality.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left - Contact info (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Location card */}
            <div className="ct-anim opacity-0 rounded-[20px] p-6" style={{ background: MINT, border: `2px solid ${TEAL}`, boxShadow: `5px 5px 0px 0px ${TEAL}` }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#fff", border: `1.5px solid ${TEAL}` }}>
                  <MapPin size={18} color={TEAL} />
                </div>
                <div>
                  <p className="text-xs font-semibold" style={{ color: "rgba(4,50,58,0.70)" }}>Based in</p>
                  <p className="text-sm font-bold" style={{ color: INK }}>Jeddah, Saudi Arabia</p>
                </div>
              </div>
              <p className="text-xs" style={{ color: "rgba(4,50,58,0.70)" }}>Available for remote work across MENA & worldwide</p>
            </div>

            {/* Contact methods */}
            {contactMethods.map((method, i) => (
              <a
                key={i}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="ct-anim opacity-0 rounded-[20px] p-5 flex items-center gap-4"
                style={{ background: WASH, border: `2px solid ${TEAL}`, boxShadow: `5px 5px 0px 0px ${TEAL}` }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#fff", border: `1.5px solid ${TEAL}` }}>
                  {method.customIcon ? (
                    <img src={method.customIcon} alt="" width={22} height={22} className="object-contain" />
                  ) : (
                    <method.icon size={20} color={method.color} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: MUTED }}>{method.label}</p>
                  <p className="text-sm font-bold truncate" style={{ color: INK }}>{method.value}</p>
                </div>
                <ArrowRight size={16} className="flex-shrink-0" style={{ color: TEAL }} />
              </a>
            ))}
          </div>

          {/* Right - Form (3 cols) */}
          <div className="lg:col-span-3 ct-anim opacity-0 flex">
            <div className="rounded-[20px] p-6 md:p-8 w-full flex flex-col" style={{ background: WASH, border: `2px solid ${TEAL}`, boxShadow: `6px 6px 0px 0px ${TEAL}` }}>
              <h3 className="heading text-2xl mb-1.5" style={{ color: INK, lineHeight: 1.35 }}>Send a Message</h3>
              <p className="text-sm mb-6" style={{ color: MUTED }}>I&apos;ll get back to you within 24 hours.</p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-2" style={{ color: INK }}>Name</label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="w-full h-11 px-4 rounded-xl text-sm outline-none transition-all duration-200"
                      style={{ background: "#fff", border: `2px solid ${TEAL}`, color: INK }}
                      onFocus={(e) => { e.target.style.boxShadow = `3px 3px 0px 0px ${TEAL}`; }}
                      onBlur={(e) => { e.target.style.boxShadow = "none"; }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-2" style={{ color: INK }}>Email</label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      className="w-full h-11 px-4 rounded-xl text-sm outline-none transition-all duration-200"
                      style={{ background: "#fff", border: `2px solid ${TEAL}`, color: INK }}
                      onFocus={(e) => { e.target.style.boxShadow = `3px 3px 0px 0px ${TEAL}`; }}
                      onBlur={(e) => { e.target.style.boxShadow = "none"; }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-2" style={{ color: INK }}>Subject</label>
                  <input
                    name="subject"
                    type="text"
                    placeholder="What's this about?"
                    className="w-full h-11 px-4 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{ background: "#fff", border: `2px solid ${TEAL}`, color: INK }}
                    onFocus={(e) => { e.target.style.boxShadow = `3px 3px 0px 0px ${TEAL}`; }}
                    onBlur={(e) => { e.target.style.boxShadow = "none"; }}
                  />
                </div>

                <div className="flex flex-col flex-1 min-h-0">
                  <label className="block text-xs font-bold mb-2" style={{ color: INK }}>Message</label>
                  <textarea
                    name="message"
                    required
                    rows={3}
                    placeholder="Tell me about your project, goals, and timeline..."
                    className="w-full flex-1 min-h-[80px] px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 resize-none"
                    style={{ background: "#fff", border: `2px solid ${TEAL}`, color: INK }}
                    onFocus={(e) => { e.target.style.boxShadow = `3px 3px 0px 0px ${TEAL}`; }}
                    onBlur={(e) => { e.target.style.boxShadow = "none"; }}
                  />
                </div>

                {formState === "sent" ? (
                  <div className="flex items-center justify-center gap-2 h-12 rounded-full text-base font-bold" style={{ background: MINT, color: INK, border: `2px solid ${TEAL}` }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10l4 4 8-8" stroke="#04323A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Message Sent! Check your inbox.
                  </div>
                ) : formState === "error" ? (
                  <div className="text-center">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-3 h-12 w-full rounded-full text-base font-bold cursor-pointer"
                      style={{ background: "#fff", color: DANGER, border: `2px solid ${DANGER}`, boxShadow: `5px 5px 0px 0px ${DANGER}` }}
                    >
                      <Send size={16} />
                      Try Again
                    </button>
                    <p className="text-xs mt-2" style={{ color: DANGER }}>Something went wrong. Please try again.</p>
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={formState === "sending"}
                    className="inline-flex items-center justify-center gap-3 h-12 w-full rounded-full text-base font-bold cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{
                      background: MINT,
                      color: INK,
                      border: `2px solid ${TEAL}`,
                      boxShadow: `5px 5px 0px 0px ${TEAL}`,
                    }}
                  >
                    {formState === "sending" ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: "spin 1s linear infinite" }}><circle cx="8" cy="8" r="6" stroke="#04323A" strokeWidth="2" strokeDasharray="28" strokeDashoffset="8" strokeLinecap="round"/></svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
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
