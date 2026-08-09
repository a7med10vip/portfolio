import { PauseCircle, RefreshCw, Headset, Heart, BadgeCheck, MapPin, Clock, Eye, ChevronDown, Lock, Wand2, Cpu, Search } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, palette } from "../tokens";
import { MobileScreen } from "./_mobile/MobileShell";
import { MobileHeader, MobileTabs } from "./_mobile/MobileApp";
import { DotPattern } from "./_marketing/deco";

const avatars = ["/avatars/saudi-male.jpeg", "/khattaba/avatars/niqab-woman-brown.png", "/avatars/saudi-male-2.jpeg", "/khattaba/avatars/niqab-woman-blue.png"];

/* MP24 · تجميد الحساب (موبايل) */
export function MP24FrozenMobile() {
  return (
    <MobileScreen padTop={50}>
      <MobileHeader title="حالة الحساب" />
      <div style={{ flex: 1, padding: "16px 18px 18px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ background: palette.purple[800], borderRadius: radius["2xl"], padding: 22, position: "relative", overflow: "hidden", color: "#fff", textAlign: "center", marginBottom: 14 }}>
          <DotPattern id="kh-mp24-dots" color="#FFFFFF" opacity={0.06} gap={22} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: colors.accent.amber, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
              <PauseCircle size={36} color="#fff" />
            </div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 12px", background: colors.accent.amber, color: "#fff", borderRadius: radius.full, fontFamily: fonts.body, fontSize: 11, fontWeight: 700, marginBottom: 10 }}>تجميد تلقائي</span>
            <h1 style={{ fontFamily: fonts.heading, fontSize: 19, fontWeight: 700, color: "#fff", margin: "0 0 6px" }}>تم تجميد حسابك مؤقتاً</h1>
            <p style={{ fontFamily: fonts.body, fontSize: 11.5, color: palette.purple[200], margin: 0, lineHeight: 1.7 }}>لم نلاحظ تفاعلاً مع طلبات الخطبة · تم إخفاء بروفايلك تلقائياً.</p>
          </div>
        </div>
        <div style={{ background: "#fff", border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 14, display: "flex", flexDirection: "column", gap: 10, marginBottom: 12 }}>
          {[
            { icon: Heart, t: "تم تجاهل 3 طلبات تواصل خلال الأسابيع الأخيرة" },
            { icon: Clock, t: "آخر تفاعل: قبل 14 يوماً" },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: colors.accent.amberSoft, display: "flex", alignItems: "center", justifyContent: "center" }}><r.icon size={14} color={colors.accent.amber} /></div>
              <span style={{ fontFamily: fonts.body, fontSize: 12, color: colors.ink.body, lineHeight: 1.6 }}>{r.t}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
          <button style={{ height: 48, background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7 }}><RefreshCw size={15} /> طلب رفع التجميد</button>
          <button style={{ height: 44, background: "#fff", color: colors.ink.body, border: `1.5px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 13, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}><Headset size={15} /> تواصل مع الدعم</button>
        </div>
      </div>
    </MobileScreen>
  );
}

/* MP27 · من زار ملفي (موبايل) */
const visitors = [
  { name: "نورة العتيبي", id: "#KH-1042", age: 27, city: "الرياض", tribe: "عتيبة", avatar: 1, time: "اليوم 11:22", new: true },
  { name: "سارة الغامدي", id: "#KH-1058", age: 25, city: "جدة", tribe: "غامد", avatar: 3, time: "اليوم 09:18", new: true },
  { name: "ريم القحطاني", id: "#KH-1071", age: 30, city: "الدمام", tribe: "قحطان", avatar: 1, time: "أمس", new: false, tag: "تقبل المسيار" },
  { name: "لطيفة الحربي", id: "#KH-1090", age: 29, city: "مكة", tribe: "حرب", avatar: 3, time: "أمس", new: false },
  { name: "أمل الشمري", id: "#KH-1103", age: 26, city: "الرياض", tribe: "شمر", avatar: 1, time: "قبل 3 أيام", new: false },
];
export function MP27VisitorsMobile() {
  return (
    <MobileScreen padTop={50}>
      <MobileHeader back title="من زار ملفي" right={<div style={{ position: "relative" }}><select style={{ height: 32, padding: "0 28px 0 12px", background: colors.surface.page, border: `1px solid ${colors.border.default}`, borderRadius: radius.full, fontFamily: fonts.body, fontSize: 11.5, fontWeight: 700, color: colors.ink.body, appearance: "none", direction: "rtl" }}><option>٩٠ يوم</option><option>١٨٠ يوم</option></select><ChevronDown size={12} style={{ position: "absolute", insetInlineEnd: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: colors.ink.muted }} /></div>} />
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ background: colors.brand.greenSoft, padding: "10px 16px", display: "flex", gap: 8, alignItems: "center" }}>
          <Lock size={14} color={colors.brand.green} />
          <span style={{ fontFamily: fonts.body, fontSize: 11, color: colors.ink.body, lineHeight: 1.6 }}>الجنس المعاكس فقط — وفق ضوابط المنصة</span>
        </div>
        <div style={{ display: "flex", gap: 8, padding: "12px 16px", overflow: "hidden" }}>
          <div style={{ flex: 1, background: "#fff", border: `1px solid ${colors.border.soft}`, borderRadius: radius.md, padding: "10px 12px" }}>
            <div style={{ fontFamily: fonts.body, fontSize: 10, color: colors.ink.muted }}>إجمالي</div>
            <div style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 700, color: colors.ink.black }}>42</div>
          </div>
          <div style={{ flex: 1, background: "#fff", border: `1px solid ${colors.border.soft}`, borderRadius: radius.md, padding: "10px 12px" }}>
            <div style={{ fontFamily: fonts.body, fontSize: 10, color: colors.ink.muted }}>جدد اليوم</div>
            <div style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 700, color: colors.brand.green }}>2</div>
          </div>
          <div style={{ flex: 1, background: "#fff", border: `1px solid ${colors.border.soft}`, borderRadius: radius.md, padding: "10px 12px" }}>
            <div style={{ fontFamily: fonts.body, fontSize: 10, color: colors.ink.muted }}>أسبوعياً</div>
            <div style={{ fontFamily: fonts.heading, fontSize: 18, fontWeight: 700, color: colors.ink.black }}>8</div>
          </div>
        </div>
        <div style={{ flex: 1, padding: "0 16px 12px", display: "flex", flexDirection: "column", gap: 8, overflow: "hidden" }}>
          {visitors.map((v) => (
            <div key={v.id} style={{ background: "#fff", border: `1px solid ${v.new ? colors.brand.green : colors.border.soft}`, borderRadius: radius.lg, padding: 12, display: "flex", alignItems: "center", gap: 10 }}>
              <img src={avatars[v.avatar]} alt={v.name} style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover" }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ fontFamily: fonts.heading, fontSize: 13, fontWeight: 700, color: colors.ink.black }}>{v.name} · {v.age}</span>
                  <BadgeCheck size={11} color={colors.brand.green} />
                </div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: fonts.body, fontSize: 10.5, color: colors.ink.muted, marginTop: 2 }}><MapPin size={9} /> {v.city} · {v.tribe}</div>
                <div style={{ fontFamily: fonts.body, fontSize: 10, color: colors.ink.muted, marginTop: 2 }}>{v.time}</div>
              </div>
              {v.new && <span style={{ padding: "2px 7px", background: colors.brand.green, color: "#fff", borderRadius: 5, fontFamily: fonts.body, fontSize: 9.5, fontWeight: 700 }}>جديد</span>}
              <button style={{ width: 36, height: 36, background: colors.brand.green, color: "#fff", border: "none", borderRadius: 8, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Heart size={14} /></button>
            </div>
          ))}
        </div>
      </div>
      <MobileTabs active={null} />
    </MobileScreen>
  );
}

/* MP28 · البحث الآلي نيابة عني (موبايل) */
const flow = [
  { icon: Cpu, title: "تحليل مواصفاتك" },
  { icon: Search, title: "مطابقة قاعدة البيانات" },
  { icon: Wand2, title: "ترشيح الأنسب" },
];
export function MP28AutoSearchMobile() {
  return (
    <MobileScreen padTop={50}>
      <MobileHeader back title="البحث الآلي" />
      <div style={{ flex: 1, padding: "16px 18px 18px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <div style={{ background: "#2A1322", borderRadius: radius["2xl"], padding: 22, position: "relative", overflow: "hidden", color: "#fff", textAlign: "center", marginBottom: 14 }}>
          <DotPattern id="kh-mp28-dots" color="#FFFFFF" opacity={0.06} gap={22} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <img src="/khattaba/ai-search.png" alt="بحث ذكي يطابق المواصفات ويرشّح الأنسب" style={{ width: "100%", maxWidth: 180, height: "auto", display: "block", margin: "0 auto 10px" }} />
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 12px", background: "rgba(251,192,226,0.12)", border: `1px solid ${colors.brand.highlight}`, borderRadius: radius.full, fontFamily: fonts.body, fontSize: 11, fontWeight: 700, color: colors.brand.highlight, marginBottom: 10 }}><Wand2 size={11} /> ميزة ذكية</span>
            <h1 style={{ fontFamily: fonts.heading, fontSize: 20, fontWeight: 700, color: "#fff", margin: "0 0 6px" }}>اطلب البحث نيابة عنك</h1>
            <p style={{ fontFamily: fonts.body, fontSize: 11.5, color: palette.purple[200], margin: 0, lineHeight: 1.7 }}>المنصة تحلّل مواصفاتك وترشّح لك الأنسب · رسوم تحددها الإدارة.</p>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
          {flow.map((f, i) => (
            <div key={i} style={{ background: "#fff", border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 12, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: colors.brand.greenSoft, display: "flex", alignItems: "center", justifyContent: "center" }}><f.icon size={16} color={colors.brand.green} /></div>
              <span style={{ flex: 1, fontFamily: fonts.body, fontSize: 13, fontWeight: 700, color: colors.ink.black }}>{f.title}</span>
              <span style={{ fontFamily: fonts.latin, fontSize: 11, fontWeight: 700, color: colors.ink.soft }}>{String(i + 1).padStart(2, "0")}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "10px 18px 22px", background: "#fff", borderTop: `1px solid ${colors.border.soft}` }}>
        <button style={{ width: "100%", height: 50, background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7 }}><Wand2 size={16} /> طلب البحث نيابة عني</button>
      </div>
    </MobileScreen>
  );
}
