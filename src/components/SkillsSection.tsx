import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Atom,
  Database,
  GitBranch,
  Layers,
  Palette,
  Server,
  Terminal,
  Code2,
  Cpu,
  Workflow,
  Sparkles,
} from "lucide-react";
import { playClick } from "@/lib/audio";


type SkillItem = {
  name: string;
  category: "Frontend" | "Backend" | "Data" | "DevOps";
  level: number;
  icon: typeof Atom;
  tag: string;
};

const ALL_SKILLS: SkillItem[] = [
  { name: "React.js", category: "Frontend", level: 96, icon: Atom, tag: "Concurrent Mode, Hooks, Client State" },
  { name: "Next.js 15", category: "Frontend", level: 92, icon: Layers, tag: "App Router, SSR, Server Actions" },
  { name: "TypeScript", category: "Frontend", level: 94, icon: GitBranch, tag: "Strict Generics, Discriminated Unions" },
  { name: "Tailwind CSS", category: "Frontend", level: 95, icon: Palette, tag: "Design Systems, Micro-interactions" },
  { name: "Radix UI / Tiptap", category: "Frontend", level: 90, icon: Workflow, tag: "Headless Rich Text, Accessible Primitives" },
  { name: "Node.js", category: "Backend", level: 88, icon: Server, tag: "REST APIs, Event Loops, Middleware" },
  { name: "FastAPI", category: "Backend", level: 86, icon: Cpu, tag: "Async Endpoints, Pydantic, Python" },
  { name: "Laravel", category: "Backend", level: 85, icon: Workflow, tag: "PHP 8, Eloquent ORM, Auth & RBAC" },
  { name: "Express.js", category: "Backend", level: 87, icon: Server, tag: "Microservices, JWT Authentication" },
  { name: "PostgreSQL", category: "Data", level: 89, icon: Database, tag: "Relational Modeling, Indexing, ACID" },
  { name: "MongoDB", category: "Data", level: 84, icon: Database, tag: "Aggregation Pipelines, Atlas Cloud" },
  { name: "Prisma ORM", category: "Data", level: 89, icon: Database, tag: "Type-safe Schemas, Migrations" },
  { name: "Playwright / Vitest", category: "DevOps", level: 88, icon: Sparkles, tag: "Visual Regression, Multi-Viewport E2E" },
  { name: "Git / GitHub", category: "DevOps", level: 92, icon: Terminal, tag: "Feature Branching, CI/CD, Actions" },
];

const CODE_EXAMPLES = {
  fastapi: `// FastAPI High-Throughput Endpoint
from fastapi import FastAPI, Depends, HTTPException, status
from pydantic import BaseModel, Field

app = FastAPI(title="PhotoStream API", version="2.0.0")

class MediaPayload(BaseModel):
    title: str = Field(..., min_length=3, max_length=120)
    asset_url: str
    tags: list[str] = []

@app.post("/api/v1/media/upload", status_code=status.HTTP_201_CREATED)
async def process_media_stream(payload: MediaPayload, user = Depends(get_current_user)):
    """Async upload pipeline with automated metadata extraction & CDN caching."""
    record = await media_service.ingest(payload, author_id=user.id)
    return {"status": "success", "data": record}`,

  react: `// Next.js 15 Server-Optimized Component
import { useMemo } from 'react';
import type { PortfolioAnalytics } from '@/types';

export function MarketTelemetry({ data }: { data: PortfolioAnalytics }) {
  // Memoized metric calculations for high-density trading view
  const netPosition = useMemo(() => {
    return data.holdings.reduce((sum, h) => sum + (h.shares * h.currentPrice), 0);
  }, [data.holdings]);

  return (
    <div className="grid grid-cols-3 gap-4 rounded-xl glass-card p-6 border border-border/80">
      <TelemetryMetric label="Net Position" value={formatCurrency(netPosition)} delta="+14.2%" />
      <TelemetryMetric label="Active Orders" value={data.activeOrdersCount} delta="Neutral" />
      <TelemetryMetric label="Execution Latency" value="12ms" delta="-4ms" />
    </div>
  );
}`,

  prisma: `// Prisma Schema with Relational Integrity
model Transaction {
  id          String   @id @default(uuid())
  amount      Decimal  @db.Decimal(12, 2)
  category    Category @relation(fields: [categoryId], references: [id])
  categoryId  String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId      String
  createdAt   DateTime @default(now())

  @@index([userId, createdAt(sort: Desc)])
  @@index([categoryId])
}`,
};

