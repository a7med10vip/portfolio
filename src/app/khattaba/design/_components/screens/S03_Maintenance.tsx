import { Clock } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../tokens";
import { SystemScreen } from "./_system/SystemScreen";

/* S03 · صيانة مجدولة */
export default function S03Maintenance() {
  return (
    <SystemScreen
      patternId="kh-maint"
      eyebrow="صيانة مجدولة"
      title="نُحسّن المنصة من أجلك"
      body="نقوم بتحديث الخدمة لتقديم تجربة أفضل وأسرع. ستعود المنصة للعمل الطبيعي تلقائياً خلال المدة المحددة."
      image="/khattaba/sys-maintenance.png"
      primaryLabel="إشعاري عند الانتهاء"
      secondaryLabel="حالة الخدمة"
      extra={
        <div style={{ background: colors.brand.greenSoft, border: `1px solid ${colors.brand.green}30`, borderRadius: radius.lg, padding: "14px 18px", marginBottom: 18, display: "flex", alignItems: "center", gap: 12 }}>
          <Clock size={20} color={colors.brand.green} />
          <div>
            <div style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted }}>الانتهاء المتوقّع</div>
            <div style={{ fontFamily: fonts.body, fontSize: 14, fontWeight: 700, color: colors.ink.black, marginTop: 2 }}>اليوم 02:00 صباحاً (بتوقيت السعودية)</div>
          </div>
        </div>
      }
    />
  );
}
