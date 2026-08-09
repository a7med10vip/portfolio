import type { CSSProperties } from "react";
import { Clock, Wallet, MessageCircle, Mail, Lock, Save, ChevronDown } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../tokens";
import { AdminShell, card } from "./_admin/AdminShell";

/* A07 · إعدادات المنصة — مدة الشات، رسوم، رسائل، بوابة الدفع */

const inputBase: CSSProperties = { height: 44, padding: "0 14px", width: "100%", background: colors.surface.white, border: `1.5px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14, color: colors.ink.body, outline: "none", direction: "rtl" };

function Toggle({ on }: { on: boolean }) {
  return (
    <span style={{ width: 40, height: 22, borderRadius: 999, background: on ? colors.brand.green : colors.border.strong, position: "relative", flexShrink: 0 }}>
      <span style={{ position: "absolute", top: 2, left: on ? 2 : 20, width: 18, height: 18, borderRadius: "50%", background: "#fff", boxShadow: "0 2px 4px rgba(0,0,0,0.15)" }} />
    </span>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontFamily: fonts.body, fontSize: 12.5, fontWeight: 600, color: colors.ink.body }}>{label}</label>
      {children}
      {hint && <span style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted }}>{hint}</span>}
    </div>
  );
}

function Card({ icon: Icon, title, desc, children }: { icon: typeof Clock; title: string; desc: string; children: React.ReactNode }) {
  return (
    <div style={{ ...card, padding: 24 }}>
      <div style={{ display: "flex", gap: 14, marginBottom: 18 }}>
        <div style={{ width: 44, height: 44, borderRadius: radius.md, background: colors.brand.greenSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon size={20} color={colors.brand.green} />
        </div>
        <div>
          <h3 style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 700, color: colors.ink.black, margin: 0 }}>{title}</h3>
          <p style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted, margin: "4px 0 0" }}>{desc}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

export default function A07Settings() {
  return (
    <AdminShell active="settings" title="إعدادات المنصة" breadcrumb={["لوحة التحكم", "الإعدادات"]}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card icon={Clock} title="مدة الشات الافتراضية" desc="القيمة المبدئية لكل غرفة محادثة جديدة · الإدارة تتحكم بالمدة لكل غرفة على حدة (30/60 يوم...)">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="المدة الافتراضية (أيام)"><input style={inputBase} defaultValue="30" /></Field>
            <Field label="الحد الأقصى للتمديد" hint="لا يوجد حد افتراضي على عدد التمديدات."><input style={inputBase} defaultValue="بدون حد" /></Field>
          </div>
        </Card>

        <Card icon={Wallet} title="الرسوم والمدفوعات" desc="السعر يُحدَّد يدوياً لكل عضو من الإدارة بعد القبول · هذه قيم مرجعية فقط">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="رسوم اشتراك مرجعية"><input style={inputBase} defaultValue="1,500 ر.س" /></Field>
            <Field label="رسوم اتفاقية الجدية"><input style={inputBase} defaultValue="800 ر.س" /></Field>
            <Field label="مبلغ التواصل الجاد (محفظة)"><input style={inputBase} defaultValue="1,200 ر.س" /></Field>
            <Field label="بوابة الدفع">
              <div style={{ position: "relative" }}>
                <select style={{ ...inputBase, appearance: "none", paddingInlineEnd: 36, cursor: "pointer" }}><option>Tap (نشط)</option><option>Paymob</option></select>
                <ChevronDown size={15} style={{ position: "absolute", insetInlineEnd: 12, top: "50%", transform: "translateY(-50%)", color: colors.ink.muted, pointerEvents: "none" }} />
              </div>
            </Field>
          </div>
        </Card>

        <Card icon={MessageCircle} title="قوالب الرسائل" desc="نصوص SMS/Email/Push الافتراضية — تستبدل المتغيرات تلقائياً.">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Field label="رسالة قبول العضوية" hint="المتغيرات: {الاسم} · {الرسوم}"><textarea style={{ ...inputBase, height: 70, padding: 12, resize: "none", lineHeight: 1.7 }} defaultValue="مبروك {الاسم}! تم قبول طلبك. رسوم الاشتراك المخصّصة: {الرسوم}." /></Field>
            <Field label="إشعار طلب تواصل جديد"><textarea style={{ ...inputBase, height: 60, padding: 12, resize: "none", lineHeight: 1.7 }} defaultValue="لديك طلب تواصل جديد من {الاسم}. صالح 72 ساعة." /></Field>
          </div>
        </Card>

        <Card icon={Lock} title="الأمان والجلسات" desc="إعدادات أمان عامة للحسابات وإدارة الجلسة.">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}><span style={{ fontFamily: fonts.body, fontSize: 13, color: colors.ink.body }}>المصادقة الثنائية للأدمن</span><Toggle on /></label>
            <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}><span style={{ fontFamily: fonts.body, fontSize: 13, color: colors.ink.body }}>قفل الجلسة بعد 15 دقيقة خمول</span><Toggle on /></label>
            <label style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}><span style={{ fontFamily: fonts.body, fontSize: 13, color: colors.ink.body }}>إشعارات الأدمن عبر البريد</span><Toggle on={false} /></label>
            <Field label="مدة انتهاء OTP (ثانية)"><input style={inputBase} defaultValue="300" /></Field>
          </div>
        </Card>

        <Card icon={Mail} title="بوابة الإشعارات" desc="مزوّد SMS و Email المعتمد لإرسال الإشعارات للأعضاء.">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="مزوّد SMS">
              <div style={{ position: "relative" }}>
                <select style={{ ...inputBase, appearance: "none", paddingInlineEnd: 36, cursor: "pointer" }}><option>Mobily Business</option><option>Unifonic</option></select>
                <ChevronDown size={15} style={{ position: "absolute", insetInlineEnd: 12, top: "50%", transform: "translateY(-50%)", color: colors.ink.muted, pointerEvents: "none" }} />
              </div>
            </Field>
            <Field label="مزوّد البريد"><input style={inputBase} defaultValue="Amazon SES" /></Field>
          </div>
        </Card>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-start", gap: 12, marginTop: 18 }}>
        <button style={{ height: 46, padding: "0 28px", background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14.5, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}><Save size={16} /> حفظ الإعدادات</button>
        <button style={{ height: 46, padding: "0 22px", background: "transparent", color: colors.ink.body, border: `1.5px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14.5, fontWeight: 700, cursor: "pointer" }}>تجاهل التعديلات</button>
      </div>
    </AdminShell>
  );
}
