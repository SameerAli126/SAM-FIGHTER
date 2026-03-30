import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const projects = [
  {
    title: "OptiTrade 3.0",
    description: "A modern, data-driven stock trading app with portfolio management, stock screener, financial news, watchlist, and AI-powered diversification tips.",
    tech: ["Next.js 15", "TypeScript", "Tailwind CSS", "JWT Auth"],
    color: "from-energy-red to-energy-orange",
    route: "/projects/optitrade",
    demo: "https://opti-trade-3-0.vercel.app/",
    github: "https://github.com/SameerAli126/OptiTrade-3.0",
  },
  {
    title: "WordWanderer",
    description: "A gamified language learning platform with XP systems, streak tracking, achievements, adaptive difficulty, voice recognition, and Mandarin support.",
    tech: ["Next.js 14", "TypeScript", "Zustand", "MongoDB"],
    color: "from-energy-orange to-energy-gold",
    route: "/projects/wordwanderer",
    demo: "https://wordwanderer.vercel.app",
    github: "https://github.com/SameerAli126/WordWanderer",
  },
  {
    title: "InvoiceGen Pro",
    description: "An AI-powered full-stack invoicing solution with Gemini 2.0 Flash chatbot, smart invoice generation, payment prediction analytics, and client management.",
    tech: ["Next.js 15", "Gemini AI", "MongoDB", "Stripe"],
    color: "from-energy-gold to-energy-red",
    route: "/projects/invoicegen-pro",
    demo: "https://invoicegen-pro.netlify.app/",
    github: "https://github.com/SameerAli126/invoicegen-pro",
  },
];

const ProjectCard = ({ project, index, inView }: { project: typeof projects[0]; index: number; inView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    className="glass-card rounded-lg overflow-hidden group hover:border-primary/30 transition-all duration-300 flex flex-col"
  >
    {/* Top accent bar */}
    <div className={`h-1 bg-gradient-to-r ${project.color}`} />

    <div className="p-8 flex flex-col flex-1">
      <h3 className="font-display text-xl font-bold uppercase mb-3 group-hover:text-primary transition-colors">
        {project.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((t) => (
          <span
            key={t}
            className="px-3 py-1 text-xs font-heading font-semibold uppercase tracking-wider rounded-sm bg-secondary text-secondary-foreground"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-display uppercase tracking-wider text-primary hover:text-energy-gold transition-colors"
          >
            <ExternalLink size={14} /> Live Demo
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-display uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github size={14} /> Source
          </a>
        </div>
        <Link
          to={project.route}
          className="flex items-center gap-1 text-xs font-display uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
        >
          Details <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  </motion.div>
);

const ProjectsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-display text-xs uppercase tracking-[0.3em] text-primary mb-3">Portfolio</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase">
            Featured <span className="energy-gradient-text">Projects</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
