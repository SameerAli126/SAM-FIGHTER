import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const rootDir = path.resolve(__dirname, "../..");
const publicDir = path.join(rootDir, "public");
const distDir = path.join(rootDir, "dist");

describe("OpenGraph and Social Media Preview Validation", () => {
  it("verifies public/og-image.png exists, is under WhatsApp 300KB limit, and matches 1200x630 dimensions", () => {
    const pngPath = path.join(publicDir, "og-image.png");
    expect(fs.existsSync(pngPath)).toBe(true);

    const stats = fs.statSync(pngPath);
    // WhatsApp crawler limit is strictly under 300KB (307,200 bytes)
    expect(stats.size).toBeLessThan(307_200);
    expect(stats.size).toBeGreaterThan(50_000);

    // Verify PNG header and dimensions (1200x630)
    const buffer = fs.readFileSync(pngPath);
    const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    expect(buffer.subarray(0, 8).equals(pngSignature)).toBe(true);

    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    expect(width).toBe(1200);
    expect(height).toBe(630);
  });

  it("verifies public/og-image.jpg fallback exists and is under WhatsApp 300KB and low-bandwidth limits", () => {
    const jpgPath = path.join(publicDir, "og-image.jpg");
    expect(fs.existsSync(jpgPath)).toBe(true);

    const stats = fs.statSync(jpgPath);
    // Compact JPG under 100KB for low-data messaging clients
    expect(stats.size).toBeLessThan(102_400);
    expect(stats.size).toBeGreaterThan(20_000);

    const buffer = fs.readFileSync(jpgPath);
    expect(buffer[0]).toBe(0xff);
    expect(buffer[1]).toBe(0xd8);
  });

  it("verifies index.html has complete and well-ordered OpenGraph, Twitter, image_src, and crawler tags", () => {
    const indexPath = path.join(rootDir, "index.html");
    const html = fs.readFileSync(indexPath, "utf8");

    // Standard OGP namespace prefix
    expect(html).toContain('prefix="og: http://ogp.me/ns#"');

    // Title & Description
    expect(html).toMatch(/<title>Muhammad Sameer Ali \| Frontend \/ Full-Stack Developer<\/title>/);
    expect(html).toContain('name="title" content="Muhammad Sameer Ali | Frontend / Full-Stack Developer"');
    expect(html).toMatch(/name="description"\s+content="Portfolio of Muhammad Sameer Ali/);

    // Canonical URL and legacy messaging thumbnail
    expect(html).toContain('<link rel="canonical" href="https://msameerali.dev/"');
    expect(html).toContain('<link rel="image_src" href="https://msameerali.dev/og-image.png"');

    // Essential Open Graph Tags (WhatsApp, Facebook, LinkedIn, Discord, Telegram)
    expect(html).toContain('<meta property="og:site_name" content="Muhammad Sameer Ali Portfolio"');
    expect(html).toContain('<meta property="og:type" content="website"');
    expect(html).toContain('<meta property="og:title" content="Muhammad Sameer Ali | Frontend / Full-Stack Developer"');
    expect(html).toContain('property="og:description"');
    expect(html).toContain('<meta property="og:url" content="https://msameerali.dev/"');
    expect(html).toContain('<meta property="og:image" content="https://msameerali.dev/og-image.png"');
    expect(html).toContain('<meta property="og:image:secure_url" content="https://msameerali.dev/og-image.png"');
    expect(html).toContain('<meta property="og:image:type" content="image/png"');
    expect(html).toContain('<meta property="og:image:width" content="1200"');
    expect(html).toContain('<meta property="og:image:height" content="630"');
    expect(html).toContain('property="og:image:alt"');
    expect(html).toContain('<meta property="og:locale" content="en_US"');

    // JPG Fallback for low-bandwidth messaging scrapers
    expect(html).toContain('<meta property="og:image" content="https://msameerali.dev/og-image.jpg"');
    expect(html).toContain('<meta property="og:image:secure_url" content="https://msameerali.dev/og-image.jpg"');
    expect(html).toContain('<meta property="og:image:type" content="image/jpeg"');

    // Essential Twitter / X Cards
    expect(html).toContain('<meta name="twitter:card" content="summary_large_image"');
    expect(html).toContain('<meta name="twitter:site" content="@theUninvited444"');
    expect(html).toContain('<meta name="twitter:creator" content="@theUninvited444"');
    expect(html).toContain('<meta name="twitter:title" content="Muhammad Sameer Ali | Frontend / Full-Stack Developer"');
    expect(html).toContain('name="twitter:description"');
    expect(html).toContain('<meta name="twitter:url" content="https://msameerali.dev/"');
    expect(html).toContain('<meta name="twitter:image" content="https://msameerali.dev/og-image.png"');

    // Verification of tag ordering: OpenGraph tags must appear before font/style imports
    const ogImageIndex = html.indexOf('property="og:image"');
    const fontsIndex = html.indexOf("fonts.googleapis.com");
    expect(ogImageIndex).toBeGreaterThan(0);
    expect(fontsIndex).toBeGreaterThan(0);
    expect(ogImageIndex).toBeLessThan(fontsIndex);
  });

  it("verifies vercel.json includes CORS and caching headers for OpenGraph assets", () => {
    const vercelConfigPath = path.join(rootDir, "vercel.json");
    expect(fs.existsSync(vercelConfigPath)).toBe(true);
    const vercelJson = JSON.parse(fs.readFileSync(vercelConfigPath, "utf8"));

    expect(vercelJson.headers).toBeDefined();
    const ogHeaderRule = vercelJson.headers.find(
      (rule: { source: string }) => rule.source.includes("og-image")
    );
    expect(ogHeaderRule).toBeDefined();

    const headersMap = Object.fromEntries(
      ogHeaderRule.headers.map((h: { key: string; value: string }) => [h.key, h.value])
    );
    expect(headersMap["Access-Control-Allow-Origin"]).toBe("*");
    expect(headersMap["Cache-Control"]).toContain("public");
    expect(headersMap["Cache-Control"]).toContain("max-age=86400");
  });

  it("verifies pre-rendered dist/index.html and all static project routes have raw server-rendered meta tags", () => {
    // Ensure static routes are freshly generated
    execSync("node scripts/generate-static-seo-pages.mjs", { cwd: rootDir });

    const distIndexPath = path.join(distDir, "index.html");

    expect(fs.existsSync(distIndexPath)).toBe(true);
    const distHtml = fs.readFileSync(distIndexPath, "utf8");
    expect(distHtml).toContain('property="og:image" content="https://msameerali.dev/og-image.png"');
    expect(distHtml).toContain('property="og:url" content="https://msameerali.dev/"');
    expect(distHtml).toContain('name="twitter:card" content="summary_large_image"');
    expect(distHtml).toContain('<link rel="image_src" href="https://msameerali.dev/og-image.png"');

    const projectSlugs = [
      "wordwanderer",
      "optitrade",
      "invoicegen-pro",
      "photostream-snapcloud",
      "samio",
      "peshawar-civic-gis-atlas",
    ];

    for (const slug of projectSlugs) {
      const directPath = path.join(distDir, "projects", `${slug}.html`);
      const nestedPath = path.join(distDir, "projects", slug, "index.html");

      expect(fs.existsSync(directPath)).toBe(true);
      expect(fs.existsSync(nestedPath)).toBe(false);

      const directHtml = fs.readFileSync(directPath, "utf8");
      expect(directHtml).toContain('property="og:image" content="https://msameerali.dev/og-image.png"');
      expect(directHtml).toContain(`property="og:url" content="https://msameerali.dev/projects/${slug}"`);
      expect(directHtml).toContain('property="og:type" content="article"');
      expect(directHtml).toContain('<link rel="image_src" href="https://msameerali.dev/og-image.png"');
      expect(directHtml).toContain('prefix="og: http://ogp.me/ns#"');
    }

    const notFoundPath = path.join(distDir, "404.html");
    expect(fs.existsSync(notFoundPath)).toBe(true);
    const notFoundHtml = fs.readFileSync(notFoundPath, "utf8");
    expect(notFoundHtml).toContain('property="og:image" content="https://msameerali.dev/og-image.png"');
    expect(notFoundHtml).toContain('name="robots" content="noindex, nofollow"');
  });
});
