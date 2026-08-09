import { FileSignature, ShieldCheck, Check, PenTool, Wallet, Lock, ArrowLeft } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, palette } from "../tokens";
import { PaymentShell } from "./_core/PaymentShell";

/* P21 · اتفاقية الجدية + توقيع رقمي قبل الانتقال للواتساب
 * (مطابق للخطوة 10 في flow العرض) */

const clauses = [
  "أتعهّد بصدق نواياي في الزواج وأن التواصل بعد هذه الاتفاقية يكون لأغراض الجدية فقط.",
  "أوافق على دفع المبلغ المنفصل الذي حدّدته الإدارة كرسوم اتفاقية، ويبقى المبلغ قابلاً للاسترداد ضمن شروط الاتفاقية.",
  "أوافق على الانتقال للتواصل عبر الواتساب باسم العائلة الكامل وأرقام التواصل الفعلية.",
  "أعلم أن الإدارة تتدخّل كطرف ثالث عند الحاجة، وأن انتهاكي للشروط قد يُسقط حقي في الاسترداد.",
  "في حال إتمام الزواج تُحصّل المنصة عمولتها وفق الجدول المعتمد، وفي حال الفشل تُعاد مبالغ مشروع الخطبة إلى محفظتي.",
];

export default function P21Agreement() {
  return (
    <PaymentShell>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 24, alignItems: "start" }}>
        {/* document */}
        <div style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, overflow: "hidden" }}>
          <div style={{ padding: "18px 24px", display: "flex", alignItems: "center", gap: 14, borderBottom: `1px solid ${colors.border.soft}`, background: colors.surface.page }}>
            <div style={{ width: 44, height: 44, borderRadius: radius.md, background: colors.brand.greenSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FileSignature size={20} color={colors.brand.green} />
            </div>
            <div>
              <h2 style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 700, color: colors.ink.black, margin: 0 }}>اتفاقية الجدية</h2>
              <p style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted, margin: "3px 0 0" }}>مشروع خطبة #4821 · بين محمد الأحمدي ونورة العتيبي</p>
            </div>
          </div>

          <div style={{ padding: 26 }}>
            <p style={{ fontFamily: fonts.body, fontSize: 14, lineHeight: 2, color: colors.ink.body, margin: "0 0 16px" }}>
              تُبرَم هذه الاتفاقية بين الطرفين تحت إشراف منصة <b>خطّابة السعودية الأولى</b>، تمهيداً للانتقال إلى مرحلة التواصل الجاد عبر الواتساب وفق الشروط التالية:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 18 }}>
              {clauses.map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ width: 22, height: 22, borderRadius: "50%", background: colors.brand.greenSoft, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <Check size={12} color={colors.brand.green} strokeWidth={3} />
                  </span>
                  <p style={{ fontFamily: fonts.body, fontSize: 13.5, lineHeight: 1.9, color: colors.ink.body, margin: 0 }}>{c}</p>
                </div>
              ))}
            </div>

            <div style={{ background: colors.accent.amberSoft, border: `1px solid ${colors.accent.amber}55`, borderRadius: radius.md, padding: "14px 18px", display: "flex", gap: 10, marginBottom: 18 }}>
              <ShieldCheck size={16} color={colors.accent.amber} style={{ flexShrink: 0, marginTop: 2 }} />
              <p style={{ fontFamily: fonts.body, fontSize: 12.5, lineHeight: 1.7, color: colors.ink.body, margin: 0 }}>
                النص النهائي للاتفاقية معتمد رسمياً من الإدارة ويُسجَّل في سجل المراجعة عند التوقيع.
              </p>
            </div>

            {/* signature pad */}
            <div>
              <label style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 700, color: colors.ink.body, marginBottom: 8, display: "block" }}>التوقيع الرقمي</label>
              <div style={{ height: 110, border: `1.5px dashed ${colors.brand.green}55`, borderRadius: radius.md, background: colors.surface.page, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="240" height="60" viewBox="0 0 240 60" style={{ display: "block" }}>
                  <path d="M 10 38 Q 30 10, 50 38 T 100 28 Q 130 12, 165 35 Q 195 50, 230 28" stroke={palette.purple[800]} strokeWidth="2.4" fill="none" strokeLinecap="round" />
                </svg>
                <div style={{ position: "absolute", bottom: 8, insetInlineStart: 12, fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted, display: "inline-flex", alignItems: "center", gap: 5 }}>
                  <PenTool size={11} /> وقّع هنا
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8, fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.muted }}>
                <span>محمد الأحمدي · #KH-2087</span>
                <span style={{ fontFamily: fonts.latin }}>29-05-2026 11:42</span>
              </div>
            </div>
          </div>
        </div>

        {/* fees + actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 22 }}>
            <h3 style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 700, color: colors.ink.black, margin: "0 0 16px" }}>الرسوم المطلوبة</h3>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${colors.border.soft}` }}>
              <span style={{ fontFamily: fonts.body, fontSize: 13, color: colors.ink.body }}>رسوم اتفاقية الجدية</span>
              <span style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 700, color: colors.ink.black }}>800 ر.س</span>
            </div>
            <p style={{ fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.muted, margin: "10px 0 0", lineHeight: 1.7 }}>مبلغ مخصّص حدّدته الإدارة · <b>قابل للاسترداد</b> ضمن شروط الاتفاقية.</p>
            <div style={{ borderTop: `1px solid ${colors.border.soft}`, marginTop: 14, paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 700, color: colors.ink.black }}>الإجمالي</span>
              <span style={{ fontFamily: fonts.heading, fontSize: 22, fontWeight: 700, color: colors.brand.green }}>800 ر.س</span>
            </div>
          </div>

          <label style={{ display: "flex", alignItems: "flex-start", gap: 10, fontFamily: fonts.body, fontSize: 13, color: colors.ink.body, cursor: "pointer", padding: "12px 16px", background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.md }}>
            <span style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${colors.brand.green}`, background: colors.brand.green, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
              <Check size={12} color="#fff" strokeWidth={3} />
            </span>
            <span style={{ lineHeight: 1.7 }}>قرأت الاتفاقية بكاملها وأوافق على جميع الشروط، وأن توقيعي أعلاه ملزم قانونياً.</span>
          </label>

          <button style={{ height: 54, background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 15.5, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <Wallet size={18} /> وقّع وادفع 800 ر.س
          </button>
          <button style={{ height: 44, background: "transparent", color: colors.ink.body, border: `1.5px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <ArrowLeft size={15} /> العودة للشات
          </button>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.muted, justifyContent: "center" }}>
            <Lock size={12} color={colors.brand.green} /> الاتفاقية مشفّرة ومحفوظة في سجل المراجعة
          </div>
        </div>
      </div>
    </PaymentShell>
  );
}
