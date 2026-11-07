---
name: seo
description: Deterministic LLM-first SEO audits for websites, portfolios, and repositories. Use when the user asks to analyze SEO, check technical SEO, review Schema.org graphs, evaluate Core Web Vitals, E-E-A-T, GEO (Generative Engine Optimization for ChatGPT/Perplexity), AEO (Answer Engine Optimization), or XML sitemaps.
---

# Agentic SEO & Discovery Skill

LLM-first SEO analysis framework with specialized sub-skills for modern web discovery across traditional search engines and AI generative engines.

## Sub-Skills Directory

| Sub-Skill | Scope | Reference File |
| :--- | :--- | :--- |
| `seo-geo` | Generative Engine Optimization (ChatGPT Search, Perplexity, Claude, AI Overviews, `llms.txt`) | `resources/skills/seo-geo.md` |
| `seo-aeo` | Answer Engine Optimization (Featured Snippets, PAA, knowledge panels, direct answers) | `resources/skills/seo-aeo.md` |
| `seo-schema` | Comprehensive Schema.org JSON-LD structured data graphs (`Person`, `WebSite`, `ProfilePage`, `SoftwareApplication`, etc.) | `resources/skills/seo-schema.md` |
| `seo-technical` | Technical crawlability, robots.txt, sitemaps, canonicals, security, Core Web Vitals | `resources/skills/seo-technical.md` |
| `seo-audit` | Full portfolio and single-page end-to-end evidence auditing | `resources/skills/seo-audit.md` |

## Core Workflow

1. **Evidence Collection**:
   - Inspect raw static HTML files (e.g. `index.html`, `dist/index.html`, `dist/projects/*.html`).
   - Audit presence of `/llms.txt`, `/llms-full.txt`, `sitemap.xml`, and `robots.txt`.
2. **Analysis Across Discovery Surfaces**:
   - **Traditional Google / Bing SEO**: Canonicalization, title/description tags, viewport, OpenGraph, fast loading.
   - **AI Generative Engines (GEO)**: Entity disambiguation, verified factual claims, author credentials, machine-readable documentation.
   - **Direct Answer Engines (AEO)**: 40–55 word direct-answer paragraphs, definitional structures, question-based headings.
3. **Actionable Remediation**:
   - Directly inject pre-rendered static HTML and linked JSON-LD graphs into the project's build pipeline.
