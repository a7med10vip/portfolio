#!/usr/bin/env python3
"""Generate Emotion Group email signatures — one card per person.

Reads users.json, paints each person's name, title, phone and email onto the
shared plate at the exact positions the source artwork used, then cuts each card
into slices so the phone / email / website lines stay clickable, and writes the
HTML to paste into Gmail or Outlook.

    python3 scripts/signature/make-signatures.py            # everyone
    python3 scripts/signature/make-signatures.py ahmed-ali  # just these slugs
    python3 scripts/signature/make-signatures.py --check    # verify against source art

Output lands in public/signature/<slug>/. Needs Pillow only — the plate and the
fonts are committed alongside this script.
"""

import json
import re
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).parent
ROOT = HERE.parent.parent
PLATE = HERE / "plate.png"
USERS = HERE / "users.json"
OUT_ROOT = ROOT / "public" / "signature"

# Where the images will be served from. Change this one line if the assets move
# to an Emotion-owned host.
BASE_URL = "https://www.ahmedali.online/signature"

SCALE = 4        # the plate is 4x the 600x200pt artwork
SUPERSAMPLE = 4  # extra sampling while rasterising text, for exact advances
RETINA = 2       # cards ship at 2x
CORNER_RADIUS = 14
INK = (248, 249, 252)  # 0.973 0.976 0.988 in the source

FONTS = {
    "bold": HERE / "fonts" / "Poppins-Bold.ttf",
    "medium": HERE / "fonts" / "Poppins-Medium.ttf",
}

# Every position below is lifted straight from the source PDF's text operators,
# converted to a top-left origin. right_limit is where a line must stop; longer
# text is scaled down to fit rather than running into the wave art.
LINES = {
    "name":  {"font": "bold",   "size": 48, "x": 246.6772, "baseline": 69.9746, "right_limit": 580},
    "title": {"font": "medium", "size": 12, "x": 246.6777, "baseline": 91.3770, "right_limit": 585},
    "phone": {"font": "medium", "size": 8,  "x": 259.6628, "baseline": 115.915, "right_limit": 585},
    "email": {"font": "medium", "size": 8,  "x": 261.4308, "baseline": 131.955, "right_limit": 585},
}

# Card geometry: the vertical cut sits between the divider and the text column,
# the horizontal cuts bracket each contact line.
SPLIT_X = 232
ROWS = [0, 103, 122, 138, 156, 200]

_width_cache = {}


def advances(font_key):
    """Advance widths (/1000 em) straight from the font's own metrics."""
    if font_key not in _width_cache:
        from fontTools.ttLib import TTFont

        ttf = TTFont(FONTS[font_key])
        upm = ttf["head"].unitsPerEm
        cmap, hmtx = ttf.getBestCmap(), ttf["hmtx"]
        _width_cache[font_key] = {
            chr(code): hmtx[name][0] * 1000.0 / upm for code, name in cmap.items()
        }
    return _width_cache[font_key]


def text_width(text, font_key, size):
    table = advances(font_key)
    missing = {c for c in text if c not in table}
    if missing:
        raise SystemExit(f"font {font_key} has no glyph for: {sorted(missing)!r}")
    return sum(table[c] for c in text) / 1000.0 * size


def draw_line(mask_draw, text, spec):
    """Rasterise one line onto the shared mask, shrinking it if it would overrun."""
    size = spec["size"]
    available = spec["right_limit"] - spec["x"]
    width = text_width(text, spec["font"], size)
    if width > available:
        size *= available / width
        width = available

    px = SCALE * SUPERSAMPLE
    font = ImageFont.truetype(str(FONTS[spec["font"]]), round(size * px), index=0)
    table = advances(spec["font"])
    pen = spec["x"]
    for ch in text:
        mask_draw.text((pen * px, spec["baseline"] * px), ch, font=font, fill=255, anchor="ls")
        pen += table[ch] / 1000.0 * size
    return size, width


