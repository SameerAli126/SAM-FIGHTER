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
const isCI = Boolean(process.env.CI || process.env.VERCEL || process.env.NETLIFY);
let browserExec = null;

if (isCI && !process.env.CHROME_BIN) {
  console.log("CI/Vercel build environment without CHROME_BIN: using pre-generated OG assets.");
} else {
  const possiblePaths = [
    process.env.CHROME_BIN,
    process.env.PUPPETEER_EXECUTABLE_PATH,
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    (process.env.LOCALAPPDATA || "") + "\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium-browser",
    "/usr/bin/chromium",
  ].filter(Boolean);

  for (const p of possiblePaths) {
    if (p && fs.existsSync(p)) {
      browserExec = p;
      break;
    }
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
      background-color: #080a10;
      color: #f8fafc;
      -webkit-font-smoothing: antialiased;
    }
    .canvas {
      position: relative;
      width: 1200px;
      height: 630px;
      background-color: #080a10;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 44px 56px;
      overflow: hidden;
    }
    /* Ambient cyan glow behind portrait */
    .ambient-glow {
      position: absolute;
      right: 20px;
      top: 40px;
      width: 440px;
      height: 520px;
      border-radius: 50%;
      background: radial-gradient(circle, #07223b 0%, #071728 40%, transparent 70%);
      pointer-events: none;
      z-index: 1;
    }
    /* Subtle geometric grid for clean, lightweight rendering */
    .grid-lines {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(to right, #0d192e 1px, transparent 1px),
        linear-gradient(to bottom, #0d192e 1px, transparent 1px);
      background-size: 48px 48px;
      pointer-events: none;
      z-index: 2;
    }
    /* Constellation vector overlay */
    .constellation-layer {
      position: absolute;
      inset: 0;
      width: 1200px;
      height: 630px;
      pointer-events: none;
      z-index: 2;
    }
    /* Outer high-tech frame */
    .frame-border {
      position: absolute;
      inset: 16px;
      border: 1px solid rgba(56, 189, 248, 0.18);
      border-radius: 20px;
      pointer-events: none;
      z-index: 3;
    }
    /* Top neon cyan-to-azure beam */
    .top-beam {
      position: absolute;
      top: 16px;
      left: 70px;
      right: 70px;
      height: 2px;
      background: linear-gradient(90deg, transparent, #06b6d4 30%, #38bdf8 70%, transparent);
      box-shadow: 0 0 12px #06b6d4;
      z-index: 3;
    }

    /* Left column */
    .left-col {
      position: relative;
      z-index: 4;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 690px;
      height: 520px;
    }

    /* Header Row */
    .header-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .brand-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      background: rgba(8, 25, 48, 0.85);
      border: 1px solid rgba(56, 189, 248, 0.35);
      border-radius: 9999px;
      box-shadow: 0 0 16px rgba(6, 182, 212, 0.18);
    }
    .brand-spark {
      color: #22d3ee;
      font-size: 11px;
    }
    .brand-domain {
      color: #ffffff;
      font-size: 13.5px;
      font-weight: 700;
      letter-spacing: 0.03em;
      font-family: ui-monospace, SFMono-Regular, "Segoe UI Mono", Menlo, Consolas, monospace;
    }
    .brand-tag {
      color: #38bdf8;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      padding-left: 7px;
      border-left: 1px solid rgba(56, 189, 248, 0.3);
      font-family: ui-monospace, SFMono-Regular, "Segoe UI Mono", Menlo, Consolas, monospace;
    }
    .pill-status {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 6px 14px;
      background: rgba(13, 21, 38, 0.7);
      border: 1px solid rgba(56, 189, 248, 0.2);
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 600;
      color: #94a3b8;
      font-family: ui-monospace, SFMono-Regular, "Segoe UI Mono", Menlo, Consolas, monospace;
    }
    .status-dot-cyan {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #06b6d4;
      box-shadow: 0 0 6px #06b6d4;
    }

    /* Main identity block */
    .identity-block {
      display: flex;
      flex-direction: column;
    }
    h1.name {
      font-size: 50px;
      font-weight: 800;
      letter-spacing: -0.035em;
      line-height: 1.05;
      color: #ffffff;
      margin-bottom: 5px;
    }
    .role-title {
      font-size: 23px;
      font-weight: 700;
      letter-spacing: -0.01em;
      color: #38bdf8;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* Editorial headline callout */
    .editorial-callout {
      border-left: 3px solid #06b6d4;
      padding: 6px 0 6px 16px;
      background: linear-gradient(90deg, rgba(6, 182, 212, 0.08) 0%, transparent 100%);
      border-radius: 0 10px 10px 0;
      margin-bottom: 16px;
    }
    .editorial-headline {
      font-size: 23px;
      font-weight: 700;
      color: #f1f5f9;
      letter-spacing: -0.015em;
      line-height: 1.25;
      margin-bottom: 4px;
    }
    .editorial-sub {
      font-size: 14px;
      line-height: 1.5;
      color: #94a3b8;
      max-width: 640px;
    }

    /* Modern tech stack chips */
    .chips-row {
      display: flex;
      align-items: center;
      gap: 9px;
      margin-bottom: 16px;
    }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 6px 14px;
      background: rgba(13, 21, 38, 0.7);
      border: 1px solid rgba(56, 189, 248, 0.22);
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      color: #cbd5e1;
    }
    .chip.chip-highlight {
      background: rgba(8, 38, 70, 0.65);
      border-color: rgba(56, 189, 248, 0.45);
      color: #f0f9ff;
      box-shadow: 0 0 12px rgba(6, 182, 212, 0.14);
    }
    .chip-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #38bdf8;
      box-shadow: 0 0 6px #38bdf8;
    }
    .chip-dot-cyan {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #22d3ee;
      box-shadow: 0 0 6px #22d3ee;
    }

    /* Engineering metrics strip */
    .metrics-strip {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(10, 16, 30, 0.8);
      border: 1px solid rgba(56, 189, 248, 0.22);
      border-radius: 12px;
      padding: 10px 20px;
      max-width: 640px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
    }
    .metric-cell {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    .metric-num {
      font-size: 21px;
      font-weight: 800;
      color: #38bdf8;
      font-family: ui-monospace, SFMono-Regular, "Segoe UI Mono", Menlo, Consolas, monospace;
      line-height: 1.1;
      margin-bottom: 2px;
    }
    .metric-num.metric-green {
      color: #34d399;
    }
    .metric-label {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #94a3b8;
    }
    .metric-sep {
      width: 1px;
      height: 26px;
      background: rgba(255, 255, 255, 0.08);
    }

    /* Meta bar */
    .meta-bar {
      display: flex;
      align-items: center;
      gap: 16px;
      font-size: 13px;
      color: #64748b;
      font-family: ui-monospace, SFMono-Regular, "Segoe UI Mono", Menlo, Consolas, monospace;
    }
    .meta-item {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .meta-dot {
      color: #06b6d4;
    }

    /* Right column: portrait showcase */
    .right-col {
      position: relative;
      z-index: 4;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .portrait-card {
      position: relative;
      width: 335px;
      height: 490px;
      border-radius: 26px;
      background: linear-gradient(180deg, rgba(13, 21, 38, 0.82) 0%, rgba(8, 12, 22, 0.98) 100%);
      border: 1.5px solid rgba(56, 189, 248, 0.4);
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.65), 0 0 35px rgba(6, 182, 212, 0.2);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      overflow: hidden;
      padding: 0;
    }
    /* Active status badge */
    .portrait-status-pill {
      position: absolute;
      top: 14px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 5px 13px;
      background: rgba(4, 38, 38, 0.92);
      border: 1px solid rgba(52, 211, 153, 0.65);
      border-radius: 9999px;
      white-space: nowrap;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5), 0 0 10px rgba(16, 185, 129, 0.3);
    }
    .status-pulse-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 8px #34d399;
    }
    .status-pill-text {
      color: #6ee7b7;
      font-size: 11.5px;
      font-weight: 700;
      letter-spacing: 0.02em;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .portrait-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 25%;
      z-index: 1;
    }
    .portrait-vignette {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(8, 10, 16, 0.3) 0%, transparent 22%, rgba(8, 10, 16, 0.4) 75%, #080a10 100%);
      z-index: 2;
    }
    .portrait-footer {
      position: relative;
      z-index: 3;
      width: 100%;
      padding: 12px 18px 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(8, 12, 22, 0.94);
      border-top: 1px solid rgba(56, 189, 248, 0.25);
    }
    .portrait-badge-name {
      font-size: 14px;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: 0.01em;
    }
    .portrait-badge-sub {
      font-size: 11px;
      font-weight: 600;
      color: #38bdf8;
      font-family: ui-monospace, SFMono-Regular, "Segoe UI Mono", Menlo, Consolas, monospace;
      letter-spacing: 0.02em;
    }
    .portrait-verified-tag {
      padding: 3px 8px;
      background: rgba(56, 189, 248, 0.15);
      border: 1px solid rgba(56, 189, 248, 0.35);
      border-radius: 6px;
      font-size: 10.5px;
      font-weight: 800;
      color: #38bdf8;
      letter-spacing: 0.08em;
      font-family: ui-monospace, SFMono-Regular, "Segoe UI Mono", Menlo, Consolas, monospace;
    }
  </style>
</head>
<body>
  <div class="canvas">
    <div class="ambient-glow"></div>
    <div class="grid-lines"></div>
    <div class="top-beam"></div>
    <div class="frame-border"></div>

    <!-- Constellation vector overlay -->
    <svg class="constellation-layer" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <line x1="96" y1="40" x2="240" y2="24" stroke="rgba(56, 189, 248, 0.18)" stroke-width="1" stroke-dasharray="4 4" />
      <line x1="640" y1="48" x2="768" y2="72" stroke="rgba(56, 189, 248, 0.18)" stroke-width="1" stroke-dasharray="4 4" />
      <line x1="710" y1="280" x2="750" y2="360" stroke="rgba(56, 189, 248, 0.16)" stroke-width="1" stroke-dasharray="4 4" />
      <circle cx="96" cy="40" r="2.5" fill="#22d3ee" opacity="0.7" />
      <circle cx="240" cy="24" r="3" fill="#38bdf8" opacity="0.9" />
      <circle cx="640" cy="48" r="2.5" fill="#22d3ee" opacity="0.7" />
      <circle cx="768" cy="72" r="3" fill="#38bdf8" opacity="0.8" />
      <circle cx="710" cy="280" r="2.5" fill="#22d3ee" opacity="0.6" />
      <circle cx="750" cy="360" r="3" fill="#38bdf8" opacity="0.7" />
      <path d="M72 192 v6 M69 195 h6" stroke="rgba(56, 189, 248, 0.35)" stroke-width="1.2" />
      <path d="M576 144 v6 M573 147 h6" stroke="rgba(56, 189, 248, 0.35)" stroke-width="1.2" />
      <path d="M720 480 v6 M717 483 h6" stroke="rgba(56, 189, 248, 0.35)" stroke-width="1.2" />
      <path d="M1128 144 v6 M1125 147 h6" stroke="rgba(56, 189, 248, 0.35)" stroke-width="1.2" />
      <path d="M1128 480 v6 M1125 483 h6" stroke="rgba(56, 189, 248, 0.35)" stroke-width="1.2" />
    </svg>

    <!-- Left Column -->
    <div class="left-col">
      <!-- Header / Brand Row -->
      <div class="header-row">
        <div class="brand-badge">
          <span class="brand-spark">◆</span>
          <span class="brand-domain">msameerali.dev</span>
          <span class="brand-tag">PORTFOLIO</span>
        </div>
        <div class="pill-status">
          <span class="status-dot-cyan"></span>
          <span>INVICTUS AI • DEEPIXEL</span>
        </div>
      </div>

      <!-- Identity & Role -->
      <div class="identity-block">
        <h1 class="name">Muhammad Sameer Ali</h1>
        <div class="role-title">Frontend / Full-Stack Developer</div>

        <!-- Bold Editorial Headline -->
        <div class="editorial-callout">
          <div class="editorial-headline">"Architecting Resilient Modern Web Systems"</div>
          <p class="editorial-sub">
            Engineering high-performance enterprise applications, interactive 3D web experiences,<br>and real-time streaming architectures.
          </p>
        </div>
      </div>

      <!-- Modern Tech Stack Chips -->
      <div class="chips-row">
        <div class="chip chip-highlight"><span class="chip-dot"></span>Next.js 15</div>
        <div class="chip chip-highlight"><span class="chip-dot"></span>FastAPI</div>
        <div class="chip chip-highlight"><span class="chip-dot"></span>React 19</div>
        <div class="chip"><span class="chip-dot-cyan"></span>Laravel</div>
        <div class="chip"><span class="chip-dot-cyan"></span>TypeScript</div>
      </div>

      <!-- Engineering Metrics Strip -->
      <div class="metrics-strip">
        <div class="metric-cell">
          <div class="metric-num">12+</div>
          <div class="metric-label">Deployments</div>
        </div>
        <div class="metric-sep"></div>
        <div class="metric-cell">
          <div class="metric-num">6</div>
          <div class="metric-label">Architectures</div>
        </div>
        <div class="metric-sep"></div>
        <div class="metric-cell">
          <div class="metric-num">3+ Yrs</div>
          <div class="metric-label">Exp</div>
        </div>
        <div class="metric-sep"></div>
        <div class="metric-cell">
          <div class="metric-num metric-green">100%</div>
          <div class="metric-label">Delivery</div>
        </div>
      </div>

      <!-- Secondary Meta -->
      <div class="meta-bar">
        <div class="meta-item">
          <span class="meta-dot">◆</span>
          <span>Peshawar, Pakistan</span>
        </div>
        <div class="meta-item">
          <span class="meta-dot">•</span>
          <span>github.com/SameerAli126</span>
        </div>
        <div class="meta-item">
          <span class="meta-dot">•</span>
          <span>msameerali.dev</span>
        </div>
      </div>
    </div>

    <!-- Right Column: Portrait Showcase -->
    <div class="right-col">
      <div class="portrait-card">
        <!-- Active Status Badge -->
        <div class="portrait-status-pill">
          <span class="status-pulse-dot"></span>
          <span class="status-pill-text">Available for Full-Stack Roles</span>
        </div>

        <img class="portrait-img" src="${portraitBase64}" alt="Muhammad Sameer Ali" />
        <div class="portrait-vignette"></div>

        <div class="portrait-footer">
          <div>
            <div class="portrait-badge-name">Muhammad Sameer Ali</div>
            <div class="portrait-badge-sub">FRONTEND / FULL-STACK</div>
          </div>
          <div class="portrait-verified-tag">PRO</div>
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
      `"${browserExec}" --headless=new --no-sandbox --disable-gpu --window-size=1200,630 --hide-scrollbars --screenshot="${tempScreenshotPng}" "${fileUrl}"`,
      { stdio: "inherit" }
    );

    const rawPng = fs.readFileSync(tempScreenshotPng);
    console.log(`Generated PNG screenshot: ${rawPng.length} bytes`);

    fs.writeFileSync(publicPngPath, rawPng);
    console.log(`Saved public PNG: ${publicPngPath} (${rawPng.length} bytes)`);
    syncToDist(publicPngPath, distPngPath);

    // Render JPG
    execSync(
      `"${browserExec}" --headless=new --no-sandbox --disable-gpu --window-size=1200,630 --hide-scrollbars --screenshot="${tempScreenshotJpg}" "${fileUrl}"`,
      { stdio: "inherit" }
    );
    const rawJpg = fs.readFileSync(tempScreenshotJpg);
    console.log(`Generated JPG screenshot: ${rawJpg.length} bytes`);

    fs.writeFileSync(publicJpgPath, rawJpg);
    syncToDist(publicJpgPath, distJpgPath);

  } catch (err) {
    console.warn(`Browser OG image generation encountered error: ${err.message}`);
  } finally {
    try {
      if (fs.existsSync(tempHtmlPath)) {
        fs.unlinkSync(tempHtmlPath);
      }
    } catch {
      // Ignore cleanup error
    }
    try {
      if (fs.existsSync(tempScreenshotPng)) {
        fs.unlinkSync(tempScreenshotPng);
      }
    } catch {
      // Ignore cleanup error
    }
    try {
      if (fs.existsSync(tempScreenshotJpg)) {
        fs.unlinkSync(tempScreenshotJpg);
      }
    } catch {
      // Ignore cleanup error
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
