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
import FighterBackground from "@/components/FighterBackground";
import Navbar from "@/components/Navbar";

const features = [
  {
    icon: Trophy,
    title: "XP and Streak System",
    desc: "Earn experience points for completing lessons and maintain daily learning streaks with visual indicators.",
  },
  {
    icon: Star,
    title: "Achievement System",
    desc: "Unlock badges and rewards for milestones. Compete with other learners on global leaderboards.",
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    desc: "Detailed learning statistics and progress visualization with spaced repetition for better retention.",
  },
  {
    icon: Zap,
    title: "Adaptive Difficulty",
    desc: "Multiple question types including multiple choice, translation, and audio recognition that adapt to your pace.",
  },
  {
    icon: Mic,
    title: "Voice Recognition",
    desc: "Practice pronunciation with real-time audio exercises and instant feedback on accuracy.",
  },
  {
    icon: Globe,
    title: "Chinese (Mandarin)",
    desc: "Complete course with Pinyin and Hanzi. Learn language with cultural context and insights.",
  },
  {
    icon: Moon,
    title: "Dark and Light Mode",
    desc: "Customizable theme preferences with WCAG compliant design and offline support.",
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
              Word<span className="energy-gradient-text">Wanderer</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mb-8">
              A modern, gamified language learning platform inspired by Duolingo. Built with
              cutting-edge web technologies to make language acquisition engaging, effective, and
              fun.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a
                href="https://wordwanderer.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-display uppercase tracking-wider text-sm rounded hover:opacity-90 transition-opacity"
              >
                <ExternalLink size={16} /> Live Demo
              </a>
              <a
                href="https://github.com/SameerAli126/WordWanderer"
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
              Try It <span className="energy-gradient-text">Live</span>
            </h2>
            <p className="text-muted-foreground mb-8">Experience gamified language learning firsthand.</p>
            <a
              href="https://wordwanderer.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display uppercase tracking-wider rounded hover:opacity-90 transition-opacity"
            >
              <ExternalLink size={18} /> Launch WordWanderer
            </a>
          </motion.div>
        </div>
      </section>
    </FighterBackground>
  </div>
);

export default WordWandererPage;
