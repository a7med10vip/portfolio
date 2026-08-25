"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AUDIT, CONCEPT, ESTATE, FINDINGS, STATUS_LABEL } from "./data";
import { S, S_SOFT, D, LINE, RULE, MONO, SEV } from "@/components/sunbulah/theme";
import Nav from "@/components/sunbulah/Nav";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════════════════
   مجموعة السنبلة — تدقيق الحضور الرقمي، وتصور لصفحة رئيسية جديدة.
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
      gsap.fromTo(".sb-hero", { y: 38, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.09, ease: "power4.out", delay: 0.2 });
      gsap.utils.toArray<HTMLElement>(".sb-slide").forEach((el) => {
        gsap.fromTo(el, { y: 56, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 87%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>(".sb-stagger").forEach((el) => {
        gsap.fromTo(el.querySelectorAll(".sb-item"), { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>(".sb-count").forEach((el) => {
        const to = Number(el.dataset.to ?? 0);
        const o = { v: 0 };
        gsap.to(o, { v: to, duration: 1.4, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
          onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString("en-US"); } });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const critical = FINDINGS.filter((f) => f.severity === "critical").length;
  const high = FINDINGS.filter((f) => f.severity === "high").length;

  return (
    <div ref={root} style={{ background: "#fff", color: D, overflowX: "hidden" }}>
      <Nav />

      {/* ══ الغلاف ═════════════════════════════════════════════════════════ */}
      <section style={{ padding: "104px 24px 72px" }}>
        <div className="max-w-5xl mx-auto text-center">
          <p className="sb-hero opacity-0 text-[12px] mb-6" style={{ color: S }}>
            وثيقة مستقلة · غير مطلوبة · {AUDIT.date}
          </p>
          <h1 className="sb-hero opacity-0 heading mx-auto"
            style={{ fontSize: "clamp(34px, 6.4vw, 76px)", lineHeight: 1.32, color: D, maxWidth: 900 }}>
            موقع لا يشبه
            <br />
            <span style={{ color: S }}>حجم المجموعة.</span>
          </h1>
          <p className="sb-hero opacity-0 body-serif mx-auto mt-9 text-[16px] leading-loose"
            style={{ color: D, maxWidth: 640 }}>
            مجموعة السنبلة تصنّع الغذاء منذ 1980، وتعمل في 35 دولة، وتملك أربع علامات.
            وموقعها المؤسسي اليوم اثنتان وعشرون صفحة على نظام إدارة محتوى انتهى دعمه، بقالبه
            التجريبي كما يأتي من المصنع.
          </p>
          <p className="sb-hero opacity-0 body-serif mx-auto mt-5 text-[15px] leading-loose"
            style={{ color: D, maxWidth: 640 }}>
            هذه الوثيقة تقيس الفجوة، ثم تقترح ما يسدّها.
          </p>

          <div className="sb-hero opacity-0 flex items-stretch justify-center max-w-2xl mx-auto mt-12"
            style={{ border: `1px solid ${LINE}`, borderRadius: 16, overflow: "hidden" }}>
            {[
              { n: FINDINGS.length, l: "ملاحظة" },
              { n: critical, l: "حرجة" },
              { n: high, l: "مرتفعة" },
              { n: 8, l: "عناوين رقمية" },
            ].map((x, i) => (
              <div key={x.l} className="flex-1 flex flex-col items-center justify-center py-5 px-2"
                style={{ borderLeft: i < 3 ? `1px solid ${RULE}` : "none" }}>
                <span className="heading tabular-nums sb-count ltr" data-to={x.n} style={{ fontSize: 26, color: D }}>0</span>
                <span className="text-[11.5px] mt-2" style={{ color: D, opacity: .55 }}>{x.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Band />

      {/* ══ 01 · المنهج ════════════════════════════════════════════════════ */}
      <Section id="s01" n="01" title="كيف قيس" accent="هذا">
        <div className="max-w-3xl mx-auto">
          <p className="body-serif text-[16px] leading-loose text-center mb-10" style={{ color: D }}>
            {AUDIT.method}
          </p>
          <div className="sb-stagger grid gap-4 sm:grid-cols-3">
            {[
              { t: "من الخارج فقط", d: "كل ما هنا مرئي لأي زائر. لا وصول، ولا صلاحيات، ولا بيانات داخلية." },
              { t: "قابل للتكرار", d: "كل رقم صدر عن أمر أو تشغيل متصفح يمكن إعادته على الموقع اليوم." },
              { t: "ما لم يُتحقق منه لم يُذكر", d: "حيث تعذّر التأكد، حُذف الادعاء بدل تقديره." },
            ].map((c) => (
              <div key={c.t} className="sb-item rounded-[16px] p-6" style={{ border: `1px solid ${LINE}` }}>
                <p className="heading text-[16px] mb-3" style={{ color: D }}>{c.t}</p>
                <p className="text-[13px] leading-loose" style={{ color: D, opacity: .72 }}>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Band />

      {/* ══ 02 · الحضور الرقمي ═════════════════════════════════════════════ */}
      <Section id="s02" n="02" title="الحضور" accent="الرقمي">
        <p className="body-serif text-[16px] leading-loose text-center max-w-2xl mx-auto mb-12" style={{ color: D }}>
          ثمانية عناوين تحمل اسم المجموعة أو إحدى علاماتها. ثلاثة منها لا تعمل، واثنان يؤديان
          الوظيفة نفسها بمسارين مختلفين.
        </p>
        <div className="sb-stagger max-w-4xl mx-auto" style={{ border: `1px solid ${LINE}`, borderRadius: 18, overflow: "hidden" }}>
          {ESTATE.map((p, i) => (
            <div key={p.url + p.name} className="sb-item flex flex-col sm:flex-row sm:items-center gap-3 px-6 py-5"
              style={{ borderTop: i ? `1px solid ${RULE}` : "none" }}>
              <div className="sm:w-52 shrink-0">
                <p className="heading text-[15px]" style={{ color: D }}>{p.name}</p>
                <p className="text-[11px] ltr mt-1" style={{ color: D, opacity: .5, fontFamily: MONO }}>{p.url}</p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12.5px] mb-1" style={{ color: S }}>{p.what}</p>
                <p className="text-[12.5px] leading-loose" style={{ color: D, opacity: .78 }}>{p.note}</p>
              </div>
              <span className="text-[12px] px-2.5 py-1 rounded-full shrink-0 self-start sm:self-center"
                style={{
                  background: p.status === "broken" ? "#B4231E" : p.status === "weak" ? `${S}1A` : `${S}00`,
                  color: p.status === "broken" ? "#fff" : p.status === "weak" ? S : "#2E7D32",
                  border: p.status === "good" ? "1px solid #2E7D3240" : "none",
                }}>
                {STATUS_LABEL[p.status]}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Band />

      {/* ══ 03 · الملاحظات ═════════════════════════════════════════════════ */}
      <Section id="s03" n="03" title="ما" accent="وُجد">
        <p className="body-serif text-[16px] leading-loose text-center max-w-2xl mx-auto mb-14" style={{ color: D }}>
          ثلاث عشرة ملاحظة، مرتبة بالأثر لا بالترتيب الذي وُجدت به. كل واحدة تذكر ما رُصد،
          والقياس الحرفي، والكلفة، ثم ما ينبغي عمله.
        </p>
        <div className="space-y-5 max-w-4xl mx-auto">
          {FINDINGS.map((f) => {
            const sev = SEV[f.severity];
            return (
              <article key={f.id} className="sb-slide opacity-0 rounded-[20px] overflow-hidden"
                style={{ border: `1px solid ${f.severity === "critical" ? "#B4231E33" : LINE}` }}>
                <div className="flex items-center justify-between gap-3 px-6 py-3.5"
                  style={{ background: f.severity === "critical" ? "#B4231E0A" : RULE }}>
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="heading text-[13px] ltr" style={{ color: S }}>{f.n}</span>
                    <span style={{ width: 20, height: 1, background: `${S}66` }} />
                    <span className="text-[11px]" style={{ color: D, opacity: .65 }}>{f.area}</span>
                  </div>
                  <span className="text-[11.5px] px-2.5 py-1 rounded-full shrink-0"
                    style={{ background: sev.bg, color: sev.fg }}>{sev.label}</span>
                </div>

                <div className="px-6 py-7">
                  <h3 className="heading mb-5" style={{ fontSize: 22, lineHeight: 1.5, color: D }}>{f.title}</h3>
                  <p className="body-serif text-[14.5px] leading-loose mb-5" style={{ color: D, opacity: .85 }}>{f.evidence}</p>

                  {f.proof && (
                    <pre className="text-[11.5px] px-4 py-3 rounded-xl mb-6"
                      style={{
                        background: "#fff", border: `1px solid ${LINE}`, color: D, fontFamily: MONO,
                        /* الشيفرة تُقرأ من اليسار، لكنها تبقى صندوقًا يمرّر داخل نفسه
                           بدل أن تدفع الصفحة عرضًا على الجوال. */
                        direction: "ltr", textAlign: "left", overflowX: "auto", maxWidth: "100%",
                      }}>
                      {f.proof}
                    </pre>
                  )}

                  <div className="grid gap-5 sm:grid-cols-2 pt-5" style={{ borderTop: `1px solid ${RULE}` }}>
                    <div>
                      <p className="text-[11.5px] mb-2.5" style={{ color: D, opacity: .5 }}>الكلفة</p>
                      <p className="text-[13px] leading-loose" style={{ color: D, opacity: .82 }}>{f.impact}</p>
                    </div>
                    <div>
                      <p className="text-[11.5px] mb-2.5" style={{ color: S }}>المعالجة</p>
                      <p className="text-[13px] leading-loose" style={{ color: D, opacity: .82 }}>{f.fix}</p>
                      <span className="inline-block text-[12px] mt-3 px-2.5 py-1 rounded-full"
                        style={{ background: `${S}14`, color: S }}>{f.effort}</span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Band />

      {/* ══ 04 · عصران ═════════════════════════════════════════════════════ */}
      <Section id="s04" n="04" title="عصران وشركة" accent="واحدة">
        <p className="body-serif text-[16px] leading-loose text-center max-w-2xl mx-auto mb-12" style={{ color: D }}>
          لا حاجة إلى الجدال بأن الموقع المؤسسي قديم. يكفي وضعه إلى جوار موقع المستهلك الذي
          تملكه المجموعة نفسها: الأول على Joomla 3، والثاني على Next.js.
        </p>
        <div className="sb-stagger grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
          {[
            { shot: "group-home-desktop", t: "الموقع المؤسسي", u: "sunbulahgroup.com", n: "Joomla 3 · قالب protostar الافتراضي · 22 صفحة", bad: true },
            { shot: "consumer-home-desktop", t: "موقع المستهلك", u: "sunbulah.com", n: "Next.js · ثنائي اللغة · تصوير حديث · يُحدَّث فعليًا", bad: false },
          ].map((c) => (
            <figure key={c.shot} className="sb-item m-0">
              <div className="overflow-hidden" style={{ borderRadius: 14, border: `1px solid ${c.bad ? "#B4231E33" : LINE}` }}>
                <div className="flex items-center gap-1.5 px-3.5" style={{ height: 30, borderBottom: `1px solid ${RULE}` }}>
                  {["#E8E3D8", "#EFEBE2", "#F4F1EA"].map((x) => (
                    <span key={x} style={{ width: 7, height: 7, borderRadius: 99, background: x }} />
                  ))}
                  <span className="mr-2.5 text-[11px] ltr" style={{ color: D, opacity: .45, fontFamily: MONO }}>{c.u}</span>
                </div>
                <img src={`/sunbulah/audit/${c.shot}.webp`} alt={c.t} loading="lazy" decoding="async" style={{ display: "block", width: "100%" }} />
              </div>
              <figcaption className="mt-4">
                <p className="heading text-[17px] mb-1.5" style={{ color: c.bad ? D : S }}>{c.t}</p>
                <p className="text-[12px] ltr" style={{ color: D, opacity: .6, fontFamily: MONO }}>{c.n}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="max-w-2xl mx-auto mt-14 rounded-[18px] p-7 text-center" style={{ border: `1px solid ${S}44` }}>
          <p className="body-serif text-[15.5px] leading-loose" style={{ color: D }}>
            الشركة نفسها، وميزانية التسويق نفسها، وفريق واحد. الفارق أن أحد الموقعين أُعيد بناؤه
            والآخر لم يُفتح منذ عشر سنوات.
          </p>
        </div>
      </Section>

      <Band />

      {/* ══ 05 · من أين يُبدأ ══════════════════════════════════════════════ */}
      <Section id="s05" n="05" title="من أين" accent="يُبدأ">
        <p className="body-serif text-[16px] leading-loose text-center max-w-2xl mx-auto mb-12" style={{ color: D }}>
          ليست كل ملاحظة تحتاج إعادة بناء. أربع منها تُغلق في يوم واحد، وأثرها فوري.
        </p>
        <div className="sb-stagger space-y-4 max-w-3xl mx-auto">
          {[
            {
              n: "أولًا", t: "خلال يوم", c: `${S}`,
              items: ["إصلاح شهادة بوابة التوظيف، أو تحويل الرابط إلى البوابة العاملة", "عنوان ووصف لكل صفحة من الاثنتين والعشرين", "تصحيح lang وdir على النسخة العربية", "إصلاح الرابط المعطّل إلى موقع المستهلك"],
            },
            {
              n: "ثانيًا", t: "خلال أسبوع", c: `${S_SOFT}`,
              items: ["وسوم المشاركة وبيانات Organization المنظمة", "خريطة موقع، وترويسات تخزين مؤقت", "تحميل مؤجل للصور، وأهداف لمس بالمقاس الصحيح"],
            },
            {
              n: "ثالثًا", t: "إعادة البناء", c: "#8C7A3F",
              items: ["منصة مدعومة، وأفضلها ما يعمل عليه موقع المستهلك أصلًا", "صفحة حقيقية لكل علامة، وصفحة جامعة لها", "أقسام التصنيع والانتشار والقيادة وغرفة الأخبار", "تصوير بضعف دقة الشاشة"],
            },
          ].map((p) => (
            <div key={p.n} className="sb-item rounded-[18px] overflow-hidden" style={{ border: `1px solid ${LINE}` }}>
              <div className="flex items-center gap-3 px-6 py-3.5" style={{ background: `${p.c}12` }}>
                <span className="heading text-[15px]" style={{ color: p.c }}>{p.n}</span>
                <span style={{ width: 20, height: 1, background: `${p.c}66` }} />
                <span className="text-[12px]" style={{ color: D, opacity: .7 }}>{p.t}</span>
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

      {/* ══ الفاصل إلى التصور ══════════════════════════════════════════════ */}
      <section style={{ padding: "80px 24px" }}>
        <div className="sb-slide opacity-0 max-w-3xl mx-auto text-center">
          <p className="text-[12px] mb-6" style={{ color: S }}>الجزء الثاني</p>
          <h2 className="heading mb-7" style={{ fontSize: "clamp(28px, 5vw, 52px)", lineHeight: 1.36, color: D }}>
            وهكذا يمكن أن يبدو.
          </h2>
          <p className="body-serif text-[16px] leading-loose" style={{ color: D, maxWidth: 620, margin: "0 auto" }}>
            ما يلي تصور لصفحة رئيسية، مبني على ما هي عليه المجموعة فعلًا لا على ما يمكن تخيّله:
            الأرقام من بياناتهم المنشورة، والصور من أصولهم هم، والعلامات الأربع كما هي.
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
      <Band />
      <section style={{ padding: "72px 24px 96px" }}>
        <div className="sb-slide opacity-0 max-w-3xl mx-auto rounded-[24px] p-9 md:p-14 text-center" style={{ border: `1px solid ${LINE}` }}>
          <p className="text-[12px] mb-6" style={{ color: S }}>عن هذه الوثيقة</p>
          <p className="body-serif text-[15.5px] leading-loose mb-9" style={{ color: D }}>
            أُعدّت من الخارج، دون تكليف ودون وصول إلى أي نظام. كل قياس فيها قابل لإعادة التشغيل
            على الموقع اليوم. ولا تتضمن أسعارًا ولا نطاق عمل، لأن غرضها أن تُقرأ لا أن تُشترى.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <a href="mailto:ahmed.ali@emotiongrp.com"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[13px]"
              style={{ background: S, color: "#fff" }}>
              ahmed.ali@emotiongrp.com
            </a>
            <a href="https://www.linkedin.com/in/ahmed-alli" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[13px]"
              style={{ border: `1.5px solid ${S}`, color: D }}>
              LinkedIn
            </a>
          </div>
          <p className="heading text-[17px] mb-1.5" style={{ color: D }}>أحمد علي</p>
          <p className="text-[12.5px]" style={{ color: D, opacity: .6 }}>
            رئيس المنتجات الرقمية والنمو · مجموعة إيموشن
          </p>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════ التصور ════════════════════════════════════ */

function ConceptHero() {
  return (
    <section id="s06" className="sb-slide opacity-0 relative" style={{ margin: "0 0 8px" }}>
      <div className="relative overflow-hidden" style={{ height: "min(84vh, 760px)" }}>
        <img src="/sunbulah/hero-a.webp" alt="" loading="lazy" decoding="async"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div className="absolute inset-0 flex items-center"
          style={{ background: "linear-gradient(to left, rgba(20,19,15,.86) 0%, rgba(20,19,15,.62) 46%, rgba(20,19,15,.24) 100%)" }}>
          <div className="px-7 md:px-16 max-w-3xl">
            <p className="text-[12px] mb-6" style={{ color: S_SOFT }}>{CONCEPT.hero.eyebrow}</p>
            <h2 className="heading" style={{ fontSize: "clamp(30px, 5.6vw, 66px)", lineHeight: 1.36, color: "#fff" }}>
              {CONCEPT.hero.line1}
              <br />
              {CONCEPT.hero.line2}
            </h2>
            <p className="body-serif mt-7 text-[16px] leading-loose" style={{ color: "#fff", opacity: .82 }}>
              {CONCEPT.hero.sub}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConceptScale() {
  return (
    <section id="s07" className="sb-slide opacity-0" style={{ padding: "88px 24px" }}>
      <div className="sb-stagger max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: LINE, border: `1px solid ${LINE}`, borderRadius: 20, overflow: "hidden" }}>
        {CONCEPT.scale.map((x) => (
          <div key={x.l} className="sb-item flex flex-col items-center justify-center text-center px-4 py-12" style={{ background: "#fff" }}>
            <span className="heading ltr" style={{ fontSize: 44, lineHeight: 1, color: S }}>{x.n}</span>
            <span className="heading text-[15px] mt-4" style={{ color: D }}>{x.l}</span>
            <span className="text-[11.5px] mt-2 leading-loose" style={{ color: D, opacity: .6 }}>{x.s}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ConceptBrands() {
  return (
    <section id="s08" style={{ padding: "24px 24px 88px" }}>
      <div className="max-w-6xl mx-auto">
        <div className="sb-slide opacity-0 text-center mb-14">
          <p className="text-[11px] mb-4" style={{ color: S }}>العلامات</p>
          <h3 className="heading" style={{ fontSize: "clamp(26px, 4.4vw, 46px)", lineHeight: 1.4, color: D }}>
            أربع علامات، لا أربعة شعارات.
          </h3>
        </div>
        <div className="sb-stagger space-y-5">
          {CONCEPT.brands.map((b, i) => (
            <div key={b.key} className="sb-item rounded-[22px] overflow-hidden grid md:grid-cols-[1fr_320px]"
              style={{ border: `1px solid ${LINE}` }}>
              <div className="p-9 md:p-12">
                <div className="flex items-baseline gap-3 mb-5">
                  <span className="heading" style={{ fontSize: 34, color: b.tone }}>{b.name}</span>
                  <span className="text-[12px] ltr" style={{ color: D, opacity: .45, fontFamily: MONO }}>{b.latin}</span>
                  {b.since !== "—" && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full ltr" style={{ background: `${b.tone}16`, color: b.tone }}>{b.since}</span>
                  )}
                </div>
                <p className="body-serif text-[17px] leading-loose mb-4" style={{ color: D }}>{b.line}</p>
                <p className="text-[13px] leading-loose" style={{ color: D, opacity: .68 }}>{b.note}</p>
              </div>
              <div className="relative min-h-[180px]" style={{ background: `${b.tone}0E` }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="heading" style={{ fontSize: 96, color: `${b.tone}1F`, lineHeight: 1 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConceptMake() {
  return (
    <section id="s09" className="sb-slide opacity-0" style={{ padding: "88px 24px" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11px] mb-4" style={{ color: S }}>التصنيع والفئات</p>
          <h3 className="heading mb-6" style={{ fontSize: "clamp(26px, 4.4vw, 46px)", lineHeight: 1.4, color: D }}>
            يُصنع بدقة، ويُبنى على نطاق.
          </h3>
          <p className="body-serif text-[16px] leading-loose max-w-2xl mx-auto" style={{ color: D }}>
            الجزء الذي لا يعرضه أي موقع سلع استهلاكية، وهو بالضبط ما يميّز مجموعة تصنيع عن
            شركة تجارية.
          </p>
        </div>

        <div className="sb-stagger grid gap-4 md:grid-cols-3 mb-16">
          {CONCEPT.ecosystem.map((e) => (
            <div key={e.n} className="sb-item rounded-[18px] p-8" style={{ border: `1px solid ${LINE}` }}>
              <p className="heading text-[13px] mb-4 ltr" style={{ color: S }}>{e.n}</p>
              <p className="heading text-[21px] mb-3" style={{ color: D }}>{e.t}</p>
              <p className="text-[13px] leading-loose" style={{ color: D, opacity: .72 }}>{e.d}</p>
            </div>
          ))}
        </div>

        <div className="sb-stagger grid grid-cols-2 md:grid-cols-4 gap-4">
          {CONCEPT.categories.map((c) => (
            <figure key={c.key} className="sb-item m-0 rounded-[16px] overflow-hidden" style={{ border: `1px solid ${LINE}` }}>
              <div style={{ aspectRatio: "1.35", overflow: "hidden", background: RULE }}>
                <img src={`/sunbulah/cat/${c.key}.webp`} alt={c.ar} loading="lazy" decoding="async"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <figcaption className="px-4 py-3.5">
                <p className="heading text-[14px]" style={{ color: D }}>{c.ar}</p>
                <p className="text-[12px] mt-1 ltr" style={{ color: D, opacity: .45, fontFamily: MONO }}>{c.en}</p>
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
    <section id="s10" className="sb-slide opacity-0" style={{ padding: "0 24px 88px" }}>
      <div className="max-w-5xl mx-auto rounded-[24px] overflow-hidden" style={{ border: `1px solid ${LINE}` }}>
        <div className="relative">
          <img src="/sunbulah/hero-b.webp" alt="" loading="lazy" decoding="async"
            style={{ width: "100%", height: "min(48vh, 420px)", objectFit: "cover", display: "block" }} />
          <div className="absolute inset-0 flex items-center"
            style={{ background: "linear-gradient(to left, rgba(20,19,15,.88) 0%, rgba(20,19,15,.42) 70%, rgba(20,19,15,.15) 100%)" }}>
            <div className="px-8 md:px-14">
              <p className="text-[11px] mb-4" style={{ color: S_SOFT }}>الانتشار</p>
              <h3 className="heading" style={{ fontSize: "clamp(24px, 4vw, 42px)", lineHeight: 1.4, color: "#fff" }}>
                من جدة إلى 35 دولة.
              </h3>
            </div>
          </div>
        </div>
        <div className="sb-stagger grid grid-cols-2 md:grid-cols-4">
          {REGIONS.map((x, i) => (
            <div key={x.r} className="sb-item px-6 py-7" style={{ borderLeft: i < 3 ? `1px solid ${RULE}` : "none", borderTop: `1px solid ${RULE}` }}>
              <p className="heading text-[16px] mb-2" style={{ color: D }}>{x.r}</p>
              <p className="text-[11.5px]" style={{ color: D, opacity: .6 }}>{x.n}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConceptHistory() {
  return (
    <section id="s11" className="sb-slide opacity-0" style={{ padding: "0 24px 96px" }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11px] mb-4" style={{ color: S }}>التاريخ</p>
          <h3 className="heading" style={{ fontSize: "clamp(26px, 4.4vw, 46px)", lineHeight: 1.4, color: D }}>
            منذ 1980.
          </h3>
        </div>
        <div className="sb-stagger">
          {CONCEPT.history.map((h, i) => (
            <div key={h.y} className="sb-item flex gap-6 pb-9 last:pb-0">
              <div className="shrink-0 text-left" style={{ width: 108 }}>
                <span className="heading text-[19px] ltr" style={{ color: S }}>{h.y}</span>
              </div>
              <div className="relative flex-1 pr-7" style={{ borderRight: i < CONCEPT.history.length - 1 ? `1px solid ${LINE}` : "none" }}>
                <span className="absolute rounded-full" style={{ right: -5, top: 7, width: 9, height: 9, background: S }} />
                <p className="heading text-[19px] mb-2" style={{ color: D }}>{h.t}</p>
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

/** فاصل بلون الهوية بين قسم وآخر. */
function Band() {
  return (
    <div aria-hidden className="w-full" style={{ height: 3, background: `linear-gradient(to left, ${S} 0%, ${S_SOFT} 50%, ${S} 100%)`, opacity: .3 }} />
  );
}

function SH({ n, title, accent }: { n: string; title: string; accent: string }) {
  return (
    <div className="text-center mb-12">
      <p className="heading text-[16px] mb-4" style={{ color: S }}>
        القسم <span className="ltr">{n}</span>
      </p>
      <h2 className="heading" style={{ fontSize: "clamp(26px, 4.6vw, 48px)", lineHeight: 1.4, color: D }}>
        {title} <span style={{ color: S }}>{accent}</span>
      </h2>
      <div className="flex items-center justify-center gap-1 mt-6">
        {[0, 1, 2].map((i) => (
          <span key={i} style={{ width: 22, height: 3, background: S, opacity: 1 - i * 0.3 }} />
        ))}
      </div>
    </div>
  );
}

function Section({ id, n, title, accent, children }: {
  id: string; n: string; title: string; accent: string; children: React.ReactNode;
}) {
  return (
    <section id={id} className="sb-slide opacity-0" style={{ padding: "88px 24px", background: "#fff" }}>
      <div className="max-w-6xl mx-auto">
        <SH n={n} title={title} accent={accent} />
        {children}
      </div>
    </section>
  );
}
