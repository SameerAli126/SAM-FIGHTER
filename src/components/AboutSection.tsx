import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { CheckCircle2, Clock, Cpu, Database, Globe, GraduationCap, Layers, ShieldCheck, Award } from "lucide-react";
import { PROFILE, EDUCATION } from "@/config/site";
import sameerPhoto from "@/assets/sameer-khan.png";

const PILLARS = [
  {
    icon: Layers,
    title: "Full-Cycle Engineering",
    desc: "Complete ownership from system design and API architecture to fluid UI, automated tests, and deployment.",
  },
  {
    icon: Cpu,
    title: "Modern Web Performance",
    desc: "Next.js 15 SSR, sub-second responses, zero redundant re-renders, and WCAG AA accessibility compliance.",
  },
  {
    icon: Database,
    title: "Data Integrity & Scale",
    desc: "Relational rigor with PostgreSQL/Prisma alongside scalable document pipelines with MongoDB Atlas.",
  },
  {
    icon: ShieldCheck,
    title: "AI Business Automation",
    desc: "Practical integration of LLMs (Gemini 2.0 Flash) for document extraction, natural queries, and workflow acceleration.",
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // PKT is UTC+5
      const pktTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now);
      setCurrentTime(pktTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400 mb-3">
            Engineering Craft
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Developer <span className="tech-gradient-text">&</span> Systems Builder
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 max-w-6xl mx-auto items-start">
          {/* Left Column: Narrative & Pillars */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-6"
          >
            <div className="glass-card rounded-2xl p-7 md:p-8 space-y-4">
              <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground">
                Pragmatic Engineering, Production Standards
              </h3>
              <p className="text-foreground/90 leading-relaxed text-sm md:text-base">
                {PROFILE.aboutDeveloper}
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {PROFILE.aboutDeveloperMindset}
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {PROFILE.aboutDeveloperExtra}
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {PILLARS.map((pillar) => (
                <div
                  key={pillar.title}
                  className="glass-card rounded-xl p-5 border border-border/70 hover:border-primary/40 transition-colors group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-105 transition-transform">
                      <pillar.icon size={18} />
                    </div>
                    <h4 className="font-heading text-sm font-bold text-foreground">
                      {pillar.title}
                    </h4>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Focus areas pills */}
            <div className="glass-card rounded-xl p-5">
              <p className="font-mono text-xs uppercase tracking-wider text-cyan-400 mb-3">
                Core Competency Pillars
              </p>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {PROFILE.aboutFocusAreas.map((focus) => (
                  <div
                    key={focus}
                    className="flex items-center gap-2 rounded-lg bg-secondary/60 px-3 py-2 text-xs font-medium text-foreground/90"
                  >
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    <span>{focus}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Photo & Telemetry Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            {/* Photo Card */}
            <div className="glass-card rounded-2xl p-4 overflow-hidden border border-border/70 shadow-2xl">
              <div className="relative overflow-hidden rounded-xl aspect-[4/4.5] bg-gradient-to-b from-secondary/80 to-background/90 flex items-end justify-center">
                <div className="absolute inset-0 bg-radial from-blue-500/10 via-transparent to-transparent pointer-events-none" />
                <img
                  src={sameerPhoto}
                  alt={PROFILE.fullName}
                  className="relative z-10 w-full h-full object-cover object-top filter brightness-95 contrast-105"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between">
                  <div>
                    <p className="font-heading text-base font-bold text-foreground">
                      {PROFILE.fullName}
                    </p>
                    <p className="text-xs text-cyan-400 font-mono">
                      Full-Stack Software Engineer
                    </p>
                  </div>
                  <span className="flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    In Lab
                  </span>
                </div>
              </div>
            </div>

            {/* Live Telemetry / Local Time Box */}
            <div className="glass-card rounded-2xl p-5 border border-border/70 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Globe size={13} className="text-cyan-400" /> Location
                </span>
                <span className="text-foreground font-semibold">Peshawar, Pakistan</span>
              </div>

              <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Clock size={13} className="text-blue-400" /> Local Time (PKT / UTC+5)
                </span>
                <span className="text-cyan-400 font-bold tabular-nums">
                  {currentTime || "Loading..."}
                </span>
              </div>

              <div className="flex items-center justify-between pt-0.5">
                <span className="text-muted-foreground">Work Mode</span>
                <span className="text-foreground">Remote Worldwide / Async</span>
              </div>
            </div>

            {/* Academic Foundation & Degree Card */}
            <div className="glass-card rounded-2xl p-5 border border-border/70 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 text-cyan-400">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-foreground">
                    Academic Foundation
                  </h4>
                  <p className="text-[11px] font-mono text-cyan-400">
                    BS in Computer Science
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-border/50 text-xs font-mono space-y-1.5">
                <div className="flex justify-between items-baseline">
                  <span className="text-foreground font-semibold text-[11px]">{EDUCATION.institution}</span>
                </div>
                <div className="flex justify-between text-muted-foreground text-[11px]">
                  <span>{EDUCATION.period}</span>
                  <span className="font-bold text-emerald-400">GPA: {EDUCATION.gpa}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
