import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const portraitPath = path.join(rootDir, "src", "assets", "sameer-khan.png");
const publicPngPath = path.join(rootDir, "public", "og-image.png");
const distPngPath = path.join(rootDir, "dist", "og-image.png");
const publicJpgPath = path.join(rootDir, "public", "og-image.jpg");
const distJpgPath = path.join(rootDir, "dist", "og-image.jpg");
const publicSvgPath = path.join(rootDir, "public", "og-image.svg");
const distSvgPath = path.join(rootDir, "dist", "og-image.svg");
const tempHtmlPath = path.join(rootDir, "temp-og-render.html");
const tempScreenshotPng = path.join(process.env.TEMP || "C:\\Windows\\Temp", "temp-og-shot.png");
const tempScreenshotJpg = path.join(process.env.TEMP || "C:\\Windows\\Temp", "temp-og-shot.jpg");

// 1. Locate Chrome or Edge executable
let browserExec = null;
const possiblePaths = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  process.env.LOCALAPPDATA + "\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium-browser",
  "/usr/bin/chromium",
];

for (const p of possiblePaths) {
  if (p && fs.existsSync(p)) {
    browserExec = p;
    break;
  }
}

// 2. Read portrait image as base64
let portraitBase64 = "";
if (fs.existsSync(portraitPath)) {
  const portraitBuffer = fs.readFileSync(portraitPath);
  portraitBase64 = `data:image/png;base64,${portraitBuffer.toString("base64")}`;
}

