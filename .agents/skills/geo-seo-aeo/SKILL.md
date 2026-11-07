---
name: geo-seo-aeo
description: Audit or generate web content optimized for traditional search (SEO), AI generative answer engines like ChatGPT/Perplexity/Google AI Overviews (GEO), and answer engines / featured snippets / voice (AEO). Use when the user asks to improve search ranking, AI-citability, run an SEO/GEO/AEO audit of a URL or file, add JSON-LD schema, create an llms.txt, or structure content for LLM discovery.
---

# Web Optimization (SEO · GEO · AEO)

This skill treats **SEO**, **GEO**, and **AEO** as three integrated lenses over one shared body of web-optimization practice. It supports three workflows: **Audit** an existing website/page, **Generate** new optimized content, and **Fix** identified issues interactively.

## The Three Optimization Lenses

| Lens | Target Search Engines | Primary Focus & Optimizations | Reference File |
| :--- | :--- | :--- | :--- |
| **SEO** | Google, Bing, DuckDuckGo | Technical crawlability, XML sitemaps, canonicals, title/meta tags, Core Web Vitals, link architecture | `references/seo.md` |
| **GEO** | ChatGPT Search, Perplexity, Claude, Google AI Overviews | Entity clarity, high information density (no vague hedges), verifiable numbers, E-E-A-T, machine-readable `llms.txt`, SSR/pre-rendering | `references/geo.md` |
| **AEO** | Featured snippets, People Also Ask (PAA), Voice Search | Answer-first formatting (40-55 words), definitional statements ("X is..."), question headings (`H2`/`H3`), FAQ/HowTo schema | `references/aeo.md` |

### Shared Support References:
- `references/schema.md`: Production Schema.org JSON-LD patterns (`Person`, `WebSite`, `ProfilePage`, `SoftwareApplication`, `TechArticle`, `ItemList`, `BreadcrumbList`, `OccupationalExperienceRequirements`).
- `references/scoring.md`: Objective scoring rubric (P0 blocking to P3 polish) across all three lenses.
- `references/fix-playbook.md`: Concrete implementation guides for rapid remediation.
- `scripts/audit.py`: Python script for automated, deterministic heuristic auditing of local files or live URLs.

---

## Workflow A — Audit

Use when given a **URL or a local HTML/Markdown file** and asked to evaluate or improve it.

1. **Acquire the content**:
   - Live URL: Run `python scripts/audit.py <url>` for deterministic mechanical checks.
   - Local file: Run `python scripts/audit.py --file <path>`.
2. **Apply the three lenses**:
   - SEO: Validate title, meta, canonical, viewport, headings, robots, sitemap, open graph.
   - GEO: Check information density, hedge words, entity disambiguation, `llms.txt`, and SSR fallback content.
   - AEO: Check question headings, direct answer paragraphs, list/table snippets, and FAQ schema.
3. **Score & prioritize**: Use `references/scoring.md` (P0 Blocking → P1 High → P2 Medium → P3 Low).
4. **Emit the report**: Deliver an evidence-backed action plan highlighting issues, severity, and copy-paste ready fixes.

---

## Workflow B — Generate

Use when creating or updating pages, portfolio showcases, technical articles, or metadata.

1. **Answer-first structure (AEO)**: Lead each section with a direct 40–55 word answer, followed by context and supporting tables/lists.
2. **High information density (GEO)**: Replace fuzzy descriptors ("very fast", "scalable") with quantified metrics ("sub-15ms calculations", "audited across 21 viewports").
3. **Structured Data Graphs**: Include interconnected Schema.org JSON-LD graphs linking author (`Person`), site (`WebSite`), page (`ProfilePage`/`TechArticle`), and product (`SoftwareApplication`).
4. **AI Crawl Index**: Create or update `/llms.txt` and `/llms-full.txt` referencing the new content.

---

## Workflow C — Fix & Remediate

1. Check blocking P0 issues: `noindex` directives, missing canonicals, empty non-JS roots.
2. Inject semantic pre-rendered HTML so crawlers without JS engines can read all page content.
3. Ensure AI crawler permissions in `robots.txt` (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `OAI-SearchBot`).
4. Validate schema syntax and verify zero runtime errors.
