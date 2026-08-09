import { Flag, X, LogOut, Heart, ChevronDown, Check, Ban, BadgeCheck, Send, MapPin } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, palette } from "../tokens";
import { MobileScreen } from "./_mobile/MobileShell";
import { mInputBase } from "./_mobile/MobileApp";

/* MP45 · إبلاغ / حظر عضو (مودال bottom-sheet موبايل) */
export function MP45ReportModalMobile() {
  const reasons = ["محتوى مسيء", "صور حقيقية مشكوك فيها", "محاولة تبادل تواصل خارجي", "احتيال أو انتحال هوية", "سلوك مخالف للضوابط الشرعية", "سبب آخر"];
  return (
    <MobileScreen padTop={0} bg="rgba(26,11,21,0.55)">
      {/* dim backdrop with bottom sheet */}
      <div style={{ flex: 1 }} />
      <div style={{ background: "#fff", borderTopLeftRadius: 22, borderTopRightRadius: 22, padding: "16px 18px 24px", display: "flex", flexDirection: "column", maxHeight: "88%", boxShadow: "0 -20px 60px rgba(0,0,0,0.25)" }}>
        <div style={{ width: 42, height: 5, background: colors.border.strong, borderRadius: 3, margin: "0 auto 14px" }} />

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: radius.md, background: colors.accent.redSoft, display: "flex", alignItems: "center", justifyContent: "center" }}><Flag size={20} color={colors.accent.red} /></div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 700, color: colors.ink.black, margin: 0 }}>الإبلاغ عن العضو</h2>
            <p style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted, margin: "2px 0 0" }}>نورة العتيبي · <span style={{ fontFamily: fonts.latin }}>#KH-1042</span></p>
          </div>
          <button style={{ width: 32, height: 32, borderRadius: 8, background: colors.surface.page, border: `1px solid ${colors.border.default}`, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><X size={14} /></button>
        </div>

        <label style={{ fontFamily: fonts.body, fontSize: 11.5, fontWeight: 700, color: colors.ink.body, marginBottom: 8, display: "block" }}>سبب الإبلاغ</label>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
          {reasons.map((r, i) => (
            <label key={r} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: i === 2 ? colors.accent.redSoft : colors.surface.page, border: `1.5px solid ${i === 2 ? colors.accent.red : colors.border.default}`, borderRadius: radius.md, cursor: "pointer" }}>
              <span style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${i === 2 ? colors.accent.red : colors.border.strong}`, background: i === 2 ? colors.accent.red : "transparent", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i === 2 && <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff" }} />}</span>
              <span style={{ fontFamily: fonts.body, fontSize: 12.5, color: colors.ink.body, fontWeight: i === 2 ? 700 : 500 }}>{r}</span>
            </label>
          ))}
        </div>

        <label style={{ fontFamily: fonts.body, fontSize: 11.5, fontWeight: 700, color: colors.ink.body, marginBottom: 6, display: "block" }}>تفاصيل إضافية (اختياري)</label>
        <textarea style={{ ...mInputBase, height: 70, padding: 12, resize: "none", lineHeight: 1.7, marginBottom: 12 }} placeholder="اشرح ما حدث بإيجاز..." />

        <label style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: colors.surface.page, borderRadius: radius.md, marginBottom: 14, cursor: "pointer" }}>
          <span style={{ width: 18, height: 18, borderRadius: 5, border: `2px solid ${colors.accent.red}`, background: colors.accent.red, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Check size={11} color="#fff" strokeWidth={3} /></span>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: fonts.body, fontSize: 12.5, fontWeight: 700, color: colors.ink.black }}>حظر هذا العضو أيضاً</div>
            <div style={{ fontFamily: fonts.body, fontSize: 10.5, color: colors.ink.muted, marginTop: 2 }}>لن تظهر له ولن يظهر لك</div>
          </div>
          <Ban size={16} color={colors.accent.red} />
        </label>

        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ flex: 1, height: 48, background: colors.accent.red, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13.5, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}><Flag size={14} /> إرسال البلاغ</button>
          <button style={{ width: 100, height: 48, background: "transparent", color: colors.ink.body, border: `1.5px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13.5, fontWeight: 700 }}>إلغاء</button>
        </div>
      </div>
    </MobileScreen>
  );
}

