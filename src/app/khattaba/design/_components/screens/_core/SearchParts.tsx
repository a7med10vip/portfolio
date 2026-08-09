import { ChevronDown, SlidersHorizontal, Search as SearchIcon } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius } from "../../tokens";
import { ProfileCard, type Profile } from "./CoreShell";

/* Search building blocks — filters match the proposal: الجنسية، المدينة، العمر، القبيلة، الحالة، المؤهل. */

export const sampleProfiles: Profile[] = [
  { id: "#KH-1042", name: "نورة", age: 27, city: "الرياض", tribe: "عتيبة", marital: "عزباء", education: "بكالوريوس", job: "معلمة", religiosity: "محافظة", desc: "أبحث عن شريك حياة ملتزم من عائلة كريمة، يقدّر الاستقرار والاحترام المتبادل.", avatarIndex: 1, online: true, state: "engaged" },
  { id: "#KH-1058", name: "سارة", age: 25, city: "جدة", tribe: "غير قبلية", marital: "عزباء", education: "ماجستير", job: "صيدلانية", religiosity: "وسطية", desc: "هادئة الطباع، أحب الحياة العائلية وأطمح لبناء أسرة متفاهمة.", avatarIndex: 3, online: false },
  { id: "#KH-1071", name: "ريم", age: 30, city: "الدمام", tribe: "قحطان", marital: "مطلّقة", education: "ثانوي", job: "غير موظفة", religiosity: "ملتزمة", desc: "أبحث عن رجل جاد يتحمل المسؤولية ويقدّر معنى الأسرة.", avatarIndex: 1, online: true, tag: "تقبل المسيار" },
  { id: "#KH-1090", name: "لطيفة", age: 29, city: "مكة", tribe: "حرب", marital: "عزباء", education: "بكالوريوس", job: "محاسبة", religiosity: "محافظة", desc: "طموحة وأقدّر الصدق والوضوح في التعامل.", avatarIndex: 3, online: false },
  { id: "#KH-1103", name: "أمل", age: 26, city: "الرياض", tribe: "شمر", marital: "عزباء", education: "دبلوم", job: "مصممة", religiosity: "وسطية", desc: "أحب البساطة والاستقرار، وأبحث عن شريك متفاهم.", avatarIndex: 1, online: true },
  { id: "#KH-1126", name: "هند", age: 32, city: "الخبر", tribe: "غير قبلية", marital: "أرملة", education: "بكالوريوس", job: "ممرضة", religiosity: "محافظة", desc: "أمّ لطفلة، أبحث عن رجل صالح يحتوي ويتفهّم ظروفي.", avatarIndex: 3, online: false, tag: "تقبل معدد بشرط" },
  { id: "#KH-1149", name: "الجوهرة", age: 28, city: "الرياض", tribe: "الدواسر", marital: "عزباء", education: "ماجستير", job: "طبيبة أسنان", religiosity: "ملتزمة", desc: "أقدّر العلم والالتزام، وأبحث عن شريك على نفس القيم.", avatarIndex: 1, online: true, state: "married" },
  { id: "#KH-1162", name: "شهد", age: 24, city: "جدة", tribe: "غامد", marital: "عزباء", education: "بكالوريوس", job: "مهندسة", religiosity: "وسطية", desc: "أحب العمل والتطوّر، وأطمح لشراكة متوازنة ومحترمة.", avatarIndex: 3, online: false },
];

const selectStyle: React.CSSProperties = {
  height: 44,
  padding: "0 14px",
  width: "100%",
  appearance: "none",
  background: colors.surface.white,
  border: `1.5px solid ${colors.border.default}`,
  borderRadius: radius.md,
  fontFamily: fonts.body,
  fontSize: 13.5,
  color: colors.ink.body,
  cursor: "pointer",
  direction: "rtl",
};

function FilterSelect({ label, options }: { label: string; options: string[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontFamily: fonts.body, fontSize: 12.5, fontWeight: 600, color: colors.ink.body }}>{label}</label>
      <div style={{ position: "relative" }}>
        <select style={selectStyle}>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <ChevronDown size={15} style={{ position: "absolute", insetInlineEnd: 12, top: "50%", transform: "translateY(-50%)", color: colors.ink.muted, pointerEvents: "none" }} />
      </div>
    </div>
  );
}

export function FiltersSidebar() {
  return (
    <aside style={{ width: 280, flexShrink: 0, background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: 22, alignSelf: "flex-start" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
        <SlidersHorizontal size={18} color={colors.brand.green} />
        <h3 style={{ fontFamily: fonts.heading, fontSize: 16, fontWeight: 700, color: colors.ink.black, margin: 0 }}>الفلاتر</h3>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <FilterSelect label="الجنسية" options={["الكل", "سعودية", "خليجية", "عربية"]} />
        <FilterSelect label="المدينة" options={["الكل", "الرياض", "جدة", "الدمام", "مكة", "الخبر"]} />
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontFamily: fonts.body, fontSize: 12.5, fontWeight: 600, color: colors.ink.body }}>العمر</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div style={{ position: "relative" }}>
              <select style={selectStyle}><option>من ٢٢</option><option>من ٢٥</option></select>
              <ChevronDown size={15} style={{ position: "absolute", insetInlineEnd: 12, top: "50%", transform: "translateY(-50%)", color: colors.ink.muted, pointerEvents: "none" }} />
            </div>
            <div style={{ position: "relative" }}>
              <select style={selectStyle}><option>إلى ٣٥</option><option>إلى ٤٠</option></select>
              <ChevronDown size={15} style={{ position: "absolute", insetInlineEnd: 12, top: "50%", transform: "translateY(-50%)", color: colors.ink.muted, pointerEvents: "none" }} />
            </div>
          </div>
        </div>
        <FilterSelect label="القبيلة" options={["الكل", "قبلية", "غير قبلية", "عتيبة", "قحطان", "حرب", "شمر", "غامد", "الدواسر"]} />
        <FilterSelect label="الحالة الاجتماعية" options={["الكل", "عزباء", "مطلّقة", "أرملة"]} />
        <FilterSelect label="المؤهل" options={["الكل", "ثانوي", "دبلوم", "بكالوريوس", "ماجستير", "دكتوراه"]} />
        <FilterSelect label="نوع الزواج" options={["الكل", "زواج تقليدي معلن", "زواج المسيار (بشروط خاصة)", "معدّد / معدّد بشرط", "زواج معلن من طرفي فقط"]} />

        <button style={{ height: 46, background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14, fontWeight: 700, cursor: "pointer", marginTop: 4 }}>تطبيق الفلاتر</button>
        <button style={{ height: 42, background: "transparent", color: colors.ink.muted, border: "none", fontFamily: fonts.body, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>مسح الكل</button>
      </div>
    </aside>
  );
}

export function SearchBar() {
  return (
    <div style={{ position: "relative", flex: 1 }}>
      <SearchIcon size={17} style={{ position: "absolute", insetInlineStart: 14, top: "50%", transform: "translateY(-50%)", color: colors.ink.muted }} />
      <input style={{ width: "100%", height: 46, paddingInlineStart: 42, paddingInlineEnd: 16, background: colors.surface.white, border: `1.5px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14, color: colors.ink.body, outline: "none", direction: "rtl" }} placeholder="ابحث بالاسم أو رقم العضوية..." />
    </div>
  );
}

export function ResultsGrid({ cols = 4, count = 8 }: { cols?: number; count?: number }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 18, flex: 1, alignContent: "start" }}>
      {sampleProfiles.slice(0, count).map((p) => (
        <ProfileCard key={p.id} p={p} />
      ))}
    </div>
  );
}
