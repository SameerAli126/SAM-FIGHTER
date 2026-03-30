import { motion } from "framer-motion";
import {
  ArrowLeft,
  BarChart3,
  Database,
  FileJson,
  KeyRound,
  LayoutDashboard,
  Receipt,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";
import FighterBackground from "@/components/FighterBackground";
import Navbar from "@/components/Navbar";
import SeoMeta from "@/components/SeoMeta";
import { FUNNEL_LINKS } from "@/config/site";

const features = [
  {
    icon: KeyRound,
    title: "Email + OTP Authentication",
    desc: "Password-based sign in with email OTP verification and signed session cookies for protected access.",
  },
  {
    icon: LayoutDashboard,
    title: "Life Ops Dashboard",
    desc: "An overview experience for transactions, income, budgets, tasks, subscriptions, goals, and operational insights.",
  },
  {
    icon: Receipt,
    title: "Admin CRUD Workflows",
    desc: "Structured admin flows for updating accounts, categories, transactions, rules, debts, assets, and recurring records.",
  },
  {
    icon: BarChart3,
    title: "Reporting and Insights",
    desc: "Cash, burn, runway, trend stories, commitments, and export-oriented reports designed for everyday decision-making.",
  },
  {
    icon: Wallet,
    title: "Budget and Rules Engine",
    desc: "Bucket budgeting and lightweight rules support for categorization, review flags, and spending visibility.",
  },
  {
    icon: FileJson,
    title: "Portable Data Exports",
    desc: "Reports and JSON exports keep the product local-first and friendly for backup or migration workflows.",
  },
];

const tech = [
  { label: "Next.js", cat: "Frontend" },
  { label: "TypeScript", cat: "Frontend" },
  { label: "Prisma", cat: "ORM" },
  { label: "PostgreSQL", cat: "Data" },
  { label: "SMTP OTP", cat: "Auth" },
  { label: "Tailwind CSS", cat: "UI" },
  { label: "Docker Compose", cat: "Local Dev" },
  { label: "Vercel", cat: "Deployment" },
];

const architecture = [
  "Multi-tenant data isolation per user with Prisma-backed PostgreSQL models and minor-unit money storage.",
  "Protected dashboard routes plus admin APIs for records, bootstrap setup, reports, and settings updates.",
  "A local-first operating model that supports self-hosting, dev OTP flows, data exports, and iterative personal-finance workflows.",
];

const SamioPage = () => (
  <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
    <SeoMeta
      title="SAMIO | Muhammad Sameer Ali"
      description="SAMIO is a local-first personal finance and life-ops dashboard built with Next.js, Prisma, PostgreSQL, OTP authentication, and admin reporting workflows."
      path="/projects/samio"
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
              SA<span className="energy-gradient-text">MIO</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mb-8">
              A local-first personal finance and life-ops dashboard designed to manage transactions,
              income, debts, assets, subscriptions, goals, budgets, and operational reporting from a
              single system.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a
                href={FUNNEL_LINKS.samio}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-display uppercase tracking-wider text-sm rounded hover:opacity-90 transition-opacity"
              >
                <ShieldCheck size={16} /> Live Funnel
              </a>
              <span className="inline-flex items-center gap-2 px-6 py-3 glass-card border border-primary/30 font-display uppercase tracking-wider text-sm rounded text-muted-foreground">
                <Database size={16} /> Private Build
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
            Architecture <span className="energy-gradient-text">Highlights</span>
          </motion.h2>
          <div className="glass-card rounded-lg overflow-hidden border border-primary/20">
            {architecture.map((note, i) => (
              <motion.div
                key={note}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`p-5 text-sm text-muted-foreground leading-relaxed ${
                  i < architecture.length - 1 ? "border-b border-border/50" : ""
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
              Need A Similar <span className="energy-gradient-text">Operations System?</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Open the current funnel-hosted SAMIO build, or contact me if you want a similar operations dashboard for your own workflow.
            </p>
            <a
              href={FUNNEL_LINKS.samio}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display uppercase tracking-wider rounded hover:opacity-90 transition-opacity"
            >
              <ShieldCheck size={18} /> Launch SAMIO
            </a>
          </motion.div>
        </div>
      </section>
    </FighterBackground>
  </div>
);

export default SamioPage;
