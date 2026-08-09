import { Send, Check } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../tokens";
import { MobileScreen } from "./_mobile/MobileShell";
import { MPrimaryButton } from "./_mobile/MobileApp";

/* MP03c · تأكيد رقم الجوال (OTP موبايل) */
export default function MP03cOtpMobile() {
  return (
    <MobileScreen padTop={50}>
      <div style={{ padding: "14px 18px 6px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.muted, marginBottom: 14 }}>
          <span style={{ width: 22, height: 22, borderRadius: "50%", background: colors.brand.green, color: "#fff", fontFamily: fonts.latin, fontSize: 11, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Check size={11} strokeWidth={3} /></span>
          <span>البيانات</span>
          <span style={{ flex: 1, height: 2, background: colors.brand.green, margin: "0 4px" }} />
          <span style={{ width: 22, height: 22, borderRadius: "50%", background: colors.brand.green, color: "#fff", fontFamily: fonts.latin, fontSize: 11, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Check size={11} strokeWidth={3} /></span>
          <span>التفضيلات</span>
          <span style={{ flex: 1, height: 2, background: colors.brand.green, margin: "0 4px" }} />
          <span style={{ width: 22, height: 22, borderRadius: "50%", background: colors.brand.green, color: "#fff", fontFamily: fonts.latin, fontSize: 11, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", border: `3px solid ${colors.brand.greenSoft}` }}>3</span>
          <span style={{ fontWeight: 700, color: colors.brand.green }}>التحقق</span>
        </div>
      </div>

      <div style={{ flex: 1, padding: "20px 24px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <div style={{ width: 76, height: 76, borderRadius: "50%", background: colors.brand.greenSoft, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
          <Send size={32} color={colors.brand.green} />
        </div>
        <h1 style={{ fontFamily: fonts.heading, fontSize: 22, fontWeight: 700, color: colors.ink.black, margin: "0 0 8px" }}>تأكيد رقم الجوال</h1>
        <p style={{ fontFamily: fonts.body, fontSize: 13, lineHeight: 1.85, color: colors.ink.muted, margin: "0 0 26px" }}>أدخل رمز التحقق المُرسل إلى<br /><span style={{ fontFamily: fonts.latin, fontWeight: 700, color: colors.ink.body }}>‎+966 55 *** ** 67</span></p>

        <div style={{ display: "flex", gap: 8, direction: "ltr", marginBottom: 18 }}>
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const filled = i < 3;
            const focused = i === 3;
            return (
              <div key={i} style={{ width: 44, height: 54, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fonts.latin, fontSize: 22, fontWeight: 700, color: colors.ink.black, background: "#fff", border: `2px solid ${focused || filled ? colors.brand.green : colors.border.default}`, borderRadius: radius.lg, boxShadow: focused ? `0 0 0 3px ${colors.brand.greenSoft}` : "none" }}>{filled ? "•" : ""}</div>
            );
          })}
        </div>
        <div style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted }}>
          لم يصلك الرمز؟ <span style={{ color: colors.brand.green, fontWeight: 700 }}>إعادة الإرسال</span>
        </div>

        <label style={{ display: "flex", alignItems: "flex-start", gap: 8, fontFamily: fonts.body, fontSize: 12, color: colors.ink.body, marginTop: 22, textAlign: "start" }}>
          <span style={{ width: 18, height: 18, borderRadius: 5, border: `2px solid ${colors.brand.green}`, background: colors.brand.green, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}><Check size={11} color="#fff" strokeWidth={3} /></span>
          <span style={{ lineHeight: 1.6 }}>أوافق على <span style={{ color: colors.brand.green, fontWeight: 700 }}>الشروط والأحكام</span> و<span style={{ color: colors.brand.green, fontWeight: 700 }}>سياسة الخصوصية وسرية المعلومات</span>.</span>
        </label>
      </div>

      <div style={{ padding: "10px 18px 22px", background: "#fff", borderTop: `1px solid ${colors.border.soft}` }}>
        <MPrimaryButton><Send size={16} /> تأكيد وإرسال الطلب</MPrimaryButton>
      </div>
    </MobileScreen>
  );
}