const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSnippet, setSelectedSnippet] = useState<"fastapi" | "react" | "prisma">("react");

  const filteredSkills =
    selectedCategory === "All"
      ? ALL_SKILLS
      : ALL_SKILLS.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Heading with accessible name matching test requirement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400 mb-3">
            Core Architecture
          </p>
          <h2
            id="skills-heading"
            className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground"
          >
            Technical <span className="tech-gradient-text">Expertise</span> & Capabilities
          </h2>
          <p className="font-body text-sm md:text-base text-muted-foreground mt-4 max-w-2xl mx-auto">
            A production-proven technology stack spanning frontend systems, asynchronous APIs, relational & document databases, and cloud workflows.
          </p>
        </motion.div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {["All", "Frontend", "Backend", "Data", "DevOps"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-heading text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                  : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary border border-border/60"
              }`}
            >
              {cat === "All" ? "All Disciplines" : cat}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mb-16">
          {filteredSkills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass-card rounded-xl p-5 border border-border/70 hover:border-primary/40 hover:box-glow-cyan transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3 className="font-heading text-sm font-bold text-foreground">
                        {skill.name}
                      </h3>
                      <span className="text-[10px] font-mono text-cyan-400">
                        {skill.category}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-primary tabular-nums">
                    {skill.level}%
                  </span>
                </div>

                <div className="h-1.5 w-full bg-secondary/80 rounded-full overflow-hidden mb-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 0.9, delay: 0.2 + index * 0.04, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 shadow-[0_0_12px_rgba(6,182,212,0.4)] rounded-full"
                  />
                </div>

                <p className="text-[11px] text-muted-foreground/90 leading-tight">
                  {skill.tag}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Code Architecture Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto rounded-2xl glass-panel border border-border/80 overflow-hidden shadow-2xl"
        >
          <div className="flex flex-wrap items-center justify-between px-5 py-3.5 bg-secondary/60 border-b border-border/60">
            <div className="flex items-center gap-2">
              <Code2 size={16} className="text-cyan-400" />
              <span className="font-heading text-xs sm:text-sm font-bold text-foreground flex items-center gap-1.5">
                Production Code Patterns
                <Sparkles size={12} className="text-amber-400" />
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono overflow-x-auto max-w-full pb-0.5 no-scrollbar scrollbar-none">
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setSelectedSnippet("react");
                }}
                className={`px-3 py-1 rounded-md transition-colors shrink-0 whitespace-nowrap ${
                  selectedSnippet === "react"
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                React 19 / TS
              </button>
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setSelectedSnippet("fastapi");
                }}
                className={`px-3 py-1 rounded-md transition-colors shrink-0 whitespace-nowrap ${
                  selectedSnippet === "fastapi"
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                FastAPI Python
              </button>
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setSelectedSnippet("prisma");
                }}
                className={`px-3 py-1 rounded-md transition-colors shrink-0 whitespace-nowrap ${
                  selectedSnippet === "prisma"
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Prisma Schema
              </button>
            </div>

          </div>

          <div className="p-5 overflow-x-auto bg-[#070b14]/90 font-mono text-xs sm:text-sm text-foreground/90 leading-relaxed custom-scrollbar">
            <pre>
              <code>{CODE_EXAMPLES[selectedSnippet]}</code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
