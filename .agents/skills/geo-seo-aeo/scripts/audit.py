#!/usr/bin/env python3
"""Deterministic SEO/GEO/AEO heuristic auditor.
Stdlib-only (Python 3.8+). Evaluates raw HTML files or live URLs.

Usage:
    python audit.py --file path/to/index.html [--base-url https://msameerali.dev]
    python audit.py https://msameerali.dev
"""
import argparse
import json
import re
import sys
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError

HEDGE_WORDS = [
    "might", "could", "may", "maybe", "possibly", "perhaps", "generally",
    "somewhat", "fairly", "quite", "really", "very fast", "blazing fast",
    "scalable", "robust", "seamless", "cutting-edge", "world-class",
    "leading", "best-in-class", "soon", "various", "several"
]


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = None
        self._in_title = False
        self.meta = {}
        self.headings = []
        self._heading_level = None
        self._heading_buf = []
        self.canonical = None
        self.images = 0
        self.images_with_alt = 0
        self.links_internal = 0
        self.links_external = 0
        self.jsonld_blocks = []
        self._in_jsonld = False
        self._jsonld_buf = []
        self.text_parts = []
        self._skip_text = 0
        self.og_tags = 0
        self.twitter_tags = 0
        self.has_noscript = False
        self.has_landmarks = {
            "header": False,
            "main": False,
            "nav": False,
            "footer": False
        }

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        tag_lower = tag.lower()

        if tag_lower in self.has_landmarks:
            self.has_landmarks[tag_lower] = True
        if a.get("role") in ("banner", "main", "navigation", "contentinfo"):
            for role_k in ("header", "main", "nav", "footer"):
                if a.get("role") == {"header": "banner", "main": "main", "nav": "navigation", "footer": "contentinfo"}[role_k]:
                    self.has_landmarks[role_k] = True

        if tag_lower == "title":
            self._in_title = True
        elif tag_lower == "meta":
            key = a.get("name") or a.get("property") or a.get("itemprop")
            if key:
                k_low = key.lower()
                self.meta[k_low] = a.get("content", "")
                if k_low.startswith("og:"):
                    self.og_tags += 1
                if k_low.startswith("twitter:"):
                    self.twitter_tags += 1
        elif tag_lower == "link" and (a.get("rel", "").lower() == "canonical"):
            self.canonical = a.get("href")
        elif tag_lower in ("h1", "h2", "h3", "h4", "h5", "h6"):
            self._heading_level = int(tag[1])
            self._heading_buf = []
        elif tag_lower == "img":
            self.images += 1
            if a.get("alt", "").strip():
                self.images_with_alt += 1
        elif tag_lower == "a" and a.get("href"):
            self._classify_link(a["href"])
        elif tag_lower == "noscript":
            self.has_noscript = True
        elif tag_lower in ("script", "style"):
            self._skip_text += 1
            if tag_lower == "script" and a.get("type", "").lower() == "application/ld+json":
                self._in_jsonld = True
                self._jsonld_buf = []

    def handle_endtag(self, tag):
        tag_lower = tag.lower()
        if tag_lower == "title":
            self._in_title = False
        elif tag_lower in ("h1", "h2", "h3", "h4", "h5", "h6") and self._heading_level:
            self.headings.append((self._heading_level, " ".join(self._heading_buf).strip()))
            self._heading_level = None
        elif tag_lower in ("script", "style"):
            self._skip_text = max(0, self._skip_text - 1)
            if tag_lower == "script" and self._in_jsonld:
                self.jsonld_blocks.append("".join(self._jsonld_buf).strip())
                self._in_jsonld = False

    def handle_data(self, data):
        if self._in_title:
            self.title = (self.title or "") + data
        if self._heading_level is not None:
            self._heading_buf.append(data)
        if self._in_jsonld:
            self._jsonld_buf.append(data)
        if self._skip_text == 0:
            stripped = data.strip()
            if stripped:
                self.text_parts.append(stripped)

    def _classify_link(self, href):
        if href.startswith("#") or href.startswith("mailto:") or href.startswith("tel:"):
            return
        netloc = urlparse(href).netloc
        if netloc:
            self.links_external += 1
        else:
            self.links_internal += 1


def analyze_html(html, base_url=""):
    parser = PageParser()
    parser.feed(html)
    full_text = " ".join(parser.text_parts)
    word_count = len(full_text.split())

    hedge_matches = []
    lower_text = full_text.lower()
    for hw in HEDGE_WORDS:
        count = len(re.findall(r"\b" + re.escape(hw) + r"\b", lower_text))
        if count > 0:
            hedge_matches.append({"word": hw, "occurrences": count})

    parsed_schemas = []
    for raw in parser.jsonld_blocks:
        try:
            parsed = json.loads(raw)
            if "@graph" in parsed:
                for item in parsed["@graph"]:
                    parsed_schemas.append(item.get("@type", "Unknown"))
            else:
                parsed_schemas.append(parsed.get("@type", "Unknown"))
        except Exception:
            parsed_schemas.append("INVALID_JSON")

    report = {
        "seo": {
            "title": parser.title,
            "title_length": len(parser.title or ""),
            "meta_description": parser.meta.get("description"),
            "meta_description_length": len(parser.meta.get("description") or ""),
            "canonical": parser.canonical,
            "h1_count": sum(1 for lvl, _ in parser.headings if lvl == 1),
            "h1_text": [txt for lvl, txt in parser.headings if lvl == 1],
            "total_headings": len(parser.headings),
            "open_graph_tags": parser.og_tags,
            "twitter_tags": parser.twitter_tags,
            "images_total": parser.images,
            "images_with_alt": parser.images_with_alt,
            "landmarks_detected": parser.has_landmarks,
        },
        "geo": {
            "word_count": word_count,
            "hedge_word_occurrences": sum(m["occurrences"] for m in hedge_matches),
            "hedge_details": hedge_matches[:5],
            "detected_schemas": parsed_schemas,
            "has_person_schema": "Person" in parsed_schemas,
            "has_software_app_schema": "SoftwareApplication" in parsed_schemas or "WebApplication" in parsed_schemas,
            "has_profile_page_schema": "ProfilePage" in parsed_schemas,
            "has_website_schema": "WebSite" in parsed_schemas,
        },
        "aeo": {
            "has_faq_or_howto": any(t in ("FAQPage", "HowTo") for t in parsed_schemas),
            "has_breadcrumbs": "BreadcrumbList" in parsed_schemas,
            "question_headings": [txt for _, txt in parser.headings if "?" in txt or any(txt.lower().startswith(q) for q in ["what", "how", "why", "who", "when"])],
        }
    }
    return report


def main():
    parser = argparse.ArgumentParser(description="Audit HTML for SEO, GEO, and AEO signals.")
    parser.add_argument("url", nargs="?", help="URL to audit")
    parser.add_argument("--file", help="Path to local HTML file")
    parser.add_argument("--base-url", default="", help="Base URL for canonical reference")
    args = parser.parse_args()

    if args.file:
        with open(args.file, "r", encoding="utf-8", errors="replace") as f:
            content = f.read()
        res = analyze_html(content, args.base_url)
    elif args.url:
        req = Request(args.url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) SEO-GEO-Auditor"})
        with urlopen(req, timeout=15) as resp:
            content = resp.read().decode("utf-8", errors="replace")
        res = analyze_html(content, args.url)
    else:
        print("Please provide a URL or --file argument.")
        sys.exit(1)

    print(json.dumps(res, indent=2))


if __name__ == "__main__":
    main()