/* MP46 · تأكيد تسجيل الخروج (مودال موبايل) */
export function MP46LogoutModalMobile() {
  return (
    <MobileScreen padTop={0} bg="rgba(26,11,21,0.55)">
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
        <div style={{ width: "100%", maxWidth: 340, background: "#fff", borderRadius: radius.xl, padding: 24, boxShadow: "0 30px 80px rgba(0,0,0,0.35)", textAlign: "center" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: colors.accent.redSoft, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
            <div style={{ width: 50, height: 50, borderRadius: "50%", background: colors.accent.red, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <LogOut size={22} color="#fff" />
            </div>
          </div>
          <h2 style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 700, color: colors.ink.black, margin: "0 0 8px" }}>تسجيل الخروج</h2>
          <p style={{ fontFamily: fonts.body, fontSize: 13, lineHeight: 1.85, color: colors.ink.muted, margin: "0 0 20px" }}>
            هل أنت متأكد من تسجيل الخروج من حسابك؟ ستحتاج لإدخال بياناتك مرة أخرى عند العودة.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button style={{ height: 48, background: colors.accent.red, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7 }}><LogOut size={15} /> نعم، سجّل خروجي</button>
            <button style={{ height: 46, background: "transparent", color: colors.ink.body, border: `1.5px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13, fontWeight: 700 }}>إلغاء</button>
          </div>
        </div>
      </div>
    </MobileScreen>
  );
}

/* MP47 · تم إرسال طلب التواصل (نجاح موبايل) */
export function MP47RequestSentMobile() {
  return (
    <MobileScreen padTop={50}>
      <div style={{ flex: 1, padding: "30px 26px 22px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <div style={{ position: "relative", width: 140, height: 140, marginBottom: 22 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `1.5px dashed ${colors.brand.green}40` }} />
          <div style={{ position: "absolute", inset: 18, borderRadius: "50%", background: colors.brand.greenSoft }} />
          <div style={{ position: "absolute", inset: 36, borderRadius: "50%", background: colors.brand.green, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 12px 28px ${colors.brand.green}50` }}>
            <Heart size={32} color="#fff" fill="#fff" />
          </div>
        </div>

        <h1 style={{ fontFamily: fonts.heading, fontSize: 22, fontWeight: 700, color: colors.ink.black, margin: "0 0 8px" }}>تم إرسال طلبك</h1>
        <p style={{ fontFamily: fonts.body, fontSize: 13, lineHeight: 1.9, color: colors.ink.muted, margin: "0 0 22px", maxWidth: 280 }}>
          سيصل إشعار لـ <b style={{ color: colors.ink.body }}>نورة</b> عبر الإيميل والجوال والواتساب. ستعلمك بقرارها خلال ٧٢ ساعة.
        </p>

        {/* recipient mini card */}
        <div style={{ width: "100%", maxWidth: 300, background: colors.surface.page, border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 14, display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <img src="/khattaba/avatars/niqab-woman-brown.png" alt="نورة" style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover" }} />
          <div style={{ flex: 1, minWidth: 0, textAlign: "start" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ fontFamily: fonts.heading, fontSize: 13.5, fontWeight: 700, color: colors.ink.black }}>نورة · 27</span>
              <BadgeCheck size={12} color={colors.brand.green} />
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted, marginTop: 2 }}><MapPin size={10} /> الرياض · عتيبة</div>
          </div>
          <span style={{ fontFamily: fonts.body, fontSize: 10, fontWeight: 700, color: colors.brand.green, padding: "2px 8px", background: colors.brand.greenSoft, borderRadius: 999 }}>أُرسِل</span>
        </div>

        {/* validity */}
        <div style={{ width: "100%", maxWidth: 300, background: colors.accent.amberSoft, border: `1px solid ${colors.accent.amber}40`, borderRadius: radius.md, padding: "10px 14px", marginBottom: 22, display: "flex", alignItems: "center", gap: 10 }}>
          <Send size={15} color={colors.accent.amber} />
          <span style={{ flex: 1, fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.body, textAlign: "start" }}>العرض صالح ٧٢ ساعة · قابل للتمديد مرتين</span>
        </div>

        <div style={{ width: "100%", maxWidth: 300, display: "flex", flexDirection: "column", gap: 8 }}>
          <button style={{ height: 48, background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7 }}><Heart size={15} /> عرض طلباتي</button>
          <button style={{ height: 46, background: "transparent", color: colors.brand.green, border: `1.5px solid ${colors.brand.green}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13, fontWeight: 700 }}>متابعة التصفّح</button>
        </div>
      </div>
    </MobileScreen>
  );
}