def render_card(person):
    """Paint one person's lines onto the plate and return the 2x artwork."""
    plate = Image.open(PLATE).convert("RGB")
    mask = Image.new("L", (plate.width * SUPERSAMPLE, plate.height * SUPERSAMPLE), 0)
    draw = ImageDraw.Draw(mask)

    fitted = {}
    for key, spec in LINES.items():
        text = person["name"].upper() if key == "name" else person[key]
        size, _ = draw_line(draw, text, spec)
        if round(size, 2) != spec["size"]:
            fitted[key] = round(size, 2)

    plate.paste(Image.new("RGB", plate.size, INK), (0, 0), mask.resize(plate.size, Image.LANCZOS))
    art = plate.resize((600 * RETINA, 200 * RETINA), Image.LANCZOS)
    return art, fitted


def round_corners(art):
    """Cut the corner radius into the alpha — Outlook ignores CSS border-radius."""
    big = Image.new("L", (art.width * SUPERSAMPLE, art.height * SUPERSAMPLE), 0)
    ImageDraw.Draw(big).rounded_rectangle(
        [0, 0, art.width * SUPERSAMPLE - 1, art.height * SUPERSAMPLE - 1],
        radius=CORNER_RADIUS * RETINA * SUPERSAMPLE,
        fill=255,
    )
    out = art.convert("RGBA")
    out.putalpha(big.resize(art.size, Image.LANCZOS))
    return out


def slice_card(art, out_dir):
    out_dir.mkdir(parents=True, exist_ok=True)
    art.crop((0, 0, SPLIT_X * RETINA, 200 * RETINA)).save(out_dir / "left.png")
    for i in range(len(ROWS) - 1):
        art.crop((SPLIT_X * RETINA, ROWS[i] * RETINA, 600 * RETINA, ROWS[i + 1] * RETINA)).save(
            out_dir / f"r{i + 1}.png"
        )


def esc(text):
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")


def build_html(person, slug):
    url = f"{BASE_URL}/{slug}"
    site = person.get("website", "https://emotiongrp.com")
    tel = "tel:" + re.sub(r"[^\d+]", "", person["phone"])
    right = 600 - SPLIT_X

    def img(name, w, h, alt, href=None):
        tag = (
            f'<img src="{url}/{name}.png" width="{w}" height="{h}" alt="{esc(alt)}"\n'
            f'                   style="display:block;border:0;outline:none;width:{w}px;height:{h}px;" />'
        )
        if not href:
            return f"            {tag}"
        return (
            f'            <a href="{href}" target="_blank" style="text-decoration:none;border:0;outline:none;">\n'
            f"  {tag}\n            </a>"
        )

    rows = [
        img("r1", right, ROWS[1] - ROWS[0], f'{person["name"]} — {person["title"]}', site),
        img("r2", right, ROWS[2] - ROWS[1], person["phone"], tel),
        img("r3", right, ROWS[3] - ROWS[2], person["email"], "mailto:" + person["email"]),
        img("r4", right, ROWS[4] - ROWS[3], "emotiongrp.com", site),
        img("r5", right, ROWS[5] - ROWS[4], ""),
    ]
    cells = "\n".join(
        f'        <tr>\n          <td style="padding:0;font-size:0;line-height:0;border:0;">\n{row}\n          </td>\n        </tr>'
        for row in rows
    )

    return f"""<!--
  Emotion Group email signature — {person["name"]}
  Generated by scripts/signature/make-signatures.py from the source artwork.
  Sliced so the phone / email / website lines stay clickable; the corner radius
  is baked into the image alpha, since Outlook ignores CSS border-radius.
  Copy everything between the START / END markers into your mail client.
-->
<!-- ===== SIGNATURE START ===== -->
<table cellpadding="0" cellspacing="0" border="0" role="presentation" width="600" style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;width:600px;max-width:600px;background-color:transparent;">
  <tr>
    <td width="{SPLIT_X}" valign="top" style="padding:0;font-size:0;line-height:0;border:0;">
      <a href="{site}" target="_blank" style="text-decoration:none;border:0;outline:none;">
        <img src="{url}/left.png" width="{SPLIT_X}" height="200"
             alt="emotion Group — Let Your Brand Talk — Jeddah.Beirut.Riyadh.Egypt"
             style="display:block;border:0;outline:none;width:{SPLIT_X}px;height:200px;" />
      </a>
    </td>
    <td width="{right}" valign="top" style="padding:0;font-size:0;line-height:0;border:0;">
      <table cellpadding="0" cellspacing="0" border="0" role="presentation" width="{right}" style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;width:{right}px;">
{cells}
      </table>
    </td>
  </tr>
</table>
<!-- ===== SIGNATURE END ===== -->
"""


