import { CircleCheck, CircleX, Search, Download, RefreshCw, CreditCard, Headset } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../tokens";
import { MobileScreen } from "./_mobile/MobileShell";
import { MobileHeader } from "./_mobile/MobileApp";

/* MP11c · نجاح الدفع (موبايل) */
export function MP11cPaySuccessMobile() {
  const rows = [
    { k: "المبلغ", v: "1,500 ر.س" },
    { k: "الخدمة", v: "اشتراك التفعيل" },
    { k: "الطريقة", v: "Apple Pay" },
    { k: "رقم العملية", v: "TXN-2026-004821" },
    { k: "التاريخ", v: "29 مايو 2026" },
  ];
  return (
    <MobileScreen padTop={50}>
      <MobileHeader title="تأكيد الدفع" />
      <div style={{ flex: 1, padding: "20px 22px 22px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", overflow: "hidden" }}>
        <div style={{ width: 92, height: 92, borderRadius: "50%", background: `${colors.brand.green}14`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
          <div style={{ width: 62, height: 62, borderRadius: "50%", background: colors.brand.green, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CircleCheck size={30} color="#fff" />
          </div>
        </div>
        <h1 style={{ fontFamily: fonts.heading, fontSize: 22, fontWeight: 700, color: colors.ink.black, margin: "0 0 8px" }}>تم الدفع بنجاح</h1>
        <p style={{ fontFamily: fonts.body, fontSize: 13, lineHeight: 1.9, color: colors.ink.muted, margin: "0 0 22px" }}>تم تفعيل حسابك. يمكنك الآن تصفّح الأعضاء وإرسال طلبات الخطبة.</p>

        <div style={{ width: "100%", background: colors.surface.page, borderRadius: radius.lg, padding: "10px 16px", textAlign: "start", marginBottom: 20 }}>
          {rows.map((r, i) => (
            <div key={r.k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i === rows.length - 1 ? "none" : `1px solid ${colors.border.soft}` }}>
              <span style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted }}>{r.k}</span>
              <span style={{ fontFamily: r.k === "رقم العملية" ? fonts.latin : fonts.body, fontSize: 12.5, fontWeight: 700, color: colors.ink.black }}>{r.v}</span>
            </div>
          ))}
        </div>

        <div style={{ width: "100%", display: "flex", gap: 8 }}>
          <button style={{ flex: 1, height: 48, background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13.5, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}><Search size={15} /> ابدأ التصفّح</button>
          <button style={{ width: 50, height: 48, background: "#fff", color: colors.brand.green, border: `1.5px solid ${colors.border.default}`, borderRadius: radius.md, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Download size={15} /></button>
        </div>
      </div>
    </MobileScreen>
  );
}

/* MP11d · فشل الدفع (موبايل) */
export function MP11dPayFailedMobile() {
  return (
    <MobileScreen padTop={50}>
      <MobileHeader title="فشل الدفع" />
      <div style={{ flex: 1, padding: "20px 22px 22px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <div style={{ width: 92, height: 92, borderRadius: "50%", background: `${colors.accent.red}14`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
          <div style={{ width: 62, height: 62, borderRadius: "50%", background: colors.accent.red, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CircleX size={30} color="#fff" />
          </div>
        </div>
        <h1 style={{ fontFamily: fonts.heading, fontSize: 22, fontWeight: 700, color: colors.ink.black, margin: "0 0 8px" }}>فشلت عملية الدفع</h1>
        <p style={{ fontFamily: fonts.body, fontSize: 13, lineHeight: 1.9, color: colors.ink.muted, margin: "0 0 18px" }}>لم تكتمل العملية ولم يُخصم أي مبلغ من حسابك.</p>
        <div style={{ width: "100%", background: colors.accent.redSoft, border: `1px solid ${colors.accent.red}40`, borderRadius: radius.lg, padding: "12px 14px", textAlign: "start", marginBottom: 18 }}>
          <div style={{ fontFamily: fonts.body, fontSize: 11, fontWeight: 700, color: colors.accent.red }}>سبب الرفض</div>
          <div style={{ fontFamily: fonts.body, fontSize: 12.5, lineHeight: 1.8, color: colors.ink.body, marginTop: 3 }}>تم رفض البطاقة من البنك المُصدِر. تأكد من الرصيد أو جرّب طريقة أخرى.</div>
        </div>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
          <button style={{ height: 48, background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13.5, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}><RefreshCw size={15} /> إعادة المحاولة</button>
          <button style={{ height: 46, background: "#fff", color: colors.ink.body, border: `1.5px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}><CreditCard size={14} /> تغيير طريقة الدفع</button>
          <button style={{ height: 40, background: "transparent", color: colors.brand.green, border: "none", fontFamily: fonts.body, fontSize: 12.5, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5 }}><Headset size={14} /> تواصل مع الدعم</button>
        </div>
      </div>
    </MobileScreen>
  );
}
