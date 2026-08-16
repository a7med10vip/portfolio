/* A small content model for the article programme.

   Articles are data, not bespoke pages: one file per piece, rendered by one
   component, indexed and sitemapped from one registry. Writing the tenth
   article should cost what writing the second one did. */

export type Block =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string; id: string }
  | { kind: "h3"; text: string }
  | { kind: "list"; items: string[]; ordered?: boolean }
  | { kind: "quote"; text: string }
  /** the numbers a case study turns on — only ever ones that can be checked */
  | { kind: "stats"; items: Array<{ value: string; label: string }> }
  /** what was actually built, one card each */
  | { kind: "features"; items: Array<{ icon: FeatureIcon; title: string; text: string }> }
  /** the tools, with the mark each is known by */
  | { kind: "stack"; items: Array<{ name: string; logo: string; note: string }> }
  | { kind: "image"; src: string; alt: string; caption?: string }
  /** phone screens in a row — the product, not a description of it */
  | { kind: "screens"; items: Array<{ src: string; caption: string }> }
  | { kind: "note"; text: string };

/** Named so the renderer picks the lucide icon; keeps content free of imports. */
export type FeatureIcon =
  | "bot"
  | "gift"
  | "store"
  | "chart"
  | "card"
  | "bell"
  | "clock"
  | "phone";

export type ArticleKind = "case-study" | "guide" | "opinion";

export type StoreLinks = {
  appStore?: string;
  playStore?: string;
  site?: string;
};

export type Article = {
  slug: string;
  lang: "en" | "ar";
  /** the same piece in the other language, if it exists */
  counterpart?: string;
  kind: ArticleKind;
  title: string;
  /** the answer to the title, in one or two sentences — what an assistant lifts */
  summary: string;
  description: string;
  keywords: string[];
  published: string; // ISO
  updated?: string; // ISO
  readingMinutes: number;
  /** client or subject, when the piece is about a specific engagement */
  client?: string;
  clientNote?: string;
  /** the piece's own artwork — a case study without a picture of the thing it
      is about is a memo */
  cover?: string;
  /** client mark, drawn on a dark plate since most are white */
  logo?: string;
  links?: StoreLinks;
  blocks: Block[];
  faq?: Array<{ q: string; a: string }>;
};

export const KIND_LABEL: Record<ArticleKind, { en: string; ar: string }> = {
  "case-study": { en: "Case study", ar: "دراسة حالة" },
  guide: { en: "Guide", ar: "دليل" },
  opinion: { en: "Perspective", ar: "رأي" },
};
