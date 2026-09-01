"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaCircleCheck, FaCircleXmark, FaTriangleExclamation, FaPhone, FaShieldHalved,
  FaMobileScreen, FaClipboardCheck, FaLayerGroup, FaClock, FaLock, FaArrowLeftLong,
} from "react-icons/fa6";
import {
  ASKS, BROKER, CLOSING, DECISIONS, DOC, PHASES, PRIVACY, PROVIDERS, REGULATORY,
} from "./data";
import { P, PD, PLIGHT, PTINT, O, OTINT, CREAM, LINE, RULE, OK, WARN, BLOCK, STATUS } from "@/components/fodi-cgm/theme";
import ArabicTailProcessor from "@/components/ArabicTailProcessor";
import FodiNav from "@/components/fodi-cgm/FodiNav";
import LatencyRuler from "@/components/fodi-cgm/LatencyRuler";
import ArchitectureMap from "@/components/fodi-cgm/ArchitectureMap";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════════════════
   FODI، تقرير ربط أجهزة قياس الجلوكوز المستمر.
   ═══════════════════════════════════════════════════════════════════════════ */

export default function Page() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (calm) { gsap.set(".f-hero, .f-slide, .f-item", { opacity: 1, y: 0 }); return; }
      gsap.fromTo(".f-hero", { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: "power4.out", delay: 0.15 });
      gsap.utils.toArray<HTMLElement>(".f-slide").forEach((el) => {
        gsap.fromTo(el, { y: 46, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>(".f-stagger").forEach((el) => {
        gsap.fromTo(el.querySelectorAll(".f-item"), { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 87%", once: true } });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <ArabicTailProcessor>
      <div ref={root} style={{ background: "#fff", color: PD, overflowX: "hidden" }}>
        <FodiNav />

        {/* ══ الغلاف ═══════════════════════════════════════════════════════ */}
        <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: `radial-gradient(circle, ${PD}0D 1px, transparent 1px)`, backgroundSize: "26px 26px" }} />

          <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center"
            style={{ paddingTop: 76, paddingBottom: 52 }}>
            <img className="f-hero opacity-0 mb-8" src="/fodi-cgm/logo-1.webp" alt="FODI" style={{ width: 92, height: "auto" }} />

            <span className="f-hero opacity-0 inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-7 ar-body text-[11.5px]"
              style={{ background: OTINT, color: O }}>
              <FaDropletDot /> {DOC.subtitle}
            </span>

            <h1 className="f-hero opacity-0 ar-heading text-center mb-8"
              style={{ fontSize: "clamp(30px, 6.4vw, 66px)", lineHeight: 1.36, color: PD }}>
              نريد قراءة عمرها <span style={{ color: O }}>خمس دقائق</span>
              <br />
              وأقرب مسار متاح يبعد <span style={{ color: BLOCK }}>تسعين</span>
            </h1>

            <p className="f-hero opacity-0 ar-body text-center text-[16px] leading-loose mb-9" style={{ color: PD, opacity: .8, maxWidth: 640 }}>
              لا يوجد اليوم مسار عام يعطي FODI بيانات لحظية من الشركات الثلاث. المسألة ليست تقنية
              وحدها، بل سياسات وصول واتفاقيات ومتطلبات تنظيمية. هذا التقرير يقيس الفجوة بدقة،
              ثم يقترح كيف نطلق دون انتظارها.
            </p>

            {/* الأرقام التي تلخص التقرير */}
            <div className="f-hero opacity-0 w-full max-w-2xl mb-10">
              <div className="grid grid-cols-3 rounded-[18px] overflow-hidden" style={{ border: `1px solid ${LINE}` }}>
                {[
                  { n: "1", l: "مسار نبدأ به اليوم", c: OK },
                  { n: "3", l: "اتصالات خارجية", c: O },
                  { n: "2", l: "مرحلة تنتظر إجابة", c: WARN },
                ].map((x, i) => (
                  <div key={x.l} className="flex flex-col items-center justify-center py-7 px-3"
                    style={{ borderLeft: i < 2 ? `1px solid ${RULE}` : "none" }}>
                    <span className="ar-heading ltr" style={{ fontSize: 34, lineHeight: 1, color: x.c }}>{x.n}</span>
                    <span className="ar-body text-[12px] mt-2.5 text-center" style={{ color: PD, opacity: .65 }}>{x.l}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="f-hero opacity-0 text-center">
              <p className="ar-body text-[12.5px] mb-1.5" style={{ color: PD, opacity: .5 }}>إعداد</p>
              <p className="ar-heading text-[16px] mb-1">أحمد علي</p>
              <a href="https://ahmedali.online" target="_blank" rel="noopener noreferrer"
                className="ltr text-[12.5px]" style={{ color: O }}>ahmedali.online</a>
            </div>
          </div>
        </section>

        {/* ══ 01 · الفجوة ══════════════════════════════════════════════════ */}
        <Section id="s01" n="01" eyebrow="القسم الأول" title="الفجوة، " accent="بالدقائق"
          sub="الهدف المعلن قراءة عمرها بين دقيقة وخمس دقائق. هذا هو موضع كل مزود من ذلك الهدف اليوم.">
          <LatencyRuler />
        </Section>

        {/* ══ 02 · المصادر ═════════════════════════════════════════════════ */}
        <Section id="s02" n="02" eyebrow="القسم الثاني" title="المصادر " accent="الأربعة"
          sub="ما يعطيه كل مزود، وما لا يعطيه، والقرار المقترح فيه.">
          <div className="f-stagger space-y-4 max-w-4xl mx-auto">
            {PROVIDERS.map((v) => {
              const st = STATUS[v.status];
              return (
                <article key={v.key} className="f-item rounded-[20px] overflow-hidden" style={{ border: `1px solid ${LINE}` }}>
                  <header className="flex items-center justify-between gap-3 px-6 py-4 flex-wrap" style={{ background: PTINT }}>
                    <span className="flex items-baseline gap-2.5 min-w-0">
                      <span className="ar-heading text-[17px]" style={{ color: PD }}>{v.name}</span>
                      <span className="ltr text-[11.5px]" style={{ color: PD, opacity: .45 }}>{v.latin}</span>
                    </span>
                    <span className="ar-body text-[11.5px] px-3 py-1.5 rounded-full whitespace-nowrap"
                      style={{ background: st.c, color: "#fff" }}>{st.label}</span>
                  </header>

                  <div className="px-6 py-6 md:px-8">
                    <p className="ar-heading text-[19px] mb-6" style={{ lineHeight: 1.5 }}>{v.headline}</p>

                    <div className="grid gap-4 sm:grid-cols-2 mb-6">
                      <div className="rounded-[14px] p-5" style={{ background: `${OK}0A`, border: `1px solid ${OK}22` }}>
                        <p className="ar-body text-[11.5px] mb-3.5 flex items-center gap-2" style={{ color: OK }}>
                          <FaCircleCheck size={12} /> ما يعطيه
                        </p>
                        <ul className="space-y-2.5">
                          {v.has.map((x) => (
                            <li key={x} className="ar-body text-[12.5px] leading-loose flex gap-2.5" style={{ color: PD, opacity: .85 }}>
                              <span style={{ marginTop: 9, width: 9, height: 2, background: OK, flexShrink: 0 }} />{x}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-[14px] p-5" style={{ background: `${BLOCK}0A`, border: `1px solid ${BLOCK}22` }}>
                        <p className="ar-body text-[11.5px] mb-3.5 flex items-center gap-2" style={{ color: BLOCK }}>
                          <FaCircleXmark size={12} /> ما لا يعطيه
                        </p>
                        <ul className="space-y-2.5">
                          {v.lacks.map((x) => (
                            <li key={x} className="ar-body text-[12.5px] leading-loose flex gap-2.5" style={{ color: PD, opacity: .85 }}>
                              <span style={{ marginTop: 9, width: 9, height: 2, background: BLOCK, flexShrink: 0 }} />{x}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <p className="ar-body text-[13.5px] leading-loose px-5 py-4 rounded-[14px]"
                      style={{ background: OTINT, color: PD }}>
                      <span style={{ color: O }}>القرار: </span>{v.decision}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </Section>

        {/* ══ 03 · الوسيط ══════════════════════════════════════════════════ */}
        <Section id="s03" n="03" eyebrow="القسم الثالث" title="لماذا لا " accent="وسيط واحد" sub={BROKER.body}>
          <div className="f-stagger grid gap-4 md:grid-cols-2 max-w-4xl mx-auto mb-9">
            {BROKER.cases.map((c) => (
              <div key={c.k} className="f-item rounded-[18px] overflow-hidden" style={{ border: `1px solid ${LINE}` }}>
                <div className="flex items-center justify-between px-6 py-4" style={{ background: c.good ? `${OK}0F` : `${BLOCK}0F` }}>
                  <span className="ar-heading text-[16px]">{c.t}</span>
                  <span className="ar-body text-[11.5px] px-3 py-1.5 rounded-full"
                    style={{ background: c.good ? OK : BLOCK, color: "#fff" }}>{c.verdict}</span>
                </div>
                <p className="ar-body text-[13.5px] leading-loose px-6 py-6" style={{ color: PD, opacity: .85 }}>{c.d}</p>
              </div>
            ))}
          </div>
          <div className="max-w-3xl mx-auto rounded-[20px] px-8 py-9 text-center" style={{ background: PD }}>
            <p className="ar-body text-[15.5px] leading-loose" style={{ color: "#fff", textWrap: "balance" } as React.CSSProperties}>
              {BROKER.conclusion}
            </p>
          </div>
        </Section>

        {/* ══ 04 · البنية ══════════════════════════════════════════════════ */}
        <Section id="s04" n="04" eyebrow="القسم الرابع" title="البنية " accent="المقترحة"
          sub="أربعة مصادر، أربعة مسارات مختلفة خارج التطبيق، ونموذج واحد داخله.">
          <ArchitectureMap />
        </Section>

        {/* ══ 05 · المراحل ═════════════════════════════════════════════════ */}
        <Section id="s05" n="05" eyebrow="القسم الخامس" title="المراحل " accent="الأربع"
          sub="مرحلتان نبدأ بهما اليوم دون إذن من أحد، ومرحلتان تنتظران إجابة خارجية.">
          <div className="f-stagger max-w-4xl mx-auto space-y-4">
            {PHASES.map((ph) => (
              <div key={ph.n} className="f-item rounded-[20px] overflow-hidden" style={{ border: `1px solid ${ph.blocked ? `${WARN}44` : LINE}` }}>
                <div className="flex items-center justify-between gap-3 px-6 py-4 flex-wrap"
                  style={{ background: ph.blocked ? `${WARN}0F` : `${OK}0D` }}>
                  <span className="flex items-baseline gap-3">
                    <span className="ar-heading text-[13px] ltr" style={{ color: ph.blocked ? WARN : OK }}>{ph.n}</span>
                    <span className="ar-heading text-[17px]">{ph.t}</span>
                    <span className="ltr text-[11px]" style={{ color: PD, opacity: .4 }}>{ph.latin}</span>
                  </span>
                  <span className="ar-body text-[11.5px] px-3 py-1.5 rounded-full flex items-center gap-2 whitespace-nowrap"
                    style={{ background: ph.blocked ? WARN : OK, color: "#fff" }}>
                    {ph.blocked ? <FaLock size={10} /> : <FaCircleCheck size={11} />}
                    {ph.gate}
                  </span>
                </div>
                <div className="px-6 py-6 md:px-8">
                  <ul className="space-y-2.5 mb-6">
                    {ph.work.map((w) => (
                      <li key={w} className="ar-body text-[13.5px] leading-loose flex gap-3" style={{ color: PD, opacity: .85 }}>
                        <span style={{ marginTop: 9, width: 11, height: 2, background: ph.blocked ? WARN : OK, flexShrink: 0 }} />{w}
                      </li>
                    ))}
                  </ul>
                  <p className="ar-body text-[13px] leading-loose pt-4 flex gap-2.5" style={{ borderTop: `1px solid ${RULE}`, color: O }}>
                    <FaArrowLeftLong size={12} className="shrink-0 mt-1.5" />
                    {ph.unlocks}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ══ 06 · الاتصالات ═══════════════════════════════════════════════ */}
        <Section id="s06" n="06" eyebrow="القسم السادس" title="ثلاثة " accent="اتصالات"
          sub="ثلاثة أسئلة فقط، تنفذ بالتوازي. كل واحد منها يفتح مسارا أو يغلقه نهائيا.">
          <div className="f-stagger max-w-4xl mx-auto space-y-4">
            {ASKS.map((a, i) => (
              <div key={a.who} className="f-item rounded-[20px] overflow-hidden grid md:grid-cols-[auto_1fr]"
                style={{ border: `1px solid ${LINE}` }}>
                <div className="flex md:flex-col items-center justify-center gap-3 px-7 py-6 md:w-44"
                  style={{ background: PTINT }}>
                  <span className="grid place-items-center rounded-xl" style={{ width: 42, height: 42, background: P, color: "#fff" }}>
                    <FaPhone size={16} />
                  </span>
                  <span className="text-center">
                    <span className="ar-heading block text-[16px]">{a.who}</span>
                    <span className="ltr block text-[10.5px] mt-1" style={{ color: PD, opacity: .45 }}>{a.latin}</span>
                  </span>
                </div>
                <div className="px-7 py-6">
                  <p className="ar-body text-[11.5px] mb-2.5" style={{ color: O }}>السؤال</p>
                  <p className="ar-heading text-[16px] leading-relaxed mb-5">{a.ask}</p>
                  <p className="ar-body text-[13px] leading-loose mb-4" style={{ color: PD, opacity: .8 }}>{a.why}</p>
                  <span className="ar-body text-[11.5px] px-3 py-1.5 rounded-full inline-flex items-center gap-2"
                    style={{ background: `${WARN}18`, color: WARN }}>
                    <FaClock size={10} /> يوقف: {a.blocks}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ══ 07 · التنظيم ═════════════════════════════════════════════════ */}
        <Section id="s07" n="07" eyebrow="القسم السابع" title="الحد " accent="التنظيمي" sub={REGULATORY.intro}>
          <div className="f-stagger grid gap-4 md:grid-cols-2 max-w-4xl mx-auto mb-9">
            {[
              { d: REGULATORY.allowed, c: OK, icon: FaCircleCheck, side: "داخل النطاق" },
              { d: REGULATORY.restricted, c: BLOCK, icon: FaShieldHalved, side: "خارج النطاق" },
            ].map(({ d, c, icon: Icon }) => (
              <div key={d.latin} className="f-item rounded-[20px] overflow-hidden" style={{ border: `1px solid ${c}33` }}>
                <div className="px-6 py-5" style={{ background: `${c}0F` }}>
                  <span className="flex items-center gap-2.5 mb-1.5" style={{ color: c }}>
                    <Icon size={14} />
                    <span className="ar-heading text-[16px]">{d.t}</span>
                  </span>
                  <span className="ltr text-[11.5px]" style={{ color: PD, opacity: .5 }}>{d.latin}</span>
                </div>
                <ul className="px-6 py-6 space-y-3">
                  {d.items.map((x) => (
                    <li key={x} className="ar-body text-[13.5px] leading-loose flex gap-3" style={{ color: PD, opacity: .85 }}>
                      <span style={{ marginTop: 9, width: 11, height: 2, background: c, flexShrink: 0 }} />{x}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="max-w-3xl mx-auto rounded-[20px] px-8 py-9 text-center mb-9" style={{ background: PD }}>
            <p className="ar-body text-[15.5px] leading-loose" style={{ color: "#fff", textWrap: "balance" } as React.CSSProperties}>
              {REGULATORY.verdict}
            </p>
          </div>

          {/* الخصوصية */}
          <div className="max-w-4xl mx-auto rounded-[20px] overflow-hidden" style={{ border: `1px solid ${LINE}` }}>
            <div className="px-6 py-4 flex items-center gap-2.5" style={{ background: OTINT }}>
              <FaClipboardCheck size={14} color={O} />
              <span className="ar-heading text-[16px]">تحديث الخصوصية</span>
              <span className="ar-body text-[11.5px] px-3 py-1 rounded-full mr-auto" style={{ background: O, color: "#fff" }}>
                {PRIVACY.gate}
              </span>
            </div>
            <div className="px-6 py-6 md:px-8">
              <p className="ar-body text-[13.5px] leading-loose mb-5" style={{ color: PD, opacity: .85 }}>{PRIVACY.why}</p>
              <div className="flex flex-wrap gap-2">
                {PRIVACY.items.map((x) => (
                  <span key={x} className="ar-body text-[12.5px] px-3.5 py-2 rounded-lg" style={{ background: PTINT, color: PD }}>{x}</span>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ══ 08 · تجربة المستخدم ══════════════════════════════════════════ */}
        <Section id="s08" n="08" eyebrow="القسم الثامن" title="تجربة " accent="المستخدم"
          sub="عمر القراءة يظهر دائما. بعض المصادر ليست لحظية، وإخفاء ذلك يجعل المستخدم يقرأ رقما قديما على أنه الآن.">
          <div className="max-w-md mx-auto">
            <div className="rounded-[26px] overflow-hidden" style={{ border: `8px solid ${PD}`, background: "#fff" }}>
              <div className="px-6 py-5" style={{ background: CREAM }}>
                <p className="ar-body text-[11.5px] mb-1" style={{ color: PD, opacity: .55 }}>Glucose Insights</p>
                <p className="ar-heading text-[17px]">رؤى الجلوكوز</p>
              </div>
              <div className="px-6 py-8 text-center">
                <p className="ar-heading ltr" style={{ fontSize: 54, lineHeight: 1, color: OK }}>112</p>
                <p className="ar-body text-[12.5px] mt-2" style={{ color: PD, opacity: .55 }}>mg/dL</p>

                <div className="mt-7 pt-6 space-y-3" style={{ borderTop: `1px solid ${RULE}` }}>
                  <Row k="آخر تحديث" v="منذ ساعتين و48 دقيقة" warn />
                  <Row k="المصدر" v="Dexcom" />
                  <Row k="الحالة" v="ضمن النطاق" ok />
                </div>
              </div>
              <div className="px-6 py-4 flex flex-wrap gap-2" style={{ borderTop: `1px solid ${RULE}` }}>
                {["Apple Health", "Health Connect", "Dexcom", "FreeStyle Libre", "SiBionics"].map((x) => (
                  <span key={x} className="ltr text-[11px] px-2.5 py-1.5 rounded-lg" style={{ background: PTINT, color: PD }}>{x}</span>
                ))}
              </div>
            </div>
            <p className="ar-body text-[12.5px] text-center mt-6 leading-loose" style={{ color: PD, opacity: .7 }}>
              الرقم وحده يكذب إن كان عمره ساعتين. لهذا يظهر عمر القراءة بجواره دائما، وبلون
              يتغير كلما تقادمت.
            </p>
          </div>
        </Section>

        {/* ══ 09 · القرار ══════════════════════════════════════════════════ */}
        <Section id="s09" n="09" eyebrow="القسم التاسع" title="القرار " accent="المطلوب"
          sub="لا ننتظر اللحظية حتى نبدأ. خمس موافقات، أولاها لا تحتاج أحدا خارج الفريق.">
          <div className="f-stagger max-w-3xl mx-auto overflow-x-auto rounded-[20px]" style={{ border: `1px solid ${LINE}` }}>
            <table className="w-full" style={{ borderCollapse: "collapse", minWidth: 520 }}>
              <thead>
                <tr style={{ background: PTINT }}>
                  {["#", "الموافقة المطلوبة", "ما تحتاجه"].map((h) => (
                    <th key={h} className="text-right ar-body text-[11.5px] px-5 py-4" style={{ color: P, fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DECISIONS.map((d, i) => (
                  <tr key={d.n} className="f-item" style={{ borderTop: i ? `1px solid ${RULE}` : "none", background: i % 2 ? "#FCFAFB" : "#fff" }}>
                    <td className="px-5 py-4 ltr text-[12px]" style={{ color: O, borderRight: `3px solid ${O}`, fontWeight: 600 }}>{d.n}</td>
                    <td className="px-5 py-4 ar-body text-[13.5px] leading-loose">{d.t}</td>
                    <td className="px-5 py-4 ar-body text-[12px] whitespace-nowrap" style={{ color: PD, opacity: .65 }}>{d.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="f-stagger grid gap-4 md:grid-cols-3 max-w-4xl mx-auto mt-10">
            {[
              { ...CLOSING.short, c: OK },
              { ...CLOSING.mid, c: WARN },
              { ...CLOSING.strategic, c: PLIGHT },
            ].map((x) => (
              <div key={x.t} className="f-item rounded-[18px] p-7" style={{ border: `1px solid ${LINE}` }}>
                <span className="block rounded-full mb-5" style={{ width: 32, height: 4, background: x.c }} />
                <p className="ar-heading text-[17px] mb-3">{x.t}</p>
                <p className="ar-body text-[13px] leading-loose" style={{ color: PD, opacity: .8 }}>{x.d}</p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto mt-10 rounded-[20px] px-8 py-9 text-center" style={{ background: PD }}>
            <p className="ar-body text-[15.5px] leading-loose" style={{ color: "#fff", textWrap: "balance" } as React.CSSProperties}>
              {CLOSING.verdict}
            </p>
          </div>
        </Section>

        {/* ══ الخاتمة ══════════════════════════════════════════════════════ */}
        <section style={{ padding: "72px 24px 96px", borderTop: `1px solid ${RULE}` }}>
          <div className="f-slide opacity-0 max-w-2xl mx-auto text-center">
            <img src="/fodi-cgm/logo-1.webp" alt="FODI" style={{ width: 64, height: "auto", margin: "0 auto 24px" }} />
            <p className="ar-heading text-[16px] mb-1.5">أحمد علي</p>
            <p className="ar-body text-[12.5px] mb-5" style={{ color: PD, opacity: .6 }}>استراتيجي رقمي · مطور منتجات</p>
            <a href="mailto:hello@ahmedali.online" className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[13px] ltr"
              style={{ background: P, color: "#fff" }}>hello@ahmedali.online</a>
          </div>
        </section>
      </div>
    </ArabicTailProcessor>
  );
}

/* ═══════════════════════════ عناصر مشتركة ══════════════════════════════ */

function FaDropletDot() {
  return <span style={{ width: 7, height: 7, borderRadius: 99, background: O, display: "inline-block" }} />;
}

function Row({ k, v, warn, ok }: { k: string; v: string; warn?: boolean; ok?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="ar-body text-[12.5px]" style={{ color: PD, opacity: .6 }}>{k}</span>
      <span className="ar-body text-[13px]" style={{ color: warn ? WARN : ok ? OK : PD }}>{v}</span>
    </div>
  );
}

function Section({ id, n, eyebrow, title, accent, sub, children }: {
  id: string; n: string; eyebrow: string; title: string; accent: string;
  sub?: string; children: React.ReactNode;
}) {
  return (
    <section id={id} className="f-slide opacity-0" style={{ padding: "88px 24px", background: "#fff", borderTop: `1px solid ${RULE}` }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-5 ar-body text-[11.5px]"
            style={{ background: PTINT, color: P }}>
            <span style={{ width: 6, height: 6, borderRadius: 99, background: P }} />
            {eyebrow}
          </span>
          <h2 className="ar-heading mb-5" style={{ fontSize: "clamp(26px, 4.4vw, 46px)", lineHeight: 1.4, color: PD }}>
            {title}<span style={{ color: O }}>{accent}</span>
          </h2>
          {sub && <p className="ar-body text-[15px] leading-loose max-w-2xl mx-auto" style={{ color: PD, opacity: .7 }}>{sub}</p>}
          <div className="flex items-center justify-center gap-1 mt-6">
            {[P, O, PLIGHT].map((c, i) => <span key={i} style={{ width: 22, height: 3, background: c }} />)}
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
