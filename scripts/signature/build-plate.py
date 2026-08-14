#!/usr/bin/env python3
"""Build the shared background plate for Emotion Group email signatures.

Run once (or whenever the source artwork changes). It takes the Illustrator PDF,
strips the five pieces of per-person text out of its content stream, renders what
is left at 4x, then paints the city line back on — that line is the same for
everyone, so baking it in keeps make-signatures.py free of any Helvetica
dependency.

What survives in the plate: the wave art, the emotion Group logo, the divider,
the three contact icons, "Let Your Brand Talk", and "emotiongrp.com".

    python3 scripts/signature/build-plate.py

Needs: pdftoppm (brew install poppler), Pillow, and macOS Helvetica.
"""

import re
import subprocess
import sys
import tempfile
import zlib
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).parent
SOURCE_PDF = Path.home() / "Downloads" / "E.Signature.Templates.Emotion.pdf"
PLATE = HERE / "plate.png"

SCALE = 4  # plate is rendered at 4x the 600x200pt artwork
DPI = 72 * SCALE

# Text drawn per person — stripped here, redrawn by make-signatures.py.
STRIP = [
    b"(AHMED ALI)Tj",
    b"(Head of Digital Product & Growth)Tj",
    b"(+20 10 11648156)Tj",
    b"(ahmed.ali@emotiongrp.com)Tj",
    b"(Jeddah.Beirut.Riyadh)Tj",  # redrawn below, with Egypt appended
    # The website line is the same for everyone, but it comes out too: the
    # artwork spaces its contact lines 16.04pt apart while the icons beside them
    # sit 15.19pt apart, so the text drifts lower on each row. Redrawing all
    # three lets each one be centred on its own icon.
    b"(emotiongrp.com)Tj",
]

# The city line, lifted from the source: Helvetica 10pt, 0.471 grey, baseline at
# y=153.85, centred on the midpoint the original line used.
CITIES = "Jeddah.Beirut.Riyadh.Egypt"
CITIES_SIZE = 10
CITIES_BASELINE = 153.85
CITIES_CENTRE = (61.374 + 156.974) / 2
CITIES_RGB = (120, 120, 120)
HELVETICA = "/System/Library/Fonts/Helvetica.ttc"
# Helvetica AFM advances (/1000), enough for the city line.
HELV_W = {
    ".": 278, "B": 667, "E": 667, "J": 500, "R": 722, "a": 556, "d": 556,
    "e": 556, "g": 556, "h": 556, "i": 222, "p": 556, "r": 333, "t": 278,
    "u": 556, "y": 500,
}


def strip_text(pdf_bytes):
    """Blank out the per-person strings inside the PDF's content streams.

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
        if not any(op in body for op in STRIP):
            continue

        for op in STRIP:
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


def draw_cities(img):
    """Paint the city line on, glyph by glyph, at the source's exact advances."""
    supersample = 4
    font = ImageFont.truetype(HELVETICA, CITIES_SIZE * SCALE * supersample, index=0)
    width = sum(HELV_W[c] for c in CITIES) / 1000.0 * CITIES_SIZE
    pen = CITIES_CENTRE - width / 2

    mask = Image.new("L", (img.width * supersample, img.height * supersample), 0)
    draw = ImageDraw.Draw(mask)
    for ch in CITIES:
        draw.text(
            (pen * SCALE * supersample, CITIES_BASELINE * SCALE * supersample),
            ch, font=font, fill=255, anchor="ls",
        )
        pen += HELV_W[ch] / 1000.0 * CITIES_SIZE
    img.paste(
        Image.new("RGB", img.size, CITIES_RGB),
        (0, 0),
        mask.resize(img.size, Image.LANCZOS),
    )
    return img


def main():
    if not SOURCE_PDF.exists():
        sys.exit(f"source artwork not found: {SOURCE_PDF}")

    patched, removed = strip_text(SOURCE_PDF.read_bytes())
    print("stripped:", ", ".join(removed))

    with tempfile.TemporaryDirectory() as tmp:
        pdf = Path(tmp) / "plate.pdf"
        pdf.write_bytes(patched)
        subprocess.run(
            ["pdftoppm", "-png", "-r", str(DPI), str(pdf), str(Path(tmp) / "out")],
            check=True, capture_output=True,
        )
        rendered = next(Path(tmp).glob("out*.png"))
        img = Image.open(rendered).convert("RGB")

    if img.size != (600 * SCALE, 200 * SCALE):
        sys.exit(f"unexpected render size {img.size}")

    draw_cities(img).save(PLATE)
    print(f"wrote {PLATE.relative_to(Path.cwd())} ({img.size[0]}x{img.size[1]})")


if __name__ == "__main__":
    main()
