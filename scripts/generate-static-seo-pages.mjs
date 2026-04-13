import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

const SITE = {
  url: "https://msameerali.dev",
  name: "Muhammad Sameer Ali Portfolio",
  defaultImage: "/og-image.png",
  imageAlt: "Muhammad Sameer Ali portfolio preview",
  imageType: "image/png",
  imageWidth: 1200,
  imageHeight: 630,
  twitterHandle: "@theUninvited444",
  defaultKeywords: [
    "Muhammad Sameer Ali",
    "full-stack software engineer",
    "React developer",
    "Next.js developer",
    "TypeScript portfolio",
    "FastAPI developer",
    "Laravel developer",
    "MongoDB",
    "PostgreSQL",
    "software engineer portfolio",
  ],
  person: {
    name: "Muhammad Sameer Ali",
    jobTitle: "Full-Stack Software Engineer",
    github: "https://github.com/SameerAli126",
    linkedin: "https://www.linkedin.com/in/sameerali126",
    x: "https://x.com/theUninvited444",
  },
};

const ROUTES = [
  {
    path: "/",
    title: "Muhammad Sameer Ali | Full-Stack Software Engineer",
    description:
      "Portfolio of Muhammad Sameer Ali, a full-stack software engineer building fast, scalable web products across React, Next.js, FastAPI, Laravel, MongoDB, and PostgreSQL.",
    keywords: [...SITE.defaultKeywords],
    type: "website",
  },
  {
    path: "/projects/wordwanderer",
    title: "WordWanderer | Muhammad Sameer Ali",
    description:
      "WordWanderer is a gamified language-learning platform built with Next.js, TypeScript, Zustand, and MongoDB, focused on progression systems and retention loops.",
    keywords: [...SITE.defaultKeywords, "WordWanderer", "language learning platform", "Next.js project"],
    projectName: "WordWanderer",
    type: "article",
  },
  {
    path: "/projects/optitrade",
    title: "OptiTrade 3.0 | Muhammad Sameer Ali",
    description:
      "OptiTrade 3.0 is a stock trading interface built with Next.js 15, TypeScript, Tailwind CSS, and JWT authentication for portfolio and market workflows.",
    keywords: [...SITE.defaultKeywords, "OptiTrade 3.0", "fintech UX", "stock trading dashboard"],
    projectName: "OptiTrade 3.0",
    type: "article",
  },
  {
    path: "/projects/invoicegen-pro",
    title: "InvoiceGen Pro | Muhammad Sameer Ali",
    description:
      "InvoiceGen Pro is an AI-assisted invoicing platform built with Next.js, Gemini AI, MongoDB, and Stripe for client management and smart invoice workflows.",
    keywords: [...SITE.defaultKeywords, "InvoiceGen Pro", "AI invoicing software", "Gemini AI project"],
    projectName: "InvoiceGen Pro",
    type: "article",
  },
  {
    path: "/projects/photostream-snapcloud",
    title: "PhotoStream / SnapCloud | Muhammad Sameer Ali",
    description:
      "PhotoStream and SnapCloud are two frontend implementations of a cloud-native photo-sharing platform built with React, FastAPI, MongoDB Atlas, and Cloudinary.",
    keywords: [...SITE.defaultKeywords, "PhotoStream", "SnapCloud", "photo sharing platform", "FastAPI project"],
    projectName: "PhotoStream / SnapCloud",
    type: "article",
  },
  {
    path: "/projects/samio",
    title: "SAMIO | Muhammad Sameer Ali",
    description:
      "SAMIO is a local-first personal finance and life-ops dashboard built with Next.js, Prisma, PostgreSQL, and OTP authentication.",
    keywords: [...SITE.defaultKeywords, "SAMIO", "personal finance dashboard", "Prisma PostgreSQL project"],
    projectName: "SAMIO",
    type: "article",
  },
  {
    path: "/projects/peshawar-civic-gis-atlas",
    title: "Peshawar Civic GIS Atlas | Muhammad Sameer Ali",
    description:
      "Peshawar Civic GIS Atlas is a Laravel-based civic GIS platform with Leaflet mapping, dataset ingestion, RBAC, and provenance-aware publishing workflows.",
    keywords: [...SITE.defaultKeywords, "Peshawar Civic GIS Atlas", "Laravel GIS project", "Leaflet civic mapping"],
    projectName: "Peshawar Civic GIS Atlas",
    type: "article",
  },
];

const NOT_FOUND = {
  path: "/404",
  title: "Page Not Found | Muhammad Sameer Ali",
  description: "The requested page could not be found on Muhammad Sameer Ali's portfolio.",
  keywords: [...SITE.defaultKeywords, "404"],
  type: "website",
  noindex: true,
};