// 3. HTML template designed for ultra-crisp aesthetics and high compression (<300KB)
const ogHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    html, body {
      width: 1200px;
      height: 630px;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background-color: #030712;
      color: #f8fafc;
      -webkit-font-smoothing: antialiased;
    }
    .canvas {
      position: relative;
      width: 1200px;
      height: 630px;
      background: #030712;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 56px 72px;
      overflow: hidden;
    }
    /* Subtle geometric grid for clean, lightweight rendering */
    .grid-lines {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(to right, #091326 1px, transparent 1px),
        linear-gradient(to bottom, #091326 1px, transparent 1px);
      background-size: 60px 60px;
      opacity: 0.7;
      pointer-events: none;
    }
    /* Top neon cyan-to-azure beam */
    .top-beam {
      position: absolute;
      top: 0;
      left: 80px;
      right: 80px;
      height: 3px;
      background: linear-gradient(90deg, transparent, #06b6d4 35%, #3b82f6 65%, transparent);
    }
    /* Outer high-tech frame */
    .frame-border {
      position: absolute;
      inset: 16px;
      border: 1px solid #111e38;
      border-radius: 20px;
      pointer-events: none;
    }

    /* Left column */
    .left-col {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      justify-content: center;
      max-width: 680px;
    }
    .badge-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 22px;
    }
    .pill-brand {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      background: #082845;
      border: 1px solid #0284c7;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #38bdf8;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    .pill-status {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 6px 14px;
      background: #064232;
      border: 1px solid #059669;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 600;
      color: #34d399;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    .pulse-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #10b981;
    }
    h1.name {
      font-size: 58px;
      font-weight: 800;
      letter-spacing: -0.03em;
      line-height: 1.05;
      color: #ffffff;
      margin-bottom: 8px;
    }
    .role-title {
      font-size: 26px;
      font-weight: 700;
      letter-spacing: -0.01em;
      color: #06b6d4;
      margin-bottom: 16px;
    }
    .description {
      font-size: 17px;
      line-height: 1.5;
      color: #94a3b8;
      margin-bottom: 26px;
      max-width: 610px;
    }
    .chips-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 28px;
    }
    .chip {
      padding: 6px 14px;
      background: #0c1529;
      border: 1px solid #1a2c4e;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      color: #cbd5e1;
    }
    .chip.highlight {
      background: #0a2540;
      border-color: #0284c7;
      color: #38bdf8;
    }
    .meta-bar {
      display: flex;
      align-items: center;
      gap: 18px;
      font-size: 14px;
      color: #64748b;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    .meta-item {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .meta-dot {
      color: #06b6d4;
    }
    .domain-text {
      color: #38bdf8;
      font-weight: 600;
    }

    /* Right column: portrait showcase */
    .right-col {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
    }
    .portrait-card {
      position: relative;
      width: 310px;
      height: 400px;
      border-radius: 26px;
      background: #070d1e;
      border: 2px solid #0891b2;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      overflow: hidden;
      padding: 0;
    }
    /* Cyber corner brackets */
    .corner-bracket {
      position: absolute;
      width: 16px;
      height: 16px;
      pointer-events: none;
      z-index: 5;
    }
    .cb-tl {
      top: 10px;
      left: 10px;
      border-top: 3px solid #22d3ee;
      border-left: 3px solid #22d3ee;
    }
    .cb-tr {
      top: 10px;
      right: 10px;
      border-top: 3px solid #22d3ee;
      border-right: 3px solid #22d3ee;
    }
    .cb-bl {
      bottom: 10px;
      left: 10px;
      border-bottom: 3px solid #22d3ee;
      border-left: 3px solid #22d3ee;
    }
    .cb-br {
      bottom: 10px;
      right: 10px;
      border-bottom: 3px solid #22d3ee;
      border-right: 3px solid #22d3ee;
    }
    .portrait-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;
      z-index: 1;
    }
    .portrait-gradient-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, transparent 65%, #030712 100%);
      z-index: 2;
    }
    .portrait-footer {
      position: relative;
      z-index: 3;
      width: 100%;
      padding: 12px 16px 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #030712;
      border-top: 1px solid #14223d;
    }
    .portrait-badge-name {
      font-size: 13px;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: 0.02em;
    }
    .portrait-badge-sub {
      font-size: 11px;
      font-weight: 600;
      color: #38bdf8;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
  </style>
</head>
<body>
  <div class="canvas">
    <div class="grid-lines"></div>
    <div class="top-beam"></div>
    <div class="frame-border"></div>

    <!-- Left Column -->
    <div class="left-col">
      <div class="badge-row">
        <div class="pill-brand">MSA / 2026 • PORTFOLIO</div>
        <div class="pill-status">
          <span class="pulse-dot"></span>
          DEEPIXEL • INVICTUS AI
        </div>
      </div>

      <h1 class="name">Muhammad Sameer Ali</h1>
      <div class="role-title">Frontend / Full-Stack Developer</div>

      <p class="description">
        Architecting resilient, high-performance web products, streaming AI workspaces, and responsive enterprise applications with React, Next.js, and TypeScript.
      </p>

      <div class="chips-row">
        <div class="chip highlight">React / Next.js</div>
        <div class="chip highlight">TypeScript</div>
        <div class="chip">Tailwind CSS</div>
        <div class="chip">FastAPI / Python</div>
        <div class="chip">PostgreSQL & Prisma</div>
        <div class="chip">SSE & PWA</div>
      </div>

      <div class="meta-bar">
        <div class="meta-item">
          <span class="meta-dot">◆</span>
          <span class="domain-text">msameerali.dev</span>
        </div>
        <div class="meta-item">
          <span class="meta-dot">•</span>
          <span>Peshawar, Pakistan</span>
        </div>
        <div class="meta-item">
          <span class="meta-dot">•</span>
          <span>github.com/SameerAli126</span>
        </div>
      </div>
    </div>

    <!-- Right Column: Portrait Showcase -->
    <div class="right-col">
      <div class="portrait-card">
        <div class="corner-bracket cb-tl"></div>
        <div class="corner-bracket cb-tr"></div>
        <div class="corner-bracket cb-bl"></div>
        <div class="corner-bracket cb-br"></div>
        <img class="portrait-img" src="${portraitBase64}" alt="Muhammad Sameer Ali" />
        <div class="portrait-gradient-overlay"></div>
        <div class="portrait-footer">
          <div>
            <div class="portrait-badge-name">Muhammad Sameer Ali</div>
            <div class="portrait-badge-sub">FULL-STACK ENGINEER</div>
          </div>
          <div class="pill-brand" style="padding: 4px 10px; font-size: 11px;">MSA</div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

function syncToDist(sourceFile, targetFile) {
  const dir = path.dirname(targetFile);
  if (fs.existsSync(dir) && fs.existsSync(sourceFile)) {
    fs.copyFileSync(sourceFile, targetFile);
    console.log(`Synced to dist: ${targetFile}`);
  }
}

if (browserExec) {
  fs.writeFileSync(tempHtmlPath, ogHtml, "utf8");

  try {
    console.log(`Rendering 1200x630 OG image with browser: ${browserExec}`);

    const fileUrl = `file:///${path.resolve(tempHtmlPath).replace(/\\/g, "/")}`;

    // Render PNG
    execSync(
      `"${browserExec}" --headless=new --disable-gpu --window-size=1200,630 --hide-scrollbars --screenshot="${tempScreenshotPng}" "${fileUrl}"`,
      { stdio: "inherit" }
    );

    const rawPng = fs.readFileSync(tempScreenshotPng);
    console.log(`Generated PNG screenshot: ${rawPng.length} bytes`);

    fs.writeFileSync(publicPngPath, rawPng);
    console.log(`Saved public PNG: ${publicPngPath} (${rawPng.length} bytes)`);
    syncToDist(publicPngPath, distPngPath);

    // Render JPG
    execSync(
      `"${browserExec}" --headless=new --disable-gpu --window-size=1200,630 --hide-scrollbars --screenshot="${tempScreenshotJpg}" "${fileUrl}"`,
      { stdio: "inherit" }
    );
    const rawJpg = fs.readFileSync(tempScreenshotJpg);
    console.log(`Generated JPG screenshot: ${rawJpg.length} bytes`);

    fs.writeFileSync(publicJpgPath, rawJpg);
    syncToDist(publicJpgPath, distJpgPath);

  } catch (err) {
    console.warn(`Browser OG image generation encountered error: ${err.message}`);
  } finally {
    if (fs.existsSync(tempHtmlPath)) {
      fs.unlinkSync(tempHtmlPath);
    }
    if (fs.existsSync(tempScreenshotPng)) {
      fs.unlinkSync(tempScreenshotPng);
    }
    if (fs.existsSync(tempScreenshotJpg)) {
      fs.unlinkSync(tempScreenshotJpg);
    }
  }
} else {
  console.log("No compatible headless browser found in environment; using existing OG assets.");
}

// Ensure dist sync if dist exists
syncToDist(publicPngPath, distPngPath);
syncToDist(publicJpgPath, distJpgPath);
syncToDist(publicSvgPath, distSvgPath);

console.log("OG image assets verified.");
