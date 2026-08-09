import type { CSSProperties } from "react";
import { Lock, CreditCard, ArrowRight } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../tokens";
import { PaymentShell, OrderSummary } from "./_core/PaymentShell";

/* P11b · بوابة الدفع — إدخال بيانات البطاقة */
const inp: CSSProperties = { height: 48, padding: "0 16px", width: "100%", background: colors.surface.white, border: `1.5px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.latin, fontSize: 15, color: colors.ink.body, outline: "none", direction: "ltr", textAlign: "right" };
const lbl: CSSProperties = { fontFamily: fonts.body, fontSize: 12.5, fontWeight: 600, color: colors.ink.body, marginBottom: 6, display: "block" };

export default function P11bPayCard() {
  return (
    <PaymentShell>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, alignItems: "start" }}>
        <div style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 28 }}>
          <h2 style={{ fontFamily: fonts.heading, fontSize: 22, fontWeight: 700, color: colors.ink.black, margin: "0 0 6px" }}>بيانات البطاقة</h2>
          <p style={{ fontFamily: fonts.body, fontSize: 13.5, color: colors.ink.muted, margin: "0 0 22px" }}>أدخل بيانات بطاقة Visa أو Mastercard.</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={lbl}>رقم البطاقة</label>
              <div style={{ position: "relative" }}>
                <input style={{ ...inp, paddingInlineStart: 44 }} defaultValue="4242 4242 4242 4242" />
                <CreditCard size={18} style={{ position: "absolute", insetInlineStart: 14, top: "50%", transform: "translateY(-50%)", color: colors.ink.muted }} />
              </div>
            </div>
            <div>
              <label style={lbl}>الاسم على البطاقة</label>
              <input style={{ ...inp, fontFamily: fonts.body, direction: "rtl", textAlign: "right" }} defaultValue="MOHAMMED ALAHMADI" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={lbl}>تاريخ الانتهاء</label>
                <input style={inp} defaultValue="08 / 28" />
              </div>
              <div>
                <label style={lbl}>CVV</label>
                <input style={inp} defaultValue="•••" />
              </div>
            </div>
          </div>

          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, marginTop: 18, fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted }}>
            <Lock size={14} color={colors.brand.green} /> بياناتك مشفّرة ولا تُخزَّن على خوادمنا.
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "0.5fr 1fr", gap: 12, marginTop: 22 }}>
            <button style={{ height: 52, background: "transparent", color: colors.ink.body, border: `1.5px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <ArrowRight size={17} /> رجوع
            </button>
            <button style={{ height: 52, background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 16, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <Lock size={17} /> ادفع ١٬٥٠٠ ر.س
            </button>
          </div>
        </div>
        <OrderSummary />
      </div>
    </PaymentShell>
  );
}
