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
import FighterBackground from "@/components/FighterBackground";
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
  { dir: "app/", desc: "Next.js 15 App Router" },
  { dir: "components/", desc: "Reusable UI components" },
  { dir: "contexts/", desc: "React contexts for state" },
  { dir: "hooks/", desc: "Custom hooks incl. analytics" },
  { dir: "services/", desc: "API services & data fetching" },
  { dir: "docs/", desc: "Full documentation by category" },
];

const OptiTradePage = () => (
  <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
    <SeoMeta
      title="OptiTrade 3.0 | Muhammad Sameer Ali"
      description="OptiTrade 3.0 is a stock trading platform with portfolio management, stock screening, financial news, watchlists, and secure role-aware workflows."
      path="/projects/optitrade"
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
              Opti<span className="energy-gradient-text">Trade</span>
              <span className="text-2xl md:text-4xl ml-3 text-muted-foreground">3.0</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mb-8">
              A modern, data-driven stock trading application built with Next.js 15. Provides a
              comprehensive suite of tools for tracking and analyzing the stock market, managing
              portfolios, and making informed trading decisions.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a
                href="https://opti-trade-3-0.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-display uppercase tracking-wider text-sm rounded hover:opacity-90 transition-opacity"
              >
                <ExternalLink size={16} /> Live Demo
              </a>
              <a
                href="https://github.com/SameerAli126/OptiTrade-3.0"
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
            Project <span className="energy-gradient-text">Structure</span>
          </motion.h2>
          <div className="glass-card rounded-lg overflow-hidden border border-primary/20">
            {structure.map((section, i) => (
              <motion.div
                key={section.dir}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`flex items-center gap-6 p-4 ${i < structure.length - 1 ? "border-b border-border/50" : ""} hover:bg-primary/5 transition-colors`}
              >
                <code className="font-mono text-primary text-sm font-bold w-32 shrink-0">{section.dir}</code>
                <span className="text-muted-foreground text-sm">{section.desc}</span>
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
              Trade <span className="energy-gradient-text">Smarter</span>
            </h2>
            <p className="text-muted-foreground mb-8">Explore the live stock trading platform.</p>
            <a
              href="https://opti-trade-3-0.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display uppercase tracking-wider rounded hover:opacity-90 transition-opacity"
            >
              <ExternalLink size={18} /> Launch OptiTrade
            </a>
          </motion.div>
        </div>
      </section>
    </FighterBackground>
  </div>
);

export default OptiTradePage;
