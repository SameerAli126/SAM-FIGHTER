# AEO Lens — Answer Engine Optimization

Optimize to be the definitive answer for featured snippets, People Also Ask (PAA) boxes, voice search, and conversational queries.

## 1. Answer-First Writing
- Lead each section with a direct, self-contained **40–55 word answer**, then expand into technical nuances. This hits the ideal extraction sweet spot.
- Use definitional phrasing: "X is an enterprise AI platform that..." or "WordWanderer is a gamified language platform built with Next.js 14 and Zustand...".
- Bulleted lists (`<ul>`, `<ol>`) for multi-step processes or feature breakdowns (keep to 5–9 items, ≤12 words per item).
- HTML `<table>` elements for comparison, stack specifications, and metric breakdowns.

## 2. Question-Targeted Headings
- Phrase `<h2>` and `<h3>` headings matching natural user queries (e.g., "What is the architecture behind OptiTrade?", "How does Invictus handle real-time SSE progress?").
- Follow each question heading immediately with the direct answer block without filler sentences ("In this section we will discuss...").

## 3. Schema Markup for Answers
- Use `TechArticle` or `Article` with clear descriptions and author entities.
- Implement `BreadcrumbList` for unambiguous hierarchy.
- Structure `SoftwareApplication` with `applicationCategory`, `operatingSystem`, and `offers`.