def build_index(people):
    cards = "\n".join(
        f'    <li><a href="{BASE_URL}/{p["slug"]}/card.html">{esc(p["name"])}</a>'
        f' <span>{esc(p["title"])} · {esc(p["email"])}</span></li>'
        for p in people
    )
    return f"""<!doctype html>
<meta charset="utf-8">
<title>Emotion Group — email signatures</title>
<style>
  body {{ font: 15px/1.6 -apple-system, Segoe UI, Roboto, sans-serif; margin: 40px auto; max-width: 640px; color: #111; }}
  h1 {{ font-size: 20px; }}
  li {{ margin-bottom: 8px; }}
  span {{ color: #777; font-size: 13px; }}
  p {{ color: #555; }}
</style>
<h1>Email signatures — {len(people)} {"person" if len(people) == 1 else "people"}</h1>
<p>Open a card, select all (Cmd+A), copy, and paste into the signature box in Gmail or Outlook.</p>
<p>Not on this list? Build your own at <a href="/emotion/signature">the signature builder</a>.</p>
<ol>
{cards}
</ol>
"""


def check(people):
    """Confirm the pipeline still reproduces the original artwork for Ahmed."""
    from PIL import ImageChops

    ahmed = next((p for p in people if p["slug"] == "ahmed-ali"), None)
    if not ahmed:
        sys.exit("check needs the ahmed-ali entry")
    art, _ = render_card(ahmed)
    ref = HERE / "reference-ahmed.png"
    if not ref.exists():
        sys.exit(f"no reference to compare against: {ref}")
    # Only the text column: the left block carries the city line, which now says
    # Egypt and so is meant to differ from the original artwork.
    box = (SPLIT_X * RETINA, 0, 600 * RETINA, 200 * RETINA)
    diff = ImageChops.difference(art.crop(box), Image.open(ref).convert("RGB").crop(box))
    box = diff.getbbox()
    if box is None:
        print("check: pixel-identical to the source artwork")
        return
    stats = list(diff.convert("L").get_flattened_data())
    mean = sum(stats) / len(stats)
    print(f"check: differs in {box}, mean {mean:.2f} (antialiasing only if under ~8)")


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    people = json.loads(USERS.read_text())
    for person in people:
        person.setdefault("slug", re.sub(r"[^a-z0-9]+", "-", person["name"].lower()).strip("-"))

    if "--check" in sys.argv:
        return check(people)

    wanted = [p for p in people if not args or p["slug"] in args]
    if not wanted:
        sys.exit(f"no such slug: {', '.join(args)}")

    for person in wanted:
        art, fitted = render_card(person)
        out_dir = OUT_ROOT / person["slug"]
        slice_card(round_corners(art), out_dir)
        (out_dir / "card.html").write_text(build_html(person, person["slug"]))
        note = f"  (shrunk to fit: {fitted})" if fitted else ""
        print(f"{person['slug']:<18} {person['name']}{note}")

    # The index lists what actually exists on disk, so a person still waiting on
    # their details never ends up as a dead link.
    published = [p for p in people if (OUT_ROOT / p["slug"] / "card.html").exists()]
    (OUT_ROOT / "index.html").write_text(build_index(published))
    print(f"\n{len(wanted)} card(s) -> public/signature/  ·  index at {BASE_URL}/index.html")


if __name__ == "__main__":
    main()
