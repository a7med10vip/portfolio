"use client";

/**
 * Every slide, at true 1920×1080, no viewer chrome.
 * Used for design review screenshots and for diffing the web deck against the
 * exported .pptx. Not linked from anywhere.
 */

import SlideView from "../Slide";
import { SLIDES } from "../deck";

export default function TaajeerExport() {
  return (
    <div style={{ background: "#fff" }}>
      {SLIDES.map((s, k) => (
        <div key={s.id} id={`slide-${k + 1}`} data-slide={s.id} style={{ position: "relative" }}>
          <SlideView slide={s} scale={1} />
        </div>
      ))}
    </div>
  );
}
