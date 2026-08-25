/**
 * أيقونة لكل موضع، من Font Awesome.
 *
 * لا أيقونة عامة ولا زخرفية: كل واحدة تصف ما تقف عنده تحديدًا، فيُعرف نوع
 * الملاحظة أو القسم قبل قراءة سطر واحد.
 */
import {
  FaLinkSlash, FaShieldHalved, FaMagnifyingGlass, FaLayerGroup, FaGaugeHigh,
  FaCompass, FaTableList, FaSitemap, FaCircleCheck, FaTriangleExclamation,
  FaChartColumn, FaCodeCompare, FaListOl, FaLightbulb, FaCompassDrafting,
  FaMobileScreen, FaImage, FaClock, FaCalendarXmark, FaLanguage, FaShareNodes,
  FaHeading, FaMap, FaBriefcase, FaTag, FaWandMagicSparkles, FaArrowsLeftRight,
  FaFileLines, FaEye, FaCircleNodes, FaBoxesStacked, FaChartPie, FaGlobe,
  FaKey, FaFont, FaCircleQuestion,
} from "react-icons/fa6";
import type { IconType } from "react-icons";

/** مجال الملاحظة. */
export const AREA_ICON: Record<string, IconType> = {
  "الوصول": FaLinkSlash,
  "المنصة": FaShieldHalved,
  "الظهور": FaMagnifyingGlass,
  "المحتوى": FaLayerGroup,
  "الأداء": FaGaugeHigh,
};

/** كل ملاحظة على حدة، بأيقونة تصف عطبها هي. */
export const FINDING_ICON: Record<string, IconType> = {
  "careers-cert": FaBriefcase,
  "brand-pages": FaTag,
  "joomla-eol": FaCalendarXmark,
  "titles": FaHeading,
  "no-social-tags": FaShareNodes,
  "arabic-lang": FaLanguage,
  "broken-links": FaLinkSlash,
  "no-sitemap": FaMap,
  "missing-sections": FaFileLines,
  "speed": FaGaugeHigh,
  "mobile": FaMobileScreen,
  "images": FaImage,
  "dead-code": FaClock,
};

/** أقسام الوثيقة. */
export const SECTION_ICON: Record<string, IconType> = {
  s01: FaCompass,
  s02: FaCircleNodes,
  s03: FaSitemap,
  s04: FaCircleCheck,
  s05: FaTriangleExclamation,
  s06: FaChartColumn,
  s07: FaCodeCompare,
  s08: FaListOl,
  s09: FaLightbulb,
  s10: FaCompassDrafting,
};

/** ما يعمل جيدًا. */
export const STRENGTH_ICON: IconType[] = [
  FaArrowsLeftRight, FaBoxesStacked, FaHeading, FaEye, FaMagnifyingGlass, FaCircleCheck,
];

/** الفرص. */
export const OPPORTUNITY_ICON: IconType[] = [
  FaGlobe, FaTag, FaBriefcase, FaLanguage, FaChartPie, FaImage,
];

/** حالة العنوان الرقمي. */
export const STATUS_ICON: Record<string, IconType> = {
  good: FaCircleCheck,
  weak: FaCircleQuestion,
  broken: FaTriangleExclamation,
};

/** حالات شجرة الموقع. */
export const TREE_ICON: Record<string, IconType> = {
  ok: FaCircleCheck,
  thin: FaFileLines,
  orphan: FaKey,
  missing: FaCalendarXmark,
  broken: FaTriangleExclamation,
};

export { FaWandMagicSparkles, FaFont };
