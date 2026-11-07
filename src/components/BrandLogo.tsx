import React, { useId } from "react";
import { cn } from "@/lib/utils";

export interface BrandLogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  variant?: "default" | "minimal" | "metallic" | "monochrome";
  glow?: boolean;
  withContainer?: boolean;
  className?: string;
}

/**
 * Bespoke Brand Logo Mark for Muhammad Sameer Ali (Software Architecture & Engineering)
 *
 * Geometric Symbolism:
 * - Unmistakable "S" monogram representing Sameer & Systems Architecture
 * - Interlocking code brackets `<` and `>` meeting at an energetic code slash `/`
 * - Cybernetic isometric nexus topology representing Architecture, Interface, and Intelligence
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 36,
  variant = "default",
  glow = true,
  withContainer = true,
  className,
  ...props
}) => {
  const rawId = useId();
  // Sanitize React useId colons for valid SVG URL references (e.g. :r1: -> r1)
  const uid = rawId.replace(/[^a-zA-Z0-9_-]/g, "");

  const bgGradId = `brand-bg-${uid}`;
  const borderGradId = `brand-border-${uid}`;
  const cyanGradId = `brand-cyan-${uid}`;
  const blueGradId = `brand-blue-${uid}`;
  const coreGradId = `brand-core-${uid}`;
  const glowGradId = `brand-glow-${uid}`;
  const metallicGradId = `brand-metal-${uid}`;
  const metallicRimId = `brand-metal-rim-${uid}`;

  const isMetallic = variant === "metallic";
  const isMonochrome = variant === "monochrome";
  const showContainer = withContainer && variant !== "minimal";

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={cn(
        "shrink-0 select-none transition-transform duration-300",
        glow && "hover:scale-105",
        className
      )}
      role="img"
      aria-label="Sameer Ali - Software Architecture & Interface Brand Mark"
      {...props}
    >
      <defs>
        {/* Cyber Badging Gradients */}
        <linearGradient id={bgGradId} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0b1329" />
          <stop offset="50%" stopColor="#060b18" />
          <stop offset="100%" stopColor="#020409" />
        </linearGradient>

        <linearGradient id={borderGradId} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
          <stop offset="35%" stopColor="#0ea5e9" stopOpacity="0.4" />
          <stop offset="70%" stopColor="#6366f1" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.85" />
        </linearGradient>

        <radialGradient id={glowGradId} cx="32" cy="32" r="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
        </radialGradient>

        {/* Cyber Cyan / Azure Loop (Top Bracket <) */}
        <linearGradient id={cyanGradId} x1="14" y1="14" x2="48" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00f0ff" />
          <stop offset="50%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>

        {/* Azure / Indigo Loop (Bottom Bracket >) */}
        <linearGradient id={blueGradId} x1="50" y1="50" x2="16" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>

        {/* Nexus Core / Code Slash */}
        <linearGradient id={coreGradId} x1="22" y1="42" x2="42" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00f0ff" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>

        {/* Metallic Specular Chrome Gradients for iPhone Emboss */}
        <linearGradient id={metallicGradId} x1="16" y1="16" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="25%" stopColor="#cbd5e1" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#94a3b8" stopOpacity="0.75" />
          <stop offset="75%" stopColor="#e2e8f0" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
        </linearGradient>

        <linearGradient id={metallicRimId} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#64748b" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* Outer Squircle Container Frame (when enabled) */}
      {showContainer && !isMetallic && (
        <>
          <rect
            x="2"
            y="2"
            width="60"
            height="60"
            rx="16"
            fill={`url(#${bgGradId})`}
            stroke={`url(#${borderGradId})`}
            strokeWidth="1.5"
          />
          <rect
            x="2"
            y="2"
            width="60"
            height="60"
            rx="16"
            fill={`url(#${glowGradId})`}
          />
        </>
      )}

      {showContainer && isMetallic && (
        <rect
          x="2"
          y="2"
          width="60"
          height="60"
          rx="16"
          fill="rgba(255, 255, 255, 0.04)"
          stroke={`url(#${metallicRimId})`}
          strokeWidth="1.5"
        />
      )}

      {/* Code Bracket < (Top S loop) */}
      <path
        d="M 47 16.5 H 26 C 20.2 16.5 15.5 21.2 15.5 27 C 15.5 30.8 17.6 34.2 20.8 36 L 26 38"
        fill="none"
        stroke={
          isMetallic
            ? `url(#${metallicGradId})`
            : isMonochrome
            ? "currentColor"
            : `url(#${cyanGradId})`
        }
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Code Bracket > (Bottom S loop) */}
      <path
        d="M 17 47.5 H 38 C 43.8 47.5 48.5 42.8 48.5 37 C 48.5 33.2 46.4 29.8 43.2 28 L 38 26"
        fill="none"
        stroke={
          isMetallic
            ? `url(#${metallicGradId})`
            : isMonochrome
            ? "currentColor"
            : `url(#${blueGradId})`
        }
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Nexus Slash Core / */}
      <path
        d="M 22 42 L 42 22"
        fill="none"
        stroke={
          isMetallic
            ? `url(#${metallicGradId})`
            : isMonochrome
            ? "currentColor"
            : `url(#${coreGradId})`
        }
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Optical Code Syntax Nodes */}
      {!isMonochrome && !isMetallic && (
        <>
          <circle cx="15.5" cy="27" r="1.5" fill="#ffffff" opacity="0.95" />
          <circle cx="48.5" cy="37" r="1.5" fill="#38bdf8" opacity="0.95" />
        </>
      )}
      {isMetallic && (
        <>
          <circle cx="15.5" cy="27" r="1.5" fill="#ffffff" opacity="0.95" />
          <circle cx="48.5" cy="37" r="1.5" fill="#e2e8f0" opacity="0.9" />
        </>
      )}
    </svg>
  );
};

export default BrandLogo;
