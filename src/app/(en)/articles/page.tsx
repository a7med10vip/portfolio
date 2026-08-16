import type { Metadata } from "next";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { articlePath, articlesFor } from "@/lib/articles";
import { KIND_LABEL } from "@/lib/articles/types";

const INK = "#04323A";
const TEAL = "#004D5A";
const MINT = "#CFF7EE";
const MUTED = "#4E717A";

export const metadata: Metadata = {
  title: "Articles — case studies and field notes | Ahmed Ali",
  description:
    "Case studies from real client work, practical guides, and notes on digital strategy in MENA — by Ahmed Ali, digital product and growth lead in Jeddah.",
  alternates: {
    canonical: "https://ahmedali.online/articles",
    languages: { ar: "https://ahmedali.online/ar/articles" },
  },
};

export default function ArticlesIndex() {
  const articles = articlesFor("en");

  return (
    <>
      <Navbar />
      <main style={{ background: "#fff", minHeight: "100vh" }}>
        <div className="container" style={{ paddingTop: 120, paddingBottom: 96 }}>
          <div className="max-w-2xl mb-10">
            <h1 className="heading text-3xl md:text-5xl mb-4" style={{ color: INK, lineHeight: 1.15 }}>
              Articles
            </h1>
            <p className="text-base md:text-lg" style={{ color: MUTED, lineHeight: 1.7 }}>
              Case studies from work that shipped, guides worth the time to write down, and the
              occasional argument about how digital work is organised.
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
                  {KIND_LABEL[a.kind].en}
                  {a.client ? ` · ${a.client}` : ""}
                </span>
                <h2 className="heading text-xl mb-2" style={{ color: INK, lineHeight: 1.35 }}>
                  {a.title}
                </h2>
                <p className="text-sm mb-4" style={{ color: MUTED, lineHeight: 1.8 }}>
                  {a.description}
                </p>
                <span className="text-xs font-bold" style={{ color: TEAL }}>
                  {a.readingMinutes} min read →
                </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
