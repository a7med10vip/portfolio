import { FileSignature, Check, PenTool, Wallet, Lock, ArrowLeft } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, palette } from "../tokens";
import { MobileScreen } from "./_mobile/MobileShell";
import { MobileHeader } from "./_mobile/MobileApp";

/* MP21 · اتفاقية الجدية (موبايل) */
const clauses = [
  "صدق نواياي في الزواج والتواصل للجدية فقط.",
  "أوافق على دفع رسوم الاتفاقية المنفصلة.",
  "أوافق على الانتقال للواتساب بأسماء وأرقام حقيقية.",
  "أعلم أن الإدارة تتدخّل عند الحاجة.",
  "عند إتمام الزواج: تُحصّل العمولة. عند الفشل: تُسترد المبالغ للمحفظة.",
];

export default function MP21AgreementMobile() {
  return (
    <MobileScreen padTop={50}>
      <MobileHeader back title="اتفاقية الجدية" right={<span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: fonts.body, fontSize: 11, fontWeight: 700, color: colors.brand.green }}><Lock size={11} /> آمن</span>} />

      <div style={{ flex: 1, overflow: "hidden", padding: "14px 18px 16px", display: "flex", flexDirection: "column" }}>
        <div style={{ background: colors.brand.greenSoft, borderRadius: radius.md, padding: "10px 14px", display: "flex", gap: 10, marginBottom: 14 }}>
          <FileSignature size={16} color={colors.brand.green} style={{ flexShrink: 0, marginTop: 1 }} />
          <div>
            <div style={{ fontFamily: fonts.body, fontSize: 11.5, fontWeight: 700, color: colors.brand.greenDark }}>مشروع خطبة #4821</div>
            <div style={{ fontFamily: fonts.body, fontSize: 10.5, color: colors.ink.muted, marginTop: 2 }}>بين محمد الأحمدي ونورة العتيبي</div>
          </div>
        </div>

        <p style={{ fontFamily: fonts.body, fontSize: 12.5, lineHeight: 1.9, color: colors.ink.body, margin: 0, marginBottom: 10 }}>
          تُبرَم هذه الاتفاقية تحت إشراف منصة <b>خطّابة السعودية الأولى</b>، تمهيداً للتواصل الجاد عبر الواتساب وفق الشروط:
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
          {clauses.map((c, i) => (
            <div key={i} style={{ display: "flex", gap: 8 }}>
              <span style={{ width: 20, height: 20, borderRadius: "50%", background: colors.brand.greenSoft, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}><Check size={11} color={colors.brand.green} strokeWidth={3} /></span>
              <p style={{ fontFamily: fonts.body, fontSize: 12, lineHeight: 1.7, color: colors.ink.body, margin: 0 }}>{c}</p>
            </div>
          ))}
        </div>

        {/* signature */}
        <div style={{ background: colors.surface.page, border: `1.5px dashed ${colors.brand.green}55`, borderRadius: radius.md, padding: "14px 16px", textAlign: "center", marginBottom: 10 }}>
          <PenTool size={14} color={colors.brand.green} style={{ marginBottom: 4 }} />
          <svg width="180" height="42" viewBox="0 0 180 42" style={{ display: "block", margin: "0 auto" }}>
            <path d="M 8 26 Q 18 6, 32 26 T 70 18 Q 92 6, 120 24 Q 142 36, 170 18" stroke={palette.purple[800]} strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
          <div style={{ fontFamily: fonts.body, fontSize: 10, color: colors.ink.muted, marginTop: 3 }}>محمد الأحمدي · 29-05-2026</div>
        </div>

        <div style={{ background: "#fff", border: `1px solid ${colors.border.soft}`, borderRadius: radius.md, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div>
            <div style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted }}>الرسوم</div>
            <div style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 700, color: colors.brand.green, marginTop: 2 }}>800 ر.س</div>
          </div>
          <span style={{ fontFamily: fonts.body, fontSize: 10, color: colors.ink.muted, textAlign: "end", maxWidth: 160 }}>قابل للاسترداد ضمن شروط الاتفاقية</span>
        </div>

        <label style={{ display: "flex", alignItems: "flex-start", gap: 8, fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.body, padding: "8px 0" }}>
          <span style={{ width: 18, height: 18, borderRadius: 5, border: `2px solid ${colors.brand.green}`, background: colors.brand.green, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}><Check size={10} color="#fff" strokeWidth={3} /></span>
          <span style={{ lineHeight: 1.6 }}>قرأت الاتفاقية وأوافق، وتوقيعي ملزم قانونياً.</span>
        </label>
      </div>

      <div style={{ padding: "10px 18px 22px", background: "#fff", borderTop: `1px solid ${colors.border.soft}` }}>
        <button style={{ width: "100%", height: 52, background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14.5, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
          <Wallet size={16} /> وقّع وادفع 800 ر.س <ArrowLeft size={15} />
        </button>
      </div>
    </MobileScreen>
  );
}
