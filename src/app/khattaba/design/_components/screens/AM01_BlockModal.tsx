import type { CSSProperties } from "react";
import { Ban, X, ChevronDown } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, shadow } from "../tokens";
import { AdminShell, card } from "./_admin/AdminShell";

/* AM01 · مودال حظر العضو */

const inp: CSSProperties = { height: 42, padding: "0 14px", width: "100%", background: colors.surface.white, border: `1.5px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13.5, color: colors.ink.body, outline: "none", direction: "rtl" };

export default function AM01BlockModal() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <AdminShell active="members" title="إدارة الأعضاء" breadcrumb={["الأعضاء", "محمد الأحمدي"]}>
        <div style={{ ...card, padding: 28, opacity: 0.45 }}>
          <div style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 700, color: colors.ink.black }}>محمد الأحمدي · #KH-2087</div>
        </div>
      </AdminShell>
      <div style={{ position: "absolute", inset: 0, background: "rgba(26,11,21,0.55)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 480, background: colors.surface.white, borderRadius: radius.xl, boxShadow: shadow.lg, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", borderBottom: `1px solid ${colors.border.soft}` }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ width: 44, height: 44, borderRadius: radius.md, background: colors.accent.redSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Ban size={20} color={colors.accent.red} />
              </div>
              <div>
                <h3 style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 700, color: colors.ink.black, margin: 0 }}>حظر العضو</h3>
                <p style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted, margin: "3px 0 0" }}>محمد الأحمدي · #KH-2087</p>
              </div>
            </div>
            <button style={{ width: 32, height: 32, borderRadius: radius.md, background: colors.surface.page, border: `1px solid ${colors.border.default}`, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><X size={15} /></button>
          </div>

          <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ fontFamily: fonts.body, fontSize: 12.5, fontWeight: 600, color: colors.ink.body, marginBottom: 6, display: "block" }}>سبب الحظر</label>
              <div style={{ position: "relative" }}>
                <select style={{ ...inp, appearance: "none", paddingInlineEnd: 36, cursor: "pointer" }}>
                  <option>تكرار مخالفة قواعد الشات</option>
                  <option>محاولة تبادل وسائل تواصل خارجية</option>
                  <option>سلوك مسيء أو غير لائق</option>
                  <option>سبب آخر</option>
                </select>
                <ChevronDown size={15} style={{ position: "absolute", insetInlineEnd: 12, top: "50%", transform: "translateY(-50%)", color: colors.ink.muted, pointerEvents: "none" }} />
              </div>
            </div>
            <div>
              <label style={{ fontFamily: fonts.body, fontSize: 12.5, fontWeight: 600, color: colors.ink.body, marginBottom: 6, display: "block" }}>مدة الحظر</label>
              <div style={{ position: "relative" }}>
                <select style={{ ...inp, appearance: "none", paddingInlineEnd: 36, cursor: "pointer" }}><option>7 أيام</option><option>30 يوم</option><option>دائم</option></select>
                <ChevronDown size={15} style={{ position: "absolute", insetInlineEnd: 12, top: "50%", transform: "translateY(-50%)", color: colors.ink.muted, pointerEvents: "none" }} />
              </div>
            </div>
            <div>
              <label style={{ fontFamily: fonts.body, fontSize: 12.5, fontWeight: 600, color: colors.ink.body, marginBottom: 6, display: "block" }}>ملاحظات داخلية (لن يراها العضو) · متاحة لكل الأعضاء حتى الساريين</label>
              <textarea style={{ ...inp, height: 72, padding: 12, resize: "none", lineHeight: 1.7 }} placeholder="اكتب ملاحظات للسجل الإداري..." />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginTop: 8 }}>
                {[1, 2, 3].map((i) => (
                  <div key={i} style={{ height: 64, borderRadius: radius.md, border: `1.5px dashed ${colors.border.strong}`, background: colors.surface.page, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, cursor: "pointer", color: colors.ink.muted }}>
                    <span style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 700, lineHeight: 1 }}>+</span>
                    <span style={{ fontFamily: fonts.body, fontSize: 10.5 }}>صورة {i}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.soft, margin: "6px 0 0", lineHeight: 1.6 }}>إرفاق حتى 3 صور كمرجع (لقطات محادثات واتساب مثلاً) تُحفظ في سجل العضو.</p>
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: fonts.body, fontSize: 13, color: colors.ink.body, cursor: "pointer" }}>
              <span style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${colors.brand.green}`, background: colors.brand.green }} />
              إرسال إشعار للعضو بسبب الحظر
            </label>
          </div>

          <div style={{ padding: "16px 24px", borderTop: `1px solid ${colors.border.soft}`, display: "flex", justifyContent: "flex-start", gap: 10 }}>
            <button style={{ height: 44, padding: "0 24px", background: colors.accent.red, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>تأكيد الحظر</button>
            <button style={{ height: 44, padding: "0 22px", background: "transparent", color: colors.ink.body, border: `1.5px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>إلغاء</button>
          </div>
        </div>
      </div>
    </div>
  );
}
