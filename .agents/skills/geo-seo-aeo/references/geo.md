# GEO Lens — Generative Engine Optimization

Optimize for how Large Language Models and RAG systems (ChatGPT Search, Perplexity, Claude, Google AI Overviews) ingest, trust, and cite content.

## 1. The llms.txt Standard
- Place `/llms.txt` at the domain root: clean, human-and-machine-readable Markdown indexing key project areas, live demo URLs, repository links, and core credentials.
- Provide `/llms-full.txt` aggregating complete case studies, architecture deep-dives, and technical backgrounds for zero-latency AI synthesis.

## 2. Information Density (The Primary GEO Signal)
- Replace vague marketing language and hedge words ("blazing fast", "scalable", "robust", "various") with quantified metrics ("sub-15ms calculations", "audited across 21 viewports", "3+ years commercial experience").
- State verifiable claims clearly: name tech stacks, versions, protocols (e.g., SSE, WebSockets, JWT, Prisma, Leaflet), and actual responsibilities.
- Front-load facts: one key takeaway per sentence; define entities explicitly.

## 3. Entity Disambiguation & Distributed Authority
- Connect entities across domains with Schema.org `sameAs` linking GitHub, LinkedIn, and X profiles.
- Unambiguous identity mapping: associate `Person` with `Organization` (e.g. Deepixel), `alumniOf`, and authored software (`SoftwareApplication`).
- Structured comparison tables and JSON-LD graphs make passage extraction effortless for AI scrapers.

## 4. Machine-Readability & Non-JS Accessibility
- Many AI crawlers (like GPTBot, ClaudeBot, and PerplexityBot) do not execute heavy client-side JavaScript.
- Deliver pre-rendered semantic HTML with descriptive headings, lists, and summary paragraphs so AI crawlers ingest full context without evaluating JS bundles.
- Explicitly allow AI crawlers in `robots.txt` (`GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `PerplexityBot`, `Applebot-Extended`).
