import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Bot,
  Smartphone,
  Zap,
  FileText,
  CreditCard,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import ModernBackground from "@/components/ModernBackground";
import Navbar from "@/components/Navbar";
import SeoMeta from "@/components/SeoMeta";

const features = [
  {
    icon: Bot,
    title: "Gemini AI Automation",
    desc: "Gemini 2.0 Flash powered assistant for instant business queries, line-item suggestions, and natural-language invoice synthesis.",
  },
  {
    icon: FileText,
    title: "Intelligent OCR Parsing",
    desc: "Smart vendor card data extraction pipeline for instant entity prefilling and zero-friction invoicing.",
  },
  {
    icon: TrendingUp,
    title: "Cash Flow Predictive Modeling",
    desc: "Payment timeline estimation algorithms to forecast client settlement dates and liquidity health.",
  },
  {
    icon: Zap,
    title: "Next.js 15 Server-Side Rendering",
    desc: "Built on Next.js 15 App Router with high-performance SSR, caching headers, and fast PDF exports.",
  },
  {
    icon: CreditCard,
    title: "Stripe Payment Gateway",
    desc: "End-to-end payment collection with webhook reconciliation, client status monitoring, and automated receipts.",
  },
  {
    icon: Smartphone,
    title: "Adaptive Responsive Architecture",
    desc: "Mobile-first layouts with touch-friendly actions, collapsible filters, and accessible WCAG AA standards.",
  },
];

const tech = [
  { label: "Next.js 15", cat: "Frontend" },
  { label: "TypeScript", cat: "Frontend" },
  { label: "Tailwind CSS", cat: "Frontend" },
  { label: "Gemini 2.0 Flash", cat: "AI" },
  { label: "Express.js", cat: "Backend" },
  { label: "MongoDB", cat: "Backend" },
  { label: "Stripe", cat: "Payments" },
  { label: "Netlify", cat: "DevOps" },
];

const InvoiceGenProPage = () => (
  <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
    <SeoMeta
      title="InvoiceGen Pro | Muhammad Sameer Ali"
      description="InvoiceGen Pro is an AI-assisted invoicing platform built with Next.js, Gemini AI, analytics, PDF workflows, and client management features."
      path="/projects/invoicegen-pro"
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
              AI-Assisted Business Systems • Live Production
            </div>
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6">
              InvoiceGen<span className="tech-gradient-text text-glow"> Pro</span>
            </h1>
            <p className="font-body text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
              A comprehensive invoicing platform integrating Gemini 2.0 Flash for automated line-item generation,
              client OCR parsing, and Stripe payment reconciliation on a Next.js 15 SSR foundation.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a
                href="https://invoicegen-pro.netlify.app/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-heading font-bold text-xs uppercase tracking-wider rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:opacity-95 transition-all"
              >
                <ExternalLink size={15} /> Launch Live Application
              </a>
              <a
                href="https://github.com/SameerAli126/invoicegen-pro"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 glass-card border border-border/80 font-heading font-semibold text-xs text-foreground rounded-lg hover:border-primary/50 transition-colors"
              >
                <Github size={15} /> View Source Code
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
            Key <span className="tech-gradient-text">Features & AI Workflows</span>
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
              See InvoiceGen Pro <span className="tech-gradient-text">in Action</span>
            </h2>
            <p className="font-body text-muted-foreground text-sm max-w-xl mx-auto mb-8">
              Experience the Gemini 2.0 Flash integration and invoice creation pipeline live on Netlify.
            </p>
            <a
              href="https://invoicegen-pro.netlify.app/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-heading font-bold text-xs uppercase tracking-wider rounded-lg shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:opacity-95 transition-all"
            >
              <ExternalLink size={16} /> Launch InvoiceGen Pro
            </a>
          </motion.div>
        </div>
      </section>
    </ModernBackground>
  </div>
);

export default InvoiceGenProPage;
