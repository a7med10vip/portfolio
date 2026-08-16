#!/usr/bin/env python3
"""Build the shared background plate for a signature card.

Run once per brand (or whenever the source artwork changes). It takes the
Illustrator PDF, strips the per-card text out of its content stream, and renders
what is left at 4x. Emotion's city line is painted back on afterwards: it reads
the same on every card, so baking it in keeps the request-time renderer free of
any Helvetica dependency.

What survives in a plate: the artwork, the logo, the divider and the contact
icons. Every line of text is drawn per card by src/lib/signature/render.ts.

    python3 scripts/signature/build-plate.py            # every brand
    python3 scripts/signature/build-plate.py vertex     # just one

Needs: pdftoppm (brew install poppler), Pillow, and macOS Helvetica for Emotion.
"""

import re
import subprocess
import sys
import tempfile
import zlib
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).parent
ROOT = HERE.parent.parent
ASSETS = ROOT / "src" / "lib" / "signature" / "assets"
DOWNLOADS = Path.home() / "Downloads"

SCALE = 4  # plates are rendered at 4x the 600x200pt artwork
DPI = 72 * SCALE

HELVETICA = "/System/Library/Fonts/Helvetica.ttc"
# Helvetica AFM advances (/1000), enough for Emotion's city line.
HELV_W = {
    ".": 278, "B": 667, "E": 667, "J": 500, "R": 722, "a": 556, "d": 556,
    "e": 556, "g": 556, "h": 556, "i": 222, "p": 556, "r": 333, "t": 278,
    "u": 556, "y": 500,
}

BRANDS = {
    "emotion": {
        "pdf": DOWNLOADS / "E.Signature.Templates.Emotion.pdf",
        "plate": ASSETS / "emotion-plate.png",
        # Drawn per card, so stripped here. The website line goes too: the
        # artwork spaces its contact lines 16.04pt apart while the icons beside
        # them sit 15.19pt apart, so the text drifts lower on each row, and
        # fixing that means redrawing all three.
        "strip": [
            b"(AHMED ALI)Tj",
            b"(Head of Digital Product & Growth)Tj",
            b"(+20 10 11648156)Tj",
            b"(ahmed.ali@emotiongrp.com)Tj",
            b"(emotiongrp.com)Tj",
            b"(Jeddah.Beirut.Riyadh)Tj",  # repainted below, with Egypt appended
        ],
        # Lifted from the source: Helvetica 10pt, 0.471 grey, baseline y=153.85,
        # centred on the midpoint the original line used.
        "cities": {
            "text": "Jeddah.Beirut.Riyadh.Egypt",
            "size": 10,
            "baseline": 153.85,
            "centre": (61.374 + 156.974) / 2,
            "rgb": (120, 120, 120),
        },
    },
    "vertex": {
        "pdf": DOWNLOADS / "Email Signature Templates – vertex.pdf",
        "plate": ASSETS / "vertex-plate.png",
        "strip": [
            b"(Chadi Assi)Tj",
            b"(Business development Manager)Tj",
            b"(00966 540230404)Tj",
            b"(chadi.a@vertex-integra.com)Tj",
            b"(www.vertex-integra.com)Tj",
        ],
        "cities": None,
    },
}


def strip_text(pdf_bytes, strip):
    """Blank out the per-card strings inside the PDF's content streams.

    Edits are collected against the original bytes and applied back-to-front, so
    that rewriting one stream never invalidates the offsets of another.
    """
    edits, removed = [], []
    for match in re.finditer(rb"stream\r?\n", pdf_bytes):
        start = match.end()
        end = pdf_bytes.find(b"endstream", start)
        if end < 0:
            continue
        # The object header is whatever sits between "N 0 obj" and this stream.
        obj = pdf_bytes.rfind(b" 0 obj", 0, match.start())
        if obj < 0:
            continue
        head_start = obj + len(b" 0 obj")
        header = pdf_bytes[head_start:match.start()]
        if b"FlateDecode" not in header:
            continue
        try:
            body = zlib.decompress(pdf_bytes[start:end])
        except zlib.error:
            continue
        if not any(op in body for op in strip):
            continue

        for op in strip:
            if op in body:
                # Keep the operator, empty the string: nothing else shifts,
                # because the following lines position with Td off the line
                # start rather than off the pen.
                body = body.replace(op, b"()Tj" + b" " * (len(op) - 4))
                removed.append(op.decode("latin-1"))

        blob = zlib.compress(body, 9)
        edits.append((start, end, blob))
        edits.append((
            head_start,
            match.start(),
            re.sub(rb"/Length \d+", b"/Length %d" % len(blob), header, count=1),
        ))

    out = pdf_bytes
    for begin, finish, blob in sorted(edits, key=lambda e: -e[0]):
        out = out[:begin] + blob + out[finish:]
    return out, removed


def draw_cities(img, spec):
    """Paint Emotion's city line on, glyph by glyph, at the source's advances."""
    supersample = 4
    font = ImageFont.truetype(HELVETICA, spec["size"] * SCALE * supersample, index=0)
    width = sum(HELV_W[c] for c in spec["text"]) / 1000.0 * spec["size"]
    pen = spec["centre"] - width / 2

    mask = Image.new("L", (img.width * supersample, img.height * supersample), 0)
    draw = ImageDraw.Draw(mask)
    for ch in spec["text"]:
        draw.text(
            (pen * SCALE * supersample, spec["baseline"] * SCALE * supersample),
            ch, font=font, fill=255, anchor="ls",
        )
        pen += HELV_W[ch] / 1000.0 * spec["size"]
    img.paste(
        Image.new("RGB", img.size, spec["rgb"]),
        (0, 0),
        mask.resize(img.size, Image.LANCZOS),
    )
    return img


def build(key, brand):
    if not brand["pdf"].exists():
        sys.exit(f"{key}: source artwork not found: {brand['pdf']}")

    patched, removed = strip_text(brand["pdf"].read_bytes(), brand["strip"])
    missing = [op.decode("latin-1") for op in brand["strip"] if op.decode("latin-1") not in removed]
    if missing:
        sys.exit(f"{key}: these never matched the artwork, so they'd still be baked in: {missing}")
    print(f"{key}: stripped {len(removed)} text runs")

    with tempfile.TemporaryDirectory() as tmp:
        pdf = Path(tmp) / "plate.pdf"
        pdf.write_bytes(patched)
        subprocess.run(
            ["pdftoppm", "-png", "-r", str(DPI), str(pdf), str(Path(tmp) / "out")],
            check=True, capture_output=True,
        )
        img = Image.open(next(Path(tmp).glob("out*.png"))).convert("RGB")

    if img.size != (600 * SCALE, 200 * SCALE):
        sys.exit(f"{key}: unexpected render size {img.size}")

    if brand["cities"]:
        draw_cities(img, brand["cities"])
    img.save(brand["plate"])
    print(f"{key}: wrote {brand['plate'].name} ({img.size[0]}x{img.size[1]})")


def main():
    wanted = sys.argv[1:] or list(BRANDS)
    for key in wanted:
        if key not in BRANDS:
            sys.exit(f"unknown brand: {key} (have {', '.join(BRANDS)})")
        build(key, BRANDS[key])


if __name__ == "__main__":
    main()
