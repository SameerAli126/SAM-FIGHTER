# Scoring & Prioritization Rubric

## Priority Levels

| Priority | Meaning | Concrete Triggers |
| :--- | :--- | :--- |
| **P0 — Blocking** | Prevents proper indexing or crawling | Accidental `noindex`, missing canonical, robots.txt blocking AI crawlers, zero static HTML in JS-only SPA roots |
| **P1 — High** | Major visibility or LLM citation loss | Missing JSON-LD structured data graph, vague hedge words, lack of `llms.txt`, broken Open Graph tags |
| **P2 — Medium** | Sub-optimal extraction | Incomplete breadcrumbs, uncompressed images, missing language headers, lacking answer-first summaries |
| **P3 — Low** | Polish & minor refinements | Formatting of social cards, additional metadata variants, alternate hreflang attributes |

## Weighted Audit Breakdown
- **SEO (0–100)**: Crawlability & Indexing (30%) + On-Page Metadata (25%) + Semantic HTML (25%) + Performance/CWV (20%)
- **GEO (0–100)**: Information Density & Metrics (35%) + `llms.txt` Compliance (25%) + Distributed Entity Authority (20%) + Non-JS Machine Readability (20%)
- **AEO (0–100)**: Direct Answer Formatting (35%) + Question Heading Alignment (25%) + Structured Snippet Schema (25%) + Table/List Clarity (15%)
