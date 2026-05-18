#!/usr/bin/env python3
"""
Fetch real brand SVG logos for the /vertex page Tech Stack tabs.

Source order:
1. Simple Icons live CDN (https://cdn.simpleicons.org/<slug>) — original brand color
2. jsdelivr simple-icons@9 — older release that still has slugs removed from latest
3. Curated fallbacks (vectorlogo.zone, gilbarbara/logos) for icons not on Simple Icons

Saves to public/logos/vertex/<filename>.svg
"""

from __future__ import annotations

import os
import shutil
import subprocess
import sys
import time

SIMPLEICONS = "https://cdn.simpleicons.org/{slug}"
JSDELIVR_V9 = "https://cdn.jsdelivr.net/npm/simple-icons@9/icons/{slug}.svg"
GILBARBARA = "https://raw.githubusercontent.com/gilbarbara/logos/main/logos/{slug}.svg"

LOGOS: dict[str, list[str]] = {
    # ── Frontend ────────────────────────────────────────────
    "nextjs": [
        SIMPLEICONS.format(slug="nextdotjs"),
        JSDELIVR_V9.format(slug="nextdotjs"),
    ],
    "typescript": [SIMPLEICONS.format(slug="typescript")],
    "tailwindcss": [SIMPLEICONS.format(slug="tailwindcss")],
    "gsap": [
        SIMPLEICONS.format(slug="greensock"),
        JSDELIVR_V9.format(slug="greensock"),
    ],
    "lenis": [
        # No simpleicons — use Studio Freight / Darkroom logo placeholder via gilbarbara if available
        GILBARBARA.format(slug="lenis"),
        # Fallback to a generic L mark via simpleicons "linktree" (no — skip)
    ],

    # ── i18n ───────────────────────────────────────────────
    # next-intl, RTL, hreflang have no real brand logos — we won't render logos for these
    # but include nextintl if available
    "nextintl": [
        # No public brand logo; fallback: use Next.js logo
        SIMPLEICONS.format(slug="nextdotjs"),
    ],

    # ── 3D & Immersive ─────────────────────────────────────
    "threejs": [SIMPLEICONS.format(slug="threedotjs")],
    "react": [SIMPLEICONS.format(slug="react")],

    # ── Backend / CMS ──────────────────────────────────────
    "payload": [
        # Payload was added recently
        SIMPLEICONS.format(slug="payloadcms"),
        JSDELIVR_V9.format(slug="payloadcms"),
        GILBARBARA.format(slug="payload"),
    ],
    "postgresql": [SIMPLEICONS.format(slug="postgresql")],
    "neon": [
        SIMPLEICONS.format(slug="neon"),
        GILBARBARA.format(slug="neon"),
    ],
    "drizzle": [
        SIMPLEICONS.format(slug="drizzle"),
        GILBARBARA.format(slug="drizzle"),
    ],
    "resend": [
        SIMPLEICONS.format(slug="resend"),
        GILBARBARA.format(slug="resend"),
    ],
    "cloudinary": [SIMPLEICONS.format(slug="cloudinary")],

    # ── Ops ────────────────────────────────────────────────
    "vercel": [SIMPLEICONS.format(slug="vercel")],
    "plausible": [
        SIMPLEICONS.format(slug="plausibleanalytics"),
        JSDELIVR_V9.format(slug="plausibleanalytics"),
    ],
    "sentry": [SIMPLEICONS.format(slug="sentry")],
    "githubactions": [
        SIMPLEICONS.format(slug="githubactions"),
        JSDELIVR_V9.format(slug="githubactions"),
    ],
    "lighthouse": [
        SIMPLEICONS.format(slug="lighthouse"),
        JSDELIVR_V9.format(slug="lighthouse"),
        GILBARBARA.format(slug="lighthouse"),
    ],
}

OUT_DIR = os.path.join("public", "logos", "vertex")
USER_AGENT = "Mozilla/5.0 (compatible; ahmedali.online vertex-logo-fetch)"
MIN_BYTES = 80
MAX_RETRIES = 3


def fetch_one(url: str, dest: str) -> int:
    result = subprocess.run(
        [
            "curl",
            "--silent",
            "--show-error",
            "--fail",
            "--location",
            "--max-time", "15",
            "--user-agent", USER_AGENT,
            "--header", "Accept: image/svg+xml",
            "--output", dest,
            url,
        ],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        raise RuntimeError(result.stderr.strip() or f"curl exit {result.returncode}")
    return os.path.getsize(dest) if os.path.exists(dest) else 0


def fetch_with_fallbacks(urls: list[str], dest: str) -> tuple[int, str]:
    last_err = ""
    for url in urls:
        for attempt in range(1, MAX_RETRIES + 1):
            try:
                size = fetch_one(url, dest)
                if size < MIN_BYTES:
                    raise ValueError(f"response too small ({size} bytes)")
                return size, url
            except (RuntimeError, ValueError) as e:
                last_err = f"{e} ({url})"
                msg = str(e)
                if "Could not resolve host" in msg or "timed out" in msg:
                    if attempt < MAX_RETRIES:
                        time.sleep(0.5 * attempt)
                        continue
                break
    raise RuntimeError(last_err or "all fallbacks failed")


def main() -> int:
    if not shutil.which("curl"):
        print("ERROR: 'curl' not found in PATH. Please install curl.", file=sys.stderr)
        return 2

    os.makedirs(OUT_DIR, exist_ok=True)

    success: list[str] = []
    failed: list[tuple[str, str]] = []

    for filename, urls in LOGOS.items():
        path = os.path.join(OUT_DIR, f"{filename}.svg")
        try:
            size, used = fetch_with_fallbacks(urls, path)
            success.append(filename)
            host = used.split("/")[2] if "://" in used else used
            print(f"  OK   {filename:18s} ({size:>5} B)  [{host}]")
        except RuntimeError as e:
            failed.append((filename, str(e)))
            print(f"  FAIL {filename:18s}  -> {e}")
            if os.path.exists(path) and os.path.getsize(path) < MIN_BYTES:
                os.remove(path)
        time.sleep(0.05)

    print()
    print(f"Done. {len(success)} ok, {len(failed)} failed.")
    if failed:
        print("Failed slugs need manual lookup on https://simpleicons.org/?q=")
        for name, err in failed:
            print(f"  - {name}: {err}")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
