/* KH1 Design System — Tokens
 * Source of truth for the matchmaking platform's visual language.
 *
 * هوية ألوان جديدة (طلب العميل):
 *   • الأساسي  = #F258B4 (وردي/ماجنتا نابض)
 *   • الثانوي = #29A631 (أخضر)
 *
 * الأسلوب المعتمد = "متوازن" (اختيار العميل): كانفس أبيض/فاتح + نصوص قريبة من
 * الأسود الدافئ + الوردي النظيف #F258B4 كلون أساسي جريء (أزرار/لمسات) + الأخضر
 * #29A631 ثانوي (نجاح/إيجابي) + ألواح غامقة بلون الباذنجان العميق #2A1322.
 * المفتاح: لون جريء واحد لكل عنصر مع مساحات بيضاء واسعة → يبطل تنافر اللونين.
 * الاسمان `purple` و`green` أُبقيا في الـ ramps لتفادي تعديل عشرات الملفات. */

export const palette = {
  /* درجات الأخضر الثانوي — مركّزة على #29A631 (الدرجة 500).
   * الدرجة 200 (#A7E6B1) هي لمسة الـ accent الفاتحة. */
  green: {
    50:  "#EFFAF1",
    100: "#D4F4D9",
    200: "#A7E6B1",
    300: "#6FD180",
    400: "#42BD55",
    500: "#29A631",
    600: "#1F8527",
    700: "#196B20",
    800: "#145019",
    900: "#0C3310",
  },
  /* درجات الوردي الأساسي — مركّزة على #F258B4 (الدرجة 400 = اللون الأساسي).
   * الاسم `purple` مُبقى للتوافق؛ القيم وردية. الطرف الغامق (800–900) باذنجاني
   * شبه أسود (#2A1322) للألواح الغامقة والنصوص العميقة. */
  purple: {
    50:  "#FDEAF5",
    100: "#FBD5EC",
    200: "#F7B6DC",
    300: "#F585C6",
    400: "#F258B4",
    500: "#E0429E",
    600: "#D63E9C",
    700: "#A82B77",
    800: "#2A1322",
    900: "#1A0B15",
  },
  blue: {
    50:  "#EFF6FF",
    100: "#DBEAFE",
    200: "#BFDBFE",
    300: "#93C5FD",
    400: "#60A5FA",
    500: "#3B82F6",
    600: "#2563EB",
    700: "#1D4ED8",
    800: "#1E40AF",
    900: "#1E3A8A",
  },
  amber: {
    50:  "#FFFBEB",
    100: "#FEF3C7",
    200: "#FDE68A",
    300: "#FCD34D",
    400: "#FBBF24",
    500: "#F59E0B",
    600: "#D97706",
    700: "#B45309",
    800: "#92400E",
    900: "#78350F",
  },
  red: {
    50:  "#FEF2F2",
    100: "#FEE2E2",
    200: "#FECACA",
    300: "#FCA5A5",
    400: "#F87171",
    500: "#EF4444",
    600: "#DC2626",
    700: "#B91C1C",
    800: "#991B1B",
    900: "#7F1D1D",
  },
  gray: {
    50:  "#FAFAFA",
    100: "#F4F4F5",
    200: "#E4E4E7",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },
} as const;

export const colors = {
  /* الأسلوب "متوازن": `green` (الاسم القديم) = الوردي النظيف #F258B4 للأزرار
   * واللمسات الأساسية. `greenDark` = الباذنجان العميق #2A1322 كنص غامق/ألواح.
   * `highlight` = وردي فاتح #FBC0E2 للّمسات على الخلفيات الغامقة.
   * `secondary` = الأخضر #29A631 للحالات الإيجابية (نجاح/قبول). */
  brand: {
    green: palette.purple[400],      // #F258B4 — الأساسي النظيف (أزرار/لمسات)
    greenDark: palette.purple[800],  // #2A1322 — نص غامق / ألواح باذنجانية
    greenSoft: "#F258B414",          // soft bg وردي
    greenTint: "#F258B40A",          // tint وردي
    highlight: "#FBC0E2",            // وردي فاتح — لمسة على الغامق والـ accents
    highlightSoft: "#FBC0E233",
    primary: palette.purple[400],    // #F258B4 — اللون الأساسي الحرفي
    primarySoft: "#F258B41A",
    secondary: palette.green[500],   // #29A631 — الثانوي (نجاح/إيجابي)
    secondarySoft: "#29A6311A",
    purple: palette.purple[800],     // #2A1322 — لوح غامق (خلفية اللوجو/الهيرو)
    purpleSoft: "#2A132210",
    lavender: palette.purple[200],   // #F7B6DC — وردي فاتح (نص على الغامق)
  },
  ink: {
    black: "#211826",                // أسود دافئ (عناوين)
    body: "#2C2533",                 // نص أساسي
    muted: "#6B6573",                // نص ثانوي
    soft: "#9A949F",                 // نص خفيف
    placeholder: "#C7C2CC",
  },
  surface: {
    white: "#FFFFFF",
    page: "#FBF8FC",                 // أوف-وايت دافئ خفيف
    raised: "#FFFFFF",
    sunken: "#F4EFF6",
  },
  border: {
    soft: "#EDE8EF",
    default: "#E7E2EA",
    strong: "#D8D2DC",
  },
  accent: {
    blue: palette.blue[500],
    blueSoft: "#3B82F614",
    amber: palette.amber[500],
    amberSoft: "#F59E0B14",
    red: palette.red[500],
    redSoft: "#EF444414",
    purple: palette.purple[500],     // الآن وردي نابض #E0429E
    purpleSoft: "#E0429E14",
    green: palette.green[500],       // #29A631 — الثانوي للحالات الإيجابية
    greenSoft: "#29A63114",
    pink: palette.purple[400],       // #F258B4 — الأساسي النابض
    pinkSoft: "#F258B414",
  },
  gradient: {
    none: "none",
  },
} as const;

