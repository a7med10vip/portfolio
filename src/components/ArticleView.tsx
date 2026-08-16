"use client";

/* One renderer for every article, in either language. Blocks in, page out. */

import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock, Mail } from "lucide-react";

import { KIND_LABEL } from "@/lib/articles/types";
import type { Article } from "@/lib/articles/types";

const INK = "#04323A";
const TEAL = "#004D5A";
const MINT = "#CFF7EE";
const MUTED = "#4E717A";
const WASH = "#F4FBF9";

function formatDate(iso: string, lang: "en" | "ar") {
  return new Date(iso).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-GB", {
    year: "numeric",
    month: "long",
  });
}

export default function ArticleView({ article }: { article: Article }) {
  const isAr = article.lang === "ar";
  const t = {
    back: isAr ? "كل المقالات" : "All articles",
    minutes: isAr ? "دقائق قراءة" : "min read",
    questions: isAr ? "أسئلة شائعة" : "Common questions",
    ctaTitle: isAr ? "عندك مشروع شبه ده؟" : "Working on something like this?",
    cta: isAr ? "كلمني" : "Get in touch",
    other: isAr ? "Read in English" : "اقرأ بالعربية",
  };
  const otherHref = article.counterpart
    ? isAr
      ? `/articles/${article.counterpart}`
      : `/ar/articles/${article.counterpart}`
    : null;

  return (
    <article
      className="container"
      style={{ paddingTop: 120, paddingBottom: 96 }}
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="max-w-3xl">
        <Link
          href={isAr ? "/ar/articles" : "/articles"}
          className="inline-flex items-center gap-2 text-xs font-bold mb-7"
          style={{ color: TEAL }}
        >
          {isAr ? <ArrowRight size={14} /> : <ArrowLeft size={14} />} {t.back}
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span
            className="inline-block text-[11px] font-bold px-3 py-1.5 rounded-full"
            style={{ background: MINT, color: INK, border: `1.5px solid ${TEAL}` }}
          >
            {KIND_LABEL[article.kind][article.lang]}
            {article.client ? ` · ${article.client}` : ""}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs" style={{ color: MUTED }}>
            <Calendar size={13} /> {formatDate(article.published, article.lang)}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs" style={{ color: MUTED }}>
            <Clock size={13} /> {article.readingMinutes} {t.minutes}
          </span>
          {otherHref && (
            <Link href={otherHref} className="text-xs font-bold" style={{ color: TEAL }}>
              {t.other}
            </Link>
          )}
        </div>

        <h1 className="heading text-3xl md:text-5xl mb-6" style={{ color: INK, lineHeight: 1.18 }}>
          {article.title}
        </h1>

        {/* The answer up front — the part an assistant is most likely to quote */}
        <p
          className="text-lg md:text-xl rounded-[20px] p-5 md:p-6 mb-10"
          style={{ background: WASH, border: `2px solid ${TEAL}`, color: INK, lineHeight: 1.75 }}
        >
          {article.summary}
        </p>

        {article.blocks.map((block, i) => {
          switch (block.kind) {
            case "h2":
              return (
                <h2
                  key={i}
                  id={block.id}
                  className="heading text-2xl mt-11 mb-4"
                  style={{ color: INK, scrollMarginTop: 100 }}
                >
                  {block.text}
                </h2>
              );
            case "h3":
              return (
                <h3 key={i} className="text-lg font-bold mt-7 mb-3" style={{ color: INK }}>
                  {block.text}
                </h3>
              );
            case "p":
              return (
                <p key={i} className="text-base md:text-lg mb-5" style={{ color: MUTED, lineHeight: 1.9 }}>
                  {block.text}
                </p>
              );
            case "list":
              return block.ordered ? (
                <ol key={i} className="list-decimal mb-6 flex flex-col gap-2.5" style={{ paddingInlineStart: 22 }}>
                  {block.items.map((item) => (
                    <li key={item} className="text-base" style={{ color: MUTED, lineHeight: 1.85 }}>
                      {item}
                    </li>
                  ))}
                </ol>
              ) : (
                <ul key={i} className="mb-6 flex flex-col gap-3">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-3 text-base" style={{ color: MUTED, lineHeight: 1.85 }}>
                      <span
                        className="rounded-full flex-shrink-0"
                        style={{ width: 7, height: 7, background: TEAL, marginTop: 12 }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              );
            case "stats":
              return (
                <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-9">
                  {block.items.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-[20px] p-5 text-center"
                      style={{ background: MINT, border: `2px solid ${TEAL}` }}
                    >
                      <div className="heading text-2xl mb-1" style={{ color: INK }}>
                        {s.value}
                      </div>
                      <div className="text-xs" style={{ color: MUTED, lineHeight: 1.6 }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              );
            case "quote":
              return (
                <blockquote
                  key={i}
                  className="my-9 text-xl md:text-2xl heading"
                  style={{
                    color: INK,
                    lineHeight: 1.5,
                    borderInlineStart: `4px solid ${TEAL}`,
                    paddingInlineStart: 20,
                  }}
                >
                  {block.text}
                </blockquote>
              );
            case "note":
              return (
                <p
                  key={i}
                  className="text-base rounded-[20px] p-5 my-8"
                  style={{ background: WASH, border: `1.5px solid ${TEAL}`, color: INK, lineHeight: 1.8 }}
                >
                  {block.text}
                </p>
              );
          }
        })}

        {article.faq?.length ? (
          <section className="mt-14">
            <h2 className="heading text-2xl mb-5" style={{ color: INK }}>
              {t.questions}
            </h2>
            <div className="flex flex-col gap-4">
              {article.faq.map((f) => (
                <div key={f.q} className="rounded-[20px] p-5" style={{ border: `2px solid ${TEAL}` }}>
                  <h3 className="text-sm font-bold mb-2" style={{ color: INK }}>
                    {f.q}
                  </h3>
                  <p className="text-sm" style={{ color: MUTED, lineHeight: 1.85 }}>
                    {f.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section
          className="rounded-[24px] p-7 mt-14 flex flex-col md:flex-row md:items-center gap-5 justify-between"
          style={{ background: MINT, border: `2px solid ${TEAL}` }}
        >
          <div>
            <h2 className="heading text-xl mb-1.5" style={{ color: INK }}>
              {t.ctaTitle}
            </h2>
            <p className="text-sm inline-flex items-center gap-2" style={{ color: MUTED }}>
              <Mail size={14} /> hello@ahmedali.online
            </p>
          </div>
          <Link
            href={isAr ? "/ar#contact" : "/#contact"}
            className="inline-flex items-center justify-center gap-3 h-12 px-8 rounded-full text-base font-bold whitespace-nowrap"
            style={{ background: TEAL, color: "#fff", border: `2px solid ${TEAL}` }}
          >
            {t.cta}
          </Link>
        </section>
      </div>
    </article>
  );
}
