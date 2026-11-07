import fs from "node:fs";
import { copyFile, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
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
  fallbackJpgImage: "/og-image.jpg",
  imageAlt: "Muhammad Sameer Ali | Frontend / Full-Stack Developer Portfolio Preview",
  imageType: "image/png",
  imageWidth: 1200,
  imageHeight: 630,
  twitterHandle: "@theUninvited444",
  locale: "en_US",
  defaultKeywords: [
    "Muhammad Sameer Ali",
    "Frontend / Full-Stack Developer",
    "Deepixel",
    "React developer",
    "Next.js developer",
    "TypeScript portfolio",
    "FastAPI developer",
    "Laravel developer",
    "MongoDB",
    "PostgreSQL",
    "software engineer portfolio",
    "Invictus AI",
    "Generative Engine Optimization",
    "Answer Engine Optimization",
  ],
  person: {
    name: "Muhammad Sameer Ali",
    alternateName: ["Sameer Ali", "SameerAli126"],
    jobTitle: "Frontend / Full-Stack Developer",
    email: "mailto:khsameer626@gmail.com",
    telephone: "+92-335-8181400",
    location: "Peshawar, Pakistan",
    github: "https://github.com/SameerAli126",
    linkedin: "https://www.linkedin.com/in/sameerali126",
    x: "https://x.com/theUninvited444",
    company: "Deepixel",
    companyUrl: "https://deepixel.ai",
    almaMater: "City University of Science and Information Technology",
    almaMaterUrl: "https://cusit.edu.pk",
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "FastAPI",
      "Python",
      "Node.js",
      "Laravel",
      "PHP",
      "PostgreSQL",
      "MongoDB",
      "Prisma ORM",
      "Server-Sent Events (SSE)",
      "Tiptap Editor",
      "Playwright",
      "Docker",
      "Generative Engine Optimization (GEO)",
      "Answer Engine Optimization (AEO)",
      "Core Web Vitals",
      "WCAG 2.2 Accessibility",
    ],
  },
};

