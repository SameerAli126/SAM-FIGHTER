# SEO Lens — Traditional Search Ranking

Optimize for Google, Bing, and traditional search engines.

## 1. Crawlability & Indexing
- `robots.txt` present, unblocked, pointing to canonical XML sitemap and `llms.txt`.
- XML sitemap valid, with accurate `<loc>`, `<lastmod>`, `<changefreq>`, and `<priority>`.
- Self-referencing canonical URLs on every indexable page: `<link rel="canonical" href="...">`.
- Language declarations: `<html lang="en">`, `<meta name="language" content="English">`, `<link rel="alternate" hreflang="en" ...>`.
- Responsive viewport meta: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.

## 2. On-Page Metadata
- `<title>`: 50–60 characters, primary keyword near the beginning, branded suffix.
- `<meta name="description">`: 140–160 characters, active voice with value proposition.
- Semantic heading structure: Exactly one `<h1>` per page, sequential `<h2>` and `<h3>` tags with no skipped levels.
- Full Open Graph & Twitter Cards for rich social previews (1200x630px images, secure URLs, descriptions, locale).

## 3. Semantic Structure & Performance
- Accessible landmarks: `<header role="banner">`, `<nav aria-label="...">`, `<main role="main">`, `<article>`, `<section>`, `<footer role="contentinfo">`.
- Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1.
- Lightweight pre-rendered HTML fallback for non-JavaScript scrapers.
- Modern image formats (WebP, PNG, SVG) with explicit dimensions and descriptive `alt` tags.
