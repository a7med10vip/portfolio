/** لوحة السنبلة، مأخوذة من شعارهم نفسه: ذهب السنبلة وحبر أسود. */
export const S = "#A8842C";
export const S_SOFT = "#C9A94A";
export const D = "#14130F";
export const LINE = "#E6E0D3";
export const RULE = "#F3EFE6";
export const MONO = "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace";

export const SEV: Record<string, { bg: string; fg: string; label: string }> = {
  critical: { bg: "#B4231E", fg: "#fff", label: "حرج" },
  high: { bg: "#A8842C", fg: "#fff", label: "مرتفع" },
  medium: { bg: "#F3EFE6", fg: "#14130F", label: "متوسط" },
};
