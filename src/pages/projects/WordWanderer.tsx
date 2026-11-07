import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Star,
  Zap,
  Globe,
  Mic,
  BarChart3,
  Trophy,
  Moon,
} from "lucide-react";
import { Link } from "react-router-dom";
import ModernBackground from "@/components/ModernBackground";
import Navbar from "@/components/Navbar";
import SeoMeta from "@/components/SeoMeta";

const features = [
  {
    icon: Trophy,
    title: "XP & Retention Loop",
    desc: "Earn experience points for completing lessons and maintain daily learning streaks with optimistic state updates.",
  },
  {
    icon: Star,
    title: "Achievement Engine",
    desc: "Unlock badges and rewards for language milestones. Compete on global client-synced leaderboards.",
  },
  {
    icon: BarChart3,
    title: "Spaced Repetition (SRS)",
    desc: "Progress analytics and memory retention visualization with custom algorithmic review scheduling.",
  },
  {
    icon: Zap,
    title: "Adaptive Question Modes",
    desc: "Multiple question engines including translation, audio recognition, and matching pairs that adapt dynamically.",
  },
  {
    icon: Mic,
    title: "Pronunciation Analysis",
    desc: "Speech audio exercises with real-time feedback on pronunciation accuracy and confidence scores.",
  },
  {
    icon: Globe,
    title: "Chinese (Mandarin) Track",
    desc: "Complete curriculum with Pinyin, Hanzi character stroke sequences, and cultural insights.",
  },
  {
    icon: Moon,
    title: "Accessibility & Offline Modes",
    desc: "WCAG AA compliant contrast with offline progress caching and seamless IndexedDB synchronization.",
  },
];

const tech = [
  { label: "Next.js 14", cat: "Frontend" },
  { label: "TypeScript", cat: "Frontend" },
  { label: "Tailwind CSS", cat: "Frontend" },
  { label: "Framer Motion", cat: "Frontend" },
  { label: "Zustand", cat: "Frontend" },
  { label: "Express.js", cat: "Backend" },
  { label: "MongoDB Atlas", cat: "Backend" },
  { label: "JWT", cat: "Backend" },
  { label: "Vercel", cat: "DevOps" },
];

const WordWandererPage = () => (
  <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
    <SeoMeta
      title="WordWanderer | Muhammad Sameer Ali"
      description="WordWanderer is a gamified language learning platform with SRS review queues, speech scoring, progress tracking, streaks, and achievement systems."
      path="/projects/wordwanderer"
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
              Gamified Product Architecture • Live Production
            </div>
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6">
              Word<span className="tech-gradient-text text-glow">Wanderer</span>
            </h1>
            <p className="font-body text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
              A high-retention, gamified language acquisition platform inspired by modern cognitive science. Built with
              Next.js 14, Zustand client state sync, and MongoDB aggregation pipelines to deliver responsive feedback loops.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a
                href="https://wordwanderer.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-heading font-bold text-xs uppercase tracking-wider rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:opacity-95 transition-all"
              >
                <ExternalLink size={15} /> Launch Live Application
              </a>
              <a
                href="https://github.com/SameerAli126/WordWanderer"
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
              Explore the <span className="tech-gradient-text">Gamified Loop</span>
            </h2>
            <p className="font-body text-muted-foreground text-sm max-w-xl mx-auto mb-8">
              Try the interactive lesson progression system live on Vercel.
            </p>
            <a
              href="https://wordwanderer.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-heading font-bold text-xs uppercase tracking-wider rounded-lg shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:opacity-95 transition-all"
            >
              <ExternalLink size={16} /> Launch WordWanderer
            </a>
          </motion.div>
        </div>
      </section>
    </ModernBackground>
  </div>
);

export default WordWandererPage;
