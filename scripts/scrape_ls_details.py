#!/usr/bin/env python3

from __future__ import annotations

import json
import re
import time
from html import unescape
from http.client import IncompleteRead
from pathlib import Path
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parents[1]
APP_JS = ROOT / "app.js"
OUT_FILE = ROOT / "ls-details.js"


SOURCE_PATTERN = re.compile(
    r'"(ls-[^"]+)":\s*"(https://liberatingstructures\.info/[^"]+)"'
)


def fetch(url: str) -> str:
    req = Request(url, headers={"User-Agent": "Mozilla/5.0"})

    for attempt in range(3):
        try:
            with urlopen(req, timeout=30) as response:
                return response.read().decode("utf-8", errors="ignore")
        except IncompleteRead as exc:
            partial = exc.partial.decode("utf-8", errors="ignore")
            if partial:
                return partial
            if attempt == 2:
                raise
        except Exception:
            if attempt == 2:
                raise
        time.sleep(1 + attempt)

    raise RuntimeError(f"Unable to fetch {url}")


def strip_tags(fragment: str) -> str:
    text = re.sub(r"<br\s*/?>", "\n", fragment, flags=re.I)
    text = re.sub(r"</p>", "\n\n", text, flags=re.I)
    text = re.sub(r"</li>", "\n", text, flags=re.I)
    text = re.sub(r"<[^>]+>", "", text)
    text = unescape(text)
    text = text.replace("\xa0", " ")
    text = re.sub(r"\n{3,}", "\n\n", text)
    return "\n".join(line.strip() for line in text.splitlines() if line.strip())


def clean_html(fragment: str) -> str:
    cleaned = fragment.strip()
    cleaned = cleaned.replace("\xa0", " ")
    cleaned = re.sub(r"<!--.*?-->", "", cleaned, flags=re.S)
    cleaned = re.sub(r"\s(?:class|style|id|data-[\w-]+|loading|decoding|sizes|srcset|width|height)=\"[^\"]*\"", "", cleaned)
    cleaned = re.sub(r"</?span[^>]*>", "", cleaned)
    cleaned = re.sub(r"</?(figure|picture|source|img)[^>]*>", "", cleaned)
    cleaned = re.sub(r"\s{2,}", " ", cleaned)
    return unescape(cleaned).strip()


def extract_list_items(fragment: str) -> list[str]:
    return [strip_tags(item) for item in re.findall(r"<li[^>]*>(.*?)</li>", fragment, flags=re.S)]


def extract_first(pattern: str, html: str) -> str | None:
    match = re.search(pattern, html, flags=re.S)
    if not match:
        return None
    return match.group(1)


def parse_steps(html: str) -> tuple[str | None, list[dict[str, str]]]:
    intro = extract_first(
        r'The five design elements of .*?</h3>.*?<div class="headline-right">\s*<p[^>]*><em>(.*?)</em></p>',
        html,
    )
    step_pattern = re.compile(
        r'<div class="steps-content(?: active)?" data-step="(?P<step>\d+)">.*?'
        r'<div class="steps-accordion-header">\s*<span>(?P<label>.*?)</span>.*?'
        r'<div class="steps-accordion-body">\s*<h3 class="steps-title h2">(?P<subtitle>.*?)</h3>\s*'
        r'<div class="steps-body">(?P<body>.*?)</div>\s*</div>\s*</div>',
        flags=re.S,
    )
    steps = []
    for match in step_pattern.finditer(html):
        steps.append(
            {
                "step": match.group("step"),
                "label": strip_tags(match.group("label")),
                "subtitle": strip_tags(match.group("subtitle")),
                "bodyHtml": clean_html(match.group("body")),
            }
        )
    return (strip_tags(intro) if intro else None, steps)


def parse_unlocks(html: str) -> tuple[str | None, list[str]]:
    block = extract_first(
        r'What is made possible - What it unlocks</h3>.*?<div class="headline-right">(.*?)</div>\s*</div>',
        html,
    )
    if not block:
        return (None, [])
    first_paragraph = extract_first(r"<p>(.*?)</p>", block)
    when_to_use = extract_first(r'When to use it</span></p>\s*(<ul>.*?</ul>)', block)
    return (
        strip_tags(first_paragraph) if first_paragraph else None,
        extract_list_items(when_to_use or ""),
    )


def parse_variants(html: str) -> list[dict[str, str]]:
    section_pattern = re.compile(
        r'<section[^>]+class="[^"]*\b(?P<kind>online|solo)\b[^"]*"[^>]*>.*?<div class="one">(?P<body>.*?)</div>',
        flags=re.S,
    )
    variants = []
    for match in section_pattern.finditer(html):
        body = match.group("body")
        title = extract_first(r"<h2><span class=\"h2\">(.*?)</span></h2>", body) or match.group("kind").title()
        subtitle = extract_first(r"<h3><span class=\"h3\">(.*?)</span></h3>", body)
        content = re.sub(r"<h2>.*?</h2>", "", body, count=1, flags=re.S)
        content = re.sub(r"<h3>.*?</h3>", "", content, count=1, flags=re.S)
        variants.append(
            {
                "kind": match.group("kind"),
                "title": strip_tags(title),
                "subtitle": strip_tags(subtitle) if subtitle else "",
                "bodyHtml": clean_html(content),
            }
        )
    return variants


def parse_extras(html: str) -> list[dict[str, str]]:
    extra_pattern = re.compile(
        r'<div class="ls-usps-item">.*?<h2 class="h3 ls-usps-title">(?P<title>.*?)</h4>.*?'
        r'<p class="ls-usps-subtitle">(?P<subtitle>.*?)</p>.*?'
        r'<div class="ls-usps-text">(?P<body>.*?)</div>',
        flags=re.S,
    )
    extras = []
    for match in extra_pattern.finditer(html):
        extras.append(
            {
                "title": strip_tags(match.group("title")),
                "subtitle": strip_tags(match.group("subtitle")),
                "bodyHtml": clean_html(match.group("body")),
            }
        )
    return extras


def parse_details(url: str) -> dict[str, object]:
    html = fetch(url)
    unlocks, when_to_use = parse_unlocks(html)
    design_intro, steps = parse_steps(html)
    variants = parse_variants(html)
    extras = parse_extras(html)
    return {
        "sourceUrl": url,
        "unlocks": unlocks or "",
        "whenToUse": when_to_use,
        "designIntro": design_intro or "",
        "designElements": steps,
        "variants": variants,
        "extras": extras,
    }


def main() -> None:
    app_source = APP_JS.read_text(encoding="utf-8")
    source_urls = dict(SOURCE_PATTERN.findall(app_source))
    details = {}

    for structure_id, url in source_urls.items():
        try:
            details[structure_id] = parse_details(url)
            print(f"Fetched {structure_id}")
        except Exception as exc:
            details[structure_id] = {
                "sourceUrl": url,
                "unlocks": "",
                "whenToUse": [],
                "designIntro": "",
                "designElements": [],
                "variants": [],
                "extras": [],
            }
            print(f"Failed {structure_id}: {exc}")

    serialized = json.dumps(details, ensure_ascii=False, indent=2)
    OUT_FILE.write_text(
        f"window.lsExerciseDetails = {serialized};\n",
        encoding="utf-8",
    )
    print(f"Wrote {len(details)} LS exercise records to {OUT_FILE}")


if __name__ == "__main__":
    main()
