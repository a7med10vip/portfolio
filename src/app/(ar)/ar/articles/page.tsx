import type { Metadata } from "next";
import Link from "next/link";

import NavbarAr from "@/components/ar/NavbarAr";
import FooterAr from "@/components/ar/FooterAr";
import { articlePath, articlesFor } from "@/lib/articles";
import { KIND_LABEL } from "@/lib/articles/types";

const INK = "#04323A";
const TEAL = "#004D5A";
const MINT = "#CFF7EE";
const MUTED = "#4E717A";

export const metadata: Metadata = {
  title: "مقالات — دراسات حالة وملاحظات من الشغل | أحمد علي",
  description:
    "دراسات حالة من مشاريع حقيقية، وأدلة عملية، وملاحظات في العمل الرقمي بالمنطقة — أحمد علي، قائد المنتج الرقمي والنمو في جدة.",
  alternates: {
    canonical: "https://ahmedali.online/ar/articles",
    languages: { en: "https://ahmedali.online/articles" },
  },
};

export default function ArticlesIndexAr() {
  const articles = articlesFor("ar");

  return (
    <>
      <NavbarAr />
      <main style={{ background: "#fff", minHeight: "100vh" }} dir="rtl">
        <div className="container" style={{ paddingTop: 120, paddingBottom: 96 }}>
          <div className="max-w-2xl mb-10">
            <h1 className="heading text-3xl md:text-5xl mb-4" style={{ color: INK, lineHeight: 1.15 }}>
              مقالات
            </h1>
            <p className="text-base md:text-lg" style={{ color: MUTED, lineHeight: 1.8 }}>
              دراسات حالة من مشاريع نُفِّذت فعلاً، وأدلة عملية تستحق وقت قراءتها، وملاحظات في تنظيم العمل الرقمي.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl">
            {articles.map((a) => (
              <Link
                key={a.slug}
                href={articlePath(a)}
                className="rounded-[20px] block overflow-hidden transition-all duration-200 hover:-translate-y-0.5"
                style={{ border: `2px solid ${TEAL}`, background: "#fff" }}
              >
                {a.cover && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={a.cover} alt={a.title} className="block w-full h-auto" />
                )}
                <span className="block p-6">
                <span
                  className="inline-block text-[11px] font-bold px-3 py-1.5 rounded-full mb-4"
                  style={{ background: MINT, color: INK, border: `1.5px solid ${TEAL}` }}
                >
                  {KIND_LABEL[a.kind].ar}
                  {a.client ? ` · ${a.client}` : ""}
                </span>
                <h2 className="heading text-xl mb-2" style={{ color: INK, lineHeight: 1.4 }}>
                  {a.title}
                </h2>
                <p className="text-sm mb-4" style={{ color: MUTED, lineHeight: 1.9 }}>
                  {a.description}
                </p>
                <span className="text-xs font-bold" style={{ color: TEAL }}>
                  {a.readingMinutes} دقائق قراءة ←
                </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <FooterAr />
    </>
  );
}
