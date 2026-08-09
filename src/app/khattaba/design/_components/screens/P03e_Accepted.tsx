import { CircleCheck, CreditCard, FileText } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, palette } from "../tokens";
import { AuthShell, StatusView, PrimaryButton } from "./_auth/AuthShell";

/* P03e · التسجيل — مقبول + رابط الدفع */
export default function P03eAccepted() {
  return (
    <AuthShell>
      <StatusView icon={CircleCheck} color={colors.brand.green} title="تم قبول طلبك!" body="مبروك! اجتاز طلبك مراجعة الإدارة. حدّدت الإدارة رسوم اشتراكك المخصّصة — فعّل حسابك لتبدأ التصفّح وإرسال طلبات الخطبة.">
        <div style={{ background: palette.purple[800], borderRadius: radius.lg, padding: "18px 20px", marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ textAlign: "start" }}>
            <div style={{ fontFamily: fonts.body, fontSize: 12.5, color: palette.purple[200] }}>رسوم الاشتراك المخصّصة لك</div>
            <div style={{ fontFamily: fonts.heading, fontSize: 22, fontWeight: 700, color: "#fff" }}>حدّدتها الإدارة</div>
          </div>
          <CreditCard size={28} color={colors.brand.highlight} />
        </div>
        <p style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted, margin: "0 0 18px", textAlign: "center", lineHeight: 1.7 }}>
          الرسوم تُقدَّر يدويًا بعد التقييم وتختلف من شخص لآخر · الاشتراك ساري حتى إتمام أول زواج.
        </p>
        <PrimaryButton><CreditCard size={18} /> ادفع وفعّل حسابي</PrimaryButton>
        <div style={{ marginTop: 14, fontFamily: fonts.body, fontSize: 13.5, color: colors.ink.muted, textAlign: "center", cursor: "pointer" }}>التفعيل لاحقًا</div>

        {/* قدرة خاصة بالإدارة */}
        <div style={{ marginTop: 18, paddingTop: 14, borderTop: `1px dashed ${colors.border.default}`, display: "inline-flex", alignItems: "center", gap: 8, fontFamily: fonts.body, fontSize: 12.5, fontWeight: 700, color: colors.accent.purple, cursor: "pointer" }}>
          <FileText size={15} /> (للإدارة) طباعة صفحة العضو + التعهدات بصيغة PDF
        </div>
      </StatusView>
    </AuthShell>
  );
}
