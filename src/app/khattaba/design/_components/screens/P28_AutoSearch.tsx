import { Search, Wand2, BadgeCheck, Wallet, Cpu, Heart, ChevronLeft, MapPin } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, shadow, palette, space } from "../tokens";
import { CoreShell, coreWrap } from "./_core/CoreShell";
import { DotPattern, FloralScatter } from "./_marketing/deco";

/* P28 · البحث الآلي نيابة عن العضو
 * (مطابق لسطر 857 في العرض: تحليل المواصفات + ترشيح + فاتورة بمبلغ تحدده الإدارة) */

const flow = [
  { icon: Cpu, title: "تحليل مواصفاتك", body: "نحلّل بياناتك وتفضيلاتك وأجوبتك في الاستبيان." },
  { icon: Search, title: "مطابقة قاعدة البيانات", body: "نقارن مع كل الأعضاء النشطين من الجنس الآخر." },
  { icon: Wand2, title: "ترشيح الأنسب", body: "نختار لك مجموعة مقترحة مرتّبة بنسبة التوافق." },
];

const suggestions = [
  { name: "نورة العتيبي", id: "#KH-1042", age: 27, city: "الرياض", tribe: "عتيبة", match: 92, avatar: 1 },
  { name: "سارة الغامدي", id: "#KH-1058", age: 25, city: "جدة", tribe: "غامد", match: 87, avatar: 3 },
  { name: "ريم القحطاني", id: "#KH-1071", age: 30, city: "الدمام", tribe: "قحطان", match: 84, avatar: 1 },
];

const avatars = ["/avatars/saudi-male.jpeg", "/khattaba/avatars/niqab-woman-brown.png", "/avatars/saudi-male-2.jpeg", "/khattaba/avatars/niqab-woman-blue.png"];

export default function P28AutoSearch() {
  return (
    <CoreShell active="browse">
      <div style={{ ...coreWrap, padding: `${space[8]}px 28px ${space[12]}px`, maxWidth: 1080 }}>
        {/* hero */}
        <div style={{ position: "relative", overflow: "hidden", background: "#2A1322", borderRadius: radius["2xl"], padding: 32, color: "#fff", marginBottom: 22, display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 24, alignItems: "center" }}>
          <DotPattern id="kh-auto-dots" color="#FFFFFF" opacity={0.06} gap={26} />

      <FloralScatter scale={0.85} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 12px", background: "rgba(251,192,226,0.10)", border: `1px solid ${colors.brand.highlight}`, borderRadius: radius.full, fontFamily: fonts.body, fontSize: 12, fontWeight: 700, color: colors.brand.highlight, marginBottom: 14 }}>
              <Wand2 size={13} /> ميزة ذكية
            </span>
            <h1 style={{ fontFamily: fonts.heading, fontSize: 30, fontWeight: 700, color: "#fff", margin: "0 0 10px" }}>اطلب البحث نيابة عنك</h1>
            <p style={{ fontFamily: fonts.body, fontSize: 14.5, lineHeight: 1.85, color: palette.purple[200], margin: 0, maxWidth: 480 }}>
              دع المنصة تحلّل مواصفاتك وتطابقها مع قاعدة البيانات لترشّح لك الأنسب تلقائياً — رسوم الخدمة تُحدَّد يدوياً من الإدارة.
            </p>
            <p style={{ fontFamily: fonts.body, fontSize: 12.5, lineHeight: 1.7, color: colors.brand.highlight, margin: "10px 0 0", maxWidth: 480, fontWeight: 700 }}>
              ⓘ خدمة خاصة بطلب فقط — تُتاح للأعضاء الذين يتقدّمون للإدارة بطلب البحث عنهم، وليست خدمة عامة متاحة للجميع.
            </p>
            <button style={{ height: 50, padding: "0 28px", background: colors.brand.highlight, color: palette.purple[800], border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 15, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, marginTop: 18 }}>
              <Wand2 size={17} /> طلب البحث نيابة عني
            </button>
          </div>

          <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src="/khattaba/ai-search.png" alt="بحث ذكي يطابق المواصفات ويرشّح الأنسب" style={{ width: "100%", maxWidth: 320, height: "auto", display: "block" }} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 18 }}>
          {/* flow */}
          <div>
            <h3 style={{ fontFamily: fonts.heading, fontSize: 17, fontWeight: 700, color: colors.ink.black, margin: "0 0 14px" }}>كيف تعمل الخدمة؟</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {flow.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 18, display: "flex", gap: 14, alignItems: "center", boxShadow: shadow.sm }}>
                    <div style={{ width: 44, height: 44, borderRadius: radius.md, background: colors.brand.greenSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={20} color={colors.brand.green} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: fonts.body, fontSize: 14, fontWeight: 700, color: colors.ink.black }}>{f.title}</div>
                      <div style={{ fontFamily: fonts.body, fontSize: 12.5, color: colors.ink.muted, marginTop: 3 }}>{f.body}</div>
                    </div>
                    <span style={{ fontFamily: fonts.latin, fontSize: 13, fontWeight: 700, color: colors.ink.soft }}>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                );
              })}
            </div>

            <div style={{ background: colors.accent.amberSoft, border: `1px solid ${colors.accent.amber}40`, borderRadius: radius.md, padding: "14px 18px", marginTop: 14, display: "flex", gap: 10 }}>
              <Wallet size={17} color={colors.accent.amber} style={{ flexShrink: 0, marginTop: 2 }} />
              <p style={{ fontFamily: fonts.body, fontSize: 12.5, lineHeight: 1.7, color: colors.ink.body, margin: 0 }}>
                تُصدر فاتورة إلكترونية بمبلغ الخدمة بعد أن تحدّده الإدارة يدوياً. لا يتم تنفيذ الخدمة قبل الدفع.
              </p>
            </div>
          </div>

          {/* preview of suggestions */}
          <div>
            <h3 style={{ fontFamily: fonts.heading, fontSize: 17, fontWeight: 700, color: colors.ink.black, margin: "0 0 14px" }}>نموذج للترشيحات</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {suggestions.map((s) => (
                <div key={s.id} style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 14, display: "flex", alignItems: "center", gap: 12, boxShadow: shadow.sm }}>
                  <img src={avatars[s.avatar]} alt={s.name} style={{ width: 46, height: 46, borderRadius: "50%", objectFit: "cover" }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <span style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 700, color: colors.ink.black }}>{s.name}</span>
                      <BadgeCheck size={12} color={colors.brand.green} />
                    </div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted, marginTop: 2 }}>
                      <MapPin size={10} /> {s.age} · {s.city} · {s.tribe}
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                    <span style={{ fontFamily: fonts.latin, fontSize: 14, fontWeight: 700, color: colors.brand.green }}>{s.match}%</span>
                    <span style={{ fontFamily: fonts.body, fontSize: 10, color: colors.ink.muted }}>توافق</span>
                  </div>
                </div>
              ))}
            </div>
            <button style={{ width: "100%", height: 42, marginTop: 12, background: "transparent", color: colors.brand.green, border: `1.5px solid ${colors.brand.green}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              عرض كل الترشيحات <ChevronLeft size={14} />
            </button>
          </div>
        </div>
      </div>
    </CoreShell>
  );
}
