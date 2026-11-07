import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");
const distDir = path.join(rootDir, "dist");

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <defs>
    <linearGradient id="fav-bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0b1329"/>
      <stop offset="50%" stop-color="#060b18"/>
      <stop offset="100%" stop-color="#020409"/>
    </linearGradient>
    <linearGradient id="fav-border" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.9"/>
      <stop offset="35%" stop-color="#0ea5e9" stop-opacity="0.4"/>
      <stop offset="70%" stop-color="#6366f1" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#00f0ff" stop-opacity="0.9"/>
    </linearGradient>
    <linearGradient id="fav-cyan" x1="14" y1="14" x2="48" y2="28" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00f0ff"/>
      <stop offset="50%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#2563eb"/>
    </linearGradient>
    <linearGradient id="fav-blue" x1="50" y1="50" x2="16" y2="36" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="50%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
    <linearGradient id="fav-slash" x1="22" y1="42" x2="42" y2="22" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00f0ff"/>
      <stop offset="50%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#818cf8"/>
    </linearGradient>
    <radialGradient id="fav-glow" cx="32" cy="32" r="22" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0ea5e9" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#0ea5e9" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#fav-bg)" stroke="url(#fav-border)" stroke-width="1.5"/>
  <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#fav-glow)"/>

  <!-- Code Bracket < (Top S loop) -->
  <path d="M 47 16.5 H 26 C 20.2 16.5 15.5 21.2 15.5 27 C 15.5 30.8 17.6 34.2 20.8 36 L 26 38" fill="none" stroke="url(#fav-cyan)" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>

  <!-- Code Bracket > (Bottom S loop) -->
  <path d="M 17 47.5 H 38 C 43.8 47.5 48.5 42.8 48.5 37 C 48.5 33.2 46.4 29.8 43.2 28 L 38 26" fill="none" stroke="url(#fav-blue)" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>

  <!-- Nexus Slash Core / -->
  <path d="M 22 42 L 42 22" fill="none" stroke="url(#fav-slash)" stroke-width="6" stroke-linecap="round"/>

  <!-- Optical Code Nodes -->
  <circle cx="15.5" cy="27" r="1.5" fill="#ffffff" opacity="0.95"/>
  <circle cx="48.5" cy="37" r="1.5" fill="#38bdf8" opacity="0.95"/>
</svg>`;

// Write public/favicon.svg
const publicFaviconSvg = path.join(publicDir, "favicon.svg");
fs.writeFileSync(publicFaviconSvg, svgContent, "utf8");
console.log("Updated public/favicon.svg");

// Write to dist if dist exists
if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, "favicon.svg"), svgContent, "utf8");
}

// Locate Chrome or Edge executable
let browserExec = null;
const possiblePaths = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  (process.env.LOCALAPPDATA || "") + "\\Google\\Chrome\\Application\\chrome.exe",
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

// Render sizes via HTML template
function createRenderHtml(size) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: ${size}px;
      height: ${size}px;
      overflow: hidden;
      background: transparent;
    }
    svg {
      width: 100%;
      height: 100%;
      display: block;
    }
  </style>
</head>
<body>
  ${svgContent}
</body>
</html>`;
}

function renderPngAtSize(size, outputPath) {
  const tempHtml = path.join(process.env.TEMP || "C:\\Windows\\Temp", `temp-icon-${size}.html`);
  const tempPng = path.join(process.env.TEMP || "C:\\Windows\\Temp", `temp-icon-${size}.png`);
  
  fs.writeFileSync(tempHtml, createRenderHtml(size), "utf8");
  const fileUrl = `file:///${tempHtml.replace(/\\/g, "/")}`;

  execSync(
    `"${browserExec}" --headless=new --disable-gpu --window-size=${size},${size} --default-background-color=00000000 --hide-scrollbars --screenshot="${tempPng}" "${fileUrl}"`,
    { stdio: "ignore" }
  );

  const pngData = fs.readFileSync(tempPng);
  fs.writeFileSync(outputPath, pngData);
  console.log(`Rendered ${outputPath} (${size}x${size}, ${pngData.length} bytes)`);

  // Cleanup temps
  try {
    fs.unlinkSync(tempHtml);
    fs.unlinkSync(tempPng);
  } catch {
    // Ignore cleanup errors
  }

  return pngData;
}

// Generate multi-resolution .ico containing 16x16, 32x32, and 48x48 PNG frames
function createIcoFile(images) {
  const headerSize = 6;
  const dirEntrySize = 16;
  const numImages = images.length;
  let offset = headerSize + numImages * dirEntrySize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = ICO
  header.writeUInt16LE(numImages, 4); // number of images

  const entries = [];
  const imageBuffers = [];

  for (const img of images) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(img.width === 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height === 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(img.data.length, 8); // size of image data
    entry.writeUInt32LE(offset, 12); // offset of image data

    entries.push(entry);
    imageBuffers.push(img.data);
    offset += img.data.length;
  }

  return Buffer.concat([header, ...entries, ...imageBuffers]);
}

if (browserExec) {
  try {
    // Generate all required PNG icons
    const png16 = renderPngAtSize(16, path.join(publicDir, "favicon-16x16.png"));
    const png32 = renderPngAtSize(32, path.join(publicDir, "favicon-32x32.png"));
    fs.writeFileSync(path.join(publicDir, "favicon-32.png"), png32);
    const png48 = renderPngAtSize(48, path.join(publicDir, "favicon-48x48.png"));
    renderPngAtSize(180, path.join(publicDir, "apple-touch-icon.png"));
    renderPngAtSize(192, path.join(publicDir, "favicon-192.png"));
    renderPngAtSize(512, path.join(publicDir, "favicon-512.png"));

    const icoBuffer = createIcoFile([
      { width: 16, height: 16, data: png16 },
      { width: 32, height: 32, data: png32 },
      { width: 48, height: 48, data: png48 },
    ]);

    const publicIcoPath = path.join(publicDir, "favicon.ico");
    fs.writeFileSync(publicIcoPath, icoBuffer);
    console.log(`Saved ${publicIcoPath} (${icoBuffer.length} bytes)`);

    // Clean up temporary 48x48 PNG if not needed
    if (fs.existsSync(path.join(publicDir, "favicon-48x48.png"))) {
      fs.unlinkSync(path.join(publicDir, "favicon-48x48.png"));
    }
  } catch (err) {
    console.warn(`Browser icon generation encountered warning: ${err.message}`);
  }
} else {
  console.log("No headless browser found; using existing PNG/ICO assets.");
}

// Sync all generated icons to dist if dist exists
if (fs.existsSync(distDir)) {
  const filesToSync = [
    "favicon.svg",
    "favicon.ico",
    "favicon-16x16.png",
    "favicon-32x32.png",
    "favicon-32.png",
    "apple-touch-icon.png",
    "favicon-192.png",
    "favicon-512.png",
  ];
  for (const f of filesToSync) {
    const src = path.join(publicDir, f);
    const dest = path.join(distDir, f);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
    }
  }
  console.log("Synced all favicon assets to dist/");
}

console.log("Favicon generation completed successfully!");
