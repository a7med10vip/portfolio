/** The Soueast deck palette, identical to soueast-strategy and soueast-media-plan. */
export const G = "#f58021";
export const D = "#0A0A0A";
/** The token the production apps actually ship, quoted once in the colophon. */
export const G_PROD = "#f07f14";
export const LINE = "#E8E8E8";
export const RULE = "#F0F0F0";

/** Arabic fragments on an otherwise English page. */
export const AR: React.CSSProperties = {
  fontFamily: "'Ahmed Sans', 'Thmanyah Sans', sans-serif",
  direction: "rtl",
};

export const MONO = "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace";

/** Headings on this page are set with every word capitalised. */
export const tc = (s: string) =>
  s.replace(/(^|[\s\-\u2019'(])([a-z])/g, (_, lead, ch) => lead + ch.toUpperCase());
