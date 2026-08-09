#!/usr/bin/env python3
"""
Fetch real brand SVG logos for the /clickup showcase page.

Source: Simple Icons CDN (https://simpleicons.org) — MIT-licensed, brand colors baked in.
URL pattern: https://cdn.simpleicons.org/<slug>            -> original brand color
             https://cdn.simpleicons.org/<slug>/<hex>      -> custom color (no leading #)

Saves to public/logos/clickup/<filename>.svg
"""

from __future__ import annotations

import os
import shutil
import subprocess
import sys
import time

# filename → list of fallback URLs to try in order.
# Primary: Simple Icons live CDN (latest, brand color baked in).
# Fallback 1: jsdelivr @9 (older Simple Icons release, before brand-removal requests).
# Fallback 2: custom URLs for icons removed from Simple Icons entirely.
SIMPLEICONS = "https://cdn.simpleicons.org/{slug}"
JSDELIVR_V9 = "https://cdn.jsdelivr.net/npm/simple-icons@9/icons/{slug}.svg"

LOGOS: dict[str, list[str]] = {
    # Main brand
    "clickup": [SIMPLEICONS.format(slug="clickup")],

    # Competitors
    "asana": [SIMPLEICONS.format(slug="asana")],
    "monday": [
        # Removed from Simple Icons entirely — fall back to vectorlogo.zone
        "https://www.vectorlogo.zone/logos/monday/monday-icon.svg",
        "https://raw.githubusercontent.com/gilbarbara/logos/main/logos/monday.svg",
    ],
    "slack": [JSDELIVR_V9.format(slug="slack")],
    "notion": [SIMPLEICONS.format(slug="notion")],

    # Integrations grid
    "github": [SIMPLEICONS.format(slug="github")],
    "figma": [SIMPLEICONS.format(slug="figma")],
    "microsoft-teams": [JSDELIVR_V9.format(slug="microsoftteams")],
    "hubspot": [JSDELIVR_V9.format(slug="hubspot")],
    "onedrive": [JSDELIVR_V9.format(slug="microsoftonedrive")],
    "outlook": [JSDELIVR_V9.format(slug="microsoftoutlook")],
    "trello": [JSDELIVR_V9.format(slug="trello")],
    "salesforce": [JSDELIVR_V9.format(slug="salesforce")],
    "zoom": [SIMPLEICONS.format(slug="zoom")],
    "loom": [SIMPLEICONS.format(slug="loom")],
    "google-calendar": [SIMPLEICONS.format(slug="googlecalendar")],
    "gmail": [SIMPLEICONS.format(slug="gmail")],
    "gitlab": [SIMPLEICONS.format(slug="gitlab")],
    "jira": [SIMPLEICONS.format(slug="jira")],
    "zendesk": [SIMPLEICONS.format(slug="zendesk")],
    "intercom": [SIMPLEICONS.format(slug="intercom")],
    "make": [SIMPLEICONS.format(slug="make")],
    "n8n": [SIMPLEICONS.format(slug="n8n")],
    "zapier": [SIMPLEICONS.format(slug="zapier")],
    "airtable": [SIMPLEICONS.format(slug="airtable")],
    "confluence": [SIMPLEICONS.format(slug="confluence")],

    # AI models
    "openai": [JSDELIVR_V9.format(slug="openai")],
    "claude": [SIMPLEICONS.format(slug="anthropic")],
    "gemini": [SIMPLEICONS.format(slug="googlegemini")],
}

OUT_DIR = os.path.join("public", "logos", "clickup")
USER_AGENT = "Mozilla/5.0 (compatible; ahmedali.online logo-fetch)"
MIN_BYTES = 80  # anything smaller is an error page
MAX_RETRIES = 3  # for transient DNS / network failures


def fetch_one(url: str, dest: str) -> int:
    """Use curl — uses system trust store, which Python urllib does not on macOS."""
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
    """Try each URL in order; on each, retry up to MAX_RETRIES on transient errors."""
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
                # Transient: DNS or timeout — wait and retry. 404 — break to next URL.
                msg = str(e)
                if "Could not resolve host" in msg or "timed out" in msg:
                    if attempt < MAX_RETRIES:
                        time.sleep(0.5 * attempt)
                        continue
                # Permanent (404 or out of retries) → next URL
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
            print(f"  OK  {filename:22s} ({size:>5} B)  [{host}]")
        except RuntimeError as e:
            failed.append((filename, str(e)))
            print(f"  FAIL {filename:22s}  -> {e}")
            if os.path.exists(path) and os.path.getsize(path) < MIN_BYTES:
                os.remove(path)
        time.sleep(0.05)  # gentle on the CDN

    print()
    print(f"Done. {len(success)} ok, {len(failed)} failed.")
    if failed:
        print("Need manual handling — try simpleicons.org, vectorlogo.zone, or gilbarbara/logos")
        for name, err in failed:
            print(f"  - {name}: {err}")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
