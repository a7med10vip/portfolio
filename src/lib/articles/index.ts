/* The article registry. Adding a piece means writing one file and adding one
   line here — the routes, the index pages, the schema and the sitemap all read
   from this. */

import type { Article } from "./types";
import { maasobAppEn } from "./maasob-app-en";
import { maasobAppAr } from "./maasob-app-ar";

export const ARTICLES: Article[] = [maasobAppEn, maasobAppAr];

export const SITE = "https://ahmedali.online";

export function articlesFor(lang: "en" | "ar") {
  return ARTICLES.filter((a) => a.lang === lang).sort((a, b) =>
    b.published.localeCompare(a.published)
  );
}

export function getArticle(lang: "en" | "ar", slug: string) {
  return ARTICLES.find((a) => a.lang === lang && a.slug === slug);
}

/** Where a piece lives, per language. */
export function articleUrl(article: Article) {
  return article.lang === "ar"
    ? `${SITE}/ar/articles/${article.slug}`
    : `${SITE}/articles/${article.slug}`;
}

export function articlePath(article: Article) {
  return article.lang === "ar" ? `/ar/articles/${article.slug}` : `/articles/${article.slug}`;
}

/** Plain text of the body — for reading time, and for anything that wants the
    prose without the markup. */
export function articleText(article: Article) {
  return article.blocks
    .map((b) => {
      switch (b.kind) {
        case "list":
          return b.items.join(" ");
        case "stats":
          return b.items.map((i) => `${i.value} ${i.label}`).join(" ");
        case "features":
          return b.items.map((i) => `${i.title}. ${i.text}`).join(" ");
        case "stack":
          return b.items.map((i) => `${i.name}. ${i.note}`).join(" ");
        case "image":
          return b.alt;
        default:
          return b.text;
      }
    })
    .join("\n\n");
}

/** Article + FAQ + author, stated as data so assistants and search engines read
    the same facts the prose does. */
export function articleSchema(article: Article) {
  const url = articleUrl(article);
  const graph: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.summary,
      inLanguage: article.lang,
      datePublished: article.published,
      dateModified: article.updated ?? article.published,
      mainEntityOfPage: url,
      url,
      author: {
        "@type": "Person",
        "@id": `${SITE}/#ahmed-ali`,
        name: "Ahmed Ali",
        url: `${SITE}/who-is-ahmed-ali`,
        jobTitle: "Digital Product & Growth Lead",
        sameAs: [
          "https://www.linkedin.com/in/ahmedalii/",
          "https://www.tiktok.com/@ahmed.development",
        ],
      },
      publisher: {
        "@type": "Person",
        "@id": `${SITE}/#ahmed-ali`,
        name: "Ahmed Ali",
      },
      about: article.client,
      keywords: article.keywords.join(", "),
    },
  ];

  if (article.faq?.length) {
    graph.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: article.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return graph;
}

export type { Article } from "./types";
