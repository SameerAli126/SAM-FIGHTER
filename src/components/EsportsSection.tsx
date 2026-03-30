import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ACHIEVEMENTS, TOURNAMENT_RESULTS } from "@/config/site";

const EsportsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="highlights" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-display text-xs uppercase tracking-[0.3em] text-primary mb-3">Professional</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase">
            Career <span className="energy-gradient-text">Highlights</span>
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
          {ACHIEVEMENTS.map((achievement, i) => (
            <motion.div
              key={achievement.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-lg p-6 text-center fighting-border group hover:box-glow transition-shadow duration-300"
            >
              <achievement.icon className={`mx-auto mb-3 ${achievement.color}`} size={28} />
              <p className="font-display text-2xl md:text-3xl font-black">{achievement.value}</p>
              <p className="font-heading text-xs uppercase tracking-wider text-muted-foreground mt-1">
                {achievement.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Milestones card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="glass-card rounded-lg p-8 max-w-3xl mx-auto fighting-border"
        >
          <h3 className="font-display text-lg font-bold uppercase text-center mb-6">
            Recent Delivery Milestones
          </h3>
          <div className="space-y-4">
            {TOURNAMENT_RESULTS.map((match) => (
              <div
                key={`${match.event}-${match.placement}`}
                className="flex items-center justify-between py-3 border-b border-border/50 last:border-0"
              >
                <div>
                  <p className="font-heading text-sm font-semibold">{match.event}</p>
                  <p className="text-xs text-muted-foreground">{match.character}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-display text-sm font-bold text-energy-gold">{match.placement}</span>
                  <span className="w-6 h-6 rounded-sm energy-gradient flex items-center justify-center text-xs font-bold text-primary-foreground">
                    {match.result}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EsportsSection;
