import { SlidersHorizontal } from "@/app/khattaba/design/_components/icons";
import { colors, fonts, radius, space } from "../tokens";
import { CoreShell, coreWrap } from "./_core/CoreShell";
import { SearchBar, ResultsGrid } from "./_core/SearchParts";

/* P06a · البحث والتصفح — العرض الافتراضي */
export default function P06aBrowseDefault() {
  return (
    <CoreShell active="browse">
      <div style={{ ...coreWrap, padding: `${space[8]}px 28px ${space[10]}px` }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <h1 style={{ fontFamily: fonts.heading, fontSize: 26, fontWeight: 700, color: colors.ink.black, margin: 0 }}>تصفّح</h1>
            <p style={{ fontFamily: fonts.body, fontSize: 13.5, color: colors.ink.muted, margin: "6px 0 0" }}>١٢٤ عضوة متاحة وفق تفضيلاتك</p>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: 22 }}>
          <SearchBar />
          <button style={{ height: 46, padding: "0 20px", background: colors.surface.white, color: colors.ink.body, border: `1.5px solid ${colors.border.default}`, borderRadius: radius.md, fontFamily: fonts.body, fontSize: 14, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <SlidersHorizontal size={16} /> فلاتر
          </button>
        </div>

        <ResultsGrid cols={4} count={8} />
      </div>
    </CoreShell>
  );
}