function toAbsoluteUrl(value) {
  return new URL(value, `${SITE.url}/`).toString();
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function escapeAttribute(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function upsertMeta(html, attribute, key, content) {
  const tag = `<meta ${attribute}="${key}" content="${escapeAttribute(content)}" />`;
  const pattern = new RegExp(`<meta[^>]*${attribute}=["']${escapeRegExp(key)}["'][^>]*>`, "i");

  if (pattern.test(html)) {
    return html.replace(pattern, tag);
  }

  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function upsertLink(html, rel, href) {
  const tag = `<link rel="${rel}" href="${escapeAttribute(href)}" />`;
  const pattern = new RegExp(`<link[^>]*rel=["']${escapeRegExp(rel)}["'][^>]*>`, "i");

  if (pattern.test(html)) {
    return html.replace(pattern, tag);
  }

  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function upsertStructuredData(html, payload) {
  const tag = `<script type="application/ld+json" data-seo-schema="route">${JSON.stringify(payload)}</script>`;
  const pattern = /<script[^>]*data-seo-schema="route"[^>]*>[\s\S]*?<\/script>/i;

  if (pattern.test(html)) {
    return html.replace(pattern, tag);
  }

  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function buildStructuredData(meta, canonicalUrl, imageUrl) {
  const websiteId = `${SITE.url}/#website`;
  const personId = `${SITE.url}/#person`;
  const webpageId = `${canonicalUrl}#webpage`;
  const pageName = meta.projectName ?? meta.title.replace(/\s+\|\s+Muhammad Sameer Ali$/, "");

  const page = {
    "@type": meta.path === "/" ? "CollectionPage" : "WebPage",
    "@id": webpageId,
    url: canonicalUrl,
    name: meta.title,
    description: meta.description,
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
    inLanguage: "en-US",
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: imageUrl,
      width: SITE.imageWidth,
      height: SITE.imageHeight,
    },
  };

  const graph = [
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: SITE.name,
      url: `${SITE.url}/`,
      inLanguage: "en-US",
    },
    {
      "@type": "Person",
      "@id": personId,
      name: SITE.person.name,
      url: `${SITE.url}/`,
      jobTitle: SITE.person.jobTitle,
      sameAs: [SITE.person.github, SITE.person.linkedin, SITE.person.x],
    },
    page,
  ];

  if (meta.path.startsWith("/projects/")) {
    const projectId = `${canonicalUrl}#project`;

    page.mainEntity = { "@id": projectId };

    graph.push({
      "@type": "CreativeWork",
      "@id": projectId,
      name: pageName,
      description: meta.description,
      author: { "@id": personId },
      creator: { "@id": personId },
      url: canonicalUrl,
      genre: "Software project",
    });

    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
        { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE.url}/#projects` },
        { "@type": "ListItem", position: 3, name: pageName, item: canonicalUrl },
      ],
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

function applySeo(html, meta) {
  const canonicalUrl = toAbsoluteUrl(meta.path);
  const imageUrl = toAbsoluteUrl(SITE.defaultImage);
  const keywords = Array.from(new Set(meta.keywords)).join(", ");

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${meta.title}</title>`);
  html = upsertLink(html, "canonical", canonicalUrl);
  html = upsertMeta(html, "name", "description", meta.description);
  html = upsertMeta(html, "name", "author", SITE.person.name);
  html = upsertMeta(html, "name", "creator", SITE.person.name);
  html = upsertMeta(html, "name", "publisher", SITE.person.name);
  html = upsertMeta(html, "name", "theme-color", "#0c111a");
  html = upsertMeta(html, "name", "robots", meta.noindex ? "noindex, nofollow" : "index, follow");
  html = upsertMeta(html, "name", "keywords", keywords);
  html = upsertMeta(html, "property", "og:site_name", SITE.name);
  html = upsertMeta(html, "property", "og:title", meta.title);
  html = upsertMeta(html, "property", "og:description", meta.description);
  html = upsertMeta(html, "property", "og:type", meta.type);
  html = upsertMeta(html, "property", "og:url", canonicalUrl);
  html = upsertMeta(html, "property", "og:image", imageUrl);
  html = upsertMeta(html, "property", "og:image:secure_url", imageUrl);
  html = upsertMeta(html, "property", "og:image:type", SITE.imageType);
  html = upsertMeta(html, "property", "og:image:width", String(SITE.imageWidth));
  html = upsertMeta(html, "property", "og:image:height", String(SITE.imageHeight));
  html = upsertMeta(html, "property", "og:image:alt", SITE.imageAlt);
  html = upsertMeta(html, "property", "og:locale", "en_US");
  html = upsertMeta(html, "name", "twitter:card", "summary_large_image");
  html = upsertMeta(html, "name", "twitter:site", SITE.twitterHandle);
  html = upsertMeta(html, "name", "twitter:creator", SITE.twitterHandle);
  html = upsertMeta(html, "name", "twitter:title", meta.title);
  html = upsertMeta(html, "name", "twitter:description", meta.description);
  html = upsertMeta(html, "name", "twitter:url", canonicalUrl);
  html = upsertMeta(html, "name", "twitter:image", imageUrl);
  html = upsertMeta(html, "name", "twitter:image:alt", SITE.imageAlt);
  html = upsertStructuredData(html, buildStructuredData(meta, canonicalUrl, imageUrl));

  return html;
}

async function writeRouteHtml(route, baseHtml) {
  const relativePath = route.path === "/" ? "index.html" : `${route.path.replace(/^\//, "")}.html`;
  const filePath = path.join(distDir, relativePath);

  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, applySeo(baseHtml, route), "utf8");
}

async function main() {
  const baseHtml = await readFile(path.join(distDir, "index.html"), "utf8");

  for (const route of ROUTES) {
    await writeRouteHtml(route, baseHtml);
  }

  await writeFile(path.join(distDir, "404.html"), applySeo(baseHtml, NOT_FOUND), "utf8");
}

await main();
