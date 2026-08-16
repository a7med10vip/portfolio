"use client";
/* eslint-disable @next/next/no-img-element */

/* One renderer for every article, in either language. Blocks in, page out.

   Plain <img> throughout: these are article assets that get re-cropped and
   replaced under the same filenames, and the image optimiser caches by URL. */

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Bot,
  Calendar,
  ChartNoAxesColumn,
  Clock,
  CreditCard,
  Gift,
  Mail,
  Smartphone,
  Store,
  type LucideIcon,
} from "lucide-react";

import { KIND_LABEL, type Article, type FeatureIcon } from "@/lib/articles/types";

const INK = "#04323A";
const TEAL = "#004D5A";
const MINT = "#CFF7EE";
const MUTED = "#4E717A";
const WASH = "#F4FBF9";
const NIGHT = "#0B0D18";

const ICONS: Record<FeatureIcon, LucideIcon> = {
  bot: Bot,
  gift: Gift,
  store: Store,
  chart: ChartNoAxesColumn,
  card: CreditCard,
  bell: Bell,
  clock: Clock,
  phone: Smartphone,
};

function formatDate(iso: string, lang: "en" | "ar") {
  return new Date(iso).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-GB", {
    year: "numeric",
    month: "long",
  });
}

/** The store badges, drawn rather than fetched — official artwork changes and
    a broken badge is worse than none. */
