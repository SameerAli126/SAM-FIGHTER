import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, CheckCircle2 } from "lucide-react";
import { ACHIEVEMENTS, ENGINEERING_MILESTONES } from "@/config/site";

export const MilestonesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="highlights" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400 mb-3">
            Track Record
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Production <span className="tech-gradient-text">Milestones</span> & Outcomes
          </h2>
          <p className="font-body text-sm md:text-base text-muted-foreground mt-4 max-w-2xl mx-auto">
            Measurable engineering achievements, delivery milestones, and production deployments delivered on time and to specification.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
          {ACHIEVEMENTS.map((achievement, i) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass-card rounded-2xl p-6 text-center border border-border/70 hover:border-primary/40 hover:box-glow-cyan transition-all duration-300"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={24} />
                </div>
                <p className="font-mono text-3xl font-extrabold text-foreground tabular-nums">
                  {achievement.value}
                </p>
                <p className="font-heading text-xs uppercase tracking-wider text-muted-foreground mt-1.5">
                  {achievement.label}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Milestones Card / Verified Delivery Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-card rounded-2xl p-6 md:p-8 max-w-4xl mx-auto border border-border/70 shadow-2xl"
        >
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/50">
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground">
                Verified Product Deployments
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Full delivery cycle execution from design to live production
              </p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 size={13} /> 100% Deployed
            </span>
          </div>

          <div className="divide-y divide-border/50">
            {ENGINEERING_MILESTONES.map((item) => (
              <div
                key={item.title}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-heading text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-secondary text-cyan-400 border border-border/60">
                      {item.outcome}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground mt-1">
                    {item.stack}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {item.status}
                  </span>

                  {item.liveUrl && (
                    <a
                      href={item.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg border border-border/80 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                      aria-label={`Visit ${item.title}`}
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MilestonesSection;
