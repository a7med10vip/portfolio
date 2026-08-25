"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AlertTriangle, ArrowLeft, BadgeCheck, Building2, CalendarDays, CheckCircle2,
  Clock, Compass, Factory, FileSearch, Gauge, Globe2, Layers, Link2Off,
  Lock, Package, Search, ShieldAlert, Sparkles, Store, Users,
} from "lucide-react";
import {
  AUDIT, COMPARE, CONCEPT, ESTATE, FINDINGS, OPPORTUNITIES, STATUS_LABEL, STRENGTHS,
} from "./data";
import { S, S_SOFT, D, LINE, RULE, MONO, SEV } from "@/components/sunbulah/theme";
import SunbulahNav from "@/components/sunbulah/SunbulahNav";
import SunbulahChat from "@/components/sunbulah/SunbulahChat";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════════════════
   مجموعة السنبلة — تدقيق الحضور الرقمي، وتصور لصفحة رئيسية جديدة.
   كل رقم هنا قيس على الموقع المنشور بتاريخ 24 أغسطس 2026.
   ═══════════════════════════════════════════════════════════════════════════ */

const AREA_ICON: Record<string, typeof Lock> = {
  "الوصول": Link2Off, "المنصة": ShieldAlert, "الظهور": Search, "المحتوى": Layers, "الأداء": Gauge,
};

