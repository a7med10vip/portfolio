"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft } from "lucide-react";
import {
  AUDIT, COMPARE, ESTATE, FINDINGS, OPPORTUNITIES, SEVERITY_LABEL, STATUS_LABEL, STRENGTHS,
} from "./data";
import { S, S_SOFT, MINT, TINT, D, LINE, RULE, MONO, SEV } from "@/components/sunbulah/theme";
import ArabicTailProcessor from "@/components/ArabicTailProcessor";
import SunbulahNav from "@/components/sunbulah/SunbulahNav";
import SunbulahChat from "@/components/sunbulah/SunbulahChat";
import SiteTree from "@/components/sunbulah/SiteTree";
import PerfChart from "@/components/sunbulah/PerfChart";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════════════════
   مجموعة السنبلة — تدقيق الحضور الرقمي.
   كل رقم هنا قيس على الموقع المنشور بتاريخ 24 أغسطس 2026.
   ═══════════════════════════════════════════════════════════════════════════ */

export default function Page() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (calm) {
        gsap.set(".sb-hero, .sb-slide, .sb-item", { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(".sb-hero", { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: "power4.out", delay: 0.15 });
      gsap.utils.toArray<HTMLElement>(".sb-slide").forEach((el) => {
        gsap.fromTo(el, { y: 48, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>(".sb-stagger").forEach((el) => {
        gsap.fromTo(el.querySelectorAll(".sb-item"), { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 87%", once: true } });
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
    <ArabicTailProcessor>
      <div ref={root} style={{ background: "#fff", color: D, overflowX: "hidden" }}>
        <SunbulahNav />
        <SunbulahChat />

        {/* ══ الغلاف ═══════════════════════════════════════════════════════ */}
        <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle, rgba(10,10,10,0.045) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{ width: 880, height: 340, background: `radial-gradient(ellipse, ${S}1A 0%, transparent 70%)` }} />

          <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center" style={{ paddingTop: 76, paddingBottom: 48 }}>
            <div className="sb-hero opacity-0 mb-7">
              <img src="/sunbulah/brand/group.webp" alt="مجموعة السنبلة" style={{ width: 200, height: "auto" }} />
            </div>

            <div className="sb-hero opacity-0 mb-7">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11.5px] ar-body"
                style={{ background: TINT, color: S, border: `1px solid ${S}33` }}>
                وثيقة مستقلة · غير مطلوبة · {AUDIT.date}
              </span>
            </div>

            <h1 className="sb-hero opacity-0 ar-heading text-center mb-7"
              style={{ fontSize: "clamp(32px, 7vw, 74px)", lineHeight: 1.34, color: D }}>
              موقع لا يشبه <span style={{ color: S }}>حجم المجموعة</span>
            </h1>

            <p className="sb-hero opacity-0 ar-body text-center text-[16px] leading-loose mb-3" style={{ color: D, opacity: .78, maxWidth: 660 }}>
              مجموعة السنبلة تصنّع الغذاء منذ 1980، وتعمل في 35 دولة، وتملك أربع علامات.
              وموقعها المؤسسي اليوم اثنتان وعشرون صفحة على نظام إدارة محتوى انتهى دعمه، بقالبه
              التجريبي كما يأتي من المصنع.
            </p>
            <p className="sb-hero opacity-0 ar-heading text-[17px] mb-10" style={{ color: S }}>
              <span className="ltr">sunbulahgroup.com</span>
            </p>

            <div className="sb-hero opacity-0 grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 w-full max-w-2xl">
              <div className="rounded-[16px] p-5" style={{ border: `1px solid ${LINE}` }}>
                <p className="text-[11px] mb-2.5 ar-body" style={{ color: S }}>إعداد</p>
                <p className="ar-heading text-[15px] mb-1">أحمد علي</p>
                <p className="text-[12px] ar-body" style={{ color: D, opacity: .58 }}>رئيس المنتجات الرقمية والنمو · مجموعة إيموشن</p>
                <p className="text-[11px] ltr mt-1" style={{ color: D, opacity: .42 }}>ahmed.ali@emotiongrp.com</p>
              </div>
              <div className="rounded-[16px] p-5" style={{ border: `2px solid ${S}`, boxShadow: `3px 3px 0px 0px ${D}` }}>
                <p className="text-[11px] mb-2.5 ar-body" style={{ color: S }}>الجهة</p>
                <p className="ar-heading text-[15px] mb-1">مجموعة السنبلة للأغذية</p>
                <p className="text-[12px] ar-body" style={{ color: D, opacity: .58 }}>جدة · المملكة العربية السعودية</p>
                <p className="text-[11px] mt-1 ar-body" style={{ color: D, opacity: .42 }}>تأسست 1980 · أربع علامات · 35 دولة</p>
              </div>
            </div>

            <div className="sb-hero opacity-0 w-full max-w-3xl mb-9">
              <div className="flex items-stretch justify-center" style={{ border: `1px solid ${LINE}`, borderRadius: 16, overflow: "hidden" }}>
                {[
                  { n: FINDINGS.length, l: "ملاحظة" },
                  { n: critical, l: "حرجة" },
                  { n: high, l: "مرتفعة" },
                  { n: STRENGTHS.length, l: "أساس قائم" },
                  { n: 8, l: "عنوان رقمي" },
                ].map((x, i) => (
                  <div key={x.l} className="flex-1 flex flex-col items-center justify-center py-5 px-2 relative"
                    style={{ borderLeft: i < 4 ? `1px solid ${RULE}` : "none" }}>
                    <span className="ar-heading tabular-nums sb-count ltr" data-to={x.n} style={{ fontSize: 25, lineHeight: 1, color: D }}>0</span>
                    <span className="text-[11px] mt-2 text-center ar-body" style={{ color: D, opacity: .5 }}>{x.l}</span>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-full" style={{ height: 3, width: 32, background: S }} />
                  </div>
                ))}
              </div>
            </div>

            <div className="sb-hero opacity-0" style={{ width: 24, height: 38, border: `1.5px solid ${D}22`, borderRadius: 12, display: "flex", justifyContent: "center", paddingTop: 5 }}>
              <div style={{ width: 3, height: 6, borderRadius: 2, background: S, animation: "sbScroll 1.6s ease-in-out infinite" }} />
            </div>
          </div>
          <style>{`@keyframes sbScroll{0%{transform:translateY(0);opacity:1}75%{transform:translateY(9px);opacity:0}76%{transform:translateY(0);opacity:0}100%{opacity:1}}`}</style>
        </section>

        {/* ══ 01 · المنهج ══════════════════════════════════════════════════ */}
        <Section id="s01" n="01" eyebrow="القسم الأول" title="كيف قيس" accent="هذا"
          sub="لا رأي في هذه الوثيقة. كل جملة فيها مسبوقة بقياس.">
          <p className="ar-body text-[16px] leading-loose text-center max-w-3xl mx-auto mb-12" style={{ color: D, opacity: .82 }}>
            {AUDIT.method}
          </p>
          <Table
            head={["المبدأ", "ما يعنيه عمليًا"]}
            rows={[
              ["من الخارج فقط", "كل ما هنا مرئي لأي زائر. لا وصول، ولا صلاحيات، ولا بيانات داخلية."],
              ["قابل للتكرار", "كل رقم صدر عن أمر أو تشغيل متصفح يمكن إعادته على الموقع اليوم."],
              ["ما لم يُتحقق منه حُذف", "حيث تعذّر التأكد، أُسقط الادعاء بدل تقديره أو تقريبه."],
              ["بلا تسعير", "لا أسعار ولا نطاق عمل. الغرض أن تُقرأ الوثيقة لا أن تُشترى."],
            ]}
            widths={["30%", "70%"]}
          />
        </Section>

        {/* ══ 02 · الحضور الرقمي ═══════════════════════════════════════════ */}
        <Section id="s02" n="02" eyebrow="القسم الثاني" title="الحضور" accent="الرقمي" tinted
          sub="ثمانية عناوين تحمل اسم المجموعة أو إحدى علاماتها. ثلاثة لا تعمل، واثنان يؤديان الوظيفة نفسها بمسارين.">
          <div className="max-w-5xl mx-auto overflow-x-auto rounded-[18px]" style={{ border: `1px solid ${LINE}`, background: "#fff" }}>
            <table className="w-full" style={{ borderCollapse: "collapse", minWidth: 720 }}>
              <thead>
                <tr style={{ background: RULE }}>
                  {["العنوان", "الجهة", "الدور", "الحالة", "الملاحظة"].map((h) => (
                    <th key={h} className="text-right text-[11.5px] px-5 py-3.5 ar-body" style={{ color: D, opacity: .55, fontWeight: 400 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="sb-stagger">
                {ESTATE.map((p, i) => {
                  const c = p.status === "broken" ? "#B4231E" : p.status === "weak" ? "#C2410C" : S_SOFT;
                  return (
                    <tr key={p.url + p.name} className="sb-item" style={{ borderTop: i ? `1px solid ${RULE}` : "none" }}>
                      <td className="px-5 py-4 text-[11.5px] ltr align-top" style={{ color: D, opacity: .62, fontFamily: MONO }}>{p.url}</td>
                      <td className="px-5 py-4 text-[13px] ar-heading align-top whitespace-nowrap">{p.name}</td>
                      <td className="px-5 py-4 text-[12.5px] ar-body align-top whitespace-nowrap" style={{ color: D, opacity: .7 }}>{p.what}</td>
                      <td className="px-5 py-4 align-top">
                        <span className="text-[11.5px] px-2.5 py-1 rounded-full whitespace-nowrap ar-body"
                          style={{ background: p.status === "broken" ? c : `${c}18`, color: p.status === "broken" ? "#fff" : c }}>
                          {STATUS_LABEL[p.status]}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-[12.5px] leading-loose ar-body align-top" style={{ color: D, opacity: .78, minWidth: 260 }}>{p.note}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ══ 03 · خريطة الموقع ════════════════════════════════════════════ */}
        <Section id="s03" n="03" eyebrow="القسم الثالث" title="خريطة" accent="الموقع"
          sub="قائمة الصفحات تقول اثنتين وعشرين صفحة ولا تقول أين الفراغ. الشجرة تقوله: فرع المنتجات ثقيل باثنتي عشرة ورقة، وفرع العلامات بلا جذع أصلًا.">
          <SiteTree />
        </Section>

        {/* ══ 04 · ما يعمل جيدًا ═══════════════════════════════════════════ */}
        <Section id="s04" n="04" eyebrow="القسم الرابع" title="ما يعمل" accent="جيدًا" tinted
          sub="تدقيق لا يذكر إلا العيوب يُقرأ هجومًا لا تقييمًا. هذه قياسات موجبة، أُخذت بالطريقة نفسها.">
          <div className="max-w-5xl mx-auto overflow-x-auto rounded-[18px]" style={{ border: `1px solid ${S_SOFT}44`, background: "#fff" }}>
            <table className="w-full" style={{ borderCollapse: "collapse", minWidth: 680 }}>
              <thead>
                <tr style={{ background: TINT }}>
                  {["الأساس القائم", "لماذا يهم", "القياس"].map((h) => (
                    <th key={h} className="text-right text-[11.5px] px-5 py-3.5 ar-body" style={{ color: S, fontWeight: 400 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="sb-stagger">
                {STRENGTHS.map((x, i) => (
                  <tr key={x.t} className="sb-item" style={{ borderTop: i ? `1px solid ${RULE}` : "none" }}>
                    <td className="px-5 py-4 ar-heading text-[14px] align-top whitespace-nowrap">{x.t}</td>
                    <td className="px-5 py-4 text-[12.5px] leading-loose ar-body align-top" style={{ color: D, opacity: .78 }}>{x.d}</td>
                    <td className="px-5 py-4 text-[11.5px] ltr align-top whitespace-nowrap" style={{ color: S_SOFT, fontFamily: MONO }}>{x.proof}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ══ 05 · ما وُجد ═════════════════════════════════════════════════ */}
        <Section id="s05" n="05" eyebrow="القسم الخامس" title="ما" accent="وُجد"
          sub="ثلاث عشرة ملاحظة. الفهرس أولًا للمسح السريع، ثم التفصيل بقياسه الحرفي.">
          {/* الفهرس */}
          <div className="max-w-5xl mx-auto overflow-x-auto rounded-[18px] mb-14" style={{ border: `1px solid ${LINE}` }}>
            <table className="w-full" style={{ borderCollapse: "collapse", minWidth: 660 }}>
              <thead>
                <tr style={{ background: RULE }}>
                  {["#", "الملاحظة", "المجال", "الخطورة", "الجهد"].map((h) => (
                    <th key={h} className="text-right text-[11.5px] px-5 py-3.5 ar-body" style={{ color: D, opacity: .55, fontWeight: 400 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="sb-stagger">
                {FINDINGS.map((f, i) => {
                  const sev = SEV[f.severity];
                  return (
                    <tr key={f.id} className="sb-item" style={{ borderTop: i ? `1px solid ${RULE}` : "none" }}>
                      <td className="px-5 py-3.5 text-[12px] ltr" style={{ color: D, opacity: .4, fontFamily: MONO }}>{f.n}</td>
                      <td className="px-5 py-3.5">
                        <a href={`#${f.id}`} className="text-[13px] ar-body hover:underline" style={{ color: D }}>{f.title}</a>
                      </td>
                      <td className="px-5 py-3.5 text-[12px] ar-body whitespace-nowrap" style={{ color: D, opacity: .62 }}>{f.area}</td>
                      <td className="px-5 py-3.5">
                        <span className="text-[11px] px-2.5 py-1 rounded-full whitespace-nowrap ar-body" style={{ background: sev.bg, color: sev.fg }}>
                          {SEVERITY_LABEL[f.severity]}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-[12px] ar-body whitespace-nowrap" style={{ color: S }}>{f.effort}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* التفصيل */}
          <div className="space-y-5 max-w-4xl mx-auto">
            {FINDINGS.map((f) => {
              const sev = SEV[f.severity];
              const crit = f.severity === "critical";
              return (
                <article key={f.id} id={f.id} className="sb-slide opacity-0 rounded-[20px] overflow-hidden"
                  style={{ border: `1px solid ${crit ? "#B4231E33" : LINE}`, scrollMarginTop: 70 }}>
                  <div className="flex items-center justify-between gap-3 px-6 py-4" style={{ background: crit ? "#B4231E0A" : RULE }}>
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="ar-heading text-[13px] ltr" style={{ color: crit ? "#B4231E" : S }}>{f.n}</span>
                      <span style={{ width: 18, height: 1, background: `${crit ? "#B4231E" : S}55` }} />
                      <span className="text-[12px] ar-body" style={{ color: D, opacity: .7 }}>{f.area}</span>
                    </div>
                    <span className="text-[11.5px] px-3 py-1 rounded-full shrink-0 ar-body" style={{ background: sev.bg, color: sev.fg }}>{sev.label}</span>
                  </div>

                  <div className="px-6 py-7 md:px-8">
                    <h3 className="ar-heading mb-5" style={{ fontSize: 22, lineHeight: 1.5 }}>{f.title}</h3>
                    <p className="ar-body text-[14.5px] leading-loose mb-5" style={{ color: D, opacity: .85 }}>{f.evidence}</p>

                    {f.proof && (
                      <pre className="text-[11.5px] px-4 py-3 rounded-xl mb-6"
                        style={{ background: "#FAFAFA", border: `1px solid ${LINE}`, color: D, fontFamily: MONO,
                          direction: "ltr", textAlign: "left", overflowX: "auto", maxWidth: "100%" }}>
                        {f.proof}
                      </pre>
                    )}

                    <div className="grid gap-6 sm:grid-cols-2 pt-5" style={{ borderTop: `1px solid ${RULE}` }}>
                      <div>
                        <p className="text-[11.5px] mb-2.5 ar-body" style={{ color: "#B4231E" }}>الكلفة</p>
                        <p className="text-[13px] leading-loose ar-body" style={{ color: D, opacity: .82 }}>{f.impact}</p>
                      </div>
                      <div>
                        <p className="text-[11.5px] mb-2.5 ar-body" style={{ color: S }}>المعالجة</p>
                        <p className="text-[13px] leading-loose ar-body" style={{ color: D, opacity: .82 }}>{f.fix}</p>
                        <span className="inline-block text-[11.5px] mt-3 px-3 py-1.5 rounded-full ar-body" style={{ background: TINT, color: S }}>{f.effort}</span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Section>

        {/* ══ 06 · أمام النظير ═════════════════════════════════════════════ */}
        <Section id="s06" n="06" eyebrow="القسم السادس" title="أمام" accent="النظير" tinted
          sub="المراعي شركة أغذية سعودية بحجم مقارن. الأرقام قيست على الموقعين في اليوم نفسه، بالأداة نفسها، وبالمقاس نفسه.">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8"><PerfChart /></div>
            <div className="overflow-x-auto rounded-[18px]" style={{ border: `1px solid ${LINE}`, background: "#fff" }}>
              <table className="w-full" style={{ borderCollapse: "collapse", minWidth: 560 }}>
                <thead>
                  <tr style={{ background: RULE }}>
                    <th className="text-right text-[11.5px] px-5 py-3.5 ar-body" style={{ color: D, opacity: .55, fontWeight: 400 }}>المقياس</th>
                    <th className="text-center text-[11.5px] px-5 py-3.5 ar-body" style={{ color: S, fontWeight: 400 }}>السنبلة</th>
                    <th className="text-center text-[11.5px] px-5 py-3.5 ar-body" style={{ color: D, opacity: .55, fontWeight: 400 }}>المراعي</th>
                    <th className="text-center text-[11.5px] px-5 py-3.5 ar-body" style={{ color: D, opacity: .55, fontWeight: 400 }}>الأفضل</th>
                  </tr>
                </thead>
                <tbody className="sb-stagger">
                  {COMPARE.map((r, i) => (
                    <tr key={r.metric} className="sb-item" style={{ borderTop: i ? `1px solid ${RULE}` : "none" }}>
                      <td className="px-5 py-4 text-[13px] ar-body">{r.metric}</td>
                      <td className="px-5 py-4 text-[12.5px] text-center ltr" style={{ fontFamily: MONO, color: r.win === "them" ? S_SOFT : r.win === "peer" ? "#B4231E" : D }}>{r.them}</td>
                      <td className="px-5 py-4 text-[12.5px] text-center ltr" style={{ fontFamily: MONO, color: D, opacity: .6 }}>{r.peer}</td>
                      <td className="px-5 py-4 text-[12px] text-center ar-body whitespace-nowrap"
                        style={{ color: r.win === "them" ? S_SOFT : r.win === "peer" ? "#B4231E" : D, opacity: r.win === "tie" ? .5 : 1 }}>
                        {r.win === "them" ? "السنبلة" : r.win === "peer" ? "المراعي" : "متعادل"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[12.5px] text-center mt-5 ar-body" style={{ color: D, opacity: .6 }}>
              السنبلة تتقدّم في اثنين من سبعة. لا يتقدّم النظير في كل شيء، وتدقيق يخسر فيه العميل كل صف لا يُصدَّق.
            </p>
          </div>
        </Section>

        {/* ══ 07 · عصران ═══════════════════════════════════════════════════ */}
        <Section id="s07" n="07" eyebrow="القسم السابع" title="عصران وشركة" accent="واحدة"
          sub="لا حاجة إلى الجدال بأن الموقع المؤسسي قديم. يكفي وضعه إلى جوار موقع المستهلك الذي تملكه المجموعة نفسها.">
          <div className="sb-stagger grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
            {[
              { shot: "group-home-desktop", t: "الموقع المؤسسي", u: "sunbulahgroup.com", n: "Joomla 3 · قالب protostar الافتراضي · 22 صفحة", bad: true },
              { shot: "consumer-home-desktop", t: "موقع المستهلك", u: "sunbulah.com", n: "Next.js · ثنائي اللغة · تصوير حديث · يُحدَّث فعليًا", bad: false },
            ].map((c) => (
              <figure key={c.shot} className="sb-item m-0">
                <div className="overflow-hidden" style={{ borderRadius: 14, border: `1px solid ${c.bad ? "#B4231E33" : LINE}` }}>
                  <div className="flex items-center gap-1.5 px-3.5" style={{ height: 30, borderBottom: `1px solid ${RULE}` }}>
                    {["#E8E8E8", "#EFEFEF", "#F4F4F4"].map((x) => <span key={x} style={{ width: 7, height: 7, borderRadius: 99, background: x }} />)}
                    <span className="mr-2.5 text-[10.5px] ltr" style={{ color: D, opacity: .45, fontFamily: MONO }}>{c.u}</span>
                  </div>
                  <img src={`/sunbulah/audit/${c.shot}.webp`} alt={c.t} loading="lazy" decoding="async" style={{ display: "block", width: "100%" }} />
                </div>
                <figcaption className="mt-4">
                  <p className="ar-heading text-[17px] mb-1.5" style={{ color: c.bad ? D : S }}>{c.t}</p>
                  <p className="text-[12px] ltr" style={{ color: D, opacity: .55, fontFamily: MONO }}>{c.n}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="max-w-2xl mx-auto mt-14 rounded-[18px] p-8 text-center" style={{ border: `2px solid ${S}`, boxShadow: `3px 3px 0 0 ${D}` }}>
            <p className="ar-body text-[15.5px] leading-loose">
              الشركة نفسها، والميزانية نفسها، وفريق واحد. الفارق أن أحد الموقعين أُعيد بناؤه
              والآخر لم يُفتح منذ عشر سنوات.
            </p>
          </div>
        </Section>

        {/* ══ 08 · من أين يُبدأ ════════════════════════════════════════════ */}
        <Section id="s08" n="08" eyebrow="القسم الثامن" title="من أين" accent="يُبدأ" tinted
          sub="ليست كل ملاحظة تحتاج إعادة بناء. أربع منها تُغلق في يوم واحد، وأثرها فوري.">
          <div className="max-w-4xl mx-auto overflow-x-auto rounded-[18px]" style={{ border: `1px solid ${LINE}`, background: "#fff" }}>
            <table className="w-full" style={{ borderCollapse: "collapse", minWidth: 620 }}>
              <thead>
                <tr style={{ background: RULE }}>
                  {["المرحلة", "المدى", "ما يُنفَّذ فيها"].map((h) => (
                    <th key={h} className="text-right text-[11.5px] px-5 py-3.5 ar-body" style={{ color: D, opacity: .55, fontWeight: 400 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="sb-stagger">
                {[
                  { n: "أولًا", t: "خلال يوم", c: S,
                    items: ["إصلاح شهادة بوابة التوظيف، أو تحويل الرابط إلى البوابة العاملة", "عنوان ووصف لكل صفحة من الاثنتين والعشرين", "تصحيح lang وdir على النسخة العربية", "إصلاح الرابط المعطّل إلى موقع المستهلك"] },
                  { n: "ثانيًا", t: "خلال أسبوع", c: S_SOFT,
                    items: ["وسوم المشاركة وبيانات Organization المنظمة", "خريطة موقع، وترويسات تخزين مؤقت", "تحميل مؤجل للصور، وأهداف لمس بالمقاس الصحيح"] },
                  { n: "ثالثًا", t: "إعادة البناء", c: "#8B5CF6",
                    items: ["منصة مدعومة، وأفضلها ما يعمل عليه موقع المستهلك أصلًا", "صفحة حقيقية لكل علامة، وصفحة جامعة لها", "أقسام التصنيع والانتشار والقيادة وغرفة الأخبار", "تصوير بضعف دقة الشاشة"] },
                ].map((p, i) => (
                  <tr key={p.n} className="sb-item" style={{ borderTop: i ? `1px solid ${RULE}` : "none" }}>
                    <td className="px-5 py-5 align-top whitespace-nowrap">
                      <span className="ar-heading text-[15px]" style={{ color: p.c }}>{p.n}</span>
                    </td>
                    <td className="px-5 py-5 align-top whitespace-nowrap">
                      <span className="text-[12px] px-3 py-1.5 rounded-full ar-body" style={{ background: `${p.c}14`, color: p.c }}>{p.t}</span>
                    </td>
                    <td className="px-5 py-5 align-top">
                      <ul className="space-y-2.5">
                        {p.items.map((it) => (
                          <li key={it} className="flex gap-3 text-[13px] leading-loose ar-body" style={{ color: D, opacity: .85 }}>
                            <span style={{ marginTop: 9, width: 11, height: 2, background: p.c, flexShrink: 0 }} />
                            {it}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ══ 09 · ما يمكن عمله ════════════════════════════════════════════ */}
        <Section id="s09" n="09" eyebrow="القسم التاسع" title="ما يمكن" accent="عمله"
          sub="ست فرص، ولكل واحدة أثر يمكن ملاحظته. لا أسعار هنا ولا نطاق عمل.">
          <div className="sb-stagger grid gap-4 md:grid-cols-2 max-w-5xl mx-auto">
            {OPPORTUNITIES.map((o) => (
              <div key={o.n} className="sb-item rounded-[18px] p-7 flex flex-col" style={{ border: `1px solid ${LINE}` }}>
                <p className="ar-heading text-[13px] mb-4 ltr" style={{ color: S }}>{o.n}</p>
                <p className="ar-heading text-[19px] mb-3">{o.t}</p>
                <p className="text-[13px] leading-loose mb-5 ar-body" style={{ color: D, opacity: .75 }}>{o.d}</p>
                <p className="text-[12.5px] leading-loose mt-auto pt-4 flex gap-2.5 ar-body" style={{ borderTop: `1px solid ${RULE}`, color: S }}>
                  <ArrowLeft size={14} className="shrink-0 mt-0.5" />
                  {o.outcome}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* ══ الخاتمة ══════════════════════════════════════════════════════ */}
        <section style={{ padding: "80px 24px 100px", borderTop: `1px solid ${RULE}` }}>
          <div className="sb-slide opacity-0 max-w-3xl mx-auto rounded-[24px] p-9 md:p-14 text-center"
            style={{ border: `2px solid ${S}`, boxShadow: `4px 4px 0 0 ${D}` }}>
            <img src="/sunbulah/brand/group.webp" alt="مجموعة السنبلة" style={{ width: 164, height: "auto", margin: "0 auto 28px" }} />
            <p className="text-[11.5px] mb-5 ar-body" style={{ color: S }}>عن هذه الوثيقة</p>
            <p className="ar-body text-[15.5px] leading-loose mb-9" style={{ color: D, opacity: .85 }}>
              أُعدّت من الخارج، دون تكليف ودون وصول إلى أي نظام. كل قياس فيها قابل لإعادة التشغيل
              على الموقع اليوم. ولا تتضمن أسعارًا ولا نطاق عمل، لأن غرضها أن تُقرأ لا أن تُشترى.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
              <a href="mailto:ahmed.ali@emotiongrp.com" className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[13px] ltr"
                style={{ background: S, color: "#fff" }}>ahmed.ali@emotiongrp.com</a>
              <a href="https://www.linkedin.com/in/ahmed-alli" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[13px] ar-body" style={{ border: `1.5px solid ${S}`, color: D }}>LinkedIn</a>
            </div>
            <p className="ar-heading text-[17px] mb-1.5">أحمد علي</p>
            <p className="text-[12.5px] ar-body" style={{ color: D, opacity: .6 }}>رئيس المنتجات الرقمية والنمو · مجموعة إيموشن</p>
          </div>
        </section>
      </div>
    </ArabicTailProcessor>
  );
}

/* ═══════════════════════════ عناصر مشتركة ══════════════════════════════ */

function Table({ head, rows, widths }: { head: string[]; rows: string[][]; widths?: string[] }) {
  return (
    <div className="max-w-4xl mx-auto overflow-x-auto rounded-[18px]" style={{ border: `1px solid ${LINE}`, background: "#fff" }}>
      <table className="w-full" style={{ borderCollapse: "collapse", minWidth: 520 }}>
        <thead>
          <tr style={{ background: RULE }}>
            {head.map((h, i) => (
              <th key={h} className="text-right text-[11.5px] px-5 py-3.5 ar-body"
                style={{ color: D, opacity: .55, fontWeight: 400, width: widths?.[i] }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="sb-stagger">
          {rows.map((r, i) => (
            <tr key={r[0]} className="sb-item" style={{ borderTop: i ? `1px solid ${RULE}` : "none" }}>
              {r.map((cell, j) => (
                <td key={j} className={`px-5 py-4 text-[13px] leading-loose align-top ${j === 0 ? "ar-heading whitespace-nowrap" : "ar-body"}`}
                  style={{ color: D, opacity: j === 0 ? 1 : .8 }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Section({ id, n, eyebrow, title, accent, sub, tinted, children }: {
  id: string; n: string; eyebrow: string; title: string; accent: string;
  sub?: string; tinted?: boolean; children: React.ReactNode;
}) {
  return (
    <section id={id} className="sb-slide opacity-0"
      style={{ padding: "92px 24px", background: tinted ? "#FAFAFA" : "#fff", borderTop: `1px solid ${RULE}` }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[11.5px] mb-4 ar-body" style={{ color: S }}>{eyebrow}</p>
          <h2 className="ar-heading mb-5" style={{ fontSize: "clamp(26px, 4.6vw, 48px)", lineHeight: 1.4, color: D }}>
            {title} <span style={{ color: S }}>{accent}</span>
          </h2>
          {sub && <p className="ar-body text-[15px] leading-loose max-w-2xl mx-auto" style={{ color: D, opacity: .68 }}>{sub}</p>}
          <div className="flex items-center justify-center gap-1 mt-6">
            {[S, S_SOFT, MINT].map((c, i) => <span key={i} style={{ width: 22, height: 3, background: c }} />)}
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
