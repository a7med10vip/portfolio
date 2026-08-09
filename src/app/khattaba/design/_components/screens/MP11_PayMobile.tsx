import { Lock, CreditCard, ArrowLeft } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../tokens";
import { MobileScreen } from "./_mobile/MobileShell";
import { MobileHeader } from "./_mobile/MobileApp";

/* MP11 · بوابة الدفع (موبايل · اختيار طريقة الدفع) */
export default function MP11PayMobile() {
  return (
    <MobileScreen padTop={50}>
      <MobileHeader back title="الدفع" right={<span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: fonts.body, fontSize: 11.5, fontWeight: 700, color: colors.brand.green }}><Lock size={12} /> آمن</span>} />

      <div style={{ flex: 1, padding: "16px 18px 18px", overflow: "hidden", display: "flex", flexDirection: "column", gap: 14 }}>
        {/* order summary */}
        <div style={{ background: "#fff", border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 16 }}>
          <h3 style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 700, color: colors.ink.black, margin: "0 0 10px" }}>ملخّص الطلب</h3>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: fonts.body, fontSize: 12.5, color: colors.ink.body, marginBottom: 6 }}>
            <span>رسوم الاشتراك المخصّصة</span>
            <span style={{ fontWeight: 700 }}>1,500 ر.س</span>
          </div>
          <p style={{ fontFamily: fonts.body, fontSize: 10, color: colors.ink.muted, lineHeight: 1.6, margin: "0 0 10px" }}>مبلغ مخصّص حدّدته الإدارة · بدون ضريبة قيمة مضافة.</p>
          <div style={{ borderTop: `1px solid ${colors.border.soft}`, paddingTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: fonts.heading, fontSize: 13, fontWeight: 700, color: colors.ink.black }}>الإجمالي</span>
            <span style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 700, color: colors.brand.green }}>1,500 ر.س</span>
          </div>
        </div>

        {/* methods */}
        <div>
          <h3 style={{ fontFamily: fonts.heading, fontSize: 13.5, fontWeight: 700, color: colors.ink.black, margin: "0 0 8px" }}>اختر طريقة الدفع</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { name: "Apple Pay", sub: "الدفع السريع عبر جهازك", logo: <img src="/payment/apple-pay.png" alt="Apple Pay" style={{ height: 15, objectFit: "contain" }} />, selected: true },
              { name: "Visa / Mastercard", sub: "إدخال بيانات البطاقة", logo: <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}><img src="/ext/visa-logo.png" alt="Visa" style={{ height: 8, objectFit: "contain" }} /><img src="/payment/mastercard.png" alt="Mastercard" style={{ height: 15, objectFit: "contain" }} /></span>, selected: false },
              { name: "مدى", sub: "البطاقات البنكية السعودية", logo: <img src="/payment/mada.png" alt="مدى" style={{ height: 13, objectFit: "contain" }} />, selected: false },
            ].map((m) => (
              <div key={m.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "#fff", border: `1.5px solid ${m.selected ? colors.brand.green : colors.border.default}`, borderRadius: radius.md, boxShadow: m.selected ? `0 0 0 3px ${colors.brand.greenSoft}` : "none" }}>
                <div style={{ width: 48, height: 32, borderRadius: 6, background: "#fff", border: `1px solid ${colors.border.soft}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{m.logo}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: fonts.body, fontSize: 13.5, fontWeight: 700, color: colors.ink.black }}>{m.name}</div>
                  <div style={{ fontFamily: fonts.body, fontSize: 10.5, color: colors.ink.muted, marginTop: 1 }}>{m.sub}</div>
                </div>
                <span style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${m.selected ? colors.brand.green : colors.border.strong}`, background: m.selected ? colors.brand.green : "transparent", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{m.selected && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: "10px 18px 22px", background: "#fff", borderTop: `1px solid ${colors.border.soft}` }}>
        <button style={{ width: "100%", height: 50, background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14.5, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          متابعة الدفع · 1,500 ر.س <ArrowLeft size={17} />
        </button>
      </div>
    </MobileScreen>
  );
}
