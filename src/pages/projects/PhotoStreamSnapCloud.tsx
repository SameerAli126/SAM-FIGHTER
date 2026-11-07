import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Cloud,
  Globe,
  Images,
  MessageCircle,
  Shield,
  Star,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import ModernBackground from "@/components/ModernBackground";
import Navbar from "@/components/Navbar";
import SeoMeta from "@/components/SeoMeta";
import { FUNNEL_LINKS } from "@/config/site";

const features = [
  {
    icon: Users,
    title: "Dual Role Access Matrix",
    desc: "Role-aware flows for creators uploading original media and consumers browsing, rating, and saving content.",
  },
  {
    icon: Images,
    title: "Cloudinary Ingestion Pipeline",
    desc: "High-resolution photo ingestion with automated responsive thumbnail generation, EXIF parsing, and CDN asset delivery.",
  },
  {
    icon: MessageCircle,
    title: "Engagement Layer",
    desc: "Threaded comments, likes, 5-star rating matrix, instant search, and cursor-based pagination for rapid scrolling.",
  },
  {
    icon: Globe,
    title: "Regional Node Discovery",
    desc: "Geographic edge discovery endpoints routing client requests toward low-latency regional microservices.",
  },
  {
    icon: Shield,
    title: "FastAPI JWT & RBAC Contracts",
    desc: "Pydantic-validated security layer, scoped bearer token verification, and self-documenting OpenAPI specifications.",
  },
  {
    icon: Cloud,
    title: "Dual-Client Decoupled Architecture",
    desc: "Both PhotoStream and SnapCloud frontends consume identical decoupled FastAPI service endpoints.",
  },
];

const tech = [
  { label: "React", cat: "Frontend" },
  { label: "TypeScript", cat: "Frontend" },
  { label: "Vite", cat: "Frontend" },
  { label: "FastAPI", cat: "Backend" },
  { label: "MongoDB Atlas", cat: "Data" },
  { label: "Cloudinary", cat: "Media" },
  { label: "OpenAPI", cat: "API" },
  { label: "Render", cat: "DevOps" },
];

const deliveryNotes = [
  "Engineered a stateless microservice architecture allowing multiple disjointed client applications to query shared image feeds and social state.",
  "Integrated real-world production enhancements including asynchronous image transcoding, multi-region routing, and structured tagging.",
  "Maintained cloud-native operational standards with MongoDB Atlas connection pooling and automated health endpoints.",
];

const PhotoStreamSnapCloudPage = () => (
  <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
    <SeoMeta
      title="PhotoStream / SnapCloud | Muhammad Sameer Ali"
      description="PhotoStream and SnapCloud are two frontend implementations of a cloud-native photo-sharing platform built with React, FastAPI, MongoDB Atlas, and Cloudinary."
      path="/projects/photostream-snapcloud"
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
              Cloud Infrastructure & Media Pipeline • Production Shipped
            </div>
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6">
              PhotoStream <span className="tech-gradient-text text-glow">/ SnapCloud</span>
            </h1>
            <p className="font-body text-muted-foreground text-base sm:text-lg leading-relaxed max-w-3xl mb-8">
              A cloud-native photo-sharing ecosystem powered by a high-throughput Python FastAPI backend.
              Designed with a decoupled API contract supporting two distinct client interfaces, Cloudinary media optimization,
              and low-latency MongoDB Atlas clusters.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a
                href={FUNNEL_LINKS.photostream}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-heading font-bold text-xs uppercase tracking-wider rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:opacity-95 transition-all"
              >
                <ExternalLink size={15} /> Launch PhotoStream
              </a>
              <a
                href="https://photostream-api.onrender.com/api/docs"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 glass-card border border-border/80 font-heading font-semibold text-xs text-foreground rounded-lg hover:border-primary/50 transition-colors"
              >
                <Star size={15} /> Interactive API Docs
              </a>
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
            System <span className="tech-gradient-text">Architecture & Capabilities</span>
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
            Engineering <span className="tech-gradient-text">Delivery Notes</span>
          </motion.h2>
          <div className="glass-card rounded-2xl overflow-hidden border border-border/70 shadow-xl">
            {deliveryNotes.map((note, i) => (
              <motion.div
                key={note}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`p-5 font-body text-xs sm:text-sm text-muted-foreground leading-relaxed ${
                  i < deliveryNotes.length - 1 ? "border-b border-border/50" : ""
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
              Explore the <span className="tech-gradient-text">FastAPI Surface</span>
            </h2>
            <p className="font-body text-muted-foreground text-sm max-w-xl mx-auto mb-8">
              Open the live client build or review the interactive Swagger API documentation.
            </p>
            <a
              href={FUNNEL_LINKS.photostream}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-heading font-bold text-xs uppercase tracking-wider rounded-lg shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:opacity-95 transition-all"
            >
              <ExternalLink size={16} /> Launch PhotoStream
            </a>
          </motion.div>
        </div>
      </section>
    </ModernBackground>
  </div>
);

export default PhotoStreamSnapCloudPage;
