import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, Code2 } from "lucide-react";
import { PROFILE } from "@/config/site";
import sameerPhoto from "@/assets/sameer-khan.png";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-display text-xs uppercase tracking-[0.3em] text-primary mb-3">Who I Am</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase">
            Developer <span className="energy-gradient-text">&</span> Problem Solver
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-10 max-w-6xl mx-auto items-start">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass-card rounded-lg p-8 fighting-border"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-sm energy-gradient flex items-center justify-center">
                <Code2 size={20} className="text-primary-foreground" />
              </div>
              <h3 className="font-heading text-2xl font-bold uppercase tracking-wide">The Developer</h3>
            </div>
            <p className="text-foreground/95 leading-relaxed mb-4">{PROFILE.aboutDeveloper}</p>
            <p className="text-muted-foreground leading-relaxed mb-4">{PROFILE.aboutDeveloperMindset}</p>
            <p className="text-muted-foreground leading-relaxed">{PROFILE.aboutDeveloperExtra}</p>

            <div className="mt-8">
              <p className="font-heading text-xs uppercase tracking-[0.2em] text-primary mb-4">What I Bring</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {PROFILE.aboutFocusAreas.map((focus) => (
                <div
                  key={focus}
                  className="flex items-center gap-2 rounded-sm border border-border/70 bg-secondary/40 px-3 py-2.5"
                >
                  <CheckCircle2 size={16} className="text-primary shrink-0" />
                  <span className="text-xs font-heading uppercase tracking-wide text-foreground/90">{focus}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-4"
          >
            <figure className="glass-card rounded-lg p-4 fighting-border">
              <div className="relative overflow-hidden rounded-md aspect-square bg-gradient-to-br from-secondary via-secondary/80 to-muted/40">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-energy-gold/15" />
                <img
                  src={sameerPhoto}
                  alt={PROFILE.fullName}
                  className="relative z-10 h-full w-full object-contain object-center p-2 sm:p-4"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
              <figcaption className="pt-4">
                <p className="font-display text-lg uppercase tracking-wide leading-none text-foreground">
                  {PROFILE.fullName}
                </p>
                <p className="font-heading text-xs uppercase tracking-[0.2em] text-primary mt-1">
                  Full-Stack Developer
                </p>
              </figcaption>
            </figure>

            <div className="glass-card rounded-lg p-5 border border-border/70">
              <p className="font-heading text-sm leading-relaxed text-foreground/90">
                I enjoy fast-moving teams where ownership, quality, and clear communication are non-negotiable.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
