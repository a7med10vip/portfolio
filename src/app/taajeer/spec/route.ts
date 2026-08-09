import { NextResponse } from "next/server";
import { SLIDES } from "../deck";
import { H, W } from "../deck/tokens";

/**
 * The deck spec, as data. The .pptx build script reads this exact payload, so the
 * PowerPoint and the web page are generated from one source and cannot drift.
 */
export function GET() {
  return NextResponse.json({ w: W, h: H, slides: SLIDES });
}