/* خطوط هذه الوثيقة (الصفحة):
 *   • Thmanyah Serif Display → H1 الكبير (الهيرو)
 *   • Thmanyah Sans → H2 والعناوين والأوصاف وكل النصوص
 *   • Poppins → الأرقام والإنجليزي
 *
 * استثناء: قسم "نظام الخطوط" يعرض خط الهوية الفعلي للمنتج (KH1)
 * عبر `productFonts.identityArabic` = IBM Plex Sans Arabic */
export const fonts = {
  hero: "'Ahmed Serif Display', 'Thmanyah Serif Display', serif",
  heading: "'Ahmed Serif Display', 'Thmanyah Serif Display', serif",
  body: "'Ahmed Sans', 'Thmanyah Sans', system-ui, sans-serif",
  script: "'Ahmed Sans', 'Thmanyah Sans', system-ui, sans-serif",
  latin: "var(--font-poppins), 'Poppins', system-ui, sans-serif",
} as const;

/* خطوط الهوية الفعلية للمنتج (KH1) — تُعرض فقط داخل قسم نظام الخطوط. */
export const productFonts = {
  identityArabic: "var(--font-ibm-plex-arabic), 'IBM Plex Sans Arabic', system-ui, sans-serif",
  identityLatin: "var(--font-poppins), 'Poppins', system-ui, sans-serif",
} as const;

export const fontSize = {
  display: 64,
  h1: 44,
  h2: 32,
  h3: 22,
  h4: 18,
  bodyLg: 16,
  body: 14,
  small: 13,
  caption: 12,
  micro: 11,
} as const;

export const lineHeight = {
  tight: 1.2,
  snug: 1.3,
  normal: 1.4,
  relaxed: 1.6,
  arabic: 1.75,
} as const;

export const space = {
  0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24,
  8: 32, 10: 40, 12: 48, 16: 64, 20: 80, 24: 100, 28: 120,
} as const;

export const radius = {
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  "2xl": 32,
  full: 9999,
} as const;

/* Shadows — neutral, subtle, NO colored glow.
 * The brand removed all neon-style effects. */
export const shadow = {
  none: "none",
  sm: "0 1px 2px rgba(15,15,15,0.04), 0 1px 3px rgba(15,15,15,0.04)",
  md: "0 2px 6px rgba(15,15,15,0.05), 0 4px 12px rgba(15,15,15,0.04)",
  lg: "0 6px 14px rgba(15,15,15,0.06), 0 12px 28px rgba(15,15,15,0.06)",
  hero: `2px 2px 0 0 ${palette.gray[900]}`,
  focus: `0 0 0 3px ${palette.gray[200]}`,
} as const;

export const canvas = {
  screen: {
    desktop: { w: 1280, h: 800 },
    mobile: { w: 390, h: 844 },
  },
  chrome: {
    desktopBar: 36,
    phoneNotch: 28,
    phoneBezel: 14,
  },
  spacing: {
    betweenScreens: 150,
    betweenGroups: 260,
    groupLabelHeight: 150,
  },
} as const;

export type PaletteName = keyof typeof palette;
export type PaletteShade = keyof typeof palette["green"];
export type Tokens = {
  colors: typeof colors;
  fonts: typeof fonts;
  radius: typeof radius;
};
