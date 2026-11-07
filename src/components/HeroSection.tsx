import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Code,
  Download,
  Sparkles,
  Terminal,
  Activity,
  Layers,
  Cpu,
  CheckCircle2,
} from "lucide-react";
import { PROFILE } from "@/config/site";
import sameerPhoto from "@/assets/sameer-khan.png";
import { playClick } from "@/lib/audio";


interface HeroSectionProps {
  onOpenCv?: () => void;
}

export const HeroSection = ({ onOpenCv }: HeroSectionProps) => {
  const [activeHudTab, setActiveHudTab] = useState<"profile" | "architecture" | "telemetry" | "invictus">("profile");

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-14 items-center max-w-7xl mx-auto">
          {/* Left Column: Narrative & Action Controls */}
          <div>
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex flex-wrap sm:flex-nowrap items-center gap-2 max-w-full rounded-2xl sm:rounded-full border border-border/80 bg-secondary/40 px-3.5 py-1.5 text-xs font-mono text-muted-foreground backdrop-blur-md mb-6 hover:border-primary/40 transition-colors"
            >
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-foreground/90 font-medium">Frontend / Full-Stack Developer</span>
              <span className="text-border hidden sm:inline">|</span>
              <span className="text-cyan-400 font-semibold">Deepixel (Invictus AI) • Next.js • React • TS</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.08] mb-6"
            >
              Architecting <span className="text-foreground">Resilient</span>
              <br />
              <span className="tech-gradient-text text-glow">Modern Web Systems.</span>
            </motion.h1>

            {/* Subtitle / Narrative */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mb-8"
            >
              Hi, I&apos;m <span className="text-foreground font-semibold">{PROFILE.fullName}</span>.{" "}
              {PROFILE.heroDescription} Translating complex product requirements into responsive interfaces, streaming AI workflows, and validated production builds.
            </motion.p>

            {/* Primary Action Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8"
            >
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-heading text-sm font-bold text-primary-foreground shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all hover:opacity-95 hover:shadow-[0_0_35px_rgba(59,130,246,0.6)] active:scale-[0.96]"
              >
                Explore Projects
                <ArrowRight size={16} />
              </a>

              <a
                href="#experience"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border/80 bg-secondary/50 px-5 py-3 font-heading text-sm font-semibold text-foreground backdrop-blur-md transition-all hover:border-primary/40 hover:bg-secondary/80 active:scale-[0.96]"
              >
                <BriefcaseBusiness size={16} className="text-cyan-400" />
                Experience
              </a>

              {onOpenCv ? (
                <button
                  type="button"
                  onClick={onOpenCv}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-4 py-3 font-heading text-sm font-semibold text-cyan-300 transition-colors hover:bg-cyan-500/20 active:scale-[0.96]"
                >
                  <Download size={15} />
                  View &amp; Download CV
                </button>
              ) : (
                <a
                  href={PROFILE.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border/80 px-4 py-3 font-heading text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground hover:border-border active:scale-[0.96]"
                >
                  <Download size={15} />
                  CV
                </a>
              )}

              <a
                href={PROFILE.hireMeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border/80 px-4 py-3 font-heading text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground active:scale-[0.96]"
              >
                LinkedIn
              </a>
            </motion.div>

            {/* Quick Contact & Info Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap items-center gap-2.5 mb-8 text-xs font-mono text-muted-foreground"
            >
              <a
                href={PROFILE.phoneTel}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-secondary/60 border border-border/70 hover:border-emerald-500/40 hover:text-emerald-300 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {PROFILE.phone}
              </a>
              <a
                href={`mailto:${PROFILE.contactEmail}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-secondary/60 border border-border/70 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
              >
                {PROFILE.contactEmail}
              </a>
              <span className="px-2.5 py-1 rounded-lg bg-secondary/40 border border-border/50 text-[11px]">
                {PROFILE.location}
              </span>
            </motion.div>

            {/* Telemetry Metrics Strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl glass-card border border-border/60 max-w-xl"
            >
              <div className="flex flex-col items-center justify-center text-center p-1.5">
                <span className="font-mono text-2xl font-extrabold text-foreground tabular-nums">
                  12+
                </span>
                <span className="font-heading text-[11px] text-muted-foreground uppercase tracking-wider mt-0.5">
                  Deployments
                </span>
              </div>

              <div className="flex flex-col items-center justify-center text-center p-1.5 border-l border-border/40">
                <span className="font-mono text-2xl font-extrabold text-cyan-400 tabular-nums">
                  6
                </span>
                <span className="font-heading text-[11px] text-muted-foreground uppercase tracking-wider mt-0.5">
                  Full Architectures
                </span>
              </div>

              <div className="flex flex-col items-center justify-center text-center p-1.5 border-l border-border/40">
                <span className="font-mono text-2xl font-extrabold text-blue-400 tabular-nums">
                  3+
                </span>
                <span className="font-heading text-[11px] text-muted-foreground uppercase tracking-wider mt-0.5">
                  Years Production
                </span>
              </div>

              <div className="flex flex-col items-center justify-center text-center p-1.5 border-l border-border/40">
                <span className="font-mono text-2xl font-extrabold text-emerald-400 tabular-nums flex items-center gap-1">
                  100%
                  <Sparkles size={13} className="text-emerald-400 inline" />
                </span>
                <span className="font-heading text-[11px] text-muted-foreground uppercase tracking-wider mt-0.5">
                  Track Record
                </span>
              </div>
            </motion.div>

            {/* CLI Console hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-5 flex items-center gap-2 text-xs font-mono text-muted-foreground"
            >
              <Terminal size={13} className="text-cyan-400 shrink-0" />
              <span>
                Interactive CLI available: press <kbd className="px-1.5 py-0.5 bg-secondary/80 rounded border border-border/70 text-cyan-400 font-semibold text-[11px]">~</kbd> or <kbd className="px-1.5 py-0.5 bg-secondary/80 rounded border border-border/70 text-cyan-400 font-semibold text-[11px]">Ctrl+K</kbd> to launch console
              </span>
            </motion.div>
          </div>

          {/* Right Column: Interactive Engineering Telemetry & Visual Anchor */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {/* Ambient cybernetic halo */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-purple-500/20 blur-xl opacity-70 -z-10" />

            <div className="glass-panel rounded-3xl p-4 sm:p-5 border border-border/80 shadow-2xl relative overflow-hidden">
              {/* HUD Mode Switcher Header */}
              <div className="pb-3 mb-4 border-b border-border/60 text-xs font-mono space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-foreground font-semibold">MSA.OS v2.5</span>
                    <span className="text-muted-foreground hidden sm:inline">• Live Atelier</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-cyan-400 font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/25">
                    <Sparkles size={11} className="text-cyan-400" />
                    <span>HUD Feed</span>
                  </div>
                </div>

                {/* 4 Segmented HUD Tab Controls - Seamless 4-Col Grid with No-Scrollbar Defense */}
                <div className="grid grid-cols-4 gap-1 bg-secondary/70 p-1 rounded-lg border border-border/60 overflow-x-auto no-scrollbar scrollbar-none w-full font-sans">
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      setActiveHudTab("profile");
                    }}
                    className={`py-1.5 px-1 rounded-md transition-all text-center whitespace-nowrap text-[11px] sm:text-xs font-medium ${
                      activeHudTab === "profile"
                        ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                    }`}
                  >
                    Identity
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      setActiveHudTab("architecture");
                    }}
                    className={`py-1.5 px-1 rounded-md transition-all text-center whitespace-nowrap text-[11px] sm:text-xs font-medium ${
                      activeHudTab === "architecture"
                        ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                    }`}
                  >
                    System Flow
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      setActiveHudTab("telemetry");
                    }}
                    className={`py-1.5 px-1 rounded-md transition-all text-center whitespace-nowrap text-[11px] sm:text-xs font-medium ${
                      activeHudTab === "telemetry"
                        ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                    }`}
                  >
                    Telemetry
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      setActiveHudTab("invictus");
                    }}
                    className={`py-1.5 px-1 rounded-md transition-all text-center whitespace-nowrap text-[11px] sm:text-xs font-medium ${
                      activeHudTab === "invictus"
                        ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                    }`}
                  >
                    Invictus
                  </button>
                </div>
              </div>


              {/* Dynamic HUD Content */}
              <div className="min-h-[300px]">
                {activeHudTab === "profile" && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3.8] bg-gradient-to-b from-secondary/80 to-background/90 flex items-end justify-center border border-border/50">
                      <div className="absolute inset-0 bg-radial from-blue-500/10 via-transparent to-transparent pointer-events-none" />
                      <img
                        src={sameerPhoto}
                        alt={PROFILE.fullName}
                        className="relative z-10 w-full h-full object-cover object-top filter brightness-95 contrast-105"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background via-background/70 to-transparent z-10" />

                      <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between">
                        <div>
                          <p className="font-heading text-sm font-bold text-foreground">
                            {PROFILE.fullName}
                          </p>
                          <p className="text-[11px] text-cyan-400 font-mono">
                            Full-Stack Software Engineer
                          </p>
                        </div>
                        <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Online
                        </span>
                      </div>
                    </div>

                    {/* Quick meta pills */}
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div className="p-2.5 rounded-xl bg-secondary/50 border border-border/50">
                        <span className="text-[10px] text-muted-foreground block">Stack Core</span>
                        <span className="font-semibold text-foreground text-[11px]">
                          React 19 • Next.js • FastAPI
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-secondary/50 border border-border/50">
                        <span className="text-[10px] text-muted-foreground block">Availability</span>
                        <span className="font-semibold text-emerald-400 text-[11px]">
                          Immediate / Remote Worldwide
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeHudTab === "architecture" && (
                  <motion.div
                    key="architecture"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="p-3 space-y-3 font-mono text-xs"
                  >
                    <div className="flex items-center justify-between text-muted-foreground text-[11px] pb-1 border-b border-border/40">
                      <span>Tier Layer</span>
                      <span>Target Implementation</span>
                    </div>

                    {[
                      { layer: "01. Client Edge", tech: "React 19, Next.js 15 SSR, Zustand", speed: "P95: 14ms" },
                      { layer: "02. Microservices", tech: "FastAPI Python, Laravel, Node.js", speed: "Async" },
                      { layer: "03. Data Tier", tech: "PostgreSQL, Prisma ACID, MongoDB Atlas", speed: "Strict" },
                      { layer: "04. AI Pipelines", tech: "Gemini 2.0 Flash, OCR, Invoicing", speed: "Stream" },
                      { layer: "05. Cloud Runtime", tech: "Docker, Vercel, Netlify, Git CI/CD", speed: "Live" },
                    ].map((row, i) => (
                      <div
                        key={row.layer}
                        className="p-2.5 rounded-lg bg-secondary/40 border border-border/60 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-cyan-400 font-bold">{i + 1}</span>
                          <div>
                            <p className="font-bold text-foreground text-[11px]">{row.layer}</p>
                            <p className="text-[10px] text-muted-foreground">{row.tech}</p>
                          </div>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                          {row.speed}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeHudTab === "telemetry" && (
                  <motion.div
                    key="telemetry"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="p-3 space-y-3 font-mono text-xs"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-secondary/50 border border-border/60">
                        <span className="text-muted-foreground text-[10px] flex items-center gap-1">
                          <Activity size={12} className="text-emerald-400" /> API Uptime
                        </span>
                        <p className="font-bold text-lg text-foreground mt-1">99.98%</p>
                        <p className="text-[10px] text-emerald-400">Production SLAs met</p>
                      </div>

                      <div className="p-3 rounded-xl bg-secondary/50 border border-border/60">
                        <span className="text-muted-foreground text-[10px] flex items-center gap-1">
                          <Cpu size={12} className="text-cyan-400" /> Avg Latency
                        </span>
                        <p className="font-bold text-lg text-foreground mt-1">&lt; 85ms</p>
                        <p className="text-[10px] text-cyan-400">Sub-second UX</p>
                      </div>

                      <div className="p-3 rounded-xl bg-secondary/50 border border-border/60">
                        <span className="text-muted-foreground text-[10px] flex items-center gap-1">
                          <Layers size={12} className="text-purple-400" /> Shipped Systems
                        </span>
                        <p className="font-bold text-lg text-foreground mt-1">6 Enterprise</p>
                        <p className="text-[10px] text-purple-400">Fintech, AI, GIS, Media</p>
                      </div>

                      <div className="p-3 rounded-xl bg-secondary/50 border border-border/60">
                        <span className="text-muted-foreground text-[10px] flex items-center gap-1">
                          <CheckCircle2 size={12} className="text-blue-400" /> Test Coverage
                        </span>
                        <p className="font-bold text-lg text-foreground mt-1">100% Passed</p>
                        <p className="text-[10px] text-blue-400">Vitest & TypeScript</p>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      All production systems operational across Vercel, Netlify, and Cloudinary.
                    </div>
                  </motion.div>
                )}

                {activeHudTab === "invictus" && (
                  <motion.div
                    key="invictus"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="p-3 space-y-3 font-mono text-xs"
                  >
                    <div className="p-3 rounded-xl bg-secondary/50 border border-border/60">
                      <div className="flex items-center justify-between pb-1.5 border-b border-border/40 mb-2">
                        <span className="text-foreground font-bold flex items-center gap-1.5">
                          <Sparkles size={13} className="text-amber-400" /> Deepixel • Invictus Platform
                        </span>
                        <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                          Active Role
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        AI Deal Intelligence platform with streaming SSE progress, Tiptap rich document engine, and multi-viewport responsive shell.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2.5 rounded-lg bg-secondary/40 border border-border/50">
                        <span className="text-muted-foreground text-[10px] block">Streaming Workspace</span>
                        <span className="font-semibold text-cyan-300">SSE + Timeout Recovery</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-secondary/40 border border-border/50">
                        <span className="text-muted-foreground text-[10px] block">Display Scaling</span>
                        <span className="font-semibold text-primary">Windows 125% &amp; 150%</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-secondary/40 border border-border/50">
                        <span className="text-muted-foreground text-[10px] block">Document Editor</span>
                        <span className="font-semibold text-purple-300">Tiptap Table Engine</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-secondary/40 border border-border/50">
                        <span className="text-muted-foreground text-[10px] block">Visual Regression</span>
                        <span className="font-semibold text-emerald-400">21 Playwright Views</span>
                      </div>
                    </div>

                    <a
                      href="#experience"
                      className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-primary/10 border border-primary/30 text-cyan-300 hover:bg-primary/20 transition-colors text-[11px] font-semibold"
                    >
                      <span>Explore Deepixel Case Study</span>
                      <ArrowRight size={12} />
                    </a>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
