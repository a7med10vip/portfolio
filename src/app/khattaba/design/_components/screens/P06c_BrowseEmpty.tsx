import { SearchX } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, space } from "../tokens";
import { CoreShell, coreWrap } from "./_core/CoreShell";
import { SearchBar, FiltersSidebar } from "./_core/SearchParts";

/* P06c · البحث والتصفح — لا توجد نتائج */
export default function P06cBrowseEmpty() {
  return (
    <CoreShell active="browse">
      <div style={{ ...coreWrap, padding: `${space[8]}px 28px ${space[10]}px` }}>
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontFamily: fonts.heading, fontSize: 26, fontWeight: 700, color: colors.ink.black, margin: 0 }}>تصفّح</h1>
          <p style={{ fontFamily: fonts.body, fontSize: 13.5, color: colors.ink.muted, margin: "6px 0 0" }}>لا توجد نتائج مطابقة</p>
        </div>

        <div style={{ marginBottom: 22 }}><SearchBar /></div>

        <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
          <FiltersSidebar />
          <div style={{ flex: 1, background: colors.surface.white, border: `1px solid ${colors.border.soft}`, borderRadius: radius.lg, padding: "80px 40px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 16 }}>
            <div style={{ width: 96, height: 96, borderRadius: "50%", background: colors.surface.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <SearchX size={42} color={colors.ink.soft} />
            </div>
            <h2 style={{ fontFamily: fonts.heading, fontSize: 22, fontWeight: 700, color: colors.ink.black, margin: 0 }}>لا توجد نتائج مطابقة</h2>
            <p style={{ fontFamily: fonts.body, fontSize: 14.5, lineHeight: 1.8, color: colors.ink.muted, margin: 0, maxWidth: 360 }}>
              لم نجد أعضاء يطابقون الفلاتر الحالية. جرّب توسيع نطاق العمر أو المدينة أو إزالة بعض الفلاتر.
            </p>
            <button style={{ height: 46, padding: "0 28px", background: colors.brand.green, color: "#fff", border: "none", borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>مسح الفلاتر</button>
          </div>
        </div>
      </div>
    </CoreShell>
  );
}
