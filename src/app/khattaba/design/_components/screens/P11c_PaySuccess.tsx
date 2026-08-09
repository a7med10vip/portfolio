import { CircleCheck, Search, Download } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../tokens";
import { PaymentShell } from "./_core/PaymentShell";

/* P11c · بوابة الدفع — نجاح + فاتورة */
const rows = [
  { k: "المبلغ المدفوع", v: "١٬٥٠٠ ر.س" },
  { k: "الخدمة", v: "رسوم الاشتراك المخصّصة" },
  { k: "طريقة الدفع", v: "Apple Pay" },
  { k: "رقم العملية", v: "TXN-2026-004821" },
  { k: "التاريخ", v: "٢٩ مايو ٢٠٢٦" },
];

export default function P11cPaySuccess() {
  return (
    <PaymentShell>
      <div style={{ maxWidth: 520, margin: "0 auto", background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.xl, padding: 36, textAlign: "center" }}>
        <div style={{ width: 96, height: 96, borderRadius: "50%", background: `${colors.brand.green}14`, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: colors.brand.green, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CircleCheck size={34} color="#fff" />
          </div>
        </div>
        <h2 style={{ fontFamily: fonts.heading, fontSize: 26, fontWeight: 700, color: colors.ink.black, margin: "0 0 8px" }}>تم الدفع بنجاح</h2>
        <p style={{ fontFamily: fonts.body, fontSize: 14.5, color: colors.ink.muted, margin: "0 0 26px", lineHeight: 1.8 }}>تم تفعيل حسابك. يمكنك الآن تصفّح الأعضاء وإرسال طلبات الخطبة.</p>

        <div style={{ background: colors.surface.page, borderRadius: radius.lg, padding: "18px 22px", textAlign: "start", marginBottom: 26 }}>
          {rows.map((r, i) => (
            <div key={r.k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: i === rows.length - 1 ? "none" : `1px solid ${colors.border.soft}` }}>
              <span style={{ fontFamily: fonts.body, fontSize: 13, color: colors.ink.muted }}>{r.k}</span>
              <span style={{ fontFamily: r.k === "رقم العملية" ? fonts.latin : fonts.body, fontSize: 13.5, fontWeight: 700, color: colors.ink.black }}>{r.v}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button style={{ flex: 1, height: 50, background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <Search size={17} /> ابدأ التصفّح
          </button>
          <button style={{ width: 52, height: 50, background: colors.surface.white, color: colors.brand.green, border: `1.5px solid ${colors.border.default}`, borderRadius: radius.md, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }} title="تحميل الفاتورة">
            <Download size={18} />
          </button>
        </div>
      </div>
    </PaymentShell>
  );
}
