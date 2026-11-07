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
import ModernBackground from "@/components/ModernBackground";
import Navbar from "@/components/Navbar";
import SeoMeta from "@/components/SeoMeta";
import { FUNNEL_LINKS } from "@/config/site";

const features = [
  {
    icon: KeyRound,
    title: "Email & OTP Authentication",
    desc: "Strict credential verification with timed OTP challenges, salted password hashing, and encrypted session cookies.",
  },
  {
    icon: LayoutDashboard,
    title: "Life Ops Control Center",
    desc: "Unified view of accounts, cash flow, debt amortization, recurring expenses, and net worth trajectory.",
  },
  {
    icon: Receipt,
    title: "Admin CRUD Workflows",
    desc: "Full administrative controls for transactions, categories, budgets, and automated ledger balancing.",
  },
  {
    icon: BarChart3,
    title: "Financial Analytics & Burn Rate",
    desc: "Runway calculations, monthly trend analysis, and visual expense breakdown reports designed for actionable decisions.",
  },
  {
    icon: Wallet,
    title: "Bucket Budgeting Engine",
    desc: "Zero-based budgeting with configurable allocation rules and proactive budget overrun warnings.",
  },
  {
    icon: FileJson,
    title: "Local-First Portability",
    desc: "Complete JSON data export and backup pipelines ensuring user data ownership and zero vendor lock-in.",
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
  "Strict multi-tenant tenant isolation with relational Prisma-backed PostgreSQL models and integer-based minor currency calculations.",
  "Protected SSR routes with authenticated edge middleware and granular role-based administrative CRUD mutations.",
  "Local-first operating model supporting self-hosting, developer OTP bypasses, and encrypted data portability.",
];

const SamioPage = () => (
  <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
    <SeoMeta
      title="SAMIO | Muhammad Sameer Ali"
      description="SAMIO is a local-first personal finance and life-ops dashboard built with Next.js, Prisma, PostgreSQL, OTP authentication, and admin reporting workflows."
      path="/projects/samio"
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
              Personal Finance & Life Ops • Shipped Product
            </div>
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6">
              SA<span className="tech-gradient-text text-glow">MIO</span>
            </h1>
            <p className="font-body text-muted-foreground text-base sm:text-lg leading-relaxed max-w-3xl mb-8">
              A private, local-first personal finance and life-ops management system.
              Engineered with Next.js, Prisma ORM, and PostgreSQL with strict ACID financial transaction guarantees.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a
                href={FUNNEL_LINKS.samio}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-heading font-bold text-xs uppercase tracking-wider rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:opacity-95 transition-all"
              >
                <ShieldCheck size={15} /> Launch SAMIO
              </a>
              <span className="inline-flex items-center gap-2 px-6 py-3 glass-card border border-border/80 font-heading font-semibold text-xs text-muted-foreground rounded-lg">
                <Database size={15} /> Private Enterprise Build
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
            Architecture <span className="tech-gradient-text">Highlights</span>
          </motion.h2>
          <div className="glass-card rounded-2xl overflow-hidden border border-border/70 shadow-xl">
            {architecture.map((note, i) => (
              <motion.div
                key={note}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`p-5 font-body text-xs sm:text-sm text-muted-foreground leading-relaxed ${
                  i < architecture.length - 1 ? "border-b border-border/50" : ""
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
              Need A Scalable <span className="tech-gradient-text">Operations System?</span>
            </h2>
            <p className="font-body text-muted-foreground text-sm max-w-xl mx-auto mb-8">
              Open the funnel demo or get in touch for custom enterprise dashboard development.
            </p>
            <a
              href={FUNNEL_LINKS.samio}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-heading font-bold text-xs uppercase tracking-wider rounded-lg shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:opacity-95 transition-all"
            >
              <ShieldCheck size={16} /> Launch SAMIO
            </a>
          </motion.div>
        </div>
      </section>
    </ModernBackground>
  </div>
);

export default SamioPage;
