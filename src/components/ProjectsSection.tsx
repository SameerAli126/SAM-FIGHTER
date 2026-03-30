import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PROJECTS } from "@/config/site";

type ProjectCardProps = {
  project: (typeof PROJECTS)[0];
  index: number;
  inView: boolean;
};

const ProjectCard = ({ project, index, inView }: ProjectCardProps) => (
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
      <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 text-xs font-heading font-semibold uppercase tracking-wider rounded-sm bg-secondary text-secondary-foreground"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs font-display uppercase tracking-wider text-primary hover:text-energy-gold transition-colors"
            >
              <ExternalLink size={14} /> Live Demo
            </a>
          ) : (
            <span className="flex items-center gap-2 text-xs font-display uppercase tracking-wider text-muted-foreground/70">
              <ExternalLink size={14} /> Demo Pending
            </span>
          )}

          {project.sourceUrl ? (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs font-display uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github size={14} /> Source
            </a>
          ) : (
            <span className="flex items-center gap-2 text-xs font-display uppercase tracking-wider text-muted-foreground/70">
              <Github size={14} /> Source Pending
            </span>
          )}
        </div>

        {project.route ? (
          <Link
            to={project.route}
            className="flex items-center gap-1 text-xs font-display uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
          >
            Details <ArrowRight size={12} />
          </Link>
        ) : null}
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
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
