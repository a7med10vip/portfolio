/* One slice of a signature card, addressed entirely by path:

     /api/signature/img/<version>/<slice>/<token>.png

   Deliberately no query string. Pasted into a mail client, a `src` containing
   "&amp;" gets re-encoded by the sanitiser — the parameter arrives as "amp;d",
   the card details go missing, and every image in the signature breaks. A path
   has nothing for an HTML sanitiser to mangle, and ending in .png keeps it
   looking like an ordinary image to anything that inspects the URL. */

import { NextRequest } from "next/server";

import { decodePerson } from "@/lib/signature/card";
import { renderSlice, unsupportedCharacters } from "@/lib/signature/render";

export const runtime = "nodejs";

export async function GET(_req: NextRequest, ctx: { params: Promise<{ parts: string[] }> }) {
  /* The leading segment is the artwork version. It is not looked up — a card is
     always drawn from the current plate — it only keeps the URL changing when
     the artwork does, so nobody is served a cached copy of the old one. Paths
     without it still work, for signatures pasted before it existed. */
  const { parts } = await ctx.params;
  const [slice, file] = parts.length === 3 ? parts.slice(1) : parts;
  if (!slice || !file) {
    return new Response("expected /api/signature/img/<version>/<slice>/<token>.png", {
      status: 400,
    });
  }
  const token = file.replace(/\.png$/, "");

  const decoded = decodePerson(token);
  if (!decoded) {
    return new Response("bad or missing card details", { status: 400 });
  }
  const { person, brand } = decoded;

  if (!brand.slices.some((s) => s.key === slice)) {
    return new Response("unknown slice", { status: 400 });
  }

  try {
    const missing = await unsupportedCharacters(brand, person);
    if (missing.length) {
      return new Response(`the signature font has no glyph for: ${missing.join(" ")}`, {
        status: 422,
      });
    }

    const png = await renderSlice(token, brand, person, slice);
    return new Response(new Uint8Array(png), {
      headers: {
        "Content-Type": "image/png",
        "Content-Length": String(png.length),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    console.error("signature render failed:", err);
    return new Response("could not render this card", { status: 500 });
  }
}
