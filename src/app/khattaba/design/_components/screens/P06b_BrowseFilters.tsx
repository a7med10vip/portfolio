import { colors, fonts, space } from "../tokens";
import { CoreShell, coreWrap } from "./_core/CoreShell";
import { SearchBar, ResultsGrid, FiltersSidebar } from "./_core/SearchParts";

/* P06b · البحث والتصفح — الفلاتر مفتوحة */
export default function P06bBrowseFilters() {
  return (
    <CoreShell active="browse">
      <div style={{ ...coreWrap, padding: `${space[8]}px 28px ${space[10]}px` }}>
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontFamily: fonts.heading, fontSize: 26, fontWeight: 700, color: colors.ink.black, margin: 0 }}>تصفّح</h1>
          <p style={{ fontFamily: fonts.body, fontSize: 13.5, color: colors.ink.muted, margin: "6px 0 0" }}>٤٨ نتيجة مطابقة للفلاتر المحددة</p>
        </div>

        <div style={{ marginBottom: 22 }}><SearchBar /></div>

        <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
          <FiltersSidebar />
          <ResultsGrid cols={3} count={6} />
        </div>
      </div>
    </CoreShell>
  );
}
