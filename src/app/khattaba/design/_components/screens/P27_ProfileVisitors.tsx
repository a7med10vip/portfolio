import { Eye, Heart, BadgeCheck, MapPin, Clock, ChevronDown, Lock } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, shadow, space, palette } from "../tokens";
import { CoreShell, coreWrap } from "./_core/CoreShell";

/* P27 · من زار ملفي
 * (مطابق لسطر 672 في العرض: الجنس المعاكس فقط · آخر 90/180 يوم) */

const visitors = [
  { name: "نورة العتيبي", id: "#KH-1042", age: 27, city: "الرياض", tribe: "عتيبة", avatar: 1, time: "اليوم 11:22", new: true },
  { name: "سارة الغامدي", id: "#KH-1058", age: 25, city: "جدة", tribe: "غامد", avatar: 3, time: "اليوم 09:18", new: true },
  { name: "ريم القحطاني", id: "#KH-1071", age: 30, city: "الدمام", tribe: "قحطان", avatar: 1, time: "أمس 18:45", new: false, tag: "تقبل المسيار" },
  { name: "لطيفة الحربي", id: "#KH-1090", age: 29, city: "مكة", tribe: "حرب", avatar: 3, time: "أمس 14:05", new: false },
  { name: "أمل الشمري", id: "#KH-1103", age: 26, city: "الرياض", tribe: "شمر", avatar: 1, time: "قبل 3 أيام", new: false },
  { name: "هند الدوسري", id: "#KH-1126", age: 32, city: "الخبر", tribe: "غير قبلية", avatar: 3, time: "قبل 5 أيام", new: false, tag: "تقبل معدد بشرط" },
];

const avatars = ["/avatars/saudi-male.jpeg", "/khattaba/avatars/niqab-woman-brown.png", "/avatars/saudi-male-2.jpeg", "/khattaba/avatars/niqab-woman-blue.png"];

export default function P27ProfileVisitors() {
  return (
    <CoreShell active={null}>
      <div style={{ ...coreWrap, padding: `${space[8]}px 28px ${space[12]}px`, maxWidth: 1080 }}>
        {/* header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 22 }}>
          <div>
            <h1 style={{ fontFamily: fonts.heading, fontSize: 26, fontWeight: 700, color: colors.ink.black, margin: 0 }}>من زار ملفي</h1>
            <p style={{ fontFamily: fonts.body, fontSize: 13.5, color: colors.ink.muted, margin: "6px 0 0" }}>كل من اطّلع على بروفايلك مؤخراً. يمكنك زيارة ملفه أنت أيضاً.</p>
          </div>
          <div style={{ position: "relative" }}>
            <select style={{ height: 42, padding: "0 14px", paddingInlineEnd: 36, background: colors.surface.white, border: `1.5px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13.5, color: colors.ink.body, outline: "none", appearance: "none", cursor: "pointer", direction: "rtl" }}>
              <option>آخر 90 يوم</option>
              <option>آخر 180 يوم</option>
            </select>
            <ChevronDown size={15} style={{ position: "absolute", insetInlineEnd: 12, top: "50%", transform: "translateY(-50%)", color: colors.ink.muted, pointerEvents: "none" }} />
          </div>
        </div>

        {/* privacy note */}
        <div style={{ background: colors.brand.greenSoft, border: `1px solid ${colors.brand.green}30`, borderRadius: radius.md, padding: "12px 18px", display: "flex", gap: 10, marginBottom: 18 }}>
          <Lock size={16} color={colors.brand.green} style={{ flexShrink: 0, marginTop: 2 }} />
          <p style={{ fontFamily: fonts.body, fontSize: 12.5, lineHeight: 1.7, color: colors.ink.body, margin: 0 }}>
            يمكن لجميع الأعضاء — بل وزوّار التطبيق — الاطّلاع على تفاصيل الحسابات رجالاً ونساءً. أمّا <b>التقدّم بطلب الخطبة</b> فيتطلّب تسجيل الدخول كعضو؛ وإذا حاول زائر التقدّم تظهر له رسالة: «أنت لست عضواً بالمنصة — يجب تسجيل الدخول».
          </p>
        </div>

        {/* visitor stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 18 }}>
          <div style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 16, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: radius.md, background: colors.brand.greenSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Eye size={18} color={colors.brand.green} />
            </div>
            <div>
              <div style={{ fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.muted }}>إجمالي الزيارات</div>
              <div style={{ fontFamily: fonts.heading, fontSize: 22, fontWeight: 700, color: colors.ink.black }}>42</div>
            </div>
          </div>
          <div style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 16, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: radius.md, background: colors.accent.amberSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <BadgeCheck size={18} color={colors.accent.amber} />
            </div>
            <div>
              <div style={{ fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.muted }}>زوّار جدد اليوم</div>
              <div style={{ fontFamily: fonts.heading, fontSize: 22, fontWeight: 700, color: colors.ink.black }}>2</div>
            </div>
          </div>
          <div style={{ background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 16, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: radius.md, background: colors.accent.purpleSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Clock size={18} color={colors.accent.purple} />
            </div>
            <div>
              <div style={{ fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.muted }}>متوسط الزيارات/الأسبوع</div>
              <div style={{ fontFamily: fonts.heading, fontSize: 22, fontWeight: 700, color: colors.ink.black }}>8</div>
            </div>
          </div>
        </div>

        {/* visitors list */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {visitors.map((v) => (
            <div key={v.id} style={{ background: colors.surface.white, border: `1px solid ${v.new ? colors.brand.green : colors.border.soft}`, borderRadius: radius.lg, padding: 18, boxShadow: shadow.sm, position: "relative" }}>
              {v.new && (
                <span style={{ position: "absolute", top: 12, insetInlineStart: 12, padding: "3px 9px", background: colors.brand.green, color: "#fff", borderRadius: radius.full, fontFamily: fonts.body, fontSize: 10.5, fontWeight: 700 }}>جديد</span>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <img src={avatars[v.avatar]} alt={v.name} style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover" }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ fontFamily: fonts.heading, fontSize: 15, fontWeight: 700, color: colors.ink.black }}>{v.name}</span>
                    <BadgeCheck size={13} color={colors.brand.green} />
                  </div>
                  <div style={{ fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.muted, marginTop: 2 }}>{v.age} سنة · <span style={{ fontFamily: fonts.latin }}>{v.id}</span></div>
                </div>
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.muted, marginBottom: 4 }}><MapPin size={11} /> {v.city} · {v.tribe}</div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.muted, marginBottom: 12 }}><Clock size={11} /> زار ملفك · {v.time}</div>
              {v.tag && <div style={{ display: "inline-block", padding: "3px 9px", background: colors.brand.highlightSoft, color: colors.brand.greenDark, borderRadius: radius.xs, fontFamily: fonts.body, fontSize: 10.5, fontWeight: 700, marginBottom: 10, border: `1px solid ${colors.brand.highlight}` }}>{v.tag}</div>}
              <button style={{ width: "100%", height: 40, background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <Heart size={14} /> زيارة الملف
              </button>
            </div>
          ))}
        </div>
      </div>
    </CoreShell>
  );
}
