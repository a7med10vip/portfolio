import { Heart, MessageCircle, Eye, BadgeCheck, MapPin, ChevronLeft, Search, Bell, Send, Wallet, Wand2 } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, shadow, palette } from "../tokens";
import { MobileScreen } from "./_mobile/MobileShell";
import { MobileHeader, HeaderBellAvatar, MobileTabs } from "./_mobile/MobileApp";
import { DotPattern, FloralScatter } from "./_marketing/deco";

/* MP30 · الرئيسية (داشبورد العضو المسجّل · موبايل) */

const suggestions = [
  { name: "نورة العتيبي", id: "#KH-1042", age: 27, city: "الرياض", tribe: "عتيبة", avatar: "/khattaba/avatars/niqab-woman-brown.png", match: 92, online: true },
  { name: "سارة الغامدي", id: "#KH-1058", age: 25, city: "جدة", tribe: "غامد", avatar: "/khattaba/avatars/niqab-woman-blue.png", match: 87, online: false },
];

const activity = [
  { icon: Heart, color: colors.brand.green, text: "نورة قبلت طلب التواصل", time: "قبل 10د" },
  { icon: MessageCircle, color: colors.accent.purple, text: "رسالة جديدة · مشروع #4821", time: "قبل 25د" },
  { icon: Eye, color: colors.accent.blue, text: "ريم زارت ملفك", time: "أمس" },
];

