import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const rootDir = path.resolve(__dirname, "../..");
const publicDir = path.join(rootDir, "public");
const distDir = path.join(rootDir, "dist");
const skillsDir = path.join(rootDir, ".agents", "skills");

describe("SEO, AEO, and GEO Implementation & Standards Validation", () => {
  it("verifies modern agent skills for SEO, GEO, and AEO are installed in .agents/skills/", () => {
    const geoSeoAeoSkill = path.join(skillsDir, "geo-seo-aeo", "SKILL.md");
    const seoSkill = path.join(skillsDir, "seo", "SKILL.md");

    expect(fs.existsSync(geoSeoAeoSkill)).toBe(true);
    expect(fs.existsSync(seoSkill)).toBe(true);

    const geoSeoAeoContent = fs.readFileSync(geoSeoAeoSkill, "utf8");
    expect(geoSeoAeoContent).toContain("name: geo-seo-aeo");
    expect(geoSeoAeoContent).toContain("SEO · GEO · AEO");

    const seoContent = fs.readFileSync(seoSkill, "utf8");
    expect(seoContent).toContain("name: seo");
    expect(seoContent).toContain("LLM-first SEO");

    // Verify sub-skill and reference files
    expect(fs.existsSync(path.join(skillsDir, "geo-seo-aeo", "references", "geo.md"))).toBe(true);
    expect(fs.existsSync(path.join(skillsDir, "geo-seo-aeo", "references", "aeo.md"))).toBe(true);
    expect(fs.existsSync(path.join(skillsDir, "geo-seo-aeo", "references", "schema.md"))).toBe(true);
    expect(fs.existsSync(path.join(skillsDir, "geo-seo-aeo", "scripts", "audit.py"))).toBe(true);
    expect(fs.existsSync(path.join(skillsDir, "seo", "resources", "skills", "seo-geo.md"))).toBe(true);
    expect(fs.existsSync(path.join(skillsDir, "seo", "resources", "skills", "seo-aeo.md"))).toBe(true);
  });

  it("verifies public/llms.txt and public/llms-full.txt conform to the LLM discovery standard", () => {
    const llmsPath = path.join(publicDir, "llms.txt");
    const llmsFullPath = path.join(publicDir, "llms-full.txt");

    expect(fs.existsSync(llmsPath)).toBe(true);
    expect(fs.existsSync(llmsFullPath)).toBe(true);

    const llms = fs.readFileSync(llmsPath, "utf8");
    expect(llms).toMatch(/^# Muhammad Sameer Ali/);
    expect(llms).toContain("https://msameerali.dev/");
    expect(llms).toContain("Deepixel");
    expect(llms).toContain("Invictus");
    expect(llms).toContain("WordWanderer");
    expect(llms).toContain("OptiTrade");
    expect(llms).toContain("InvoiceGen Pro");
    expect(llms).toContain("PhotoStream");
    expect(llms).toContain("SAMIO");
    expect(llms).toContain("Peshawar Civic GIS Atlas");
    expect(llms).toContain("llms-full.txt");

    const llmsFull = fs.readFileSync(llmsFullPath, "utf8");
    expect(llmsFull).toContain("Complete Developer Corpus: Muhammad Sameer Ali");
    expect(llmsFull).toContain("Deepixel — Full-Stack Developer");
    expect(llmsFull).toContain("Invictus — Enterprise AI Deal Intelligence");
    expect(llmsFull).toContain("Server-Sent Events (SSE)");
    expect(llmsFull).toContain("Windows 125% and 150%");
    expect(llmsFull).toContain("Playwright");
    expect(llmsFull).toContain("BSCS");
    expect(llmsFull).toContain("City University");
  });

  it("verifies public/robots.txt includes explicit AI search crawlers and sitemap directive", () => {
    const robotsPath = path.join(publicDir, "robots.txt");
    expect(fs.existsSync(robotsPath)).toBe(true);

    const robots = fs.readFileSync(robotsPath, "utf8");
    expect(robots).toContain("User-agent: Googlebot");
    expect(robots).toContain("User-agent: Bingbot");
    expect(robots).toContain("User-agent: GPTBot");
    expect(robots).toContain("User-agent: OAI-SearchBot");
    expect(robots).toContain("User-agent: ChatGPT-User");
    expect(robots).toContain("User-agent: ClaudeBot");
    expect(robots).toContain("User-agent: PerplexityBot");
    expect(robots).toContain("User-agent: Applebot-Extended");
    expect(robots).toContain("Sitemap: https://msameerali.dev/sitemap.xml");
  });

  it("verifies public/sitemap.xml includes valid XML structure, namespaces, lastmod, changefreq, and priorities", () => {
    const sitemapPath = path.join(publicDir, "sitemap.xml");
    expect(fs.existsSync(sitemapPath)).toBe(true);

    const sitemap = fs.readFileSync(sitemapPath, "utf8");
    expect(sitemap).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
    expect(sitemap).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"');
    expect(sitemap).toContain("<loc>https://msameerali.dev/</loc>");
    expect(sitemap).toContain("<priority>1.0</priority>");
    expect(sitemap).toContain("<lastmod>");
    expect(sitemap).toContain("<changefreq>");

    const expectedProjects = [
      "optitrade",
      "wordwanderer",
      "invoicegen-pro",
      "photostream-snapcloud",
      "samio",
      "peshawar-civic-gis-atlas",
    ];

    for (const proj of expectedProjects) {
      expect(sitemap).toContain(`<loc>https://msameerali.dev/projects/${proj}</loc>`);
    }
  });

  it("verifies pre-rendered dist/ HTML files contain complete Schema.org JSON-LD graphs and pre-rendered body content", () => {
    // Generate fresh static SEO pages
    execSync("node scripts/generate-static-seo-pages.mjs", { cwd: rootDir });

    const distIndexPath = path.join(distDir, "index.html");
    expect(fs.existsSync(distIndexPath)).toBe(true);
    const indexHtml = fs.readFileSync(distIndexPath, "utf8");

    // Check language and alternate headers
    expect(indexHtml).toContain('name="language" content="English"');
    expect(indexHtml).toContain('http-equiv="content-language" content="en-US"');
    expect(indexHtml).toContain('<link rel="alternate" hreflang="en" href="https://msameerali.dev/" />');
    expect(indexHtml).toContain('<link rel="alternate" hreflang="x-default" href="https://msameerali.dev/" />');

    // Extract Schema JSON-LD from index.html
    const schemaMatch = indexHtml.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i);
    expect(schemaMatch).not.toBeNull();
    const schema = JSON.parse(schemaMatch![1]);
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@graph"]).toBeDefined();

    const types = schema["@graph"].map((node: { "@type": string }) => node["@type"]);
    expect(types).toContain("Person");
    expect(types).toContain("WebSite");
    expect(types).toContain("ProfilePage");
    expect(types).toContain("OccupationalExperienceRequirements");
    expect(types).toContain("ItemList");

    // Person schema verification
    const person = schema["@graph"].find((n: { "@type": string }) => n["@type"] === "Person");
    expect(person.name).toBe("Muhammad Sameer Ali");
    expect(person.worksFor.name).toBe("Deepixel");
    expect(person.knowsAbout.length).toBeGreaterThan(5);
    expect(person.sameAs).toContain("https://github.com/SameerAli126");
    expect(person.hasOccupation["@type"]).toBe("Occupation");

    // Pre-rendered body markup inside <div id="root">
    expect(indexHtml).toMatch(/<div id="root">[\s\S]*?<header role="banner"[\s\S]*?<\/div>/);
    expect(indexHtml).toContain('role="main"');
    expect(indexHtml).toContain("Muhammad Sameer Ali — Frontend / Full-Stack Developer");
    expect(indexHtml).toContain("Deepixel");
    expect(indexHtml).toContain("Invictus");

    // Verify static project pages have SoftwareApplication, TechArticle, and BreadcrumbList schemas
    const projectSlugs = [
      "wordwanderer",
      "optitrade",
      "invoicegen-pro",
      "photostream-snapcloud",
      "samio",
      "peshawar-civic-gis-atlas",
    ];

    for (const slug of projectSlugs) {
      const projPath = path.join(distDir, "projects", `${slug}.html`);
      expect(fs.existsSync(projPath)).toBe(true);
      const projHtml = fs.readFileSync(projPath, "utf8");

      const projSchemaMatch = projHtml.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i);
      expect(projSchemaMatch).not.toBeNull();
      const projSchema = JSON.parse(projSchemaMatch![1]);
      const projTypes = projSchema["@graph"].map((node: { "@type": string }) => node["@type"]);

      expect(projTypes).toContain("SoftwareApplication");
      expect(projTypes).toContain("TechArticle");
      expect(projTypes).toContain("BreadcrumbList");

      // Verify pre-rendered body content on project route
      expect(projHtml).toContain('role="article"');
      expect(projHtml).toContain("Technical Case Study");
      expect(projHtml).toContain("Project Specifications");
    }
  });
});
