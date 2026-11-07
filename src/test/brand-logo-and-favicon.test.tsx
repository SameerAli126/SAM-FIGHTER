import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";
import { BrandLogo } from "@/components/BrandLogo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MemoryRouter } from "react-router-dom";

const rootDir = path.resolve(__dirname, "../..");
const publicDir = path.join(rootDir, "public");

describe("BrandLogo Component", () => {
  it("renders default brand logo with accessible role and aria-label", () => {
    const { container } = render(<BrandLogo size={48} className="custom-test-logo" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("width", "48");
    expect(svg).toHaveAttribute("height", "48");
    expect(svg).toHaveAttribute("role", "img");
    expect(svg).toHaveAttribute("aria-label");
    expect(svg?.classList.contains("custom-test-logo")).toBe(true);

    // Should include squircle background container in default mode
    const rects = container.querySelectorAll("rect");
    expect(rects.length).toBeGreaterThan(0);
  });

  it("renders minimal variant without outer container rect", () => {
    const { container } = render(<BrandLogo variant="minimal" size={24} />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("width", "24");
    // In minimal mode, outer background container is not rendered
    const rects = container.querySelectorAll("rect");
    expect(rects.length).toBe(0);
  });

  it("renders metallic variant for embossed hardware chassis", () => {
    const { container } = render(<BrandLogo variant="metallic" size={46} />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(container.innerHTML).toContain("brand-metal");
  });

  it("renders monochrome variant with currentColor stroke", () => {
    const { container } = render(<BrandLogo variant="monochrome" size={32} />);
    const paths = container.querySelectorAll("path");
    expect(paths.length).toBeGreaterThanOrEqual(3);
    const strokeValues = Array.from(paths).map((p) => p.getAttribute("stroke"));
    expect(strokeValues).toContain("currentColor");
  });
});

describe("Favicon and Touch Icon Assets Validation", () => {
  it("verifies public/favicon.svg exists and does NOT contain legacy fighter theme colors", () => {
    const svgPath = path.join(publicDir, "favicon.svg");
    expect(fs.existsSync(svgPath)).toBe(true);

    const content = fs.readFileSync(svgPath, "utf8");
    expect(content).toContain("<svg");
    expect(content).toContain("</svg>");
    expect(content).toContain("viewBox=\"0 0 64 64\"");

    // Legacy fighter theme had red/orange flame colors #f45b69, #f08a24, #f4c95d
    expect(content).not.toContain("#f45b69");
    expect(content).not.toContain("#f08a24");
    expect(content).not.toContain("#f4c95d");

    // Must contain cyber cyan and azure gradients
    expect(content).toContain("#00f0ff");
    expect(content).toContain("#38bdf8");
  });

  it("verifies multi-resolution favicon.ico exists and has valid ICO header", () => {
    const icoPath = path.join(publicDir, "favicon.ico");
    expect(fs.existsSync(icoPath)).toBe(true);

    const buffer = fs.readFileSync(icoPath);
    // ICO header magic: 0x0000 0x0001
    expect(buffer.readUInt16LE(0)).toBe(0);
    expect(buffer.readUInt16LE(2)).toBe(1);
    const imageCount = buffer.readUInt16LE(4);
    expect(imageCount).toBeGreaterThanOrEqual(2);
  });

  it("verifies crisp PNG icons exist at all required standard dimensions", () => {
    const requiredIcons = [
      { file: "favicon-16x16.png", width: 16, height: 16 },
      { file: "favicon-32x32.png", width: 32, height: 32 },
      { file: "favicon-32.png", width: 32, height: 32 },
      { file: "apple-touch-icon.png", width: 180, height: 180 },
      { file: "favicon-192.png", width: 192, height: 192 },
      { file: "favicon-512.png", width: 512, height: 512 },
    ];

    const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

    for (const { file, width, height } of requiredIcons) {
      const fullPath = path.join(publicDir, file);
      expect(fs.existsSync(fullPath)).toBe(true);

      const buf = fs.readFileSync(fullPath);
      expect(buf.subarray(0, 8).equals(pngSignature)).toBe(true);
      expect(buf.readUInt32BE(16)).toBe(width);
      expect(buf.readUInt32BE(20)).toBe(height);
    }
  });

  it("verifies public/site.webmanifest references modern favicon assets", () => {
    const manifestPath = path.join(publicDir, "site.webmanifest");
    expect(fs.existsSync(manifestPath)).toBe(true);

    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    expect(manifest.icons).toBeDefined();
    const srcs = manifest.icons.map((i: { src: string }) => i.src);
    expect(srcs).toContain("/favicon.svg");
    expect(srcs).toContain("/favicon.ico");
    expect(srcs).toContain("/apple-touch-icon.png");
    expect(srcs).toContain("/favicon-192.png");
    expect(srcs).toContain("/favicon-512.png");
  });

  it("verifies index.html links all favicon and touch icon variants", () => {
    const indexPath = path.join(rootDir, "index.html");
    const html = fs.readFileSync(indexPath, "utf8");

    expect(html).toContain('<link rel="icon" type="image/svg+xml" href="/favicon.svg"');
    expect(html).toContain('<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"');
    expect(html).toContain('<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"');
    expect(html).toContain('<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"');
    expect(html).toContain('<link rel="shortcut icon" href="/favicon.ico"');
    expect(html).toContain('<link rel="manifest" href="/site.webmanifest"');
  });
});

describe("Integration Across Components", () => {
  it("renders bespoke BrandLogo in Navbar instead of raw initials MSA text", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Brand logo should be rendered with role="img"
    const logos = screen.getAllByRole("img", { name: /Sameer Ali - Software Architecture/i });
    expect(logos.length).toBeGreaterThan(0);

    // Navbar header link should not contain a text-only "MSA" badge
    const brandLink = screen.getByText(/Muhammad Sameer Ali/i).closest("a");
    expect(brandLink).toBeInTheDocument();
    expect(brandLink?.querySelector("svg")).toBeInTheDocument();
  });

  it("renders BrandLogo in Footer component", () => {
    render(<Footer />);
    const footerLogo = screen.getByRole("img", { name: /Sameer Ali - Software Architecture/i });
    expect(footerLogo).toBeInTheDocument();
  });
});
