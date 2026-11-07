# Structured Data (JSON-LD) Reference

JSON-LD structured data provides high-fidelity, machine-readable facts that power traditional search rich results (SEO), zero-click answer snippets (AEO), and LLM knowledge-graph reasoning (GEO).

## Required Graph Entities for Engineering Portfolios

| Entity Type | `@id` Anchor | Key Attributes | Purpose |
| :--- | :--- | :--- | :--- |
| `Person` | `/#person` | `name`, `jobTitle`, `worksFor`, `alumniOf`, `knowsAbout`, `sameAs`, `hasOccupation` | Establishes developer identity, credentials, E-E-A-T, and social graph links |
| `WebSite` | `/#website` | `name`, `url`, `publisher`, `inLanguage` | Disambiguates domain authority and root platform identity |
| `ProfilePage` | `/#profilepage` | `mainEntity` -> `Person`, `primaryImageOfPage` | Designates the homepage as an authoritative developer profile |
| `SoftwareApplication` | `/projects/[slug]#softwareapplication` | `name`, `applicationCategory`, `operatingSystem`, `author`, `offers`, `downloadUrl` | Explicit metadata for each software project developed |
| `ItemList` | `/#project-list` | `itemListElement`, `numberOfItems` | Ordered catalog of featured flagship software projects |
| `BreadcrumbList` | `/projects/[slug]#breadcrumbs` | `itemListElement` (Home -> Projects -> Project) | Semantic navigation path for crawlers and snippet breadcrumbs |
| `TechArticle` | `/projects/[slug]#techarticle` | `headline`, `about`, `author`, `proficiencyLevel`, `dependencies` | Technical case study classification for engineering documentation |
| `OccupationalExperienceRequirements` | `/#experience-requirements` | `monthsOfExperience`, `description`, `skills` | Formal career experience verification for recruitment AI crawlers |

## Best Practices
1. **Bundle with `@graph`**: Use a single top-level JSON-LD `<script type="application/ld+json">` block containing an `@graph` array to maintain relational integrity via `@id` cross-references.
2. **Absolute URLs**: Always use absolute canonical URLs for `@id`, `url`, and images.
3. **No Drift**: Ensure on-page text and JSON-LD claims match 100% (e.g. tech stacks, roles, project descriptions).
