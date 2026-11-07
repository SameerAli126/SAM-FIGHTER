import { motion } from "framer-motion";
import {
  ArrowLeft,
  Database,
  FileSpreadsheet,
  Layers3,
  Map,
  MapPinned,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";
import { Link } from "react-router-dom";
import ModernBackground from "@/components/ModernBackground";
import Navbar from "@/components/Navbar";
import SeoMeta from "@/components/SeoMeta";
import { FUNNEL_LINKS } from "@/config/site";

const features = [
  {
    icon: MapPinned,
    title: "Public Facility Explorer",
    desc: "Interactive civic GIS map views for facilities, categories, and district metrics with provenance detail records.",
  },
  {
    icon: Workflow,
    title: "Dataset Ingestion Pipeline",
    desc: "CSV and XLSX upload processing with automated schema validation, quarantine states, and review checklists.",
  },
  {
    icon: ShieldCheck,
    title: "RBAC Governance Console",
    desc: "Multi-tier operator workflows for analysts, department managers, and administrators publishing geospatial updates.",
  },
  {
    icon: FileSpreadsheet,
    title: "Bulk Spatial Ingestion",
    desc: "Robust support for complex multi-attribute spreadsheet uploads with error reporting and dry-run previews.",
  },
  {
    icon: Layers3,
    title: "Interactive Leaflet Engine",
    desc: "Multi-layer facility overlays, geo-polygon boundaries, and performant client-side clustering via Leaflet.",
  },
  {
    icon: Database,
    title: "MariaDB Spatial Architecture",
    desc: "Optimized relational spatial schemas with indexed coordinates, district records, and audit log tracking.",
  },
];

const tech = [
  { label: "Laravel 12", cat: "Framework" },
  { label: "PHP 8.2", cat: "Backend" },
  { label: "MariaDB", cat: "Data" },
  { label: "Blade", cat: "Frontend" },
  { label: "Alpine.js", cat: "Frontend" },
  { label: "Leaflet", cat: "Maps" },
  { label: "Spatie Permissions", cat: "Auth" },
  { label: "CSV/XLSX Imports", cat: "Ops" },
];

const implementationNotes = [
  "Engineered as a production Laravel web application with public exploration surfaces and secure administrative operator backends.",
  "Designed data ingestion with rigorous validation, preventing malformed geospatial coordinates and ensuring provenance integrity.",
  "Seeded with real Peshawar civic facility datasets demonstrating practical municipal and public infrastructure utility.",
];

const PeshawarCivicGisAtlasPage = () => (
  <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
    <SeoMeta
      title="Peshawar Civic GIS Atlas | Muhammad Sameer Ali"
      description="Peshawar Civic GIS Atlas is a Laravel-based public facility discovery and data operations platform with Leaflet mapping, dataset ingestion, RBAC, and provenance-aware publishing."
      path="/projects/peshawar-civic-gis-atlas"
    />
    <Navbar />
    <ModernBackground>
      <section className="pt-32 pb-16 relative">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-cyan-400 transition-colors font-mono text-xs uppercase tracking-wider mb-8"
            >
              <ArrowLeft size={14} /> Back to Projects & Systems
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-secondary/40 px-3.5 py-1 text-xs font-mono text-cyan-400 mb-4">
              Public Open Data & GIS • Shipped System
            </div>
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6">
              Peshawar Civic <span className="tech-gradient-text text-glow">GIS Atlas</span>
            </h1>
            <p className="font-body text-muted-foreground text-base sm:text-lg leading-relaxed max-w-3xl mb-8">
              A civic geospatial exploration and data operations platform engineered with Laravel and Leaflet.
              Features public facility navigation, CSV/XLSX dataset ingestion pipelines, and role-based data governance.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a
                href={FUNNEL_LINKS.civicAtlas}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-heading font-bold text-xs uppercase tracking-wider rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:opacity-95 transition-all"
              >
                <Users size={15} /> Launch Civic Atlas
              </a>
              <span className="inline-flex items-center gap-2 px-6 py-3 glass-card border border-border/80 font-heading font-semibold text-xs text-muted-foreground rounded-lg">
                <Map size={15} /> Open Source Civic GIS
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-foreground mb-10"
          >
            Key <span className="tech-gradient-text">Features & Capabilities</span>
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="glass-card rounded-xl p-6 border border-border/70 hover:border-primary/40 hover:box-glow-cyan transition-all duration-300 group"
              >
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary w-fit mb-4 group-hover:scale-105 transition-transform">
                  <feature.icon size={20} />
                </div>
                <h3 className="font-heading font-bold text-base text-foreground mb-2">{feature.title}</h3>
                <p className="font-body text-muted-foreground text-xs leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-foreground mb-10"
          >
            Implementation <span className="tech-gradient-text">Notes</span>
          </motion.h2>
          <div className="glass-card rounded-2xl overflow-hidden border border-border/70 shadow-xl">
            {implementationNotes.map((note, i) => (
              <motion.div
                key={note}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`p-5 font-body text-xs sm:text-sm text-muted-foreground leading-relaxed ${
                  i < implementationNotes.length - 1 ? "border-b border-border/50" : ""
                } hover:bg-secondary/40 transition-colors`}
              >
                • {note}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-foreground mb-10"
          >
            Technology <span className="tech-gradient-text">Stack</span>
          </motion.h2>
          <div className="flex flex-wrap gap-2.5">
            {tech.map((item, i) => (
              <motion.span
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="px-3.5 py-2 glass-card rounded-lg text-xs font-mono border border-border/70 hover:border-primary/50 transition-colors flex items-center gap-2"
              >
                <span className="text-foreground font-semibold">{item.label}</span>
                <span className="text-[10px] text-cyan-400 bg-secondary/80 px-1.5 py-0.5 rounded border border-border/60">
                  {item.cat}
                </span>
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card rounded-3xl p-10 border border-border/80 shadow-2xl">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
              Building Public Data <span className="tech-gradient-text">Workflows</span>
            </h2>
            <p className="font-body text-muted-foreground text-sm max-w-xl mx-auto mb-8">
              Open the live civic GIS deployment or connect for custom spatial data applications.
            </p>
            <a
              href={FUNNEL_LINKS.civicAtlas}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-heading font-bold text-xs uppercase tracking-wider rounded-lg shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:opacity-95 transition-all"
            >
              <Users size={16} /> Launch Civic Atlas
            </a>
          </motion.div>
        </div>
      </section>
    </ModernBackground>
  </div>
);

export default PeshawarCivicGisAtlasPage;
