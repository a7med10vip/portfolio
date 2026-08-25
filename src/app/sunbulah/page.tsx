"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AREA_ICON, FINDING_ICON, OPPORTUNITY_ICON, SECTION_ICON, STATUS_ICON, STRENGTH_ICON,
} from "@/components/sunbulah/icons";
import { FaArrowLeftLong } from "react-icons/fa6";
import {
  AUDIT, COMPARE, ESTATE, FINDINGS, INSIGHT, PROVE, SEVERITY_LABEL, STATUS_LABEL, STRENGTHS, TODAY,
} from "./data";
import { S, S_SOFT, MINT, TINT, D, LINE, RULE, SEV, ZEBRA, HEAD } from "@/components/sunbulah/theme";
import ArabicTailProcessor from "@/components/ArabicTailProcessor";
import SunbulahNav from "@/components/sunbulah/SunbulahNav";
import SunbulahChat from "@/components/sunbulah/SunbulahChat";
import WarningIllustration from "@/components/sunbulah/WarningIllustration";
import SiteMap from "@/components/sunbulah/SiteTree";
import PerfChart from "@/components/sunbulah/PerfChart";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════════════════
   مجموعة السنبلة، تدقيق الحضور الرقمي.
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

          <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center" style={{ paddingTop: 76, paddingBottom: 48 }}>
            <div className="sb-hero opacity-0 mb-8">
              <img src="/sunbulah/brand/group.webp" alt="مجموعة السنبلة" style={{ width: 200, height: "auto" }} />
            </div>

            <h1 className="sb-hero opacity-0 ar-heading text-center mb-8"
              style={{ fontSize: "clamp(32px, 7vw, 74px)", lineHeight: 1.34, color: D }}>
              الشركة اليوم أكبر من <span style={{ color: S }}>الموقع الذي يمثلها</span>
            </h1>

            {/* ثلاث حقائق فقط، قبل أي تفصيل */}
            <div className="sb-hero opacity-0 w-full max-w-2xl mb-8">
              <div className="grid grid-cols-3 rounded-[18px] overflow-hidden" style={{ border: `1px solid ${LINE}` }}>
                {[
                  { n: "35", l: "دولة" },
                  { n: "4", l: "علامات" },
                  { n: "+1,000", l: "موظف" },
                ].map((x, i) => (
                  <div key={x.l} className="flex flex-col items-center justify-center py-7 px-3"
                    style={{ borderLeft: i < 2 ? `1px solid ${RULE}` : "none" }}>
                    <span className="ar-heading ltr" style={{ fontSize: 34, lineHeight: 1, color: S }}>{x.n}</span>
                    <span className="ar-body text-[12.5px] mt-2.5" style={{ color: D, opacity: .65 }}>{x.l}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="sb-hero opacity-0 ar-body text-center text-[16.5px] leading-loose mb-3"
              style={{ color: D, opacity: .85, maxWidth: 640 }}>
              مجموعة السنبلة تصنع الغذاء منذ 1980، وتعمل عبر خمس وثلاثين دولة، وتملك أربع علامات.
              لكن التجربة الرقمية الحالية لا تروي هذه القصة.
            </p>
            <div className="sb-hero opacity-0 mb-10 text-center">
              <p className="ar-body text-[12.5px] mb-1.5" style={{ color: D, opacity: .5 }}>إعداد</p>
              <p className="ar-heading text-[17px] mb-1">أحمد علي</p>
              <a href="https://ahmedali.online" target="_blank" rel="noopener noreferrer"
                className="ltr text-[12.5px]" style={{ color: S }}>ahmedali.online</a>
              <p className="ar-body text-[11.5px] mt-4" style={{ color: D, opacity: .45 }}>
                وثيقة مستقلة، غير مطلوبة، {AUDIT.date}
              </p>
            </div>

            {/* العلامات التي تقوم عليها المجموعة، بشعاراتها كما هي على خادمهم */}
            <div className="sb-hero opacity-0 w-full max-w-3xl mb-9">
              <p className="ar-body text-[11.5px] text-center mb-5" style={{ color: D, opacity: .5 }}>
                العلامات الأربع التي تقوم عليها المجموعة
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { k: "sunbulah", n: "السنبلة", h: 34 },
                  { k: "alshifa", n: "الشفاء", h: 56 },
                  { k: "sary", n: "ساري", h: 40 },
                  { k: "walima", n: "وليمة", h: 48 },
                ].map((b) => (
                  <div key={b.k} className="rounded-[14px] px-4 grid place-items-center gap-3"
                    /* ارتفاع ثابت للبطاقة، فتبقى الصفوف مستوية مهما اختلفت نسب الشعارات */
                    style={{ border: `1px solid ${LINE}`, minHeight: 128, paddingTop: 18, paddingBottom: 18 }}>
                    <img src={`/sunbulah/brand/${b.k}.webp`} alt={b.n} loading="lazy"
                      style={{ height: b.h, width: "auto", maxWidth: "100%", objectFit: "contain", mixBlendMode: "multiply" }} />
                    <span className="ar-body text-[12px]" style={{ color: D, opacity: .7 }}>{b.n}</span>
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

        {/* ══ 01 · الحقيقة الأكبر ═══════════════════════════════════════════ */}
        <Insight />

        {/* ══ 02 · السنبلة اليوم ════════════════════════════════════════════ */}
        <Today />

        {/* ══ 03 · الحضور الرقمي ═══════════════════════════════════════════ */}
        <Section id="s03" n="03" eyebrow="القسم الثالث" title="الحضور" accent="الرقمي"
          sub="ثمانية عناوين تحمل اسم المجموعة أو إحدى علاماتها. ثلاثة لا تعمل واثنان يؤديان الوظيفة نفسها بمسارين.">
          <div className="max-w-5xl mx-auto overflow-x-auto rounded-[18px]" style={{ border: `1px solid ${LINE}`, background: "#fff" }}>
            <table className="w-full" style={{ borderCollapse: "collapse", minWidth: 720 }}>
              <thead>
                <tr style={{ background: HEAD }}>
                  {["العنوان", "الجهة", "الدور", "الحالة", "الملاحظة"].map((h) => (
                    <th key={h} className="text-right text-[11.5px] px-5 py-3.5 ar-body" style={{ color: S, fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="sb-stagger">
                {ESTATE.map((p, i) => {
                  const c = p.status === "broken" ? "#B4231E" : p.status === "weak" ? "#C2410C" : S_SOFT;
                  return (
                    <tr key={p.url + p.name} className="sb-item" style={{ borderTop: i ? `1px solid ${RULE}` : "none", background: i % 2 ? ZEBRA : "#fff" }}>
                      <td className="px-5 py-4 text-[11.5px] ltr align-top"
                        style={{ color: D, opacity: .7, borderRight: `3px solid ${c}` }}>{p.url}</td>
                      <td className="px-5 py-4 text-[13px] ar-heading align-top whitespace-nowrap">{p.name}</td>
                      <td className="px-5 py-4 text-[12.5px] ar-body align-top whitespace-nowrap" style={{ color: D, opacity: .7 }}>{p.what}</td>
                      <td className="px-5 py-4 align-top">
                        <span className="inline-flex items-center gap-1.5 text-[11.5px] px-2.5 py-1 rounded-full whitespace-nowrap ar-body"
                          style={{ background: p.status === "broken" ? c : `${c}18`, color: p.status === "broken" ? "#fff" : c }}>
                          {(() => { const I = STATUS_ICON[p.status]; return <I size={11} />; })()}
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

        {/* ══ 04 · خريطة الموقع ════════════════════════════════════════════ */}
        <Section id="s04" n="04" eyebrow="القسم الرابع" title="خريطة" accent="الموقع"
          sub="عدد الصفحات وحده لا يوضح أين النقص. المجموعات توضحه: شريط المنتجات أخضر بالكامل، وشريط العلامات ليس فيه أخضر واحد. اضغط أي حالة لترى صفحاتها.">
          <SiteMap />
        </Section>

        {/* ══ 05 · ما يعمل جيدا ═══════════════════════════════════════════ */}
        <Section id="s05" n="05" eyebrow="القسم الخامس" title="ما يعمل" accent="جيدا"
          sub="تقرير لا يذكر إلا العيوب يبدو هجوما لا تقييما. هذه نقاط قوة حقيقية، قيست بالطريقة نفسها.">
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
                {STRENGTHS.map((x, i) => { const I = STRENGTH_ICON[i]; return (
                  <tr key={x.t} className="sb-item" style={{ borderTop: i ? `1px solid ${RULE}` : "none", background: i % 2 ? ZEBRA : "#fff" }}>
                    <td className="px-5 py-4 ar-heading text-[14px] align-top whitespace-nowrap"
                      style={{ borderRight: `3px solid ${S_SOFT}` }}>
                      <span className="inline-flex items-center gap-2.5">
                        <I size={14} color="#0F7A70" />
                        {x.t}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-[12.5px] leading-loose ar-body align-top" style={{ color: D, opacity: .78 }}>{x.d}</td>
                    <td className="px-5 py-4 align-top">
                      <span className="inline-block text-[11.5px] ltr px-3 py-1.5 rounded-lg whitespace-nowrap"
                        style={{ background: `${S_SOFT}18`, color: "#0F7A70" }}>{x.proof}</span>
                    </td>
                  </tr>
                ); })}
              </tbody>
            </table>
          </div>
        </Section>

        {/* ══ 06 · المنهج ══════════════════════════════════════════════════ */}
        <Section id="s06" n="06" eyebrow="القسم السادس" title="كيف قسنا" accent="هذا"
          sub="لا آراء هنا. كل ملاحظة مبنية على قياس مباشر يمكن لأي شخص إعادته.">
          <p className="ar-body text-[16px] leading-loose text-center max-w-3xl mx-auto mb-12" style={{ color: D, opacity: .82 }}>
            {AUDIT.method}
          </p>
          <Table
            head={["المبدأ", "ما يعنيه عمليا"]}
            rows={[
              ["من الخارج فقط", "كل ما هنا مرئي لأي زائر. لا وصول ولا صلاحيات ولا بيانات داخلية."],
              ["قابل للتكرار", "كل رقم صدر عن أمر أو تشغيل متصفح يمكن إعادته على الموقع اليوم."],
              ["ما لم يتحقق منه حذف", "حيث تعذر التأكد، أسقط الادعاء بدل تقديره أو تقريبه."],
              ["بلا تسعير", "لا أسعار ولا نطاق عمل. الغرض أن تقرأ الوثيقة لا أن تشترى."],
            ]}
            widths={["30%", "70%"]}
          />
        </Section>

        {/* ══ 07 · ما وجد ═════════════════════════════════════════════════ */}
        <Section id="s07" n="07" eyebrow="القسم السابع" title="ما" accent="وجدناه"
          sub="ثلاث عشرة ملاحظة. الجدول أولا لنظرة سريعة، ثم التفاصيل.">
          {/* الفهرس */}
          <div className="max-w-5xl mx-auto overflow-x-auto rounded-[18px] mb-14" style={{ border: `1px solid ${LINE}` }}>
            <table className="w-full" style={{ borderCollapse: "collapse", minWidth: 660 }}>
              <thead>
                <tr style={{ background: HEAD }}>
                  {["#", "الملاحظة", "المجال", "الخطورة", "الجهد"].map((h) => (
                    <th key={h} className="text-right text-[11.5px] px-5 py-3.5 ar-body" style={{ color: S, fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="sb-stagger">
                {FINDINGS.map((f, i) => {
                  const sev = SEV[f.severity];
                  return (
                    <tr key={f.id} className="sb-item" style={{ borderTop: i ? `1px solid ${RULE}` : "none", background: i % 2 ? ZEBRA : "#fff" }}>
                      <td className="px-5 py-3.5 text-[12px] ltr"
                        style={{ color: sev.bg, borderRight: `3px solid ${sev.bg}`, fontWeight: 600 }}>{f.n}</td>
                      <td className="px-5 py-3.5">
                        <a href={`#${f.id}`} className="block text-[13px] ar-body hover:underline py-2.5" style={{ color: D }}>{f.title}</a>
                      </td>
                      <td className="px-5 py-3.5 text-[12px] ar-body whitespace-nowrap" style={{ color: D, opacity: .72 }}>
                        <span className="inline-flex items-center gap-2">
                          {AREA_ICON[f.area] && (() => { const I = AREA_ICON[f.area]; return <I size={12} color={S} />; })()}
                          {f.area}
                        </span>
                      </td>
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
              const FindIcon = FINDING_ICON[f.id];
              const AreaIcon = AREA_ICON[f.area];
              return (
                <article key={f.id} id={f.id} className="sb-slide opacity-0 rounded-[20px] overflow-hidden"
                  style={{
                    border: `1px solid ${crit ? "#B4231E33" : LINE}`,
                    borderRight: `4px solid ${sev.bg}`,
                    scrollMarginTop: 70,
                  }}>
                  <div className="flex items-center justify-between gap-3 px-6 py-4" style={{ background: crit ? "#B4231E0A" : RULE }}>
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="grid place-items-center rounded-lg shrink-0"
                        style={{ width: 30, height: 30, background: `${sev.bg}18`, color: sev.bg }}>
                        {FindIcon && <FindIcon size={14} />}
                      </span>
                      <span className="ar-heading text-[13px] ltr" style={{ color: crit ? "#B4231E" : S }}>{f.n}</span>
                      <span className="flex items-center gap-1.5 text-[12px] ar-body" style={{ color: D, opacity: .7 }}>
                        {AreaIcon && <AreaIcon size={11} />}
                        {f.area}
                      </span>
                    </div>
                    <span className="text-[11.5px] px-3 py-1 rounded-full shrink-0 ar-body" style={{ background: sev.bg, color: sev.fg }}>{sev.label}</span>
                  </div>

                  <div className="px-6 py-7 md:px-8">
                    <h3 className="ar-heading mb-5" style={{ fontSize: 22, lineHeight: 1.5 }}>{f.title}</h3>
                    <p className="ar-body text-[14.5px] leading-loose mb-5" style={{ color: D, opacity: .85 }}>{f.evidence}</p>

                    {f.id === "careers-cert" && <div className="mb-7"><WarningIllustration /></div>}

                    {f.proof && (
                      <p className="ar-body text-[13px] leading-loose px-5 py-4 rounded-xl mb-6"
                        style={{ background: `${TINT}66`, border: `1px solid ${S}22`, color: S }}>
                        {f.proof}
                      </p>
                    )}

                    <div className="grid gap-4 sm:grid-cols-2 pt-1">
                      <div className="rounded-[14px] p-5" style={{ background: "#FCF3F2", border: "1px solid #B4231E1F" }}>
                        <p className="text-[11.5px] mb-3 ar-body" style={{ color: "#B4231E" }}>الكلفة على العمل</p>
                        <p className="text-[13px] leading-loose ar-body" style={{ color: D, opacity: .85 }}>{f.impact}</p>
                      </div>
                      <div className="rounded-[14px] p-5" style={{ background: `${TINT}66`, border: `1px solid ${S}22` }}>
                        <p className="text-[11.5px] mb-3 ar-body" style={{ color: S }}>المعالجة</p>
                        <p className="text-[13px] leading-loose ar-body" style={{ color: D, opacity: .85 }}>{f.fix}</p>
                        <span className="inline-block text-[11.5px] mt-4 px-3 py-1.5 rounded-full ar-body"
                          style={{ background: S, color: "#fff" }}>{f.effort}</span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Section>

        {/* ══ 08 · أمام النظير ═════════════════════════════════════════════ */}
        <Section id="s08" n="08" eyebrow="القسم الثامن" title="أمام" accent="النظير"
          sub="المراعي شركة أغذية سعودية بحجم مقارن. الأرقام قيست على الموقعين في اليوم نفسه، بالأداة نفسها وبالمقاس نفسه.">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8"><PerfChart /></div>
            <div className="overflow-x-auto rounded-[18px]" style={{ border: `1px solid ${LINE}`, background: "#fff" }}>
              <table className="w-full" style={{ borderCollapse: "collapse", minWidth: 560 }}>
                <thead>
                  <tr style={{ background: HEAD }}>
                    <th className="text-right text-[11.5px] px-5 py-3.5 ar-body" style={{ color: S, fontWeight: 500 }}>المقياس</th>
                    <th className="text-center text-[11.5px] px-5 py-3.5 ar-body" style={{ color: S, fontWeight: 400 }}>السنبلة</th>
                    <th className="text-center text-[11.5px] px-5 py-3.5 ar-body" style={{ color: S, fontWeight: 500 }}>المراعي</th>
                    <th className="text-center text-[11.5px] px-5 py-3.5 ar-body" style={{ color: S, fontWeight: 500 }}>الأفضل</th>
                  </tr>
                </thead>
                <tbody className="sb-stagger">
                  {COMPARE.map((r, i) => (
                    <tr key={r.metric} className="sb-item" style={{ borderTop: i ? `1px solid ${RULE}` : "none", background: i % 2 ? ZEBRA : "#fff" }}>
                      <td className="px-5 py-4 text-[13px] ar-body">{r.metric}</td>
                      <td className="px-5 py-4 text-[12.5px] text-center ltr" style={{ color: r.win === "them" ? S_SOFT : r.win === "peer" ? "#B4231E" : D }}>{r.them}</td>
                      <td className="px-5 py-4 text-[12.5px] text-center ltr" style={{ color: D, opacity: .6 }}>{r.peer}</td>
                      <td className="px-5 py-4 text-center">
                        <span className="inline-block text-[12px] px-3 py-1.5 rounded-full ar-body whitespace-nowrap"
                          style={{
                            background: r.win === "them" ? `${S_SOFT}22` : r.win === "peer" ? "#B4231E14" : RULE,
                            color: r.win === "them" ? "#0F7A70" : r.win === "peer" ? "#B4231E" : D,
                          }}>
                          {r.win === "them" ? "السنبلة" : r.win === "peer" ? "المراعي" : "متعادل"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[12.5px] text-center mt-5 ar-body" style={{ color: D, opacity: .6 }}>
              السنبلة تتقدم في اثنين من سبعة. لا يتقدم النظير في كل شيء وتدقيق يخسر فيه العميل كل صف لا يصدق.
            </p>
          </div>
        </Section>

        {/* ══ 09 · عصران ═══════════════════════════════════════════════════ */}
        <Section id="s09" n="09" eyebrow="القسم التاسع" title="عصران وشركة" accent="واحدة"
          sub="الفارق بين الموقع المؤسسي وموقع المستهلك يتضح عند وضعهما جنبا إلى جنب.">
          <div className="sb-stagger grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
            {[
              { shot: "group-home-desktop", t: "الموقع المؤسسي", u: "sunbulahgroup.com", n: "Joomla 3 · قالب protostar الافتراضي · 22 صفحة", bad: true },
              { shot: "consumer-home-desktop", t: "موقع المستهلك", u: "sunbulah.com", n: "Next.js · ثنائي اللغة · تصوير حديث · يحدث فعليا", bad: false },
            ].map((c) => (
              <figure key={c.shot} className="sb-item m-0">
                <div className="overflow-hidden" style={{ borderRadius: 14, border: `1px solid ${c.bad ? "#B4231E33" : LINE}` }}>
                  <div className="flex items-center gap-1.5 px-3.5" style={{ height: 30, borderBottom: `1px solid ${RULE}` }}>
                    {["#E8E8E8", "#EFEFEF", "#F4F4F4"].map((x) => <span key={x} style={{ width: 7, height: 7, borderRadius: 99, background: x }} />)}
                    <span className="mr-2.5 text-[10.5px] ltr" style={{ color: D, opacity: .45 }}>{c.u}</span>
                  </div>
                  <img src={`/sunbulah/audit/${c.shot}.webp`} alt={c.t} loading="lazy" decoding="async" style={{ display: "block", width: "100%" }} />
                </div>
                <figcaption className="mt-4">
                  <p className="ar-heading text-[17px] mb-1.5" style={{ color: c.bad ? D : S }}>{c.t}</p>
                  <p className="text-[12px] ltr" style={{ color: D, opacity: .55 }}>{c.n}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="max-w-3xl mx-auto mt-14 rounded-[20px] px-8 py-10 text-center" style={{ background: S }}>
            <p className="ar-body text-[16px] leading-loose"
              style={{ color: "#fff", textWrap: "balance" } as React.CSSProperties}>
              المجموعة نفسها تملك تجربة استهلاكية حديثة ومحدثة، بينما لم يخضع الموقع
              المؤسسي لإعادة بناء مماثلة منذ سنوات.
            </p>
          </div>
        </Section>

        {/* ══ 10 · من أين يبدأ ════════════════════════════════════════════ */}
        <Section id="s10" n="10" eyebrow="القسم العاشر" title="من أين" accent="نبدأ"
          sub="ليست كل ملاحظة تحتاج إعادة بناء. أربع منها تغلق في يوم واحد وأثرها فوري.">
          <div className="max-w-4xl mx-auto overflow-x-auto rounded-[18px]" style={{ border: `1px solid ${LINE}`, background: "#fff" }}>
            <table className="w-full" style={{ borderCollapse: "collapse", minWidth: 620 }}>
              <thead>
                <tr style={{ background: HEAD }}>
                  {["المرحلة", "المدى", "ما ننفذه فيها"].map((h) => (
                    <th key={h} className="text-right text-[11.5px] px-5 py-3.5 ar-body" style={{ color: S, fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="sb-stagger">
                {[
                  { n: "أولا", t: "خلال يوم", c: S,
                    items: ["إصلاح شهادة بوابة التوظيف، أو تحويل الرابط إلى البوابة العاملة", "عنوان ووصف لكل صفحة من الاثنتين والعشرين", "تصحيح lang وdir على النسخة العربية", "إصلاح الرابط المعطل إلى موقع المستهلك"] },
                  { n: "ثانيا", t: "خلال أسبوع", c: S_SOFT,
                    items: ["وسوم المشاركة وبيانات Organization المنظمة", "خريطة موقع وترويسات تخزين مؤقت", "تحميل مؤجل للصور وأهداف لمس بالمقاس الصحيح"] },
                  { n: "ثالثا", t: "إعادة البناء", c: "#8B5CF6",
                    items: ["منصة مدعومة وأفضلها ما يعمل عليه موقع المستهلك أصلا", "صفحة حقيقية لكل علامة وصفحة جامعة لها", "أقسام التصنيع والانتشار والقيادة وغرفة الأخبار", "تصوير بضعف دقة الشاشة"] },
                ].map((p, i) => (
                  <tr key={p.n} className="sb-item" style={{ borderTop: i ? `1px solid ${RULE}` : "none", background: i % 2 ? ZEBRA : "#fff" }}>
                    <td className="px-5 py-5 align-top whitespace-nowrap" style={{ borderRight: `3px solid ${p.c}` }}>
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

        {/* ══ 11 · لو بني اليوم ════════════════════════════════════════════ */}
        <Prove />

        {/* ══ الخاتمة ══════════════════════════════════════════════════════ */}
        <section style={{ padding: "80px 24px 100px", borderTop: `1px solid ${RULE}` }}>
          <div className="sb-slide opacity-0 max-w-3xl mx-auto rounded-[24px] p-9 md:p-14 text-center"
            style={{ border: `2px solid ${S}` }}>
            <img src="/sunbulah/brand/group.webp" alt="مجموعة السنبلة" style={{ width: 164, height: "auto", margin: "0 auto 28px" }} />
            <p className="text-[11.5px] mb-5 ar-body" style={{ color: S }}>عن هذه الوثيقة</p>
            <p className="ar-body text-[15.5px] leading-loose mb-9" style={{ color: D, opacity: .85 }}>
              أعددتها من الخارج، دون تكليف ودون وصول إلى أي نظام. كل قياس فيها قابل لإعادة التشغيل
              على الموقع اليوم. ولا تتضمن أسعارا ولا نطاق عمل، لأن غرضها أن تقرأ لا أن تشترى.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
              <a href="mailto:hello@ahmedali.online" className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[13px] ltr"
                style={{ background: S, color: "#fff" }}>hello@ahmedali.online</a>
              <a href="https://www.linkedin.com/in/ahmed-alli" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[13px] ar-body" style={{ border: `1.5px solid ${S}`, color: D }}>LinkedIn</a>
            </div>
            <p className="ar-heading text-[17px] mb-1.5">أحمد علي</p>
            <p className="text-[12.5px] ar-body" style={{ color: D, opacity: .6 }}>استراتيجي رقمي · مطور منتجات</p>
          </div>
        </section>
      </div>
    </ArabicTailProcessor>
  );
}

function Insight() {
  return (
    <Section id="s01" n="01" eyebrow="القسم الأول" title="المسألة ليست أن" accent="الموقع قديم" sub={INSIGHT.body}>
      <div className="sb-stagger grid gap-4 md:grid-cols-3 max-w-5xl mx-auto mb-10">
        {INSIGHT.directions.map((x) => (
          <div key={x.n} className="sb-item rounded-[18px] overflow-hidden flex flex-col" style={{ border: `1px solid ${LINE}` }}>
            <div className="px-6 pt-7 pb-6 flex-1">
              <p className="ar-heading text-[13px] mb-4 ltr" style={{ color: S }}>{x.n}</p>
              <p className="ar-heading text-[21px] mb-3">{x.t}</p>
              <p className="ar-body text-[13.5px] leading-loose" style={{ color: D, opacity: .8 }}>{x.d}</p>
            </div>
            <div className="px-6 py-5" style={{ background: "#FCF3F2", borderTop: "1px solid #B4231E1F" }}>
              <p className="ar-body text-[13px] leading-loose" style={{ color: "#8E1C18" }}>{x.gap}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="max-w-3xl mx-auto rounded-[20px] px-8 py-10 text-center" style={{ background: S }}>
        <p className="ar-body text-[16px] leading-loose"
          style={{ color: "#fff", textWrap: "balance" } as React.CSSProperties}>
          {INSIGHT.close}
        </p>
      </div>
    </Section>
  );
}

function Today() {
  return (
    <Section id="s02" n="02" eyebrow="القسم الثاني" title="السنبلة اليوم، وما يقوله" accent="موقعها عنها"
      sub="اقرأ العمودين معا: كل سطر على اليمين يقابله سطر على اليسار.">
      <div className="sb-stagger grid grid-cols-2 sm:grid-cols-4 gap-px max-w-4xl mx-auto mb-10"
        style={{ background: LINE, border: `1px solid ${LINE}`, borderRadius: 18, overflow: "hidden" }}>
        {TODAY.facts.map((f) => (
          <div key={f.l} className="sb-item flex flex-col items-center justify-center text-center px-4 py-9" style={{ background: "#fff" }}>
            <span className="ar-heading ltr" style={{ fontSize: 32, lineHeight: 1, color: S }}>{f.n}</span>
            <span className="ar-heading text-[14px] mt-3">{f.l}</span>
            <span className="ar-body text-[11.5px] mt-2 leading-loose" style={{ color: D, opacity: .58 }}>{f.s}</span>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto overflow-x-auto rounded-[18px]" style={{ border: `1px solid ${LINE}` }}>
        <table className="w-full" style={{ borderCollapse: "collapse", minWidth: 560 }}>
          <thead>
            <tr style={{ background: HEAD }}>
              <th className="text-right text-[11.5px] px-5 py-3.5 ar-body" style={{ color: S, fontWeight: 500 }}>{TODAY.factsLabel}</th>
              <th className="text-right text-[11.5px] px-5 py-3.5 ar-body" style={{ color: "#B4231E", fontWeight: 500 }}>{TODAY.contrastLabel}</th>
            </tr>
          </thead>
          <tbody className="sb-stagger">
            {TODAY.contrast.map((r, i) => (
              <tr key={r.real} className="sb-item"
                style={{ borderTop: i ? `1px solid ${RULE}` : "none", background: i % 2 ? ZEBRA : "#fff" }}>
                <td className="px-5 py-4 ar-body text-[13.5px] leading-loose align-top"
                  style={{ color: D, borderRight: `3px solid ${S_SOFT}` }}>{r.real}</td>
                <td className="px-5 py-4 ar-body text-[13.5px] leading-loose align-top" style={{ color: D, opacity: .82 }}>{r.said}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="ar-body text-[14px] leading-loose text-center max-w-2xl mx-auto mt-9" style={{ color: D, opacity: .78 }}>
        {TODAY.verdict}
      </p>
    </Section>
  );
}

function Prove() {
  return (
    <Section id="s11" n="11" eyebrow="القسم الحادي عشر" title="لو بني" accent="اليوم" sub={PROVE.intro}>
      <div className="sb-stagger max-w-4xl mx-auto space-y-4">
        {PROVE.items.map((x, i) => {
          const I = OPPORTUNITY_ICON[i];
          return (
            <div key={x.n} className="sb-item rounded-[18px] overflow-hidden grid sm:grid-cols-[1fr_auto]"
              style={{ border: `1px solid ${LINE}` }}>
              <div className="px-7 py-7">
                <div className="flex items-center gap-3.5 mb-4">
                  <span className="grid place-items-center rounded-xl shrink-0" style={{ width: 40, height: 40, background: TINT, color: S }}>
                    <I size={16} />
                  </span>
                  <span className="ar-heading text-[13px] ltr" style={{ color: S }}>{x.n}</span>
                  <span className="ar-heading text-[21px]">{x.t}</span>
                </div>
                <p className="ar-body text-[14.5px] leading-loose" style={{ color: D, opacity: .85 }}>{x.d}</p>
              </div>
              <div className="px-7 py-5 sm:py-7 sm:w-64 flex items-center"
                style={{ background: "#FCF3F2", borderTop: `1px solid #B4231E1F` }}>
                <p className="ar-body text-[12.5px] leading-loose" style={{ color: "#8E1C18" }}>{x.today}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="max-w-3xl mx-auto mt-10 rounded-[20px] px-8 py-10 text-center" style={{ background: S }}>
        <p className="ar-body text-[16px] leading-loose"
          style={{ color: "#fff", textWrap: "balance" } as React.CSSProperties}>
          {PROVE.close}
        </p>
      </div>
    </Section>
  );
}

/* ═══════════════════════════ عناصر مشتركة ══════════════════════════════ */

function Table({ head, rows, widths }: { head: string[]; rows: string[][]; widths?: string[] }) {
  return (
    <div className="max-w-4xl mx-auto overflow-x-auto rounded-[18px]" style={{ border: `1px solid ${LINE}`, background: "#fff" }}>
      <table className="w-full" style={{ borderCollapse: "collapse", minWidth: 520 }}>
        <thead>
          <tr style={{ background: HEAD }}>
            {head.map((h, i) => (
              <th key={h} className="text-right text-[11.5px] px-5 py-3.5 ar-body"
                style={{ color: S, fontWeight: 500, width: widths?.[i] }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="sb-stagger">
          {rows.map((r, i) => (
            <tr key={r[0]} className="sb-item" style={{ borderTop: i ? `1px solid ${RULE}` : "none", background: i % 2 ? ZEBRA : "#fff" }}>
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

function Section({ id, n, eyebrow, title, accent, sub, children }: {
  id: string; n: string; eyebrow: string; title: string; accent: string;
  sub?: string; children: React.ReactNode;
}) {
  const Icon = SECTION_ICON[id];
  return (
    <section id={id} className="sb-slide opacity-0"
      style={{ padding: "92px 24px", background: "#fff", borderTop: `1px solid ${RULE}` }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-5 ar-body text-[11.5px]"
            style={{ background: TINT, color: S }}>
            {Icon && <Icon size={13} />}
            {eyebrow}
          </span>
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
