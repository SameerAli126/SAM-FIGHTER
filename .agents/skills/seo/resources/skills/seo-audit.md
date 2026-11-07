---
name: seo-audit
description: Full portfolio audit framework across technical, content, and structured data dimensions.
---

# SEO & Discovery Audit Guide

## Audit Steps
1. **Fetch Raw Markup**: Inspect static files or crawl target routes.
2. **Examine Semantic Markup**: Verify semantic landmarks, valid heading hierarchy, and pre-rendered body text.
3. **Verify Schema Graphs**: Ensure JSON-LD `@graph` connects `Person`, `WebSite`, `ProfilePage`, `SoftwareApplication`, `ItemList`, `BreadcrumbList`, and `TechArticle`.
4. **Validate AI Endpoints**: Check that `/llms.txt` and `/llms-full.txt` exist, are syntactically valid Markdown, and list all key routes.
5. **Score & Report**: Categorize findings by severity (Critical, Warning, Pass) with implementation code snippets.
