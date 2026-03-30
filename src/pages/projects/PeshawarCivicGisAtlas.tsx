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
import FighterBackground from "@/components/FighterBackground";
import Navbar from "@/components/Navbar";
import SeoMeta from "@/components/SeoMeta";

const features = [
  {
    icon: MapPinned,
    title: "Public Facility Explorer",
    desc: "Interactive civic map views for exploring facilities, categories, and district-level data with provenance-aware detail pages.",
  },
  {
    icon: Workflow,
    title: "Dataset Ingestion Workflow",
    desc: "CSV and XLSX import flows with validation, publishing, and operator-friendly review steps.",
  },
  {
    icon: ShieldCheck,
    title: "RBAC Admin Console",
    desc: "Role-based operator workflows for analysts, managers, and admins managing datasets and publishing changes.",
  },
  {
    icon: FileSpreadsheet,
    title: "Spreadsheet-Friendly Ops",
    desc: "Structured support for real spreadsheet uploads rather than a hardcoded demo-only presentation layer.",
  },
  {
    icon: Layers3,
    title: "Leaflet Map Tooling",
    desc: "Map filters, layered facility discovery, and civic exploration workflows built with Blade, Alpine, and Leaflet.",
  },
  {
    icon: Database,
    title: "MariaDB GIS Schema",
    desc: "MariaDB-ready schemas with facility data, metrics, and seeded district records designed for real iteration.",
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
  "Structured the project as a proper Laravel application with public explorer flows and secured operator workflows instead of a static GIS mockup.",
  "Made the ingestion pipeline part of the product story by supporting upload, validation, publishing, and provenance display across records.",
  "Seeded the app with Peshawar-specific facilities and indicators so the mapping workflow demonstrates a concrete civic use case.",
];

const PeshawarCivicGisAtlasPage = () => (
  <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
    <SeoMeta
      title="Peshawar Civic GIS Atlas | Muhammad Sameer Ali"
      description="Peshawar Civic GIS Atlas is a Laravel-based public facility discovery and data operations platform with Leaflet mapping, dataset ingestion, RBAC, and provenance-aware publishing."
      path="/projects/peshawar-civic-gis-atlas"
    />
    <Navbar />
    <FighterBackground>
      <section className="pt-32 pb-16 relative">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-heading text-sm uppercase tracking-wider mb-8"
            >
              <ArrowLeft size={16} /> Back to Portfolio
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="font-display text-xs uppercase tracking-[0.3em] text-primary mb-3">Project Showcase</p>
            <h1 className="font-display text-5xl md:text-7xl font-bold uppercase mb-6">
              Peshawar Civic <span className="energy-gradient-text">GIS Atlas</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mb-8">
              A portfolio-grade civic GIS for Peshawar that combines public facility discovery with
              a secure operator workflow for importing, validating, and publishing datasets.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-display uppercase tracking-wider text-sm rounded hover:opacity-90 transition-opacity"
              >
                <Users size={16} /> Request Demo
              </a>
              <span className="inline-flex items-center gap-2 px-6 py-3 glass-card border border-primary/30 font-display uppercase tracking-wider text-sm rounded text-muted-foreground">
                <Map size={16} /> Built For Portfolio Delivery
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
            className="font-display text-3xl md:text-4xl font-bold uppercase mb-12"
          >
            Key <span className="energy-gradient-text">Features</span>
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card rounded-lg p-6 hover:border-primary/30 transition-all duration-300 group"
              >
                <feature.icon className="text-primary mb-4 group-hover:scale-110 transition-transform" size={24} />
                <h3 className="font-display font-bold uppercase mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
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
            className="font-display text-3xl md:text-4xl font-bold uppercase mb-12"
          >
            Implementation <span className="energy-gradient-text">Notes</span>
          </motion.h2>
          <div className="glass-card rounded-lg overflow-hidden border border-primary/20">
            {implementationNotes.map((note, i) => (
              <motion.div
                key={note}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`p-5 text-sm text-muted-foreground leading-relaxed ${
                  i < implementationNotes.length - 1 ? "border-b border-border/50" : ""
                }`}
              >
                {note}
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
            className="font-display text-3xl md:text-4xl font-bold uppercase mb-12"
          >
            Tech <span className="energy-gradient-text">Stack</span>
          </motion.h2>
          <div className="flex flex-wrap gap-3">
            {tech.map((item, i) => (
              <motion.span
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="px-4 py-2 glass-card rounded text-sm font-heading font-semibold uppercase tracking-wider border border-primary/20 hover:border-primary/60 transition-colors cursor-default"
              >
                {item.label}
                <span className="ml-2 text-xs text-primary opacity-70">{item.cat}</span>
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-4xl font-bold uppercase mb-6">
              Building Public Data <span className="energy-gradient-text">Workflows</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              I can help design data-heavy internal tools, public explorer experiences, and admin workflows with the same structured approach.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display uppercase tracking-wider rounded hover:opacity-90 transition-opacity"
            >
              <Users size={18} /> Contact Me
            </a>
          </motion.div>
        </div>
      </section>
    </FighterBackground>
  </div>
);

export default PeshawarCivicGisAtlasPage;
