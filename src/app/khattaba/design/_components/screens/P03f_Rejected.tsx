import { CircleX, RefreshCw, Headset } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../tokens";
import { AuthShell, StatusView, PrimaryButton } from "./_auth/AuthShell";

/* P03f · التسجيل — مرفوض + سبب + استئناف */
export default function P03fRejected() {
  return (
    <AuthShell>
      <StatusView icon={CircleX} color={colors.accent.red} title="لم يتم قبول طلبك" body="بعد المراجعة، لم يُقبل طلبك في الوقت الحالي. يمكنك تعديل بياناتك وإعادة التقديم.">
        <div style={{ background: colors.accent.redSoft, border: `1px solid ${colors.accent.red}40`, borderRadius: radius.lg, padding: "16px 20px", marginBottom: 22, textAlign: "start" }}>
          <div style={{ fontFamily: fonts.body, fontSize: 12.5, fontWeight: 700, color: colors.accent.red, marginBottom: 4 }}>سبب الرفض</div>
          <div style={{ fontFamily: fonts.body, fontSize: 14, lineHeight: 1.8, color: colors.ink.body }}>عدم اكتمال البيانات المطلوبة للتحقق من الجدية.</div>
        </div>
        <PrimaryButton><RefreshCw size={18} /> تعديل وإعادة التقديم</PrimaryButton>
        <div style={{ marginTop: 14, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, width: "100%", fontFamily: fonts.body, fontSize: 13.5, fontWeight: 700, color: colors.brand.green, cursor: "pointer" }}>
          <Headset size={16} /> تواصل مع الدعم
        </div>
      </StatusView>
    </AuthShell>
  );
}
