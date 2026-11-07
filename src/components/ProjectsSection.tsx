import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ChevronDown, ChevronUp, ExternalLink, Github, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { PROJECTS, type Project } from "@/config/site";

// Architectural highlights for each shipped product
const ARCHITECTURE_NOTES: Record<string, string[]> = {
  WordWanderer: [
    "Zustand client state sync for zero-latency UI progression",
    "MongoDB pipeline for streak calculation & quest reward verification",
    "Modular lesson engine with optimistic client-side quiz evaluation",
  ],
  "OptiTrade 3.0": [
    "High-frequency portfolio telemetry dashboard with JWT token rotation",
    "Optimized Next.js 15 SSR layouts with streaming data tables",
    "Sub-15ms client calculations on multi-asset watchlists",
  ],
  "InvoiceGen Pro": [
    "Gemini 2.0 Flash integration for natural language invoice composition",
    "Client card OCR & business data extraction pipeline",
    "Automated PDF export engine with Stripe webhook verification",
  ],
  "PhotoStream / SnapCloud": [
    "High-throughput FastAPI Python backend with async image ingestion",
    "Dual decoupled frontend implementations (React + SnapCloud client) on 1 API",
    "MongoDB Atlas cloud persistence with Cloudinary asset optimization",
  ],
  SAMIO: [
    "Local-first personal finance engine with structured relational data",
    "Prisma ORM with strict ACID financial transaction guarantees",
    "OTP authentication flow with multi-tier administrative CRUD workflows",
  ],
  "Peshawar Civic GIS Atlas": [
    "Laravel backend with geo-spatial ingestion and spatial data validation",
    "Leaflet interactive mapping engine with customizable geo-layers",
    "Provenance-aware public publishing workflows with role-based access control",
  ],
  "Invictus (Deepixel)": [
    "SSE streaming AI report generation with user clarification prompts & recovery",
    "Tiptap rich text table engine stabilization and robust Markdown/HTML parsing",
    "Responsive mobile PWA shell with persistent authentication across standalone modes",
    "Automatic display scaling engine for Windows 125% and 150% scaled displays",
  ],
  "Wheel on Reels": [
    "Dynamic Next.js 3D automotive presentation layer with smooth transitions",
    "Fluid micro-interactions and GPU-accelerated rendering pipelines",
    "Responsive full-bleed layout with performance-tuned image caching",
  ],
  Iphone3D: [
    "GSAP 3D matrix transformation algorithms with scroll-linked camera tracking",
    "Canvas hardware-accelerated shaders and sub-pixel optical smoothing",
    "Responsive viewport-adaptive 3D asset rendering with zero layout shift",
  ],
};

const ProjectCard = ({ project, index, inView }: { project: Project; index: number; inView: boolean }) => {
  const [expanded, setExpanded] = useState(false);
  const notes = ARCHITECTURE_NOTES[project.title] || [];

  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="glass-card rounded-2xl overflow-hidden border border-border/70 hover:border-primary/40 hover:box-glow-cyan transition-all duration-300 flex flex-col"
    >
      <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500" />

      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
        <div>
          {/* Top metadata line */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <span className="font-mono text-xs text-cyan-400 font-semibold tracking-wide">
              {project.dateRange}
            </span>
            <span className="rounded-full bg-secondary/80 border border-border/70 px-3 py-1 font-mono text-[11px] text-muted-foreground">
              {project.category}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="font-display text-2xl md:text-3xl font-extrabold text-foreground mb-3 group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed mb-5">
            {project.description}
          </p>

          {/* Impact Callout */}
          <div className="rounded-xl bg-secondary/50 border border-border/60 p-4 mb-6">
            <div className="flex items-center gap-2 mb-1.5 text-xs font-heading font-bold uppercase tracking-wider text-primary">
              <Sparkles size={14} className="text-cyan-400" />
              <span>Production Impact</span>
            </div>
            <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-body">
              {project.impact}
            </p>
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-md bg-secondary/80 border border-border/60 px-2.5 py-1 text-xs font-mono text-foreground/80"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Architecture notes toggle */}
          {notes.length > 0 && (
            <div className="mb-6">
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                aria-expanded={expanded}
              >
                <span>{expanded ? "Hide Architecture Highlights" : "View Architecture Highlights"}</span>
                {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>

              {expanded && (
                <ul className="mt-3 space-y-1.5 pl-3 border-l-2 border-cyan-500/40 text-xs text-muted-foreground font-mono">
                  {notes.map((note) => (
                    <li key={note} className="leading-relaxed">
                      • {note}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-border/50">
          {project.links.map((link) => {
            const isPrimary = link.tone === "primary" || link.label === "Live Demo";

            if (link.kind === "route") {
              const routeClass = isPrimary
                ? "inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 font-heading text-xs font-semibold text-primary-foreground shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:opacity-95 transition-all active:scale-[0.96]"
                : "inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-secondary/40 px-3.5 py-2 font-heading text-xs font-semibold text-foreground hover:bg-secondary hover:border-primary/40 transition-colors active:scale-[0.96]";

              if (link.href.startsWith("#")) {
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const target = document.querySelector(link.href);
                      if (target) {
                        target.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className={routeClass}
                  >
                    {link.label}
                    <ArrowRight size={13} />
                  </a>
                );
              }

              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={routeClass}
                >
                  {link.label}
                  <ArrowRight size={13} />
                </Link>
              );
            }


            const isCode =
              link.label.toLowerCase().includes("source") || link.label.toLowerCase().includes("code");

            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 font-heading text-xs font-semibold transition-all active:scale-[0.96] ${
                  isPrimary
                    ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:opacity-95"
                    : "border border-border/80 bg-secondary/40 text-muted-foreground hover:text-foreground hover:border-primary/40"
                }`}
              >
                {isCode ? <Github size={13} /> : <ExternalLink size={13} />}
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </motion.article>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [filter, setFilter] = useState("All");

  const categories = ["All", "AI & Tools", "Fintech & Data", "Media & Cloud", "Creative 3D", "Civic GIS"];

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === "All") return true;
    if (filter === "AI & Tools") return p.category.includes("AI") || p.title.includes("InvoiceGen") || p.title.includes("Invictus");
    if (filter === "Fintech & Data")
      return p.category.includes("Fintech") || p.category.includes("Finance") || p.title.includes("OptiTrade") || p.title.includes("SAMIO");
    if (filter === "Media & Cloud") return p.category.includes("Media") || p.title.includes("PhotoStream");
    if (filter === "Creative 3D") return p.category.includes("3D") || p.title.includes("Wheel") || p.title.includes("Iphone");
    if (filter === "Civic GIS") return p.category.includes("GIS") || p.title.includes("Civic");
    return true;
  });

  return (
    <section id="projects" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Heading matching test expectation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400 mb-3">
            Selected Works
          </p>
          <h2
            id="projects-heading"
            className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground"
          >
            Featured <span className="tech-gradient-text">Projects</span> & Systems
          </h2>
          <p className="font-body text-sm md:text-base text-muted-foreground mt-4 max-w-2xl mx-auto">
            A verified track record of shipped full-stack applications, from AI invoice automation and real-time fintech trading to public GIS infrastructure.
          </p>
        </motion.div>

        {/* Filter chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-lg font-heading text-xs font-semibold transition-all duration-200 ${
                filter === cat
                  ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                  : "bg-secondary/60 text-muted-foreground hover:text-foreground border border-border/60"
              }`}
            >
              {cat === "All" ? `All Systems (${PROJECTS.length})` : cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={`${project.title}-${project.dateRange}`}
              project={project}
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
