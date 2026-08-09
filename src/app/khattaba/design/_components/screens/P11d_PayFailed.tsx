import { CircleX, RefreshCw, CreditCard, Headset } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../tokens";
import { PaymentShell } from "./_core/PaymentShell";

/* P11d · بوابة الدفع — فشل + إعادة المحاولة */
export default function P11dPayFailed() {
  return (
    <PaymentShell>
      <div style={{ maxWidth: 520, margin: "0 auto", background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.xl, padding: 36, textAlign: "center" }}>
        <div style={{ width: 96, height: 96, borderRadius: "50%", background: `${colors.accent.red}14`, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: colors.accent.red, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CircleX size={34} color="#fff" />
          </div>
        </div>
        <h2 style={{ fontFamily: fonts.heading, fontSize: 26, fontWeight: 700, color: colors.ink.black, margin: "0 0 8px" }}>فشلت عملية الدفع</h2>
        <p style={{ fontFamily: fonts.body, fontSize: 14.5, color: colors.ink.muted, margin: "0 0 22px", lineHeight: 1.8 }}>لم تكتمل العملية ولم يُخصم أي مبلغ من حسابك.</p>

        <div style={{ background: colors.accent.redSoft, border: `1px solid ${colors.accent.red}40`, borderRadius: radius.lg, padding: "14px 18px", textAlign: "start", marginBottom: 26 }}>
          <div style={{ fontFamily: fonts.body, fontSize: 12.5, fontWeight: 700, color: colors.accent.red, marginBottom: 4 }}>سبب الرفض</div>
          <div style={{ fontFamily: fonts.body, fontSize: 13.5, color: colors.ink.body, lineHeight: 1.7 }}>تم رفض البطاقة من البنك المُصدِر. تأكد من الرصيد أو جرّب طريقة دفع أخرى.</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <button style={{ height: 50, background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <RefreshCw size={17} /> إعادة المحاولة
          </button>
          <button style={{ height: 50, background: colors.surface.white, color: colors.ink.body, border: `1.5px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <CreditCard size={17} /> تغيير طريقة الدفع
          </button>
          <button style={{ height: 44, background: "transparent", color: colors.brand.green, border: "none", fontFamily: fonts.body, fontSize: 13.5, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <Headset size={15} /> تواصل مع الدعم
          </button>
        </div>

        {/* سياسة السداد بعد قبول الطلب */}
        <div style={{ background: colors.accent.amberSoft, border: `1px solid ${colors.accent.amber}40`, borderRadius: radius.lg, padding: "14px 18px", textAlign: "start", marginTop: 22 }}>
          <div style={{ fontFamily: fonts.body, fontSize: 12.5, fontWeight: 700, color: colors.accent.amber, marginBottom: 6 }}>⏳ سياسة السداد بعد قبول الطلب</div>
          <div style={{ fontFamily: fonts.body, fontSize: 13, color: colors.ink.body, lineHeight: 1.85 }}>
            لديك <b>7 أيام</b> للسداد بعد قبول طلبك. إن لم تُسدّد يُنقَل حسابك إلى <b>الأرشيف لمدة 90 يوماً</b> انتظاراً للسداد، ولا يمكنك التسجيل مجدداً بنفس رقم الجوال خلال هذه المدة (لوجود طلب معلّق). بعد انتهاء الـ 90 يوماً يصبح الحساب <b>مهملاً</b> ويُحظر رقم الجوال، وتظهر لك ملاحظة عند محاولة التسجيل بأنه كان لديك طلب سابق لم يكتمل — تواصل مع خدمة العملاء عبر واتساب.
          </div>
        </div>
      </div>
    </PaymentShell>
  );
}
