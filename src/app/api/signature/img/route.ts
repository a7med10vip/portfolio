/* One slice of a signature card, rendered on demand.

   The person is encoded in the query string, so the same details always
   address the same image. That keeps the response immutable and CDN-cacheable,
   and means a card needs no storage behind it — the URL is the card. */

import { NextRequest } from "next/server";

import { SLICES, type Slice, decodePerson } from "@/lib/signature/card";
import { renderSlice, unsupportedCharacters } from "@/lib/signature/render";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const token = params.get("d");
  const slice = params.get("s") as Slice | null;

  if (!slice || !SLICES.includes(slice)) {
    return new Response("unknown slice", { status: 400 });
  }

  const person = decodePerson(token);
  if (!person) {
    return new Response("bad or missing card details", { status: 400 });
  }

  try {
    const missing = await unsupportedCharacters(person);
    if (missing.length) {
      return new Response(
        `the signature font has no glyph for: ${missing.join(" ")}`,
        { status: 422 }
      );
    }

    const png = await renderSlice(token!, person, slice);
    return new Response(new Uint8Array(png), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    console.error("signature render failed:", err);
    return new Response("could not render this card", { status: 500 });
  }
}
