import type { CSSProperties, ReactNode } from "react";
import { Check, ShieldCheck, ChevronDown, Eye } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, palette } from "../../tokens";
import { DotPattern, BrandWordmark } from "../_marketing/deco";

/* Shared split-screen shell for Auth screens (P03*, P04, P05*).
 * Content side (RTL right) + branded purple panel (left). Fills the frame. */

export const inputBase: CSSProperties = {
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

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontFamily: fonts.body, fontSize: 12.5, fontWeight: 600, color: colors.ink.body }}>{label}</label>
      {children}
      {hint && <span style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted }}>{hint}</span>}
    </div>
  );
}

const brandPoints = ["مراجعة يدوية لكل حساب", "بدون صور حقيقية إطلاقًا", "شات مراقب تحت الإشراف"];

function BrandPanel() {
  return (
    <div style={{ width: 460, position: "relative", overflow: "hidden", background: palette.purple[800], padding: 48, display: "flex", flexDirection: "column", justifyContent: "space-between", flexShrink: 0 }}>
      <img src="/khattaba/auth-couple.png" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(42,19,34,0.86)" }} />
      <DotPattern id="kh-auth-dots" color="#FFFFFF" opacity={0.05} gap={28} />

      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 10 }}>
        <BrandWordmark onDark size="md" />
        
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <h2 style={{ fontFamily: fonts.hero, fontSize: 34, fontWeight: 700, lineHeight: 1.4, color: "#fff", margin: "0 0 16px" }}>
          رحلتك نحو الزواج <span style={{ color: colors.brand.highlight }}>تبدأ هنا</span>
        </h2>
        <p style={{ fontFamily: fonts.body, fontSize: 15, lineHeight: 1.85, color: palette.purple[200], margin: "0 0 28px" }}>
          منصة وساطة آمنة وشرعية تربط الراغبين تحت إشراف الإدارة، دون إغفال للخصوصية.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {brandPoints.map((p) => (
            <div key={p} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 26, height: 26, borderRadius: "50%", background: colors.brand.highlight, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Check size={15} color={palette.purple[800]} strokeWidth={3} />
              </span>
              <span style={{ fontFamily: fonts.body, fontSize: 14.5, fontWeight: 600, color: "#fff" }}>{p}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 1, display: "inline-flex", alignItems: "center", gap: 8, fontFamily: fonts.body, fontSize: 13, color: palette.purple[200] }}>
        <ShieldCheck size={15} color={colors.brand.highlight} /> متوافقة مع نظام حماية البيانات الشخصية (PDPL)
      </div>
    </div>
  );
}

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", background: colors.surface.white, fontFamily: fonts.body }}>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 56px", overflow: "hidden" }}>
        <div style={{ width: "100%", maxWidth: 440 }}>{children}</div>
      </div>
      <BrandPanel />
    </div>
  );
}

/* 3-step registration stepper: البيانات → التفضيلات → التحقق */
const stepLabels = ["البيانات", "التفضيلات", "التحقق"];

export function AuthStepper({ current }: { current: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 28 }}>
      {stepLabels.map((label, i) => {
        const done = i < current;
        const active = i === current;
        const bg = done || active ? colors.brand.green : colors.surface.page;
        const fg = done || active ? "#fff" : colors.ink.muted;
        return (
          <div key={label} style={{ display: "flex", alignItems: "center", flex: i === stepLabels.length - 1 ? 0 : 1 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: bg, color: fg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fonts.latin, fontSize: 13, fontWeight: 700, border: active ? `3px solid ${colors.brand.greenSoft}` : "none" }}>
                {done ? <Check size={15} strokeWidth={3} /> : i + 1}
              </div>
              <span style={{ fontFamily: fonts.body, fontSize: 11.5, fontWeight: active ? 700 : 500, color: active ? colors.brand.green : done ? colors.ink.body : colors.ink.muted, whiteSpace: "nowrap" }}>{label}</span>
            </div>
            {i < stepLabels.length - 1 && <div style={{ flex: 1, height: 2, background: done ? colors.brand.green : colors.border.default, margin: "0 8px", marginTop: -22 }} />}
          </div>
        );
      })}
    </div>
  );
}

export function AuthHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h1 style={{ fontFamily: fonts.heading, fontSize: 28, fontWeight: 700, color: colors.ink.black, margin: 0 }}>{title}</h1>
      {subtitle && <p style={{ fontFamily: fonts.body, fontSize: 14.5, color: colors.ink.muted, margin: "8px 0 0", lineHeight: 1.7 }}>{subtitle}</p>}
    </div>
  );
}

