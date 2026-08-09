import { Clock, FileCheck, Search, BadgeCheck } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../tokens";
import { AuthShell, StatusView, SecondaryButton } from "./_auth/AuthShell";

/* P03d · التسجيل — بانتظار مراجعة الإدارة */
const phases = [
  { icon: FileCheck, label: "تم الإرسال", done: true },
  { icon: Search, label: "قيد المراجعة", active: true },
  { icon: BadgeCheck, label: "التفعيل", done: false },
];

export default function P03dPending() {
  return (
    <AuthShell>
      <StatusView icon={Clock} color={colors.accent.amber} title="طلبك قيد المراجعة" body="يقوم فريق الإدارة بمراجعة طلبك يدويًا للتأكد من جدية كل عضو. سنخطرك فور اتخاذ القرار — عادةً خلال ٢٤–٤٨ ساعة.">
        <div style={{ display: "flex", justifyContent: "space-between", gap: 8, background: colors.surface.page, border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: "18px 16px", marginBottom: 24 }}>
          {phases.map((p) => {
            const Icon = p.icon;
            const tone = p.done ? colors.brand.green : p.active ? colors.accent.amber : colors.ink.soft;
            return (
              <div key={p.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${tone}1A`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={20} color={tone} />
                </div>
                <span style={{ fontFamily: fonts.body, fontSize: 11.5, fontWeight: p.active ? 700 : 500, color: tone }}>{p.label}</span>
              </div>
            );
          })}
        </div>
        <SecondaryButton>العودة للرئيسية</SecondaryButton>
      </StatusView>
    </AuthShell>
  );
}