export default function Page() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (calm) {
        gsap.set(".sb-hero, .sb-slide, .sb-item", { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(".sb-hero", { y: 34, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: "power4.out", delay: 0.15 });
      gsap.utils.toArray<HTMLElement>(".sb-slide").forEach((el) => {
        gsap.fromTo(el, { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>(".sb-stagger").forEach((el) => {
        gsap.fromTo(el.querySelectorAll(".sb-item"), { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.055, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>(".sb-count").forEach((el) => {
        const to = Number(el.dataset.to ?? 0);
        const o = { v: 0 };
        gsap.to(o, { v: to, duration: 1.3, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 93%", once: true },
          onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString("en-US"); } });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const critical = FINDINGS.filter((f) => f.severity === "critical").length;
  const high = FINDINGS.filter((f) => f.severity === "high").length;

  return (
    <div ref={root} style={{ background: "#fff", color: D, overflowX: "hidden" }}>
      <SunbulahNav />
      <SunbulahChat />

      {/* ══ الغلاف ═════════════════════════════════════════════════════════ */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ background: "#fff" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, rgba(20,19,15,0.045) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{ width: 860, height: 340, background: `radial-gradient(ellipse, ${S}22 0%, transparent 70%)` }} />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center" style={{ paddingTop: 72, paddingBottom: 48 }}>
          <div className="sb-hero opacity-0 mb-7">
            <img src="/sunbulah/brand/group.webp" alt="مجموعة السنبلة" style={{ width: 210, height: "auto" }} />
          </div>

          <div className="sb-hero opacity-0 mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11.5px]"
              style={{ background: `${S}18`, color: D, border: `1px solid ${S}` }}>
              <FileSearch size={13} color={D} /> وثيقة مستقلة · غير مطلوبة · {AUDIT.date}
            </span>
          </div>

          <h1 className="sb-hero opacity-0 heading text-center mb-6"
            style={{ fontSize: "clamp(32px, 7vw, 74px)", lineHeight: 1.34, color: D }}>
            موقع لا يشبه <span style={{ color: S }}>حجم المجموعة</span>
          </h1>

          <p className="sb-hero opacity-0 body-serif text-center text-[16px] leading-loose mb-3" style={{ color: D, opacity: .78, maxWidth: 660 }}>
            مجموعة السنبلة تصنّع الغذاء منذ 1980، وتعمل في 35 دولة، وتملك أربع علامات.
            وموقعها المؤسسي اليوم اثنتان وعشرون صفحة على نظام إدارة محتوى انتهى دعمه، بقالبه
            التجريبي كما يأتي من المصنع.
          </p>
          <p className="sb-hero opacity-0 heading text-[17px] mb-10" style={{ color: S }}>
            <span className="ltr">sunbulahgroup.com</span>
          </p>

          {/* المُعِدّ / الجهة */}
          <div className="sb-hero opacity-0 grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 w-full max-w-2xl">
            <div className="rounded-[16px] p-5" style={{ background: "#fff", border: `1px solid ${LINE}` }}>
              <p className="text-[10.5px] mb-2.5" style={{ color: S }}>إعداد</p>
              <p className="heading text-[15px] mb-1">أحمد علي</p>
              <p className="text-[11.5px]" style={{ color: D, opacity: .55 }}>رئيس المنتجات الرقمية والنمو · مجموعة إيموشن</p>
              <p className="text-[11px] ltr mt-1" style={{ color: D, opacity: .4 }}>ahmed.ali@emotiongrp.com</p>
            </div>
            <div className="rounded-[16px] p-5" style={{ background: "#fff", border: `2px solid ${S}`, boxShadow: `3px 3px 0px 0px ${D}` }}>
              <p className="text-[10.5px] mb-2.5" style={{ color: S }}>الجهة</p>
              <p className="heading text-[15px] mb-1">مجموعة السنبلة للأغذية</p>
              <p className="text-[11.5px]" style={{ color: D, opacity: .55 }}>جدة · المملكة العربية السعودية</p>
              <p className="text-[11px] mt-1" style={{ color: D, opacity: .4 }}>تأسست 1980 · أربع علامات · 35 دولة</p>
            </div>
          </div>

          {/* شريط الأرقام */}
          <div className="sb-hero opacity-0 w-full max-w-3xl mb-9">
            <div className="flex items-stretch justify-center"
              style={{ background: "#fff", border: `1px solid ${LINE}`, borderRadius: 16, overflow: "hidden" }}>
              {[
                { n: FINDINGS.length, l: "ملاحظة" },
                { n: critical, l: "حرجة" },
                { n: high, l: "مرتفعة" },
                { n: STRENGTHS.length, l: "أساس قائم" },
                { n: 8, l: "عنوان رقمي" },
              ].map((x, i) => (
                <div key={x.l} className="flex-1 flex flex-col items-center justify-center py-5 px-2 relative"
                  style={{ borderLeft: i < 4 ? `1px solid ${RULE}` : "none" }}>
                  <span className="heading tabular-nums sb-count ltr" data-to={x.n} style={{ fontSize: 24, lineHeight: 1, color: D }}>0</span>
                  <span className="text-[10px] mt-2 text-center" style={{ color: D, opacity: .45 }}>{x.l}</span>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-full" style={{ height: 3, width: 32, background: S }} />
                </div>
              ))}
            </div>
          </div>

          <div className="sb-hero opacity-0 flex flex-col items-center gap-2">
            <div style={{ width: 24, height: 38, border: `1.5px solid ${D}22`, borderRadius: 12, display: "flex", justifyContent: "center", paddingTop: 5 }}>
              <div style={{ width: 3, height: 6, borderRadius: 2, background: S, animation: "sbScroll 1.6s ease-in-out infinite" }} />
            </div>
          </div>
        </div>
        <style>{`@keyframes sbScroll{0%{transform:translateY(0);opacity:1}75%{transform:translateY(9px);opacity:0}76%{transform:translateY(0);opacity:0}100%{opacity:1}}`}</style>
      </section>

      {/* ══ 01 · المنهج ════════════════════════════════════════════════════ */}
      <Section id="s01" n="01" eyebrow="القسم الأول" title="كيف قيس" accent="هذا"
        sub="لا رأي في هذه الوثيقة. كل جملة فيها مسبوقة بقياس.">
        <p className="body-serif text-[16px] leading-loose text-center max-w-3xl mx-auto mb-12" style={{ color: D, opacity: .82 }}>
          {AUDIT.method}
        </p>
        <div className="sb-stagger grid gap-4 sm:grid-cols-3 max-w-4xl mx-auto">
          {[
            { i: Compass, t: "من الخارج فقط", d: "كل ما هنا مرئي لأي زائر. لا وصول، ولا صلاحيات، ولا بيانات داخلية." },
            { i: Clock, t: "قابل للتكرار", d: "كل رقم صدر عن أمر أو تشغيل متصفح يمكن إعادته على الموقع اليوم." },
            { i: BadgeCheck, t: "ما لم يُتحقق منه حُذف", d: "حيث تعذّر التأكد، أُسقط الادعاء بدل تقديره أو تقريبه." },
          ].map((c) => (
            <div key={c.t} className="sb-item rounded-[18px] p-7" style={{ border: `1px solid ${LINE}` }}>
              <span className="grid place-items-center rounded-xl mb-5" style={{ width: 42, height: 42, background: `${S}14` }}>
                <c.i size={19} color={S} />
              </span>
              <p className="heading text-[17px] mb-3">{c.t}</p>
              <p className="text-[13px] leading-loose" style={{ color: D, opacity: .7 }}>{c.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ══ 02 · الحضور الرقمي ═════════════════════════════════════════════ */}
      <Section id="s02" n="02" eyebrow="القسم الثاني" title="الحضور" accent="الرقمي" tinted
        sub="ثمانية عناوين تحمل اسم المجموعة أو إحدى علاماتها. ثلاثة لا تعمل، واثنان يؤديان الوظيفة نفسها بمسارين.">
        <div className="sb-stagger max-w-4xl mx-auto" style={{ border: `1px solid ${LINE}`, borderRadius: 20, overflow: "hidden", background: "#fff" }}>
          {ESTATE.map((p, i) => {
            const bad = p.status === "broken";
            const Icon = bad ? AlertTriangle : p.status === "weak" ? Building2 : CheckCircle2;
            const c = bad ? "#B4231E" : p.status === "weak" ? S : "#2E7D32";
            return (
              <div key={p.url + p.name} className="sb-item flex flex-col sm:flex-row sm:items-center gap-4 px-6 py-5"
                style={{ borderTop: i ? `1px solid ${RULE}` : "none" }}>
                <span className="grid place-items-center rounded-xl shrink-0" style={{ width: 38, height: 38, background: `${c}14` }}>
                  <Icon size={17} color={c} />
                </span>
                <div className="sm:w-48 shrink-0">
                  <p className="heading text-[15px]">{p.name}</p>
                  <p className="text-[11px] ltr mt-1" style={{ color: D, opacity: .45, fontFamily: MONO }}>{p.url}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12.5px] mb-1" style={{ color: c }}>{p.what}</p>
                  <p className="text-[12.5px] leading-loose" style={{ color: D, opacity: .78 }}>{p.note}</p>
                </div>
                <span className="text-[11px] px-3 py-1.5 rounded-full shrink-0 self-start sm:self-center"
                  style={{ background: bad ? c : `${c}18`, color: bad ? "#fff" : c }}>
                  {STATUS_LABEL[p.status]}
                </span>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ══ 03 · ما يعمل جيدًا ═════════════════════════════════════════════ */}
      <Section id="s03" n="03" eyebrow="القسم الثالث" title="ما يعمل" accent="جيدًا"
        sub="تدقيق لا يذكر إلا العيوب يُقرأ هجومًا لا تقييمًا. هذه قياسات موجبة، أُخذت بالطريقة نفسها.">
        <div className="sb-stagger grid gap-4 md:grid-cols-2 max-w-4xl mx-auto">
          {STRENGTHS.map((x) => (
            <div key={x.t} className="sb-item rounded-[18px] p-7" style={{ border: `1px solid #2E7D3233`, background: "#fff" }}>
              <div className="flex items-start gap-3.5 mb-4">
                <span className="grid place-items-center rounded-xl shrink-0" style={{ width: 36, height: 36, background: "#2E7D3214" }}>
                  <CheckCircle2 size={17} color="#2E7D32" />
                </span>
                <p className="heading text-[17px] pt-1.5">{x.t}</p>
              </div>
              <p className="text-[13px] leading-loose mb-4" style={{ color: D, opacity: .78 }}>{x.d}</p>
              <p className="text-[11px] px-3 py-2 rounded-lg ltr" style={{ background: "#2E7D320D", color: "#2E7D32", fontFamily: MONO, direction: "ltr", textAlign: "left" }}>
                {x.proof}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ══ 04 · ما وُجد ═══════════════════════════════════════════════════ */}
      <Section id="s04" n="04" eyebrow="القسم الرابع" title="ما" accent="وُجد" tinted
        sub="ثلاث عشرة ملاحظة، مرتبة بالأثر لا بترتيب اكتشافها. كل واحدة تحمل قياسها الحرفي.">
        <div className="space-y-5 max-w-4xl mx-auto">
          {FINDINGS.map((f) => {
            const sev = SEV[f.severity];
            const Icon = AREA_ICON[f.area] ?? Lock;
            const crit = f.severity === "critical";
            return (
              <article key={f.id} className="sb-slide opacity-0 rounded-[20px] overflow-hidden"
                style={{ border: `1px solid ${crit ? "#B4231E33" : LINE}`, background: "#fff", boxShadow: crit ? `3px 3px 0 0 #B4231E22` : "none" }}>
                <div className="flex items-center justify-between gap-3 px-6 py-4" style={{ background: crit ? "#B4231E0A" : RULE }}>
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="heading text-[13px] ltr" style={{ color: crit ? "#B4231E" : S }}>{f.n}</span>
                    <span style={{ width: 18, height: 1, background: `${crit ? "#B4231E" : S}66` }} />
                    <Icon size={14} color={crit ? "#B4231E" : S} />
                    <span className="text-[11.5px]" style={{ color: D, opacity: .7 }}>{f.area}</span>
                  </div>
                  <span className="text-[11px] px-3 py-1 rounded-full shrink-0" style={{ background: sev.bg, color: sev.fg }}>{sev.label}</span>
                </div>

                <div className="px-6 py-7 md:px-8">
                  <h3 className="heading mb-5" style={{ fontSize: 22, lineHeight: 1.5 }}>{f.title}</h3>
                  <p className="body-serif text-[14.5px] leading-loose mb-5" style={{ color: D, opacity: .85 }}>{f.evidence}</p>

                  {f.proof && (
                    <pre className="text-[11.5px] px-4 py-3 rounded-xl mb-6"
                      style={{ background: "#FDFCFA", border: `1px solid ${LINE}`, color: D, fontFamily: MONO,
                        direction: "ltr", textAlign: "left", overflowX: "auto", maxWidth: "100%" }}>
                      {f.proof}
                    </pre>
                  )}

                  <div className="grid gap-6 sm:grid-cols-2 pt-5" style={{ borderTop: `1px solid ${RULE}` }}>
                    <div>
                      <p className="text-[11px] mb-2.5 flex items-center gap-1.5" style={{ color: D, opacity: .5 }}>
                        <AlertTriangle size={12} /> الكلفة
                      </p>
                      <p className="text-[13px] leading-loose" style={{ color: D, opacity: .82 }}>{f.impact}</p>
                    </div>
                    <div>
                      <p className="text-[11px] mb-2.5 flex items-center gap-1.5" style={{ color: S }}>
                        <CheckCircle2 size={12} /> المعالجة
                      </p>
                      <p className="text-[13px] leading-loose" style={{ color: D, opacity: .82 }}>{f.fix}</p>
                      <span className="inline-flex items-center gap-1.5 text-[11px] mt-3 px-3 py-1.5 rounded-full" style={{ background: `${S}14`, color: S }}>
                        <Clock size={11} /> {f.effort}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      {/* ══ 05 · أمام النظير ═══════════════════════════════════════════════ */}
      <section id="s05" className="sb-slide opacity-0" style={{ padding: "96px 24px", background: D }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11.5px] mb-4" style={{ color: S_SOFT }}>القسم الخامس</p>
            <h2 className="heading mb-5" style={{ fontSize: "clamp(26px, 4.6vw, 46px)", lineHeight: 1.4, color: "#fff" }}>
              أمام <span style={{ color: S_SOFT }}>النظير</span>
            </h2>
            <p className="body-serif text-[15.5px] leading-loose max-w-2xl mx-auto" style={{ color: "#fff", opacity: .68 }}>
              المراعي شركة أغذية سعودية بحجم مقارن. الأرقام أدناه قيست على الموقعين في اليوم
              نفسه، بالأداة نفسها، وبالمقاس نفسه.
            </p>
          </div>

          <div className="sb-stagger rounded-[20px] overflow-hidden" style={{ border: "1px solid rgba(255,255,255,.14)" }}>
            <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-6 py-4" style={{ background: "rgba(255,255,255,.05)" }}>
              <span className="text-[11px]" style={{ color: "#fff", opacity: .5 }}>المقياس</span>
              <span className="text-[11px] text-center w-28" style={{ color: S_SOFT }}>السنبلة</span>
              <span className="text-[11px] text-center w-28" style={{ color: "#fff", opacity: .5 }}>المراعي</span>
            </div>
            {COMPARE.map((r, i) => (
              <div key={r.metric} className="sb-item grid grid-cols-[1fr_auto_auto] gap-4 items-center px-6 py-4"
                style={{ borderTop: `1px solid rgba(255,255,255,.08)` }}>
                <span className="text-[13px]" style={{ color: "#fff", opacity: .85 }}>{r.metric}</span>
                <span className="text-[13px] text-center w-28 ltr"
                  style={{ color: r.win === "them" ? "#7BC67E" : r.win === "peer" ? "#FF9A94" : "#fff", fontFamily: MONO }}>
                  {r.them}
                </span>
                <span className="text-[13px] text-center w-28 ltr" style={{ color: "#fff", opacity: .55, fontFamily: MONO }}>
                  {r.peer}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[12px] text-center mt-6" style={{ color: "#fff", opacity: .45 }}>
            الأخضر حيث تتقدم السنبلة، والأحمر حيث تتأخر. لا يتقدم النظير في كل شيء.
          </p>
        </div>
      </section>

      {/* ══ 06 · عصران ═════════════════════════════════════════════════════ */}
      <Section id="s06" n="06" eyebrow="القسم السادس" title="عصران وشركة" accent="واحدة"
        sub="لا حاجة إلى الجدال بأن الموقع المؤسسي قديم. يكفي وضعه إلى جوار موقع المستهلك الذي تملكه المجموعة نفسها.">
        <div className="sb-stagger grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
          {[
            { shot: "group-home-desktop", t: "الموقع المؤسسي", u: "sunbulahgroup.com", n: "Joomla 3 · قالب protostar الافتراضي · 22 صفحة", bad: true },
            { shot: "consumer-home-desktop", t: "موقع المستهلك", u: "sunbulah.com", n: "Next.js · ثنائي اللغة · تصوير حديث · يُحدَّث فعليًا", bad: false },
          ].map((c) => (
            <figure key={c.shot} className="sb-item m-0">
              <div className="overflow-hidden" style={{ borderRadius: 14, border: `1px solid ${c.bad ? "#B4231E33" : LINE}`, boxShadow: c.bad ? "none" : `3px 3px 0 0 ${S}22` }}>
                <div className="flex items-center gap-1.5 px-3.5" style={{ height: 30, borderBottom: `1px solid ${RULE}` }}>
                  {["#E8E3D8", "#EFEBE2", "#F4F1EA"].map((x) => <span key={x} style={{ width: 7, height: 7, borderRadius: 99, background: x }} />)}
                  <span className="mr-2.5 text-[10px] ltr" style={{ color: D, opacity: .45, fontFamily: MONO }}>{c.u}</span>
                </div>
                <img src={`/sunbulah/audit/${c.shot}.webp`} alt={c.t} loading="lazy" decoding="async" style={{ display: "block", width: "100%" }} />
              </div>
              <figcaption className="mt-4">
                <p className="heading text-[17px] mb-1.5" style={{ color: c.bad ? D : S }}>{c.t}</p>
                <p className="text-[12px] ltr" style={{ color: D, opacity: .55, fontFamily: MONO }}>{c.n}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="max-w-2xl mx-auto mt-14 rounded-[18px] p-8 text-center" style={{ border: `2px solid ${S}`, boxShadow: `3px 3px 0 0 ${D}` }}>
          <p className="body-serif text-[15.5px] leading-loose">
            الشركة نفسها، والميزانية نفسها، وفريق واحد. الفارق أن أحد الموقعين أُعيد بناؤه
            والآخر لم يُفتح منذ عشر سنوات.
          </p>
        </div>
      </Section>

      {/* ══ 07 · من أين يُبدأ ══════════════════════════════════════════════ */}
      <Section id="s07" n="07" eyebrow="القسم السابع" title="من أين" accent="يُبدأ" tinted
        sub="ليست كل ملاحظة تحتاج إعادة بناء. أربع منها تُغلق في يوم واحد، وأثرها فوري.">
        <div className="sb-stagger space-y-4 max-w-3xl mx-auto">
          {[
            { i: Clock, n: "أولًا", t: "خلال يوم", c: S,
              items: ["إصلاح شهادة بوابة التوظيف، أو تحويل الرابط إلى البوابة العاملة", "عنوان ووصف لكل صفحة من الاثنتين والعشرين", "تصحيح lang وdir على النسخة العربية", "إصلاح الرابط المعطّل إلى موقع المستهلك"] },
            { i: Gauge, n: "ثانيًا", t: "خلال أسبوع", c: "#1F6F6B",
              items: ["وسوم المشاركة وبيانات Organization المنظمة", "خريطة موقع، وترويسات تخزين مؤقت", "تحميل مؤجل للصور، وأهداف لمس بالمقاس الصحيح"] },
            { i: Layers, n: "ثالثًا", t: "إعادة البناء", c: "#7A5C3E",
              items: ["منصة مدعومة، وأفضلها ما يعمل عليه موقع المستهلك أصلًا", "صفحة حقيقية لكل علامة، وصفحة جامعة لها", "أقسام التصنيع والانتشار والقيادة وغرفة الأخبار", "تصوير بضعف دقة الشاشة"] },
          ].map((p) => (
            <div key={p.n} className="sb-item rounded-[18px] overflow-hidden" style={{ border: `1px solid ${LINE}`, background: "#fff" }}>
              <div className="flex items-center gap-3 px-6 py-4" style={{ background: `${p.c}12` }}>
                <span className="grid place-items-center rounded-lg" style={{ width: 30, height: 30, background: `${p.c}1F` }}>
                  <p.i size={15} color={p.c} />
                </span>
                <span className="heading text-[15px]" style={{ color: p.c }}>{p.n}</span>
                <span style={{ width: 18, height: 1, background: `${p.c}55` }} />
                <span className="text-[12.5px]" style={{ color: D, opacity: .7 }}>{p.t}</span>
              </div>
              <ul className="px-6 py-5 space-y-3">
                {p.items.map((it) => (
                  <li key={it} className="flex gap-3 text-[13.5px] leading-loose" style={{ color: D, opacity: .85 }}>
                    <span style={{ marginTop: 10, width: 12, height: 2, background: p.c, flexShrink: 0 }} />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ══ 08 · ما يمكن عمله ══════════════════════════════════════════════ */}
      <Section id="s08" n="08" eyebrow="القسم الثامن" title="ما يمكن" accent="عمله"
        sub="ست فرص، ولكل واحدة أثر يمكن ملاحظته. لا أسعار هنا ولا نطاق عمل — الغرض أن تُقرأ لا أن تُشترى.">
        <div className="sb-stagger grid gap-4 md:grid-cols-2 max-w-5xl mx-auto">
          {OPPORTUNITIES.map((o) => (
            <div key={o.n} className="sb-item rounded-[18px] p-7 flex flex-col" style={{ border: `1px solid ${LINE}` }}>
              <p className="heading text-[13px] mb-4 ltr" style={{ color: S }}>{o.n}</p>
              <p className="heading text-[19px] mb-3">{o.t}</p>
              <p className="text-[13px] leading-loose mb-5" style={{ color: D, opacity: .75 }}>{o.d}</p>
              <p className="text-[12.5px] leading-loose mt-auto pt-4 flex gap-2.5" style={{ borderTop: `1px solid ${RULE}`, color: S }}>
                <ArrowLeft size={14} className="shrink-0 mt-0.5" />
                {o.outcome}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ══ الفاصل إلى التصور ══════════════════════════════════════════════ */}
      <section style={{ padding: "88px 24px", background: D }}>
        <div className="sb-slide opacity-0 max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11.5px] mb-7"
            style={{ background: "rgba(255,255,255,.08)", color: S_SOFT, border: `1px solid ${S}55` }}>
            <Sparkles size={13} /> الجزء الثاني
          </span>
          <h2 className="heading mb-7" style={{ fontSize: "clamp(28px, 5vw, 52px)", lineHeight: 1.36, color: "#fff" }}>
            وهكذا يمكن أن يبدو.
          </h2>
          <p className="body-serif text-[16px] leading-loose" style={{ color: "#fff", opacity: .72, maxWidth: 620, margin: "0 auto" }}>
            ما يلي تصور لصفحة رئيسية، مبني على ما هي عليه المجموعة فعلًا لا على ما يمكن تخيّله:
            الأرقام من بياناتهم المنشورة، والصور من أصولهم هم، والعلامات الأربع بشعاراتها كما هي.
          </p>
        </div>
      </section>

      <ConceptHero />
      <ConceptScale />
      <ConceptBrands />
      <ConceptMake />
      <ConceptGlobal />
      <ConceptHistory />

      {/* ══ الخاتمة ════════════════════════════════════════════════════════ */}
      <section style={{ padding: "80px 24px 100px" }}>
        <div className="sb-slide opacity-0 max-w-3xl mx-auto rounded-[24px] p-9 md:p-14 text-center"
          style={{ border: `2px solid ${S}`, boxShadow: `4px 4px 0 0 ${D}` }}>
          <img src="/sunbulah/brand/group.webp" alt="مجموعة السنبلة" style={{ width: 168, height: "auto", margin: "0 auto 28px" }} />
          <p className="text-[11.5px] mb-5" style={{ color: S }}>عن هذه الوثيقة</p>
          <p className="body-serif text-[15.5px] leading-loose mb-9" style={{ color: D, opacity: .85 }}>
            أُعدّت من الخارج، دون تكليف ودون وصول إلى أي نظام. كل قياس فيها قابل لإعادة التشغيل
            على الموقع اليوم. ولا تتضمن أسعارًا ولا نطاق عمل، لأن غرضها أن تُقرأ لا أن تُشترى.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <a href="mailto:ahmed.ali@emotiongrp.com" className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[13px] ltr"
              style={{ background: S, color: "#fff" }}>
              ahmed.ali@emotiongrp.com
            </a>
            <a href="https://www.linkedin.com/in/ahmed-alli" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[13px]" style={{ border: `1.5px solid ${S}`, color: D }}>
              <Users size={14} /> LinkedIn
            </a>
          </div>
          <p className="heading text-[17px] mb-1.5">أحمد علي</p>
          <p className="text-[12.5px]" style={{ color: D, opacity: .6 }}>رئيس المنتجات الرقمية والنمو · مجموعة إيموشن</p>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════ التصور ════════════════════════════════════ */

function ConceptHero() {
  return (
    <section id="s09" className="sb-slide opacity-0 relative">
      <div className="relative overflow-hidden" style={{ height: "min(86vh, 780px)" }}>
        <img src="/sunbulah/hero-a.webp" alt="" loading="lazy" decoding="async"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div className="absolute inset-0 flex items-center"
          style={{ background: "linear-gradient(to left, rgba(20,19,15,.9) 0%, rgba(20,19,15,.64) 46%, rgba(20,19,15,.22) 100%)" }}>
          <div className="px-7 md:px-16 max-w-3xl">
            <img src="/sunbulah/brand/group.webp" alt="" style={{ width: 150, height: "auto", marginBottom: 26, filter: "brightness(0) invert(1)" }} />
            <p className="text-[11.5px] mb-5" style={{ color: S_SOFT }}>{CONCEPT.hero.eyebrow}</p>
            <h2 className="heading" style={{ fontSize: "clamp(30px, 5.6vw, 66px)", lineHeight: 1.36, color: "#fff" }}>
              {CONCEPT.hero.line1}<br />{CONCEPT.hero.line2}
            </h2>
            <p className="body-serif mt-7 text-[16px] leading-loose" style={{ color: "#fff", opacity: .82 }}>{CONCEPT.hero.sub}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConceptScale() {
  const ICONS = [CalendarDays, Globe2, Users, Package];
  return (
    <section id="s10" className="sb-slide opacity-0" style={{ padding: "88px 24px" }}>
      <div className="sb-stagger max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-px"
        style={{ background: LINE, border: `1px solid ${LINE}`, borderRadius: 20, overflow: "hidden" }}>
        {CONCEPT.scale.map((x, i) => {
          const Icon = ICONS[i] ?? Package;
          return (
            <div key={x.l} className="sb-item flex flex-col items-center justify-center text-center px-4 py-12" style={{ background: "#fff" }}>
              <span className="grid place-items-center rounded-xl mb-5" style={{ width: 40, height: 40, background: `${S}14` }}>
                <Icon size={18} color={S} />
              </span>
              <span className="heading ltr" style={{ fontSize: 42, lineHeight: 1, color: S }}>{x.n}</span>
              <span className="heading text-[15px] mt-4">{x.l}</span>
              <span className="text-[11.5px] mt-2 leading-loose" style={{ color: D, opacity: .55 }}>{x.s}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ConceptBrands() {
  return (
    <section id="s11" style={{ padding: "24px 24px 88px" }}>
      <div className="max-w-6xl mx-auto">
        <div className="sb-slide opacity-0 text-center mb-14">
          <p className="text-[11.5px] mb-4" style={{ color: S }}>العلامات</p>
          <h3 className="heading" style={{ fontSize: "clamp(26px, 4.4vw, 46px)", lineHeight: 1.4 }}>
            أربع علامات، لا أربعة شعارات.
          </h3>
        </div>
        <div className="sb-stagger space-y-5">
          {CONCEPT.brands.map((b) => (
            <div key={b.key} className="sb-item rounded-[22px] overflow-hidden grid md:grid-cols-[1fr_280px]" style={{ border: `1px solid ${LINE}` }}>
              <div className="p-8 md:p-11">
                <div className="flex items-baseline gap-3 mb-5 flex-wrap">
                  <span className="heading" style={{ fontSize: 32, color: b.tone }}>{b.name}</span>
                  <span className="text-[12px] ltr" style={{ color: D, opacity: .4, fontFamily: MONO }}>{b.latin}</span>
                  {b.since !== "—" && (
                    <span className="text-[11px] px-2.5 py-1 rounded-full ltr" style={{ background: `${b.tone}16`, color: b.tone }}>{b.since}</span>
                  )}
                </div>
                <p className="body-serif text-[17px] leading-loose mb-4">{b.line}</p>
                <p className="text-[13px] leading-loose" style={{ color: D, opacity: .7 }}>{b.note}</p>
              </div>
              <div className="relative grid place-items-center p-8" style={{ background: `${b.tone}0C`, minHeight: 160 }}>
                <img src={`/sunbulah/brand/${b.key}.webp`} alt={b.name} loading="lazy" decoding="async"
                  style={{ maxWidth: 168, width: "100%", height: "auto", mixBlendMode: "multiply" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConceptMake() {
  const ICONS = [Factory, Store, Building2];
  return (
    <section id="s12" className="sb-slide opacity-0" style={{ padding: "88px 24px" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11.5px] mb-4" style={{ color: S }}>التصنيع والفئات</p>
          <h3 className="heading mb-6" style={{ fontSize: "clamp(26px, 4.4vw, 46px)", lineHeight: 1.4 }}>
            يُصنع بدقة، ويُبنى على نطاق.
          </h3>
          <p className="body-serif text-[16px] leading-loose max-w-2xl mx-auto" style={{ color: D, opacity: .8 }}>
            الجزء الذي لا يعرضه أي موقع سلع استهلاكية، وهو بالضبط ما يميّز مجموعة تصنيع عن شركة تجارية.
          </p>
        </div>

        <div className="sb-stagger grid gap-4 md:grid-cols-3 mb-16">
          {CONCEPT.ecosystem.map((e, i) => {
            const Icon = ICONS[i] ?? Factory;
            return (
              <div key={e.n} className="sb-item rounded-[18px] p-8" style={{ border: `1px solid ${LINE}` }}>
                <span className="grid place-items-center rounded-xl mb-5" style={{ width: 42, height: 42, background: `${S}14` }}>
                  <Icon size={19} color={S} />
                </span>
                <p className="heading text-[13px] mb-3 ltr" style={{ color: S }}>{e.n}</p>
                <p className="heading text-[21px] mb-3">{e.t}</p>
                <p className="text-[13px] leading-loose" style={{ color: D, opacity: .72 }}>{e.d}</p>
              </div>
            );
          })}
        </div>

        <div className="sb-stagger grid grid-cols-2 md:grid-cols-4 gap-4">
          {CONCEPT.categories.map((c) => (
            <figure key={c.key} className="sb-item m-0 rounded-[16px] overflow-hidden" style={{ border: `1px solid ${LINE}` }}>
              <div style={{ aspectRatio: "1.35", overflow: "hidden", background: RULE }}>
                <img src={`/sunbulah/cat/${c.key}.webp`} alt={c.ar} loading="lazy" decoding="async"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <figcaption className="px-4 py-3.5">
                <p className="heading text-[14px]">{c.ar}</p>
                <p className="text-[11px] mt-1 ltr" style={{ color: D, opacity: .42, fontFamily: MONO }}>{c.en}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConceptGlobal() {
  const REGIONS = [
    { r: "الخليج", n: "دول مجلس التعاون" },
    { r: "الشام وشمال أفريقيا", n: "أسواق إقليمية" },
    { r: "آسيا", n: "أسواق تصدير" },
    { r: "أوروبا", n: "أسواق تصدير" },
  ];
  return (
    <section id="s13" className="sb-slide opacity-0" style={{ padding: "0 24px 88px" }}>
      <div className="max-w-5xl mx-auto rounded-[24px] overflow-hidden" style={{ border: `1px solid ${LINE}` }}>
        <div className="relative">
          <img src="/sunbulah/hero-b.webp" alt="" loading="lazy" decoding="async"
            style={{ width: "100%", height: "min(48vh, 420px)", objectFit: "cover", display: "block" }} />
          <div className="absolute inset-0 flex items-center"
            style={{ background: "linear-gradient(to left, rgba(20,19,15,.9) 0%, rgba(20,19,15,.44) 70%, rgba(20,19,15,.14) 100%)" }}>
            <div className="px-8 md:px-14">
              <span className="inline-flex items-center gap-2 text-[11.5px] mb-4" style={{ color: S_SOFT }}>
                <Globe2 size={14} /> الانتشار
              </span>
              <h3 className="heading" style={{ fontSize: "clamp(24px, 4vw, 42px)", lineHeight: 1.4, color: "#fff" }}>
                من جدة إلى 35 دولة.
              </h3>
            </div>
          </div>
        </div>
        <div className="sb-stagger grid grid-cols-2 md:grid-cols-4">
          {REGIONS.map((x, i) => (
            <div key={x.r} className="sb-item px-6 py-7" style={{ borderLeft: i < 3 ? `1px solid ${RULE}` : "none", borderTop: `1px solid ${RULE}` }}>
              <p className="heading text-[16px] mb-2">{x.r}</p>
              <p className="text-[11.5px]" style={{ color: D, opacity: .58 }}>{x.n}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConceptHistory() {
  return (
    <section id="s14" className="sb-slide opacity-0" style={{ padding: "0 24px 96px" }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11.5px] mb-4" style={{ color: S }}>التاريخ</p>
          <h3 className="heading" style={{ fontSize: "clamp(26px, 4.4vw, 46px)", lineHeight: 1.4 }}>منذ 1980.</h3>
        </div>
        <div className="sb-stagger">
          {CONCEPT.history.map((h, i) => (
            <div key={h.y} className="sb-item flex gap-6 pb-9 last:pb-0">
              <div className="shrink-0 text-left" style={{ width: 112 }}>
                <span className="heading text-[19px] ltr" style={{ color: S }}>{h.y}</span>
              </div>
              <div className="relative flex-1 pr-7" style={{ borderRight: i < CONCEPT.history.length - 1 ? `1px solid ${LINE}` : "none" }}>
                <span className="absolute rounded-full" style={{ right: -5, top: 7, width: 9, height: 9, background: S }} />
                <p className="heading text-[19px] mb-2">{h.t}</p>
                <p className="text-[13.5px] leading-loose" style={{ color: D, opacity: .72 }}>{h.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════ عناصر مشتركة ══════════════════════════════ */

function Section({ id, n, eyebrow, title, accent, sub, tinted, children }: {
  id: string; n: string; eyebrow: string; title: string; accent: string;
  sub?: string; tinted?: boolean; children: React.ReactNode;
}) {
  return (
    <section id={id} className="sb-slide opacity-0"
      style={{ padding: "92px 24px", background: tinted ? "#FDFCFA" : "#fff", borderTop: `1px solid ${RULE}` }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[11.5px] mb-4" style={{ color: S }}>{eyebrow}</p>
          <h2 className="heading mb-5" style={{ fontSize: "clamp(26px, 4.6vw, 48px)", lineHeight: 1.4, color: D }}>
            {title} <span style={{ color: S }}>{accent}</span>
          </h2>
          {sub && (
            <p className="body-serif text-[15px] leading-loose max-w-2xl mx-auto" style={{ color: D, opacity: .68 }}>{sub}</p>
          )}
          <div className="flex items-center justify-center gap-1 mt-6">
            {[0, 1, 2].map((i) => <span key={i} style={{ width: 22, height: 3, background: S, opacity: 1 - i * 0.3 }} />)}
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
