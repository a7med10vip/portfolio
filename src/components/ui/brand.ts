/* Shared brand tokens for the hero-language surfaces (hero, header variants). */

export const INK = "#04323A";
export const TEAL = "#004D5A";
export const MINT = "#CFF7EE";
/* the ground of the dark sections: hero, marquee, about, built different, stats */
export const NIGHT = "#0A0A0A";

export const DISPLAY = "'TAN Headline', var(--font-heading), system-ui, sans-serif";

export const G_PILL =
  "linear-gradient(100deg,#5FDCC6 0%,#00A99B 20%,#007A8C 52%,#005A68 78%,#004D5A 100%)";
export const G_BADGE = "linear-gradient(140deg,#00A99B 0%,#004D5A 100%)";
export const G_DOT = "linear-gradient(135deg,#5FDCC6 0%,#004D5A 100%)";

/* the eye mark, painted by whatever gradient sits behind the mask */
export const EYE_MASK = {
  WebkitMaskImage: "url(/ext/eye.png)",
  maskImage: "url(/ext/eye.png)",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
  WebkitMaskSize: "contain",
  maskSize: "contain",
} as const;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];
