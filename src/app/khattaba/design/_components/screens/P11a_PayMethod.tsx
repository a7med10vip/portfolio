import { ArrowLeft } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../tokens";
import { PaymentShell, OrderSummary, MethodRow } from "./_core/PaymentShell";

/* P11a · بوابة الدفع — اختيار طريقة الدفع */
export default function P11aPayMethod() {
  return (
    <PaymentShell>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, alignItems: "start" }}>
        <div style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 28 }}>
          <h2 style={{ fontFamily: fonts.heading, fontSize: 22, fontWeight: 700, color: colors.ink.black, margin: "0 0 6px" }}>اختر طريقة الدفع</h2>
          <p style={{ fontFamily: fonts.body, fontSize: 13.5, color: colors.ink.muted, margin: "0 0 22px" }}>جميع المعاملات تتم عبر بوابة دفع سعودية معتمدة.</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <MethodRow name="Apple Pay" sub="الدفع السريع عبر جهازك" logo="apple" selected />
            <MethodRow name="بطاقة Visa / Mastercard" sub="إدخال بيانات البطاقة" logo="visa" />
            <MethodRow name="مدى" sub="البطاقات البنكية السعودية" logo="mada" />
          </div>

          <button style={{ width: "100%", height: 52, marginTop: 24, background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 16, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            متابعة الدفع <ArrowLeft size={18} />
          </button>
        </div>
        <OrderSummary />
      </div>
    </PaymentShell>
  );
}
