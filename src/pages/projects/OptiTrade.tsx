import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  BarChart3,
  TrendingUp,
  Shield,
  Search,
  Newspaper,
  Star,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import ModernBackground from "@/components/ModernBackground";
import Navbar from "@/components/Navbar";
import SeoMeta from "@/components/SeoMeta";

const features = [
  {
    icon: BarChart3,
    title: "Dashboard Overview",
    desc: "Comprehensive portfolio overview with total value, profit/loss, overall return, and AI-powered diversification tips.",
  },
  {
    icon: TrendingUp,
    title: "Portfolio Management",
    desc: "Track stock holdings, monitor performance, manage positions, and view detailed analytics including Sharpe Ratio and VaR.",
  },
  {
    icon: Shield,
    title: "Stock Trading",
    desc: "Seamless interface for buying and selling stocks with real-time data and instant execution.",
  },
  {
    icon: Search,
    title: "Stock Screener",
    desc: "Powerful filtering tool for discovering stocks based on criteria like P/E ratio, market cap, volume, and sector.",
  },
  {
    icon: Newspaper,
    title: "Financial News",
    desc: "Dedicated news section aggregating the latest financial news to keep traders informed and ahead of the market.",
  },
  {
    icon: Star,
    title: "Watchlist",
    desc: "Create and manage a personalized watchlist of stocks with real-time price updates and alerts.",
  },
  {
    icon: Users,
    title: "JWT Authentication",
    desc: "Secure user authentication with JWT including login, signup, and password reset functionality.",
  },
];

const tech = [
  { label: "Next.js 15", cat: "Frontend" },
  { label: "TypeScript", cat: "Frontend" },
  { label: "Tailwind CSS", cat: "Frontend" },
  { label: "React Contexts", cat: "Frontend" },
  { label: "Custom Hooks", cat: "Frontend" },
  { label: "REST APIs", cat: "Backend" },
  { label: "JWT Auth", cat: "Backend" },
  { label: "Vercel", cat: "DevOps" },
];

const structure = [
  { dir: "app/", desc: "Next.js 15 App Router with streaming SSR" },
  { dir: "components/", desc: "Reusable atomic and financial UI components" },
  { dir: "contexts/", desc: "React contexts for global state & session auth" },
  { dir: "hooks/", desc: "Custom hooks incl. market analytics & websockets" },
  { dir: "services/", desc: "API services, telemetry & live data fetching" },
  { dir: "docs/", desc: "Full architectural documentation by category" },
];

const OptiTradePage = () => (
  <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
    <SeoMeta
      title="OptiTrade 3.0 | Muhammad Sameer Ali"
      description="OptiTrade 3.0 is a stock trading platform with portfolio management, stock screening, financial news, watchlists, and secure role-aware workflows."
      path="/projects/optitrade"
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
              Fintech and Trading UX • Production Release
            </div>
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6">
              Opti<span className="tech-gradient-text text-glow">Trade</span>
              <span className="text-2xl md:text-4xl ml-3 text-muted-foreground font-mono">3.0</span>
            </h1>
            <p className="font-body text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
              A high-frequency stock trading application engineered with Next.js 15. Provides a
              comprehensive suite of tools for tracking real-time market data, calculating portfolio Sharpe
              ratios, and executing authenticated trades with sub-second responsiveness.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a
                href="https://opti-trade-3-0.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-heading font-bold text-xs uppercase tracking-wider rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:opacity-95 transition-all"
              >
                <ExternalLink size={15} /> Launch Live Application
              </a>
              <a
                href="https://github.com/SameerAli126/OptiTrade-3.0"
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
            Core <span className="tech-gradient-text">Architecture & Features</span>
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
            Project <span className="tech-gradient-text">Structure</span>
          </motion.h2>
          <div className="glass-card rounded-2xl overflow-hidden border border-border/70 shadow-xl">
            {structure.map((section, i) => (
              <motion.div
                key={section.dir}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center gap-6 p-4 ${i < structure.length - 1 ? "border-b border-border/50" : ""} hover:bg-secondary/40 transition-colors`}
              >
                <code className="font-mono text-cyan-400 text-xs font-bold w-32 shrink-0">{section.dir}</code>
                <span className="font-body text-muted-foreground text-xs sm:text-sm">{section.desc}</span>
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
              Trade <span className="tech-gradient-text">Smarter</span> with OptiTrade
            </h2>
            <p className="font-body text-muted-foreground text-sm max-w-xl mx-auto mb-8">
              Experience the production application live on Vercel with streaming data tables and simulated execution.
            </p>
            <a
              href="https://opti-trade-3-0.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-heading font-bold text-xs uppercase tracking-wider rounded-lg shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:opacity-95 transition-all"
            >
              <ExternalLink size={16} /> Launch OptiTrade 3.0
            </a>
          </motion.div>
        </div>
      </section>
    </ModernBackground>
  </div>
);

export default OptiTradePage;