function StoreButtons({ article }: { article: Article }) {
  const isAr = article.lang === "ar";
  const links = article.links;
  if (!links?.appStore && !links?.playStore) return null;

  const badge = (href: string, mark: string, top: string, name: string) => (
    <a
      key={name}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 h-14 px-6 rounded-2xl transition-transform duration-200 hover:-translate-y-0.5"
      style={{ background: NIGHT, border: `2px solid ${NIGHT}` }}
    >
      <img src={mark} alt="" width={26} height={26} style={{ display: "block" }} />
      <span className="flex flex-col leading-none" style={{ textAlign: isAr ? "right" : "left" }}>
        <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.65)" }}>
          {top}
        </span>
        <span className="text-sm font-bold mt-1" style={{ color: "#fff" }}>
          {name}
        </span>
      </span>
    </a>
  );

  return (
    <div className="flex flex-wrap gap-3">
      {links.appStore &&
        badge(
          links.appStore,
          "https://cdn.simpleicons.org/appstore/FFFFFF",
          isAr ? "حمّله من" : "Download on the",
          "App Store"
        )}
      {links.playStore &&
        badge(
          links.playStore,
          "https://cdn.simpleicons.org/googleplay/FFFFFF",
          isAr ? "حمّله من" : "Get it on",
          "Google Play"
        )}
    </div>
  );
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
    <article dir={isAr ? "rtl" : "ltr"}>
      {/* ---- hero: the thing itself, before a word about it ---- */}
      <header style={{ background: NIGHT }}>
        <div className="container" style={{ paddingTop: 110, paddingBottom: 0 }}>
          <Link
            href={isAr ? "/ar/articles" : "/articles"}
            className="inline-flex items-center gap-2 text-xs font-bold mb-7"
            style={{ color: MINT }}
          >
            {isAr ? <ArrowRight size={14} /> : <ArrowLeft size={14} />} {t.back}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center pb-12">
            <div>
              {article.logo && (
                <img
                  src={article.logo}
                  alt={article.client ?? ""}
                  width={72}
                  height={72}
                  className="mb-6"
                  style={{ display: "block", objectFit: "contain" }}
                />
              )}

              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span
                  className="inline-block text-[11px] font-bold px-3 py-1.5 rounded-full"
                  style={{ background: MINT, color: INK }}
                >
                  {KIND_LABEL[article.kind][article.lang]}
                </span>
                {article.clientNote && (
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                    {article.clientNote}
                  </span>
                )}
              </div>

              <h1
                className="heading text-3xl md:text-5xl mb-5"
                style={{ color: "#fff", lineHeight: 1.15 }}
              >
                {article.title}
              </h1>

              <p
                className="text-base md:text-lg mb-7"
                style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.8 }}
              >
                {article.summary}
              </p>

              <StoreButtons article={article} />

              <div className="flex flex-wrap items-center gap-4 mt-7">
                <span className="inline-flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                  <Calendar size={13} /> {formatDate(article.published, article.lang)}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
                  <Clock size={13} /> {article.readingMinutes} {t.minutes}
                </span>
                {otherHref && (
                  <Link href={otherHref} className="text-xs font-bold" style={{ color: MINT }}>
                    {t.other}
                  </Link>
                )}
              </div>
            </div>

            {article.cover && (
              <img
                src={article.cover}
                alt={article.title}
                className="w-full h-auto rounded-[24px]"
                style={{ border: "2px solid rgba(255,255,255,0.12)" }}
              />
            )}
          </div>
        </div>
      </header>

      {/* ---- body ---- */}
      <div className="container" style={{ paddingTop: 56, paddingBottom: 96 }}>
        <div className="max-w-3xl">
          {article.blocks.map((block, i) => {
            switch (block.kind) {
              case "h2":
                return (
                  <h2
                    key={i}
                    id={block.id}
                    className="heading text-2xl md:text-3xl mt-12 mb-4"
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
                return (
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
                  <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-10">
                    {block.items.map((s) => (
                      <div
                        key={s.label}
                        className="rounded-[20px] p-5 text-center"
                        style={{ background: MINT, border: `2px solid ${TEAL}` }}
                      >
                        <div className="heading text-2xl mb-1.5" style={{ color: INK }}>
                          {s.value}
                        </div>
                        <div className="text-xs" style={{ color: MUTED, lineHeight: 1.6 }}>
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              case "features":
                return (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 my-9">
                    {block.items.map((f) => {
                      const Icon = ICONS[f.icon];
                      return (
                        <div
                          key={f.title}
                          className="rounded-[20px] p-5"
                          style={{ background: WASH, border: `2px solid ${TEAL}` }}
                        >
                          <span
                            className="inline-flex items-center justify-center rounded-xl mb-3"
                            style={{ width: 40, height: 40, background: "#fff", border: `1.5px solid ${TEAL}` }}
                          >
                            <Icon size={19} color={TEAL} />
                          </span>
                          <h3 className="text-sm font-bold mb-2" style={{ color: INK }}>
                            {f.title}
                          </h3>
                          <p className="text-sm" style={{ color: MUTED, lineHeight: 1.8 }}>
                            {f.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                );
              case "stack":
                return (
                  <div key={i} className="flex flex-col gap-3 my-9">
                    {block.items.map((s) => (
                      <div
                        key={s.name}
                        className="rounded-[20px] p-5 flex gap-4 items-start"
                        style={{ background: "#fff", border: `2px solid ${TEAL}` }}
                      >
                        <span
                          className="inline-flex items-center justify-center rounded-xl flex-shrink-0"
                          style={{ width: 44, height: 44, background: WASH, border: `1.5px solid ${MINT}` }}
                        >
                          <img src={s.logo} alt={s.name} width={22} height={22} />
                        </span>
                        <div>
                          <h3 className="text-sm font-bold mb-1.5" style={{ color: INK }}>
                            {s.name}
                          </h3>
                          <p className="text-sm" style={{ color: MUTED, lineHeight: 1.8 }}>
                            {s.note}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              case "image":
                return (
                  <figure key={i} className="my-9">
                    <img src={block.src} alt={block.alt} className="w-full h-auto rounded-[20px]" style={{ border: `2px solid ${TEAL}` }} />
                    {block.caption && (
                      <figcaption className="text-xs mt-3" style={{ color: MUTED }}>
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              case "quote":
                return (
                  <blockquote
                    key={i}
                    className="my-10 text-xl md:text-2xl heading"
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
                    className="text-base rounded-[20px] p-5 my-9"
                    style={{ background: MINT, border: `2px solid ${TEAL}`, color: INK, lineHeight: 1.85 }}
                  >
                    {block.text}
                  </p>
                );
            }
          })}

          {article.links?.appStore || article.links?.playStore ? (
            <div className="my-10">
              <StoreButtons article={article} />
            </div>
          ) : null}

          {article.faq?.length ? (
            <section className="mt-14">
              <h2 className="heading text-2xl md:text-3xl mb-5" style={{ color: INK }}>
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
            style={{ background: NIGHT }}
          >
            <div>
              <h2 className="heading text-xl mb-1.5" style={{ color: "#fff" }}>
                {t.ctaTitle}
              </h2>
              <p className="text-sm inline-flex items-center gap-2" style={{ color: "rgba(255,255,255,0.6)" }}>
                <Mail size={14} /> hello@ahmedali.online
              </p>
            </div>
            <Link
              href={isAr ? "/ar#contact" : "/#contact"}
              className="inline-flex items-center justify-center gap-3 h-12 px-8 rounded-full text-base font-bold whitespace-nowrap"
              style={{ background: MINT, color: INK }}
            >
              {t.cta}
            </Link>
          </section>
        </div>
      </div>
    </article>
  );
}
