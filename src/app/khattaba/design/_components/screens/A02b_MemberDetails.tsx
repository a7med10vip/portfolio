import { BadgeCheck, Heart, Wallet, Clock, Ban, Trash2, Shield, Zap, Pencil, MapPin, GraduationCap, Briefcase, Globe, MessageCircle, Send } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, palette } from "../tokens";
import { AdminShell, card, StatusPill } from "./_admin/AdminShell";

/* A02b · إدارة الأعضاء — تفاصيل عضو + إجراءات */

const facts = [
  { icon: Heart, label: "الحالة الاجتماعية", value: "أعزب" },
  { icon: GraduationCap, label: "المؤهل", value: "بكالوريوس" },
  { icon: Briefcase, label: "الوظيفة", value: "مهندس" },
  { icon: MapPin, label: "المدينة · القبيلة", value: "جدة · حرب" },
  { icon: Globe, label: "الجنسية · العِرق", value: "سعودي · أسمر" },
  { icon: Shield, label: "مستوى التدين", value: "ملتزم" },
];

const stats = [
  { icon: Wallet, label: "رسوم الاشتراك", value: "1,500 ر.س", color: colors.brand.green },
  { icon: MessageCircle, label: "محادثات نشطة", value: "2", color: colors.accent.purple },
  { icon: Send, label: "طلبات مرسلة", value: "8", color: colors.accent.blue },
  { icon: Clock, label: "آخر دخول", value: "اليوم 11:22", color: colors.accent.amber },
];

const audit = [
  { who: "أحمد (Super Admin)", what: "قَبِل العضوية وحدّد الرسوم 1,500 ر.س", when: "12 يناير 10:42" },
  { who: "هاني (Moderator)", what: "أعاد ضبط آخر دخول", when: "3 مارس 09:18" },
  { who: "أحمد (Super Admin)", what: "حدّث صلاحية: عرض كامل لبيانات الاتصال", when: "15 مارس 14:00" },
];

