import type { CSSProperties } from "react";
import { Phone, Mail, Instagram, XLogo, TikTok, WhatsApp, Clock, ChevronDown, Send, Check } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, shadow, space } from "../tokens";
import { MarketingPage, PageHero, wrap } from "./_marketing/Shell";

/* P16 · اتصل بنا (Marketing)
 * PageHero · فورم تواصل (يسار) + كروت معلومات (يمين) — حقول مطابقة لنظام التصميم. */

const inputBase: CSSProperties = {
  height: 48,
  padding: "0 16px",
  fontFamily: fonts.body,
  fontSize: 15,
  color: colors.ink.body,
  background: colors.surface.white,
  border: `1.5px solid ${colors.border.default}`,
  borderRadius: radius.md,
  outline: "none",
  width: "100%",
  direction: "rtl",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: colors.ink.body }}>{label}</label>
      {children}
    </div>
  );
}

function ContactForm() {
  return (
    <div style={{ position: "relative", background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.xl, padding: 32, boxShadow: shadow.sm, overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, insetInlineStart: 0, insetInlineEnd: 0, height: 3, background: colors.brand.highlight }} />
      <h2 style={{ fontFamily: fonts.heading, fontSize: 24, fontWeight: 700, color: colors.ink.black, margin: "0 0 6px" }}>أرسل لنا رسالة</h2>
      <p style={{ fontFamily: fonts.body, fontSize: 14, color: colors.ink.muted, margin: "0 0 24px" }}>سنرد عليك خلال 5 أيام عمل.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          <Field label="الاسم الكامل">
            <input style={inputBase} placeholder="مثال: محمد الأحمدي" />
          </Field>
          <Field label="البريد الإلكتروني">
            <input style={inputBase} placeholder="you@example.com" />
          </Field>
        </div>

        <Field label="رقم الجوال">
          <div style={{ position: "relative" }}>
            <input style={{ ...inputBase, paddingInlineEnd: 86 }} placeholder="5XXXXXXXX" />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                padding: "0 14px",
                display: "flex",
                alignItems: "center",
                gap: 6,
                borderInlineStart: `1.5px solid ${colors.border.default}`,
                background: colors.surface.page,
                borderTopLeftRadius: radius.md,
                borderBottomLeftRadius: radius.md,
                fontFamily: fonts.latin,
                fontSize: 13,
                fontWeight: 700,
                color: colors.ink.body,
              }}
            >
              <span>🇸🇦</span>
              <span>+966</span>
            </div>
          </div>
        </Field>

        <Field label="الموضوع">
          <div style={{ position: "relative" }}>
            <select style={{ ...inputBase, appearance: "none", paddingInlineEnd: 40, cursor: "pointer" }}>
              <option>استفسار عام</option>
              <option>مشكلة في الحساب</option>
              <option>الاشتراك والدفع</option>
              <option>اقتراح أو شكوى</option>
              <option>أخرى</option>
            </select>
            <ChevronDown size={16} style={{ position: "absolute", insetInlineEnd: 14, top: "50%", transform: "translateY(-50%)", color: colors.ink.muted, pointerEvents: "none" }} />
          </div>
        </Field>

        <Field label="هل أنت عضو بالمنصة؟">
          <div style={{ position: "relative" }}>
            <select style={{ ...inputBase, appearance: "none", paddingInlineEnd: 40, cursor: "pointer" }}>
              <option>نعم، عضو مسجّل</option>
              <option>لا، زائر</option>
            </select>
            <ChevronDown size={16} style={{ position: "absolute", insetInlineEnd: 14, top: "50%", transform: "translateY(-50%)", color: colors.ink.muted, pointerEvents: "none" }} />
          </div>
        </Field>

        <Field label="الرسالة">
          <textarea style={{ ...inputBase, height: 120, padding: 14, resize: "none", lineHeight: 1.7 }} placeholder="اكتب رسالتك هنا..." />
        </Field>

        <label style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: fonts.body, fontSize: 13, color: colors.ink.body, cursor: "pointer" }}>
          <span style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${colors.brand.green}`, background: colors.brand.green, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Check size={12} color="#fff" strokeWidth={3} />
          </span>
          أوافق على معالجة بياناتي وفق سياسة الخصوصية وسرية المعلومات.
        </label>

        <button style={{ height: 52, background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 16, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 4 }}>
          <Send size={18} /> إرسال الرسالة
        </button>
      </div>
    </div>
  );
}

const info = [
  { icon: WhatsApp, label: "واتساب", value: "9665XXXXXXXX" },
  { icon: XLogo, label: "أكس (تويتر)", value: "@khattaba" },
  { icon: TikTok, label: "تيك توك", value: "@khattaba" },
  { icon: Instagram, label: "إنستجرام", value: "@khattaba" },
  { icon: Mail, label: "البريد الإلكتروني", value: "info@kh1-ksa.com.sa" },
  { icon: Phone, label: "الهاتف", value: "920 000 000" },
  { icon: Clock, label: "ساعات العمل", value: "الأحد - الخميس · 9ص - 5م" },
];

function ContactInfo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {info.map((c) => {
        const Icon = c.icon;
        return (
          <div key={c.label} style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 20, display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: radius.md, background: colors.brand.greenSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon size={22} color={colors.brand.green} />
            </div>
            <div>
              <div style={{ fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: colors.ink.muted }}>{c.label}</div>
              <div style={{ fontFamily: fonts.body, fontSize: 15, fontWeight: 700, color: colors.ink.black, marginTop: 2 }}>{c.value}</div>
            </div>
          </div>
        );
      })}

      <div style={{ background: colors.brand.purple, borderRadius: radius.lg, padding: 24, marginTop: 4 }}>
        <h3 style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>الدعم الفني</h3>
        <p style={{ fontFamily: fonts.body, fontSize: 13, lineHeight: 1.8, color: "rgba(255,255,255,0.8)", margin: 0 }}>
          للأعضاء المسجّلين: يمكنك التواصل مع الدعم مباشرةً من داخل حسابك للحصول على رد أسرع.
        </p>
      </div>
    </div>
  );
}

function ContactBody() {
  return (
    <section style={{ background: colors.surface.white, padding: `${space[16]}px 0 ${space[20]}px` }}>
      <div style={{ ...wrap, display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: 28, alignItems: "start" }}>
        <ContactForm />
        <ContactInfo />
      </div>
    </section>
  );
}

export default function P16Contact() {
  return (
    <MarketingPage active="contact">
      <PageHero eyebrow="اتصل بنا" title="نحن هنا للمساعدة" subtitle="عندك سؤال أو ملاحظة؟ املأ النموذج وسيتواصل معك فريقنا." />
      <ContactBody />
    </MarketingPage>
  );
}