const ROUTES = [
  {
    path: "/",
    title: "Muhammad Sameer Ali | Frontend / Full-Stack Developer",
    description:
      "Portfolio of Muhammad Sameer Ali, a frontend-focused full-stack developer building responsive web products with React, Next.js, and TypeScript, delivering enterprise features at Deepixel.",
    keywords: [...SITE.defaultKeywords],
    type: "website",
  },
  {
    path: "/projects/wordwanderer",
    title: "WordWanderer | Muhammad Sameer Ali",
    description:
      "WordWanderer is a gamified language-learning platform built with Next.js, TypeScript, Zustand, and MongoDB, focused on progression systems and retention loops.",
    keywords: [...SITE.defaultKeywords, "WordWanderer", "language learning platform", "Next.js project", "spaced repetition SRS"],
    projectName: "WordWanderer",
    type: "article",
    applicationCategory: "EducationalApplication",
    liveDemo: "https://wordwanderer.vercel.app",
    sourceCode: "https://github.com/SameerAli126/WordWanderer",
    techStack: ["Next.js 14", "TypeScript", "Zustand", "MongoDB Atlas", "Tailwind CSS"],
    impact: "Engineered comprehensive gamification progression logic, spaced repetition algorithms, and retention loops.",
    problemStatement:
      "WordWanderer resolves student attrition in online self-study by synthesizing cognitive spaced repetition (SRS) algorithms with optimistic client state synchronization in Zustand, driving daily lesson completion loops and verifiable pronunciation accuracy.",
    subsystems: [
      { title: "Algorithmic Spaced Repetition (SRS)", desc: "Calculates exponential memory decay curves and intervals based on recall history to optimize vocabulary retention." },
      { title: "Optimistic State & IndexedDB Synchronization", desc: "Zustand client state synchronization backed by MongoDB Atlas aggregation pipelines and offline IndexedDB persistence." },
      { title: "Adaptive Multi-Modal Question Runner", desc: "Interactive exercise engine supporting speech pronunciation confidence scoring, Hanzi stroke order tracing, and sentence synthesis." },
    ],
    faqs: [
      {
        question: "What is the technical architecture of WordWanderer?",
        answer: "WordWanderer is an educational web application architected with Next.js 14, TypeScript, Zustand, and MongoDB Atlas. It features an algorithmic spaced repetition system (SRS) scheduler, optimistic client state synchronization, and offline-first IndexedDB lesson caching.",
      },
      {
        question: "How does WordWanderer handle offline lesson progress?",
        answer: "WordWanderer stores lesson progression and offline exercise submissions in browser IndexedDB. Upon reconnecting, an optimistic background sync queue commits mutations to MongoDB Atlas without interrupting the active audio and quiz runner.",
      },
    ],
  },
  {
    path: "/projects/optitrade",
    title: "OptiTrade 3.0 | Muhammad Sameer Ali",
    description:
      "OptiTrade 3.0 is a stock trading interface built with Next.js 15, TypeScript, Tailwind CSS, and JWT authentication for portfolio and market workflows.",
    keywords: [...SITE.defaultKeywords, "OptiTrade 3.0", "fintech UX", "stock trading dashboard", "TanStack Query"],
    projectName: "OptiTrade 3.0",
    type: "article",
    applicationCategory: "FinanceApplication",
    liveDemo: "https://opti-trade-3-0.vercel.app/",
    sourceCode: "https://github.com/SameerAli126/OptiTrade-3.0",
    techStack: ["Next.js 15", "TypeScript", "Node.js", "PostgreSQL", "TanStack Query", "JWT"],
    impact: "Migrated a React frontend to Next.js, integrating stock APIs into responsive market dashboards with sub-15ms calculations.",
    problemStatement:
      "OptiTrade 3.0 eliminates rendering latency and state desynchronization in volatile stock market dashboards. By combining Next.js 15 with TanStack Query caching, portfolio analytics execute in under 15ms while market watchlists stay consistently synchronized.",
    subsystems: [
      { title: "Sub-15ms Analytics Engine", desc: "High-frequency portfolio calculation computing unrealized P&L, weighted cost bases, and allocation distributions in under 15ms." },
      { title: "Market API Data Pipeline", desc: "Aggressive query caching, stale-while-revalidate policies, and request deduplication via TanStack Query." },
      { title: "Stateless Token Security", desc: "Cryptographically signed JWT authorization with automatic refresh token rotation stored in secure HTTP-only cookies." },
    ],
    faqs: [
      {
        question: "What architectural challenges does OptiTrade 3.0 solve?",
        answer: "OptiTrade 3.0 resolves high-latency rendering and state fragmentation in fintech dashboards. It utilizes Next.js 15, PostgreSQL, and TanStack Query to execute portfolio calculations in under 15ms with seamless real-time market data caching.",
      },
      {
        question: "How does OptiTrade secure financial data and user sessions?",
        answer: "OptiTrade implements stateless JSON Web Token (JWT) authentication combined with cryptographically signed refresh tokens stored in secure, SameSite HTTP-only cookies to prevent cross-site scripting (XSS) and token exfiltration.",
      },
    ],
  },
  {
    path: "/projects/invoicegen-pro",
    title: "InvoiceGen Pro | Muhammad Sameer Ali",
    description:
      "InvoiceGen Pro is an AI-assisted invoicing platform built with Next.js, Gemini AI, MongoDB, and Stripe for client management and smart invoice workflows.",
    keywords: [...SITE.defaultKeywords, "InvoiceGen Pro", "AI invoicing software", "Gemini AI project", "Stripe billing"],
    projectName: "InvoiceGen Pro",
    type: "article",
    applicationCategory: "BusinessApplication",
    liveDemo: "https://invoicegen-pro.netlify.app/",
    sourceCode: "https://github.com/SameerAli126/invoicegen-pro",
    techStack: ["Next.js 15", "Gemini AI", "MongoDB Atlas", "Stripe", "Tailwind CSS"],
    impact: "Integrated Gemini AI for automated invoice drafting, client business card extraction, and payment processing.",
    problemStatement:
      "InvoiceGen Pro streamlines billing operations for freelancers and agencies by transforming unstructured user prompts and receipts into verified, mathematically reconciled invoice drafts using Google Gemini AI, backed by automated Stripe payment settlement.",
    subsystems: [
      { title: "Gemini AI Parsing Pipeline", desc: "Multimodal prompt processing extracting structured line items, currency symbols, and client details from unstructured text and images." },
      { title: "Stripe Payment Gateway", desc: "Automated checkout session creation and asynchronous webhook processing for immediate invoice status updates." },
      { title: "High-Fidelity PDF Generation", desc: "Client-side and server-side PDF compilation producing standardized, branded invoices with payment QR codes." },
    ],
    faqs: [
      {
        question: "How does InvoiceGen Pro utilize Gemini AI?",
        answer: "InvoiceGen Pro utilizes Google's Gemini AI to parse unstructured user prompts, client business cards, and receipt images into line-itemized, mathematically verified invoice drafts with automatic currency detection and tax calculations.",
      },
      {
        question: "How are payments and financial transactions processed?",
        answer: "The platform integrates Stripe checkout sessions and asynchronous webhooks, automatically marking invoices as paid and updating client accounts receivable in MongoDB Atlas upon successful payment confirmation.",
      },
    ],
  },
  {
    path: "/projects/photostream-snapcloud",
    title: "PhotoStream / SnapCloud | Muhammad Sameer Ali",
    description:
      "PhotoStream and SnapCloud are two frontend implementations of a cloud-native photo-sharing platform built with React, FastAPI, MongoDB Atlas, and Cloudinary.",
    keywords: [...SITE.defaultKeywords, "PhotoStream", "SnapCloud", "photo sharing platform", "FastAPI project", "Cloudinary CDN"],
    projectName: "PhotoStream / SnapCloud",
    type: "article",
    applicationCategory: "MultimediaApplication",
    liveDemo: "https://portfolio.tail81be07.ts.net",
    sourceCode: "https://github.com/SameerAli126/PhotoStream",
    techStack: ["React", "TypeScript", "Vite", "FastAPI", "MongoDB Atlas", "Cloudinary"],
    impact: "Handled photo uploads, search, and social interactions with Cloudinary media delivery and MongoDB Atlas metadata persistence.",
    problemStatement:
      "PhotoStream and SnapCloud solve high-concurrency media ingestion and viewing across disparate devices by providing specialized desktop and mobile clients powered by a unified asynchronous Python FastAPI microservice and Cloudinary edge CDN.",
    subsystems: [
      { title: "FastAPI Asynchronous Microservice", desc: "Non-blocking Python service handling chunked image streaming, EXIF metadata extraction, and tag-based search." },
      { title: "Edge CDN Media Delivery", desc: "Cloudinary CDN integration with automatic WebP conversion, responsive sizing, and edge-cached asset delivery." },
      { title: "Dual Specialized Frontend Architectures", desc: "Desktop photography atelier showcasing high-res galleries alongside a touch-optimized mobile social feed." },
    ],
    faqs: [
      {
        question: "Why does the platform maintain dual frontend implementations?",
        answer: "PhotoStream provides a desktop atelier optimized for high-resolution photo portfolios, while SnapCloud delivers a touch-optimized social feed. Both applications interface with a shared asynchronous FastAPI backend service.",
      },
      {
        question: "How is image processing and media delivery optimized?",
        answer: "Uploaded images are dispatched to an asynchronous FastAPI microservice that extracts EXIF metadata before streaming assets to Cloudinary for on-the-fly WebP conversion and CDN distribution.",
      },
    ],
  },
  {
    path: "/projects/samio",
    title: "SAMIO | Muhammad Sameer Ali",
    description:
      "SAMIO is a local-first personal finance and life-ops dashboard built with Next.js, Prisma, PostgreSQL, and OTP authentication.",
    keywords: [...SITE.defaultKeywords, "SAMIO", "personal finance dashboard", "Prisma PostgreSQL project", "OTP authentication"],
    projectName: "SAMIO",
    type: "article",
    applicationCategory: "FinanceApplication",
    liveDemo: "https://portfolio.tail81be07.ts.net:8443/login",
    sourceCode: "https://github.com/SameerAli126/SAMIO",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma ORM", "PostgreSQL"],
    impact: "Built relational PostgreSQL schemas with Prisma ORM, financial transaction integrity, and administrative CRUD workflows.",
    problemStatement:
      "SAMIO addresses personal privacy and financial data fragmentation by offering a local-first personal operations dashboard with passwordless authentication, strict relational database constraints, and zero-lock-in data export capabilities.",
    subsystems: [
      { title: "Passwordless OTP Authentication", desc: "Secure email One-Time Password verification generating cryptographically signed, tamper-resistant session cookies." },
      { title: "Relational Schema Integrity", desc: "Normalized PostgreSQL models managed via Prisma ORM with foreign key cascades governing income, expenses, and recurring budgets." },
      { title: "Zero-Lock-In Export Engine", desc: "Client-side compilation enabling instantaneous one-click CSV and JSON data export for complete user financial ownership." },
    ],
    faqs: [
      {
        question: "What security architecture is implemented in SAMIO?",
        answer: "SAMIO features passwordless One-Time Password (OTP) verification sent via email, creating cryptographically signed session tokens and eliminating password reuse vulnerabilities.",
      },
      {
        question: "How is financial data modeled and protected in SAMIO?",
        answer: "SAMIO uses Prisma ORM to interface with PostgreSQL, enforcing strict foreign key constraints, cascaded deletions, and atomic transactions across accounts, expenses, and recurring budgets.",
      },
    ],
  },
  {
    path: "/projects/peshawar-civic-gis-atlas",
    title: "Peshawar Civic GIS Atlas | Muhammad Sameer Ali",
    description:
      "Peshawar Civic GIS Atlas is a Laravel-based civic GIS platform with Leaflet mapping, dataset ingestion, RBAC, and provenance-aware publishing workflows.",
    keywords: [...SITE.defaultKeywords, "Peshawar Civic GIS Atlas", "Laravel GIS project", "Leaflet civic mapping", "spatial data"],
    projectName: "Peshawar Civic GIS Atlas",
    type: "article",
    applicationCategory: "UtilitiesApplication",
    liveDemo: "https://portfolio.tail81be07.ts.net:10000",
    sourceCode: "https://github.com/SameerAli126/PCA",
    techStack: ["Laravel", "PHP", "Leaflet", "MariaDB"],
    impact: "Shipped an open civic data operations platform with genuine ingestion pipelines and geospatial facility mapping.",
    problemStatement:
      "Peshawar Civic GIS Atlas solves municipal information opacity by offering an open civic geospatial mapping platform that validates, catalogs, and visualizes urban infrastructure and public services across Peshawar.",
    subsystems: [
      { title: "Leaflet Geospatial Mapping Engine", desc: "Interactive vector tiles and marker clustering visualizing schools, clinics, and municipal utilities across Peshawar districts." },
      { title: "Administrative Ingestion Pipeline", desc: "Dataset parsing tools verifying CSV and GeoJSON coordinate bounds, checking geocoding precision, and logging provenance." },
      { title: "Multi-Tier Role-Based Publishing", desc: "Granular Laravel authorization dividing public map exploration, surveyor field submissions, and administrative publication approvals." },
    ],
    faqs: [
      {
        question: "What is the mission of the Peshawar Civic GIS Atlas?",
        answer: "Peshawar Civic GIS Atlas provides open civic transparency by cataloging municipal infrastructure, public facilities, and health centers on interactive Leaflet maps across Peshawar.",
      },
      {
        question: "How does the dataset ingestion pipeline ensure data integrity?",
        answer: "The platform features an administrative ingestion pipeline that validates CSV and GeoJSON uploads, verifying bounding boxes, geocoding validity, and recording audit logs before publishing.",
      },
    ],
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

function upsertLink(html, rel, href, extraAttrs = "") {
  const extra = extraAttrs ? ` ${extraAttrs}` : "";
  const tag = `<link rel="${rel}" href="${escapeAttribute(href)}"${extra} />`;
  const pattern = new RegExp(`<link[^>]*rel=["']${escapeRegExp(rel)}["'][^>]*${escapeRegExp(href)}["'][^>]*>`, "i");

  if (pattern.test(html)) {
    return html;
  }

  const barePattern = new RegExp(`<link[^>]*rel=["']${escapeRegExp(rel)}["'][^>]*>`, "i");
  if (rel === "canonical" && barePattern.test(html)) {
    return html.replace(barePattern, tag);
  }

  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function upsertAlternateLink(html, hreflang, href) {
  const tag = `<link rel="alternate" hreflang="${hreflang}" href="${escapeAttribute(href)}" />`;
  const pattern = new RegExp(`<link[^>]*rel=["']alternate["'][^>]*hreflang=["']${escapeRegExp(hreflang)}["'][^>]*>`, "i");

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

function buildComprehensiveGraph(meta, canonicalUrl, imageUrl) {
  const websiteId = `${SITE.url}/#website`;
  const personId = `${SITE.url}/#person`;
  const experienceReqId = `${SITE.url}/#experience-requirements`;
  const projectListId = `${SITE.url}/#project-list`;
  const webpageId = `${canonicalUrl}#webpage`;
  const pageName = meta.projectName ?? meta.title.replace(/\s+\|\s+Muhammad Sameer Ali$/, "");

  const person = {
    "@type": "Person",
    "@id": personId,
    name: SITE.person.name,
    alternateName: SITE.person.alternateName,
    url: `${SITE.url}/`,
    image: imageUrl,
    jobTitle: SITE.person.jobTitle,
    description:
      "Frontend-focused full-stack developer with 3+ years of commercial experience building responsive web products with React, Next.js, and TypeScript, delivering enterprise features at Deepixel.",
    email: SITE.person.email,
    telephone: SITE.person.telephone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Peshawar",
      addressCountry: "PK",
    },
    worksFor: {
      "@type": "Organization",
      "@id": `${SITE.person.companyUrl}#organization`,
      name: SITE.person.company,
      url: SITE.person.companyUrl,
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      "@id": `${SITE.person.almaMaterUrl}#organization`,
      name: SITE.person.almaMater,
      url: SITE.person.almaMaterUrl,
    },
    hasOccupation: {
      "@type": "Occupation",
      name: "Frontend / Full-Stack Developer",
      occupationLocation: {
        "@type": "AdministrativeArea",
        name: "Remote / Hybrid / Pakistan",
      },
      skills: SITE.person.skills.join(", "),
      experienceRequirements: {
        "@id": experienceReqId,
      },
    },
    knowsAbout: SITE.person.skills,
    sameAs: [SITE.person.github, SITE.person.linkedin, SITE.person.x],
  };

  const website = {
    "@type": "WebSite",
    "@id": websiteId,
    name: SITE.name,
    url: `${SITE.url}/`,
    inLanguage: "en-US",
    description:
      "Official engineering portfolio of Muhammad Sameer Ali, Frontend / Full-Stack Developer showcasing enterprise platforms, open-source architectures, and interactive 3D web systems.",
    publisher: { "@id": personId },
  };

  const experienceRequirements = {
    "@type": "OccupationalExperienceRequirements",
    "@id": experienceReqId,
    name: "Frontend / Full-Stack Software Engineering Experience",
    description:
      "3+ years commercial software engineering experience spanning enterprise SaaS at Deepixel, reactive frontend architecture in React/Next.js/TypeScript, streaming SSE workflows, and full-stack backend services in Python, Node.js, and Laravel.",
    monthsOfExperience: 36,
  };

  const projectList = {
    "@type": "ItemList",
    "@id": projectListId,
    name: "Featured Software Engineering Projects by Muhammad Sameer Ali",
    description:
      "Curated catalog of production software applications, SaaS platforms, and open-source systems developed by Muhammad Sameer Ali.",
    numberOfItems: 6,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Invictus (Deepixel)",
        item: `${SITE.url}/#experience`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "WordWanderer",
        item: `${SITE.url}/projects/wordwanderer`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "OptiTrade 3.0",
        item: `${SITE.url}/projects/optitrade`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "InvoiceGen Pro",
        item: `${SITE.url}/projects/invoicegen-pro`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "PhotoStream / SnapCloud",
        item: `${SITE.url}/projects/photostream-snapcloud`,
      },
      {
        "@type": "ListItem",
        position: 6,
        name: "SAMIO",
        item: `${SITE.url}/projects/samio`,
      },
    ],
  };

  const page = {
    "@type": meta.path === "/" ? "ProfilePage" : "WebPage",
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

  if (meta.path === "/") {
    page.mainEntity = { "@id": personId };
  }

  const graph = [website, person, experienceRequirements, projectList, page];

  if (meta.path === "/") {
    graph.push({
      "@type": "FAQPage",
      "@id": `${SITE.url}/#faq`,
      name: "Frequently Asked Questions About Muhammad Sameer Ali",
      mainEntity: [
        {
          "@type": "Question",
          name: "Who is Muhammad Sameer Ali?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Muhammad Sameer Ali is a frontend-focused full-stack developer with 3+ years of commercial experience building responsive web products with React, Next.js, and TypeScript, delivering enterprise features at Deepixel.",
          },
        },
        {
          "@type": "Question",
          name: "What enterprise features has Muhammad Sameer Ali developed at Deepixel?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "At Deepixel, Sameer engineered core features for Invictus (an AI deal intelligence platform), including Server-Sent Events (SSE) streaming reports, responsive mobile PWA shell, Tiptap document table editing, Windows 125%/150% display scaling, and 21 automated Playwright test suites.",
          },
        },
        {
          "@type": "Question",
          name: "What is Muhammad Sameer Ali's core technology stack?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sameer specializes in React.js, Next.js, TypeScript, Tailwind CSS, Python (FastAPI), Node.js, Express, PHP (Laravel), PostgreSQL, MongoDB Atlas, Prisma ORM, Server-Sent Events (SSE), Docker, Playwright, and Vitest.",
          },
        },
        {
          "@type": "Question",
          name: "What software projects has Muhammad Sameer Ali engineered?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "His featured production projects include Invictus (enterprise AI deal platform), WordWanderer (gamified language learning with SRS), OptiTrade 3.0 (high-frequency stock trading dashboard), InvoiceGen Pro (AI invoicing with Stripe), PhotoStream / SnapCloud (FastAPI media platform), SAMIO (personal finance dashboard), and Peshawar Civic GIS Atlas (Laravel GIS).",
          },
        },
        {
          "@type": "Question",
          name: "How can you contact or hire Muhammad Sameer Ali?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can reach Muhammad Sameer Ali via email at khsameer626@gmail.com, phone at +92 335 8181400, on GitHub at github.com/SameerAli126, LinkedIn at linkedin.com/in/sameerali126, or download his CV at msameerali.dev/muhammad-sameer-ali-cv.pdf.",
          },
        },
      ],
    });
  }

  if (meta.path.startsWith("/projects/")) {
    const projectId = `${canonicalUrl}#softwareapplication`;
    const techArticleId = `${canonicalUrl}#techarticle`;
    const breadcrumbsId = `${canonicalUrl}#breadcrumbs`;
    const faqId = `${canonicalUrl}#faq`;

    page.mainEntity = { "@id": projectId };

    graph.push({
      "@type": "SoftwareApplication",
      "@id": projectId,
      name: pageName,
      description: meta.description,
      applicationCategory: meta.applicationCategory || "BusinessApplication",
      operatingSystem: "Web Browser",
      url: meta.liveDemo || canonicalUrl,
      author: { "@id": personId },
      creator: { "@id": personId },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    });

    graph.push({
      "@type": "TechArticle",
      "@id": techArticleId,
      headline: `${pageName}: Technical Architecture & Engineering Case Study`,
      name: `${pageName} Technical Case Study`,
      description: meta.description,
      author: { "@id": personId },
      publisher: { "@id": personId },
      mainEntityOfPage: { "@id": webpageId },
      about: { "@id": projectId },
      inLanguage: "en-US",
      proficiencyLevel: "Expert",
      dependencies: meta.techStack ? meta.techStack.join(", ") : "React, TypeScript",
    });

    graph.push({
      "@type": "BreadcrumbList",
      "@id": breadcrumbsId,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
        { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE.url}/#projects` },
        { "@type": "ListItem", position: 3, name: pageName, item: canonicalUrl },
      ],
    });

    const projectFaqs = meta.faqs && meta.faqs.length > 0
      ? meta.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.answer,
          },
        }))
      : [
          {
            "@type": "Question",
            name: `What architectural challenges does ${pageName} solve?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `${pageName} is engineered to deliver high-performance, resilient user workflows, addressing state synchronization, responsive scaling, and low-latency interaction.`,
            },
          },
          {
            "@type": "Question",
            name: `Who engineered ${pageName}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `${pageName} was architected and developed by Muhammad Sameer Ali, a frontend-focused full-stack developer with 3+ years of commercial software engineering experience.`,
            },
          },
        ];

    graph.push({
      "@type": "FAQPage",
      "@id": faqId,
      name: `Frequently Asked Technical Questions About ${pageName}`,
      mainEntity: projectFaqs,
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

function renderPreRenderedBody(route) {
  if (route.path === "/") {
    return `
    <header role="banner" style="position:relative;padding:1.5rem 1rem;border-bottom:1px solid rgba(255,255,255,0.1);">
      <nav aria-label="Primary Navigation" style="max-width:1200px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">
        <a href="/" style="font-weight:700;font-size:1.25rem;color:#ffffff;text-decoration:none;">Muhammad Sameer Ali</a>
        <div style="display:flex;gap:1.5rem;flex-wrap:wrap;">
          <a href="#experience" style="color:#94a3b8;text-decoration:none;">Experience</a>
          <a href="#projects" style="color:#94a3b8;text-decoration:none;">Projects</a>
          <a href="#creative-lab" style="color:#94a3b8;text-decoration:none;">Creative Lab</a>
          <a href="#skills" style="color:#94a3b8;text-decoration:none;">Skills</a>
          <a href="#about" style="color:#94a3b8;text-decoration:none;">About</a>
          <a href="#faq" style="color:#94a3b8;text-decoration:none;">FAQ</a>
          <a href="#contact" style="color:#94a3b8;text-decoration:none;">Contact</a>
          <a href="/muhammad-sameer-ali-cv.pdf" target="_blank" rel="noreferrer" style="color:#38bdf8;text-decoration:none;font-weight:600;">Download CV</a>
        </div>
      </nav>
    </header>

    <main id="main-content" role="main" style="max-width:1200px;margin:0 auto;padding:2rem 1rem;">
      <section id="hero" aria-labelledby="hero-heading" style="padding:3rem 0;border-bottom:1px solid rgba(255,255,255,0.08);">
        <h1 id="hero-heading" style="font-size:2.5rem;font-weight:800;color:#ffffff;line-height:1.2;margin-bottom:1rem;">
          Muhammad Sameer Ali — Frontend / Full-Stack Developer
        </h1>
        <p style="font-size:1.15rem;color:#cbd5e1;line-height:1.7;max-width:850px;margin-bottom:1.5rem;">
          Muhammad Sameer Ali is a frontend-focused full-stack developer building responsive web products with React, Next.js, and TypeScript, backed by Python and Node.js backend services. At Deepixel, he delivers core user-facing and workflow features for Invictus, an AI deal intelligence platform.
        </p>
        <div style="display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:2rem;">
          <a href="#contact" style="background:#0284c7;color:#ffffff;padding:0.75rem 1.5rem;border-radius:0.5rem;text-decoration:none;font-weight:600;">Contact Sameer</a>
          <a href="#projects" style="border:1px solid rgba(255,255,255,0.2);color:#ffffff;padding:0.75rem 1.5rem;border-radius:0.5rem;text-decoration:none;font-weight:600;">Explore Projects</a>
          <a href="/llms.txt" style="border:1px solid #38bdf8;color:#38bdf8;padding:0.75rem 1.5rem;border-radius:0.5rem;text-decoration:none;font-weight:600;">View llms.txt (AI Specification)</a>
        </div>
        <table style="width:100%;max-width:600px;border-collapse:collapse;margin-top:1rem;color:#94a3b8;font-size:0.95rem;">
          <tbody>
            <tr><td style="padding:0.5rem 0;font-weight:600;color:#f8fafc;">Commercial Experience:</td><td style="padding:0.5rem 0;">3+ Years (Full-Stack &amp; Enterprise SaaS)</td></tr>
            <tr><td style="padding:0.5rem 0;font-weight:600;color:#f8fafc;">Flagship Role:</td><td style="padding:0.5rem 0;">Full-Stack Developer at Deepixel (Invictus Platform)</td></tr>
            <tr><td style="padding:0.5rem 0;font-weight:600;color:#f8fafc;">Core Tech Stack:</td><td style="padding:0.5rem 0;">React, Next.js, TypeScript, Tailwind CSS, Python, FastAPI, PostgreSQL</td></tr>
            <tr><td style="padding:0.5rem 0;font-weight:600;color:#f8fafc;">Education:</td><td style="padding:0.5rem 0;">BS Computer Science, City University (GPA 3.51/4.00)</td></tr>
          </tbody>
        </table>
      </section>

      <section id="experience" aria-labelledby="experience-heading" style="padding:3rem 0;border-bottom:1px solid rgba(255,255,255,0.08);">
        <h2 id="experience-heading" style="font-size:2rem;font-weight:700;color:#ffffff;margin-bottom:1rem;">
          Flagship Enterprise Experience — Deepixel
        </h2>
        <p style="color:#94a3b8;font-size:1.05rem;line-height:1.6;margin-bottom:1.5rem;">
          <strong>Role:</strong> Full-Stack Developer | <strong>Period:</strong> April 2026 – Present | <strong>Platform:</strong> Invictus — AI Deal Intelligence and Reporting Platform
        </p>
        <ul style="color:#cbd5e1;line-height:1.8;padding-left:1.5rem;">
          <li>Engineered an interactive AI report workspace with Server-Sent Events (SSE) streaming progress, user clarification prompts, timeout recovery, and saved deal context.</li>
          <li>Built a responsive mobile shell with bottom navigation and Progressive Web App (PWA) setup, resolving standalone login persistence.</li>
          <li>Stabilized Tiptap table editing by fixing stale-state overwrites, table parsing, and nested-table insertion for PDF/DOCX exports.</li>
          <li>Developed automatic display scaling for Windows 125% and 150% settings plus a saved user control for dense laptop screens.</li>
          <li>Audited 21 application views across four viewport sizes using automated Playwright tests and delivered 17 report-flow utility modules.</li>
          <li>Supported local development with Docker startup scripts, health checks, and service orchestration.</li>
        </ul>
      </section>

      <section id="projects" aria-labelledby="projects-heading" style="padding:3rem 0;border-bottom:1px solid rgba(255,255,255,0.08);">
        <h2 id="projects-heading" style="font-size:2rem;font-weight:700;color:#ffffff;margin-bottom:1.5rem;">
          Featured Production Projects &amp; Architectures
        </h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:1.5rem;">
          <article style="border:1px solid rgba(255,255,255,0.1);padding:1.5rem;border-radius:0.75rem;background:rgba(255,255,255,0.02);">
            <h3 style="font-size:1.35rem;color:#38bdf8;margin-bottom:0.5rem;"><a href="/projects/wordwanderer" style="color:#38bdf8;text-decoration:none;">WordWanderer</a></h3>
            <p style="color:#94a3b8;font-size:0.95rem;line-height:1.6;margin-bottom:1rem;">Gamified language-learning platform with spaced repetition (SRS), lesson progression loops, streaks, and pronunciation feedback.</p>
            <p style="color:#cbd5e1;font-size:0.85rem;"><strong>Stack:</strong> Next.js 14, TypeScript, Zustand, MongoDB, Tailwind CSS</p>
          </article>
          <article style="border:1px solid rgba(255,255,255,0.1);padding:1.5rem;border-radius:0.75rem;background:rgba(255,255,255,0.02);">
            <h3 style="font-size:1.35rem;color:#38bdf8;margin-bottom:0.5rem;"><a href="/projects/optitrade" style="color:#38bdf8;text-decoration:none;">OptiTrade 3.0</a></h3>
            <p style="color:#94a3b8;font-size:0.95rem;line-height:1.6;margin-bottom:1rem;">High-frequency stock market and portfolio tracking dashboard with sub-15ms calculations, watchlists, and JWT authorization.</p>
            <p style="color:#cbd5e1;font-size:0.85rem;"><strong>Stack:</strong> Next.js 15, TypeScript, Node.js, PostgreSQL, TanStack Query</p>
          </article>
          <article style="border:1px solid rgba(255,255,255,0.1);padding:1.5rem;border-radius:0.75rem;background:rgba(255,255,255,0.02);">
            <h3 style="font-size:1.35rem;color:#38bdf8;margin-bottom:0.5rem;"><a href="/projects/invoicegen-pro" style="color:#38bdf8;text-decoration:none;">InvoiceGen Pro</a></h3>
            <p style="color:#94a3b8;font-size:0.95rem;line-height:1.6;margin-bottom:1rem;">AI-assisted invoicing platform with Gemini AI automation, MongoDB Atlas persistence, Stripe payments, and automated PDF export.</p>
            <p style="color:#cbd5e1;font-size:0.85rem;"><strong>Stack:</strong> Next.js 15, Gemini AI, MongoDB, Stripe</p>
          </article>
          <article style="border:1px solid rgba(255,255,255,0.1);padding:1.5rem;border-radius:0.75rem;background:rgba(255,255,255,0.02);">
            <h3 style="font-size:1.35rem;color:#38bdf8;margin-bottom:0.5rem;"><a href="/projects/photostream-snapcloud" style="color:#38bdf8;text-decoration:none;">PhotoStream / SnapCloud</a></h3>
            <p style="color:#94a3b8;font-size:0.95rem;line-height:1.6;margin-bottom:1rem;">Cloud-native photo-sharing media platform with dual React frontends, high-performance FastAPI service, and Cloudinary CDN.</p>
            <p style="color:#cbd5e1;font-size:0.85rem;"><strong>Stack:</strong> React, TypeScript, FastAPI, MongoDB Atlas, Cloudinary</p>
          </article>
          <article style="border:1px solid rgba(255,255,255,0.1);padding:1.5rem;border-radius:0.75rem;background:rgba(255,255,255,0.02);">
            <h3 style="font-size:1.35rem;color:#38bdf8;margin-bottom:0.5rem;"><a href="/projects/samio" style="color:#38bdf8;text-decoration:none;">SAMIO</a></h3>
            <p style="color:#94a3b8;font-size:0.95rem;line-height:1.6;margin-bottom:1rem;">Local-first personal finance and life operations platform with OTP authentication, Prisma ORM, and PostgreSQL data persistence.</p>
            <p style="color:#cbd5e1;font-size:0.85rem;"><strong>Stack:</strong> Next.js, TypeScript, Tailwind CSS, Prisma, PostgreSQL</p>
          </article>
          <article style="border:1px solid rgba(255,255,255,0.1);padding:1.5rem;border-radius:0.75rem;background:rgba(255,255,255,0.02);">
            <h3 style="font-size:1.35rem;color:#38bdf8;margin-bottom:0.5rem;"><a href="/projects/peshawar-civic-gis-atlas" style="color:#38bdf8;text-decoration:none;">Peshawar Civic GIS Atlas</a></h3>
            <p style="color:#94a3b8;font-size:0.95rem;line-height:1.6;margin-bottom:1rem;">Civic GIS mapping platform built with Laravel, PHP, Leaflet, and MariaDB for public facility geolocation and spatial dataset ingestion.</p>
            <p style="color:#cbd5e1;font-size:0.85rem;"><strong>Stack:</strong> Laravel, PHP, Leaflet, MariaDB</p>
          </article>
        </div>
      </section>

      <section id="skills" aria-labelledby="skills-heading" style="padding:3rem 0;border-bottom:1px solid rgba(255,255,255,0.08);">
        <h2 id="skills-heading" style="font-size:2rem;font-weight:700;color:#ffffff;margin-bottom:1rem;">Technical Skills &amp; Stack</h2>
        <p style="color:#cbd5e1;line-height:1.8;">
          <strong>Frontend:</strong> React.js, Next.js, TypeScript, JavaScript (ESNext), Tailwind CSS, Framer Motion, Radix UI, TanStack Query, Zustand.<br />
          <strong>Backend &amp; APIs:</strong> Node.js, Express.js, Python, FastAPI, PHP, Laravel, Server-Sent Events (SSE), WebSockets, REST.<br />
          <strong>Databases:</strong> PostgreSQL, MongoDB Atlas, MariaDB, Prisma ORM, Mongoose.<br />
          <strong>Testing &amp; Tooling:</strong> Playwright, Vitest, Jest, Docker, Git, GitHub Actions, Vite, Vercel.<br />
          <strong>Optimization:</strong> Generative Engine Optimization (GEO), Answer Engine Optimization (AEO), Schema.org JSON-LD Graphs, Core Web Vitals.
        </p>
      </section>

      <section id="faq" aria-labelledby="faq-heading" style="padding:3rem 0;border-bottom:1px solid rgba(255,255,255,0.08);">
        <h2 id="faq-heading" style="font-size:2rem;font-weight:700;color:#ffffff;margin-bottom:1.5rem;">
          Frequently Asked Questions &amp; Architectural Answers
        </h2>
        <div style="display:flex;flex-direction:column;gap:1.5rem;">
          <article style="border:1px solid rgba(255,255,255,0.1);padding:1.5rem;border-radius:0.75rem;background:rgba(255,255,255,0.02);">
            <h3 style="font-size:1.25rem;color:#38bdf8;margin-bottom:0.5rem;">Who is Muhammad Sameer Ali?</h3>
            <p style="color:#cbd5e1;line-height:1.7;">
              Muhammad Sameer Ali is a frontend-focused full-stack developer with over 3 years of commercial experience building high-performance web products with React, Next.js, and TypeScript, delivering enterprise features at Deepixel.
            </p>
          </article>
          <article style="border:1px solid rgba(255,255,255,0.1);padding:1.5rem;border-radius:0.75rem;background:rgba(255,255,255,0.02);">
            <h3 style="font-size:1.25rem;color:#38bdf8;margin-bottom:0.5rem;">What enterprise features has Muhammad Sameer Ali developed at Deepixel?</h3>
            <p style="color:#cbd5e1;line-height:1.7;">
              At Deepixel, Sameer engineered core features for Invictus (an AI deal intelligence platform), including Server-Sent Events (SSE) streaming reports, responsive mobile PWA shell, Tiptap document table editing, Windows 125%/150% display scaling, and 21 automated Playwright test suites.
            </p>
          </article>
          <article style="border:1px solid rgba(255,255,255,0.1);padding:1.5rem;border-radius:0.75rem;background:rgba(255,255,255,0.02);">
            <h3 style="font-size:1.25rem;color:#38bdf8;margin-bottom:0.5rem;">What is Muhammad Sameer Ali's core technology stack?</h3>
            <p style="color:#cbd5e1;line-height:1.7;">
              Sameer specializes in React.js, Next.js, TypeScript, Tailwind CSS, Python (FastAPI), Node.js, Express, PHP (Laravel), PostgreSQL, MongoDB Atlas, Prisma ORM, Server-Sent Events (SSE), Docker, Playwright, and Vitest.
            </p>
          </article>
          <article style="border:1px solid rgba(255,255,255,0.1);padding:1.5rem;border-radius:0.75rem;background:rgba(255,255,255,0.02);">
            <h3 style="font-size:1.25rem;color:#38bdf8;margin-bottom:0.5rem;">What software projects has Muhammad Sameer Ali engineered?</h3>
            <p style="color:#cbd5e1;line-height:1.7;">
              His featured production projects include Invictus (enterprise AI deal platform), WordWanderer (gamified language learning with SRS), OptiTrade 3.0 (high-frequency stock trading dashboard), InvoiceGen Pro (AI invoicing with Stripe), PhotoStream / SnapCloud (FastAPI media platform), SAMIO (personal finance dashboard), and Peshawar Civic GIS Atlas (Laravel GIS).
            </p>
          </article>
          <article style="border:1px solid rgba(255,255,255,0.1);padding:1.5rem;border-radius:0.75rem;background:rgba(255,255,255,0.02);">
            <h3 style="font-size:1.25rem;color:#38bdf8;margin-bottom:0.5rem;">How can you contact or hire Muhammad Sameer Ali?</h3>
            <p style="color:#cbd5e1;line-height:1.7;">
              You can reach Muhammad Sameer Ali via email at khsameer626@gmail.com, phone at +92 335 8181400, on GitHub at github.com/SameerAli126, LinkedIn at linkedin.com/in/sameerali126, or download his CV at msameerali.dev/muhammad-sameer-ali-cv.pdf.
            </p>
          </article>
        </div>
      </section>

      <section id="contact" aria-labelledby="contact-heading" style="padding:3rem 0;">
        <h2 id="contact-heading" style="font-size:2rem;font-weight:700;color:#ffffff;margin-bottom:1rem;">Connect with Sameer</h2>
        <p style="color:#cbd5e1;line-height:1.8;">
          Email: <a href="mailto:khsameer626@gmail.com" style="color:#38bdf8;">khsameer626@gmail.com</a> |
          Phone: <a href="tel:+923358181400" style="color:#38bdf8;">+92 335 8181400</a> |
          GitHub: <a href="https://github.com/SameerAli126" target="_blank" rel="noreferrer" style="color:#38bdf8;">github.com/SameerAli126</a> |
          LinkedIn: <a href="https://www.linkedin.com/in/sameerali126" target="_blank" rel="noreferrer" style="color:#38bdf8;">linkedin.com/in/sameerali126</a> |
          X / Twitter: <a href="https://x.com/theUninvited444" target="_blank" rel="noreferrer" style="color:#38bdf8;">@theUninvited444</a>
        </p>
      </section>
    </main>

    <footer role="contentinfo" style="border-top:1px solid rgba(255,255,255,0.1);padding:2rem 1rem;text-align:center;color:#64748b;font-size:0.9rem;">
      <p>&copy; 2026 Muhammad Sameer Ali. Architecting resilient, high-performance web systems. All rights reserved.</p>
    </footer>
    `;
  }

  // Pre-rendered project page body
  const techList = route.techStack ? route.techStack.join(" • ") : "React, Next.js, TypeScript";
  return `
    <header role="banner" style="position:relative;padding:1.5rem 1rem;border-bottom:1px solid rgba(255,255,255,0.1);">
      <nav aria-label="Breadcrumb Navigation" style="max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:0.5rem;font-size:0.95rem;">
        <a href="/" style="color:#38bdf8;text-decoration:none;">Home</a>
        <span style="color:#64748b;">/</span>
        <a href="/#projects" style="color:#38bdf8;text-decoration:none;">Projects</a>
        <span style="color:#64748b;">/</span>
        <span style="color:#f8fafc;font-weight:600;">${escapeAttribute(route.projectName || route.title)}</span>
      </nav>
    </header>

    <main id="main-content" role="main" style="max-width:1200px;margin:0 auto;padding:2.5rem 1rem;">
      <article role="article">
        <h1 style="font-size:2.5rem;font-weight:800;color:#ffffff;line-height:1.2;margin-bottom:1rem;">
          ${escapeAttribute(route.projectName || route.title)} — Technical Case Study
        </h1>
        <p style="font-size:1.15rem;color:#cbd5e1;line-height:1.7;max-width:850px;margin-bottom:1.5rem;">
          ${escapeAttribute(route.description)}
        </p>

        <section aria-labelledby="specs-heading" style="margin:2rem 0;padding:1.5rem;border:1px solid rgba(255,255,255,0.1);border-radius:0.75rem;background:rgba(255,255,255,0.02);">
          <h2 id="specs-heading" style="font-size:1.25rem;color:#38bdf8;margin-bottom:1rem;">Project Specifications</h2>
          <table style="width:100%;border-collapse:collapse;color:#cbd5e1;font-size:0.95rem;">
            <tbody>
              <tr><td style="padding:0.4rem 0;font-weight:600;color:#f8fafc;width:200px;">Application Category:</td><td style="padding:0.4rem 0;">${escapeAttribute(route.applicationCategory || "Web Application")}</td></tr>
              <tr><td style="padding:0.4rem 0;font-weight:600;color:#f8fafc;">Core Tech Stack:</td><td style="padding:0.4rem 0;">${escapeAttribute(techList)}</td></tr>
              <tr><td style="padding:0.4rem 0;font-weight:600;color:#f8fafc;">Lead Architect:</td><td style="padding:0.4rem 0;">Muhammad Sameer Ali</td></tr>
              ${route.liveDemo ? `<tr><td style="padding:0.4rem 0;font-weight:600;color:#f8fafc;">Live Production URL:</td><td style="padding:0.4rem 0;"><a href="${escapeAttribute(route.liveDemo)}" target="_blank" rel="noreferrer" style="color:#38bdf8;">${escapeAttribute(route.liveDemo)}</a></td></tr>` : ""}
              ${route.sourceCode ? `<tr><td style="padding:0.4rem 0;font-weight:600;color:#f8fafc;">Source Repository:</td><td style="padding:0.4rem 0;"><a href="${escapeAttribute(route.sourceCode)}" target="_blank" rel="noreferrer" style="color:#38bdf8;">${escapeAttribute(route.sourceCode)}</a></td></tr>` : ""}
            </tbody>
          </table>
        </section>

        ${route.problemStatement ? `
        <section aria-labelledby="challenge-heading" style="margin:2rem 0;">
          <h2 id="challenge-heading" style="font-size:1.5rem;color:#ffffff;margin-bottom:0.75rem;">What architectural challenges does ${escapeAttribute(route.projectName || route.title)} solve?</h2>
          <p style="color:#cbd5e1;line-height:1.7;">${escapeAttribute(route.problemStatement)}</p>
        </section>` : ""}

        ${route.subsystems && route.subsystems.length > 0 ? `
        <section aria-labelledby="architecture-heading" style="margin:2rem 0;">
          <h2 id="architecture-heading" style="font-size:1.5rem;color:#ffffff;margin-bottom:1rem;">How is ${escapeAttribute(route.projectName || route.title)} engineered?</h2>
          <ul style="color:#cbd5e1;line-height:1.8;padding-left:1.5rem;">
            ${route.subsystems.map(s => `<li><strong>${escapeAttribute(s.title)}:</strong> ${escapeAttribute(s.desc)}</li>`).join("\n            ")}
          </ul>
        </section>` : ""}

        ${route.impact ? `
        <section aria-labelledby="impact-heading" style="margin:2rem 0;">
          <h2 id="impact-heading" style="font-size:1.5rem;color:#ffffff;margin-bottom:0.75rem;">Engineering Impact &amp; Delivery</h2>
          <p style="color:#cbd5e1;line-height:1.7;">${escapeAttribute(route.impact)}</p>
        </section>` : ""}

        ${route.faqs && route.faqs.length > 0 ? `
        <section aria-labelledby="faq-project-heading" style="margin:2rem 0;padding-top:1.5rem;border-top:1px solid rgba(255,255,255,0.08);">
          <h2 id="faq-project-heading" style="font-size:1.5rem;color:#ffffff;margin-bottom:1rem;">Frequently Asked Technical Questions</h2>
          <div style="display:flex;flex-direction:column;gap:1.25rem;">
            ${route.faqs.map(f => `
            <article style="border:1px solid rgba(255,255,255,0.08);padding:1.25rem;border-radius:0.5rem;background:rgba(255,255,255,0.02);">
              <h3 style="font-size:1.15rem;color:#38bdf8;margin-bottom:0.5rem;">${escapeAttribute(f.question)}</h3>
              <p style="color:#cbd5e1;line-height:1.7;">${escapeAttribute(f.answer)}</p>
            </article>`).join("\n")}
          </div>
        </section>` : ""}

        <div style="margin-top:3rem;padding-top:1.5rem;border-top:1px solid rgba(255,255,255,0.1);">
          <a href="/#projects" style="color:#38bdf8;text-decoration:none;font-weight:600;">&larr; Return to Portfolio Showcase</a>
        </div>
      </article>
    </main>

    <footer role="contentinfo" style="border-top:1px solid rgba(255,255,255,0.1);padding:2rem 1rem;text-align:center;color:#64748b;font-size:0.9rem;">
      <p>&copy; 2026 Muhammad Sameer Ali. All rights reserved.</p>
    </footer>
  `;
}

function resetRoot(html) {
  const rootIndex = html.indexOf('<div id="root">');
  const bodyCloseIndex = html.lastIndexOf("</body>");
  if (rootIndex !== -1 && bodyCloseIndex !== -1 && bodyCloseIndex > rootIndex) {
    const rootBlock = html.slice(rootIndex, bodyCloseIndex);
    const lastDiv = rootBlock.lastIndexOf("</div>");
    if (lastDiv !== -1) {
      return html.slice(0, rootIndex) + '<div id="root"></div>' + html.slice(rootIndex + lastDiv + 6);
    }
  }
  return html;
}

function applySeo(html, meta) {
  html = resetRoot(html);
  const canonicalUrl = toAbsoluteUrl(meta.path);
  const imageUrl = toAbsoluteUrl(SITE.defaultImage);
  const jpgImageUrl = toAbsoluteUrl(SITE.fallbackJpgImage);
  const keywords = Array.from(new Set(meta.keywords)).join(", ");

  if (/prefix=["'][^"']*["']/i.test(html)) {
    html = html.replace(/prefix=["'][^"']*["']/i, 'prefix="og: http://ogp.me/ns#"');
  } else {
    html = html.replace(/<html([^>]*)>/i, '<html$1 prefix="og: http://ogp.me/ns#">');
  }

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${meta.title}</title>`);
  html = upsertLink(html, "canonical", canonicalUrl);
  html = upsertLink(html, "image_src", imageUrl);

  // International SEO alternate links
  html = upsertAlternateLink(html, "en", canonicalUrl);
  html = upsertAlternateLink(html, "x-default", canonicalUrl);

  // Primary Metadata
  html = upsertMeta(html, "name", "title", meta.title);
  html = upsertMeta(html, "name", "description", meta.description);
  html = upsertMeta(html, "name", "author", SITE.person.name);
  html = upsertMeta(html, "name", "creator", SITE.person.name);
  html = upsertMeta(html, "name", "publisher", SITE.person.name);
  html = upsertMeta(html, "name", "theme-color", "#030712");
  html = upsertMeta(html, "name", "robots", meta.noindex ? "noindex, nofollow" : "index, follow");
  html = upsertMeta(html, "name", "keywords", keywords);
  html = upsertMeta(html, "name", "language", "English");
  html = upsertMeta(html, "http-equiv", "content-language", "en-US");

  // Open Graph
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
  html = upsertMeta(html, "property", "og:locale", SITE.locale);

  // Fallback JPG for low-bandwidth clients
  if (!html.includes(jpgImageUrl)) {
    html = upsertMeta(html, "property", "og:image", jpgImageUrl);
    html = upsertMeta(html, "property", "og:image:secure_url", jpgImageUrl);
    html = upsertMeta(html, "property", "og:image:type", "image/jpeg");
  }

  // Twitter
  html = upsertMeta(html, "name", "twitter:card", "summary_large_image");
  html = upsertMeta(html, "name", "twitter:site", SITE.twitterHandle);
  html = upsertMeta(html, "name", "twitter:creator", SITE.twitterHandle);
  html = upsertMeta(html, "name", "twitter:title", meta.title);
  html = upsertMeta(html, "name", "twitter:description", meta.description);
  html = upsertMeta(html, "name", "twitter:url", canonicalUrl);
  html = upsertMeta(html, "name", "twitter:image", imageUrl);
  html = upsertMeta(html, "name", "twitter:image:alt", SITE.imageAlt);

  // Fallbacks
  html = upsertMeta(html, "name", "image", imageUrl);
  html = upsertMeta(html, "itemprop", "name", meta.title);
  html = upsertMeta(html, "itemprop", "description", meta.description);
  html = upsertMeta(html, "itemprop", "image", imageUrl);

  // Structured Data (Comprehensive JSON-LD Graph)
  html = upsertStructuredData(html, buildComprehensiveGraph(meta, canonicalUrl, imageUrl));

  // Pre-rendered semantic HTML inside root for non-JS scrapers & AI agents
  if (!meta.noindex) {
    const preRendered = renderPreRenderedBody(meta);
    html = html.replace('<div id="root"></div>', `<div id="root">${preRendered}</div>`);
  }

  return html;
}

async function writeRouteHtml(route, baseHtml) {
  const content = applySeo(baseHtml, route);

  if (route.path === "/") {
    const indexPath = path.join(distDir, "index.html");
    await writeFile(indexPath, content, "utf8");
    return;
  }

  const cleanSlug = route.path.replace(/^\//, "");
  const directHtmlPath = path.join(distDir, `${cleanSlug}.html`);
  const legacyNestedDir = path.join(distDir, cleanSlug);

  // Eliminate Vercel static route collision: cleanUrls serves [cleanSlug].html.
  await rm(legacyNestedDir, { recursive: true, force: true });

  await mkdir(path.dirname(directHtmlPath), { recursive: true });
  await writeFile(directHtmlPath, content, "utf8");
}

async function generateSitemap(routes) {
  const today = new Date().toISOString().split("T")[0];
  const urlEntries = routes.map((route) => {
    const loc = route.path === "/" ? `${SITE.url}/` : `${SITE.url}${route.path}`;
    const priority =
      route.path === "/"
        ? "1.0"
        : route.path.includes("wordwanderer") || route.path.includes("optitrade") || route.path.includes("invoicegen-pro")
        ? "0.9"
        : "0.8";
    const changefreq = route.path === "/" ? "weekly" : "monthly";

    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${loc}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}" />
  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries.join("\n")}
</urlset>
`;

  await writeFile(path.join(distDir, "sitemap.xml"), xml, "utf8");
  const publicSitemapPath = path.join(rootDir, "public", "sitemap.xml");
  await writeFile(publicSitemapPath, xml, "utf8");
}

async function syncPublicAssets() {
  const publicDir = path.join(rootDir, "public");
  if (!fs.existsSync(publicDir) || !fs.existsSync(distDir)) {
    return;
  }

  try {
    const entries = await readdir(publicDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile()) {
        const src = path.join(publicDir, entry.name);
        const dest = path.join(distDir, entry.name);
        // Always sync or overwrite text assets to ensure sitemap, robots, llms.txt are fresh
        if (!fs.existsSync(dest) || entry.name.endsWith(".txt") || entry.name.endsWith(".xml")) {
          await copyFile(src, dest);
        }
      }
    }
  } catch (err) {
    console.warn(`Asset sync warning: ${err.message}`);
  }
}

async function main() {
  await mkdir(distDir, { recursive: true });

  const distIndexPath = path.join(distDir, "index.html");
  const rootIndexPath = path.join(rootDir, "index.html");
  const baseHtml = fs.existsSync(distIndexPath)
    ? await readFile(distIndexPath, "utf8")
    : await readFile(rootIndexPath, "utf8");

  for (const route of ROUTES) {
    await writeRouteHtml(route, baseHtml);
  }

  await writeFile(path.join(distDir, "404.html"), applySeo(baseHtml, NOT_FOUND), "utf8");
  await generateSitemap(ROUTES);
  await syncPublicAssets();
}

await main();

