import { motion, useInView } from "framer-motion";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { PROJECTS, type Project } from "@/config/site";
import { cn } from "@/lib/utils";

type TimelineProjectProps = {
  project: Project;
  index: number;
  inView: boolean;
};

const TimelineProject = ({ project, index, inView }: TimelineProjectProps) => {
  const isLeftAligned = index % 2 === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="relative pl-16 md:grid md:grid-cols-[minmax(0,1fr)_5rem_minmax(0,1fr)] md:gap-8 md:pl-0"
    >
      <div
        className={cn(
          "glass-card overflow-hidden rounded-2xl transition-all duration-300 hover:border-primary/30",
          isLeftAligned ? "md:col-start-1" : "md:col-start-3",
        )}
      >
        <div className={cn("h-1 bg-gradient-to-r", project.color)} />

        <div className="group p-6 md:p-8">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-primary">
              {project.dateRange}
            </span>
            <span className="h-px w-12 bg-border" />
            <span className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              {project.category}
            </span>
          </div>

          <h3 className="mb-3 font-display text-2xl font-bold uppercase transition-colors group-hover:text-primary">
            {project.title}
          </h3>
          <p className="mb-4 text-base leading-7 text-muted-foreground">{project.description}</p>
          <p className="mb-6 text-base leading-7 text-foreground/90">
            <span className="font-display text-sm uppercase tracking-[0.22em] text-primary">Impact</span>{" "}
            {project.impact}
          </p>

          <div className="mb-6 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-sm bg-secondary px-3 py-1 text-xs font-heading font-semibold uppercase tracking-wider text-secondary-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {project.links.map((link) => {
              const baseClass = cn(
                "flex items-center gap-2 rounded-sm border px-3 py-2 text-sm font-display font-semibold uppercase tracking-wider transition-colors",
                link.tone === "primary"
                  ? "border-primary/30 text-primary hover:border-accent/40 hover:text-accent"
                  : "border-border/70 text-muted-foreground hover:border-primary/30 hover:text-foreground",
              );

              if (link.kind === "route") {
                return (
                  <Link key={link.label} to={link.href} className={baseClass}>
                    {link.label}
                    <ArrowRight size={12} />
                  </Link>
                );
              }

              const icon = link.label.toLowerCase().includes("source") || link.label.toLowerCase().includes("code")
                ? <Github size={14} />
                : <ExternalLink size={14} />;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={baseClass}
                >
                  {icon}
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute left-0 top-6 flex md:static md:col-start-2 md:justify-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/50 bg-background font-display text-sm font-bold text-primary shadow-[0_0_20px_rgba(225,72,104,0.25)]">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>
    </motion.article>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative py-24" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 font-display text-xs uppercase tracking-[0.3em] text-primary">Portfolio</p>
          <h2 className="font-display text-3xl font-bold uppercase md:text-5xl">
            Project <span className="energy-gradient-text">Timeline</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
            A CV-backed timeline of shipped products, from language learning and fintech to media platforms,
            internal operations dashboards, and civic GIS systems.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-6xl">
          <div className="absolute bottom-0 left-5 top-0 w-px bg-gradient-to-b from-primary/10 via-primary/70 to-accent/20 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-12 md:space-y-16">
            {PROJECTS.map((project, index) => (
              <TimelineProject key={`${project.title}-${project.dateRange}`} project={project} index={index} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
