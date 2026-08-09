import { Bell, Mail, Eye, EyeOff, Lock, Smartphone, Globe, Trash2, Key, ChevronLeft, Shield } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../tokens";
import { MobileScreen } from "./_mobile/MobileShell";
import { MobileHeader, MobileTabs } from "./_mobile/MobileApp";

/* MP32 · الإعدادات (موبايل) */

function Toggle({ on }: { on: boolean }) {
  return (
    <span style={{ width: 40, height: 22, borderRadius: 999, background: on ? colors.brand.green : colors.border.strong, position: "relative", flexShrink: 0 }}>
      <span style={{ position: "absolute", top: 2, left: on ? 2 : 20, width: 18, height: 18, borderRadius: "50%", background: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,0.15)" }} />
    </span>
  );
}

function Row({ icon: Icon, label, sub, value, danger }: { icon: typeof Bell; label: string; sub?: string; value?: React.ReactNode; danger?: boolean }) {
  return (
    <div style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: 12, borderBottom: `1px solid ${colors.border.soft}` }}>
      <div style={{ width: 32, height: 32, borderRadius: 8, background: danger ? colors.accent.redSoft : colors.surface.page, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={15} color={danger ? colors.accent.red : colors.ink.body} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: fonts.body, fontSize: 12.5, fontWeight: 700, color: danger ? colors.accent.red : colors.ink.black }}>{label}</div>
        {sub && <div style={{ fontFamily: fonts.body, fontSize: 10.5, color: colors.ink.muted, marginTop: 2 }}>{sub}</div>}
      </div>
      {value !== undefined ? value : <ChevronLeft size={14} color={colors.ink.muted} />}
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontFamily: fonts.body, fontSize: 10.5, fontWeight: 700, color: colors.ink.muted, letterSpacing: 0.5, paddingInlineStart: 4, marginBottom: 6 }}>{title}</div>
      <div style={{ background: "#fff", border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, overflow: "hidden" }}>{children}</div>
    </div>
  );
}

export default function MP32SettingsMobile() {
  return (
    <MobileScreen padTop={50}>
      <MobileHeader back title="الإعدادات" />
      <div style={{ flex: 1, overflow: "hidden", padding: "14px 16px 12px" }}>
        <Group title="الإشعارات">
          <Row icon={Bell} label="إشعارات الجوال (Push)" value={<Toggle on />} />
          <Row icon={Mail} label="إشعارات البريد الإلكتروني" value={<Toggle on={false} />} />
          <Row icon={Smartphone} label="إشعارات SMS" sub="للتذكيرات والعروض" value={<Toggle on />} />
        </Group>

        <Group title="الخصوصية">
          <Row icon={Eye} label="إظهار آخر دخول للأعضاء" value={<Toggle on />} />
          <Row icon={EyeOff} label="إخفاء حسابي مؤقتاً" sub="لن يظهر في نتائج البحث" value={<Toggle on={false} />} />
          <Row icon={Shield} label="من يمكنه رؤية ملفي" sub="الجنس المعاكس فقط" />
        </Group>

        <Group title="الأمان">
          <Row icon={Key} label="تغيير كلمة المرور" />
          <Row icon={Lock} label="المصادقة الثنائية (2FA)" sub="عبر الجوال" value={<Toggle on={false} />} />
          <Row icon={Smartphone} label="الأجهزة المسجّلة" sub="3 أجهزة نشطة" />
        </Group>

        <Group title="اللغة والمنطقة">
          <Row icon={Globe} label="اللغة" sub="العربية · العنوان" />
        </Group>

        <Group title="الحساب">
          <Row icon={Trash2} label="حذف الحساب نهائياً" sub="لا يمكن التراجع" danger />
        </Group>

        <div style={{ fontFamily: fonts.latin, fontSize: 10, color: colors.ink.soft, textAlign: "center", paddingTop: 8 }}>الإصدار 1.0.0 · خطّابة السعودية الأولى © 2026</div>
      </div>
      <MobileTabs active={null} />
    </MobileScreen>
  );
}
