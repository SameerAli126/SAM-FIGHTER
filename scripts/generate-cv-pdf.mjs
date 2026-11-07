import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const publicPdfPath = path.join(rootDir, "public", "muhammad-sameer-ali-cv.pdf");
const distPdfPath = path.join(rootDir, "dist", "muhammad-sameer-ali-cv.pdf");
const tempHtmlPath = path.join(rootDir, "temp-cv-print.html");

const cvHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Muhammad Sameer Ali - CV</title>
  <style>
    @page {
      size: letter;
      margin: 0.32in 0.42in;
    }
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #111827;
      background: #ffffff;
      font-size: 8.7pt;
      line-height: 1.28;
      -webkit-font-smoothing: antialiased;
    }
    a {
      color: #0284c7;
      text-decoration: none;
    }
    header {
      text-align: center;
      margin-bottom: 7px;
      padding-bottom: 5px;
      border-bottom: 1.5px solid #0f172a;
    }
    h1 {
      font-size: 18pt;
      font-weight: 800;
      letter-spacing: 0.04em;
      color: #0f172a;
      text-transform: uppercase;
      margin-bottom: 2px;
    }
    .headline {
      font-size: 10pt;
      font-weight: 700;
      color: #0369a1;
      letter-spacing: 0.02em;
      margin-bottom: 3px;
    }
    .contact-line {
      font-size: 8.2pt;
      color: #475569;
    }
    .contact-line span {
      margin: 0 4px;
      color: #94a3b8;
    }
    section {
      margin-bottom: 6px;
    }
    .section-title {
      font-size: 9.3pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #0f172a;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 1.5px;
      margin-bottom: 4px;
    }
    .summary-text {
      color: #334155;
      text-align: justify;
      line-height: 1.28;
      font-size: 8.5pt;
    }
    .job, .project-item {
      margin-bottom: 5px;
    }
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1px;
    }
    .item-title {
      font-size: 9.1pt;
      font-weight: 700;
      color: #0f172a;
    }
    .item-date {
      font-size: 8.1pt;
      font-weight: 600;
      color: #475569;
      font-style: italic;
    }
    .item-subtitle {
      font-size: 8.4pt;
      font-weight: 600;
      color: #0284c7;
      margin-bottom: 1px;
    }
    .item-tech {
      font-size: 7.9pt;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      color: #475569;
      margin-bottom: 2px;
    }
    ul.bullets {
      list-style-type: disc;
      padding-left: 13px;
      margin-top: 1px;
    }
    ul.bullets li {
      font-size: 8.2pt;
      color: #334155;
      line-height: 1.25;
      margin-bottom: 1.5px;
    }
    .skills-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2px;
      font-size: 8.2pt;
    }
    .skill-row {
      display: flex;
      align-items: baseline;
    }
    .skill-cat {
      width: 120px;
      font-weight: 700;
      color: #0f172a;
      flex-shrink: 0;
    }
    .skill-list {
      color: #334155;
      flex: 1;
    }
    .education-item {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
  </style>
</head>
<body>
  <header>
    <h1>Muhammad Sameer Ali</h1>
    <div class="headline">Frontend / Full-Stack Developer</div>
    <div class="contact-line">
      Peshawar, Pakistan
      <span>•</span>
      <a href="mailto:khsameer626@gmail.com">khsameer626@gmail.com</a>
      <span>•</span>
      <a href="tel:+923358181400">+92 335 8181400</a>
      <span>•</span>
      <a href="https://linkedin.com/in/sameerali126" target="_blank">linkedin.com/in/sameerali126</a>
      <span>•</span>
      <a href="https://github.com/SameerAli126" target="_blank">github.com/SameerAli126</a>
      <span>•</span>
      <a href="https://msameerali.dev" target="_blank">msameerali.dev</a>
    </div>
  </header>

  <section>
    <div class="section-title">Summary</div>
    <p class="summary-text">
      Frontend-focused full-stack developer building responsive web products with React, Next.js and TypeScript. At Deepixel, delivered mobile and Progressive Web App (PWA) navigation, streaming AI report workflows and document-editing fixes for Invictus. Experienced in translating product requirements into usable interfaces, connecting frontend features to APIs, debugging layout and authentication issues, and validating changes with automated tests and production builds. Also works with Python and Node.js on backend features.
    </p>
  </section>

  <section>
    <div class="section-title">Experience</div>

    <div class="job">
      <div class="item-header">
        <span class="item-title">Deepixel — Full-Stack Developer</span>
        <span class="item-date">Apr 2026 – Present</span>
      </div>
      <div class="item-subtitle">Invictus — AI Deal Intelligence and Reporting Platform</div>
      <div class="item-tech">React, TypeScript, Vite, Tailwind CSS, Radix UI, Tiptap, Laravel, SSE</div>
      <ul class="bullets">
        <li>Built a responsive mobile shell with bottom navigation and Progressive Web App (PWA) setup; fixed standalone login persistence and adapted dashboards, report viewers and multi-step forms for mobile and tablet screens.</li>
        <li>Implemented an AI report workspace with SSE progress, user clarification prompts and saved deal/document context; added timeout recovery and editable partial drafts while preserving the guided report workflow.</li>
        <li>Stabilized Tiptap table editing by fixing stale-state overwrites, table parsing and nested-table insertion; improved report review, validation and export interfaces.</li>
        <li>Added automatic display scaling for Windows 125% and 150% settings plus a saved user control, making dense screens easier to use on scaled laptops.</li>
        <li>Audited 21 application views across four viewport sizes using Playwright screenshots; added 17 report-flow utility tests and verified changes with TypeScript checks and production builds.</li>
        <li>Supported local development with Docker startup scripts, service health checks and troubleshooting of authentication, API configuration and document-processing issues.</li>
      </ul>
    </div>

    <div class="job">
      <div class="item-header">
        <span class="item-title">Full-Stack Software Engineer (Contract)</span>
        <span class="item-date">Jan 2023 – Present</span>
      </div>
      <div class="item-subtitle">Independent Clients and Local Software Houses | Remote / Pakistan</div>
      <ul class="bullets">
        <li>Delivered responsive web features, API integrations and internal workflows for confidential client projects, using JavaScript/TypeScript and Python across frontend and backend work.</li>
      </ul>
    </div>
  </section>

  <section>
    <div class="section-title">Selected Independent Projects</div>

    <div class="project-item">
      <div class="item-header">
        <span class="item-title">SAMIO — Personal Finance Dashboard</span>
        <span class="item-date">2025 – Present</span>
      </div>
      <div class="item-tech">Next.js, TypeScript, Tailwind CSS, Prisma, PostgreSQL</div>
      <ul class="bullets">
        <li>Built responsive budgeting, transaction and reporting interfaces, including JSON export and distinct mobile, tablet and desktop navigation.</li>
        <li>Implemented email OTP verification, signed sessions and protected API routes with Prisma/PostgreSQL backend foundations and administrative tools.</li>
      </ul>
    </div>

    <div class="project-item">
      <div class="item-header">
        <span class="item-title">PhotoStream / SnapCloud — Cloud Photo Sharing</span>
        <span class="item-date">Mar – Jul 2025</span>
      </div>
      <div class="item-tech">React, TypeScript, Vite, FastAPI, MongoDB Atlas, Cloudinary</div>
      <ul class="bullets">
        <li>Built two frontend experiences backed by a shared FastAPI service, with JWT authentication and role-based access.</li>
        <li>Implemented photo uploads, search and social interactions, using Cloudinary for media delivery and MongoDB Atlas for metadata.</li>
      </ul>
    </div>

    <div class="project-item">
      <div class="item-header">
        <span class="item-title">OptiTrade — Market and Portfolio Dashboard</span>
        <span class="item-date">Oct 2023 – Sep 2024</span>
      </div>
      <div class="item-tech">Next.js, TypeScript, Node.js, PostgreSQL, TanStack Query, JWT</div>
      <ul class="bullets">
        <li>Migrated a React frontend to Next.js and integrated stock-data APIs into responsive market dashboards.</li>
        <li>Built watchlists, portfolio monitoring and trading interfaces with JWT authorization.</li>
      </ul>
    </div>
  </section>

  <section>
    <div class="section-title">Technical Skills</div>
    <div class="skills-grid">
      <div class="skill-row">
        <span class="skill-cat">Frontend:</span>
        <span class="skill-list">JavaScript, TypeScript, React, Next.js, HTML, CSS, Tailwind CSS, Radix UI, Tiptap, Figma</span>
      </div>
      <div class="skill-row">
        <span class="skill-cat">Backend &amp; Data:</span>
        <span class="skill-list">Python, FastAPI, Node.js, Express.js, Laravel, REST APIs, SSE, Prisma, PostgreSQL, MongoDB, MySQL</span>
      </div>
      <div class="skill-row">
        <span class="skill-cat">Testing &amp; Tools:</span>
        <span class="skill-list">Git, GitHub, Playwright, Vitest, Vite, debugging, responsive testing, AI-assisted development</span>
      </div>
      <div class="skill-row">
        <span class="skill-cat">Deployment:</span>
        <span class="skill-list">Vercel, Netlify, Render, Railway; Docker fundamentals</span>
      </div>
    </div>
  </section>

  <section>
    <div class="section-title">Education</div>
    <div class="education-item">
      <div>
        <span class="item-title">Bachelor of Science in Computer Science</span>
        <div style="font-size: 8.5pt; color: #475569;">City University of Science and Information Technology, Peshawar</div>
      </div>
      <div style="text-align: right;">
        <span class="item-date">Sep 2021 – Oct 2025</span>
        <div style="font-size: 8.5pt; font-weight: 700; color: #0f172a;">GPA: 3.51 / 4.00</div>
      </div>
    </div>
  </section>
</body>
</html>`;

fs.writeFileSync(tempHtmlPath, cvHtml, "utf8");

// Cross-platform browser candidate paths
const candidatePaths = [
  process.env.CHROME_BIN,
  process.env.PUPPETEER_EXECUTABLE_PATH,
  // Windows Chrome / Edge
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  path.join(process.env.LOCALAPPDATA || "", "Google\\Chrome\\Application\\chrome.exe"),
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  // macOS Chrome
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  // Linux common binaries
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);

let browserExec = candidatePaths.find((p) => {
  try {
    return fs.existsSync(p);
  } catch {
    return false;
  }
});

if (!browserExec) {
  // Try finding via `which` or `where`
  try {
    const isWin = process.platform === "win32";
    const lookupCmd = isWin ? "where chrome edge msedge 2>nul" : "which google-chrome google-chrome-stable chromium chromium-browser 2>/dev/null";
    const found = execSync(lookupCmd, { encoding: "utf8" }).trim().split(/\r?\n/)[0];
    if (found && fs.existsSync(found)) {
      browserExec = found;
    }
  } catch {
    // lookup failed
  }
}

try {
  if (browserExec) {
    console.log(`Using browser: ${browserExec}`);
    try {
      execSync(
        `"${browserExec}" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="${publicPdfPath}" "${tempHtmlPath}"`,
        { stdio: "inherit" }
      );
      console.log(`Successfully generated public PDF: ${publicPdfPath} (${fs.statSync(publicPdfPath).size} bytes)`);
    } catch (err) {
      console.warn(`Browser print-to-pdf failed: ${err.message}`);
    }
  } else {
    console.log("No compatible headless browser binary found in environment.");
  }

  // Ensure public PDF exists
  if (!fs.existsSync(publicPdfPath)) {
    throw new Error(`Public CV PDF was neither generated nor found at ${publicPdfPath}`);
  }

  // Sync to dist if dist folder exists
  const distDir = path.dirname(distPdfPath);
  if (fs.existsSync(distDir)) {
    fs.copyFileSync(publicPdfPath, distPdfPath);
    console.log(`Synced to dist PDF: ${distPdfPath}`);
  }
} finally {
  if (fs.existsSync(tempHtmlPath)) {
    fs.unlinkSync(tempHtmlPath);
  }
}

