import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Activity,
  Bot,
  CheckCircle2,
  Cpu,
  FileSpreadsheet,
  Globe,
  Layers,
  MonitorCheck,
  RefreshCw,
  Smartphone,
  Sparkles,
  Terminal,
  Workflow,
} from "lucide-react";
import { EXPERIENCES } from "@/config/site";
import { playClick, playBlip, playPulse } from "@/lib/audio";


export const ExperienceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeDeepixelTab, setActiveDeepixelTab] = useState<"sse" | "tiptap" | "scaling" | "playwright">("sse");
  const [streamProgress, setStreamProgress] = useState(78);
  const [scaleFactor, setScaleFactor] = useState<"100%" | "125%" | "150%">("125%");

  const deepixel = EXPERIENCES[0];
  const contract = EXPERIENCES[1];

  return (
    <section id="experience" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400 mb-3">
            Career &amp; Engineering Depth
          </p>
          <h2
            id="experience-heading"
            className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground"
          >
            Professional <span className="tech-gradient-text">Experience</span> &amp; Impact
          </h2>
          <p className="font-body text-sm md:text-base text-muted-foreground mt-4 max-w-2xl mx-auto">
            From streaming AI deal intelligence workflows at Deepixel to full-cycle contract engineering for global clients.
          </p>
        </motion.div>

        {/* Flagship Enterprise Experience: Deepixel */}
        <div className="max-w-6xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-panel rounded-3xl p-6 sm:p-10 border border-border/80 shadow-2xl relative overflow-hidden"
          >
            {/* Ambient cybernetic accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/10 via-cyan-500/10 to-transparent blur-3xl -z-10" />

            {/* Header info */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-border/60">
              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-2">
                  <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-mono font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Current Role
                  </span>
                  <span className="font-mono text-xs text-cyan-400 font-semibold">
                    {deepixel.period}
                  </span>
                  <span className="text-border hidden sm:inline">•</span>
                  <span className="font-mono text-xs text-muted-foreground flex items-center gap-1">
                    <Globe size={12} className="text-cyan-400" />
                    {deepixel.location}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-foreground">
                  {deepixel.company} — <span className="text-cyan-400">{deepixel.role}</span>
                </h3>
                <p className="font-heading text-sm sm:text-base font-semibold text-primary/90 mt-1 flex items-center gap-2">
                  <Sparkles size={15} className="text-amber-400" />
                  {deepixel.product}
                </p>
              </div>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-1.5 max-w-md">
                {deepixel.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-lg bg-secondary/70 border border-border/70 text-[11px] font-mono text-foreground/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Core Accomplishments 6-Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
              {[
                {
                  icon: Smartphone,
                  title: "Mobile Shell & PWA Setup",
                  desc: "Built a responsive mobile shell with bottom navigation and Progressive Web App (PWA) setup; fixed standalone login persistence and adapted dashboards, report viewers and multi-step forms for mobile and tablet screens.",
                  tag: "PWA • Auth Session • Mobile Views",
                },
                {
                  icon: Bot,
                  title: "AI Report Workspace with SSE",
                  desc: "Implemented an AI report workspace with SSE progress, user clarification prompts and saved deal/document context; added timeout recovery and editable partial drafts while preserving the guided report workflow.",
                  tag: "SSE Stream • Timeout Recovery • AI Drafts",
                },
                {
                  icon: FileSpreadsheet,
                  title: "Tiptap Table Engine Stabilization",
                  desc: "Stabilized Tiptap table editing by fixing stale-state overwrites, table parsing and nested-table insertion; improved report review, validation and export interfaces.",
                  tag: "Tiptap Rich Text • Table Integrity • Export",
                },
                {
                  icon: MonitorCheck,
                  title: "125% & 150% Windows Scaling",
                  desc: "Added automatic display scaling for Windows 125% and 150% settings plus a saved user control, making dense screens easier to use on scaled laptops.",
                  tag: "DPI Scaling • Responsive Density • Usability",
                },
                {
                  icon: Activity,
                  title: "21-View Playwright Screen Audits",
                  desc: "Audited 21 application views across four viewport sizes using Playwright screenshots; added 17 report-flow utility tests and verified changes with TypeScript checks and production builds.",
                  tag: "Playwright E2E • 17 Vitest Tests • CI/CD",
                },
                {
                  icon: Terminal,
                  title: "Docker Startup & Health Tooling",
                  desc: "Supported local development with Docker startup scripts, service health checks and troubleshooting of authentication, API configuration and document-processing issues.",
                  tag: "Docker • Health Checks • Developer Ergonomics",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl p-5 bg-secondary/40 border border-border/60 hover:border-primary/40 hover:box-glow-cyan transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2.5 rounded-xl bg-primary/10 text-cyan-400">
                        <item.icon size={18} />
                      </div>
                      <h4 className="font-heading text-sm font-bold text-foreground leading-snug">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed font-body">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/40">
                    <span className="text-[10px] font-mono text-cyan-400/90 font-semibold block">
                      {item.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Invictus Atelier Playground */}
            <div className="mt-8 rounded-2xl bg-[#070b14] border border-border/80 overflow-hidden">
              <div className="flex flex-wrap items-center justify-between px-5 py-3.5 bg-secondary/60 border-b border-border/60 gap-2">
                <div className="flex items-center gap-2">
                  <Workflow size={16} className="text-cyan-400" />
                  <span className="font-heading text-xs sm:text-sm font-bold text-foreground">
                    Invictus Live Architectural Simulator
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono overflow-x-auto max-w-full pb-1 no-scrollbar scrollbar-none">
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      setActiveDeepixelTab("sse");
                    }}
                    className={`px-3 py-1.5 rounded-md transition-colors shrink-0 whitespace-nowrap ${
                      activeDeepixelTab === "sse"
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    SSE Stream Flow
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      setActiveDeepixelTab("tiptap");
                    }}
                    className={`px-3 py-1.5 rounded-md transition-colors shrink-0 whitespace-nowrap ${
                      activeDeepixelTab === "tiptap"
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Tiptap Table Engine
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      setActiveDeepixelTab("scaling");
                    }}
                    className={`px-3 py-1.5 rounded-md transition-colors shrink-0 whitespace-nowrap ${
                      activeDeepixelTab === "scaling"
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    DPI Scaling
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playClick();
                      setActiveDeepixelTab("playwright");
                    }}
                    className={`px-3 py-1.5 rounded-md transition-colors shrink-0 whitespace-nowrap ${
                      activeDeepixelTab === "playwright"
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Playwright Audits
                  </button>
                </div>
              </div>

              <div className="p-5 sm:p-6 text-xs font-mono">
                {activeDeepixelTab === "sse" && (
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-border/50 text-muted-foreground">
                      <span>Server-Sent Events Pipeline: /api/v1/deals/report/stream</span>
                      <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Connected (P95: 18ms)
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-foreground">AI Deal Synthesis Progress</span>
                        <span className="text-cyan-400 font-bold">{streamProgress}% Complete</span>
                      </div>
                      <div className="h-2 w-full bg-secondary/80 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 transition-all duration-300"
                          style={{ width: `${streamProgress}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-secondary/40 border border-border/50 space-y-1.5 text-[11px]">
                      <p className="text-cyan-300">[0.00s] SSE handshake established • Deal Context UUID: d89f-21ae</p>
                      <p className="text-muted-foreground">[0.42s] Financial tables ingested (14 rows, 6 columns)</p>
                      <p className="text-muted-foreground">[0.88s] Clarification prompt evaluated: EBITDA normalized</p>
                      <p className="text-emerald-400">[1.35s] Streaming chunk #{Math.floor(streamProgress * 0.65)}: Risk matrix &amp; draft saved locally</p>
                      {streamProgress >= 100 && (
                        <p className="text-cyan-400 font-bold">[1.82s] Synthesis complete • Executive report ready for export</p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          playBlip(780);
                          setStreamProgress((prev) => (prev >= 100 ? 25 : prev + 25));
                        }}
                        className="px-3 py-1.5 rounded-lg bg-secondary hover:bg-primary/20 text-foreground font-semibold flex items-center gap-1.5 transition-colors active:scale-95"
                      >
                        <RefreshCw size={12} className="text-cyan-400" />
                        Simulate Next Stream Chunk
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          playPulse();
                          setStreamProgress(streamProgress >= 100 ? 25 : 100);
                        }}
                        className="px-3 py-1.5 rounded-lg border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 font-semibold transition-colors active:scale-95"
                      >
                        {streamProgress >= 100 ? "Reset Stream" : "Complete Full Synthesis"}
                      </button>
                      <span className="text-muted-foreground text-[10px] hidden sm:inline">
                        Includes timeout recovery &amp; editable partial draft state
                      </span>
                    </div>
                  </div>
                )}

                {activeDeepixelTab === "tiptap" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-muted-foreground pb-2 border-b border-border/50">
                      <span>Tiptap Headless Document Editor</span>
                      <span className="text-cyan-400 font-semibold">Nested-Table Overwrite Guard Active</span>
                    </div>

                    <div className="p-4 rounded-xl bg-secondary/30 border border-border/60 font-body text-xs text-foreground/90 space-y-2">
                      <div className="flex items-center justify-between border-b border-border/40 pb-2">
                        <span className="font-heading font-bold text-sm text-foreground">
                          Executive Deal Summary: Series B Valuation
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[10px] font-mono">
                          Validated State
                        </span>
                      </div>
                      <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left font-mono text-[11px] border-collapse">
                          <thead>
                            <tr className="border-b border-border/60 text-muted-foreground">
                              <th className="py-1">Metric</th>
                              <th className="py-1">FY24 Actual</th>
                              <th className="py-1">FY25 Projection</th>
                              <th className="py-1">Variance</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border/40 text-foreground">
                            <tr>
                              <td className="py-1 text-cyan-300">ARR Growth</td>
                              <td className="py-1">$12.4M</td>
                              <td className="py-1 font-bold text-foreground">$21.8M</td>
                              <td className="py-1 text-emerald-400 font-bold">+75.8%</td>
                            </tr>
                            <tr>
                              <td className="py-1 text-cyan-300">Net Retention</td>
                              <td className="py-1">118%</td>
                              <td className="py-1 font-bold text-foreground">126%</td>
                              <td className="py-1 text-emerald-400 font-bold">+8.0%</td>
                            </tr>
                            <tr>
                              <td className="py-1 text-cyan-300">EBITDA Margin</td>
                              <td className="py-1">-14.2%</td>
                              <td className="py-1 font-bold text-foreground">+6.5%</td>
                              <td className="py-1 text-emerald-400 font-bold">+20.7 pts</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
                      <span>Fixed stale-state overwrites during concurrent AI stream appends and structured HTML/Markdown table parsing.</span>
                      <span className="text-emerald-400 font-mono text-[10px] hidden sm:inline">Transaction Lock: OK</span>
                    </div>
                  </div>
                )}

                {activeDeepixelTab === "scaling" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-muted-foreground pb-2 border-b border-border/50">
                      <span>Windows Scaling Adaptability (125% / 150%)</span>
                      <div className="flex items-center gap-1.5">
                        {(["100%", "125%", "150%"] as const).map((factor) => (
                          <button
                            key={factor}
                            type="button"
                            onClick={() => {
                              playClick();
                              setScaleFactor(factor);
                            }}
                            className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all ${
                              scaleFactor === factor
                                ? "bg-cyan-500 text-black shadow-md"
                                : "bg-secondary/70 text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {factor}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div
                      className="p-4 rounded-xl bg-secondary/30 border border-border/60 transition-all duration-300 overflow-hidden"
                      style={{
                        transform: scaleFactor === "125%" ? "scale(1.04)" : scaleFactor === "150%" ? "scale(1.08)" : "scale(1)",
                        transformOrigin: "top left",
                      }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-foreground font-semibold">Scaled View Preview ({scaleFactor})</p>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-cyan-300 border border-primary/20">
                          DPI Ratio: {scaleFactor === "150%" ? "1.50x" : scaleFactor === "125%" ? "1.25x" : "1.00x"}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-1">
                        Ensures dense analytical dashboards, financial spreadsheets, and multi-step forms remain clear, legible, and unclipped on laptops with Windows display zoom active.
                      </p>
                    </div>
                  </div>
                )}

                {activeDeepixelTab === "playwright" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-muted-foreground pb-2 border-b border-border/50">
                      <span>Automated Playwright Multi-Viewport Matrix</span>
                      <span className="text-emerald-400 font-semibold">21 Views Verified</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                      {[
                        { name: "Mobile", size: "375 × 667", status: "Pass (0 diff)" },
                        { name: "Tablet", size: "768 × 1024", status: "Pass (0 diff)" },
                        { name: "Laptop 125%", size: "1280 × 800", status: "Pass (0 diff)" },
                        { name: "Desktop", size: "1920 × 1080", status: "Pass (0 diff)" },
                      ].map((item) => (
                        <div key={item.name} className="p-2.5 rounded-lg bg-secondary/40 border border-border/50 hover:border-primary/40 transition-colors">
                          <p className="text-foreground font-bold">{item.name}</p>
                          <p className="text-[10px] text-muted-foreground">{item.size}</p>
                          <p className="text-[10px] text-emerald-400 mt-1 font-semibold">{item.status}</p>
                        </div>
                      ))}
                    </div>

                    <p className="text-[11px] text-muted-foreground">
                      Covered 17 report-flow utility tests, PWA authentication persistence, and visual regression benchmarks.
                    </p>
                  </div>
                )}
              </div>

            </div>
          </motion.div>
        </div>

        {/* Contract Software Engineering Experience */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto glass-card rounded-2xl p-6 sm:p-8 border border-border/70"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/50">
            <div>
              <span className="font-mono text-xs text-cyan-400 font-semibold">
                {contract.period}
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground mt-0.5">
                {contract.role}
              </h3>
              <p className="text-xs text-muted-foreground font-mono mt-0.5">
                {contract.company} • {contract.location}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {contract.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-0.5 rounded bg-secondary/80 border border-border/60 text-[10px] font-mono text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5 space-y-2 text-xs sm:text-sm text-foreground/90 font-body">
            <p className="leading-relaxed">
              {contract.description}
            </p>
            <ul className="space-y-1.5 pl-4 list-disc text-muted-foreground">
              {contract.highlights.map((h) => (
                <li key={h} className="leading-relaxed">
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