export default function MP30HomeMobile() {
  return (
    <MobileScreen padTop={50}>
      <MobileHeader right={<HeaderBellAvatar />} />
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {/* greeting + project status */}
        <div style={{ padding: "14px 16px 0" }}>
          <div style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.muted }}>صباح الخير</div>
          <div style={{ fontFamily: fonts.heading, fontSize: 19, fontWeight: 700, color: colors.ink.black, marginTop: 2 }}>محمد الأحمدي 👋</div>
        </div>

        {/* welcome message */}
        <div style={{ margin: "10px 16px 0", background: colors.brand.greenSoft, border: `1px solid ${colors.brand.green}30`, borderRadius: radius.lg, padding: "12px 14px", display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span style={{ fontSize: 17, lineHeight: 1.2 }}>🌸</span>
          <p style={{ fontFamily: fonts.body, fontSize: 12, lineHeight: 1.7, color: colors.ink.body, margin: 0 }}>
            <b>أهلاً بك في منصة خطّابة السعودية الأولى.</b> نتمنّى لك رحلة موفّقة نحو شريك المستقبل، ضمن بيئة آمنة وشرعية تحت إشراف الإدارة.
          </p>
        </div>

        {/* active project banner */}
        <div style={{ margin: "14px 16px 0", background: palette.purple[800], borderRadius: radius.xl, padding: 18, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", gap: 14 }}>
          <DotPattern id="kh-mp30-dots" color="#FFFFFF" opacity={0.06} gap={22} />

      <FloralScatter scale={0.55} mirror />
          <div style={{ width: 50, height: 50, borderRadius: "50%", overflow: "hidden", position: "relative", zIndex: 1, flexShrink: 0, boxShadow: "0 6px 16px rgba(0,0,0,0.25)" }}>
            <img src="/brand/khattaba-logo-white.png" alt="خطّابة السعودية الأولى" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ flex: 1, position: "relative", zIndex: 1, color: "#fff" }}>
            <div style={{ fontFamily: fonts.body, fontSize: 10.5, fontWeight: 700, color: colors.brand.highlight, marginBottom: 2 }}>مشروع نشط</div>
            <div style={{ fontFamily: fonts.heading, fontSize: 14.5, fontWeight: 700 }}>مشروع خطبة #4821</div>
            <div style={{ fontFamily: fonts.body, fontSize: 11, color: palette.purple[200], marginTop: 2 }}>مع نورة · متبقٍ ٢٨ يوم</div>
          </div>
          <ChevronLeft size={18} color="#fff" style={{ position: "relative", zIndex: 1 }} />
        </div>

        {/* quick stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, padding: "14px 16px 0" }}>
          {[
            { icon: Send, label: "طلبات معلّقة", value: "3", color: colors.accent.amber },
            { icon: MessageCircle, label: "محادثات", value: "2", color: colors.accent.purple },
            { icon: Eye, label: "زوّار جدد", value: "5", color: colors.brand.green },
          ].map((s) => (
            <div key={s.label} style={{ background: "#fff", border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: "10px 12px", display: "flex", flexDirection: "column", gap: 6 }}>
              <s.icon size={15} color={s.color} />
              <div>
                <div style={{ fontFamily: fonts.heading, fontSize: 17, fontWeight: 700, color: colors.ink.black, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: fonts.body, fontSize: 10, color: colors.ink.muted, marginTop: 3 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* quick actions */}
        <div style={{ padding: "14px 16px 0" }}>
          <h3 style={{ fontFamily: fonts.heading, fontSize: 13.5, fontWeight: 700, color: colors.ink.black, margin: "0 0 8px" }}>إجراءات سريعة</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
            {[
              { icon: Search, label: "تصفّح", color: colors.brand.green },
              { icon: Wand2, label: "بحث آلي", color: colors.accent.purple },
              { icon: Wallet, label: "محفظتي", color: colors.accent.amber },
              { icon: Eye, label: "الزوّار", color: colors.accent.blue },
            ].map((a) => (
              <div key={a.label} style={{ background: "#fff", border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: "12px 8px", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${a.color}14`, display: "flex", alignItems: "center", justifyContent: "center" }}><a.icon size={16} color={a.color} /></div>
                <span style={{ fontFamily: fonts.body, fontSize: 10.5, fontWeight: 600, color: colors.ink.body }}>{a.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* suggestions */}
        <div style={{ padding: "14px 16px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <h3 style={{ fontFamily: fonts.heading, fontSize: 13.5, fontWeight: 700, color: colors.ink.black, margin: 0, display: "inline-flex", alignItems: "center", gap: 5 }}>
              <Wand2 size={13} color={colors.brand.green} /> اقتراحات اليوم
            </h3>
            <span style={{ fontFamily: fonts.body, fontSize: 11.5, fontWeight: 700, color: colors.brand.green }}>عرض الكل</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {suggestions.map((p) => (
              <div key={p.id} style={{ background: "#fff", border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 12, display: "flex", alignItems: "center", gap: 10, boxShadow: shadow.sm }}>
                <img src={p.avatar} alt={p.name} style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover" }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ fontFamily: fonts.heading, fontSize: 13, fontWeight: 700, color: colors.ink.black }}>{p.name} · {p.age}</span>
                    <BadgeCheck size={11} color={colors.brand.green} />
                  </div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: fonts.body, fontSize: 10.5, color: colors.ink.muted, marginTop: 2 }}>
                    <MapPin size={10} /> {p.city} · {p.tribe}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                  <span style={{ fontFamily: fonts.latin, fontSize: 13, fontWeight: 700, color: colors.brand.green }}>{p.match}%</span>
                  <span style={{ fontFamily: fonts.body, fontSize: 8.5, color: colors.ink.muted }}>توافق</span>
                </div>
                <button style={{ width: 36, height: 36, background: colors.brand.green, color: "#fff", border: "none", borderRadius: 9, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Heart size={14} /></button>
              </div>
            ))}
          </div>
        </div>

        {/* activity */}
        <div style={{ padding: "14px 16px 12px", flex: 1, overflow: "hidden" }}>
          <h3 style={{ fontFamily: fonts.heading, fontSize: 13.5, fontWeight: 700, color: colors.ink.black, margin: "0 0 8px" }}>النشاط الأخير</h3>
          <div style={{ background: "#fff", border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 4 }}>
            {activity.map((a, i) => (
              <div key={i} style={{ padding: "10px 12px", display: "flex", alignItems: "center", gap: 10, borderBottom: i === activity.length - 1 ? "none" : `1px solid ${colors.border.soft}` }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: `${a.color}14`, display: "flex", alignItems: "center", justifyContent: "center" }}><a.icon size={13} color={a.color} /></div>
                <span style={{ flex: 1, fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.body }}>{a.text}</span>
                <span style={{ fontFamily: fonts.body, fontSize: 10, color: colors.ink.muted }}>{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <MobileTabs active="home" />
    </MobileScreen>
  );
}
