import type { ReactNode } from "react";
import { Lock } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, shadow } from "../../tokens";
import { BrandWordmark } from "../_marketing/deco";

export function PaymentShell({ children }: { children: ReactNode }) {
  return (
    <div style={{ width: "100%", minHeight: "100%", background: colors.surface.page, fontFamily: fonts.body, display: "flex", flexDirection: "column" }}>
      <header style={{ height: 64, background: colors.surface.white, borderBottom: `1px solid ${colors.border.soft}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", flexShrink: 0 }}>
        <BrandWordmark size="md" />
        <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: fonts.body, fontSize: 13, fontWeight: 600, color: colors.ink.muted }}>
          <Lock size={15} color={colors.brand.green} /> دفع آمن ومشفّر
        </span>
      </header>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 28px" }}>
        <div style={{ width: "100%", maxWidth: 880 }}>{children}</div>
      </div>
    </div>
  );
}

export function OrderSummary({ label = "رسوم الاشتراك المخصّصة", amount = "١٬٥٠٠ ر.س" }: { label?: string; amount?: string }) {
  return (
    <div style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 24, boxShadow: shadow.sm }}>
      <h3 style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 700, color: colors.ink.black, margin: "0 0 16px" }}>ملخّص الطلب</h3>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: fonts.body, fontSize: 13.5, color: colors.ink.body, marginBottom: 10 }}>
        <span>{label}</span>
        <span style={{ fontWeight: 700 }}>{amount}</span>
      </div>
      <p style={{ fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.muted, margin: "0 0 16px", lineHeight: 1.6 }}>مبلغ مخصّص حدّدته الإدارة بعد تقييم العضوية · بدون ضريبة قيمة مضافة.</p>
      <div style={{ borderTop: `1px solid ${colors.border.soft}`, paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: fonts.heading, fontSize: 15, fontWeight: 700, color: colors.ink.black }}>الإجمالي</span>
        <span style={{ fontFamily: fonts.heading, fontSize: 22, fontWeight: 700, color: colors.brand.green }}>{amount}</span>
      </div>
      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.muted }}>الاشتراك ساري حتى إتمام أول زواج.</span>
      </div>
    </div>
  );
}

export function MethodRow({ name, sub, selected, logo }: { name: string; sub?: string; selected?: boolean; logo: "apple" | "visa" | "mada" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", background: colors.surface.white, border: `1.5px solid ${selected ? colors.brand.green : colors.border.default}`, borderRadius: radius.md, cursor: "pointer", boxShadow: selected ? `0 0 0 3px ${colors.brand.greenSoft}` : "none" }}>
      <div style={{ width: 48, height: 34, borderRadius: 6, background: "#fff", border: `1px solid ${colors.border.soft}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, gap: 4 }}>
        {logo === "apple" && <img src="/payment/apple-pay.png" alt="Apple Pay" style={{ height: 18, objectFit: "contain" }} />}
        {logo === "visa" && (
          <>
            <img src="/ext/visa-logo.png" alt="Visa" style={{ height: 11, objectFit: "contain" }} />
            <img src="/payment/mastercard.png" alt="Mastercard" style={{ height: 18, objectFit: "contain" }} />
          </>
        )}
        {logo === "mada" && <img src="/payment/mada.png" alt="مدى" style={{ height: 16, objectFit: "contain" }} />}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: fonts.body, fontSize: 14.5, fontWeight: 700, color: colors.ink.black }}>{name}</div>
        {sub && <div style={{ fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.muted, marginTop: 2 }}>{sub}</div>}
      </div>
      <span style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${selected ? colors.brand.green : colors.border.strong}`, background: selected ? colors.brand.green : "transparent", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {selected && <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#fff" }} />}
      </span>
    </div>
  );
}