function Tab({ label, count, active }: { label: string; count?: number; active?: boolean }) {
  return (
    <div style={{ padding: "14px 18px", fontFamily: fonts.body, fontSize: 13.5, fontWeight: active ? 700 : 500, color: active ? colors.brand.green : colors.ink.muted, borderBottom: `2px solid ${active ? colors.brand.green : "transparent"}`, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
      {label}{count !== undefined && <span style={{ fontFamily: fonts.latin, fontSize: 11, opacity: 0.8 }}>({count})</span>}
    </div>
  );
}

export default function A02bMemberDetails() {
  return (
    <AdminShell active="members" title="تفاصيل العضو" breadcrumb={["الأعضاء", "محمد الأحمدي"]}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 18 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* header */}
          <div style={{ ...card, padding: 22, display: "flex", gap: 18, alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              <img src="/avatars/saudi-male.jpeg" alt="محمد" style={{ width: 84, height: 84, borderRadius: "50%", objectFit: "cover" }} />
              <span style={{ position: "absolute", bottom: 0, insetInlineEnd: 0, width: 22, height: 22, borderRadius: "50%", background: colors.brand.green, display: "inline-flex", alignItems: "center", justifyContent: "center", border: `2px solid #fff` }}><BadgeCheck size={12} color="#fff" /></span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <h2 style={{ fontFamily: fonts.heading, fontSize: 22, fontWeight: 700, color: colors.ink.black, margin: 0 }}>محمد الأحمدي</h2>
                <StatusPill kind="success" label="نشط" />
                <span style={{ padding: "3px 10px", borderRadius: radius.full, background: colors.brand.highlightSoft, color: colors.brand.greenDark, fontFamily: fonts.body, fontSize: 11, fontWeight: 700, border: `1px solid ${colors.brand.highlight}` }}>زواج تقليدي</span>
              </div>
              <div style={{ fontFamily: fonts.body, fontSize: 13, color: colors.ink.muted, marginTop: 4 }}>
                <span style={{ fontFamily: fonts.latin, fontWeight: 700, color: colors.ink.body }}>#KH-2087</span> · انضم في 12 يناير 2026 · 32 سنة
              </div>
            </div>
          </div>

          {/* stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} style={{ ...card, padding: 16, display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: radius.md, background: `${s.color}14`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={18} color={s.color} />
                  </div>
                  <div>
                    <div style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted }}>{s.label}</div>
                    <div style={{ fontFamily: fonts.body, fontSize: 14.5, fontWeight: 700, color: colors.ink.black, marginTop: 2 }}>{s.value}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* tabs */}
          <div style={{ ...card, padding: 0, overflow: "hidden" }}>
            <div style={{ display: "flex", borderBottom: `1px solid ${colors.border.soft}`, padding: "0 12px" }}>
              <Tab label="نظرة عامة" active />
              <Tab label="بيانات الملف" />
              <Tab label="الاشتراك والمعاملات" count={3} />
              <Tab label="المحادثات" count={2} />
              <Tab label="سجل الإجراءات" count={3} />
            </div>
            <div style={{ padding: 22 }}>
              <h3 style={{ fontFamily: fonts.heading, fontSize: 15, fontWeight: 700, color: colors.ink.black, margin: "0 0 14px" }}>الحقائق الأساسية</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 24 }}>
                {facts.map((f) => {
                  const Icon = f.icon;
                  return (
                    <div key={f.label} style={{ display: "flex", gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: radius.md, background: colors.brand.greenSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon size={16} color={colors.brand.green} />
                      </div>
                      <div>
                        <div style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.muted }}>{f.label}</div>
                        <div style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 700, color: colors.ink.black, marginTop: 2 }}>{f.value}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <h3 style={{ fontFamily: fonts.heading, fontSize: 15, fontWeight: 700, color: colors.ink.black, margin: "0 0 12px" }}>سجل الإجراءات الإدارية</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {audit.map((a, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "12px 14px", background: colors.surface.page, border: `1px solid ${colors.border.soft}`, borderRadius: radius.md }}>
                    <div>
                      <div style={{ fontFamily: fonts.body, fontSize: 13, fontWeight: 700, color: colors.ink.black }}>{a.what}</div>
                      <div style={{ fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.muted, marginTop: 2 }}>{a.who}</div>
                    </div>
                    <span style={{ fontFamily: fonts.body, fontSize: 11.5, color: colors.ink.muted, whiteSpace: "nowrap" }}>{a.when}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* actions sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ ...card, padding: 18 }}>
            <h3 style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 700, color: colors.ink.black, margin: "0 0 12px" }}>إجراءات إدارية</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button style={{ height: 42, background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13.5, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}><Pencil size={15} /> تعديل البيانات</button>
              <button style={{ height: 42, background: colors.surface.white, color: colors.brand.green, border: `1.5px solid ${colors.brand.green}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13.5, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}><Zap size={15} /> تنشيط الحساب</button>
              <button style={{ height: 42, background: colors.surface.white, color: colors.ink.body, border: `1.5px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13.5, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}><Shield size={15} /> صلاحيات الأدمن</button>
              <button style={{ height: 42, background: colors.surface.white, color: colors.accent.red, border: `1.5px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13.5, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}><Ban size={15} /> حظر العضو</button>
              <button style={{ height: 42, background: colors.surface.white, color: colors.accent.red, border: `1.5px solid ${colors.accent.red}40`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13.5, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}><Trash2 size={15} /> حذف الحساب</button>
            </div>
          </div>
          <div style={{ background: palette.purple[800], borderRadius: radius.lg, padding: 18, color: "#fff" }}>
            <h3 style={{ fontFamily: fonts.heading, fontSize: 14, fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>ملاحظة</h3>
            <p style={{ fontFamily: fonts.body, fontSize: 12, lineHeight: 1.8, color: palette.purple[200], margin: 0 }}>
              التعديلات الحساسة تُسجَّل تلقائياً في سجل المراجعة. الإجراءات الحرجة (الحظر/الحذف) تستلزم تأكيداً ثانياً.
            </p>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
