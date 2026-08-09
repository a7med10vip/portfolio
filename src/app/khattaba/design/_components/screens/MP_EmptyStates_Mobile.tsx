import type { ReactNode } from "react";
import { Heart, MessageCircle, BellOff, Wallet, Search, ArrowLeft, UserPlus } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, palette } from "../tokens";
import { MobileScreen } from "./_mobile/MobileShell";
import { MobileHeader, MobileTabs, type MobileTab } from "./_mobile/MobileApp";

/* MP41-44 · حالات فارغة (موبايل) */

function EmptyShell({ tab, title, icon: Icon, color, image, headline, body, primary, secondary, extra }: {
  tab: MobileTab; title?: string; icon: typeof Heart; color: string; image?: string; headline: string; body: string; primary: ReactNode; secondary?: ReactNode; extra?: ReactNode;
}) {
  return (
    <MobileScreen padTop={50}>
      <MobileHeader title={title} back={!!title} />
      <div style={{ flex: 1, padding: "32px 26px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        {/* decorative medallion */}
        <div style={{ position: "relative", width: 140, height: 140, marginBottom: 22 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `1.5px dashed ${color}40` }} />
          <div style={{ position: "absolute", inset: 18, borderRadius: "50%", background: `${color}10`, border: `1px solid ${color}25` }} />
          <div style={{ position: "absolute", inset: 36, borderRadius: "50%", overflow: "hidden", background: color, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 12px 28px ${color}40` }}>
            {image ? <img src={image} alt="" style={{ width: "100%", height: "100%", padding: 14, boxSizing: "border-box", objectFit: "contain" }} /> : <Icon size={32} color="#fff" />}
          </div>
        </div>
        <h1 style={{ fontFamily: fonts.heading, fontSize: 19, fontWeight: 700, color: colors.ink.black, margin: "0 0 8px" }}>{headline}</h1>
        <p style={{ fontFamily: fonts.body, fontSize: 13, lineHeight: 1.85, color: colors.ink.muted, margin: "0 0 24px", maxWidth: 280 }}>{body}</p>
        {extra}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8, maxWidth: 300 }}>
          {primary}
          {secondary}
        </div>
      </div>
      <MobileTabs active={tab} />
    </MobileScreen>
  );
}

export function MP41EmptyRequestsMobile() {
  return (
    <EmptyShell
      tab="requests"
      icon={Heart}
      image="/brand/khattaba-logo-white.png"
      color={colors.brand.green}
      headline="لا توجد طلبات تواصل بعد"
      body="ابدأ بتصفّح الأعضاء وأرسل طلب تواصل للأنسب لك — كل عرض صالح ٧٢ ساعة."
      primary={<button style={{ height: 48, background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7 }}><Search size={15} /> ابدأ التصفّح</button>}
    />
  );
}

export function MP42EmptyChatMobile() {
  return (
    <EmptyShell
      tab="chat"
      icon={MessageCircle}
      color={colors.accent.purple}
      headline="لا توجد محادثات نشطة"
      body="عند قبول طلب التواصل تُفتح غرفة «مشروع خطبة #» مراقبة بمدة تحدّدها الإدارة."
      primary={<button style={{ height: 48, background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7 }}><Heart size={15} /> اذهب لطلباتي</button>}
      secondary={<button style={{ height: 44, background: "transparent", color: colors.brand.green, border: `1.5px solid ${colors.brand.green}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}><Search size={14} /> تصفّح الأعضاء</button>}
    />
  );
}

export function MP43EmptyNotifsMobile() {
  return (
    <EmptyShell
      tab={null}
      title="الإشعارات"
      icon={BellOff}
      color={colors.accent.amber}
      headline="لا توجد إشعارات"
      body="هتلاقي هنا كل ما يخص طلباتك ومحادثاتك واشتراكك. سنعلمك فور حدوث أي تحديث."
      primary={<button style={{ height: 48, background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}>تخصيص الإشعارات</button>}
    />
  );
}

export function MP44EmptyWalletMobile() {
  return (
    <EmptyShell
      tab={null}
      title="محفظتي"
      icon={Wallet}
      color={colors.brand.green}
      headline="محفظتك فارغة حالياً"
      body="تُضاف للمحفظة مبالغ التواصل الجاد المحجوزة والاستردادات عند فشل المشاريع."
      extra={
        <div style={{ background: colors.brand.greenSoft, border: `1px solid ${colors.brand.green}30`, borderRadius: radius.lg, padding: "12px 16px", marginBottom: 18, width: "100%", maxWidth: 300, textAlign: "start" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: fonts.body, fontSize: 10.5, color: colors.ink.muted }}>الرصيد الإجمالي</div>
              <div style={{ fontFamily: fonts.heading, fontSize: 20, fontWeight: 700, color: colors.ink.black, marginTop: 2 }}>0.00 ر.س</div>
            </div>
            <Wallet size={20} color={colors.brand.green} />
          </div>
        </div>
      }
      primary={<button style={{ height: 48, background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7 }}><Search size={15} /> ابدأ التصفّح</button>}
    />
  );
}
