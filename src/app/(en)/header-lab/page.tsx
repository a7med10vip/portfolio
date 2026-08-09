import type { Metadata } from "next";
import {
  HeaderBrandMark,
  HeaderEyeCta,
  HeaderInverted,
  HeaderMorphDock,
  HeaderSplitPods,
} from "@/components/ui/HeaderVariants";

export const metadata: Metadata = {
  title: "Header lab",
  robots: { index: false, follow: false },
};

const VARIANTS = [
  {
    n: 1,
    name: "Split Pods",
    note: "Three floating capsules instead of one bar — the hero's block logic, applied to the nav.",
    node: <HeaderSplitPods active="Projects" />,
  },
  {
    n: 2,
    name: "Eye CTA",
    note: "Today's bar, but the CTA becomes the hero's gradient pill with the eye badge biting its end.",
    node: <HeaderEyeCta active="Projects" />,
  },
  {
    n: 3,
    name: "Inverted Bar",
    note: "The whole bar takes the pill gradient. Highest contrast against the light hero.",
    node: <HeaderInverted active="Projects" />,
  },
  {
    n: 4,
    name: "Morph Dock — at rest",
    note: "Full width and transparent at the top of the page. Active link carries a teal dot.",
    node: <HeaderMorphDock active="Projects" forceScrolled={false} />,
  },
  {
    n: 4.5,
    name: "Morph Dock — after scroll",
    note: "Same header, collapsed into a capsule once you scroll past 50px.",
    node: <HeaderMorphDock active="Projects" forceScrolled />,
  },
  {
    n: 5,
    name: "Brand Mark + Status",
    note: "Real logo mark (eye in a gradient disc) plus a live 'Open to work' chip in the header itself.",
    node: <HeaderBrandMark active="Projects" />,
  },
];

export default function HeaderLab() {
  return (
    <main style={{ background: "#fff", minHeight: "100vh", padding: "56px 0 120px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px 40px" }}>
        <h1 className="heading" style={{ fontSize: 30, color: "#04323A" }}>
          Header lab
        </h1>
        <p style={{ color: "rgba(0,0,0,0.55)", fontSize: 14, marginTop: 6 }}>
          Five candidates on the hero&apos;s background. Pick a number.
        </p>
      </div>

      {VARIANTS.map((v) => (
        <section key={v.name} style={{ padding: "0 24px", marginBottom: 46 }}>
          <div style={{ maxWidth: 1240, margin: "0 auto 12px" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                fontWeight: 700,
                color: "#04323A",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: "#CFF7EE",
                  fontSize: 11,
                }}
              >
                {v.n}
              </span>
              {v.name}
            </span>
            <span style={{ color: "rgba(0,0,0,0.5)", fontSize: 13, marginLeft: 10 }}>{v.note}</span>
          </div>

          {/* the light, faintly-tinted field the real header sits on */}
          <div
            data-variant={v.n}
            style={{
              maxWidth: 1240,
              margin: "0 auto",
              borderRadius: 28,
              border: "1px solid rgba(0,0,0,0.06)",
              background:
                "radial-gradient(120% 120% at 12% 0%, #F2FBF8 0%, #FFFFFF 55%), linear-gradient(180deg,#FFFFFF,#FAFEFD)",
              padding: "28px 20px 44px",
              display: "flex",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {v.node}
          </div>
        </section>
      ))}
    </main>
  );
}
