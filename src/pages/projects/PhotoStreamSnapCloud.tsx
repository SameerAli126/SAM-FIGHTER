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
import FighterBackground from "@/components/FighterBackground";
import Navbar from "@/components/Navbar";
import SeoMeta from "@/components/SeoMeta";
import { FUNNEL_LINKS } from "@/config/site";

const features = [
  {
    icon: Users,
    title: "Creator and Consumer Roles",
    desc: "Role-aware flows for uploading, managing, browsing, and interacting with media-backed content.",
  },
  {
    icon: Images,
    title: "Media Upload Pipeline",
    desc: "Photo uploads with metadata, thumbnails, profile pictures, and optimized asset handling through Cloudinary.",
  },
  {
    icon: MessageCircle,
    title: "Social Interaction Layer",
    desc: "Comments, likes, ratings, search, pagination, and detail views designed for active content exploration.",
  },
  {
    icon: Globe,
    title: "Regional Discovery",
    desc: "Geographic server discovery endpoints that route clients toward the nearest backend region for lower latency.",
  },
  {
    icon: Shield,
    title: "JWT and RBAC",
    desc: "Secure authentication, protected creator actions, and clean API contracts documented through OpenAPI.",
  },
  {
    icon: Cloud,
    title: "Two Frontends, One Backend",
    desc: "Built both PhotoStream and SnapCloud as separate frontend experiences on top of the same FastAPI service layer.",
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
  "Designed a reusable service layer so both frontend implementations could consume the same auth, photo, comment, like, and discovery endpoints.",
  "Extended the platform beyond simple uploads by adding profile pictures, regional discovery, and social engagement features needed for real product behavior.",
  "Kept the architecture cloud-ready with MongoDB Atlas, Cloudinary, and deployable FastAPI endpoints instead of a local-only prototype.",
];

const PhotoStreamSnapCloudPage = () => (
  <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
    <SeoMeta
      title="PhotoStream / SnapCloud | Muhammad Sameer Ali"
      description="PhotoStream and SnapCloud are two frontend implementations of a cloud-native photo-sharing platform built with React, FastAPI, MongoDB Atlas, and Cloudinary."
      path="/projects/photostream-snapcloud"
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
              PhotoStream <span className="energy-gradient-text">/ SnapCloud</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mb-8">
              A cloud-native photo sharing platform built around a reusable FastAPI backend and
              two separate React frontends. The system covers creator uploads, social discovery,
              comments, likes, ratings, media optimization, and regional server discovery.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a
                href={FUNNEL_LINKS.photostream}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-display uppercase tracking-wider text-sm rounded hover:opacity-90 transition-opacity"
              >
                <ExternalLink size={16} /> Launch PhotoStream
              </a>
              <a
                href="https://photostream-api.onrender.com/api/docs"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 glass-card border border-primary/30 font-display uppercase tracking-wider text-sm rounded hover:border-primary transition-colors"
              >
                <Star size={16} /> API Docs
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
            Delivery <span className="energy-gradient-text">Notes</span>
          </motion.h2>
          <div className="glass-card rounded-lg overflow-hidden border border-primary/20">
            {deliveryNotes.map((note, i) => (
              <motion.div
                key={note}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`p-5 text-sm text-muted-foreground leading-relaxed ${
                  i < deliveryNotes.length - 1 ? "border-b border-border/50" : ""
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
              Explore The <span className="energy-gradient-text">API Surface</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Open the current funnel-hosted PhotoStream build. SnapCloud remains the alternate
              frontend implementation for the same API architecture and reusable backend contract.
            </p>
            <a
              href={FUNNEL_LINKS.photostream}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display uppercase tracking-wider rounded hover:opacity-90 transition-opacity"
            >
              <ExternalLink size={18} /> Launch PhotoStream
            </a>
          </motion.div>
        </div>
      </section>
    </FighterBackground>
  </div>
);

export default PhotoStreamSnapCloudPage;
