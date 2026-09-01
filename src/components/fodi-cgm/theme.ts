/** هوية FODI كما هي في موقعها: برقوقي وبرتقالي على كريمي. */
export const P = "#3B143A";
export const PD = "#260D25";
export const PLIGHT = "#7D2B7B";
export const PTINT = "#F6EFF6";
export const O = "#FE6D2F";
export const OTINT = "#FEEDE6";
export const CREAM = "#FDF1E3";
export const LINE = "#E9E1E8";
export const RULE = "#F4EFF3";

/**
 * ألوان حالة مأخوذة من لغة أجهزة الجلوكوز نفسها: أخضر داخل النطاق، وكهرماني
 * قريب من الحد، وأحمر خارجه. القارئ يعرف هذه الألوان قبل أن يقرأ المفتاح.
 */
export const OK = "#00A05A";
export const WARN = "#C98A00";
export const BLOCK = "#D92B34";

export const STATUS: Record<string, { c: string; label: string }> = {
  ok: { c: OK, label: "متاح الآن" },
  partial: { c: WARN, label: "يحتاج اتفاقا" },
  blocked: { c: BLOCK, label: "غير متاح" },
};
