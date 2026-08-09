import type { ReactNode } from "react";
import { Clock, CircleCheck, CircleX, CreditCard, RefreshCw, Headset, FileCheck, Search, BadgeCheck } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, palette } from "../tokens";
import { MobileScreen } from "./_mobile/MobileShell";
import { MPrimaryButton } from "./_mobile/MobileApp";

/* MP03d/e/f · حالات التسجيل (موبايل · 3 شاشات بقالب واحد) */
function StatusScreen({ icon: Icon, color, title, body, children }: { icon: typeof Clock; color: string; title: string; body: string; children: ReactNode }) {
  return (
    <MobileScreen padTop={50}>
      <div style={{ flex: 1, padding: "24px 22px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <div style={{ width: 96, height: 96, borderRadius: "50%", background: `${color}14`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon size={30} color="#fff" />
          </div>
        </div>
        <h1 style={{ fontFamily: fonts.heading, fontSize: 22, fontWeight: 700, color: colors.ink.black, margin: "0 0 10px" }}>{title}</h1>
        <p style={{ fontFamily: fonts.body, fontSize: 13.5, lineHeight: 1.95, color: colors.ink.muted, margin: "0 0 22px" }}>{body}</p>
        <div style={{ width: "100%" }}>{children}</div>
      </div>
    </MobileScreen>
  );
}

export function MP03dPendingMobile() {
  const phases = [{ icon: FileCheck, label: "أُرسِل", done: true }, { icon: Search, label: "قيد المراجعة", active: true }, { icon: BadgeCheck, label: "التفعيل" }];
  return (
    <StatusScreen icon={Clock} color={colors.accent.amber} title="طلبك قيد المراجعة" body="تراجع الإدارة طلبك يدوياً — عادةً خلال ٢٤–٤٨ ساعة. سنخطرك فور القرار.">
      <div style={{ display: "flex", justifyContent: "space-between", background: colors.surface.page, border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: "14px 12px", marginBottom: 18 }}>
        {phases.map((p) => {
          const Icon = p.icon, tone = p.done ? colors.brand.green : p.active ? colors.accent.amber : colors.ink.soft;
          return (
            <div key={p.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: `${tone}1A`, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={16} color={tone} /></div>
              <span style={{ fontFamily: fonts.body, fontSize: 10.5, fontWeight: p.active ? 700 : 500, color: tone }}>{p.label}</span>
            </div>
          );
        })}
      </div>
      <button style={{ width: "100%", height: 48, background: "transparent", color: colors.brand.green, border: `1.5px solid ${colors.brand.green}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14, fontWeight: 700 }}>العودة للرئيسية</button>
    </StatusScreen>
  );
}

export function MP03eAcceptedMobile() {
  return (
    <StatusScreen icon={CircleCheck} color={colors.brand.green} title="تم قبول طلبك!" body="مبروك! حدّدت الإدارة رسوم اشتراكك المخصّصة — فعّل حسابك لتبدأ.">
      <div style={{ background: palette.purple[800], borderRadius: radius.lg, padding: "14px 16px", marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ textAlign: "start" }}>
          <div style={{ fontFamily: fonts.body, fontSize: 11, color: palette.purple[200] }}>رسوم الاشتراك المخصّصة</div>
          <div style={{ fontFamily: fonts.heading, fontSize: 17, fontWeight: 700, color: "#fff", marginTop: 2 }}>حدّدتها الإدارة</div>
        </div>
        <CreditCard size={22} color={colors.brand.highlight} />
      </div>
      <p style={{ fontFamily: fonts.body, fontSize: 10.5, color: colors.ink.muted, lineHeight: 1.7, marginBottom: 14 }}>المبلغ مخصّص لك ويختلف من شخص لآخر · الاشتراك ساري حتى أول زواج.</p>
      <MPrimaryButton><CreditCard size={16} /> ادفع وفعّل حسابي</MPrimaryButton>
      <div style={{ marginTop: 12, fontFamily: fonts.body, fontSize: 12.5, color: colors.ink.muted }}>التفعيل لاحقاً</div>
    </StatusScreen>
  );
}

export function MP03fRejectedMobile() {
  return (
    <StatusScreen icon={CircleX} color={colors.accent.red} title="لم يتم قبول طلبك" body="بعد المراجعة، لم يُقبل طلبك في الوقت الحالي. يمكنك تعديل بياناتك وإعادة التقديم.">
      <div style={{ background: colors.accent.redSoft, border: `1px solid ${colors.accent.red}40`, borderRadius: radius.lg, padding: "12px 14px", textAlign: "start", marginBottom: 16 }}>
        <div style={{ fontFamily: fonts.body, fontSize: 11, fontWeight: 700, color: colors.accent.red }}>سبب الرفض</div>
        <div style={{ fontFamily: fonts.body, fontSize: 12.5, lineHeight: 1.8, color: colors.ink.body, marginTop: 3 }}>عدم اكتمال البيانات المطلوبة للتحقق من الجدية.</div>
      </div>
      <MPrimaryButton><RefreshCw size={16} /> تعديل وإعادة التقديم</MPrimaryButton>
      <div style={{ marginTop: 12, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5, width: "100%", fontFamily: fonts.body, fontSize: 12.5, fontWeight: 700, color: colors.brand.green }}>
        <Headset size={14} /> تواصل مع الدعم
      </div>
    </StatusScreen>
  );
}
