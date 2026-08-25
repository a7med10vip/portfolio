/** هوية الموقع نفسها: تركوازي عميق، لا ذهب. */
export const S = "#004D5A";
export const S_SOFT = "#00A99B";
export const MINT = "#4FFFB0";
export const TINT = "#CFF7EE";
export const D = "#0A0A0A";
export const LINE = "#E8E8E8";
export const RULE = "#F0F0F0";
export const MONO = "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace";

export const SEV: Record<string, { bg: string; fg: string; label: string }> = {
  critical: { bg: "#B4231E", fg: "#fff", label: "حرج" },
  high: { bg: "#004D5A", fg: "#fff", label: "مرتفع" },
  medium: { bg: "#CFF7EE", fg: "#004D5A", label: "متوسط" },
};
