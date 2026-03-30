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
import FighterBackground from "@/components/FighterBackground";
import Navbar from "@/components/Navbar";

const features = [
  {
    icon: Bot,
    title: "Gemini AI Chatbot",
    desc: "Gemini 2.0 Flash powered chatbot for instant business assistance and natural language invoice creation via chat interface.",
  },
  {
    icon: FileText,
    title: "Smart Invoice Generation",
    desc: "AI suggestions and intelligent client data extraction from business cards for rapid invoice creation.",
  },
  {
    icon: TrendingUp,
    title: "Payment Prediction",
    desc: "Machine learning analytics to predict payment timelines and manage cash flow proactively.",
  },
  {
    icon: Zap,
    title: "Next.js 15 SSR",
    desc: "Migrated to Next.js 15 with Server-Side Rendering for lightning-fast page loads and superior SEO.",
  },
  {
    icon: CreditCard,
    title: "Client and Payment Tracking",
    desc: "Comprehensive client management with payment tracking, status monitoring, and automated reminders.",
  },
  {
    icon: Smartphone,
    title: "Fully Responsive",
    desc: "Mobile-first approach with optimized layouts, collapsible navigation, and touch-friendly interfaces for all devices.",
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
              InvoiceGen<span className="energy-gradient-text"> Pro</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mb-8">
              A professional full-stack invoicing solution powered by AI. Built on Next.js 15
              with Gemini 2.0 Flash integration for smart invoice generation, client management,
              and payment prediction analytics.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a
                href="https://invoicegen-pro.netlify.app/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-display uppercase tracking-wider text-sm rounded hover:opacity-90 transition-opacity"
              >
                <ExternalLink size={16} /> Live Demo
              </a>
              <a
                href="https://github.com/SameerAli126/invoicegen-pro"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 glass-card border border-primary/30 font-display uppercase tracking-wider text-sm rounded hover:border-primary transition-colors"
              >
                <Github size={16} /> View Source
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
              See It In <span className="energy-gradient-text">Action</span>
            </h2>
            <p className="text-muted-foreground mb-8">Try the AI-powered invoicing platform live.</p>
            <a
              href="https://invoicegen-pro.netlify.app/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display uppercase tracking-wider rounded hover:opacity-90 transition-opacity"
            >
              <ExternalLink size={18} /> Launch InvoiceGen Pro
            </a>
          </motion.div>
        </div>
      </section>
    </FighterBackground>
  </div>
);

export default InvoiceGenProPage;