export function PrimaryButton({ children }: { children: ReactNode }) {
  return (
    <button style={{ width: "100%", height: 52, background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 16, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
      {children}
    </button>
  );
}

export function PhoneInput() {
  return (
    <div style={{ position: "relative" }}>
      <input style={{ ...inputBase, paddingInlineStart: 86 }} placeholder="5XXXXXXXX" />
      <div style={{ position: "absolute", top: 0, right: 0, height: "100%", padding: "0 14px", display: "flex", alignItems: "center", gap: 6, borderInlineEnd: `1.5px solid ${colors.border.default}`, background: colors.surface.page, borderTopRightRadius: radius.md, borderBottomRightRadius: radius.md, fontFamily: fonts.latin, fontSize: 13, fontWeight: 700, color: colors.ink.body }}>
        <span>🇸🇦</span>
        <span>+966</span>
      </div>
    </div>
  );
}

export function SecondaryButton({ children }: { children: ReactNode }) {
  return (
    <button style={{ width: "100%", height: 52, background: "transparent", color: colors.brand.green, border: `1.5px solid ${colors.brand.green}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 16, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
      {children}
    </button>
  );
}

export function PasswordInput({ placeholder = "••••••••" }: { placeholder?: string }) {
  return (
    <div style={{ position: "relative" }}>
      <input type="password" style={{ ...inputBase, paddingInlineEnd: 44 }} placeholder={placeholder} defaultValue="" />
      <Eye size={18} style={{ position: "absolute", insetInlineEnd: 14, top: "50%", transform: "translateY(-50%)", color: colors.ink.muted, pointerEvents: "none" }} />
    </div>
  );
}

export function SelectInput({ options }: { options: string[] }) {
  return (
    <div style={{ position: "relative" }}>
      <select style={{ ...inputBase, appearance: "none", paddingInlineEnd: 40, cursor: "pointer" }}>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <ChevronDown size={16} style={{ position: "absolute", insetInlineEnd: 14, top: "50%", transform: "translateY(-50%)", color: colors.ink.muted, pointerEvents: "none" }} />
    </div>
  );
}

export function Segmented({ options, active = 0 }: { options: string[]; active?: number }) {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      {options.map((o, i) => (
        <div key={o} style={{ flex: 1, height: 48, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14.5, fontWeight: 700, cursor: "pointer", background: i === active ? colors.brand.greenSoft : colors.surface.white, color: i === active ? colors.brand.greenDark : colors.ink.body, border: `1.5px solid ${i === active ? colors.brand.green : colors.border.default}` }}>
          {o}
        </div>
      ))}
    </div>
  );
}

export function ResendLink() {
  return (
    <div style={{ textAlign: "center", fontFamily: fonts.body, fontSize: 13.5, color: colors.ink.muted }}>
      لم يصلك الرمز؟ <span style={{ color: colors.brand.green, fontWeight: 700, cursor: "pointer" }}>إعادة الإرسال</span>
    </div>
  );
}

export function AltLink({ text, link }: { text: string; link: string }) {
  return (
    <div style={{ textAlign: "center", fontFamily: fonts.body, fontSize: 14, color: colors.ink.muted }}>
      {text} <span style={{ color: colors.brand.green, fontWeight: 700, cursor: "pointer" }}>{link}</span>
    </div>
  );
}

const avatarOptions = [
  "/avatars/saudi-male.jpeg",
  "/khattaba/avatars/niqab-woman-brown.png",
  "/avatars/saudi-male-2.jpeg",
  "/khattaba/avatars/niqab-woman-blue.png",
];

/* Avatar picker — memoji-style cartoon avatars only, never real photos. */
export function AvatarPicker({ selected = 0 }: { selected?: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label style={{ fontFamily: fonts.body, fontSize: 12.5, fontWeight: 600, color: colors.ink.body }}>اختر صورتك الرمزية</label>
      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        {avatarOptions.map((src, i) => (
          <div key={src} style={{ position: "relative", width: 60, height: 60, flexShrink: 0 }}>
            <img
              src={src}
              alt="أفاتار"
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                objectFit: "cover",
                background: colors.surface.page,
                border: `2.5px solid ${i === selected ? colors.brand.green : colors.border.default}`,
                cursor: "pointer",
                display: "block",
              }}
            />
            {i === selected && (
              <span style={{ position: "absolute", bottom: -2, insetInlineEnd: -2, width: 22, height: 22, borderRadius: "50%", background: colors.brand.green, display: "inline-flex", alignItems: "center", justifyContent: "center", border: `2px solid ${colors.surface.white}` }}>
                <Check size={12} color="#fff" strokeWidth={3} />
              </span>
            )}
          </div>
        ))}
        <div style={{ width: 60, height: 60, borderRadius: "50%", border: `2px dashed ${colors.border.strong}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer", fontFamily: fonts.heading, fontSize: 20, fontWeight: 700, color: colors.ink.soft }}>
          أ
        </div>
      </div>
      <span style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted }}>صور كرتونية فقط — لا تُستخدم صور حقيقية أبدًا.</span>
    </div>
  );
}

export function StatusView({ icon: Icon, color, title, body, children }: { icon: typeof Check; color: string; title: string; body: string; children?: ReactNode }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ width: 104, height: 104, borderRadius: "50%", background: `${color}14`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 26px" }}>
        <div style={{ width: 68, height: 68, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={34} color="#fff" />
        </div>
      </div>
      <h1 style={{ fontFamily: fonts.heading, fontSize: 28, fontWeight: 700, color: colors.ink.black, margin: "0 0 12px" }}>{title}</h1>
      <p style={{ fontFamily: fonts.body, fontSize: 15, lineHeight: 1.9, color: colors.ink.muted, margin: "0 auto 28px", maxWidth: 380 }}>{body}</p>
      {children}
    </div>
  );
}

export function OtpBoxes({ filled = 3 }: { filled?: number }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 10, direction: "ltr" }}>
      {[0, 1, 2, 3, 4, 5].map((idx) => {
        const isFilled = idx < filled;
        const focused = idx === filled;
        return (
          <div key={idx} style={{ width: 52, height: 60, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fonts.latin, fontSize: 24, fontWeight: 700, color: colors.ink.black, background: colors.surface.white, border: `2px solid ${focused || isFilled ? colors.brand.green : colors.border.default}`, borderRadius: radius.lg, boxShadow: focused ? `0 0 0 3px ${colors.brand.greenSoft}` : "none" }}>
            {isFilled ? "•" : ""}
          </div>
        );
      })}
    </div>
  );
}
